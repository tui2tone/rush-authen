import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientDto } from './interfaces/client.interface';

const API_PATH = '/clients'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    constructor(
        private http: HttpClient
    ) { }

    async find(id: number): Promise<any> {
        return await this.http.get(`${API_PATH}/${id}`).toPromise()
    }

    async create(dto: ClientDto): Promise<any> {
        return await this.http.post(`${API_PATH}`, dto).toPromise()
    }

    async update(id: number, dto: ClientDto): Promise<any> {
        return await this.http.patch(`${API_PATH}/${id}`, dto).toPromise()
    }

    async remove(id: number): Promise<any> {
        return await this.http.delete(`${API_PATH}/${id}`).toPromise()
    }
}
