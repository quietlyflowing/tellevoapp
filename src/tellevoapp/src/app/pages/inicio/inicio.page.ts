import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router, private storage: StorageService, private backend: BackendService, private auth: AuthGuardService) { }

  goToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  goToRegistrarse() {
    this.router.navigate(['/registrarse']);
  }

  ngOnInit() {
  }

  
}
