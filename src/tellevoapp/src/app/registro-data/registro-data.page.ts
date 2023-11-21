import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-registro-data',
  templateUrl: './registro-data.page.html',
  styleUrls: ['./registro-data.page.scss'],
})
export class RegistroDataPage implements OnInit {

  constructor(private router: Router, private activated: ActivatedRoute, private toast: ToastController, private backend: BackendService) { }

  imCreating: boolean = true;
  phone: string ='';
  address_home: string = '';
  address_duoc: string = '';
  driver: boolean = false;
  email: string = '';
  regEx: RegExp = /^[0-9]*$/g 

  async messageToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }


  formValidate(): object| boolean {
    let var1, var2: boolean;
    let driverStatus: number;
    if((this.phone.length !== 0  && this.phone.length === 9) && this.phone.match(this.regEx)){
      var1 = true;
    } else{
      this.messageToast('Debe ingresar un número de teléfono válido');
      return false;
    }
    if((this.address_home.length !==0 && this.address_duoc.length !==0)){
      var2 = true;
    } else {
      this.messageToast('Debe ingresar un a dirección válida');
      return false;
    }
    if(this.driver === true){
      driverStatus = 1;
    } else{
      driverStatus = 0;
    }
    if(var1 && var2) {
      const data = {phone: this.phone, home: this.address_home, duoc: this.address_duoc, isDriver: driverStatus, email: this.email}
      return data;
    }
    return false;
  }

  formValidateOnUpdate(): object| boolean {
    let var1, var2: boolean;
    let driverStatus: number;
    if((this.phone.length !== 0  && this.phone.length === 9) && this.phone.match(this.regEx)){
      var1 = true;
    } else{
      this.messageToast('Debe ingresar un número de teléfono válido');
      return false;
    }
    if((this.address_home.length !==0 && this.address_duoc.length !==0)){
      var2 = true;
    } else {
      this.messageToast('Debe ingresar un a dirección válida');
      return false;
    }
    if(this.driver === true){
      driverStatus = 1;
    } else{
      driverStatus = 0;
    }
    if(var1 && var2) {
      const data = {telefono: this.phone, direccion_hogar: this.address_home, direccion_duoc: this.address_duoc}
      return data;
    }
    return false;
  }

  goBack(){
    this.router.navigate(['inicio/']);
  }
  goNext(){
    const form = this.formValidate();
    if(typeof(form) === 'object'){
      if(this.driver===false){
        console.log(form); 
        this.router.navigate(['registro-final/'], {queryParams: form});
      } 
      if(this.driver===true){
        console.log(form); 
        this.router.navigate(['registro-vehiculo/'], {queryParams: form});
      }
    }
  }

  async updateData() {
    const form = this.formValidateOnUpdate();
    if(typeof(form)==='object'){
      try{
        const response = await this.backend.updateUserInfo(form).toPromise();
        if(response?.code === 25){
          this.messageToast('Datos actualizados exitosamente');
          this.router.navigate(['/']);
        } else{
          this.messageToast('Los datos no fueron actualizados');
          this.router.navigate(['/']);
        }
      } catch(error){
        this.messageToast('Los datos no fueron actualizados');
        this.router.navigate(['/']);
      }
    }
  }

  goToMenu(){
    this.router.navigate(['/'])
  }

  ngOnInit() {
    const queryParams = this.activated.snapshot['queryParams'];
    console.log(queryParams);
    this.email=queryParams['email'];
    if(queryParams['imCreating']){
      this.imCreating= false;
      this.phone=queryParams['phone'];
      this.address_duoc=queryParams['duoc'];
      this.address_home=queryParams['home'];
    }
    
  }

}
