import { Component} from '@angular/core';
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from '../../../../node_modules/rxjs';
import Orm from 'bigchaindb-orm'
import { ToastrService } from 'ngx-toastr';

const bdbOrm = new Orm(
    "https://test.bigchaindb.com/api/v1/",
    {
        app_id: "968ba82c",
        app_key: "ddd3ea7b7a13fa55752346e2e4b85fe3"
    }
);


bdbOrm.define("myModel", "https://schema.org/v1/myModel");
const aliceKeypair = new bdbOrm.driver.Ed25519Keypair();

@Component({
	templateUrl: 'patient-record.component.html' 
})
export class PatientRecord {
	curuserdetails: any;
	modelvariable;
	closeResult: string;
	// This is for the collapse example
	public isCollapsed = false;
	key=false;
	deptlist=[];
	allrecords=[];
	currentkey="";
	currentdt = new Date().getTime();
	connections=[];
	allpatients=[];
	connectedpatients=[];
	@ViewChild('content') editModal: ElementRef;
	ref: any;
	task: any;
	fileurl='';

	//handling data
	name="";
	selecteddepartment="";
	cdescription="";
	medication="";
	notes="";
	//end data
	downloadURL: Observable<string>;
	uploadProgress: any;
	totaldepts=[];

constructor(public data:DataProvider,private router: Router,private modalService: NgbModal,private afStorage: AngularFireStorage,private toastr: ToastrService){

	let user=firebase.auth().currentUser;
	if(user){
		
		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
			this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
			//get records
			this.data.getRecords().snapshotChanges().subscribe((list) => {
				this.allrecords = list.map(c => {
					if(c.key != null && c.key != undefined)
					return { $key: c.key, ...c.payload.val()}
				});
				});

			//get departments
			this.data.getDepartments().snapshotChanges().subscribe((deptlist) => {
				this.deptlist = deptlist.map(c => {
					if(c.key != null && c.key != undefined)
					return { $key: c.key, ...c.payload.val()}
				});
			});

			//get connections array
			this.data.getAllrequests().snapshotChanges().subscribe((list) => {
				var requests = list.map(c => {
					if(c.key != null && c.key != undefined)
					return { $key: c.key, ...c.payload.val()}
				});
				for (var i of requests){
					this.connections=[];
					if (i.sender==this.curuserdetails.key){
						if(i.status=="connected"){
							this.connections.push(i);
						}
					}
				}
				//get all users
				this.data.getUsers().snapshotChanges().subscribe((list) => {
					var allusers = list.map(c => {
						if(c.key != null && c.key != undefined)
						return { $key: c.key, ...c.payload.val()}
					});
					for (var i of allusers){
						if (i.role=='Patient'){
							this.allpatients.push(i);
						}
					}
				//populate connected patients
				if(this.connections.length>0){
					for (var i of this.connections){
						for (var j of this.allpatients){
							if(i.target==j.$key){
								this.connectedpatients.push(j);
							}
						}
					}
				}
					});
			});

		});
		this.getallblocks();
	}else{
		this.router.navigate(['/authentication/login']);
	}
}

clearall(){
	this.name="";
	this.selecteddepartment="";
	this.cdescription="";
	this.medication="";
	this.notes="";
	this.currentkey="";
	this.fileurl="";
	this.modelvariable.close();
}

add(){
	firebase.database().ref('records/').push({
		name:this.name,
		created:this.currentdt,
		dept:this.selecteddepartment,
		desc:this.cdescription,
		medi:this.medication,
		note:this.notes,
		file:this.fileurl,
		dockey:this.curuserdetails.userId
		});
		this.toastr.success('Record Added', 'Success');
		this.createblock();
		this.clearall();	
}

getallblocks(){
	bdbOrm.models.myModel.retrieve().then(assets => {
	 // assets is an array of myModel
	 console.log(assets.map(asset => asset.id))
	})
}

createblock(){
	bdbOrm.models.myModel
	.create({
	 keypair: aliceKeypair,
	 data: {
		name:this.name,
		created:this.currentdt,
		dept:this.selecteddepartment,
		desc:this.cdescription,
		medi:this.medication,
		note:this.notes,
		file:this.fileurl,
		dockey:this.curuserdetails.userId
	 }
	})
	.then(crab => {
	 console.log(crab.id)
	})
}

edit(key){
	this.key=true;
	this.open2(this.editModal);
	this.data.getRecord(key).snapshotChanges().subscribe((receiver) => {
		var receiver1 = { $key: receiver.key, ...receiver.payload.val()};
		this.name=receiver1.name;
		this.selecteddepartment=receiver1.dept;
		this.cdescription=receiver1.desc;
		this.medication=receiver1.medi;
		this.notes=receiver1.note;
		this.currentkey = receiver1.$key;
	});
}

update(){
	this.key=false;
	firebase.database().ref('records/'+this.currentkey).update({
		name:this.name,
		created:this.currentdt,
		dept:this.selecteddepartment,
		desc:this.cdescription,
		medi:this.medication,
		note:this.notes
		});
		this.toastr.success('Record Updated', 'Success');
		this.clearall();
}

delete(key){
	firebase.database().ref('records/').child(key).remove();
	this.toastr.error('Record deleted', 'Success');
}

burnblock(){
	bdbOrm.myModel
 .create({
  keypair: aliceKeypair,
  data: { key: 'dataValue' }
 })
 .then(asset => {
  // lets burn the asset by transferring it to the
  // burn address. Since we don't know the private key,
  // it's infeasible to redeem the asset
  return asset.burn({
   keypair: aliceKeypair
  })
 })
 .then(burnedAsset => {
	 console.log("Block burned");
 })
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

getdateandtime(datevalue){
	var created = new Date(datevalue);
	return created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear()+' '+created.getHours()+':'+created.getMinutes()+':'+created.getSeconds();
}

upload(event) {
  this.fileurl='0';
  const randomId = Math.random().toString(36).substring(2);
  this.ref = this.afStorage.ref(randomId);
  this.task = this.ref.put(event.target.files[0]);
  this.uploadProgress = this.task.percentageChanges();
  this.downloadURL = this.task.downloadURL().subscribe(url => { 
	const Url = url; // for ts
	this.fileurl = Url;
})
}

getname(key){
  for (var i of this.allpatients){
	  if (i.$key==key){
		  return i.name;
	  }
  }

  return "Invalid record";
}



}