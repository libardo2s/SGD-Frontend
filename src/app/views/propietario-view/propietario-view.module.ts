import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { propietarioViewComponent } from "./propietario-view.component";
import { BsModalModule } from "ng2-bs3-modal";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LaddaModule } from 'angular2-ladda';
import { SearchFilterPipe } from "../../service/search.service";

@NgModule({
    declarations: [propietarioViewComponent, SearchFilterPipe],
    imports     : [
        BrowserModule,
        BsModalModule,
        FormsModule,
        SimpleNotificationsModule,
        LaddaModule,
    ],
})

export class PropietarioViewModule {}