import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    config: any;

    constructor(
        private http: HttpClient
    ) { }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (ENV.skipAuth) {
                return resolve({

                })
            }
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
                    if (error && error.error) {
                        const message = error.error.message
                        if (message == "Setup Required") {
                            resolve()
                            const setupUrl = (ENV.apiUrl + '/setup').replace("/api", "")
                            window.location.replace(setupUrl)
                        } 
                    } else {
                        reject(error);
                    }
                });
        });
    }
}
