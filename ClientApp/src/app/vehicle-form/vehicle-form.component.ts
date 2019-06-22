import { SaveVehicle, Vehicle } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';
import { ToastyService } from 'ng2-Toasty';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/Observable/forkJoin';
import { viewAttached } from '@angular/core/src/render3/instructions';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes; 
  models;
  features;
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
    {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    }

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]); 
        this.populateModels();       
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

private setVehicle(v: Vehicle) {
  this.vehicle.id = v.id;
  this.vehicle.makeId = v.make.id;
  this.vehicle.modelId = v.model.id;
  this.vehicle.isRegistered = v.isRegistered;
  this.vehicle.features = _.pluck(v.features, 'id');
  this.vehicle.contact = v.contact;
  
} 

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked)
    this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }


  }
  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'The vehicle was sucessfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    }
    else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));

    }
  }
  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }
 
}
//private makeService: MakeService
//this.makeService.getMakes().subscribe(makes => this.makes = makes)