import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
templateUrl: 'departments.component.html'
})
export class Departments {
		curuserdetails: any;
		modelvariable;
		closeResult: string;
		// This is for the collapse example
		public isCollapsed = false;
		key=false;
		deptlist;
		name;
		currentkey;
		@ViewChild('content') editModal: ElementRef;
	constructor(public data:DataProvider,private router: Router,private modalService: NgbModal,private toastr: ToastrService){

		let user=firebase.auth().currentUser;
		if(user){
			this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
				this.data.getDepartments().snapshotChanges().subscribe((deptlist) => {
					this.deptlist = deptlist.map(c => {
						if(c.key != null && c.key != undefined)
						return { $key: c.key, ...c.payload.val()}
					});
					});
		  });
		}else{
		  this.router.navigate(['/authentication/login']);
		}
	}

	add(){

    firebase.database().ref('departments/'+firebase.auth().currentUser.uid).push({
      name:this.name
      });
      this.toastr.success('record Added', 'Success');
      this.name="";
      this.modelvariable.close();
  }

  edit(key){
    this.key=true;
    this.open2(this.editModal);
    this.data.getDepartment(key).snapshotChanges().subscribe((receiver) => {
			var receiver1 = { $key: receiver.key, ...receiver.payload.val()};
      this.name=receiver1.name;
      this.currentkey = receiver1.$key;
		});
  }

  update(){
    this.key=false;
    firebase.database().ref('departments/'+firebase.auth().currentUser.uid+'/'+this.currentkey).update({
			name:this.name,
      });
      this.toastr.success('Record Updated', 'Success');
      this.modelvariable.close();
      this.name="";
  }

  delete(key){
    firebase.database().ref('departments/'+firebase.auth().currentUser.uid).child(key).remove();
    this.toastr.error('Record Deleted', 'Success');
  }

  open2(content) { 

    this.modelvariable = this.modalService.open(content);
    this.modelvariable.result.then((result) => { 
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
