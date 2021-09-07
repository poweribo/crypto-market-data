/* eslint-disable @typescript-eslint/no-empty-function */
import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Order, SIDE } from '@market-data/api-interfaces';
import { Subscription } from 'rxjs';
import { OrderfeedService } from '../orderfeed.service';
import { OrderBookDataSource } from './order-book-datasource';

@Component({
  selector: 'market-data-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<Order>;

  @Input()
  side:SIDE  = 'buy';   // buy | sell

  @Input()
  sortDirection = 'asc';  // asc | desc

  @Input()
  rowLimit = 10;

  @Input()
  displayedColumns = ['price', 'size'];

  dataSource!: OrderBookDataSource;

  updated = false;

  subscription: Subscription;
  
  constructor(private feedService: OrderfeedService) {

    this.subscription = this.feedService.getL2Updates().subscribe(orderChange => {
      if (orderChange.side === this.side) {
        this.updateOrderData(orderChange.price, orderChange.size);
      }
    });

  }

  ngAfterViewInit(): void {
    this.dataSource = new OrderBookDataSource(this.side, this.sortDirection);

    setInterval(() => {
      if (this.updated) {
        this.renderTableData();
      }
    }, 1 * 1000);  // render on 1 sec interval

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private renderTableData(): void {
    this.table.dataSource = this.dataSource.getData(this.rowLimit);
    this.table.renderRows();
    this.updated = false;
  }

  public setData(data: Order[]): void {
    this.dataSource.setData(data);
    this.updated = true;
  }

  public updateOrderData(price: number, size: number): void {
    this.dataSource.updateOrderData(price, size);
    this.updated = true;
  }

}


