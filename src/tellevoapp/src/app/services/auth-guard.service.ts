import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router, private toast: ToastController) { }

  async messageToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  async canActivate(): Promise<boolean> {
    console.log('canActivate: Verificando si se puede ingresar a la página solicitada')
    try{
      console.log('canActivate, línea 29: esperando resultados')
      const result = await this.auth.checkSession();
      console.log('canActivate, línea 31: resultado: '+result)
      if(result){
        console.log('canActivate, línea 33, devolviendo resultado ' +result)
        return result
      } else{
        console.log('canActivate, línea 36, devolviendo resultado ' +result)
        this.router.navigate(['inicio']);
        this.messageToast('Sesión no iniciada');
        return result;
      }
    }
    catch(error){
      console.log('canActivate, línea 42. Se atajó un error. retornando a inicio');
      console.log('ERROR de canActivate: '+error)
      this.router.navigate(['inicio']);
      this.messageToast('Sesión no iniciada');
      return false;
    }
  }
}
