import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../../shared/services/table.service";
import {SyntheseService} from "../../../shared/services/synthese.service";

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.css']
})
export class SyntheseComponent implements OnInit {

  syntheseValidationForm: FormGroup;
  datePicker: any;
  codeUL: any;
  displayData = [];
  dataFound: boolean = false;
  noDataFoundMessageDisplay: Boolean;
  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;

  constructor(private resgisterFB: FormBuilder, private syntheseService: SyntheseService, public tableSvc: TableService) {
  }

  ngOnInit() {
    this.dataFound = false;
    this.noDataFoundMessageDisplay = false;
    this.syntheseValidationForm = this.resgisterFB.group({
      codeUL: [null, [Validators.required]],
      datePicker: [null, [Validators.required]]
    });
    var d = new Date();
    var n = d.getFullYear();
    this.syntheseValidationForm.setValue({codeUL: sessionStorage.getItem('localUnit'), datePicker: d});
    this.submitForm();
  }

  submitForm(): void {

    for (const i in this.syntheseValidationForm.controls) {
      this.syntheseValidationForm.controls[i].markAsDirty();
      this.syntheseValidationForm.controls[i].updateValueAndValidity();
    }
    let cu = this.syntheseValidationForm.get('codeUL').value;
    let dp = this.syntheseValidationForm.get('datePicker').value;
    let fullYear = dp.getFullYear();
    this.syntheseService.getSynthese(fullYear, cu).subscribe(data => {
      this.displayData = data;
      if (this.displayData == null || this.displayData.length == 0) {
        this.noDataFoundMessageDisplay = true
        this.dataFound = false;
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

  showCommandes(budget: any) {
    console.log(JSON.stringify(budget))
  }
}
