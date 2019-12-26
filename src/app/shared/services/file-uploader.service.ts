import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  public API_URL = environment.baseUrl;
  public UPLOAD_API_URL = this.API_URL + 'upload/';
  token: String;
  headers: HttpHeaders;

  constructor(private http: HttpClient,private formBuilder: FormBuilder) {
    this.token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  public uploadFileToServer(file:File, type:String): Observable<any> {
    console.log("Enter her");
    const formData = new FormData();
    var call_URL = this.UPLOAD_API_URL + type;
    // @ts-ignore
    formData.append('file', file);
    console.log(formData)
    const req = new HttpRequest('POST', call_URL, formData, {headers: this.headers});
    return this.http.request(req);

  }
}
