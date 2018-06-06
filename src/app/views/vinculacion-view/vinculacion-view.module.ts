import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { vinculacionViewComponent } from "./vinculacion-view.component";
import { FormsModule } from '@angular/forms';
import { BsModalModule } from "ng2-bs3-modal";
import { SimpleNotificationsModule } from "angular2-notifications";
import { LaddaModule } from 'angular2-ladda';
import { ImageUploadModule } from "angular2-image-upload";
import { SpinnerComponentModule } from 'ng2-component-spinner';

@NgModule({
    declarations: [vinculacionViewComponent],
    imports     : [
        BrowserModule,
        BsModalModule,
        FormsModule,
        SimpleNotificationsModule,
        LaddaModule,
        ImageUploadModule,
        SpinnerComponentModule,
    ],
})

export class VinculacionViewModule {}