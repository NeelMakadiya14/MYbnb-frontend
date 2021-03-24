import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import SearchResult from "./Pages/SearchResult";
import MyBooking from "./Pages/MyBooking";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:ID" component={Details} />
        <Route path="/results/:place" component={SearchResult} />
        <Route path="/mybookings/:email" component={MyBooking} />
        <Route path="*" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
