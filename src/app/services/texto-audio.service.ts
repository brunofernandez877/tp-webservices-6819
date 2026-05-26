import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextoAudioService {

  // Tu API Key exacta
  private apiKey = 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838'; 
  private host = 'open-ai-text-to-speech1.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  public convertirTextoAudio(texto: string, idioma: string, voz: string): Observable<Blob> {
    // 1. Traducimos tus xhr.setRequestHeader a Angular HttpHeaders
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.apiKey,
      'Content-Type': 'application/json'
    });

    // 2. Traducimos tu const data (el JSON body)
    const body = {
      model: "tts-1",
      input: texto,
      // Usamos la instrucción de tu snippet, sumándole dinámicamente el idioma elegido en el HTML
      instructions: `Speak in a lively and optimistic tone. Pronounce strictly in ${idioma}.`,
      voice: voz
    };

    // 3. Traducimos tu xhr.send() al POST de Angular.
    // ⚠️ MANTENEMOS responseType: 'blob' porque RapidAPI no devuelve texto acá, devuelve un archivo MP3 descargable.
    return this.http.post('https://open-ai-text-to-speech1.p.rapidapi.com/', body, { 
      headers: headers,
      responseType: 'blob' 
    });
  }
}