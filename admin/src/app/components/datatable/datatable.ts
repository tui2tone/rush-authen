export interface DatatableActivateEvent<RowType> {
    type: string;
    cellIndex: number;
    row: RowType;
}


export interface DatatableSelectedEvent {
    
}