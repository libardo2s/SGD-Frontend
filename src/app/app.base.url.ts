export class URLS {
    
    static debug = 'http://127.0.0.1:8000';

    static setToken(token: string) {
        sessionStorage.setItem('token', token);
    }

    static getToken() {
        return sessionStorage.getItem('token');
    }
}