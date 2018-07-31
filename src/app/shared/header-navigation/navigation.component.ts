import { Component, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'; 
import { DataProvider } from '../../../provider/data';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  curuserdetails;
	name:string;
  	public config: PerfectScrollbarConfigInterface = {};
    constructor(private modalService: NgbModal,public data:DataProvider,private router:Router){


      this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
        this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
        });
         }
      
    ngAfterViewInit() {
        
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("#main-wrapper").addClass("mini-sidebar");
            } else {
                $("#main-wrapper").removeClass("mini-sidebar");
            }
        };
        $(window).ready(set);
        $(window).on("resize", set);

        
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });
        
        
        $("body").trigger("resize");
    }
    logout() {
      //this.toastr.info('Logout was Successful', 'Success');
      firebase.auth().signOut().then((success) => {
        // Clear navigation stacks
        this.router.navigate(['/']);
      });
    }
}
