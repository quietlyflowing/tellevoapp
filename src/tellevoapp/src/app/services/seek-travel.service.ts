import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeekTravelService {

  //baseURL: string = 'http://localhost/api/buscar/viaje?api_key=rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';  
  baseURL: string = 'https://tellevo-api.cornfield.agency/api/buscar/viaje?api_key=rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI'
  //@ts-ignore
  private eventsource: EventSource;
  constructor() { }

  connect(tariff: number, userId: number): Observable<any> {
    this.eventsource = new EventSource(this.baseURL + '&tariff=' + tariff + '&user_id=' + userId);
    
    return new Observable((observer)=>{
      this.eventsource.onmessage = (event: MessageEvent) => {
        observer.next(event);
    };
    this.eventsource.onerror = (error) => {
      observer.error(error);
    };
  }); 
  }

  disconnect() {
    if (this.eventsource) {
      this.eventsource.close();
    }
  }
}
