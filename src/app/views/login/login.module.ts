import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import {loginComponent} from "./login.component";
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { SimpleNotificationsModule } from "angular2-notifications";

@NgModule({
    declarations: [loginComponent],
    imports     : [
        BrowserModule,
        FormsModule,
        SpinnerComponentModule,
        SimpleNotificationsModule.forRoot()]
})

export class LoginModule {}