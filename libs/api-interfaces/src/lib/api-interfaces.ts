
export interface RequestMessage {
  method: string;
  path: string;
  body?: string;
}

export interface Product {
  id: string;
  base_currency: string;
  quote_currency: string;
  display_name: string;
}

export type PriceSizeNumOrders = [string, string, number][];

export interface ProductOrderBoook {
  bids: PriceSizeNumOrders;
  asks: PriceSizeNumOrders;
  sequence: number;
}

export interface Order {
  price: number;
  size: number;
}

export interface OrderChange {
  side: SIDE;
  price: number;
  size: number;
}

export interface Ticker {
  product_id: string;
  side: SIDE;
  price: string;
  best_bid: string;
  best_ask: string;
  last_size: string;
}

export type SidePriceSize = [string, string, string][];

export interface L2Update {
  type: string;
  product_id: string;
  changes: SidePriceSize;
  time: string;
}

export interface OrderUpdate {
  price: string;
  size: string;
}

export const L2UPDATE = 'l2update';
export const TICKER = 'ticker';
export const BUY = 'buy';
export const SELL = 'sell';

export type SIDE = typeof SELL | typeof BUY;



