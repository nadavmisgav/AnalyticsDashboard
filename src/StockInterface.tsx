export interface Stock {
  symbol: string;
  name: string;
  long_name: string;
  amount?: number;
  price?: number;
}

export interface StockQuote extends Stock {
  currency: "$" | "₪";
  target: number;
  value: number;
}

interface StockTransaction {
  type: "buy" | "sell";
  stock: string;
  amount: number;
  stockPrice: number;
  totalPrice: number;
  date: Date;
}
