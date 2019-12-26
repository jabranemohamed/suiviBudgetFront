import { Component, OnInit  } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  budgetValidationForm: FormGroup;
  datePicker: any;

  constructor(  private resgisterFB: FormBuilder) { }

  ngOnInit() {

    this.budgetValidationForm = this.resgisterFB.group({
      codeUL        : [ null, [ Validators.required ] ],
      datePicker    : [ null, [ Validators.required ] ],
    });
  }

  registerSubmitForm(): void {
    for (const i in this.budgetValidationForm.controls) {
      this.budgetValidationForm.controls[ i ].markAsDirty();
      this.budgetValidationForm.controls[ i ].updateValueAndValidity();
    }
  }

}
