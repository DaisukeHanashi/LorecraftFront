import { Component } from '@angular/core';
import { HeaderComponentComponent } from '../LandingComponents/header-component/header-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
