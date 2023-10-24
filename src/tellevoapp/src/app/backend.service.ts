import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiResponse } from './interfaces/interfaces';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})


export class BackendService {

 backendURL: string = 'http://localhost/api'; 
 API_KEY: string = 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';
  constructor(private http: HttpClient, private storage: StorageService) { }
  params = new HttpParams();
  apiAppended = this.params.append('api_key', this.API_KEY);

  registerNewUser(mail: string, form: object): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ApiResponse>(`${this.backendURL}/register`, form, { params: this.apiAppended, headers: headers }).pipe();
  }

  logUser(mail: string, password: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let form = { email: mail, password: password };
    return this.http.post<ApiResponse>(`${this.backendURL}/login`, form, { params: this.apiAppended, headers: headers }).pipe();
  }

  checkSession(): Boolean {
    let token: string;

    this.storage.getBearerToken().then((retrieve) => {
      token = retrieve;
      console.log('TOKEN: ' + token);
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      this.http.get<ApiResponse>(`${this.backendURL}/check`, { params: this.apiAppended, headers: header }).pipe().subscribe((success) => {
        if (success.code === 2) {
          this.storage.setBearerToken(success.token!);
          return true;
        } else if(success.code !== 2 || success.message === 'No hay sesión iniciada') {
          return false;
        } else {
          return false;
        }
      }, (error) => {
        console.log(error);
        return false;
      });
    });
    return false;
  }

  logoutUSer(): boolean {
    let token: string;
    this.storage.getBearerToken().then((retrieve) => {
      token = retrieve;
      console.log('TOKEN: ' + retrieve);
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      this.http.get<ApiResponse>(`${this.backendURL}/logout`, { params: this.apiAppended, headers: header }).pipe().subscribe((success)=>{
        console.log(success)
        if(success.code === 3){
          this.storage.removeBearerToken();
          console.log('Llegué a la línea 72')
          return true;
        } else {
          this.storage.removeBearerToken();
          return true;
        }
      }, (error) => {
        console.log(error)
        this.storage.removeBearerToken();
        console.log('Llegué a la línea 80')
        return true;
      });
      console.log('Llegué a la línea 83')
      return true;
    }, (notfound) =>{
      console.log('Llegué a la línea 86')
      return true
    })
    console.log('Llegué a la línea 89') 
    this.storage.removeBearerToken();
    return true;
  }

  // getUserData(): Observable<ApiResponse> {
  //   let token: string;
  //   this.storage.getBearerToken().then((retrieve) =>{
  //     token = retrieve;
  //     console.log('TOKEN ' + token);
  //     const header = new HttpHeaders({
  //       'Authorization': 'Bearer ' + token
  //     });
  //     return this.http.get<ApiResponse>(`${this.backendURL}/obtener/datos/usuario`, { params: this.apiAppended, headers: header }).pipe()
  //   }, error=>{
  //     return new Observable<ApiResponse>;
  //   }); 
  //   return new Observable<ApiResponse>;
  // }

  // getUserData(): Observable<ApiResponse> {
  //   let token: string;
  //   this.storage.getBearerToken().then((retrieve) => {
  //     token = retrieve;
  //   })
  //   const header = new HttpHeaders({
  //     'Authorization': 'Bearer ' + token!
  //   });
  //   return this.http.get<ApiResponse>(`${this.backendURL}/obtener/datos/usuario`, { params: this.apiAppended, headers: header }).pipe()
  // }
  
    
}
