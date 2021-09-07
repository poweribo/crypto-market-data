import { Component, ViewChild } from '@angular/core';
import { Order, Product, PriceSizeNumOrders } from '@market-data/api-interfaces';
import { OrderbookService } from './../orderbook.service';
import { OrderfeedService } from './../orderfeed.service';
import { tap } from 'rxjs/operators';
import { ProductTickerComponent } from './../product-ticker/product-ticker.component';
import { OrderBookComponent } from './../order-book/order-book.component';

@Component({
  selector: 'market-data-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent {

  @ViewChild('bids')
  private bidsOrders!: OrderBookComponent;

  @ViewChild('asks')
  private asksOrders!: OrderBookComponent;

  @ViewChild(ProductTickerComponent)
  private productTicker!: ProductTickerComponent;

  selectedProductId = '';

  constructor(private service: OrderbookService, private feedService: OrderfeedService) {
  }

  public onProductSelection(product: Product): void {
    console.log("received id = " + product.id);
    this.selectedProductId = product.id;
    this.updateProductTickerLabel(product);

    this.service.getOrderBook(product.id)
      .pipe(
          tap(orderBook => this.bidsOrders.setData(
            this.createOrderModel(orderBook.bids)
          )),
          tap(orderBook => this.asksOrders.setData(
            this.createOrderModel(orderBook.asks)
          )),
          tap(_ => this.initiateOrderFeed(product.id)),
      )
    .subscribe();
  }

  private updateProductTickerLabel(product: Product): void {
    this.productTicker.initTicker(product.base_currency, product.display_name);
  }

  private createOrderModel(orders: PriceSizeNumOrders): Order[] {
    return orders.map(item => {
      return { price: +item[0], size: +item[1] }
    });
  }

  private initiateOrderFeed(id: string): void {
    console.log('Initiated feed subscription to ' + id);
    this.feedService.initiateOrderFeed(id);
  }
}
