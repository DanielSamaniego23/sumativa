import { Component, inject } from '@angular/core';
import { CameraService } from '../camera/Services/camera.service';
import { ReportService } from '../camera/Services/report.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent {
  private reportService = inject(ReportService);
  private cameraService = inject(CameraService);

  idEquipo: string = '';
  descripcionProblema: string = '';
  imagenUrl: string | ArrayBuffer | null = null;
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = '';

    try {
      this.loading = true;
      const imgUrl = await this.cameraService.takePicture();

      if (!imgUrl) throw new Error('No se obtuvo una imagen válida');

      this.imagenUrl = imgUrl;
      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imagenUrl = null;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarReporte() {
    if (!this.idEquipo || !this.descripcionProblema) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    const reporte = {
      idEquipo: this.idEquipo,
      descripcion: this.descripcionProblema,
      imagen: this.imagenUrl
    };

    this.reportService.agregarReporte(reporte);
    console.log('Reporte guardado:', reporte);

    // Limpiar el formulario
    this.idEquipo = '';
    this.descripcionProblema = '';
    this.imagenUrl = null;
  }
}
