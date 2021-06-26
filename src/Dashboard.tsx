import GeneralBoard from "./GeneralBoard";
import GraphBoard from "./GraphBoard";
import "./Dashboard.scss";
import Stocks from "./Stocks";
import Divider from "@material-ui/core/Divider";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="boards">
        <GeneralBoard />
        <GraphBoard />
        <Stocks name="Wall Street" />
        <Stocks name="Tel Aviv" />
      </div>
    </>
  );
};

export default Dashboard;
