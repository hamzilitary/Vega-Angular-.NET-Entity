import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CallbackComponent } from './callback/callback.component';

// RouterModule.forRoot([
//     { path: '', redirectTo: 'home', pathMatch: 'full' },
//     { path: 'vehicles/new', component: VehicleFormComponent },
//     { path: 'vehicles/:id', component: VehicleFormComponent },
//     { path: 'home', component: HomeComponent },
//     { path: 'counter', component: CounterComponent },
//     { path: 'fetch-data', component: FetchDataComponent },
//     { path: '**', redirectTo: 'home' }
// ])
const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'vehicles/new',
      component: VehicleFormComponent
    },
    {
      path: 'vehicles/edit/:id',
      component: VehicleFormComponent
    },
    {
      path: 'vehicles/:id',
      component: ViewVehicleComponent
    },
    {
      path: 'vehicles',
      component: VehicleListComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'counter',
      component: CounterComponent
    },
    {
      path: 'fetch-data',
      component: FetchDataComponent
    },
    {
      path: 'callback',
      component: CallbackComponent
    }
  ];
  
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);