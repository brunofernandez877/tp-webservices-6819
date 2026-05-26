import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {

  constructor(private http: HttpClient) { }

  public getMarcas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get("https://car-specs.p.rapidapi.com/v2/cars/makes", httpOptions);
  }

  public getModelosPorMarca(makeId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`https://car-specs.p.rapidapi.com/v2/cars/makes/${makeId}/models`, httpOptions);
  }
}