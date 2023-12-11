import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MenuController, IonModal, AlertController, NavParams } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router, ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
//import { antPath } from 'leaflet-ant-path';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';
import { MonitorTravelSSEServiceService } from 'src/app/services/monitor-travel-sse.service';
import { SeekTravelService } from 'src/app/services/seek-travel.service';
import { WillBePickedUpService } from 'src/app/services/will-be-picked-up.service';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit, OnDestroy {

  map!: Leaflet.Map
  isDriver: number = 2;
  message: string = "test";
  endPlace: string = '';
  endAddress: string = '';
  userName: string = '';
  rideName: string = '';
  resolvedData: any;
  geoData: any;
  travelsArray: any[] = [];
  travelCount: number = 0;
  vehicle: any;
  alertButtons = ['Entendido'];
  isAlertOpen: boolean = false;
  time: number = 0;
  areTraveling: number = 0;
  myTravelId: number = 0;
  travelTariff: number = 0;
  userId: number = -99;
  middleStep: number = 0;
  homeCoords: object = { 'coord_x': 0, 'coord_y': 0 };
  duocCoords: object = { 'coord_x': 0, 'coord_y': 0 };
  homeAddress: string = '';
  duocAddress: string = '';
  public tariffInput = [
    {
      type: 'number',
      name: 'tarifValue',
      placeholder: '$0',
      attributes: {
        minlenght: 2,
        maxlenght: 3
      }
    }
  ];
  public tariffButton = [{
    text: 'Buscar Viaje',
    role: 'start-travel',
    //@ts-ignore
    handler: (tariffInput) => {
      console.log('Boton iniciar viaje oprimido.')
      console.log('La tarifa fijada es de ' + tariffInput.tarifValue);
      this.startDriverTravel(tariffInput.tarifValue, this.userId);
    }
  },
  {
    text: 'Cancelar',
    role: 'cancel',
    handler: () => {
      console.log('Boton cancelar oprimido. No se inició ningún viaje');
    }
  }]
  public travelButton = [
    {
      text: 'Casa',
      role: 'casa',
      handler: () => {
        console.log('Se solicitó viaje al hogar.');
        //@ts-ignore
        this.endPlace = 'al Hogar';
        this.endAddress = this.homeAddress;
        this.startUserTravel(this.homeCoords);
      }
    },
    {
      text: 'DuocUC',
      role: 'duoc',
      handler: () => {
        console.log('Se solicitó viaje a la sede de DuocUC');
        //@ts-ignore
        //this.startTravelling();
        this.endPlace = 'a DuocUC';
        this.endAddress = this.duocAddress;
        this.startUserTravel(this.duocCoords);
      }
    },
  ];
  public stopButton = [
    {
      text: 'Volver',
      handler: () => {
        console.log('No se ha cancelado el viaje')
      }
    },
    {
      text: 'Detener viaje',
      handler: () => {
        console.log('Se solicitó detener el viaje');
        this.seekSSE.disconnect();
        this.willSSE.disconnect();
        this.stopTravelling();
      }
    }
  ];
  constructor(
    private menuController: MenuController,
    private router: Router,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private alert: AlertController,
    private monitorSSE: MonitorTravelSSEServiceService,
    private seekSSE: SeekTravelService,
    private willSSE: WillBePickedUpService,
    private backend: BackendService,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild(IonModal) modal!: IonModal;

  formatedTime(): string {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  close() {
    this.modal.dismiss(null, 'Cerrar');
  }

  async genericAlertWithoutHeader(header: string, message: string, button: string[]) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: button,
    });

    await alert.present();
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async startUserTravel(endCoord: object) {
    this.middleStep = 1;
    this.cdr.detectChanges();
    try {
      const position = await Geolocation.getCurrentPosition();
      const data: object = {
        'passenger_name': this.userName,
        'start_coordinates': {
          'coord_x': position.coords.latitude,
          'coord_y': position.coords.longitude,
        },
        'end_coordinates': endCoord
      }
      console.log('Datos Preparados. Solicitando viaje');
      this.backend.publishTravel(data).toPromise()
        .then((response) => {
          //@ts-ignore
          console.log(response);
          //@ts-ignore
          const travelId = response?.data.travel_id;
          this.myTravelId = travelId;
         // this.areTraveling = 1;
          console.log('Viaje publicado. ID del viaje: ' + this.myTravelId);
          console.log('Escuchando respuesta de algún conductor.');
          this.suscribeToWillBePickedUp(this.userId);
        })
        .catch((mistake) => {
          console.log(mistake)
          this.genericAlertWithoutHeader('Error', 'Ocurrió un error inesperado. Por favor intente más tarde.', ['Entendido']);
          throw mistake;
        })
    } catch (error) {
      console.log(error)
      this.genericAlertWithoutHeader('Error', 'Ocurrió un error inesperado. Por favor intente más tarde.', ['Entendido']);
      throw error;
    }
  }

  startDriverTravel(tariff: number, userId: number) {
    console.log('Buscando un viaje');
    this.suscribeToSeekTravel(tariff, userId);
  }


  suscribeToMonitorTravel(travel: number) {
    this.areTraveling = 1;
    this.middleStep = 0;
    const travelNumber = travel;
    this.myTravelId = travel;
    this.time = 0;
    this.cdr.detectChanges();
    this.monitorSSE.connect(travelNumber).subscribe((event: MessageEvent) => {
      this.message = JSON.parse(event.data);
      this.time++;
      this.cdr.detectChanges();
      console.log(this.message);
      //@ts-ignore
      if (this.message.code === 109) {
        this.monitorSSE.disconnect();
        console.log('Desuscribiendo del viaje');
        this.areTraveling = 0;
        this.cdr.detectChanges();
      }
    },
      (error) => {
        console.log('Ocurrió un error. Intentando reconectar');
        console.log(error);
        this.cdr.detectChanges();
      });
  }

  suscribeToSeekTravel(tariff: number, userId: number) {
    this.middleStep = 1;
    console.log('Todo listo. Buscando un viaje');
    this.seekSSE.connect(tariff, userId).subscribe((event: MessageEvent) => {
      this.message = JSON.parse(event.data);
      console.log(this.message);
      //@ts-ignore
      if (this.message.code === 81) {
        console.log('No hay viajes disponibles. Cerrando');
        this.middleStep = 0;
        this.seekSSE.disconnect();
        this.genericAlertWithoutHeader('No hay viajes disponibles', 'Lo sentimos. Se agotó el tiempo de espera y no hay viajes disponibles. Intente más tarde', ['Entendido']);
      }
      //@ts-ignore
      if (this.message.code === 105) {
        this.seekSSE.disconnect();
        console.log('Viaje Encontrado. Suscribiendo al endpoint de monitoreo');
        //@ts-ignore
        this.suscribeToMonitorTravel(this.message.travel_id);
      }
    },
      (error) => {
        console.log(error)
        this.middleStep = 0;
        this.genericAlertWithoutHeader('Error', 'Ocurrió un error inesperado. Por favor intente más tarde.', ['Entendido']);
        throw error;
      });
  }

  suscribeToWillBePickedUp(userId: number){
    console.log('Escuchando si un conductor escoje el viaje');
    this.willSSE.connect(userId).subscribe((event: MessageEvent)=>{
      this.message = JSON.parse(event.data);
      console.log(this.message);
      //@ts-ignore
      if(this.message.code === 81){
        console.log('Ningún conductor ha tomado el viaje. Cerrando');
        this.middleStep = 0;
        this.cdr.detectChanges();
        this.willSSE.disconnect();
        this.genericAlertWithoutHeader('No hay conductores disponibles', 'Lo sentimos. Se agotó el tiempo de espera y no hay conductores disponibles. Intente más tarde', ['Entendido']);
      }
      //@ts-ignore
      if(this.message.code === 105){
        //@ts-ignore
        const driver = this.message.driver_id;
        //@ts-ignore
        console.log(this.message.driver_id);
        console.log(driver);
        this.rideName = driver;
        this.willSSE.disconnect();
        console.log('Viaje Encontrado. Suscribiendo al endpoint de monitoreo');
        //@ts-ignore
        this.suscribeToMonitorTravel(this.message.travel_id);
      }
    },(error)=>{
      console.log(error)
      this.middleStep = 0;
      this.cdr.detectChanges();
      this.genericAlertWithoutHeader('Error', 'Ocurrió un error inesperado. Por favor intente más tarde.', ['Entendido']);
      throw error;
    })
  }

  async stopTravelling() {
    if (this.areTraveling !== 1) {
      console.log('ERROR: No estamos viajando');
    } else {
      console.log('Solicitando el fin del viaje')
      try {
        const position = await Geolocation.getCurrentPosition();
        const data: object = {
          'is_driver': this.isDriver,
          'end_coordinates': {
            'coord_x': position.coords.latitude,
            'coord_y': position.coords.longitude
          },
          'total_payment': this.time * 90,
          'payment_type': 1,
          'travel_id': this.myTravelId,
          'driver_id': 1,
        }
        this.backend.deleteTravel(data).toPromise()
          .then((response) => {
            console.log(response);
            this.areTraveling = 0;
          })
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goToChangeData() {
    const editForm = { phone: this.resolvedData.data[0].datos.telefono, duoc: this.resolvedData.data[0].datos.direccion_duoc, home: this.resolvedData.data[0].datos.direccion_hogar, imCreating: true };
    this.router.navigate(['registro-data'], { queryParams: editForm })
  }


  goToChangeVehicleData() {
    const editForm = { patente: this.resolvedData.data[0].vehiculos.patente, modelo: this.resolvedData.data[0].vehiculos.modelo, año: this.resolvedData.data[0].vehiculos.año, imCreating: true };
    this.router.navigate(['registro-vehiculo'], { queryParams: editForm });
  }
  async messageToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToSobreNosotros() {
    this.router.navigate(['/sobre-nosotros']);
  }

  goToClase() {
    this.router.navigate(['/clase']);
  }

  ngOnInit(): void {
    this.geoData = this.activeRoute.snapshot.data['geoData'];
    this.resolvedData = this.activeRoute.snapshot.data['resolvedData'];
    this.isDriver = this.resolvedData.data[0].IS_DRIVER;
    this.userId = this.resolvedData.data[0].id;
    console.log('ID de usuario: ' + this.userId);
    console.log(this.resolvedData.data[0]);
    this.userName = this.resolvedData.data[0].datos.nombre;
    this.duocCoords = { ...this.resolvedData.data[0].datos.cord_duoc };
    this.homeCoords = { ...this.resolvedData.data[0].datos.cord_hogar };
    this.duocAddress = this.resolvedData.data[0].datos.direccion_duoc;
    this.homeAddress = this.resolvedData.data[0].datos.direccion_hogar;
    console.log(this.duocCoords);
    console.log(this.homeCoords);
    this.travelsArray = this.resolvedData.data[0].travels;
    if (this.resolvedData.data[0].vehiculos !== undefined) {
      this.vehicle = this.resolvedData.data[0].vehiculos;
    }
    this.travelCount = this.travelsArray.length;
  }

  closeSession(): void {
    this.router.navigate(['/inicio']);
    this.auth.closeSession();
  }
  ionViewDidEnter() {
    this.leafletMap();
  } //<=Esto sirve para que el mapa pueda cargarse correctamente. ngOnInit solo no sirve.

  leafletMap() { //<= Todo esto crea e inserta el mapa en la página principal del menú
    // Por ahora todo está hardcoeado, así que siempre mostrará la sede de DUOC Maipú
    // TODO integrar con geolocalización y GPS
    const icono = Leaflet.icon(
      {
        //iconUrl:"https://cdn-icons-png.flaticon.com/128/6427/6427662.png",
        iconUrl: "assets/img/pin.svg",
        iconSize: [32, 32]
      }
    );
    this.map = Leaflet.map('mapa-principal', { center: [this.geoData.coords.latitude, this.geoData.coords.longitude], zoom: 16, attributionControl: false });
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    Leaflet.marker([this.geoData.coords.latitude, this.geoData.coords.longitude], { icon: icono }).addTo(this.map).bindPopup('Ubicación actual'); //
  }


  ngOnDestroy() {
    this.map.remove();
  }
}