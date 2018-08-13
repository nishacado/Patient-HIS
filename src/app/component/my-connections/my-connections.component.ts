import { Component } from '@angular/core';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
	selector: 'ngbd-pagination',
	templateUrl: './my-connections.component.html'
}) 
 
export class MyConnections{

	curuserdetails: any;
	userrequests=[];
	alluser=[];
	constructor(public data:DataProvider,private router: Router){

		let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
				this.data.getAllrequests().snapshotChanges().subscribe((list) => {
					var requests = list.map(c => {
						if(c.key != null && c.key != undefined)
						return { $key: c.key, ...c.payload.val()}
					});
					for (var i of requests){
						this.userrequests=[];
						if (i.target==this.curuserdetails.key){
							if(i.status=="connected"){
								this.userrequests.push(i);
							}
						}
					}
					});
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}
		this.data.getUsers().snapshotChanges().subscribe((list) => {
			this.alluser = list.map(c => {
			  if(c.key != null && c.key != undefined)
				return { $key: c.key, ...c.payload.val()}
     		});
		});
			
	}

	revoke(key){
		firebase.database().ref('connection-request/'+key).update({
			status:"denied"
		});
	}

	getname(key){
		for (var i of this.alluser){
			if (i.$key == key){
				return i.name;
			}
		}
		return "Invalid Request";
	}

	gethospital(key){
		for (var i of this.alluser){
			if (i.$key == key){
				if(i.hospitalname){
					return i.hospitalname;
				}else{
					return "Disclosed By Doctor";
				}
			}
		}
		return "Invalid Request";
	}
}
