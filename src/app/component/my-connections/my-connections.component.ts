import { Component } from '@angular/core';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { DataProvider } from '../../../provider/data';

@Component({
	selector: 'ngbd-pagination',
	templateUrl: './my-connections.component.html'
}) 
 
export class MyConnections{
  	page = 4;
  	page2 = 1;
  	currentPage = 3;
  	disablepage = 3;
  	isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
	}
	curuserdetails: any;
	constructor(public data:DataProvider){


		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });

	}
}
