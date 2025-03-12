import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportes: any[] = [];

  constructor() {}

  agregarReporte(reporte: any) {
    this.reportes.push(reporte);
  }

  obtenerReportes() {
    return [...this.reportes]; // Retornar una copia para evitar mutaciones
  }

  eliminarReporte(index: number) {
    this.reportes.splice(index, 1);
  }
}
