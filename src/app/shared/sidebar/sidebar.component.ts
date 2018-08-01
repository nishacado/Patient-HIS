import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES,PATIENTROUTE,DOCTORROUTE } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { DataProvider } from '../../../provider/data';
declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
    
    curuserdetails;
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
            
        } else {
            this.showMenu = element; 
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
            
        } else {
            this.showSubMenu = element; 
        }
    }
    
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute,public data:DataProvider) {

                   }      
        

    // End open close
    ngOnInit() {
		            this.data.getCurrentUser().snapshotChanges().subscribe((datafromdb) => {
                  this.curuserdetails = {key:datafromdb.key,...datafromdb.payload.val()};
				  		if(this.curuserdetails.role=='Admin'){
			this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
		}else if(this.curuserdetails.role=='Patient'){
			this.sidebarnavItems = PATIENTROUTE.filter(sidebarnavItem => sidebarnavItem);
		}else if(this.curuserdetails.role=='Doctor'){
			this.sidebarnavItems = DOCTORROUTE.filter(sidebarnavItem => sidebarnavItem);
		}else{
			this.router.navigate['/'];
		}
                  });

        
		
		
        $(function () {
            $(".sidebartoggler").on('click', function() {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");
                     
                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });
        
    }
}
