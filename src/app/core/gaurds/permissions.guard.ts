import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivateChild {
  constructor(
    private router: Router

) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(childRoute.data.roles);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(currentUser);
      const results = currentUser.filter( res  =>  { return res.menu_cat_id == childRoute.data.roles
       } );
      // console.log(currentUser,results );


      // const result = currentUser.filter(  ({menu_ctgry_id})  =>  console.log(menu_ctgry_id)
      // );
      // console.log( results);

      // console.log(result.length,( childRoute.data.roles && result.length === 0) );

      if (currentUser) {
            // check if childRoute is restricted by role
            if (childRoute.data.roles && results.length === 0 ) {
              console.log(results);
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
          }


      //     // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/signin2'], { queryParams: { returnUrl: state.url } });
      return false;
  }

}
