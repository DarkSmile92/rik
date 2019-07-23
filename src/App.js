import "./App.css";

import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

import AppBar from "./AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { formatMoney } from "./utils";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    /*"& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    },*/
    "& .MuiOutlinedInput-root.Mui-disabled": {
      "& fieldset": {
        borderColor: "green",
        backgroundColor: "rgba(90,90,90,0.1)"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    spacer: {
      marginTop: "2em",
      marginBottom: "2em"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

const App = () => {
  const classes = useStyles();
  const [price, setPrice] = useState(0);
  const [provision, setProvision] = useState(0.0);
  const [buyingcosts, setBuyingcosts] = useState(12.0);
  const [interest, setInterest] = useState(1.8); // Zins
  const [repayment, setRepayment] = useState(2); // Tilgung
  const [condoFee, setCondoFee] = useState(0); // Hausgeld
  const [rentIndex, setRentIndex] = useState(0); // Mietspiegel
  const [rent, setRent] = useState(0); // Mieteinnahmen
  const [livingSpace, setLivingSpace] = useState(0); // Wohnflaeche
  const [totalAmount, setTotalAmount] = useState(0); // Gesamtsumme
  const [pricePerSpace, setPricePerSpace] = useState(0); // Preis pro QM
  const [interestPerMonth, setInterestPerMonth] = useState(0); // Zinsen / Monat
  const [repaymentPerMonth, setRepaymentPerMonth] = useState(0); // Tilgung / Monat
  const [monthlyCosts, setMonthlyCosts] = useState(0); // Monatliche Kosten

  const recalculate = (_price, _provision, _buyingcosts, _livingSpace) => {
    if (isNaN(_price) || !_price || _price === 0) return;
    const amt_provision = _price * (_provision / 100);
    const amt_buyingCosts = _price * (_buyingcosts / 100);
    setTotalAmount((_price + amt_provision + amt_buyingCosts).toFixed(2));
    setPricePerSpace(
      formatMoney((_price + amt_provision) / _livingSpace, 2, 3, ".", ",")
    );
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className={classes.spacer}>
        <Container maxWidth="lg">
          <form noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={2}>
              <Grid container item className={classes.root} spacing={2} xs={12}>
                <Grid item xs>
                  <TextField
                    id="buyprice"
                    label="Kaufpreis"
                    className={classes.textField}
                    value={price}
                    onChange={e => {
                      if (!isNaN(e.target.value)) {
                        setPrice(parseFloat(e.target.value));
                        recalculate(
                          parseFloat(e.target.value),
                          provision,
                          buyingcosts,
                          livingSpace
                        );
                      }
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">&euro;</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="provision"
                    label="Maklerprovision"
                    className={classes.textField}
                    value={provision}
                    onChange={e => {
                      setProvision(parseFloat(e.target.value));
                      recalculate(
                        price,
                        parseFloat(e.target.value),
                        buyingcosts,
                        livingSpace
                      );
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="buyingcosts"
                    label="Kaufnebenkosten"
                    className={classes.textField}
                    value={buyingcosts}
                    onChange={e => {
                      setBuyingcosts(parseFloat(e.target.value));
                      recalculate(
                        price,
                        provision,
                        parseFloat(e.target.value),
                        livingSpace
                      );
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="interest"
                    label="Zins p.a."
                    className={classes.textField}
                    value={interest}
                    onChange={e => {
                      setInterest(parseFloat(e.target.value));
                      recalculate(price, provision, buyingcosts, livingSpace);
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="repayment"
                    label="Tilgung p.a."
                    className={classes.textField}
                    value={repayment}
                    onChange={e => {
                      setRepayment(parseFloat(e.target.value));
                      recalculate(price, provision, buyingcosts, livingSpace);
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container item className={classes.root} spacing={2} xs={12}>
                <Grid item xs>
                  <TextField
                    id="condo-fee"
                    label="Hausgeld"
                    className={classes.textField}
                    value={condoFee}
                    onChange={e => {
                      setCondoFee(parseFloat(e.target.value));
                      recalculate(price, provision, buyingcosts, livingSpace);
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">&euro;</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="rent-index"
                    label="Mietspiegel €/m²"
                    className={classes.textField}
                    value={rentIndex}
                    onChange={e => {
                      setRentIndex(parseFloat(e.target.value));
                      recalculate(price, provision, buyingcosts, livingSpace);
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">&euro;</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="rent"
                    label="Mieteinnahmen / Monat"
                    className={classes.textField}
                    value={rent}
                    onChange={e => {
                      setRent(parseFloat(e.target.value));
                      recalculate(price, provision, buyingcosts, livingSpace);
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">&euro;</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="space"
                    label="Wohnfläche"
                    className={classes.textField}
                    value={livingSpace}
                    onChange={e => {
                      setLivingSpace(parseFloat(e.target.value));
                      recalculate(
                        price,
                        provision,
                        buyingcosts,
                        parseFloat(e.target.value)
                      );
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m²</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <CssTextField
                    id="total-amount"
                    label="Gesamtsumme"
                    className={classes.textField}
                    value={totalAmount}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">&euro;</InputAdornment>
                      )
                    }}
                    disabled
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Box borderBottom={1} m={2} />
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={2}>
            <Grid container item className={classes.root} spacing={2} xs={12}>
              <Grid item xs>
                <TextField
                  id="pricePerSpace"
                  label="€ / m²"
                  className={classes.textField}
                  value={pricePerSpace}
                  margin="normal"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">&euro;</InputAdornment>
                    )
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="interestPerMonth"
                  label="Zinsen / Monat"
                  className={classes.textField}
                  value={interestPerMonth}
                  margin="normal"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">&euro;</InputAdornment>
                    )
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="repaymentPerMonth"
                  label="Tilgung / Monat"
                  className={classes.textField}
                  value={repaymentPerMonth}
                  margin="normal"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">&euro;</InputAdornment>
                    )
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <CssTextField
                  id="monthly-costs"
                  label="Gesamtkosten / Monat"
                  className={classes.textField}
                  value={monthlyCosts}
                  margin="normal"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">&euro;</InputAdornment>
                    )
                  }}
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
