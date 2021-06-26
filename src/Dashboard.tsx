import GeneralBoard from "./GeneralBoard";
import GraphBoard from "./GraphBoard";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="boards">
        <GeneralBoard />
        <GraphBoard />
      </div>
    </>
  );
};

export default Dashboard;
