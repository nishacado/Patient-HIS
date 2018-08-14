import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SamplePagesRoutes } from './user.routing';

import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataProvider } from '../../provider/data';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SamplePagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    ProfileComponent,
  ],
  providers:[DataProvider]
})

export class SamplePagesModule {}