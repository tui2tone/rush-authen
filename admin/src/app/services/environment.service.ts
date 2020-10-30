import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    config: any;

    constructor(private http: HttpClient) { }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .get('/oauth-config')
                .toPromise()
                .then(response => {
                    if (response) {
                        const config = response as any;
                        this.config = config;
                        resolve(config);
                    } else {
                        resolve({});
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
