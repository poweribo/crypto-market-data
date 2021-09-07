import { OrderBookDataSource } from './order-book-datasource';

describe('OrderBookDataSource', () => {
  let dataSource: OrderBookDataSource;

  it('array to stay sorted ascending after inserts', () => {
    const sortedArray = [
      {price: 1, size: 1},
      {price: 3, size: 1},
      {price: 6, size: 1},
      {price: 8, size: 1},
      {price: 9, size: 1},
      {price: 11, size: 1},
    ];

    dataSource = new OrderBookDataSource('buy', 'asc');

    dataSource.insertSorted(sortedArray, {price: 4, size: 1});
    dataSource.insertSorted(sortedArray, {price: 12, size: 1});
    dataSource.insertSorted(sortedArray, {price: 0, size: 1});

    expect(sortedArray[3].price).toEqual(4);
    expect(sortedArray[sortedArray.length-1].price).toEqual(12);
    expect(sortedArray[0].price).toEqual(0);
  });

  it('array to stay sorted descending after inserts', () => {
    const sortedArray = [
      {price: 11, size: 1},
      {price: 9, size: 1},
      {price: 8, size: 1},
      {price: 6, size: 1},
      {price: 3, size: 1},
      {price: 1, size: 1},
    ];

    dataSource = new OrderBookDataSource('buy', 'desc');

    dataSource.insertSorted(sortedArray, {price: 4.2, size: 1});
    dataSource.insertSorted(sortedArray, {price: 4.3, size: 1});
    dataSource.insertSorted(sortedArray, {price: 12, size: 1});
    dataSource.insertSorted(sortedArray, {price: 0, size: 1});

    expect(sortedArray[5].price).toEqual(4.3);
    expect(sortedArray[6].price).toEqual(4.2);
    expect(sortedArray[0].price).toEqual(12);
    expect(sortedArray[sortedArray.length-1].price).toEqual(0);
  });

  it('remove prices with zero sizes ', () => {
    const sortedArray = [
      {price: 11, size: 1},
      {price: 9, size: 1},
      {price: 8, size: 1},
      {price: 6, size: 1},
      {price: 3, size: 1},
      {price: 1.1, size: 1},
    ];

    dataSource = new OrderBookDataSource('buy', 'desc');
    dataSource.setData(sortedArray);

    dataSource.updateOrderData(8, 0);
    dataSource.updateOrderData(1.1, 0);
    dataSource.updateOrderData(6, 3);
    dataSource.updateOrderData(2.04, 1);

    expect(dataSource.getData().length).toEqual(5);
  });
});


