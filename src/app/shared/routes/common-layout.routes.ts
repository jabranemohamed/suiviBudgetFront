import { Routes } from '@angular/router';
import {AuthGuard} from "../guard/auth.guard";

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },



    //Component
    {
        path: 'components',
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full',
                canActivate: [AuthGuard]
            },
            {
              path: '',
              loadChildren: () => import('../../components/admin/components-admin.module').then(m => m.ComponentsAdminModule),canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('../../components/general/components-general.module').then(m => m.ComponentsGeneralModule),canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('../../components/navigation/components-navigation.module').then(m => m.ComponentsNavigationModule),canActivate: [AuthGuard]
            }
        ],
        data: {
            title: 'Components '
        }
    },



    //Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
