import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core/";
import CountryListContext from "./CountryListContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  tableCtn: {
    width: 650,
    margin: "0 auto",
    backgroundColor: "#f1f1f1",
  },
  tableLink: {
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const columns = [
  { id: "Country", label: "Country" },
  { id: "TotalConfirmed", label: "Total Confirmed", align: "right", format: (value) => value.toLocaleString("en-US") },
  {
    id: "TotalDeaths",
    label: "Total Deaths",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const CountryList = () => {
  const { countryList } = useContext(CountryListContext);
  const classes = useStyles();

  return (
    <div>
      {countryList ? (
        <TableContainer className={classes.tableCtn} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align}>
                    <b>{col.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {countryList.map((row) => (
                <TableRow key={row.Country}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    const formatValue = column.format && typeof value === "number" ? column.format(value) : value;
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Link className={classes.tableLink} to={"/details?code=" + row.CountryCode}>
                          {formatValue}
                        </Link>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default CountryList;
