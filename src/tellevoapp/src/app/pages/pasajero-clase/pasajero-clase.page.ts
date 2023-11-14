import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasajero-clase',
  templateUrl: './pasajero-clase.page.html',
  styleUrls: ['./pasajero-clase.page.scss'],
})
export class PasajeroClasePage implements OnInit {

  constructor(private router: Router) { }
  
  goToMenu() {
    this.router.navigate(['/menu']);
  }
  goToClase() {
    this.router.navigate(['/clase']);
  }
  
  ngOnInit() {
  }

}
