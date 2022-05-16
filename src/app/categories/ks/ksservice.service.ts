import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class KsserviceService {
  Api = 'http://localhost:9876/nodeapp/'
  constructor(private Http: HttpClient) { }


  postform(data: any) {
    console.log("name")
    return this.Http.post<any>(this.Api + `postdata`, data).pipe(map(res => {
      console.log("name122")
      return res;
    
    }, (error: any) => {
      return error;
    }));

  }

  postsubcate(data: any) {
    console.log("name")
    return this.Http.post<any>(this.Api + `postsubcate`, data).pipe(map(res => {
      console.log("name122")
      return res;
    
    }, (error: any) => {
      return error;
    }));

  }

  getsubcate() {
    return this.Http.get<any>(this.Api + `getsubcate`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }

  getItemData() {
    return this.Http.get<any>(this.Api + `getItem`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }
  addItemForm(data: any) {
    console.log("name")
    return this.Http.post<any>(this.Api + `additemdate`, data).pipe(map(res => {
      console.log("name122")
      return res;
    
    }, (error: any) => {
      return error;
    }));

  }

  getform1() {
    return this.Http.get<any>(this.Api + `getsubmitdata`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }

//second
  postform1(data: any) {
    console.log("name")
    return this.Http.post<any>(this.Api + `post1data`, data).pipe(map(res => {
      console.log("name122")
      return res;
    
    }, (error: any) => {
      return error;
    }));

  }



  getform2() {
    return this.Http.get<any>(this.Api + `get1submitdata`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }

///3


  postform2(data: any) {
    console.log("name")
    return this.Http.post<any>(this.Api + `post2data`, data).pipe(map(res => {
      console.log("name122")
      return res;
    
    }, (error: any) => {
      return error;
    }));

  }




  getform3() {
    return this.Http.get<any>(this.Api + `get2submitdata`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }


}
