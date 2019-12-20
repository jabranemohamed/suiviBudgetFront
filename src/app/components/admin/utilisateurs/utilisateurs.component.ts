import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../shared/services/utilisateur.service";
import {TableService} from "../../../shared/services/table.service";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;
  displayData = [];

  constructor(public utilisateurService: UtilisateurService, public tableSvc: TableService) {
  }

  ngOnInit() {
    this.findAllUtilisateurs();
  }

  findAllUtilisateurs() {
    this.utilisateurService.findAllUtilisateurs().subscribe(data => {
      this.displayData = data.content;
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
