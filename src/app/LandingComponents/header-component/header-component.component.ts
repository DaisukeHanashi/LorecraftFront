import { Component } from '@angular/core';
import { Constants } from '../../../utilities/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
  public _title : string;
  constructor(private constant : Constants, private router : Router)
  {
    this._title = this.constant.title;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister()
  {
    this.router.navigate(['/signup'])
  }


}
