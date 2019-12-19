import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Utilisateur} from '../interfaces/utilisateur';
import set = Reflect.set;

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

//{username:mat,password:password}}


  login(utilisateur: Utilisateur): Observable<any> {
    let mat = utilisateur.matricule;
    let password = utilisateur.password
    return this.http.post<any>(this.API_URL + 'utilisateurs/login', {},
      {params: new HttpParams().set('username', mat).append('password',password)}).pipe(
      map(response =>{
        if(response){
          sessionStorage.setItem('currentUser',mat);
          let tokenStr= response.token;
          sessionStorage.setItem('token', tokenStr);
          this.currentUserSubject.next(response);
          return response;
        }
      })
    );
  }

  logOut():void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
  }

  register(user: Utilisateur): Observable<any> {
    return this.http.post(this.API_URL + "utilisateurs/registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }



}
