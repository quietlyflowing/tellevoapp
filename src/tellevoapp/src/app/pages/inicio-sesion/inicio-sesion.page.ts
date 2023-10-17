import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private toastController: ToastController) { }
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  phone: string = '';
  driver: boolean = false;
  patente: string = '';
  

  checkDuocMail(mail: string) {
    return this.httpClient.get<any>('http://localhost/api/check/email?api_key=rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI&mail='+ mail);
  }

  async messageToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  registerUser() {

    if (this.phone.length===0){
      this.messageToast('Debe ingresar un teléfono');
      this.phone = '';
      this.password = '';
      this.confirmpassword = '';
    }
    if (this.email.length === 0) {
      this.messageToast('Debe ingresar un correo electrónico');
      this.password = '';
      this.confirmpassword = '';
    } else if (this.password !== this.confirmpassword) {
      this.messageToast('Las contraseñas no coinciden.');
      this.password = '';
      this.confirmpassword = '';
    } else {
      //Esta API es tan básica que creo que es mejor consumirla así
      this.checkDuocMail(this.email).subscribe((response) => {
        console.log(response)
        if (response.code === 1) {
          this.httpClient.post('http://localhost/api/register', {email: this.email, password: this.password,
          phone: this.phone,
          driver: this.driver,
          patente: this.patente}).subscribe(response => {
            console.log('POST request success:', response);
            this.router.navigate(['/menu']);
          }, error => {
            // Handle any errors
            console.error('POST request error:', error);
          });
          //Enviar solicitud de creación de usuario
          console.log(response.code);
        } else if(response.code === 255) {
          this.router.navigate(['/inicio']);
          this.messageToast('El correo electrónico otorgado no pertenece a ningún alumno de DuocUC');
        } else {
          this.router.navigate(['/inicio']);
          this.messageToast('Error desconocido');
        }
      })
    }



  }


  // goToRegistrarse() {
  //   this.router.navigate(['/registrarse']);
  // }

  ngOnInit() {
  }

}
