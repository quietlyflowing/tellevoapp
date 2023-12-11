import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro-final',
  templateUrl: './registro-final.page.html',
  styleUrls: ['./registro-final.page.scss'],
})
export class RegistroFinalPage implements OnInit {

  constructor(private activated: ActivatedRoute, private backend: BackendService, private router: Router, private toast: ToastController) { }

  async messageToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  imCreating: boolean = true;
  question: number = 99;
  answer: string = '';
  password: string= '';
  confirmPassword: string = '';
  form: any = '';
  email: string = '';

  formValidated(): boolean | object {
    let var1, var2, var3: boolean;
    if(this.answer.length===0 && this.answer.length < 3){
      var1 = false;
      this.messageToast('Debe escribir una respuesta a la pregunta escogida');
    } else{
      var1=true;
    }
    if(this.question == 99){
      var2 = false;
      this.messageToast('Debe escoger una pregunta de seguridad');
    } else{
      var2 = true;
    }
    if( (this.password.length===0 || this. confirmPassword.length===0) || (this.password !== this.confirmPassword)){
      this.password = '';
      this.confirmPassword = '';
      this.messageToast('Las contraseñas deben coincidir');
      var3 = false; 
    } else{
      var3= true;
    }
    if(var1 && var2 && var3){
      const form = {password: this.password, question: this.question, answer:this.answer.trim()}
      return form;
    }
    return false;
  }
  formValidated2(): boolean | object{
    if( (this.password.length===0 || this. confirmPassword.length===0) || (this.password !== this.confirmPassword)){
      this.password = '';
      this.confirmPassword = '';
      this.messageToast('Las contraseñas deben coincidir');
      return false; 
    } else{
      const form = {password: this.password, email: this.email};
      return form;
    }
  }

  cancel(){
    this.router.navigate(['inicio/']);
  }

  goBack(){
    if(this.form.isDriver === 0){
      this.router.navigate(['registro-data'])
    } else{
      this.router.navigate(['registro-vehiculo'])
    }
  }

  async recover(){
    const toSendForm = this.formValidated2();
    try{
      if(typeof(toSendForm)==='object'){
        console.log(toSendForm);
        const response = await this.backend.recoverPassword(toSendForm, this.form.hash).toPromise();
        if(response?.code===66){
          console.log(response);
          this.messageToast('¡Contraseña cambiada con éxito!');
          this.router.navigate(['registrarse/']);
        } else {
          this.messageToast('Lo sentimos, algo pasó');
          this.router.navigate(['inicio/']);
        }
      }
    }catch(error){
      console.log(error)
      this.messageToast('Ocurrió un error. Lo sentimos')
      this.router.navigate(['inicio/']);
    }
  }

  async register(){
    // {
    //   "email": "ju.perezg@duocuc.cl",
    //   "password": "password123",
    //   "phone": 5697556658,
    //   "home": "Avenida Siempreviva 722",
    //   "duoc": "Esquina Blanca 501,
    //   "driver": true,
    //   "patente": "DFLG-64",
    //   "modelo": "Chevrolet Cacharro",
    //   "año": 2023,
    //   "question": 0,
    //   "answer": "Cosito"
    // }
  
    const validatedForm = this.formValidated();
    if(typeof(validatedForm)==='object'){
      let registerForm: object;
      if(this.form.isDriver === 0){
        registerForm = {
          email: this.form.email,
          password: this.password,
          phone: this.form.phone,
          duoc: this.form.duoc,
          home: this.form.home,
          question: this.question,
          answer: this.answer,
          driver: this.form.isDriver
        }
      } else {
        registerForm = {
          email: this.form.email,
          password: this.password,
          phone: this.form.phone,
          duoc: this.form.duoc,
          home: this.form.home,
          question: this.question,
          answer: this.answer,
          driver: this.form.isDriver,
          patente: this.form.patente
        }
      }
      try{
        const response = await this.backend.registerNewUser(registerForm).toPromise();
        if(response?.code === 6){
          console.log(response);
          console.log('Registro creado correctamente! Ahora puede iniciar sesión');
          this.messageToast('¡Felicidades¡ ¡Se ha registrado correctamente!');
          this.router.navigate(['inicio/']);
        } else{
          console.log(response);
          this.messageToast('Error de registro');
          this.router.navigate(['inicio/']);
        }
      }catch(error){
        console.log(error);
        this.messageToast('Error de registro');
        this.router.navigate(['inicio/']);
      }
    }
  }

  ngOnInit() { 
    // this.activated.queryParams.subscribe(params => {
    //   const receivedData = params;
    //   this.form = receivedData;
    //   console.log(this.form);
    // });
    const queryParams = this.activated.snapshot['queryParams'];
    this.form = queryParams;
    console.log(this.form);
    if(queryParams['imCreating']){
      this.imCreating = false;
      this.email = this.form['email'];
    }
    
  }

}
