import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';
import { ToastyService } from 'ng2-Toasty';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes;
  models;
  features;
  vehicle: any =  {
    features: [],
    contact: {}
  };
  

  constructor(
    private vehicleService: VehicleService,
    private toastyService: ToastyService) { 
    
  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.vehicleService.getFeature().subscribe(features => this.features = features);  
  
}

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
  onFeatureToggle(featureId, $event){
    if($event.target.checked)
    this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }


  }
  submit(){
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x), err => {
      this.toastyService.error({
        title: 'Error',
        msg: 'An Unexpected Error Happened.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    });
  }
}
//private makeService: MakeService
//this.makeService.getMakes().subscribe(makes => this.makes = makes)