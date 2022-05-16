import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    // {
    //     path: 'dashboard',
    //     loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    // },
    // {
    //     path: 'Permissions',
    //     loadChildren: () => import('../../modules/permissions/permissions.module').then(m => m.PermissionsModule)
    // },

    // {
    //     path: 'Events',
    //     loadChildren: () => import('../../modules/events/events.module').then(m => m.EventsModule)
    // },

    {
        path: 'housing',
        loadChildren: () => import('../../Housing/housing/housing.module').then(m => m.HousingModule)
    },
    {
        path: 'data',
        loadChildren: () => import('../../Housing/data/data.module').then(m => m.DataModule)
    },

    {
        path: 'reports',
        loadChildren: () => import('../../Housing/reports/reports.module').then(m => m.ReportsModule)
    },
    {
        path: 'perla',
        loadChildren: () => import('../../Housing/perla/perla.module').then(m => m.PerlaModule)
    },
    {
        path: 'ks',
        loadChildren: () => import('../../categories/ks/ks.module').then(m => m.KsModule)
    },

   
    


    // {
    //     path: 'assets',
    //     loadChildren: () => import('../../modules/assets/assets.module').then(m => m.AssetsModule)
    // },
   




];