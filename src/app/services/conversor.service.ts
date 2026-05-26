import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  // ATENCIÓN: Reemplazá esto con tu Key de APILayer
  private apiKey = '5SUUBsJR1OKBwx8mGWSV0RL53cnWDrYG'; 
  private baseUrl = 'https://api.apilayer.com/currency_data';

  constructor(private http: HttpClient) { }

  // Obtenemos la lista de monedas disponibles para los <select>
  public getMonedas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': this.apiKey
      })
    };
    return this.http.get(`${this.baseUrl}/list`, httpOptions);
  }

  // Enviamos los datos para realizar la conversión
  public convertir(to: string, from: string, amount: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': this.apiKey
      })
    };
    return this.http.get(`${this.baseUrl}/convert?to=${to}&from=${from}&amount=${amount}`, httpOptions);
  }
}