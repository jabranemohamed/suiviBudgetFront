import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BudgetsComponent} from "./budgets/budgets.component";
import {CentresComponent} from "./centres/centres.component";
import {RolesComponent} from "./roles/roles.component";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";

const routes: Routes = [
  {
    path: 'admin',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'budgets',
        component: BudgetsComponent,
        data: {
          title: 'Budgets'
        }
      },
      {
        path: 'centres',
        component: CentresComponent,
        data: {
          title: 'Centres'
        }
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        }
      },
      {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        data: {
          title: 'Utilisateurs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsAdminRoutingModule {
}
