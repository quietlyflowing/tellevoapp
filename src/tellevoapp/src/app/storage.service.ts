import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})



export class StorageService {

  private _storage: Storage | null = null;
  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  public setBearerToken(Token: string): Promise<any> | undefined {
    return this.storage.set('_bearerToken', Token)
  }

  public getBearerToken(): Promise<string> {
    return this.storage.get('_bearerToken');
  }

  public removeBearerToken(){
    this._storage?.remove('_bearerToken');
  }

  public setLoginCredentials(email: string, password: string ){
    this._storage?.set('_mail', email);
    this._storage?.set('_password', password);
  }
  
}
