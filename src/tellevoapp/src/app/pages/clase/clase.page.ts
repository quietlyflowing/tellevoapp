import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  constructor(private router: Router) { }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
  goToPasajero(){
    this.router.navigate(['/pasajero-clase']);
  }
  goToConductor(){
    this.router.navigate(['/conductor-clase']);
  }

  ngOnInit() {
  }

}
