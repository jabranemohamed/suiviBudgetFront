import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Utilisateur} from '../interfaces/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<Utilisateur>;
  private currentUserSubject: BehaviorSubject<Utilisateur>;
  headers: HttpHeaders;
  public API_URL = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUserSubject.value.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  public get currentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }

  login(user: Utilisateur): Observable<any> {
    const headers = new HttpHeaders(
      user ? {
        authorization:'Basic ' + btoa(user.matricule + ':' + user.password)
      } : {}
    );

    return this.http.get<any> (this.API_URL + 'utilisateurs/login', {headers:headers}).pipe(
      map(response =>{
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post(this.API_URL + "logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  register(user: Utilisateur): Observable<any> {
    return this.http.post(this.API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }



}
