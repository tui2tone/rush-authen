import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
@Injectable()
export class RequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const currentUsers = req.user
        delete req.body.updatedAt
        if (currentUsers) {
            if (!req?.body?.createdBy) {
                req.body.createdById = currentUsers?.empId
            }
            if (!req?.body?.updatedBy) {
                req.body.updatedById = currentUsers?.empId
            }
        }
        req.body = Object.entries(req.body).reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {})
        req.body = removeRelationFields(req.body)
        return next.handle();
    }
}

const replaceIdFields = (data) => {
    const keys = Object.keys(data)
    keys.map((key) => {
        if (key.endsWith("Id")) {
            const replaceKey = key.replace("Id", "")
            delete data[replaceKey]
        }

        if (Array.isArray(data[key])) {
            data[key] = data[key].map((item) => {
                return replaceIdFields(item)
            })
        }
    })

    return data
}


const removeRelationFields = (payload) => {
    // Datatable Array
    if (Array.isArray(payload)) {
        payload = payload.map((item) => {
            return replaceIdFields(item)
        })
    }

    if (payload && Array.isArray(payload.data)) {
        payload.data = payload.data.map((item) => {
            return replaceIdFields(item)
        })
    }

    if (payload.form && Array.isArray(payload.form)) {
        payload.form = payload.form.map((item) => {
            return replaceIdFields(item)
        })
    }

    if (payload.employee) {
        payload.employee = replaceIdFields(payload.employee)
    }

    if (payload && typeof payload === "object") {
        return replaceIdFields(payload)
    }

    return payload
}