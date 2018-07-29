
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
@Injectable()
export class AuthGuard {
  
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) 
  {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
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
        console.log("register was successful");


      })
      .catch((error) => {
        let code = error["code"];
        console.log("error "+code);
      });
  }
  // Creating new user after signed up
  createNewUser(userId,name , email,password,role){
    let dateCreated= new Date();
    firebase.database().ref('accounts/'+userId).set({userId,name , email,password,role});
    this.router.navigate(['/authentication/login']);
  }
   // Login on Firebase given the email and password.
   emailLogin(email, password,role) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log("login was successful");
        this.router.navigate(['/user/profile']);
        
      })
      .catch((error) => {
        let code = error["code"];
        
      });
  }
 
  logout() {
   
    firebase.auth().signOut().then((success) => {
      // Clear navigation stacks
      this.router.navigate(['/']);
    });
  }
  




  }















