import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderfeedService } from '../orderfeed.service';

@Component({
  selector: 'market-data-product-ticker',
  templateUrl: './product-ticker.component.html',
  styleUrls: ['./product-ticker.component.css']
})
export class ProductTickerComponent implements  OnDestroy {
  productImgId = '';
  productLabel = '';
  currentPrice = 0;
  lastPrice = 0;

  subscription: Subscription;
  
  constructor(private feedService: OrderfeedService) {

    this.subscription = this.feedService.getTicketUpdates().subscribe(tickerPrice => {      
        this.updateTickerPrice(tickerPrice);
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initTicker(productImgId: string, productLabel: string): void {
    this.productImgId = productImgId;
    this.productLabel = productLabel;
  }

  updateTickerPrice(newPrice: number): void {
    this.lastPrice = this.currentPrice;
    this.currentPrice = newPrice;
  }
}
