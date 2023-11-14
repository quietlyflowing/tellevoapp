import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor-clase',
  templateUrl: './conductor-clase.page.html',
  styleUrls: ['./conductor-clase.page.scss'],
})
export class ConductorClasePage implements OnInit {

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
