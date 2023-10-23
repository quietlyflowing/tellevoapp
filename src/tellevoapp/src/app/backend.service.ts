import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiResponse } from './interfaces/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class BackendService {

  backendURL: string = 'http://localhost/api';
  API_KEY: string = 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';
  constructor(private http: HttpClient) { }
  params = new HttpParams();
  apiAppended = this.params.append('api_key', this.API_KEY);

  // private checkIfMailIsValidDUOCMail(mailToValidate: string): Observable<ApiResponse> {
  //   let checkMail = this.apiAppended.append('mail', mailToValidate);
  //   console.log(checkMail);
  //   return this.http.get<ApiResponse>(`${this.backendURL}/check/email/`, { params: checkMail });
  // }

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

  checkSession(token: string): Observable<ApiResponse> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<ApiResponse>(`${this.backendURL}/check`, { params: this.apiAppended, headers: header }).pipe();
  }

  logoutUSer(token: string): Observable<ApiResponse> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<ApiResponse>(`${this.backendURL}/logout`, { params: this.apiAppended, headers: header }).pipe();
  }

  getUserData(token: String): Observable<ApiResponse> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<ApiResponse>(`${this.backendURL}/obtener/datos/usuario`, {params: this.apiAppended, headers: header}).pipe();
  }
}
