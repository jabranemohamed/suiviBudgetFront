import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Utilisateur} from '../interfaces/utilisateur';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public currentUser: Observable<Utilisateur>;
  private currentUserSubject: BehaviorSubject<Utilisateur>;
  headers: HttpHeaders;
  public API_URL = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(sessionStorage.getItem('currentUser')));
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

  login(utilisateur: Utilisateur): Observable<any> {

    const headers = new HttpHeaders(
      utilisateur ? {
        authorization:'Basic ' + btoa(utilisateur.username + ':' + utilisateur.password)
      } : {}
    );

    return this.http.get<any>(this.API_URL + 'utilisateurs/login', {headers:headers}).pipe(
      map(response =>{
        if(response){
          sessionStorage.setItem('currentUser',utilisateur.username );
          sessionStorage.setItem('localUnit',response.localUnit.code );
          let tokenStr= response.token;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('isLoggedin', 'true');
          this.currentUserSubject.next(response);
          return response;
        }
      })
    );
  }

  getJwtToken():any{
    return sessionStorage.getItem('token');
  }

  logOut():void {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLoggedin');
        this.currentUserSubject.next(null);
        this.router.navigate(['/authentication/login-2']);
  }

  getCurrentUser():any {
    return sessionStorage.getItem('currentUser');
  }

  register(user: Utilisateur): Observable<any> {
    return this.http.post(this.API_URL + "utilisateurs/signup", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }



}
