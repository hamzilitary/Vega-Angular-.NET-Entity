import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
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
      path: 'vehicles/:id',
      component: VehicleFormComponent
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
    }
  ];
  
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);