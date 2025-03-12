import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { ReportService } from '../camera/Services/report.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-report',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit, DoCheck {
  reportes: any[] = [];

  private reportService = inject(ReportService);
  private router = inject(Router);

  ngOnInit() {
    this.reportes = this.reportService.obtenerReportes();
  }

  ngDoCheck() {
    this.reportes = this.reportService.obtenerReportes(); // Detectar cambios en la lista
  }

  eliminarReporte(index: number) {
    this.reportService.eliminarReporte(index);
  }

  // Método para manejar la redirección a DetailReport
  verDetalleReporte(id: number) {
    this.router.navigate(['/detail-report', id]); // Redirige a detail-report con el ID del reporte
  }
}
