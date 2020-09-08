import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as _ from 'underscore';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((error: Error) => {

                    console.error(error)

                    if (error.message) {

                        // Not Found Exception Checking
                        if ((error?.message as any)?.statusCode == 404) {
                            return throwError(new HttpException(({
                                statusCode: HttpStatus.NOT_FOUND
                            }), HttpStatus.NOT_FOUND))
                        }


                        // Not Found Exception Checking
                        if ((error as any)?.status == 401) {
                            return throwError(new HttpException(({
                                statusCode: HttpStatus.UNAUTHORIZED
                            }), HttpStatus.UNAUTHORIZED))
                        }

                        // Is Error from Class Validator
                        const errorObject = error.message as any
                        if (Array.isArray(errorObject.message)) {
                            const errors = {}
                            errorObject.message.map((item) => {
                                errors[item.property] = Object.keys(item.constraints)
                            })

                            return throwError(new HttpException(({
                                statusCode: HttpStatus.BAD_REQUEST,
                                errors
                            }), HttpStatus.BAD_REQUEST))
                        }

                        // Check Query Failed
                        if (error.message && error.message.indexOf("DELETE") > 0) {
                            return throwError(new HttpException(({
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: "CANNOT_DELETE"
                            }), HttpStatus.BAD_REQUEST))
                        }

                        if (error.message && error.message.indexOf("UNIQUE") > 0) {
                            const errors = {}
                            const uniqueError = error as any
                            uniqueError.uniqueFields = uniqueError.uniqueFields || []
                            uniqueError.uniqueFields.map((item) => {
                                errors[item] = ["alreadyTaken"]
                            })
                            return throwError(new HttpException(({
                                statusCode: HttpStatus.BAD_REQUEST,
                                errors
                            }), HttpStatus.BAD_REQUEST))
                        }

                        if (error.message) {
                            return throwError(new HttpException(({
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: error.message
                            }), HttpStatus.BAD_REQUEST))
                        }
                    }

                    return throwError(error);
                })
            );
    }
}