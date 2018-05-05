import { Routes } from '@angular/router';

import { AllDoctors } from './all-doctors/all-doctors.component';
import { AllPatients } from './all-patients/all-patients.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'all-doctors',
      component: AllDoctors,
      data: {
        title: 'All Doctors',
        urls: [{title: 'Dashboard'},{title: 'all-doctors'}]
      }
    },
    {
      path: 'all-patients',
      component: AllPatients,
      data: {
        title: 'All Patients',
        urls: [{title: 'Dashboard'},{title: 'all-patients'}]
      }
    }]
  }
];
