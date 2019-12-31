import {Component, OnInit} from '@angular/core';
import {FileUploaderService} from "../../../shared/services/file-uploader.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadXHRArgs} from "ng-zorro-antd";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {

  files: FileList;
  uploadValidationForm: FormGroup;
  public API_URL = environment.baseUrl;
  public UPLOAD_API_URL = this.API_URL + 'upload/';
  displayData = ['Role','Utilisateur','Centre','Budget','Commande'];

  constructor(private fb: FormBuilder,public fileUploaderService: FileUploaderService,private http: HttpClient) {
  }

  ngOnInit() {
    this.uploadValidationForm = this.fb.group({
    });
  }

  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    var file = item.file;
    var name = item.name;
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', this.UPLOAD_API_URL+name, formData, {
      reportProgress : true,
      withCredentials: true
    });
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          (event as any).percent = event.loaded / event.total * 100;
        }
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      item.onError(err, item.file);
    });
  }


  onFileChange(event: Event, role: string) {
    // @ts-ignore
    const file = event.target.files[0];
    this.fileUploaderService.uploadFileToServer(file,role).subscribe(data => {
    });
  }
}
