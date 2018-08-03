import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
	templateUrl: 'patient-record.component.html' 
})
export class PatientRecord {
	modelvariable;
	closeResult: string;
	// This is for the collapse example
	public isCollapsed = false;
	curuserdetails: any;
	constructor(private modalService: NgbModal,public data:DataProvider,private router: Router){

		let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}

	}
	open2(content) { 

		this.modelvariable = this.modalService.open(content);
		this.modelvariable.result.then((result) => { 
		  console.log("Modal was closed");
		}, (reason) => {
		  this.getDismissReason(reason);
		});
	  
	  }
	
	  private getDismissReason(reason: any): string {

		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return  `with: ${reason}`;
		}
	  }
}