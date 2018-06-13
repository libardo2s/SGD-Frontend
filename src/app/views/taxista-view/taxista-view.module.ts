import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { taxistaViewComponent } from "./taxista-view.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalModule } from "ng2-bs3-modal";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LaddaModule } from 'angular2-ladda';

@NgModule({
    declarations: [taxistaViewComponent],
    imports     : [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BsModalModule,
        SimpleNotificationsModule,
        LaddaModule
    ],
})

export class TaxistaViewModule {}