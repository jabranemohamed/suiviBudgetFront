import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  public API_URL = environment.baseUrl;
  token: String;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  getStatByYearAndCode(fullYear: number, cu: any): Observable<any> {
    return this.http.get(this.API_URL + "statistics/"+ cu + "/" + fullYear, {headers: this.headers});
  }
}
