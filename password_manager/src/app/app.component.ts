import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , InputTextModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Gestionnaire de mot de passe';

  value: string | undefined;

}
