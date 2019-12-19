import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HighlightModule} from 'ngx-highlightjs';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TableService} from "../../shared/services/table.service";

import {ComponentsAdminRoutingModule} from "./components-admin-routing.module";


import {RandomUserService} from '../../shared/services/random-user.service';
import {BudgetsComponent} from "./budgets/budgets.component";
import {CentresComponent} from "./centres/centres.component";
import {FilesUploadComponent} from "./files-upload/files-upload.component";
import {RolesComponent} from "./roles/roles.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HighlightModule,
    ComponentsAdminRoutingModule,
    InfiniteScrollModule
  ],
  exports: [],
  declarations: [
    BudgetsComponent,
    CentresComponent,
    FilesUploadComponent,
    RolesComponent,
    UtilisateursComponent
  ],
  providers: [RandomUserService,
             TableService],
})

export class ComponentsAdminModule {
}
