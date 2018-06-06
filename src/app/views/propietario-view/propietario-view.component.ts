import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { RequestService } from '../../service/request.service';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2';
import { URLS } from '../../app.base.url';
import { Router } from '@angular/router';

@Component({
    selector: 'propietarioView',
    templateUrl: 'propietario-view.template.html',
    providers: [RequestService]
})

export class propietarioViewComponent implements OnInit {

    lista_propietarios = [];
    lista_propietarios_copia = [];
    lista_departamentos = [];
    lista_full_departamentos = [];
    lista_municipios = [];
    lista_vehiculos_propietario = [];
    show_table: boolean;
    isLoading: boolean;
    documento_select: Number;
    str_propietario: string;
    propietario_select: any;

    options = {
        position: ['top', 'rigth'],
        lastOnBottom: true
    }

    /* datos edit */
    nombres_select: string;
    apellidos_select: string;
    direccion_select: string;
    departamento_select: string;
    municipio_select: string;
    telefono_select: number;
    fecha_cumpleanos_select: string;
    vial_select: string;
    /* datos edit */

    @ViewChild('modalRegisterPropietario')
    modalPropietario: BsModalComponent;
    
    @ViewChild('modalListTaxis')
    modalTaxi: BsModalComponent;

    @ViewChild('modalRegisterTaxi')
    modalAddTaxi: BsModalComponent;

    @ViewChild('modalEditPropietario')
    modalEditPropietario: BsModalComponent;

    constructor(
        private request: RequestService,
        private serviceNotification: NotificationsService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if(URLS.getToken() === null){
            this.router.navigate(['/login']);
        }else {
            this.getAllPropietarios();
            this.getDepartamentos();
        }
    }

    private getAllPropietarios() {
        this.request.get('/api/propietario/')
        .subscribe(result => {
            if( result.isOk){
                this.lista_propietarios = result.content;
                this.lista_propietarios_copia = this.lista_propietarios;
                if(this.lista_propietarios.length !== 0)
                    this.show_table = true;
            }
        }, err => {
            console.log(err);
        });
    }

    private getDepartamentos() {
        this.request.get('/departamentos/')
        .subscribe(result => {
            let data = JSON.stringify(result);
            let data_json = JSON.parse(data);
            this.lista_full_departamentos = data_json;
            for(let item in result) {
                this.lista_departamentos.push(item);
            }
        }, err => {
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

    onlyNumbers(event: any) {
        const pattern = /[0-9\+\$]/;
        let char = String.fromCharCode(event.charCode);
        if (!pattern.test(char))
            event.preventDefault();
    }

    onlyText(event: any) {
        const pattern = /[A-Z\a-z\+\$\ ]/;
        let char = String.fromCharCode(event.charCode);
        if (!pattern.test(char))
            event.preventDefault();
    }

    buscarPropietario(event: any) {
        console.log(event.target.value);
    }

    onChange(event) {
        this.lista_municipios = this.lista_full_departamentos[event];
    }

    onSubmitRegister(form) {
        this.isLoading = true;
        this.request.post('/api/propietario/', form.value)
        .subscribe( result => {
            if (result.isOk) {
                this.showAlertSucces(result.message);
                this.lista_propietarios.push(result.content[0]);
                this.lista_propietarios_copia = this.lista_propietarios;
            }else {
                this.showAlertError(result.message);
            }
            this.isLoading = false;
            this.modalPropietario.close();
        }, err => {
            this.showAlertError('Ha ocurrido un error, intente nuevamnete');
            this.isLoading = false;
            this.modalPropietario.close()
        });
    }

    onSubmitRegisterTaxi(form){
        this.isLoading = true;
        form.value.propietario = this.documento_select;
        this.request.post('/api/vehiculo/', form.value)
        .subscribe( result => {
            if (result.isOk) {
                this.showAlertSucces(result.message);
                let i = this.lista_propietarios.findIndex(x=>x.persona.numero_documento===this.documento_select);
                this.lista_propietarios[i].taxis += 1;                 
            }else {
                this.showAlertError(result.message);
            }
            this.isLoading = false;
            this.modalAddTaxi.close();
        }, err => {
            this.showAlertError('Ha ocurrido un error, intente nuevamnete');
            this.isLoading = false;
            this.modalAddTaxi.close();
        });
    }

    onSubmitEdit(form){
        this.isLoading=true;
        this.request.post('/api/propietario/actualizar/', form.value)
        .subscribe(result=> {
            if(result.isOk) {
                this.showAlertSucces(result.message);
                let item = result.content[0];
                let itemStr = JSON.stringify(item);
                let itemJson = JSON.parse(itemStr);
                let pos = this.lista_propietarios.findIndex(x=>x.persona.numero_documento===itemJson.persona.numero_documento);                
                this.lista_propietarios[pos] = itemJson;
                this.lista_propietarios_copia = this.lista_propietarios;
            }else {
                this.showAlertError(result.message);
            }
            this.modalEditPropietario.close();
            this.isLoading = false;
        }, err => {
            this.modalEditPropietario.close();
            this.showAlertError('Ha ocurrido un error, intente nuevamente');
            this.isLoading = false;
        });
    }
    
    showTaxis(documento, nombre, apellidos) {
        this.documento_select = documento;
        this.str_propietario = String(nombre).toUpperCase() + ' ' + String(apellidos).toUpperCase();
        this.request.get('/api/vehiculo/'+this.documento_select+'/')
        .subscribe(result => {
            if(result.isOk){
                this.lista_vehiculos_propietario = result.content;
            }else {
                this.showAlertError(result.message);
            }
        }, err => {
            this.showAlertError('Ha ocurrido un error, intente nuevamente');
        });
        this.modalTaxi.open('lg');

    }

    showEditPropietario(propietario: any) {
        this.documento_select = propietario.persona.numero_documento;
        this.nombres_select = propietario.persona.nombres;
        this.apellidos_select = propietario.persona.apellidos;
        this.direccion_select = propietario.persona.direccion;
        this.departamento_select = propietario.persona.departamento;
        this.lista_municipios = this.lista_full_departamentos[this.departamento_select];
        this.municipio_select = propietario.persona.municipio;
        this.telefono_select = propietario.persona.telefono;
        this.fecha_cumpleanos_select = propietario.fecha_cumpleanos;
        this.vial_select = propietario.vial;
        this.modalEditPropietario.open();
    }
    
    showAddTaxi(id: Number, documento: Number) {
        this.documento_select = documento;
        this.modalAddTaxi.open();
    }

    openDialogDelete(documento) {
        Swal({
            title: '',
            text: 'Seguro desea eliminar el propietario identificado con el documento: '+ documento,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF50A6',
            cancelButtonColor:'#1c84c6',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.request.get('/api/propietario/eliminar/'+documento+'/')
                .subscribe(result=>{
                    if(result.isOk) {
                        let index = this.lista_propietarios.findIndex(x=>x.persona.numero_documento===documento);
                        this.lista_propietarios.splice(index,1);
                        this.lista_propietarios_copia = this.lista_propietarios;
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
}