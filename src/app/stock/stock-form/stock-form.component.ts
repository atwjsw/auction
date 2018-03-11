import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StockService} from "../stock.service";
import {Stock} from "../stock.service";
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0, "", 0, 0, "", []);

  categories = ["IT", "互联网","金融"];

  constructor(private routeInfo: ActivatedRoute,
                private stockService: StockService,
                private router: Router
  ) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params["id"];
    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        // 获取后台数据后需要更新表单
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories: [
            this.stock.categories.indexOf(this.categories[0]) != -1,
            this.stock.categories.indexOf(this.categories[1]) != -1
            this.stock.categories.indexOf(this.categories[2]) != -1
          ]
        })
      }
    )
    //this.stock = this.stockService.getStock(stockId);
    //this.stock = new Stock(1, "第一只股票", 1.99, 3.5, "这是第一只股票，是我在学习慕课网Angular入门实战时创建的",["IT", "互联网"]);

    let fb = new FormBuilder();
    // 首次渲染页面要赋初始值
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required, Validators.minLength(3)]],
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categoriesSelectValidator)
      }
    )
  }

  categoriesSelectValidator(control:FormArray) {
    var valid = false;
    control.controls.forEach(control => {
      if (control.value) {
        valid = true;
      }
    })
    if (valid) {
      return null;
    } else {
      return {categoriesLength: true};
    }
  }

  cancel() {
    this.router.navigateByUrl("/stock");
  }

  save() {
    var chineseCategories = [];
    var index = 0;
    for (var i = 0; i < 3; i++) {
      if(this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories=chineseCategories;
    this.formModel.value.rating=this.stock.rating;
    console.log(this.formModel.value);
    //console.log(this.stock.rating);
    //this.router.navigateByUrl("/stock");
  }
}
