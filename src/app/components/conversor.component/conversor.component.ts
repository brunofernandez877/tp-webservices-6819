import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // REQUERIDO para usar [(ngModel)]
import { ConversorService } from '../../services/conversor.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregamos FormsModule aquí
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  // Variables para la interfaz
  monedas: {codigo: string, nombre: string}[] = [];
  cantidad: number = 1;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';
  resultado: string = '';

  constructor(private conversorService: ConversorService, private cdr: ChangeDetectorRef) {
    this.cargarMonedas();
  }

  ngOnInit(): void {}

  cargarMonedas() {
    this.conversorService.getMonedas().subscribe(
      (data: any) => {
        if (data && data.success) {
          // APILayer devuelve un objeto con formato {"ARS": "Argentine Peso", "USD": "US Dollar"}
          // Lo mapeamos a un array para usarlo en el *ngFor del HTML
          this.monedas = Object.keys(data.currencies).map(key => ({
            codigo: key,
            nombre: `${key} - ${data.currencies[key]}`
          }));
          this.cdr.markForCheck(); 
        }
      },
      (error: any) => {
        console.error("Error de conexión al cargar monedas:", error);
      }
    );
  }

  convertirDivisa() {
    // Validación básica
    if (!this.cantidad || !this.monedaOrigen || !this.monedaDestino) return;

    this.resultado = "Calculando..."; 
    this.cdr.markForCheck(); 

    this.conversorService.convertir(this.monedaDestino, this.monedaOrigen, this.cantidad).subscribe(
      (data: any) => {
        if (data && data.success) {
          // Asignamos el resultado redondeado a 2 decimales
          this.resultado = data.result.toFixed(2);
          this.cdr.markForCheck(); 
        } else if (data && data.error) {
          alert("APILAYER DICE: " + data.error.info);
          this.resultado = "Error";
          this.cdr.markForCheck();
        }
      },
      (error: any) => {
        console.error("Error al convertir:", error);
        this.resultado = "Error de API";
        this.cdr.markForCheck();
      }
    );
  }
}
