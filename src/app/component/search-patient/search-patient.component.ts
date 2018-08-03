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
  model2: any;
  searching = false;
  searchFailed = false;
  curuserdetails: any;

  constructor(public data:DataProvider,private router: Router) {
		let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}

  }


 
}
