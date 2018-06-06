import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { RequestService } from '../../service/request.service';
import { Router } from '@angular/router';
import { URLS } from '../../app.base.url';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ImageService } from 'angular2-image-upload/lib/image-upload/image.service';

@Component({
    selector: 'vinculacionView',
    templateUrl: 'vinculacion-view.template.html',
    providers: [RequestService, ImageService]
})
export class vinculacionViewComponent implements OnInit {

    lista_vinculaciones = [];
    lista_vehiculos = [];
    isLoading: boolean;
    loader_vinculacion: boolean;
    shoInfo: boolean;
    vehiculo: any;

    options = {
        position: ['top', 'rigth'],
        lastOnBottom: true
    }

    //MODALS
    @ViewChild('modalNuevaVinculacion')
    modalVinculacion: BsModalComponent;
    //MODALS 

    constructor(
        private request: RequestService,
        private serviceNotification: NotificationsService,
        private router: Router
    ){}
    
    ngOnInit(): void {
        if(URLS.getToken() === null){
            this.router.navigate(['/login']);
        }else {
            this.getAllVinculaciones();
        }
    }

    private getAllVinculaciones() {
        this.request.get('/api/vinculacion/')
        .subscribe( result=> {
            if(result.isOk) {
                this.lista_vinculaciones = result.content;
            }else {
                this.showAlertError(result.message);
            }
        }, err => {
            this.showAlertError('Ha ocurrido un problema, intente nuevamente');
        });
    }

    private getVehiculo(placa) {
        // console.log(placa);
        this.loader_vinculacion = true
        this.request.get('/api/vehiculo/'+placa+'/')
        .subscribe(result => {
            this.loader_vinculacion = false;
            if( result.isOk){
                this.vehiculo = result.content[0];
                this.shoInfo = true
            }else {
                this.showAlertError(result.message);
            }
        }, err => {
            this.loader_vinculacion = false;
            this.showAlertError('A ocurrido un error, intente nuevamente');
            console.log(err);
        });
    }

    private showAlertSucces(message){
        this.serviceNotification
        .success('', message, {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true,
            animate: 'fromRight',
        });
    }

    private showAlertError(message){
        this.serviceNotification
        .error('', message, {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true,
            animate: 'fromRight'
        });
    }

    onSubmitRegisterVinculacion(form) {

    }
}