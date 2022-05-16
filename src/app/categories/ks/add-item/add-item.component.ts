import { Component, OnInit } from '@angular/core';
import { KsserviceService } from 'src/app/categories/ks/ksservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  addform: FormGroup;
  report: any = [];
  subcate: any[] = [];
  showsubcate: any[] = [];
  showicon:boolean = false;
  imagesData : any [] = [];
  Items:any [] = [];
  constructor(private fb: FormBuilder, private service:KsserviceService) {
   
    this.addform = this.fb.group({
      image: ['', [Validators.required]],
      cate_id: ['', [Validators.required]],
      sub_cate_id: ['', [Validators.required]],
      ItemName: ['', [Validators.required]],
      ItemDescription:['', [Validators.required]],
      AddMeasurements:['', [Validators.required]],
      AddKeywords:['', [Validators.required]]


     
    })
   }

  ngOnInit(): void {
    this.getform();
    this.getsubcate();
    this.getItemData();
  }

  addsub() {
    if (this.addform.invalid) {
      return
    };
    
    this.addform.value.cate_id = this.report[this.addform.value.cate_id];
    this.addform.value.sub_cate_id = this.showsubcate[this.addform.value.sub_cate_id];
    this.addform.value.image = this.imagesData;
    console.log(this.addform.value);
    this.service.addItemForm(this.addform.value).subscribe(
      
      res => {
        console.log("name122")
        console.log(res);

      },
      error => {

      });


  }

  getItemData() {
    console.log("hi");
    this.service.getItemData().subscribe(res => {
      this.Items = res.data;
      // console.log(this.report);
      console.log(res.data);

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

  getform1() {
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

  getSubcate(event){
    console.log(event);
    this.showsubcate = this.subcate.filter( res => {
      return res.cate_id == this.report[event].id;
    })
    

  }

    // Image Upload Function //
    onImageChange(e) {
  
  

  
  
      const reader = new FileReader();
  
  
  
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          var imgFile = reader.result as string;
          // // console.log(this.imgFile);
  
  
  
  
          var bfile_typeEmpl = e.target.files[0].name.split('.');
          var imgtype = bfile_typeEmpl[1];
  
  
      
  
  
  
            this.showicon = true;
            var imagedata = {
              reviewimg : imgFile,
              filetype  :  imgtype ,
            }
  
            this.imagesData = [imagedata];
          
        
          console.log(this.imagesData);
          // console.log(this.addEmployeeForm.value.filetypeEmpl, bfile_typeEmpl[1]);
  
          // this.addEmployeeForm.patchValue({
          //   filetypeEmpl: bfile_typeEmpl[1]
          // });
          // var datas = bfile_typeEmpl[1];
          // // console.log( datas);
    }
  
    }
  }
}
