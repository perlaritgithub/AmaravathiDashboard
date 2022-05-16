import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    name: string;
    email: string;
    RouteData = [
      { path: '/permissions/create-user',title: 'Create User' },
      { path: '/permissions/add-permissions', title: 'Add Permissions' },
      { path: '/permissions/view-permissions', title: 'View Permissions' },
      { path: '/user-details', title: 'User Reports' },
      { path: '/user-details/changeuser', title: 'Change User Type' },
      { path: '/user-details/changediscount',  title: 'Change Discount' },
      { path: '/user-details/addwholeseller',  title: 'Add Wholeseller' },
      { path: '/user-details/contactreport',  title: 'Contact Report' },
      { path: '/wallet/addwallet',  title:'Add Wallet' },
      { path: '/products', title: 'Add Category' },
      { path: '/orders/orders', title: 'All Orders' },
      { path: '/products/add-sub-category', title: 'Add Sub Category' },
      { path: '/orders/acceptedorders', title: 'Accepeted Orders' },
      { path: '/products/add-quantity', title: 'Add Quantity' },
      { path: '/orders/CompletedOrders', title: 'Completed Orders' },
      { path: '/products/add-quality', title: 'Add Quality'},
      { path: '/orders/RejectedOrders', title: 'Rejected Orders' },
      { path: '/products/add-item', title: 'Add Item'},
      { path: '/banners/appbanner', title: 'App Banners' },
      {path:'/banners/appfaq' , title:'App Faq'}
  
    ]

    constructor(public sidebarservice: SidebarService,private loginService: LoginService, private router: Router) { 
        this.name = localStorage.getItem('usr_nm');
        this.email = localStorage.getItem('usr_email')
    }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        
        if ($("#wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $("#wrapper").removeClass("nav-collapsed");
            $("#sidebar-wrapper").unbind( "hover");
        } else {
            $("#wrapper").addClass("nav-collapsed");
            $("#sidebar-wrapper").hover(
                function () {
                    $("#wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $("#wrapper").removeClass("sidebar-hovered");
                }
            )
      
        }
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    
    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".search-btn-mobile").on("click", function () {
                $(".search-bar").addClass("full-search-bar");
            });
            $(".search-arrow-back").on("click", function () {
                $(".search-bar").removeClass("full-search-bar");
            });
        });

    }


    changeRoute(path){
        console.log(path);
  
        this.router.navigate([path]);
    }

    logout(){
        this.loginService.logout();
    }

}
