import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Modules', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/user/profile', title: 'Profile', icon: 'mdi mdi-account-edit', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'All Data', icon: 'mdi mdi-table', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/all-data/all-patients', title: 'All Patients', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/all-data/all-doctors', title: 'All Doctors', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    }
];

export const DOCTORROUTE: RouteInfo[] = [
    {
        path: '', title: 'Modules', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/user/profile', title: 'Profile', icon: 'mdi mdi-account-edit', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/component/departments', title: 'Specializations', icon: 'mdi mdi-altimeter', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'Doctor', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/component/search-patient', title: 'Search Patient', icon: 'mdi mdi-account-search', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/component/data-access', title: 'Data Access', icon: 'mdi mdi-account-key', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/component/patient-record', title: 'Patient Record', icon: 'mdi mdi-account-alert', class: '', label: '', labelClass: '', extralink: false, submenu: []
    }

];

export const PATIENTROUTE: RouteInfo[] = [
    {
        path: '', title: 'Modules', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/user/profile', title: 'Profile', icon: 'mdi mdi-account-edit', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'Patient', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/component/my-records', title: 'My Records', icon: 'mdi mdi-widgets', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/component/my-connections', title: 'My Connections', icon: 'mdi mdi-calendar-blank', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/component/my-requests', title: 'Connection Request', icon: 'mdi mdi-account-network', class: '', label: '', labelClass: '', extralink: false, submenu: []
    }
];