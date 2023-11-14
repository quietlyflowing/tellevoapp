import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {


  email: string = '';
  password: string = '';
  // confirmpassword: string = '';

  async messageToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  constructor(private router: Router, private backend: BackendService, private toast: ToastController, private storage: StorageService) { }

  loginUser() {
    if (this.email.length > 0 && this.password.length > 0) {
      this.backend.logUser(this.email, this.password).subscribe((success) => {
        if (success.code === 1) {
          console.log(success);
          const bearer: string = success.token!;
          this.storage.setBearerToken(bearer)?.then((stored) => {
            console.log(stored);
            this.email = '';
            this.password = '';
            this.router.navigate(['/menu']);
          }, (error) => {
            this.email = '';
            this.password = '';
            console.log(error);
            this.router.navigate(['/']);
            this.messageToast('Error de inicio de sesión');

          });

        } else {
          console.log(success);
          this.router.navigate(['/'])
          this.messageToast('Error de inicio de sesión')
        }
      }, error => {
        this.router.navigate(['/'])
        this.messageToast('Error de inicio de sesión')
      });
    } else {
      this.messageToast('Debe ingresar su usuario y contraseña');
      this.password = '';
    }

  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }

  ngOnInit() {
    let _token: string
    this.storage.getBearerToken().then((token) => {
      console.log(token);
    })

  }

}
