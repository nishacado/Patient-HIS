import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginProvider } from '../../../provider/login';
import * as $ from 'jquery'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    
    
 constructor(public router: Router,public loginProvider: LoginProvider) {}
     email:any;
     password:any;
     role:any;
    ngOnInit() {}



   onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');
        this.loginProvider.emailLogin(this.email,this.password,this.role);
    }


     
   
}
