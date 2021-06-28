import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import React from "react";

import "./GeneralBoard.scss";

const GeneralBoard = () => {
  const wallstreetOpen: boolean = false;
  const telavivOpen: boolean = false;

  return (
    <div className="content-container general-panel">
      <div className="add-button">
        <Fab aria-label="add" size="medium">
          <AddIcon />
        </Fab>
      </div>

      <div className="general-stats-container">
        <h4>
          <span>Wall street</span>
        </h4>
        <div className="stat-row">
          <span>Holdings</span>
          <i></i> <span>2034$</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <i></i> <span>104$</span>
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
          <i></i> <span>2034₪</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <i></i> <span>104₪</span>
        </div>
        <div className="opening-hours">
          <WatchLaterIcon style={{ color: telavivOpen ? "green" : "red" }} />
          <span>Currently closed</span>
        </div>
      </div>
      <Divider />
      <div className="general-stats-container">
        <h4>available</h4>
        <div className="stat-row">
          <span>NIS</span>
          <i></i> <span>2034$</span>
        </div>
        <div className="stat-row">
          <span>USD</span>
          <i></i> <span>104₪</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralBoard;
