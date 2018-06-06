import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { URLS } from '../app.base.url';
import { ResponseRequest } from '../models/response.request.models';

@Injectable()
export class RequestService {

    private baseUrl: string;
    // private options: RequestOptions;
    private headers: Headers;
    private options: RequestOptions;
    

    constructor(private http: Http) {
        this.baseUrl = URLS.debug;
        const token = URLS.getToken();

        this.headers = new Headers();
        this.headers.append('Authorization', 'JWT '+token);

        this.options = new RequestOptions({headers: this.headers});
    }

    get(url: string): Observable<ResponseRequest> {
        return this.http.get(this.baseUrl + url, this.options)
        .map((res : Response) => <ResponseRequest> res.json())
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    post(url: string, data: any): Observable<ResponseRequest> {
        return this.http.post(this.baseUrl + url, data, this.options)
        .map((res : Response) => <ResponseRequest> res.json())
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    delete(url: string): Observable<ResponseRequest> {
        return this.http.delete(this.baseUrl + url, this.options)
        .map((res : Response) => <ResponseRequest> res.json())
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}