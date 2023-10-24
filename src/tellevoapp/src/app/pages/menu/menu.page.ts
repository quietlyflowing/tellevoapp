import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
//import { antPath } from 'leaflet-ant-path';
import { AuthenticationService } from 'src/app/authentication.service';
import { BackendService } from 'src/app/backend.service';
import { ToastController } from '@ionic/angular';
import { ApiResponse } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit, OnDestroy {

  map!: Leaflet.Map


  constructor(
    private menuController: MenuController,
    private router: Router,
    private auth: AuthenticationService,
    private backend: BackendService,
    private toastController: ToastController,
  ) {}

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
    this.router.navigate(['/clase'])
  }
  
  closeSession() {
    if(this.backend.logoutUSer()){
      this.map.remove();
      this.router.navigate(['/inicio']);
      this.messageToast('Sesión cerrada correctamente');
      
    }
  }
  ngOnInit(): void {
      //Checkeamos si estamos logeados. Si estamos logeados, usamos nuestro token para solicitar datos del usuario
  }

 ionViewDidEnter(){
  this.leafletMap();} //<=Esto sirve para que el mapa pueda cargarse correctamente. ngOnInit solo no sirve.
  
 leafletMap(){ //<= Todo esto crea e inserta el mapa en la página principal del menú
  // Por ahora todo está hardcoeado, así que siempre mostrará la sede de DUOC Maipú
  // TODO integrar con geolocalización y GPS
  const icono = Leaflet.icon(
    {
      iconUrl:"https://cdn-icons-png.flaticon.com/128/6427/6427662.png",
      iconSize: [32, 32]
    }
  );
  this.map = Leaflet.map('mapa-principal', {center: [-33.51190, -70.75276], zoom: 16, attributionControl: false});
  Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  Leaflet.marker([-33.51190, -70.75276], {icon: icono}).addTo(this.map).bindPopup('DuocUC: Sede Maipú'); //
 }
 
 ngOnDestroy() {
    this.map.remove();
  }
}