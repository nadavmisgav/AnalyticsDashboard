import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";

import Dashboard from "./Dashboard";

function NavBar(props: any) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/research">Research</Link>
        </li>
        <li>
          <Link to="/following">Following</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/research">
              <h1>Research</h1>
            </Route>

            <Route exact path="/following">
              <h1>Following</h1>
            </Route>
            <Route exact path="/reports">
              <h1>Reports</h1>
            </Route>
            <Route exact path="/settings">
              <h1>Settings</h1>
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}
