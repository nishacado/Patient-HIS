import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import {  MyConnections } from './my-connections/my-connections.component';
import { PatientRecords } from './my-records/my-records.component';
import { MyRequests } from './my-requests/my-requests.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SearchPatient } from './search-patient/search-patient.component';
import { DataAccess } from './data-access/data-access.component';
import { Departments} from './departments/departments.component';
import { PatientRecord } from './patient-record/patient-record.component';
import { DataProvider } from '../../provider/data';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    AngularFireStorageModule,
  ],
  declarations: [
    MyConnections,
    PatientRecords,
    MyRequests,
    NgbdModalBasic,
    SearchPatient,
    DataAccess,
    Departments,
    PatientRecord
  ],
  providers:[DataProvider]
})

export class ComponentsModule { }
