import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommandeService} from "../../../shared/services/commande.service";

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
  tableEditableCelli = 1;
  tableEditableCellEditCache = {};
  tableEditableCellDataSet;

  constructor(private resgisterFB: FormBuilder, private commandService: CommandeService) {
  }

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
    this.commandService.findAllCommandePerYearAndCodeUnit(fullYear, cu).subscribe(data => {
      this.tableEditableCellDataSet = data.content;
      if (this.tableEditableCellDataSet == null || this.tableEditableCellDataSet.length == 0) {
        this.noDataFoundMessageDisplay = true
      } else {
        this.noDataFoundMessageDisplay = false;
        this.dataFound = true;
      }
    });

  }


  tableEditableCellEditDeleteRow(i: string): void {
    const dataSet = this.tableEditableCellDataSet.filter(d => d.key !== i);
    this.tableEditableCellDataSet = dataSet;
  }

  tableEditableCellEditStartEdit(key: string): void {
    this.tableEditableCellEditCache[ key ].edit = true;
  }

  tableEditableCellEditFinishEdit(key: string): void {
    this.tableEditableCellEditCache[ key ].edit = false;
    this.tableEditableCellDataSet.find(item => item.key === key).name = this.tableEditableCellEditCache[ key ].name;
  }

  tableEditableCellUpdateEditCache(): void {
    this.tableEditableCellDataSet.forEach(item => {
      if (!this.tableEditableCellEditCache[ item.key ]) {
        this.tableEditableCellEditCache[ item.key ] = {
          edit: false,
          name: item.name
        };
      }
    });
  }

}
