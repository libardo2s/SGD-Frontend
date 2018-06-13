import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { URLS } from '../../app.base.url';
import { RequestService } from '../../service/request.service';
import { Router } from '@angular/router';

@Component({
    selector: 'taxistaView',
    templateUrl: 'taxista-view.template.html',
    providers: [RequestService]
})
export class taxistaViewComponent implements OnInit {

    lista_taxista = [];
    lista_departamentos = [];
    lista_full_departamentos = [];
    lista_municipios = [];

    constructor(
        private request: RequestService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if(URLS.getToken() === null){
            this.router.navigate(['/login']);
        }else {
            this.getDepartamentos();
        }
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

    onChange(event) {
        this.lista_municipios = this.lista_full_departamentos[event];
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
 }