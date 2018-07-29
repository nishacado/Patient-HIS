import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './404/not-found.component';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';


import { AuthenticationRoutes } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginProvider } from '../../provider/login';
import * as $ from 'jquery'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule
    
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent,

  ],
  providers: [LoginProvider],
})

export class AuthenticationModule {}
