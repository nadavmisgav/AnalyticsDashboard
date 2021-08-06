import Divider from "@material-ui/core/Divider";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

import "./GeneralBoard.scss";

const GeneralBoard = ({
  ws_earnings,
  ws_holdings,
  ta_earnings,
  ta_holdings,
}) => {
  const wallstreetOpen: boolean = false;
  const telavivOpen: boolean = false;

  return (
    <div className="content-container general-panel">
      <div className="general-stats-container">
        <h4>
          <span>Wall street</span>
        </h4>
        <div className="stat-row">
          <span>Holdings</span>
          <span>{ws_holdings.toFixed(2)}$</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <span>{ws_earnings.toFixed(2)}$</span>
        </div>
        <div className="opening-hours">
          <WatchLaterIcon style={{ color: wallstreetOpen ? "green" : "red" }} />
          <span>Currently closed</span>
        </div>
      </div>
      <Divider />
      <div className="general-stats-container">
        <h4>
          <span>Tel Aviv</span>
        </h4>
        <div className="stat-row">
          <span>Holdings</span>
          <span>{ta_holdings.toFixed(2)}₪</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <span>{ta_earnings.toFixed(2)}₪</span>
        </div>
        <div className="opening-hours">
          <WatchLaterIcon style={{ color: telavivOpen ? "green" : "red" }} />
          <span>Currently closed</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralBoard;
