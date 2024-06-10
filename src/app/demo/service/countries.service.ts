import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Countries {
  country_id?: number;  // ID-ul poate fi opțional
  country_name: string;
  continent_id:number;
}
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  

  private apiUrl = 'http://localhost:8080/travel_agency/api/countries';  // URL-ul endpoint-ului din backend
  constructor(private http: HttpClient) { }

  getCountries(): Observable<Countries[]> {
    console.log("Calling getCountries() method...");
    return this.http.get<Countries[]>(this.apiUrl);
}
addCountry(newCountry: Countries): Observable<Countries> {
  console.log("Calling addCountry() method...");
  return this.http.post<Countries>(`${this.apiUrl}/new_country`, newCountry);
}
}
