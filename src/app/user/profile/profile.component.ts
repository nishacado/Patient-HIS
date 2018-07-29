import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { DataProvider } from '../../../provider/data';

import { Router } from '@angular/router';

@Component({

templateUrl: 'profile.component.html'
})
export class ProfileComponent {
  
    modelvariable;
    closeResult: string;
    public isCollapsed = false;
    key=false;
    curuserdetails;
    phoneno;
    Address;
    currentuser; 
    @ViewChild('content') editModal: ElementRef;
  constructor(private modalService: NgbModal,public data:DataProvider){


    this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
			this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
      });
       }
       updateprofile(){

        firebase.database().ref('accounts/'+this.curuserdetails.key).update({
          phoneno:this.phoneno,
          Address:this.Address
          });
         // this.toastr.success('New Country added', 'Success');
         this.modelvariable.close();	  
          this.phoneno="";
          this.Address="";
         
      }
      edit(){
        this.phoneno=this.curuserdetails.phoneno;
        this.Address=this.curuserdetails.Address;
        this.open2(this.editModal);
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
        this.phoneno="";
        this.Address="";
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
    } 
   










