import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  token: String;
  headers: HttpHeaders;
  public API_URL = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  public findAllRoles(): Observable<any> {
    return this.http.get(this.API_URL + "roles" , {headers: this.headers});
  }
}
