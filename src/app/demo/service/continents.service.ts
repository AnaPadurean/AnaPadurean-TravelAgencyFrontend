import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Continent {
  continent_id?: number;  // ID-ul poate fi opțional
  continent_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContinentsService {

  private apiUrl = 'http://localhost:8080/travel_agency/api/continents';  // URL-ul endpoint-ului din backend

  constructor(private http: HttpClient) {}

  getContinents(): Observable<Continent[]> {
    console.log("Calling getContinents() method...");
    return this.http.get<Continent[]>(this.apiUrl);
}

addContinent(continent: Continent): Observable<Continent> {
  console.log("Calling addContinent() method...");
  return this.http.post<Continent>(`${this.apiUrl}/new_continent`, continent);
}

deleteContinent(continentId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${continentId}`);
}
}
