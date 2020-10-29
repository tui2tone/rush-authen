import { Config } from "@config/index"

export const getColumnType = (type: string) => {

    // Postgres By Default
    switch (type) {
        case 'number':
        case 'float':
            return 'float';
        case 'int':
            return 'int';
        case 'boolean':
            return 'boolean';
        case 'text':
            return 'text';
        case 'datetime':
        case 'date':
            return 'date';
        default:
            return 'varchar'
    }
}