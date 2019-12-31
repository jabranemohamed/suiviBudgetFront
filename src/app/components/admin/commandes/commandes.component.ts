import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  commandeValidationForm: FormGroup;
  datePicker: any;
  codeUL: any;
  displayData = [];
  dataFound: Boolean;
  noDataFoundMessageDisplay: Boolean;
  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;

  constructor(private resgisterFB: FormBuilder  ) { }

  ngOnInit() {
    this.dataFound = false;
    this.noDataFoundMessageDisplay = false;
    this.commandeValidationForm = this.resgisterFB.group({
      codeUL: [null, [Validators.required]],
      datePicker: [null, [Validators.required]]
    });
  }

  registerSubmitForm(): void {
    for (const i in this.commandeValidationForm.controls) {
      this.commandeValidationForm.controls[i].markAsDirty();
      this.commandeValidationForm.controls[i].updateValueAndValidity();
    }
    let cu = this.commandeValidationForm.get('codeUL').value;
    let dp = this.commandeValidationForm.get('datePicker').value;
    let fullYear = dp.getFullYear();
  }

}
