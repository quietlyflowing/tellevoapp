import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WillBePickedUpService {
  constructor() { }
    //baseURL: string = 'http://localhost/api/monitr/viaje/usuario?api_key=rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI';  
    baseURL: string = 'https://tellevo-api.cornfield.agency/api/monitor/viaje/usuario?api_key=rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI'
    //@ts-ignore
    private eventsource: EventSource;
  
    connect(userId: number): Observable<any> {
      this.eventsource = new EventSource(this.baseURL + '&user_id=' + userId);
      
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
