import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
//import { AngularFireAuth } from 'angularfire2/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginProvider {


  constructor(public zone: NgZone, public http: Http, private router:Router,private toastr: ToastrService) {
    console.log("Initializing Login Provider");
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
  }
  }

  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.toastr.success('Logged in to the system', 'Success!');
        this.router.navigate(['/user/profile']);
      })
      .catch((error) => {
        let code = error["code"];
        this.toastr.error(code, 'Error !');
      });
  }

  // Register user on Firebase given the email and password.
  register(name,email,password,role) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((success) => {
        console.log("Register success");
        let user=firebase.auth().currentUser;
        // firebase.auth().currentUser.sendEmailVerification();
        this.createNewUser(user.uid, name , email,password,role);
        this.toastr.success('Registered in to the system', 'Success!');
      })
      .catch((error) => {
        let code = error["code"];
        console.log("error "+code);
        this.toastr.error(code, 'Error !');
      });
  }


  // Creating new user after signed up
  createNewUser(userId,name , email,password,role){
    let dateCreated= new Date();
    firebase.database().ref('accounts/'+userId).set({userId,name , email,password,role});
    this.router.navigate(['/authentication/login']);
  }

}

