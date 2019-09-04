import { VehicleService } from './vehicle.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { SaveVehicle } from '../models/vehicle';
import { Vehicle } from './../models/vehicle';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private http: Http ) { }

    upload(vehicleId: number, file: string | File | Blob){
        var formData  = new FormData;
        formData.append('file', file);
        console.log("made it here");
        return this.http.post('/api/vehicles/' + vehicleId + '/photos', formData).pipe<any>(map((res: { json: () => void; }) => res.json()));
    }

    getPhotos(vehicleId){
        return this.http.get(`api/vehicles/${vehicleId}/photos`).pipe<any>(map((res: { json: () => void; }) => res.json()));

    }

}