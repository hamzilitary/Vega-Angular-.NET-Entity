import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AppErrorHandler } from './app.error-handler';
import { routing } from './app.routing';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule, BrowserXhr } from '@angular/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ToastyModule} from 'ng2-Toasty';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    PaginationComponent,
    VehicleListComponent,
    ViewVehicleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    routing,
    ToastyModule.forRoot(),
   
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: BrowserXhr, useClass: BrowserXhrWithProgress},
    VehicleService, 
    PhotoService,
    ProgressService
    
    
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
