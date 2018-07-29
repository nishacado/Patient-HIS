import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';


export const routes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
        { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'all-data', loadChildren: './all-data/all-data.module#TablesModule' },
        { path: 'user', loadChildren: './user/user.module#SamplePagesModule' }
    ]
},
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
},
{
    path: '**',
    redirectTo: '/404'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }

