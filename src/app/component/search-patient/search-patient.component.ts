import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
	selector: 'ngbd-pagination',
	templateUrl: './search-patient.component.html',
	providers: []
}) 
 
export class SearchPatient{
  public model: any;

	curuserdetails: any;
	allpatients=[];
	filteredusers=[];
	reason=[];
	patname="";
	allrequests=[];

  constructor(public data:DataProvider,private router: Router) {
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
			});

			this.data.getAllrequests().snapshotChanges().subscribe((list) => {	
				this.allrequests = list.map(c => {
					if(c.key != null && c.key != undefined)
					return { $key: c.key, ...c.payload.val()}
				});

			});
			
	}
	
	search(){
		this.filteredusers=[];
		if(this.patname==""){

		}else{
			this.filteredusers=[];
			for (var i of this.allpatients){
				if((i.name).indexOf(this.patname)>-1){
					this.filteredusers.push(i);
				}
			}
			if(this.filteredusers.length==0){
				alert('No Patient Found');
			}
		}			
	}

	senreq(key,j){
		firebase.database().ref('connection-request/').push({
			sender:this.curuserdetails.key,
			target:key,
			reason:this.reason[j]
		});
		this.reason[j]="";
		alert('request sent');
	}

	checksent(ky){
		for (var i of this.allrequests){
			if (ky==i.target){
				return false;
			}
		}
		return true;
	}

}
