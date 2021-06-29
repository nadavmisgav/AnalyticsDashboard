import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

import "./AddTransaction.scss";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

// interface Transaction {
//   type: "" | "buy" | "sell";
//   stock: string;
//   amount: number;
//   stockPrice: number;
//   totalPrice: number;
//   date: null | Date;
// }

interface Transaction {
  type: string;
  stock: string;
  amount: string;
  stockPrice: string;
  totalPrice: string;
  date: string;
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

  const handleClose = () => {
    setOpen(false);
    setTransaction({
      type: "",
      stock: "",
      amount: "",
      stockPrice: "",
      totalPrice: "",
      date: "",
    });
  };

  const handleChange =
    (prop: keyof Transaction) => (event: React.ChangeEvent<any>) => {
      setTransaction({ ...transaction, [prop]: event.target.value });
    };

  return (
    <Modal open={open} onClose={handleClose} className="stock-modal">
      <div>
        <h2>Transaction</h2>
        <TextField
          id="stock-name"
          label="Stock"
          variant="filled"
          value={transaction.stock}
          onChange={handleChange("stock")}
        />
        <TextField
          id="amount"
          label="Amount"
          variant="filled"
          value={transaction.amount}
          onChange={handleChange("amount")}
        />
        <FormControl variant="filled">
          <InputLabel htmlFor="stock-price">Stock Price</InputLabel>
          <FilledInput
            id="stock-price"
            type="text"
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
        <FormControl variant="filled">
          <InputLabel htmlFor="total-price">Total Price</InputLabel>
          <FilledInput
            id="total-price"
            type="text"
            value={transaction.totalPrice}
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            readOnly
          />
        </FormControl>
        <Button variant="contained">
          <CheckIcon />
        </Button>
        <Button variant="contained" className="cancel" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </div>
    </Modal>
  );
}

export default AddTransaction;
