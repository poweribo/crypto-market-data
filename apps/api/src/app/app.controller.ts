import { Controller, Get, Param } from '@nestjs/common';

import { Product, ProductOrderBoook } from '@market-data/api-interfaces';

import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  getProducts(): Observable<Product[]> {
    return this.appService.getProducts();
  }

  @Get('orderbook/:id')
  getProductOrderBook(@Param('id') id): Observable<ProductOrderBoook> {
    return this.appService.getProductOrderBook(id);
  }
}
