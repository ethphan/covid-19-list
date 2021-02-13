import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CountryList from "./Components/CountryList";
import CountryDetails from "./Components/CountryDetails";
import Header from "./Components/Header";
import axios from "axios";
import CountryListContext from "./Components/CountryListContext";

const App = () => {
  const [countryList, setCountryList] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        let list = res.data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10);
        setCountryList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <CountryListContext.Provider value={{ countryList }}>
        <Header />
        <Switch>
          <Route exact path="/" component={CountryList} />
          <Route exact path="/details" component={CountryDetails} />
        </Switch>
      </CountryListContext.Provider>
    </div>
  );
};

export default App;
