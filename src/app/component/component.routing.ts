import { Routes } from '@angular/router';

import { AllDoctors } from './all-doctors/all-doctors.component';
import {  MyConnections } from './my-connections/my-connections.component';
import { PatientRecords } from './my-records/my-records.component';
import { MyRequests } from './my-requests/my-requests.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SearchPatient } from './search-patient/search-patient.component';
import { DataAccess } from './data-access/data-access.component';


/**/import { NgbdDropdownBasic } from './country/country.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'progressbar',
      component: AllDoctors,
      data: {
        title: 'Progressbar',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'ngComponent'}, {title: 'Progressbar'}]
      }
    },
	{
      path: 'country',
      component: NgbdDropdownBasic,
      data: {
        title: 'country',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'ngComponent'}, {title: 'Progressbar'}]
      }
    },
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
