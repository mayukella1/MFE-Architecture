import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MfeButtonComponent } from 'mfe-shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MfeButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe-shared-ui-demo';
}
