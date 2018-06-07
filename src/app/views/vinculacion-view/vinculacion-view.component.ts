import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { RequestService } from '../../service/request.service';
import { Router } from '@angular/router';
import { URLS } from '../../app.base.url';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ImageService } from 'angular2-image-upload/lib/image-upload/image.service';
import Swal from 'sweetalert2';
import { RequestOptions, Headers } from '@angular/http';
import { UploadMetadata } from 'angular2-image-upload';

@Component({
    selector: 'vinculacionView',
    templateUrl: 'vinculacion-view.template.html',
    providers: [RequestService, ImageService]
})
export class vinculacionViewComponent implements OnInit {

    p: number = 1;

    lista_vinculaciones = [];
    lista_vehiculos = [];
    isLoading: boolean;
    loader_vinculacion: boolean;
    shoInfo: boolean;
    vehiculo: any;
    title: string;
    url: string;
    inputFileActive: number;
    private headers: Headers;

    optionsNotifications = {
        position: ['top', 'rigth'],
        lastOnBottom: true
    }

    soat_fecha: any;

    vinculacion_data = {
        soat_fecha: Date,
        tecno_fecha: Date,
        targeta_operacion_fecha: Date,
        seguro_fecha: Date,
        seguro_contra_fecha: Date,
        seguro_extra_fecha: Date
    }

    //MODALS
    @ViewChild('modalNuevaVinculacion')
    modalVinculacionDocumentos: BsModalComponent;

    @ViewChild('modalGenerarVinculacion')
    modalVinculacion: BsModalComponent;
    //MODALS 

    constructor(
        private request: RequestService,
        private serviceNotification: NotificationsService,
        private router: Router
    ){
        this.url = URLS.debug;
        this.headers = new Headers();
        this.headers.append('Authorization', 'JWT '+URLS.getToken());
    }
    
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
                // console.log(result)
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

    generateVinculacion(vehiculo){
        this.loader_vinculacion = true;
        // console.log(vehiculo);
        let data = { 'id_vehiculo': vehiculo.id };
        this.request.post('/api/vinculacion/', data)
        .subscribe( result => {
            this.loader_vinculacion = false;
            this.modalVinculacion.close();
            // console.log(result);
            if (result.isOk) {
                this.lista_vinculaciones.push(result.content[0]);
                this.showAlertSucces(result.message);
            }else{
                this.showAlertError(result.message);
            }
        }, err => {
            this.loader_vinculacion = false;
            this.showAlertError('Ha ocurrido un error, intente nuevamente');
        })
    }

    openDialogDelete(pk) {
        Swal({
            title: '',
            text: 'Seguro desea eliminar esta vinculacion ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF50A6',
            cancelButtonColor:'#1c84c6',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.request.delete('/api/vinculacion/'+pk+'/')
                .subscribe(result=>{
                    if(result.isOk) {
                        let index = this.lista_vinculaciones.findIndex(x=>x.id===pk);
                        this.lista_vinculaciones.splice(index,1);
                        this.showAlertSucces(result.message);
                    } else {
                        this.showAlertError(result.message);
                    }
                }, err =>{
                    this.showAlertError('Ha ocurrido un error, por favor intente nuevamnete');
                });
            }
        })
    }

    openModalDocumentosVinculacion(placa, id) {
        this.title = placa;
        this.modalVinculacionDocumentos.open('lg');
    }

    onBeforeUploadSoat(metadata: UploadMetadata){
        let data = {
            type: 0,
            date: this.vinculacion_data.soat_fecha
        }
        console.log(data);
        metadata.formData = data;
        return metadata;
    }

    onUploadFinished(event) {
        // console.log(event);
    }
}