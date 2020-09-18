
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
    apiUrl: String = '';
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    getApiUrl(): String {
        if (this.apiUrl) { return this.apiUrl }
        this.apiUrl = ''
        return this.apiUrl
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        } else {
            return req.clone({});
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('/assets/') > -1) {
            return next.handle(req);
        }
        if (req.url.indexOf('http') > -1) {
            return next.handle(req);
        }
        const url = this.getApiUrl();
        req = req.clone({
            url: url + req.url
        });
        return next.handle(this.addToken(req, ''))
            .pipe(map((event: any) => {
                return event;
            }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                        }

                        if (err.status === 0) {
                            return throwError({
                                error: {
                                    message: "Something went wrong. Please contact system admin"
                                }
                            })
                        }
                        return throwError(err);
                    }
                }))
    }
}
