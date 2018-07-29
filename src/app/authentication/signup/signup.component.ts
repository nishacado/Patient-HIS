import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase';
import { LoginProvider } from '../../../provider/login';
import * as $ from 'jquery'
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    name="";
    email="";
    role="";
    password="";
    confirm="";
    constructor(private router:Router) { 
      if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebase);
    }
        
    }

  

    ngOnInit() { }
    signup(){
      //console.log("clicked "+this.name+this.email+this.password+this.confirm);
      if(this.password==this.confirm){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((success) => {
          let user=firebase.auth().currentUser;
          let dateCreated= new Date();
          firebase.database().ref('accounts/'+user.uid).set({
            dateCreated,
            name:this.name,
            userId:user.uid,
            email:user.email,
            role:this.role,
            pass:this.password,
          });
          this.router.navigate(['/authentication/login']);
        })
        .catch((error) => {
          let code = error["code"];
          console.log(code);
        });
      }else{
        alert("Password didn't match");
      }

  }

}
