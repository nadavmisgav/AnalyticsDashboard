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
        start_value: stock_data.quote.regularMarketPreviousClose,
        amount: stock.amount,
        price: stock.price,
        currency: stock_data.quote.financialCurrency === "USD" ? "$" : "₪",
      } as StockQuote;
    })
  );
  setStocks(quotes);
}

interface PortfolioStats {
  daily_earnings: number;
  holdings: number;
}

const calculate_portfolio = (stocks: StockQuote[]): PortfolioStats => {
  let daily_earnings = 0;
  let holdings = 0;
  stocks.forEach((stock) => {
    daily_earnings += (stock.value - stock.start_value) * stock.amount;
    holdings += stock.value * stock.amount;
  });

  return { daily_earnings, holdings };
};

const Dashboard = () => {
  // TODO: add to firebase
  const [owned_ws_stocks, setOwnedWSStocks] = useState([] as Stock[]);
  const [owned_ta_stocks, setOwnedTAStocks] = useState([] as Stock[]);
  const [ws_stocks, setWSStocks] = useState([] as StockQuote[]);
  const [ta_stocks, setTAStocks] = useState([] as StockQuote[]);

  const [ws_stats, setWSStats] = useState({
    daily_earnings: 0,
    holdings: 0,
  } as PortfolioStats);

  const [ta_stats, setTAStats] = useState({
    daily_earnings: 0,
    holdings: 0,
  } as PortfolioStats);

  // Refresh stock data every minute
  useEffect(() => {
    const interval = setInterval(() => {
      getQuoteStocks(owned_ws_stocks, setWSStocks);
      getQuoteStocks(owned_ta_stocks, setTAStocks);
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  });

  // Get stock data on change
  useEffect(() => {
    getQuoteStocks(owned_ws_stocks, setWSStocks);
  }, [owned_ws_stocks]);

  useEffect(() => {
    getQuoteStocks(owned_ta_stocks, setTAStocks);
  }, [owned_ta_stocks]);

  useEffect(() => {
    setWSStats(calculate_portfolio(ws_stocks));
  }, [ws_stocks]);

  useEffect(() => {
    setTAStats(calculate_portfolio(ta_stocks));
  }, [ta_stocks]);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="boards">
        <div className="general-panels">
          <GeneralBoard
            ws_earnings={ws_stats.daily_earnings}
            ta_earnings={ta_stats.daily_earnings}
            ws_holdings={ws_stats.holdings}
            ta_holdings={ta_stats.holdings}
          />
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
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
