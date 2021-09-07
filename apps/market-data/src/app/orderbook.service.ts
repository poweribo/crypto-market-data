import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductOrderBoook } from '@market-data/api-interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderbookService {
  
  MARKET_DATA_SERVER_API = 'https://vrhfq871n4.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.MARKET_DATA_SERVER_API + '/products');
  }

  getOrderBook(id : string): Observable<ProductOrderBoook> {
    return this.http.get<ProductOrderBoook>(this.MARKET_DATA_SERVER_API + `/orderbook/${id}`);
  }

}
