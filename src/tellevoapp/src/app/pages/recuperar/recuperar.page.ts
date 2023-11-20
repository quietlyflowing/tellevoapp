import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(private router: Router, private backend: BackendService, private toastController: ToastController) { }
  mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  question: number = 99;
  answer: string = '';
  email: string = '';


  async messageToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  formValidate(): object | boolean {
    let val1: boolean = false;
    let val2: boolean = false;
    let val3: boolean = false;
    if (this.email.length !== 0 && this.email.match(this.mailRegex)) {
      val1 = true;
    } else {
      this.messageToast('Debe ingresar un correo electrónico válido');
      return false;
    }
    if (this.question !== 99 || (this.question >= 0 || this.question <= 5)) {
      val2 = true;
    } else {
      this.messageToast('Debe escojer su pregunta de seguridad');
      return false;
    }
    if (this.answer.length !== 0) {
      val3 = true
    } else {
      this.messageToast('Debe responder su pregunta de seguridad');
      return false;
    }
    if (val1 && val2 && val3) {
      const json = { email: this.email, question: this.question, answer: this.answer.trim() }
      return json;
    } else {
      return false
    }

  }

  goToRecoveryTwo() {
    let toSend = this.formValidate();
    console.log(toSend);
    if (typeof (toSend) === 'object') {
      console.log('toSend es un Objeto')
      this.backend.askPasswordRecoveryPermission(toSend).toPromise()
      .then((response) => {
          if (response?.code === 18) {
            const hash:any  = response?.data;
            const dataToSend = {hash: hash.hash}
            console.log(hash);
            this.router.navigate(['recovery-two/'], { queryParams: dataToSend });
          }
        })
        .catch((error) => {
          console.log(error);
          this.messageToast('Ocurrió un error')
        });
    } else {
      console.log(toSend);
      console.log('toSend no es un Objeto')
    }
  }
  ngOnInit() {

  }

}
