import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { FlexLayoutModule } from '@angular/flex-layout';

import { OrderbookService } from './orderbook.service';
import { OrderfeedService } from './orderfeed.service';
import { ProductLookupComponent } from './product-lookup/product-lookup.component';
import { ProductTickerComponent } from './product-ticker/product-ticker.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';

@NgModule({
  declarations: [AppComponent, ProductLookupComponent, ProductTickerComponent, OrderBookComponent, OpenOrdersComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, FlexLayoutModule, 
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [OrderbookService, OrderfeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
