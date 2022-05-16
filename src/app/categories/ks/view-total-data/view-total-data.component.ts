import { Component, OnInit } from '@angular/core';
import { KsserviceService } from 'src/app/categories/ks/ksservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-total-data',
  templateUrl: './view-total-data.component.html',
  styleUrls: ['./view-total-data.component.scss']
})
export class ViewTotalDataComponent implements OnInit {
  addform: FormGroup;
  swathi: any = [];
  Items:any [] = [];
  constructor(private fb: FormBuilder, private service:KsserviceService) { }

  ngOnInit(): void {
    this.getform();
    this.getItemData();

  }

  addsub() {
    console.log(this.addform.value);
    this.service.postform(this.addform.value).subscribe(
      
      res => {
        console.log("name122")
        console.log(res);

      },
      error => {

      });


  }

  getform() {
    console.log("hi");
    this.service.getform1().subscribe(res => {
      this.swathi = res.data;
      console.log(this.swathi);
      console.log(res.status);

    },
      error => {
      });
  }
  getItemData() {
    console.log("hi");
    this.service.getItemData().subscribe(res => {
      this.Items = res.data;
      console.log(res.data);

    },
      error => {
      });
  }
}
