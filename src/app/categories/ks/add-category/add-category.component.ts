import { Component, OnInit } from '@angular/core';
import { KsserviceService } from 'src/app/categories/ks/ksservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addform: FormGroup;
  category:any [] = [];
  constructor(private fb: FormBuilder, private service:KsserviceService ) {

    this.addform = this.fb.group({
      name: ['', [Validators.required]],
     
    })
   }

  ngOnInit(): void {
    this.getform();
  }

  addsub() {
    console.log(this.addform.value);
    if (this.addform.invalid) {
      return;
    }
    this.service.postform(this.addform.value).subscribe(
      
      res => {
        this.getform();
        console.log("name122")
        console.log(res);

      },
      error => {

      });


  }

  getform() {
    console.log("hi");
    this.service.getform1().subscribe(res => {
      this.category = res.data
     
      console.log(res.status);

    },
      error => {
      });
  }


  



}
