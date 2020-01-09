import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public API_URL = environment.baseUrl;
  token: String;
  headers: HttpHeaders;


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  findAllCommandePerYearAndCodeUnit(fullYear: number, cu: any): Observable<any> {
    return this.http.get(this.API_URL + "commandes/" + cu + "/" + fullYear, {headers: this.headers});
  }

    findAllBudgetGrandeActivitePerYearAndCodeUnit(fullYear: number, cu: any): Observable<any> {
    return this.http.get(this.API_URL + "grandesActivites/" + cu + "/" + fullYear, {headers: this.headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log("hallo world !")
          if (err.status == 401) {
            // Handle 401 error
            console.log("hallo world !")
          } else {
            return throwError(err);
          }
        })
      );
  }

  findAllActivitePerYearAndCodeUnit(grandActivity: string, fullYear: number, cu: any): Observable<any> {
    return this.http.get(this.API_URL + "activites/" + grandActivity + "/" + cu + "/" + fullYear, {headers: this.headers});
  }

  saveCommandes(tableEditableCellDataSet: any) {
    console.log("enter her 2");
    return this.http.put(this.API_URL + "commandes" , tableEditableCellDataSet, {headers: this.headers});
  }
}
