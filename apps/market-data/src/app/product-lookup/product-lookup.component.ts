import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '@market-data/api-interfaces';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OrderbookService } from '../orderbook.service';

@Component({
  selector: 'market-data-product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.css']
})
export class ProductLookupComponent {

  @Output() productSelected = new EventEmitter<Product>();

  productCtrl = new FormControl();
  filteredProducts: Observable<Product[]>;

  products: Product[] = [];

  constructor(private service: OrderbookService) {

    this.filteredProducts = this.productCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.display_name),
        map(product => product ? this._filterProducts(product) : this.products.slice())
      );

      this.loadData();
  }

  private _filterProducts(value: string): Product[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.products.filter(products => products.display_name.toLowerCase().includes(filterValue));
  }

  displayFn(product: Product): string {
    return product && product.display_name ? product.display_name : '';
  }

  loadData(): void {
    this.service.getProducts().subscribe(products => {
      console.log(products);
      this.products = products.sort((a, b) => this.compare(a.display_name, b.display_name, true));
    });
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onProductSelect(product: Product) {
    console.log('selected option: ' + product.id);
    this.productSelected.emit(product);
  }

}
