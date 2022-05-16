import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-addcolony',
  templateUrl: './addcolony.component.html',
  styleUrls: ['./addcolony.component.scss']
})
export class AddcolonyComponent implements OnInit {

  addcolonyForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'District', 'Division','Habitation','Department','ColonyNumber','ColonyName','NoOfFamilies','edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  divisionData: any = [];
  districtArray: any = [];
  divisionArray:any=[];
  departmentArray:any=[];
  colonyData:any=[];
  district:any;
  habitationArray:any=[];
  changesreportData:any=[];
  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.addcolonyForm = this.formBuilder.group({
      district: [''],
      division: [''],
      habitation:[''],
      department: [''],
      colony_id: ['', [Validators.required]],
      colony_name: ['', [Validators.required]],
      no_pdf:['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.addcolonyForm.value;

  }
  // Filter function for Amngular Materials Table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
 }
 modalDismiss() {
  this.addcolonyForm.reset(this.initialValues);
  this.modalService.dismissAll();
}
  ngOnInit(): void {

    this.getdistrictdata();
    // this.getdivisiondata();
    this.getcolonydata();
    this.department();

  }

  getdistrictdata() {
    this.dataServ.getdistrictdata().subscribe(res => {
      this.districtArray = res.data;
      console.log(this.districtArray);
    }, error => {
      console.log(error);
    })
  }

  // getdivisiondata(){
  //   this.dataServ.getdivisiondata().subscribe(res => {
  //     this.divisionArray = res.data;
  //     console.log(this.divisionArray);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  department(){
    this.dataServ.department().subscribe(res => {
      this.departmentArray = res.data;
      console.log(this.departmentArray);
    }, error => {
      console.log(error);
    })
  }

  addcolony(addcolonyModel: any, type: any) {

    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(addcolonyModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.addcolonyForm.setValue({ district: type.district,division :type.division ,habitation:type.habitation,department:type.department, colony_id :type.colony_id, colony_name:type.colony_name,no_pdf:type.no_pdf})
      this.modalService.open(addcolonyModel, { size: 'xl', centered: true });
    }
  }
  get addcolonyFormCnt() { return this.addcolonyForm.controls; }



  charactersOnly(event): boolean {
    let patt = /^([a-zA-Z])$/;
    let result = patt.test(event.key);
    return result;
  }

  changedivisiondata1(district){
    console.log(district);
    this.dataServ.changedivisiondata1(district).subscribe(res => {
      this.changesreportData = res.data;         
      console.log(this.changesreportData);
             
       
    }, error => {
      console.log(error);
    })

  }
  changehabitation(division){
    console.log(division);
    this.dataServ.changehabitation(division).subscribe(res => {
      this.habitationArray = res.data;         
      console.log(this.habitationArray);
             
       
    }, error => {
      console.log(error);
    })
  }
 
  
  addcolonySubmit(){
    this.submitted = true;
    console.log('updated', this.addcolonyForm.value, this.addcolonyForm.invalid);
    if (this.addcolonyForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {

        console.log(this.updateData);
        console.log(this.colonyData);
      
          this.updateData.district = this.addcolonyForm.value.district,
          console.log( this.updateData.district);
          this.updateData.division = this.addcolonyForm.value.division,
          this.updateData.department = this.addcolonyForm.value.department,
          this.updateData.colony_id= this.addcolonyForm.value.colony_id,
          this.updateData.colony_name = this.addcolonyForm.value.colony_name,
          this.updateData.habitation = this.addcolonyForm.value.habitation,
          this.updateData.no_pdf = this.addcolonyForm.value.no_pdf,
          console.log('submitted', this.updateData, this.addcolonyForm.valid);

          this.dataServ.updatecolonydata(this.updateData).subscribe(
            res => {
              console.log(res);
              this.getcolonydata();
              this.submitted = false;
              this.addcolonyForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addcolonyForm.reset();
              this.submitted = false;
            });
        }
    
      else {
        this.addcolonyForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.addcolonyForm.value, this.addcolonyForm.invalid);

        var checkData = this.colonyData.filter(object => {
          return object.colony_name == this.addcolonyForm.value.colony_name
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Colony Name Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addcolonydata(this.addcolonyForm.value).subscribe(
            res => {
              console.log(res);
              this.getcolonydata();
              this.submitted = false;
              this.addcolonyForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addcolonyForm.reset();
              this.submitted = false;
            });
        }
      }
    }

  }



  getcolonydata() {
    this.dataServ.getcolonydata().subscribe(res => {
      this.colonyData = res.data;
      console.log(this.colonyData);
      this.dataSource = new MatTableDataSource(this.colonyData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.colonyData);
    }, error => {
      console.log(error);
    })
  }

  deleteAlert(index) {
    Swal.fire({
      title: 'Are you sure to Delete ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deletecolonydata(index);
      }
    })
  }

  deletecolonydata(index) {
    this.dataServ.deletecolonydata(index).subscribe(
      res => {
        this.getcolonydata();
      },
      error => {
      });

  }
  // Accept Input As a Number Only
 numericOnly(event): boolean {
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}
pdfMake(){
  const doc = new jsPDF('p', 'pt', 'letter');
  doc.canvas.height = 72 * 11;
  doc.canvas.width  = 72 * 11;
  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const content = this.content.nativeElement;
  console.log(content);


  doc.fromHTML(content.innerHTML, 15, 15, {
    width: 300,
    'elementHandlers': specialElementHandlers
  });

  doc.save('test.pdf');
//   let doc: jsPDF  = new jsPDF("p", "mm", "a4");

// let data = [];
// const displayedColumns = ['NAme','approved','utilised', 'available','asd','sadadasada','asdas']

// this.dataSource.filteredData.forEach(obj => {
//   let arr = [];
//   this.displayedColumns.forEach(col => {
//     arr.push(obj[col]);
//   });
//   data.push(arr);
// });
//   doc.autoTable({
//     head: [['NAme','approved','utilised', 'available','asd','sadadasada','asdas']],
//     body: data
//   });
//   doc.save('table.pdf')
}

}
