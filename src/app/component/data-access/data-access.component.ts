import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
@Component({
templateUrl: 'data-access.component.html'
})
export class DataAccess {
    curuserdetails: any;
	constructor(public data:DataProvider){


		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });

	}
}
