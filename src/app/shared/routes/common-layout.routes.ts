import { Routes } from '@angular/router';
import {AuthGuard} from "../guard/auth.guard";

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },

    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            },
        ]
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
            },
            {
                path: '',
                loadChildren: () => import('../../components/data-entry/components-data-entry.module').then(m => m.ComponentsDataEntryModule),canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('../../components/data-display/components-data-display.module').then(m => m.ComponentsDataDisplayModule),canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('../../components/feedback/components-feedback.module').then(m => m.ComponentsFeedbackModule),canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('../../components/others/components-others.module').then(m => m.ComponentsOthersModule),canActivate: [AuthGuard]
            }
        ],
        data: {
            title: 'Components '
        }
    },

    //Charts
    {
        path: 'charts',
        data: {
            title: 'Charts'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsModule)
            },
        ]
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
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];
