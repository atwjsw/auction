import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl} from '@angular/forms';
import {Stock} from "../stock.service";
import {StockService} from "../stock.service";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {

  private stocks: Observable<Stock[]>;

  private nameFilter: FormControl = new FormControl();

  constructor(public router: Router,
                private stockService: StockService) {
  }

  private keyword: string;

  ngOnInit() {
    this.stocks = this.stockService.getStocks();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(
           value => {
             this.keyword = value;
             console.log(value);
          });
  }

  create() {
    console.log('create');
    this.router.navigateByUrl('/stock/0');
  }

  update(stock:Stock) {
    console.log('stock/' + stock.id);
    this.router.navigateByUrl('stock/' + stock.id);
  }

}


