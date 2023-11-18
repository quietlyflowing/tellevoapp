import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataGetResponse, ApiResponse } from '../interfaces/interfaces';
import { ConnectableObservable, Observable, from } from 'rxjs';
import { retry, catchError, mergeMap } from 'rxjs/operators'
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})


export class BackendService {

  backendURL: string = 'http://tellevo-api.cornfield.agency/api'
  API_KEY: string = 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';
  constructor(private http: HttpClient, private storage: StorageService) { }
  params = new HttpParams();
  apiAppended = this.params.append('api_key', this.API_KEY);



  registerNewUser(mail: string, form: object): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ApiResponse>(`${this.backendURL}/register`, form, { params: this.apiAppended, headers: headers }).pipe(retry(3));
  }

  logUser(mail: string, password: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let form = { email: mail, password: password };
    return this.http.post<ApiResponse>(`${this.backendURL}/login`, form, { params: this.apiAppended, headers: headers }).pipe((retry(3)));
  }


  checkUserSession(): Observable<ApiResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          return this.http.get<ApiResponse>(`${this.backendURL}/check`, { params: this.apiAppended, headers: header }).pipe(retry(3));
        })
      );
  }

  logoutSession(): Observable<ApiResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          return this.http.get<ApiResponse>(`${this.backendURL}/logout`, { params: this.apiAppended, headers: header }).pipe(retry(3));
        })
      );
  }



  getUserData(): Observable<DataGetResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          return this.http.get<DataGetResponse>(`${this.backendURL}/obtener/datos/usuario`, { params: this.apiAppended, headers: header }).pipe(retry(3),
            catchError((error) => {
              console.log('ERROR en request HTTP' + error);
              throw error
            }));
        })
      );
  }






}
