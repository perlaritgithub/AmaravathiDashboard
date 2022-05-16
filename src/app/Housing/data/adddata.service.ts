import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdddataService {
  // Api = 'https://polavaramrr.ap.gov.in:6781/housingdashboardapp/'


  Api='http://localhost:9876/nodeapp/'
  
  constructor(private http: HttpClient) { }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


statusChangeAlert(message) {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}


errorAlert() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    timer: 1500
  })
}


errorMessageAlert(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    timer: 1500
  })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

  // district code start

  addDistrict(data){
    return this.http.post<any>(this.Api + `adddistrict`, data).pipe(map(res => {
      this.statusChangeAlert(' District Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  getDistrict(){
    return this.http.get<any>(this.Api + `getdistrict`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }


  deletedistrict(id){
    return this.http.get<any>(this.Api + `deletedistrict/` + id ).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert('Deleted Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    })); 
  
  }

  updateDistrict(id){
    return this.http.post<any>(this.Api + `updatedistrict`, id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert(' Updated Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }


  //district code end

  //division start
  
  getdistrictdata(){
    return this.http.get<any>(this.Api + `getdistrictdata`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  getdivisiondata(){
    return this.http.get<any>(this.Api + `getdivisiondata`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }


  addDivision(data){
    return this.http.post<any>(this.Api + `adddivision`, data).pipe(map(res => {
      this.statusChangeAlert(' Division Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  getDivision(){
    return this.http.get<any>(this.Api + `getdivision`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  deletedivision(id){
    return this.http.get<any>(this.Api + `deletedivision/` + id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert('Deleted Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    })); 
  }  
  updateDivision(id){
    return this.http.post<any>(this.Api + `updatedivision`, id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert(' Updated Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  //division end
  
  //colony data start

   getcolonydata(){
    return this.http.get<any>(this.Api + `getcolonydata`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
    
  addcolonydata(data){
    return this.http.post<any>(this.Api + `addcolonydata`, data).pipe(map(res => {
      this.statusChangeAlert(' Colony Details Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  deletecolonydata(id){
    return this.http.get<any>(this.Api + `deletecolonydata/` + id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert('Deleted Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    })); 
  }

  updatecolonydata(id){
    return this.http.post<any>(this.Api + `updatecolonydata`, id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert(' Updated Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));

  }
  department(){
    return this.http.get<any>(this.Api + `department`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  changedivisiondata1(district){
    return this.http.get<any>(this.Api + `changedivisiondata1/`+ district).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  changehabitation(division){
    return this.http.get<any>(this.Api + `changehabitation/`+ division).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  //colony data end
  //habitation code start

  
  getcolonynames(){
    return this.http.get<any>(this.Api + `getcolonyname`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  gethabitationdata(){
    return this.http.get<any>(this.Api + `gethabitationdata`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  updatehabitationdata(id){
    return this.http.post<any>(this.Api + `updatehabitationdata`, id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert(' Updated Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  addhabitationdata(data){
    return this.http.post<any>(this.Api + `addhabitationdata`, data).pipe(map(res => {
      this.statusChangeAlert('Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  
  }

  deletehabitationdata(id){
    return this.http.get<any>(this.Api + `deletehabitationdata/` + id).pipe(map(res => {
      console.log(res.data);
      this.statusChangeAlert('Deleted Successfully')
      return res;
    }, error => {
      this.errorAlert();
      return error;
    })); 
  
  }

  
  //habitation code end

//stages code start

  addstagedata(data){
    return this.http.post<any>(this.Api + `addstagedata`, data).pipe(map(res => {
      this.statusChangeAlert(' Stage Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

 updatestagedata(id){
  return this.http.post<any>(this.Api + `updatestagedata`, id).pipe(map(res => {
    console.log(res.data);
    this.statusChangeAlert(' Updated Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
   }));
 }

 getstagedata(){
  return this.http.get<any>(this.Api + `getstagedata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
 }

 deletestagedata(id){
  return this.http.get<any>(this.Api + `deletestagedata/` + id).pipe(map(res => {
    console.log(res.data);
    this.statusChangeAlert('Deleted Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  })); 
 }

//stages code end


//infrastructure code start
addinfrastructuredata(data){
  return this.http.post<any>(this.Api + `addinfradata`, data).pipe(map(res => {
    this.statusChangeAlert(' Infrastructure Added Successfully');
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

updateinfrastructuredata(id){
return this.http.post<any>(this.Api + `updateinfradata`, id).pipe(map(res => {
  console.log(res.data);
  this.statusChangeAlert(' Updated Successfully')
  return res;
}, error => {
  this.errorAlert();
  return error;
 }));
}

getinfrastructuredata(){
return this.http.get<any>(this.Api + `getinfradata`).pipe(map(res => {
  return res;
}, error => {
  this.errorAlert();
  return error;
}));

}

deleteinfrastructuredata(id){
return this.http.get<any>(this.Api + `deleteinfradata/` + id).pipe(map(res => {
  console.log(res.data);
  this.statusChangeAlert('Deleted Successfully')
  return res;
}, error => {
  this.errorAlert();
  return error;
 })); 
}

//infrastructure code end
//department code start
addDepartment(data){
  return this.http.post<any>(this.Api + `adddepartment`, data).pipe(map(res => {
    this.statusChangeAlert(' Department Added Successfully');
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
getDepartment(){
  return this.http.get<any>(this.Api + `getdepartment`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}


deletedepartment(id){
  return this.http.get<any>(this.Api + `deletedepartment/` + id).pipe(map(res => {
    console.log(res.data);
    this.statusChangeAlert('Deleted Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  })); 

}
updateDepartment(id){
  return this.http.post<any>(this.Api + `updatedepartment`, id).pipe(map(res => {
    console.log(res.data);
    this.statusChangeAlert(' Updated Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

//department code end
}
