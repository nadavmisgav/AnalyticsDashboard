import Button from "@material-ui/core/Button";
import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import "./Stocks.scss";
import AddTransaction from "./AddTransaction";

const Stock = ({ currency, name, symbol, target, amount, value, earnings }) => {
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
            {value}
            {currency}
          </span>
          <small>({earnings}%)</small>
        </div>
      </div>
    </div>
  );
};

const Stocks = ({ name, stock_data }) => {
  let [openStockModal, setOpenStockModal] = useState(false);

  const handleOpenStockModal = (event) => {
    setOpenStockModal(true);
  };

  const stockObjects = stock_data.map((stock) => {
    return <Stock key={stock.name} {...stock} />;
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
      </div>
      <AddTransaction open={openStockModal} setOpen={setOpenStockModal} />
    </>
  );
};

export default Stocks;
