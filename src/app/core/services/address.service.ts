import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  get(code: string): Observable<Address> {
    return this.http.get<Address>(`https://cdn.apicep.com/file/apicep/${code}.json`, {
      headers: { skip: 'true' }
    });
  }

}
