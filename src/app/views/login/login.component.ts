import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestService } from '../../service/request.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { URLS } from '../../app.base.url';

@Component({
    selector: 'login',
    templateUrl: 'login.template.html',
    providers: [RequestService]
})
export class loginComponent {
    loader: boolean;

    constructor(
        private requestService: RequestService,
        private router: Router,
        private serviceNotification: NotificationsService
    ) {}

    onSubmit(form) {
        this.loader = true;
        this.requestService.post('/api-token-auth/', form.value)
        .subscribe( result => {
            let str_response = JSON.stringify(result);
            let json_response = JSON.parse(str_response);
            this.router.navigate(['/propietario']);
            sessionStorage.setItem('username', form.value.username);
            URLS.setToken(json_response.token);
            this.loader = false;
        }, err => {
            this.loader = false;
            this.serviceNotification
            .error(
                '',
                'Credenciales inválidas, verifique e intente nuevamente', {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: false,
                clickIconToClose: true,
                animate: 'fromRight'
            });
        });
    }
 }