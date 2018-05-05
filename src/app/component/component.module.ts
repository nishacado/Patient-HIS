import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { AllDoctors } from './all-doctors/all-doctors.component';
import {  MyConnections } from './my-connections/my-connections.component';
import { PatientRecords } from './my-records/my-records.component';
import { MyRequests } from './my-requests/my-requests.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SearchPatient } from './search-patient/search-patient.component';
import { DataAccess } from './data-access/data-access.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule
  ],
  declarations: [
    AllDoctors,
    MyConnections,
    PatientRecords,
    MyRequests,
    NgbdModalBasic,
    SearchPatient,
    DataAccess
  ]
})

export class ComponentsModule { }
