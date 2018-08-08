import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { TablesRoutes } from './all-data.routing';
import { AllDoctors } from './all-doctors/all-doctors.component';
import { AllPatients } from './all-patients/all-patients.component';
import { DataProvider } from '../../provider/data';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TablesRoutes),
    DataTablesModule
  ],
  declarations: [
    AllDoctors,
    AllPatients,
  ],
  providers:[DataProvider]
})

export class TablesModule {}