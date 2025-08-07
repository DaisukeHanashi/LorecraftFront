import { Component } from '@angular/core';
import { Constants } from '../../../utilities/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
  public _constant : Constants;
  public _title : string;
  constructor(constant : Constants)
  {
    this._constant = constant.instance;
    this._title = this._constant.title;
  }




}
