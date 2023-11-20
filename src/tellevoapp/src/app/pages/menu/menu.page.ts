import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuController, IonModal, AlertController} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router, ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
//import { antPath } from 'leaflet-ant-path';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';


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
  vehicle: any;
  
  constructor(
    private menuController: MenuController,
    private router: Router,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private alert: AlertController
  ) 
  {}

  @ViewChild(IonModal) modal!: IonModal;

 

  close() {
    this.modal.dismiss(null, 'Cerrar');
  }

  async soonTm() {
    const alert = await this.alert.create({
      header: 'Próximamente',
      subHeader: 'Falta tiempo',
      message: 'Se iba a implementar con sockets pero no hay tiempo.'
    });

    await alert.present();
  }

  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  toggleMenu() {
    this.menuController.toggle();
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
      iconUrl:"https://cdn-icons-png.flaticon.com/128/6427/6427662.png",
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