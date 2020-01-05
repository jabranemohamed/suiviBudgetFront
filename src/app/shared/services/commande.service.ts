import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public API_URL = environment.baseUrl;
  token: String;
  headers: HttpHeaders;


  constructor(private http: HttpClient,private formBuilder: FormBuilder) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  findAllCommandePerYearAndCodeUnit(fullYear: number, cu: any): Observable<any> {
    return this.http.get(this.API_URL + "commandes/"+cu+"/"+fullYear , {headers: this.headers});
  }
}
