import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataGetResponse, ApiResponse, CheckQuestionResponse } from '../interfaces/interfaces';
import { ConnectableObservable, Observable, from } from 'rxjs';
import { retry, catchError, mergeMap } from 'rxjs/operators'
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})


export class BackendService {

  backendURL: string = 'https://tellevo-api.cornfield.agency/api'
  //backendURL: string = 'http://localhost/api'
  API_KEY: string = 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';
  constructor(private http: HttpClient, private storage: StorageService) { }
  params = new HttpParams();
  apiAppended = this.params.append('api_key', this.API_KEY);



  registerNewUser(form: object): Observable<ApiResponse> {
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

  askPasswordRecoveryPermission(form: object): Observable<ApiResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          return this.http.post<ApiResponse>(`${this.backendURL}/check/question`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
            catchError((error) => {
              console.log('ERROR en request HTTP' + error);
              throw error
            }));
        })
      );
  }

  recoverPassword(form: object, hash: string): Observable<ApiResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          const requiredHash =  this.apiAppended.append('hash', hash);
          return this.http.post<DataGetResponse>(`${this.backendURL}/update/password`, form ,{ params: requiredHash, headers: header }).pipe(retry(3),
            catchError((error) => {
              console.log('ERROR en request HTTP' + error);
              throw error
            }));
        })
      );
  }

  updatePassword(form: object): Observable<ApiResponse> {
    return from(this.storage.getBearerToken())
      .pipe(
        mergeMap((retrieved) => {
          const token = retrieved || '';
          console.log('TOKEN ' + retrieved + ' recovered.');
          const header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
          });
          return this.http.post<DataGetResponse>(`${this.backendURL}/update/password/logged`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
            catchError((error) => {
              console.log('ERROR en request HTTP' + error);
              throw error
            }));
        })
      );
  }

  getAllQuestions(): Observable<ApiResponse>{
    return from(this.storage.getBearerToken())
    .pipe(
      mergeMap((retrieved) => {
        const token = retrieved || '';
        console.log('TOKEN ' + retrieved + ' recovered.');
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get<ApiResponse>(`${this.backendURL}/obtener/preguntas`, { params: this.apiAppended, headers: header }).pipe(retry(3));
      })
    );
  }

  updateUserInfo(form: object) {
    return from(this.storage.getBearerToken())
    .pipe(
      mergeMap((retrieved) => {
        const token = retrieved || '';
        console.log('TOKEN ' + retrieved + ' recovered.');
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.post<DataGetResponse>(`${this.backendURL}/update/user/info`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
          catchError((error) => {
            console.log('ERROR en request HTTP' + error);
            throw error
          }));
      })
    );
  }

  updateVehicleInfo(form: object) {
    return from(this.storage.getBearerToken())
    .pipe(
      mergeMap((retrieved) => {
        const token = retrieved || '';
        console.log('TOKEN ' + retrieved + ' recovered.');
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.post<DataGetResponse>(`${this.backendURL}/update/vehicle`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
          catchError((error) => {
            console.log('ERROR en request HTTP' + error);
            throw error
          }));
      })
    );
  }

  checkDuocMail(mail: string){
    const mailSent = this.apiAppended.append('mail', mail);
    return this.http.get<ApiResponse>(`${this.backendURL}/check/email/`,{ params: mailSent}).pipe(retry(3),
          catchError((error) => {
            console.log('ERROR en request HTTP' + error);
            throw error
          }));
  }
  
  publishTravel(form: object){
    return from(this.storage.getBearerToken())
    .pipe(
      mergeMap((retrieved) => {
        const token = retrieved || '';
        console.log('TOKEN ' + retrieved + ' recovered.');
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.post<DataGetResponse>(`${this.backendURL}/iniciar/viaje`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
          catchError((error) => {
            console.log('ERROR en request HTTP' + error);
            throw error
          }));
      })
    );
  }

  deleteTravel(form: object){
    return from(this.storage.getBearerToken())
    .pipe(
      mergeMap((retrieved) => {
        const token = retrieved || '';
        console.log('TOKEN ' + retrieved + ' recovered.');
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.post<DataGetResponse>(`${this.backendURL}/terminar/viaje`, form ,{ params: this.apiAppended, headers: header }).pipe(retry(3),
          catchError((error) => {
            console.log('ERROR en request HTTP' + error);
            throw error
          }));
      })
    );
  }

  getAddressFromCoordinates(lat: number, lon: number){
    const url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + String(lat) + '&lon='+ String(lon);
    return this.http.get<any>(url).pipe(retry(3));
  }
  getCoordinatesFromAddress(address: string){
    const url = 'https://nominatim.openstreetmap.org/search?q=' + address + '&format=json';
    return this.http.get<any>(url).pipe(retry(3));
  }
}
