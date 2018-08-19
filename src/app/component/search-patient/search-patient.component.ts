import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public data:DataProvider,private router: Router,private toastr: ToastrService) {
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
			this.filteredusers=[];
		}else{
			this.filteredusers=[];
			for (var i of this.allpatients){
				if((i.name).indexOf(this.patname)>-1){
					this.filteredusers.push(i);
				}
			}
			if(this.filteredusers.length==0){
				this.filteredusers=[];
				this.toastr.warning('No patient found', 'Not Found');
			}
		}			
	}

	senreq(key,j){
		firebase.database().ref('connection-request/').push({
			sender:this.curuserdetails.key,
			target:key,
			reason:this.reason[j],
			status:"pending"
		});
		this.reason[j]="";
		this.toastr.error('Request Sent', 'Success');
	}

	getstatus(key){
		for (var i of this.allrequests){
			if(i.sender==this.curuserdetails.key){
				if(i.target==key){
					if(i.status=="pending"){
						return 1;
					}
					else if(i.status=="denied"){
						return 2;
					}else{
						return 3;
					}
					
				}
			}
		}
		return 0;
	}

	withdraw(key){

		for (var i of this.allrequests){
			if (i.target==key && i.sender==this.curuserdetails.key){
				firebase.database().ref('connection-request/').child(i.$key).remove();
				this.toastr.info('Request removed', 'Success');
			}
		}
	}

}
