import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adddivision',
  templateUrl: './adddivision.component.html',
  styleUrls: ['./adddivision.component.scss']
})
export class AdddivisionComponent implements OnInit {
  adddivisionForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'District', 'Division', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  divisionData: any = [];
  districtArray: any = [];
  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.adddivisionForm = this.formBuilder.group({
      district: [''],
      division: ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.adddivisionForm.value;

  }

  ngOnInit(): void {
    this.getdistrictdata();
    this.getDivision();
  }

  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adddivision(adddivisionModel: any, type: any) {

    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(adddivisionModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.adddivisionForm.setValue({ district: type.district,division :type.division })
      this.modalService.open(adddivisionModel, { size: 'xl', centered: true });
    }
  }
  get adddivisionFormCnt() { return this.adddivisionForm.controls; }

  modalDismiss() {
    this.adddivisionForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }
  getdistrictdata() {
    this.dataServ.getdistrictdata().subscribe(res => {
      this.districtArray = res.data;
      console.log(this.districtArray);

    }, error => {
      console.log(error);
    })
  }

  adddivisonSubmit() {
    this.submitted = true;
    console.log('updated', this.adddivisionForm.value, this.adddivisionForm.invalid);
    if (this.adddivisionForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);
        console.log(this.divisionData);
        var checkData = this.divisionData.filter(object => {
          return object.division == this.adddivisionForm.value.division
        })
        console.log(checkData);

        // if (checkData.length) {
        //   this.dataServ.errorMessageAlert('Division Already exists');
        //   this.modalService.dismissAll();
        //   return;

        // }
        // else {
          // this.updateData.district = this.adddivisionForm.value.district,
          this.updateData.division = this.adddivisionForm.value.division

          console.log('submitted', this.updateData, this.adddivisionForm.valid);

          this.dataServ.updateDivision(this.updateData).subscribe(
            res => {
              console.log(res);
              this.getDivision();
              this.submitted = false;
              this.adddivisionForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddivisionForm.reset();
              this.submitted = false;
            });
        }
      // }
      else {
        this.adddivisionForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.adddivisionForm.value, this.adddivisionForm.invalid);

        var checkData = this.divisionData.filter(object => {
          return object.division == this.adddivisionForm.value.division
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Division Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addDivision(this.adddivisionForm.value).subscribe(
            res => {
              console.log(res);
              this.getDivision();
              this.submitted = false;
              this.adddivisionForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddivisionForm.reset();
              this.submitted = false;
            });
        }
      }
    }

  }

  getDivision() {
    this.dataServ.getDivision().subscribe(res => {
      this.divisionData = res.data;
      console.log(this.divisionData);
      this.dataSource = new MatTableDataSource(this.divisionData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.divisionData);
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

        this.deletedivision(index);
      }
    })
  }

  deletedivision(index) {
    this.dataServ.deletedivision(index).subscribe(
      res => {
        this.getDivision();
      },
      error => {
      });

  }

  charactersOnly(event): boolean {
    let patt = /^([a-zA-Z])$/;
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
