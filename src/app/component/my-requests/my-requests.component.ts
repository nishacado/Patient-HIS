import { Input, Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { DataProvider } from '../../../provider/data';

@Component({
	selector: '',
	templateUrl: 'my-requests.component.html'
})

export class MyRequests{
	curuserdetails: any;
	constructor(public data:DataProvider){


		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });

	}

}




