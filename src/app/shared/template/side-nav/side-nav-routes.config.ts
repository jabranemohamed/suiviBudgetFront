import { SideNavInterface } from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [
            {
                path: '/dashboard/default',
                title: 'Default',
                iconType: '',
                icon: '',
                iconTheme: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Administration',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'appstore',
        submenu: [
            {
                path: '/components/admin/roles',
                title: 'Rôle',
                iconType: 'nzIcon',
                icon: 'trademark',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/components/admin/utilisateurs',
                title: 'Utilisateur',
                iconType: 'nzIcon',
                icon: 'user',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/apps/mail',
                title: 'Centre',
                iconType: 'nzIcon',
                icon: 'pic-center',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/apps/mail',
                title: 'Budget',
                iconType: 'nzIcon',
                icon: 'pie-chart',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/apps/mail',
                title: 'Chargement Fichier',
                iconType: 'nzIcon',
                icon: 'upload',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Suivi des commandes',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'pie-chart',
        submenu: [
            {
                path: '/charts/chartjs',
                title: 'List des Commandes',
                iconType: 'nzIcon',
                icon: 'table',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    }
]
