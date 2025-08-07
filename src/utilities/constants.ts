import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Constants
{
  private readonly _title : string = 'Lorecraft';
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

  get title(): string{
    return this._title;
  }

}
