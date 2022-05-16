import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions.component.html',
  styleUrls: ['./add-permissions.component.scss']
})
export class AddPermissionsComponent implements OnInit {

  allPermissionsData  = [];        // Permissions Data Array
  userPermissionsData = [];        // User Permissions Data Array
  addPermissionsData  = [];        // User Permissions Data Array
  userid: number;                  // User Id for changing user

  constructor(private permissionServ: PermissionService) { }

  ngOnInit(): void {
    this.getPermissionsData();
  }

// Get All Permissions data
getPermissionsData() {

  this.permissionServ.getAllPermissionsData().subscribe(res => {
    this.allPermissionsData = res.data;
    console.log(this.allPermissionsData );
  }, error => {
    console.log(error);
  })


}

  // Get All Permissions By selecting User //

getUserPermissions(index: any, type:number) {

      if (index == 'default') {
        console.log('returned');

        this.userPermissionsData = [];
        return;
      }
      // console.log(index.target.value);


      // this.permissionServ.getAllUserPermissionsData(type == 0 ? index: index).subscribe(res => {
        // console.log(res.data);
        // this.userid = type == 0 ? index: index;
        
        this.permissionServ.getAllUserPermissionsData(index).subscribe(res => {
          this.userPermissionsData  = Object.values(res.data.reduce((r,o) => {
          r[o.menu_ctgry_id] = r[o.menu_ctgry_id] || {'menu_id': o.menu_id,  'menu_cat_nm': o.menu_cat_nm, 'menu_cat_img': o.menu_cat_img, 'menu_state_icon' : o.menu_state_icon,  'reportdata' : []};
          r[o.menu_ctgry_id]['reportdata'].push({ 'menu_nm': o.menu_nm, 'menu_state': o.menu_state_nm, 'carrer_menu_id': o.carrer_menu_id});
          return r;
        }, {}));
        this.addPermissionsData = [];
        if (!this.userPermissionsData.length) {
          this.permissionServ.statusChangeAlert('Already All Permissions Added')
        }

        console.log(this.userPermissionsData );
      }, error => {
        console.log(error);
      })

}
   //change permission roles  //

   rolesChanged(roles, event) {
    console.log(roles, event);

    if (event.checked){
      this.addPermissionsData.push({ 'carrer_menu_id': roles })
    }

    else {
      var index = this.addPermissionsData.indexOf(roles);
      this.addPermissionsData.splice(index, 1);
    }
    console.log( this.addPermissionsData);
  }
  //submit user permission roles  //

  submitPermissions() {
    const data = {
      'items'  : this.addPermissionsData,
      'usr_id' : this.userid 
    }
    this.permissionServ.submitAllPermissionsData(data).subscribe(res => {
      console.log(res);
      this.getUserPermissions( this.userid, 1);

    }, error => {
      console.log(error);
    })
  }
  //selecting All
  selectall() {
         
  }

}
