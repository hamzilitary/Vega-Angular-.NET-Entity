import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: Http) { }
    getMakes() {
    return this.http.get('/api/makes').pipe(map((res: { json: () => void; }) => res.json()));
  }
}
