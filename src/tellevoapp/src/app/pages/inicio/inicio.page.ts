import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

constructor(private router: Router) {}

goToInicioSesion() {
  this.router.navigate(['/inicio-sesion']);
}

goToRegistrarse() {
  this.router.navigate(['/registrarse']);
}
  ngOnInit() {
  }

}
