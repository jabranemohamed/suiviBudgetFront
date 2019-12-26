import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BudgetService} from "../../../shared/services/budget.service";
import {TableService} from "../../../shared/services/table.service";

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  budgetValidationForm: FormGroup;
  datePicker: any;
  codeUL: any;
  displayData = [];
  dataFound: Boolean;
  noDataFoundMessageDisplay: Boolean;
  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;

  constructor(private resgisterFB: FormBuilder, private budgetService: BudgetService, public tableSvc: TableService) {
  }

  ngOnInit() {
    this.dataFound = false;
    this.noDataFoundMessageDisplay = false;
    this.budgetValidationForm = this.resgisterFB.group({
      codeUL: [null, [Validators.required]],
      datePicker: [null, [Validators.required]]
    });
  }

  registerSubmitForm(): void {

    for (const i in this.budgetValidationForm.controls) {
      this.budgetValidationForm.controls[i].markAsDirty();
      this.budgetValidationForm.controls[i].updateValueAndValidity();
    }
    let cu = this.budgetValidationForm.get('codeUL').value;
    let dp = this.budgetValidationForm.get('datePicker').value;
    let fullYear = dp.getFullYear();
    this.budgetService.findAllBudgetPerYearAndCodeUnit(fullYear, cu).subscribe(data => {
      this.displayData = data.content;
      if (this.displayData == null || this.displayData.length == 0) {
        this.noDataFoundMessageDisplay = true
      } else {
        this.noDataFoundMessageDisplay = false;
        this.dataFound = true;
      }
    });
  }


  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  currentPageDataChange($event: Array<{
    id: number;
    libelle: string;
    description: string;
  }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  sort(sortAttribute: any) {
    this.displayData = this.tableSvc.sort(sortAttribute, this.displayData);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      data.checked = value;
    });
    this.refreshStatus();
  }

}
