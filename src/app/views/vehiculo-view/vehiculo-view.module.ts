import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalModule } from "ng2-bs3-modal";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LaddaModule } from 'angular2-ladda';
import { vehiculoViewComponent } from "./vehiculo-view.component";
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [vehiculoViewComponent],
    imports     : [
        BrowserModule,
        BsModalModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleNotificationsModule,
        LaddaModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ],
})

export class VehiculoViewModule {}