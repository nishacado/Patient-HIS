import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { DataProvider } from '../../../provider/data';
import { ToastrService } from 'ngx-toastr';
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
    name;

    phoneno;
    Address="";
    currentuser; 
    hospitalname;
    Mobile;
    Email;
    location;
    description;
    allrecords=[];
    alldoctors=[];

    @ViewChild('content') editModal: ElementRef;
    @ViewChild('content1') editModal1: ElementRef;
  constructor(private modalService: NgbModal,public data:DataProvider,private router: Router,private toastr: ToastrService){

    let user=firebase.auth().currentUser;
    if(user){
      this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
        this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
        			//get records
			this.data.getRecords().snapshotChanges().subscribe((list) => {
				var allrecords = list.map(c => {
					if(c.key != null && c.key != undefined)
					return { $key: c.key, ...c.payload.val()}
				});
				this.allrecords=[];
				for(var i of allrecords){
					if(i.name==this.curuserdetails.userId){
						this.allrecords.push(i);
					}
				}
				});
        });
        this.data.getUsers().snapshotChanges().subscribe((list) => {
					var allusers = list.map(c => {
						if(c.key != null && c.key != undefined)
						return { $key: c.key, ...c.payload.val()}
					});
					for (var i of allusers){
						if (i.role=='Doctor'){
							this.alldoctors.push(i);
						}
					}
					});
    }else{
      this.router.navigate(['/authentication/login']);
    }



       }

       updateprofile(){

        firebase.database().ref('accounts/'+this.curuserdetails.key).update({
          name:this.name,
          phoneno:this.phoneno,
          Address:this.Address,

          });
         this.toastr.success('Profile Updated', 'Success');
         this.modelvariable.close();	  
          this.phoneno="";
          this.Address="";
         
      }
      updatedetails(){

        firebase.database().ref('accounts/'+this.curuserdetails.key).update({
          hospitalname:this.hospitalname,
          Mobile:this.Mobile,
          Email:this.Email,
          location:this.location,
          description:this.description,
          
          });
         this.toastr.success('Hospital Details Updated', 'Success');
         this.modelvariable.close();
         this.hospitalname="";
         this.Mobile="";
         this.Email="";	
         this.location="";
         this.description=""; 
          
         
      }
      editdetails(){
        this.hospitalname=this.curuserdetails.hospitalname;
        this.Mobile=this.curuserdetails.Mobile;
        this.Email=this.curuserdetails.Email;
        this.location=this.curuserdetails.location;
        this.description=this.curuserdetails.description;

        this.open3(this.editModal1);
      }
      edit(){
        this.name=this.curuserdetails.name;
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
      open3(content1) { 

        this.modelvariable = this.modalService.open(content1);
        this.modelvariable.result.then((result) => { 
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
        });
      
      }
      private getDismissReason1(reason: any): string {
        this.hospitalname="";
        this.Mobile="";
        this.Email="";
        this.location="";
        this.description="";
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
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
      getdateandtime(datevalue){
        var created = new Date(datevalue);
        return created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear()+' '+created.getHours()+':'+created.getMinutes()+':'+created.getSeconds();
      }
      getdocname(key){
        for(var i of this.alldoctors){
          if(i.$key==key){
            return i.name;
          }
        }
        return "Invalid Name";
      }
    } 
   










