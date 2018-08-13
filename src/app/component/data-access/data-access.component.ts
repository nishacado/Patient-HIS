import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
templateUrl: 'data-access.component.html'
})
export class DataAccess {
		curuserdetails: any;
		userrequests=[];
		allpatients=[];
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
						if (i.sender==this.curuserdetails.key){
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
			var allusers = list.map(c => {
			  if(c.key != null && c.key != undefined)
				return { $key: c.key, ...c.payload.val()}
      });
      for (var i of allusers){
        if (i.role=='Patient'){
          this.allpatients.push(i);
        }
      }
			});
			
	}

	getname(key){
		for (var i of this.allpatients){
			if(i.$key == key){
				return i.name;
			}
		}
		return "Invalid Record"
	}

	getmail(key){
		for (var i of this.allpatients){
			if(i.$key == key){
				return i.email;
			}
		}
		return "Invalid Record"
	}

	getphone(key){
		for (var i of this.allpatients){
			if(i.$key == key){
				return i.phoneno;
			}
		}
		return "Invalid Record"
	}

}
