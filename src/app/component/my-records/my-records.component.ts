import { Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { LoginProvider } from '../../../provider/login';
import { DataProvider } from '../../../provider/data';
import Orm from 'bigchaindb-orm';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';

const bdbOrm = new Orm(
	"https://test.bigchaindb.com/api/v1/",
	{
		app_id: "968ba82c",
		app_key: "ddd3ea7b7a13fa55752346e2e4b85fe3"
	}
);

const aliceKeypair = new bdbOrm.driver.Ed25519Keypair();


@Component({
	selector: 'ngbd-accordion-basic',
	templateUrl: 'my-records.component.html'
})
export class PatientRecords {
	curuserdetails: any;
	
	constructor(public data:DataProvider,private router: Router){
		let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}

		bdbOrm.define("myModel", "https://schema.org/v1/myModel");
		//this.tryaddingdata();
		this.fetchdata();

	}


	tryaddingdata(){
		bdbOrm.models.myModel
		.create({
			keypair: aliceKeypair,
			data: { key: 'testodataValue'}
		})
		.then(asset => {
			console.log(asset.id);
		})
	}

	fetchdata(){
		bdbOrm.models.myModel
    	.retrieve()
    	.then(assets => {
		// assets is an array of myModel
		console.log(assets.data);
        console.log(assets.map(asset => asset.key))
    	})
	}
}
