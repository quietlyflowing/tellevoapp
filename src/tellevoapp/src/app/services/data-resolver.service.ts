import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable } from 'rxjs'; 
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private backend: BackendService) { }

  resolve(): Observable<any>{
    return this.backend.getUserData();
  }
}
