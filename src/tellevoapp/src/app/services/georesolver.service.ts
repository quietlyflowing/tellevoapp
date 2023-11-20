import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Resolve } from '@angular/router';
import { Position } from 'geojson';


@Injectable({
  providedIn: 'root'
})
export class GeoResolverService implements Resolve<any> {

  constructor() { }

  async resolve(): Promise<any>{
    try{
      const position = await Geolocation.getCurrentPosition();
      console.log(position);
      return position;
    } catch(error) {
      console.log('ERROR: No hay datos o algo paso en georesolver')
      console.log(error);
      return false;
    }
  }
}
