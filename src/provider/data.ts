import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '../../node_modules/@angular/router';

@Injectable()
export class DataProvider {
    constructor(public angularfire: AngularFireDatabase,private router: Router) {
        console.log("Initializing Data Provider");
      }
      getUsers() {
        return this.angularfire.list('/accounts');
      }
      getCurrentUser() {
        let user=firebase.auth().currentUser;
        if(user){
          return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid);
        }else{
          this.router.navigate(['/authentication/login']);
        }
      }     
      getAllrequests(){
        return this.angularfire.list('/connection-request');
      }
      getDepartments(){
        return this.angularfire.list('/departments/'+firebase.auth().currentUser.uid);
      }
      getDepartment(key){
        return this.angularfire.object('/departments/'+firebase.auth().currentUser.uid+'/'+key);
      }
      getRecords(){
        return this.angularfire.list('/records');
      }
      getRecord(key){
        return this.angularfire.object('/records/'+key);
      }
    }
