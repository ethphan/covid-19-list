import React, { useContext, useEffect, useState } from "react";
import CountryListContext from "./CountryListContext";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  countryDetailsCtn: {
    width: 450,
    margin: "0 auto",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    padding: "10px 20px",
    textAlign: "center",
  },
  countryTitle: {
    margin: "20px 10px 30px",
    textAlign: "center",
  },
  countryDetails: {
    borderBottom: "solid 1px #ccc",
    margin: "20px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    margin: "10px auto",
    width: "100%",
  },
});

const CountryDetails = (props) => {
  const [details, setDetails] = useState(null);
  const { countryList } = useContext(CountryListContext);
  const classes = useStyles();

  useEffect(() => {
    if (countryList) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      let countryDetail = countryList.filter((el) => el.CountryCode === code)[0];
      const {
        Country,
        NewDeaths,
        NewConfirmed,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
        NewRecovered,
      } = countryDetail;
      setDetails({ Country, TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered });
    }
  }, [window.location.href, countryList]);

  return (
    <div className={classes.countryDetailsCtn}>
      {details ? (
        <div>
          <h3 className={classes.countryTitle}>{details.Country}</h3>
          {Object.entries(details).map((el, index) => {
            if (el[0] === "Country") return null;
            return (
              <div key={index} className={classes.countryDetails}>
                <span>{el[0].split(/(?=[A-Z])/).join(" ")}: </span>
                {el[1] === 0 ? "unknow" : el[1].toLocaleString("en")}
              </div>
            );
          })}
          <Button className={classes.btn} onClick={() => props.history.push("/")} variant="contained" color="primary">
            Back to the list
          </Button>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default CountryDetails;
