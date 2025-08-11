import { Component } from '@angular/core';
import { HeaderComponentComponent } from '../LandingComponents/header-component/header-component.component';
import { Constants } from '../../utilities/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
public LandingMessage : string;
constructor(private constant : Constants)
{
  this.LandingMessage = this.constant.landingMessage;
}
}
