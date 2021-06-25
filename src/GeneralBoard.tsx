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
    <div className="content-container">
      <div className="add-button">
        <Fab aria-label="add" size="medium">
          <AddIcon />
        </Fab>
      </div>

      <div className="general-stats-container">
        <h4>
          <span>Wall street</span>
          <WatchLaterIcon style={{ color: wallstreetOpen ? "green" : "red" }} />
        </h4>
        <div className="stat-row">
          <span>Holdings</span>
          <i></i> <span>2034$</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <i></i> <span>104$</span>
        </div>
        <p>Currently closed</p>
      </div>
      <Divider />
      <div className="general-stats-container">
        <h4>
          <span>Tel Aviv</span>
          <WatchLaterIcon style={{ color: telavivOpen ? "green" : "red" }} />
        </h4>
        <div className="stat-row">
          <span>Holdings</span>
          <i></i> <span>2034₪</span>
        </div>
        <div className="stat-row">
          <span>Daily earnings</span>
          <i></i> <span>104₪</span>
        </div>
        <p>Currently closed</p>
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
