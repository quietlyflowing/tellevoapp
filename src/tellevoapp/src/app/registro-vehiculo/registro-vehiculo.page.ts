import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage implements OnInit {

  constructor(private router: Router, private activated: ActivatedRoute, private toast: ToastController, private backend: BackendService) { }
  imCreating: boolean = true;
  patente: string = '';
  modelo: string = '';
  year: number = -99;
  form: any;
  regexPatente = /(^([a-zA-Z]{2})([a-zA-Z]{2}|[0-9]{2})([0-9]{2})$)|(^([a-zA-Z]{2}[0-9]{3})$)/g
  
  async messageToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  formValidate(): object|boolean{
    let var1, var2, var3: boolean = false;
    if(this.patente.length===6 && this.patente.match(this.regexPatente)){
      var1 = true;
    } else {
      console.log(this.patente.match(this.regexPatente));
      this.messageToast('Debe ingresar una patente válida');
      return false;
    }
    if(this.modelo.length!==0 && this.modelo.length<3){
      this.messageToast('Debe ingresar una paténte válida');
      return false;
    } else{
      var2 = true;
    }
    if(this.year===-99 || this.year < 1970){
      this.messageToast('Debe ingresar un Modelo válido de auto');
      return false;
    } else{
      var3 = true;
    }
    if(var1 && var2 && var3) {
      const form = {patente: this.patente, modelo: this.modelo, año: this.year}
      return form;
    }
    return false;
  }

  goNext(){
    let formValidated = this.formValidate();
    if(typeof(formValidated)==='object'){
      const returnForm = {
        email: this.form.email,
        home: this.form.home,
        duoc: this.form.duoc,
        phone: this.form.phone,
        driver: this.form.isDriver,
        patente: this.patente,
        modelo: this.modelo,
        año: this.year
      }
      console.log(returnForm);
      this.router.navigate(['registro-final/'], {queryParams: returnForm});
    }
  }
  goBack(){
    this.router.navigate(['registro-data/']);
  } 
  goToMenu(){
    this.router.navigate(['/'])
  }

  
  async updateData() {
    const form = this.formValidate();
    if(typeof(form)==='object'){
      try{
        const response = await this.backend.updateVehicleInfo(form).toPromise();
        if(response?.code === 30){
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

  ngOnInit() {
    // this.activated.queryParams.subscribe(params => {
    //   const receivedData = params;
    //   this.form = receivedData;
    //   console.log(this.form);
    // });

    const queryParams = this.activated.snapshot['queryParams'];
    console.log(queryParams);

     this.form=queryParams;
     console.log(this.form);
    if(queryParams['imCreating']){
      this.imCreating= false;
      this.patente=queryParams['patente'];
      this.modelo=queryParams['modelo'];
      this.year=queryParams['año'];
    }
  }

}
