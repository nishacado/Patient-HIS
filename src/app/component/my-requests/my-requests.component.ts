import { Input, Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: '',
	templateUrl: 'my-requests.component.html'
})

export class MyRequests{
	curuserdetails: any;
	userrequests=[];
	alluser=[];
	denieduserrequests=[];
	constructor(public data:DataProvider,private router: Router,private toastr: ToastrService){


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
						this.denieduserrequests=[];
						if (i.target==this.curuserdetails.key){
							if(i.status=="pending"){
								this.userrequests.push(i);
							}
							if(i.status=="denied"){
								this.denieduserrequests.push(i);
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

	acceptrequest(key){
		firebase.database().ref('connection-request/'+key).update({
			status:"connected"
		});
		this.toastr.success('Connection Established', 'Success!');
	}

	denyrequest(key){
		firebase.database().ref('connection-request/'+key).update({
			status:"denied"
		});
		this.toastr.error('Request Denied', 'Success!');
	}

	reconsider(key){
		firebase.database().ref('connection-request/'+key).update({
			status:"pending"
		});		
		this.toastr.info('Request was reconsidered', 'Success!');
	}

}




