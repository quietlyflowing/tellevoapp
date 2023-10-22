import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

constructor(private router: Router, private backend : BackendService) {}

goToInicioSesion() {
  this.router.navigate(['/inicio-sesion']);
}

goToRegistrarse() {
  this.router.navigate(['/registrarse']);
}
  ngOnInit() {
    //this.backend.registerNewUser('du.mmy@duocuc.cl');
  }

}
