import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommandeService} from "../../../shared/services/commande.service";
import {BudgetService} from "../../../shared/services/budget.service";
import {NzModalService} from "ng-zorro-antd";
import {TableService} from "../../../shared/services/table.service";

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
  tableEditableCellDataSet;
  allBudgets: any;
  cu;
  dp;
  fullYear;
  selectedCommand: any;
  selectedBudget: any;

  constructor(private resgisterFB: FormBuilder, private commandService: CommandeService
    , private budgetService: BudgetService, private modalService: NzModalService, public tableSvc: TableService) {
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
    this.commandeValidationForm.setValue({codeUL: sessionStorage.getItem('localUnit'), datePicker: d});
    this.registerSubmitForm();
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
        this.budgetService.findAllBudgetPerYearAndCodeUnit(this.fullYear, this.cu).subscribe(data => {
            this.allBudgets = data.content;
          }
        )
      }
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

  sort(sortAttribute: any) {
    this.allBudgets = this.tableSvc.sort(sortAttribute, this.allBudgets);
  }

  selectBudget(selectBudgetContent: TemplateRef<any>, commande: any) {
    this.selectedCommand = commande;
    const modal = this.modalService.create({
      nzTitle: 'Choisir un budget',
      nzContent: selectBudgetContent,
      nzWidth: 1000,
      nzOnOk   : () => console.log('OK')
    })

  }

  budgetSelection(budget: any) {

    console.log(JSON.stringify(budget));
    console.log(JSON.stringify(this.selectedCommand));

    this.selectedBudget = budget;
    this.selectedCommand.grande_activite = budget.budgetId.grandeActivite
    this.selectedCommand.activite   = budget.budgetId.activite
    this.selectedCommand.notifie   = budget.budget_notifie
    this.selectedCommand.bud_budgget_estime1   = budget.estime1
    this.selectedCommand.bud_budgget_estime2   = budget.estime2
    this.selectedCommand.bud_budgget_estime3   = budget.estime3
    this.selectedCommand.bud_budgget_estime4   = budget.estime4
  }


}
