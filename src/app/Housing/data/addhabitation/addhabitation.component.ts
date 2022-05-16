import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addhabitation',
  templateUrl: './addhabitation.component.html',
  styleUrls: ['./addhabitation.component.scss']
})
export class AddhabitationComponent implements OnInit {
  addhabitationForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'District', 'Division','HabitationName','edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  habitationData;
  divisionData: any = [];
  districtArray: any = [];
  divisionArray:any=[];
  nameArray:any=[];
  habitationArray:any=[];
  colonyData:any=[];
  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.addhabitationForm = this.formBuilder.group({
      district: [''],
      division: [''],
      colony_name:[''],
      // habitationno: ['', [Validators.required]],
      habitationname: ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.addhabitationForm.value;

  }
  // Filter function for Amngular Materials Table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
 }
 modalDismiss() {
  this.addhabitationForm.reset(this.initialValues);
  this.modalService.dismissAll()
}
  ngOnInit(): void {

    this.getdistrictdata();
    this.getdivisiondata();
    this.getcolonynames();
    this.gethabitationdata();

  }

  getdistrictdata() {
    this.dataServ.getdistrictdata().subscribe(res => {
      this.districtArray = res.data;
      console.log(this.districtArray);
    }, error => {
      console.log(error);
    })
  }
  
  getdivisiondata(){
    this.dataServ.getdivisiondata().subscribe(res => {
      this.divisionArray = res.data;
      console.log(this.divisionArray);
    }, error => {
      console.log(error);
    })
  }

  getcolonynames(){
    this.dataServ.getcolonynames().subscribe(res => {
      this.nameArray = res.data;
      console.log(this.nameArray);
    }, error => {
      console.log(error);
    })
  }

  gethabitationdata(){
    this.dataServ.gethabitationdata().subscribe(res => {
      this.habitationArray = res.data;
      console.log(this.habitationArray);
      this.dataSource = new MatTableDataSource(this.habitationArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.habitationArray);
    }, error => {
      console.log(error);
    })
   
  }
 


  addhabitation(addhabitationModel: any, type: any) {

    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(addhabitationModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.addhabitationForm.setValue({ district: type.district,division :type.division , habitationname:type.habitationname })
      this.modalService.open(addhabitationModel, { size: 'xl', centered: true });
    }
  }

  get addhabitationFormCnt() { return this.addhabitationForm.controls; }



  charactersOnly(event): boolean {
    let patt = /^([a-zA-Z])$/;
    let result = patt.test(event.key);
    return result;
  }


 
  
  addhabitationSubmit() {
    this.submitted = true;
    console.log('updated', this.addhabitationForm.value, this.addhabitationForm.invalid);
    if (this.addhabitationForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);
        console.log(this.habitationData);
      
          this.updateData.district = this.addhabitationForm.value.district,
          this.updateData.division = this.addhabitationForm.value.division,

          // this.updateData.colony_name = this.addhabitationForm.value.colony_name,
          // this.updateData.colonyno = this.addhabitationForm.value.colonyno ,
          this.updateData.habitationname = this.addhabitationForm.value.habitationname

          console.log('submitted', this.updateData, this.addhabitationForm.valid);

          this.dataServ.updatehabitationdata(this.updateData).subscribe(
            res => {
              console.log(res);
              this.gethabitationdata();
              this.submitted = false;
              this.addhabitationForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addhabitationForm.reset();
              this.submitted = false;
            });
        }
    
      else {
        this.addhabitationForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.addhabitationForm.value, this.addhabitationForm.invalid);

        var checkData = this.colonyData.filter(object => {
          return object.habitationname == this.addhabitationForm.value.habitationname
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Habitation Name Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addhabitationdata(this.addhabitationForm.value).subscribe(
            res => {
              console.log(res);
              this.gethabitationdata();
              this.submitted = false;
              this.addhabitationForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addhabitationForm.reset();
              this.submitted = false;
            });
        }
      }
    }

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

        this.deletehabitationdata(index);
      }
    })
  }

  deletehabitationdata(index) {
    this.dataServ.deletehabitationdata(index).subscribe(
      res => {
        this.gethabitationdata();
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
