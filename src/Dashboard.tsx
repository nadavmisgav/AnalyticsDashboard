import GeneralBoard from "./GeneralBoard";
import GraphBoard from "./GraphBoard";
import "./Dashboard.scss";
import Stocks from "./Stocks";
import React, { useState } from "react";

import { StockQuote, Stock } from "./StockInterface";
import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";
const STOCK_API_URL = `${API_BASE_URL}/stocks`;

async function getQuoteStocks(stocks: Stock[], setStocks: React.Dispatch<any>) {
  const quotes = await Promise.all(
    stocks.map(async (stock) => {
      const res = await axios.get(`${STOCK_API_URL}/quote/${stock.symbol}`);
      const stock_data = res.data;
      return {
        symbol: stock_data.quote.symbol,
        name: stock_data.quote.shortName,
        long_name: stock_data.quote.longName,
        value: stock_data.quote.regularMarketPrice,
        target: stock_data.target.priceTargets.mean.toFixed(2),
        amount: stock.amount,
        price: stock.price,
        currency: stock_data.quote.financialCurrency === "USD" ? "$" : "₪",
      } as StockQuote;
    })
  );
  setStocks(quotes);
}

const Dashboard = () => {
  const [owned_ws_stocks, setOwnedWSStocks] = useState([] as Stock[]);
  const [owned_ta_stocks, setOwnedTAStocks] = useState([] as Stock[]);
  const [ws_stocks, setWSStocks] = useState([] as StockQuote[]);
  const [ta_stocks, setTAStocks] = useState([] as StockQuote[]);

  useEffect(() => {
    getQuoteStocks(owned_ws_stocks, setWSStocks);
  }, [owned_ws_stocks]);

  useEffect(() => {
    getQuoteStocks(owned_ta_stocks, setTAStocks);
  }, [owned_ta_stocks]);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="boards">
        <div className="general-panels">
          <GeneralBoard />
          <GraphBoard />
        </div>
        <div className="stock-panels">
          <Stocks
            name="Wall Street"
            currency="$"
            stock_data={ws_stocks}
            stocks={owned_ws_stocks}
            setStocks={setOwnedWSStocks}
          />
          <Stocks
            name="Tel Aviv"
            currency="₪"
            stocks={owned_ta_stocks}
            stock_data={ta_stocks}
            setStocks={setOwnedTAStocks}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
