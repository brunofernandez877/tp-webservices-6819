import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UbicacionService } from '../../services/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent {

  // IP de prueba por defecto (UNJu) requerida por la consigna
  ipInput: string = '200.106.249.7'; 
  
  ipResult: any = null;
  direccionResult: any = null;
  
  cargando: boolean = false;
  cargandoDireccion: boolean = false;

  constructor(private ubicacionService: UbicacionService, private cdr: ChangeDetectorRef) {}

  // Acción del Punto 1
  buscarIp() {
    if (!this.ipInput) {
      alert("Por favor, ingrese una dirección IP.");
      return;
    }

    this.cargando = true;
    this.ipResult = null;
    this.direccionResult = null;
    this.cdr.markForCheck();

    this.ubicacionService.getIpInfo(this.ipInput).subscribe(
      (data: any) => {
        this.ipResult = data;
        this.cargando = false;
        this.cdr.markForCheck();

        // PUNTO 2: Si la IP devolvió coordenadas válidas, buscamos la dirección postal exacta
        if (data && data.latitude && data.longitude) {
          this.obtenerDireccionPostal(data.latitude, data.longitude);
        }
      },
      (error: any) => {
        console.error("Error al buscar IP:", error);
        alert("Ocurrió un error al consultar el webservice de la IP.");
        this.cargando = false;
        this.cdr.markForCheck();
      }
    );
  }

  // Acción del Punto 2
  obtenerDireccionPostal(lat: number, lng: number) {
    this.cargandoDireccion = true;
    this.cdr.markForCheck();

    this.ubicacionService.getAddressFromCoords(lat, lng).subscribe(
      (data: any) => {
        if (data && data.Results && data.Results.length > 0) {
          // Tomamos la primera opción más relevante devuelta por la API
          this.direccionResult = data.Results[0];
        }
        this.cargandoDireccion = false;
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error("Error al resolver dirección:", error);
        this.cargandoDireccion = false;
        this.cdr.markForCheck();
      }
    );
  }
}