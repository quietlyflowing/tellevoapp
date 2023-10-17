import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {


  email: string = '';
  password: string = '';
 // confirmpassword: string = '';
  constructor(private router: Router) {}

  loginUser() {
    //Mi consumo de api es tan básico que prefiero hacerlo así
    
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }

  ngOnInit() {
  }

}
