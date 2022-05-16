import { Component, OnInit } from '@angular/core';
import { KsserviceService } from 'src/app/categories/ks/ksservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  addform: FormGroup;
  report: any = [];
  subcate:any [] = [];
  constructor(private fb: FormBuilder, private service:KsserviceService) { 
    this.addform = this.fb.group({
      cate_id: ['', [Validators.required]],
      Subcategory: ['',[Validators.required]]
     
    })

  }

  ngOnInit(): void {
    this.getform();
    this.getsubcate();
  }

  addsub() {
    if (this.addform.invalid) {
      return;
    }
    console.log(this.addform.value);
    this.addform.value.cate = this.report[this.addform.value.cate_id];
    this.service.postsubcate(this.addform.value).subscribe(
      
      res => {
        this.getsubcate();
        console.log("name122")
        console.log(res);

      },
      error => {

      });


  }




  getform() {
    console.log("hi");
    this.service.getform1().subscribe(res => {
      this.report = res.data;
      console.log(this.report);
      console.log(res.status);

    },
      error => {
      });
  }
  getsubcate() {
    console.log("hi");
    this.service.getsubcate().subscribe(res => {
      this.subcate = res.data;
      console.log(this.report);
      console.log(res.status);

    },
      error => {
      });
  }

}
