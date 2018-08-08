import { Component, ViewChild, OnInit } from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  templateUrl: './all-patients.component.html',
  styleUrls: ['./patient.css'] 
})
export class AllPatients implements OnInit{ 
  ngOnInit(){
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };
  }  

    curuserdetails: any;
    allpatients=[];
    dtOptions={};
    dttabrefresh=true;
	constructor(public data:DataProvider,private router: Router){

    let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}

    this.data.getUsers().snapshotChanges().subscribe((list) => {
			var allusers = list.map(c => {
			  if(c.key != null && c.key != undefined)
				return { $key: c.key, ...c.payload.val()}
      });
      for (var i of allusers){
        if (i.role=='Patient'){
          this.allpatients.push(i);
        }
      }
      this.rerender();
      });

  }
  
  rerender(){
    this.dttabrefresh = false;
    setTimeout(() => {
      this.dttabrefresh = true;
  }, 50); 
  }

}
