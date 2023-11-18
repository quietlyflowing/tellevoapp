import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private backend: BackendService, private storage: StorageService) { }

  async closeSession(): Promise<any> {
    try{
      const response = await this.backend.logoutSession().toPromise();
      if(response !== undefined && ((response.code === 3))){
        console.log('Se ha solicitado el cierre de sesión. Cerrando');
        await this.storage.removeBearerToken();
        console.log('Token borrado');
      }
    } catch(error) {
      console.log('Error, invalidando sesión de todos modos');
      await this.storage.removeBearerToken();
      console.log('Token borrado.')
    }
  }

  async checkSession(): Promise<boolean>{
    try{
      const response = await this.backend.checkUserSession().toPromise();
      if(response !== undefined && ((response.code === 2) && response.token !== undefined)){
        console.log('Sesión válida. Refrescando token');
        const refreshToken = response.token;
        await this.storage.setBearerToken(refreshToken);
        console.log('Token guardado');
        const newToken =  await this.storage.getBearerToken();
        console.log('Nuevo Token: '+ newToken);
        return true;
      } else {
        console.log('Error en checkSession, línea 54')
        return false;
      }
    }catch(error){
      console.log('Error en checkSession línea 58');
      console.log(error);
      return false;
    }
  }


 



}
