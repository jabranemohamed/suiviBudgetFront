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
    this.utilisateurService.findAllUsers().subscribe(data => {
      this.displayData = data.content;
    });
  }

  refreshStatus(): void {
  }

  currentPageDataChange($event: any): void {
    console.log("currentPageDataChange")
    console.log($event)
    this.displayData = $event;
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

  onClick(user: any) {
    this.utilisateurService.enableUser(user).subscribe(data => {

    });
  }
}
