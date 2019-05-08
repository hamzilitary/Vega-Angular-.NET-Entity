import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes;
  models: any[];
  features;
  vehicle: any =  {};
  

  constructor(
    private vehicleService: VehicleService) { 
    
  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.vehicleService.getFeature().subscribe(features => this.features = features);  
  
}

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
//private makeService: MakeService
//this.makeService.getMakes().subscribe(makes => this.makes = makes)