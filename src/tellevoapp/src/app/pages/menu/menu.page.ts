import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuController, IonModal, AlertController, NavParams} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router, ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
//import { antPath } from 'leaflet-ant-path';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';
import { TravelSSEServiceService } from 'src/app/services/travel-sse.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})



export class MenuPage implements OnInit, OnDestroy {

  map!: Leaflet.Map
  isDriver: number = 2;
  message: string = "test";
  name: string ='';
  userName: string = '';
  resolvedData: any;
  geoData: any;
  travelsArray: any[] = [];
  travelCount: number = 0;
  vehicle: any;
  alertButtons = ['Entendido'];
  isAlertOpen: boolean = false;
  time: number = 95;
  areTraveling: number = 0;
  math: Math = Math;

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
  

  constructor(
    private menuController: MenuController,
    private router: Router,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private alert: AlertController, 
    private sse: TravelSSEServiceService
  ) 
  {}

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


  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  testButton() {
    this.sse.connect(1).subscribe((event: MessageEvent)=>{
      this.message = JSON.parse(event.data).data;
      //@ts-ignore
      console.log('ID del conductor: '+ this.message.driver_id);
      console.log(event);
    })
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goToChangeData(){
    const editForm = {phone: this.resolvedData.data[0].datos.telefono, duoc: this.resolvedData.data[0].datos.direccion_duoc, home: this.resolvedData.data[0].datos.direccion_hogar, imCreating: true};
    this.router.navigate(['registro-data'], {queryParams: editForm})
  }


  goToChangeVehicleData(){
    const editForm = {patente: this.resolvedData.data[0].vehiculos.patente, modelo: this.resolvedData.data[0].vehiculos.modelo, año: this.resolvedData.data[0].vehiculos.año, imCreating: true};
    this.router.navigate(['registro-vehiculo'], {queryParams: editForm});
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
    console.log(this.resolvedData.data[0]);
    this.userName = this.resolvedData.data[0].datos.nombre;
    this.travelsArray = this.resolvedData.data[0].travels;
    if(this.resolvedData.data[0].vehiculos !== undefined){
      this.vehicle = this.resolvedData.data[0].vehiculos;
    }
    this.travelCount = this.travelsArray.length;
    console.log(this.geoData.coords.latitude);
  }

  closeSession(): void{
    this.router.navigate(['/inicio']);
    this.auth.closeSession();
  }
 ionViewDidEnter(){
  this.leafletMap();
  } //<=Esto sirve para que el mapa pueda cargarse correctamente. ngOnInit solo no sirve.
  
 leafletMap(){ //<= Todo esto crea e inserta el mapa en la página principal del menú
  // Por ahora todo está hardcoeado, así que siempre mostrará la sede de DUOC Maipú
  // TODO integrar con geolocalización y GPS
  const icono = Leaflet.icon(
    {
      //iconUrl:"https://cdn-icons-png.flaticon.com/128/6427/6427662.png",
      iconUrl: "assets/img/pin.svg",
      iconSize: [32, 32]
    }
  );
  this.map = Leaflet.map('mapa-principal', {center: [this.geoData.coords.latitude, this.geoData.coords.longitude], zoom: 16, attributionControl: false});
  Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  Leaflet.marker([this.geoData.coords.latitude, this.geoData.coords.longitude], {icon: icono}).addTo(this.map).bindPopup('Ubicación actual'); //
 }
 

 ngOnDestroy() {
    this.map.remove();
  }
}