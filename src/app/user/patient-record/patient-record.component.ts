import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
	templateUrl: 'patient-record.component.html' 
})
export class PatientRecord {
	modelvariable;
	closeResult: string;
	// This is for the collapse example
	public isCollapsed = false;
	curuserdetails: any;
	constructor(private modalService: NgbModal,public data:DataProvider){


		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });

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