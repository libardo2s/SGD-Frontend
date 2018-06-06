import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalModule } from "ng2-bs3-modal";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LaddaModule } from 'angular2-ladda';
import { SearchFilterPipe } from "../../service/search.service";
import { vehiculoViewComponent } from "./vehiculo-view.component";
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@NgModule({
    declarations: [vehiculoViewComponent],
    imports     : [
        BrowserModule,
        BsModalModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleNotificationsModule,
        LaddaModule,
        NgxPaginationModule
    ],
})

export class VehiculoViewModule {}