import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private sensoriApiUrl = 'http://localhost:8080/api/sensori'; // Sostituito con l'URL del localhost
  constructor(private http: HttpClient) {}

  getSensori(): Observable<any[]> {
    return this.http.get<any[]>(this.sensoriApiUrl);
  }

  getSensoreDetails(sensoreId: number): Observable<any> { // Cambiato tipo di sensoreId a number
    const url = `http://localhost:8080/api/sensori/${sensoreId}`;
    return this.http.get<any>(url);
  }

 

}