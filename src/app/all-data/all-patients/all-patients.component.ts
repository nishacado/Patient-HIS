import { Component, ViewChild } from '@angular/core';


declare var require: any;
const data: any = require('./patients.json');

@Component({
  selector: 'app-basic',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./patient.css'] 
})
// tslint:disable-next-line:component-class-suffix
export class AllPatients { 

  editing = {};
  rows = [];
  temp = [...data];
  
  loadingIndicator: boolean = true;
  reorderable: boolean = true;                           

  columns = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'hospital' }
  ];       

  @ViewChild(AllPatients) table: AllPatients;
  constructor() {
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
}
}
