import {Routes} from "@angular/router";
import {loginComponent} from "./views/login/login.component";
import {blankComponent} from "./components/common/layouts/blank.component";
import {basicComponent} from "./components/common/layouts/basic.component";
import { propietarioViewComponent } from "./views/propietario-view/propietario-view.component";
import { vinculacionViewComponent } from "./views/vinculacion-view/vinculacion-view.component";
import { taxistaViewComponent } from "./views/taxista-view/taxista-view.component";
import { empleadoViewComponent } from "./views/empleado-view/empleado-view.component";
import { vehiculoViewComponent } from "./views/vehiculo-view/vehiculo-view.component";


export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  {
    path: '', component: basicComponent,
    children: [
      {path: 'propietario', component: propietarioViewComponent},
      {path: 'vinculacion', component: vinculacionViewComponent},
      {path: 'taxista', component: taxistaViewComponent},
      {path: 'empleado', component: empleadoViewComponent},
      {path: 'vehiculo', component: vehiculoViewComponent},
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent },
    ]
  },

  // Handle all other routes
  {path: '**',    component: loginComponent }
];
