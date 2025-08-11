import { Injectable } from '@angular/core';
import { CountryCode, Gender } from './types';

@Injectable({
  providedIn: 'root'
})

export class Constants
{
  private readonly _title : string = 'Lorecraft';
  private readonly _landingMessage : string = "BUILD YOUR OWN WORLD.";
  private readonly _genderOptions : Gender[] = [
    {value : "M", label : "Male"},
    {value : "F", label : "Female"},
    {value : "N", label : "Prefer not to say"}
  ];
  private readonly _countryCodes : CountryCode[] = [
    { code : '+1', label : 'USA (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+91', label: 'India (+91)' },
    { code: '+49', label: 'Germany (+49)' },
    { code: '+63', label: 'Philippines (+63)'},
    { code: '+81', label: 'Japan (+81)' },
    { code: '+61', label: 'Australia (+61)' }
  ]

  //Data Type
  private readonly _account : string = "Account";

  //Keyword
  private readonly _login : string = "login";
  private readonly _register : string = "register";

  //User Roles
  private readonly _regular : string = "Regular";
  private readonly _admin : string = "Admin";

  //Local Storage Keys
  private readonly _accountID : string = "account_id";
  private readonly _accessToken : string = "access_token";
  private readonly _accessRole : string = "access_role";



  private static _instance: Constants;

  private constructor()
  {

  }

  get instance(): Constants{
    if(!Constants._instance)
    {
      Constants._instance = new Constants();
    }
    return Constants._instance;
  }

  isAllOkay(result_code : number) : boolean{
    return result_code >= 200 && result_code <= 299;
  }

  get accountID() : string{
    return this._accountID;
  }

  get accessToken() : string{
    return this._accessToken;
  }

  get accessRole() : string{
    return this._accessRole;
  }

  get account() : string{
    return this._account;
  }

  get login() : string{
    return this._login;
  }

  get register() : string{
    return this._register;
  }

  get admin() : string{
    return this._admin;
  }

  get regular() : string{
    return this._regular;
  }

  get genderOptions(): Gender[]{
    return this._genderOptions;
  }

  get title(): string{
    return this._title;
  }

  get landingMessage() : string {
    return this._landingMessage;
  }

  get CountryCodes() : CountryCode[]
  {
    return this._countryCodes;
  }

}
