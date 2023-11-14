import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
})
export class SobreNosotrosPage implements OnInit {

  constructor(private router: Router) {}

  goToMenu() {
    this.router.navigate(['/menu']);
  }
  ngOnInit() {
  }

}
