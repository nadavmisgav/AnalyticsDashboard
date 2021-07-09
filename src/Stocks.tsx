import Button from "@material-ui/core/Button";
import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import "./Stocks.scss";
import AddTransaction from "./AddTransaction";

const Stock = ({ currency, name, symbol, target, amount, value, price }) => {
  const earnings = (100.0 * (value - price)) / price;
  const earningsColor = earnings > 0 ? "green" : "red";
  return (
    <div className="stock">
      <span>{name}</span>
      <small>({symbol})</small>
      <div className="stock-info">
        <div className="stock-stats">
          <small className="description">Target</small>
          <small>
            {target}
            {currency}
          </small>
        </div>
        <div className="stock-stats">
          <small className="description">Amount</small>
          <small>{amount}</small>
        </div>
        <div className="holding">
          <span>
            {value.toFixed(2)}
            {currency}
          </span>
          <small style={{ color: earningsColor }}>
            ({earnings.toFixed(2)}%)
          </small>
        </div>
      </div>
    </div>
  );
};

const Stocks = ({ name, currency, stock_data, stocks, setStocks }) => {
  let [openStockModal, setOpenStockModal] = useState(false);

  const handleOpenStockModal = (event) => {
    setOpenStockModal(true);
  };

  const stockObjects = stock_data.map((stock) => {
    return <Stock key={stock.symbol} {...stock} />;
  });

  return (
    <>
      <div className="stocks-container">
        <div className="header">
          <h2>{name}</h2>
          <div className="action-buttons">
            <Button
              variant="contained"
              size="medium"
              startIcon={<AddIcon />}
              onClick={handleOpenStockModal}
            >
              transaction
            </Button>
          </div>
        </div>
        <div className="stocks">{stockObjects}</div>
        <div className="stocks">
          {stock_data.length === 0 && <h3>No stocks</h3>}
        </div>
      </div>
      <AddTransaction
        open={openStockModal}
        setOpen={setOpenStockModal}
        stocks={stocks}
        setStocks={setStocks}
      />
    </>
  );
};

export default Stocks;
