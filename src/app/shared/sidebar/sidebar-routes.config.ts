import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    // {
    //     path: '', title: 'Dashboard', icon: 'zmdi zmdi-view-dashboard', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    //         { path: '/dashboard/ecommerce-v1', title: 'eCommerce V1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/ecommerce-v2', title: 'eCommerce V2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/human-resources', title: 'Human Resources', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/digital-marketing', title: 'Digital Marketing', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/property-listings', title: 'Property Listings', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/services-support', title: 'Analysis', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/healthcare', title: 'Healthcare', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/logistics', title: 'Logistics', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/dashboard/housing', title: 'Housinggraphs', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },


    // {
    //     path: '', title: 'Permissions', icon: 'zmdi zmdi-lock', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    //         { path: '/Permissions/CreateUser',  title:'Create User', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/Permissions/AddPermissions',  title:'Add Permissions', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/Permissions/ViewPermissions',  title:'View Permissions', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    //     ]
    // },
    // {
    //     path: '', title: 'Ground Events', icon: 'zmdi zmdi-layers', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

    //         { path: '/Events/addevent',  title:'Add Event', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/Events/closeevent',  title:'Close Event', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    //     ]
    // },

    {
        path: '', title: 'Dashboard', icon: 'zmdi zmdi-view-dashboard', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

            { path: '/perla/createuser', title: 'Create User', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/perla/viewuser', title: 'View User', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            
           
        ]
    },


    {
        path: '', title: 'Categories', icon: 'zmdi zmdi-view-dashboard', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

            { path: '/ks/add-category', title: 'Add Category', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ks/sub-category', title: 'Sub Category', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ks/add-item', title: 'Add Item', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ks/view-total-data', title: 'View Total Data', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
           
           
        ]
    },
   

    {
        path: '', title: 'Add Data', icon: 'zmdi zmdi-format-list-bulleted', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

            { path: '/data/adddistrict', title: 'Add District', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data/adddivision', title: 'Add Division', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data/adddepartment', title: 'Add Department', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },{ path: '/data/addhabitation', title: 'Add Habitation', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data/addcolony', title: 'Colony Details', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data/addstage', title: 'Add Stage', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data/addinfrastructure', title: 'Add Infrastructure', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
           
        ]
    },
    
    {
        path: '', title: 'Reports', icon: 'zmdi zmdi-layers', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

            { path: '/reports/viewreport', title: 'Stage Wise Reports', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reports/habitationwisereport', title: 'Habitation Wise Report', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reports/departmentwisereport', title: 'Department Wise Report', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reports/houses', title: 'House Details', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reports/toilets', title: 'Toilets Details', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reports/infra', title: 'Infra Details', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            
        ]
    },

    // {
    //     path: '', title: 'Assets', icon: 'zmdi zmdi-widgets', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [

    //         { path: '/assets/houses', title: 'House', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/assets/toilets', title: 'Toilets', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         // { path: '/assets/Infra', title: 'Infrastructure', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    //     ]
    // },


];
