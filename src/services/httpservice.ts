import { Injectable } from "@angular/core";
import * as env from '../../env.json';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HttpService{
  private _instance : HttpService;
  private readonly apiUrl = env.server_link;
  private readonly formHttpHeader : HttpHeaders = new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded'});
  private readonly jsonHttpHeader : HttpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json'});

  constructor(private http: HttpClient){
    this._instance = this;
  }

  get instance() : HttpService{
    if(!this._instance){
      this._instance = new HttpService(this.http);
    }
    return this._instance;
  }

  async getData(dataType : string, keyword : string) : Promise<any>{
    const url = `${this.apiUrl}${dataType}/${keyword}`;
    try{
    const response = await firstValueFrom(this.http.get(url));
    return JSON.stringify(response);
    } catch(error) {
      console.error('Error posting form data:', error);
      throw error;
    }
  }

  async postFormData(dataType : string, data : any, keyword : string) : Promise<any>{
    const url = `${this.apiUrl}${dataType}/${keyword}`;

    try{
      const response = await firstValueFrom(
        this.http.post(url, data, {headers: this.formHttpHeader})
      );
      return JSON.stringify(response);
    } catch (error)
    {
      console.error('Error posting form data:', error);
      throw error;
    }
  }

  async postJsonData(dataType : string, data : any, keyword : string) : Promise<any>{
    const url = `${this.apiUrl}${dataType}/${keyword}`;
    try{
    const response = await firstValueFrom(this.http.post(url, data, { headers: this.jsonHttpHeader}));
    return JSON.stringify(response);
  } catch(error)
  {
    console.error("Error posting json data:", error);
    throw error;
  }
  }

  async postSolely(dataType : string, keyword : string) : Promise<any>{
    const url = `${this.apiUrl}${dataType}/${keyword}`;

    try{
      const response = await firstValueFrom(this.http.post(url, {}));
      return JSON.stringify(response);
    }catch(error)
    {
    console.error("Error posting json data:", error);
    throw error;
    }
  }


}


