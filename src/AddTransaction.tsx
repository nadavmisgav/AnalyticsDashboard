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

import axios from "axios";

import "./AddTransaction.scss";

// interface Transaction {
//   type: "" | "buy" | "sell";
//   stock: string;
//   amount: number;
//   stockPrice: number;
//   totalPrice: number;
//   date: null | Date;
// }

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

interface Stock {
  symbol: string;
  name: string;
  long_name: string;
}

function AddTransaction({ open, setOpen }) {
  let [transaction, setTransaction] = useState({
    type: "",
    stock: "",
    amount: "",
    stockPrice: "",
    totalPrice: "",
    date: "",
  });

  let [stocks, setStocks] = useState([
    // { name: "Amazon" },
    // { name: "Alphabet" },
  ] as Stock[]);

  let [loadingStocks, setLoadingStocks] = useState(false);

  const handleClose = () => {
    setStocks([] as Stock[]);
    setOpen(false);
    setLoadingStocks(false);
    setTransaction({
      type: "",
      stock: "",
      amount: "",
      stockPrice: "",
      totalPrice: "",
      date: "",
    });
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
      setStocks(
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

  const onStockChange = (event: React.ChangeEvent<any>) => {
    const stock_name = event.target.value;

    if (stock_name === "") {
      setStocks([] as Stock[]);
    } else {
      setLoadingStocks(true);
      searchStocks(stock_name).then(() => setLoadingStocks(false));
    }
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

  return (
    <Modal open={open} onClose={handleClose} className="stock-modal">
      <div>
        <div className="modal-form">
          <Autocomplete
            id="stock-name-autocomplete"
            options={stocks}
            getOptionLabel={(stock) => stock.symbol}
            onInputChange={onStockChange}
            filterOptions={filterStockOptions}
            // onChange={}
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
              endAdornment={<InputAdornment position="end">$</InputAdornment>}
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
              endAdornment={<InputAdornment position="end">$</InputAdornment>}
              readOnly
            />
          </FormControl>
        </div>
        <div className="form-buttons">
          <Button variant="contained">
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
