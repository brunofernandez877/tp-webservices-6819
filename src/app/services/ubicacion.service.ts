import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiKey = 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838';

  constructor(private http: HttpClient) { }

  // 1) POST IP Info - Neutrino API
  public getIpInfo(ip: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'community-neutrino-ip-info.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams().set('ip', ip);
    return this.http.post('https://community-neutrino-ip-info.p.rapidapi.com/ip-info', body.toString(), { headers });
  }

  // 2) GET Coordinates to Address - Apishub API
  public getAddressFromCoords(lat: number | string, lng: number | string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'address-from-to-latitude-longitude.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get(`https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?lat=${lat}&lng=${lng}`, { headers });
  }
}