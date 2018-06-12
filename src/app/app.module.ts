import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropietarioViewModule } from './views/propietario-view/propietario-view.module';
import { VinculacionViewModule } from './views/vinculacion-view/vinculacion-view.module';
import { TaxistaViewModule } from './views/taxista-view/taxista-view.module';
import { EmpleadoViewModule } from './views/empleado-view/empleado-view.modules';
import { LoginModule } from "./views/login/login.module";
import { VehiculoViewModule } from './views/vehiculo-view/vehiculo-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    // Views
    LoginModule,
    PropietarioViewModule,
    VinculacionViewModule,
    TaxistaViewModule,
    EmpleadoViewModule,
    VehiculoViewModule,

    // Modules
    LayoutsModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
