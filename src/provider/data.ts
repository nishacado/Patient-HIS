import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class DataProvider {
    constructor(public angularfire: AngularFireDatabase) {
        console.log("Initializing Data Provider");
      }
      getUsers() {
        return this.angularfire.list('/accounts', ref => ref.orderByChild('name'));
      }
      getCurrentUser() {
        return this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid);
      }
      getCountries(){
        return this.angularfire.list('/country');
      }
      getCountry(key) {
        return this.angularfire.object('/country/' + key);
        }

    }
