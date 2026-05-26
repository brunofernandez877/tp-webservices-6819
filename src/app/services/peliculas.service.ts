import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) {}

  public getPeliculas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
        'x-rapidapi-key': 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838',
        'Content-Type': 'application/json'
      })
    };

    // Hacemos la petición GET a la URL de la API
    return this.http.get("https://imdb-top-100-movies.p.rapidapi.com/", httpOptions);
  }
}