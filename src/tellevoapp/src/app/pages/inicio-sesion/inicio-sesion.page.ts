import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiResponse } from 'src/app/interfaces/interfaces';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController, private backend: BackendService) { }
  email!: string;
  mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // password: string = '';
  // confirmpassword: string = '';
  // phone: string = '';
  // driver: boolean = false;
  // patente: string = '';
  // year: string = ''; 
  // modelo: string = '';

  async messageToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  formValidate(): string | boolean {
    if (this.email.length !== 0 && this.email.match(this.mailRegex)) {
      return this.email;
    } else {
      this.messageToast('Debe ingresar un correo electrónico válido');
      return false;
    }
  }

  async queryMail() {
    const correo = this.formValidate();
    if (typeof (correo) === 'string') {
      try {
        const response = await this.backend.checkDuocMail(correo).toPromise();
        console.log(response);
        if (response?.code === 5) {
          const dataToSend = { email: correo };
          this.router.navigate(['registro-data/'], { queryParams: dataToSend });
        } else {
          this.messageToast('Para poder utilizar esta aplicación debe ingresar un mail válido de DuocUC');
          this.router.navigate(['inicio/']);
        }
      } catch (error: any) {
        if (error.code === 4) {
          this.messageToast('Ocurrió un error inesperado.');
          this.router.navigate(['inicio/']);
        }
      }
    } 
  }
  // registerUser() {

  //   let answer: number;
  //   if ((this.phone.length===0 && this.phone.length < 9)){
  //     this.messageToast('Debe ingresar un teléfono');
  //     this.phone = '';
  //     this.password = '';
  //     this.confirmpassword = '';
  //   }
  //   if (this.email.length === 0) {
  //     this.messageToast('Debe ingresar un correo electrónico');
  //     this.password = '';
  //     this.confirmpassword = '';
  //   } else if (this.password !== this.confirmpassword) {
  //     this.messageToast('Las contraseñas no coinciden.');
  //     this.password = '';
  //     this.confirmpassword = '';
  //   } else {
  //     const datosRegistro: object = {
  //       email: this.email,
  //       password: this.password,
  //       phone: (this.phone as unknown) as number,
  //       driver: this.driver,
  //       patente: this.patente,
  //       modelo: this.modelo,
  //       año: (this.year as unknown) as number
  //     }
  //     this.backend.registerNewUser(datosRegistro).subscribe((res) => {
  //       console.log(res) 
  //         if(res['code'] === 6) {
  //           this.backend.logUser(this.email, this.password).subscribe((res) =>{
  //             this.storage.setBearerToken(res.token!);
  //             this.router.navigate(['/menu']);
  //           });

  //         } else if(res['code']===4) {
  //           this.messageToast('El correo electrónico no corresponde con ningún correo de DuocUC');
  //           this.router.navigate(['/']);
  //         }
  //       }, error => {
  //         console.log(error);
  //         this.messageToast('Lo sentimos, ocurrió un error');
  //         this.router.navigate(['/']);
  //       }
  //     );




  ngOnInit() {
  }

}
