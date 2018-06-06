import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { RequestService } from '../../service/request.service';
import {FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2';
import { URLS } from '../../app.base.url';
import { Router } from '@angular/router';

@Component({
    selector: 'vehiculoView',
    templateUrl: 'vehiculo-view.template.html',
    providers: [RequestService]
})
export class vehiculoViewComponent implements OnInit {

    lista_vehiculos = [];
    show_table = false;
    isLoading: boolean;

    @ViewChild('modalEditTaxi')
    modalEditTaxi: BsModalComponent;

    formUpdateVehiculo : FormGroup;

    constructor(
        private request: RequestService,
        private serviceNotification: NotificationsService,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.formUpdateVehiculo= this.fb.group({
            'id' : ['', [Validators.required] ],
            'propietario' : ['', [Validators.required] ],
            'placa' : ['', [Validators.required] ],
            'marca' : ['', [Validators.required] ],
            'modelo' : ['',[Validators.required] ],
            'color' : ['', [Validators.required] ],
            'linea' : ['', [Validators.required] ],
            'chasis' : ['', [Validators.required] ],
            'pasajeros' : ['', [Validators.required] ],
            'carroceria' : ['', [Validators.required] ],
            'motor' : ['', [Validators.required] ],
            'cilindraje' : ['', [Validators.required] ],
            'numero_licencia' : ['', [Validators.required] ],
        });
    }
    
    ngOnInit(): void {
        if (URLS.getToken() === null){
            this.router.navigate(['/login']);
        }else {
            this.getAllVehiculos();
        }
    }

    private getAllVehiculos() {
        this.request.get('/api/vehiculo/')
        .subscribe(result => {
            if( result.isOk){
                this.lista_vehiculos = result.content;
                if(this.lista_vehiculos.length !== 0)
                    this.show_table = true;
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
            }
        );
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
            }
        );
    }

    openEditModal(vehiculo) {
        this.formUpdateVehiculo.controls['id'].setValue(vehiculo.id);
        this.formUpdateVehiculo.controls['propietario'].setValue(vehiculo.propietario.persona.numero_documento);
        this.formUpdateVehiculo.controls['placa'].setValue(vehiculo.placa);
        this.formUpdateVehiculo.controls['marca'].setValue(vehiculo.marca);
        this.formUpdateVehiculo.controls['modelo'].setValue(vehiculo.modelo);
        this.formUpdateVehiculo.controls['color'].setValue(vehiculo.color);
        this.formUpdateVehiculo.controls['linea'].setValue(vehiculo.linea);
        this.formUpdateVehiculo.controls['chasis'].setValue(vehiculo.chasis);
        this.formUpdateVehiculo.controls['pasajeros'].setValue(vehiculo.pasajeros);
        this.formUpdateVehiculo.controls['carroceria'].setValue(vehiculo.carroceria);
        this.formUpdateVehiculo.controls['motor'].setValue(vehiculo.motor);
        this.formUpdateVehiculo.controls['cilindraje'].setValue(vehiculo.cilindraje);
        this.formUpdateVehiculo.controls['numero_licencia'].setValue(vehiculo.numero_licencia);
        this.modalEditTaxi.open();
    }

    openDialogDelete(placa) {
        Swal({
            title: '',
            text: 'Seguro desea eliminar el vehículo con placa: '+ placa,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF50A6',
            cancelButtonColor:'#1c84c6',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
            }
        })
    }

    updateVeh(form) {
        this.isLoading = true;
        this.request.post('/api/vehiculo/actualizar/', form.value)
        .subscribe(result => {
            this.isLoading = false;
            this.modalEditTaxi.close();
            if( result.isOk){
                let index = this.lista_vehiculos.findIndex(x=>x.id === form.value.id);
                this.lista_vehiculos[index] = result.content[0];
                this.showAlertSucces(result.message);
            }else {
                this.showAlertError(result.message);
            }
        }, err => {
            console.log(err);
            this.isLoading = false;
            this.modalEditTaxi.close();
            this.showAlertError('Ha ocurrido un error, por favor intente nuevamente');
            console.log(err);
        });
    }
}