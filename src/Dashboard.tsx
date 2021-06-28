import GeneralBoard from "./GeneralBoard";
import GraphBoard from "./GraphBoard";
import "./Dashboard.scss";
import Stocks from "./Stocks";

const createStock = (
  currency,
  name,
  symbol,
  target,
  amount,
  value,
  earnings
) => {
  return { currency, name, symbol, target, amount, value, earnings };
};

const stock_data = [
  createStock("$", "Amazon", "AMZN", 1000, 10, 2334, 5),
  createStock("$", "Amazon", "AMZN", 1000, 10, 2334, 5),
  createStock("$", "Amazon", "AMZN", 1000, 10, 2334, 5),
  createStock("$", "Amazon", "AMZN", 1000, 10, 2334, 5),
];

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="boards">
        <div className="general-panels">
          <GeneralBoard />
          <GraphBoard />
        </div>
        <div className="stock-panels">
          <Stocks name="Wall Street" stock_data={stock_data} />
          <Stocks name="Tel Aviv" stock_data={stock_data} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
