import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryFilter, CondOperator } from '@nestjsx/crud-request';
import * as _ from 'underscore';

interface DatatableParams {
    fields: string[],
    bypassAutoFilter?: boolean;
    limit?: number,
    filters?: any[],
    join?: any
}

export const DatatableRequest = createParamDecorator(async (data: DatatableParams, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const keywords = req.query.keywords
    const orders = req.query.order || ""
    const options = req.options || {}
    const fields = data.fields || []
    const params = req['NESTJSX_PARSED_CRUD_REQUEST_KEY']
    data.limit = data.limit || 10;

    // Force Set Limit by Controller
    if (data.limit) {
        params.parsed.limit = data.limit
    }

    // Filter Parameters
    const excludeFields = ['keywords', 'page', 'limit', 'total', 'order']
    if (data.bypassAutoFilter) {
        excludeFields.push("companyId")
    }
    const andFilterFields = _.omit(req.query, excludeFields)
    const andFilterKeys = Object.keys(andFilterFields)
    if (andFilterKeys && andFilterKeys.length) {
        params.parsed.filter = andFilterKeys.map((field): QueryFilter => {
            if (Array.isArray(andFilterFields[field])) {
                return {
                    field: field,
                    operator: CondOperator.IN,
                    value: andFilterFields[field]
                }
            }
            // ID Specific
            if (field.endsWith("Id") || field === "id") {
                return {
                    field: field,
                    operator: CondOperator.EQUALS,
                    value: andFilterFields[field]
                }
            }
            return {
                field: field,
                operator: CondOperator.CONTAINS,
                value: andFilterFields[field]
            }
        })
    }

    if (data.filters) {
        params.parsed.filter = params.parsed.filter.concat(data.filters)
    }

    // Filter Keywords
    if (keywords) {
        params.parsed.or = fields.map((field): QueryFilter => {
            return {
                field: field,
                operator: CondOperator.CONTAINS,
                value: keywords
            }
        })
    }

    // Order By
    if (orders.trim()) {
        params.parsed.sort = orders.trim().split("|||").map((item = "") => {
            const data = item.split("||")
            if (data && data.length) {
                return {
                    field: data[0],
                    order: data[1],
                }
            }
            return null
        })
    }

    return params
});