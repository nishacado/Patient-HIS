import { Component, ViewChild } from '@angular/core';
import { DataProvider } from '../../../provider/data';


declare var require: any;
const data: any = require('./doctor.json');
@Component({
  selector: 'data-table',
  templateUrl: './all-doctors.component.html',
   styleUrls: ['./all-doctors.css']    
    
})
export class AllDoctors {  
    editing = {};
    rows = [];
   // temp = [...data];
    
    loadingIndicator: boolean = true;
    reorderable: boolean = true;                           

    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'hospital' }
    ];       

    @ViewChild(AllDoctors) table: AllDoctors;
    curuserdetails: any;
	constructor(public data:DataProvider){


		this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
				this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
		  });

	}
   /* constructor() {
       
        this.rows = data;
        this.temp = [...data];
        setTimeout(() => { this.loadingIndicator = false; }, 1500);                                   
    }
    
    updateFilter(event) {
    const val = event.target.value.toLowerCase();
        
    

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
        
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
    }
    updateValue(event, cell, rowIndex) {    
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);        
  }*/
}
