import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from './../event.service';
import  Swal from 'sweetalert2';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {

  constructor(private eventServ: EventService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    this.addeventForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      startingtime: ['', [Validators.required]],
      endingtime: ['', [Validators.required]],


    });
    this.submitted = false;
    this.initialValues = this.addeventForm.value;

  }
  edit: boolean = false;
  submitted: boolean = false;
  updateData;
  addeventForm: FormGroup;
  initialValues;
  formsubmit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['ID', 'Location', 'startingtime', 'endingtime', 'edit', 'delete'];
  EventData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  ngOnInit(): void {
    this.getaddedeventdata();
  }

  addevent(addeventModel: any, type: any) {
    // this.getCategoryData();
    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(addeventModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.addeventForm.setValue({ location: type.location, startingtime: type.startingtime, endingtime: type.endingtime })
      this.modalService.open(addeventModel, { size: 'xl', centered: true });
    }


  }
  modalDismiss() {
    this.addeventForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }

  get addeventFormCnt() { return this.addeventForm.controls; }


  addeventSubmit() {
    this.submitted = true;
    console.log('Event submitted', this.addeventForm.value, this.addeventForm.invalid);
    if (this.addeventForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);


        this.updateData.location = this.addeventForm.value.location,
          this.updateData.startingtime = this.addeventForm.value.startingtime,
          this.updateData.endingtime = this.addeventForm.value.endingtime


        console.log('submitted', this.updateData, this.addeventForm.valid);

        this.eventServ.updateEventData(this.updateData).subscribe(
          res => {
            console.log(res);
            // this.getUsersData();
            this.getaddedeventdata();
            this.submitted = false;
            this.addeventForm.reset();
            this.modalService.dismissAll();
          },
          error => {
            this.addeventForm.reset();
            this.submitted = false;
          });
        // }
      }
      else {
        this.addeventForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.addeventForm.value, this.addeventForm.invalid);



        this.eventServ.addeventSubmit(this.addeventForm.value).subscribe(
          res => {
            console.log(res);
            this.getaddedeventdata();
            // this.getUsersData();
            this.submitted = false;
            this.addeventForm.reset();
            this.modalService.dismissAll();
          },
          error => {
            this.addeventForm.reset();
            this.submitted = false;
          });
      }
    }

    }



    // Filter function for Amngular Materials Table
    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getaddedeventdata(){
      this.eventServ.getaddedeventdata().subscribe(res => {
        this.EventData = res.data ;
        this.dataSource = new MatTableDataSource(this.EventData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.EventData);
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
  
          this.deleteevent(index);
        }
      })
    }

    deleteevent(index) {
      this.eventServ.deleteevent(index).subscribe(
        res => {
          this.getaddedeventdata();
        },
        error => {
        });
  
    }
  }