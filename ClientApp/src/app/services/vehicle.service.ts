import { Vehicle } from './../models/vehicle';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { SaveVehicle } from '../models/vehicle';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http) { }
    getMakes() {
    return this.http.get('/api/makes').pipe<any>(map((res: { json: () => void; }) => res.json()));
  }
  getFeatures(){
    return this.http.get('/api/features').pipe<any>(map((res: { json: () => void; }) => {
      return res.json();
    }));
  }
  create(vehicle){
    return this.http.post('api/vehicles', vehicle).pipe<any>(map((res: { json: () => void; }) => res.json()));
  }

  update(vehicle: SaveVehicle){
      return this.http.put('/api/vehicles/' + vehicle.id, vehicle).pipe<any>(map((res: { json: () => void; }) => res.json()));
      }
  // getVehicle(){
  //   return this.http.get('/api/vehicles').pipe(map((res: { json: () => void; }) => {
  //     return res.json();
  //   }));
  // }
  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id).pipe<any>(map((res: { json: () => void; }) => res.json()));
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .pipe<any>(map(res => res.json()));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  delete(id) {
    return this.http.delete('/api/vehicles/' + id).pipe<any>(map((res: { json: () => void; }) => res.json()));
  }
}
