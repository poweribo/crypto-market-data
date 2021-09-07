import { Injectable } from '@angular/core';
import { L2UPDATE, L2Update, OrderChange, TICKER, Ticker } from '@market-data/api-interfaces';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class OrderfeedService {
  WS_ENDPOINT = 'wss://ws-feed.pro.coinbase.com';
  WS_ENDPOINT_SANDBOX = 'wss://ws-feed-public.sandbox.pro.coinbase.com';

  private wsEndPoint = this.WS_ENDPOINT;

  private orderFeedSubject: WebSocketSubject<any> = webSocket(this.wsEndPoint);

  private l2updateSubject = new Subject<OrderChange>();
  private tickerSubject = new Subject<number>();

  currentSubscribedId = '';

  public initiateOrderFeed(id: string): void {    
    this.getMarketDataFeed(id);
    this.getData()
       .pipe(tap(data => this.processDataFromFeed(data)))
       .subscribe();
  }

  private getMarketDataFeed(id: string): void {    
    this.unsubscribeToFeed(this.currentSubscribedId);    
    this.currentSubscribedId = id;

    const message = {
      type: 'subscribe',
      product_ids: [
          `${id}`
      ],
      channels: [
        'level2',
        'heartbeat',
        {
            name: 'ticker',
            product_ids: [
              `${id}`
            ]
        }
      ]
    };

    this.sendMessage(message);
  }

  private unsubscribeToFeed(id: string): void {
    if (this.currentSubscribedId == '') return;

    const message = {
      type: 'unsubscribe',
      product_ids: [
          `${id}`
      ],
      channels: [
        'level2',
        'heartbeat',
        {
            name: 'ticker',
            product_ids: [
              `${id}`
            ]
        }
      ]
    };

    this.sendMessage(message);
  }

  // raw data - can be heartbeat, l2update, ticker and etc
  protected getData(): Observable<any> {
    return this.orderFeedSubject.asObservable();
  }

  public getL2Updates(): Observable<OrderChange> {
    return this.l2updateSubject.asObservable();
  }

  public getTicketUpdates(): Observable<number> {
    return this.tickerSubject.asObservable();
  }

  private sendMessage(msg: any): void {
    this.orderFeedSubject.next(msg);
  }

  public disconnect() {
    if (!this.orderFeedSubject.isStopped) {
      this.orderFeedSubject.complete();
    }
  }

  private processDataFromFeed(data: any): void {
    if (data.product_id !== this.currentSubscribedId) return;

    if (data.type == L2UPDATE) {
        this.processL2Update(data);
    } else if (data.type == TICKER) {
        this.processTickerUpdate(data);
    } else {
        console.log('Skipping ' + data.type);
    }
  }

  private processL2Update(l2Update: L2Update): void {
    l2Update.changes.map((item: any[]) => {
      const orderChange:OrderChange = { side: item[0], price: +item[1], size: +item[2] };
      this.l2updateSubject.next(orderChange);
    });
  }

  private processTickerUpdate(tickerUpdate: Ticker): void {
    console.log('Ticker : ' + tickerUpdate.product_id + ' price ' + tickerUpdate.price);
    this.tickerSubject.next(+tickerUpdate.price);
  }
}
