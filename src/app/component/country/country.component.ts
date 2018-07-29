import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';

import { DataProvider } from '../../../provider/data';

@Component({
	selector: 'ngbd-dropdown-basic',
	templateUrl: './country.component.html'
})
 
export class NgbdDropdownBasic{
  modelvariable;
  closeResult: string;
  // This is for the collapse example
  public isCollapsed = false;
  key=false;
  countrylist;
  name;
  currentcountry;


  @ViewChild('content') editModal: ElementRef;
  constructor(private modalService: NgbModal,public data:DataProvider){


    this.data.getCountries().snapshotChanges().subscribe((countrylist) => {
			this.countrylist = countrylist.map(c => {
			  if(c.key != null && c.key != undefined)
				return { $key: c.key, ...c.payload.val()}
			});
      console.log(this.countrylist);
      });
      

  }

  addcountry(){

    firebase.database().ref('country/').push({
      country:this.name
      });	  
      this.name="";
      this.modelvariable.close();
  }

  edit(key){
    this.key=true;
    this.open2(this.editModal);
    this.data.getCountry(key).snapshotChanges().subscribe((receiver) => {
			var receiver1 = { $key: receiver.key, ...receiver.payload.val()};
      this.name=receiver1.country;
      this.currentcountry = receiver1.$key;
		});
  }

  updatecountry(){
    this.key=false;
    console.log(this.currentcountry);
    firebase.database().ref('country/'+this.currentcountry).update({
      country:this.name,
			});
      this.modelvariable.close();
      this.name="";
  }

  delete(key){
    firebase.database().ref('country/').child(key).remove();
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
