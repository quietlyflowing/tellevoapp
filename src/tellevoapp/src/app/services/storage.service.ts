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
  
  public setBearerToken(Token: string): Promise<any> {
    return this.storage.set('_bearerToken', Token)
  }
  

  public async setString(Token: string): Promise<any> {
    try{
      const result = await this.storage.set('_string', Token);
      return result;}
      catch(error){
        return error;
      }
  }

  public async getBearerToken(): Promise<string> {
    try{
      const token = await this.storage.get('_bearerToken');
      return token;
    } catch (error) {
      console.error('Error recuperando token:', error);
      throw error; 
    }
  }

  public removeBearerToken(): Promise<any> | undefined {
    return this._storage?.remove('_bearerToken');
  }

  public setLoginCredentials(email: string, password: string ){
    this._storage?.set('_mail', email);
    this._storage?.set('_password', password);
  }
  
}
