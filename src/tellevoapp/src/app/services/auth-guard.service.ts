import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }


  async canActivate(): Promise<boolean> {
    console.log('canActivate: Verificando si se puede ingresar a la página solicitada')
    try{
      const result = await this.auth.checkSession();
      if(result){
        console.log(result);
        return result
      } else{
        console.log(result)
        this.router.navigate(['inicio']);
        return result;
      }
    }
    catch(error){
      console.log(error);
      this.router.navigate(['inicio']);
      return false;
    }
  }
}
