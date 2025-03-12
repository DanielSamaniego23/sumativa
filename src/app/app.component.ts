import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CameraComponent } from './Components/camera/camera.component';
import { NewReportComponent } from './Components/new-report/new-report.component';
import { ListReportComponent } from './Components/list-report/list-report.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CameraComponent,NewReportComponent,ListReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
