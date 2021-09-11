import { Order } from "@market-data/api-interfaces";

export class OrderBookDataSource {

  private data: Order[] = [];

  isAscending = true;

  constructor(private side: string, private sortDirection: string) {
    this.isAscending = this.sortDirection === 'asc'
  }

  public setData(data: Order[]): void {
    this.data = data;
  }

  public getData(rowLimit?: number): Order[] {
    return this.data.sort((a, b) => this.comparePrice(a, b))
      .filter(item => item != undefined)
      .slice(0, rowLimit)
      .map(item => {
        return {price: item.price, size: item.size};
      }
    );
  }

  public updateOrderData(price: number, size: number): void {
    const index: number = this.getIndex(price);
    if (index === -1) {
      if (size == 0) return;  // dont add update with zero size
      this.addOrder(price, size);
    } else if (size == 0) {   // remove order with zero size
      this.removeOrder(index, price, size);
    } else {
      this.updateOrder(index, price, size);
    }
  }

  public getIndex(price: number): number {
    return this.data.findIndex((obj => obj !== undefined && obj.price === price));
  }

  public addOrder(price: number, size: number): void {
    console.log(this.side + ' ++ price ' + price + ' size ' + size);
    this.data.push({price, size});
    //this.insertSorted(this.data, {price, size});
  }

  public updateOrder(index: number, price: number, size: number): void {
    console.log(this.side + ' !! price ' + price + ' size ' + this.data[index].size + ' -> ' + size);
    this.data[index].size = size;
  }

  public removeOrder(index: number, price: number, size: number): void {
    console.log(this.side + ' -- price ' + price + ' size ' + size + ' at ' + index);
    //this.data.splice(index, 1);
    delete this.data[index];
  }

  // do insert sort to avoid re-sorting for every new price addition
  public insertSorted(arr: Order[], item: Order)  {
    // get the index we need to insert the item at
    let min = 0;
    let max = arr.length;

    let index = Math.floor((min + max) / 2);
    while (max > min) {
        if (this.comparePrice(item, arr[index]) < 0) {
            max = index;
        } else {
            min = index + 1;
        }
        index = Math.floor((min + max) / 2);
    }
    // insert the item
    arr.splice(index, 0, item);
  };

  protected comparePrice(a: Order, b: Order): number {
    return this.compare(a.price, b.price, this.isAscending);
  }

  protected compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
