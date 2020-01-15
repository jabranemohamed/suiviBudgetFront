import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommandeService} from "../../../shared/services/commande.service";
import {BudgetService} from "../../../shared/services/budget.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
  tableEditableCellEditCache = {};
  tableEditableCellDataSet;
  allGrandBudget;
  allBudgets = {};
  cu;
  dp;
  fullYear;

  constructor(private resgisterFB: FormBuilder, private commandService: CommandeService, private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.dataFound = false;
    this.noDataFoundMessageDisplay = false;
    this.commandeValidationForm = this.resgisterFB.group({
      codeUL: [null, [Validators.required]],
      datePicker: [null, [Validators.required]]
    });
    var d = new Date();
    var n = d.getFullYear();
    this.commandeValidationForm.setValue({codeUL: sessionStorage.getItem('localUnit'),datePicker:d});
  }

  registerSubmitForm(): void {
    for (const i in this.commandeValidationForm.controls) {
      this.commandeValidationForm.controls[i].markAsDirty();
      this.commandeValidationForm.controls[i].updateValueAndValidity();
    }
    this.cu = this.commandeValidationForm.get('codeUL').value;
    this.dp = this.commandeValidationForm.get('datePicker').value;
    this.fullYear = this.dp.getFullYear();
    this.commandService.findAllCommandePerYearAndCodeUnit(this.fullYear, this.cu).subscribe(data => {
      this.tableEditableCellDataSet = data.content;
      if (this.tableEditableCellDataSet == null || this.tableEditableCellDataSet.length == 0) {
        this.noDataFoundMessageDisplay = true
        this.dataFound = false;
      } else {
        this.noDataFoundMessageDisplay = false;
        this.dataFound = true;

        for (var key in this.tableEditableCellDataSet) {
            var tt = this.tableEditableCellDataSet[key];
            this.showActivity(tt.id_dist_cmd,tt.budget_grande_activite);
        }

      }
    });
    this.commandService.findAllBudgetGrandeActivitePerYearAndCodeUnit(this.fullYear, this.cu).subscribe(data => {
        this.allGrandBudget = data;
      });
  }

  tableEditableCellEditDeleteRow(i: string): void {
    const dataSet = this.tableEditableCellDataSet.filter(d => d.key !== i);
    this.tableEditableCellDataSet = dataSet;
  }

  tableEditableCellEditStartEdit(key: string): void {
    this.tableEditableCellEditCache[key].edit = true;
  }

  tableEditableCellEditFinishEdit(key: string): void {
    this.tableEditableCellEditCache[key].edit = false;
    this.tableEditableCellDataSet.find(item => item.key === key).name = this.tableEditableCellEditCache[key].name;
  }

  tableEditableCellUpdateEditCache(): void {
    this.tableEditableCellDataSet.forEach(item => {
      if (!this.tableEditableCellEditCache[item.key]) {
        this.tableEditableCellEditCache[item.key] = {
          edit: false,
          name: item.name
        };
      }
    });
  }

  showActivity(id_dist_cmd: string, data: any) {
    this.commandService.findAllActivitePerYearAndCodeUnit(data, this.fullYear, this.cu).subscribe(data => {
      data.budget_activite = "";
      this.allBudgets[id_dist_cmd] = data;
    });
  }

  showBudgetInfos(grandActivite: string, activite: string, dataRef: any) {
    console.log("enter her showBudgetInfos");
    this.budgetService.findBudgetInfos(grandActivite, activite, this.fullYear, this.cu).subscribe(data => {
      // @ts-ignore
      dataRef.budget_notifie = data.budget_notifie;
      // @ts-ignore
      dataRef.bud_budgget_estime1 = data.estime1;
      // @ts-ignore
      dataRef.bud_budgget_estime2 = data.estime2;
      // @ts-ignore
      dataRef.bud_budgget_estime3 = data.estime3;
      // @ts-ignore
      dataRef.bud_budgget_estime4 = data.estime4;

    });
  }
  enregistrer() {
    this.commandService.saveCommandes(this.tableEditableCellDataSet).subscribe(data => {
      this.registerSubmitForm();
    });
  }
}
