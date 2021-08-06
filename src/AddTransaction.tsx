import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { Stock } from "./StockInterface";

import axios from "axios";

import "./AddTransaction.scss";

const API_BASE_URL = "http://localhost:8000";
const STOCK_API_URL = `${API_BASE_URL}/stocks`;

interface Transaction {
  type: string;
  stock: string;
  amount: string;
  stockPrice: string;
  totalPrice: string;
  date: string;
}

function AddTransaction({ open, setOpen, stocks, setStocks, currency }) {
  let [transaction, setTransaction] = useState({} as Transaction);
  let [stockOptions, setStockOptions] = useState([] as Stock[]);
  let [loadingStocks, setLoadingStocks] = useState(false);
  let [selectedStock, setSelectedStock] = useState({} as Stock);

  const handleClose = () => {
    setStockOptions([] as Stock[]);
    setOpen(false);
    setLoadingStocks(false);
    setTransaction({} as Transaction);
  };

  const searchStocks = (name: string) => {
    return axios.get(`${STOCK_API_URL}/search/${name}?limit=10`).then((res) => {
      const stocks_data: Stock[] = res.data.map((stock: any) => {
        return {
          symbol: stock?.symbol,
          name: stock?.shortname,
          long_name: stock?.longname,
        };
      });
      setStockOptions(
        stocks_data.filter((stock: Stock) => {
          return stock.name !== undefined;
        })
      );
    });
  };

  const filterStockOptions = (options: Stock[], { inputValue }) => {
    return options.filter((option) => {
      return (
        option.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
  };

  const onStockChange = (
    event: React.ChangeEvent<any>,
    value: string | null
  ) => {
    if (value === "") {
      setStockOptions([] as Stock[]);
    } else {
      setLoadingStocks(true);
      searchStocks(value as string).then(() => setLoadingStocks(false));
    }
  };

  const onStockSelect = (
    event: React.ChangeEvent<any>,
    value: Stock | null
  ) => {
    setSelectedStock(value as Stock);
  };

  const handleChange =
    (prop: keyof Transaction) => (event: React.ChangeEvent<any>) => {
      let newTotalPrice: number = parseFloat(transaction.totalPrice);
      if (prop === "amount") {
        newTotalPrice =
          parseInt(event.target.value) * parseFloat(transaction.stockPrice);
      }

      if (prop === "stockPrice") {
        newTotalPrice =
          parseFloat(event.target.value) * parseInt(transaction.amount);
      }

      setTransaction({
        ...transaction,
        [prop]: event.target.value,
        totalPrice: newTotalPrice.toString(),
      });
    };

  const submitTransaction = (event: React.ChangeEvent<any>) => {
    const new_stocks: Stock[] = stocks.concat({
      amount: transaction.amount,
      price: transaction.stockPrice,
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      long_name: selectedStock.long_name,
    });
    setStocks(new_stocks);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="stock-modal">
      <div>
        <div className="modal-form">
          <Autocomplete
            id="stock-name-autocomplete"
            options={stockOptions}
            getOptionLabel={(stock: Stock) => stock.symbol}
            getOptionSelected={(option: Stock, value: Stock) =>
              option.symbol === value.symbol
            }
            onInputChange={onStockChange}
            filterOptions={filterStockOptions}
            onChange={onStockSelect}
            loading={loadingStocks}
            renderInput={(params) => (
              <TextField {...params} id="stock-name" label="Stock" />
            )}
          />
          <TextField
            id="transaction-date"
            type="date"
            value={transaction.date}
            onChange={handleChange("date")}
          />
          <TextField
            id="amount"
            type="number"
            label="Amount"
            value={transaction.amount}
            onChange={handleChange("amount")}
          />
          <FormControl>
            <InputLabel htmlFor="stock-price">Stock Price</InputLabel>
            <Input
              id="stock-price"
              type="number"
              value={transaction.stockPrice}
              onChange={handleChange("stockPrice")}
              endAdornment={
                <InputAdornment position="end">{currency}</InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="transaction-type">Transaction</InputLabel>
            <Select
              id="transaction-type"
              value={transaction.type}
              onChange={handleChange("type")}
            >
              <MenuItem value="buy">Buy</MenuItem>
              <MenuItem value="sell">Sell</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="total-price">Total Price</InputLabel>
            <Input
              id="total-price"
              type="text"
              value={transaction.totalPrice}
              endAdornment={
                <InputAdornment position="end">{currency}</InputAdornment>
              }
              readOnly
            />
          </FormControl>
        </div>
        <div className="form-buttons">
          <Button variant="contained" onClick={submitTransaction}>
            <CheckIcon />
          </Button>
          <Button variant="contained" className="cancel" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddTransaction;
