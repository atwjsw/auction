import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StockService} from "../stock.service";
import {Stock} from "../stock.service";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock;

  constructor(private routeInfo: ActivatedRoute,
                private stockService: StockService,
                private router: Router
  ) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params["id"];
    this.stock = this.stockService.getStock(stockId);
    //this.stock = new Stock(1, "第一只股票", 1.99, 3.5, "这是第一只股票，是我在学习慕课网Angular入门实战时创建的",["IT", "互联网"]);
  }

  cancel() {
    this.router.navigateByUrl("/stock");
  }

  save() {
    console.log(this.stock.rating);
    this.router.navigateByUrl("/stock");
  }
}
