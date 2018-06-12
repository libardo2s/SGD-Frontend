import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    private id_viculacion;

    constructor() {}

    set(id: number){
        this.id_viculacion = id;
    }

    get(){
        return this.id_viculacion;
    }
}