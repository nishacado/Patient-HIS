import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { PatientRecord } from './patient-record/patient-record.component';

export const SamplePagesRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'profile',
      component: ProfileComponent,
      data: {
        title: 'Profile',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Profile Page'}]
      }
    },
    {
      path: 'patient-record',
      component: PatientRecord,
      data: {
        title: 'Patient Records',
        urls: [{title: 'Patient'}, {title: 'Patient Record'}]
      }
    }]
  }
];
