import { Routes } from '@angular/router';
import {  MyConnections } from './my-connections/my-connections.component';
import { PatientRecords } from './my-records/my-records.component';
import { MyRequests } from './my-requests/my-requests.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SearchPatient } from './search-patient/search-patient.component';
import { DataAccess } from './data-access/data-access.component';




export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'my-connections',
      component:  MyConnections,
      data: {
        title: 'My Connections',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'Connections'}]
      }
    },
    {
      path: 'my-records',
      component: PatientRecords,
      data: {
        title: 'My Records',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'My Records'}]
      }
    },
    {
      path: 'my-requests',
      component: MyRequests,
      data: {
        title: 'My Requests',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'My Requests'}]
      }
    },
    {
      path: 'modal',
      component: NgbdModalBasic,
      data: {
        title: 'Modal',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'Modal'}]
      }
    },
    {
      path: 'search-patient',
      component: SearchPatient,
      data: {
        title: 'Patient Search',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'Patient Search'}]
      }
    },
    {
      path: 'data-access',
      component: DataAccess,
      data: {
        title: 'My Data Access',
        urls: [{title: 'Dashboard'}, {title: 'Component'}, {title: 'Data Access'}]
      }
    }]
  }
];
