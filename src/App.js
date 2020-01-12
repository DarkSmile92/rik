import "./App.css";

import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

import AppBar from "./AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Rifm } from "rifm";
import TextField from "@material-ui/core/TextField";
import { injectIntl } from "react-intl";
import { str2Float } from "./utils";
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
    },
    formControl: {
      margin: theme.spacing(1)
    },
    returnNegative: {
      fontWeight: "bold",
      color: "red"
    },
    returnPositive: {
      fontWeight: "bold",
      color: "green"
    },
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    bmcButtonImg: {
      width: 35,
      marginBottom: 1,
      boxShadow: "none",
      border: "none",
      verticalAlign: "middle"
    },
    bmcButton: {
      padding: "7px 10px 7px 10px",
      // lineHeight: 35,
      height: 51,
      minWidth: 217,
      textDecoration: "none",
      display: "inline-flex",
      color: "#ffffff",
      backgroundColor: "#79D6B5",
      borderRadius: 5,
      border: "1px solid transparent",
      padding: "7px 10px 7px 10px",
      fontSize: 20,
      letterSpacing: 0.6,
      boxShadow: "0px 1px 2px rgba(190, 190, 190, 0.5)",
      "-webkit-box-shadow": "0px 1px 2px 2px rgba(190, 190, 190, 0.5)",
      margin: "0 auto",
      //fontFamily: "'Lato', cursive",
      "-webkit-box-sizing": "border-box",
      boxSizing: "border-box",
      "-o-transition": "0.3s all linear",
      "-webkit-transition": "0.3s all linear",
      "-moz-transition": "0.3s all linear",
      "-ms-transition": "0.3s all linear",
      transition: "0.3s all linear",
      "&:hover": {
        textDecoration: "none",
        boxShadow: "0px 1px 2px 2px rgba(190, 190, 190, 0.5)",
        opacity: 0.85,
        color: "#ffffff"
      },
      "&:focus": {
        textDecoration: "none",
        boxShadow: "0px 1px 2px 2px rgba(190, 190, 190, 0.5)",
        opacity: 0.85,
        color: "#ffffff"
      },
      "&:active": {
        textDecoration: "none",
        boxShadow: "0px 1px 2px 2px rgba(190, 190, 190, 0.5)",
        opacity: 0.85,
        color: "#ffffff"
      }
    }
  })
);

const App = props => {
  const INTL = props.intl;
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [provision, setProvision] = useState(0.0);
  const [buyingcosts, setBuyingcosts] = useState(6.5);
  const [interest, setInterest] = useState(1.8); // Zins
  const [repayment, setRepayment] = useState(2); // Tilgung
  const [condoFee, setCondoFee] = useState("0.00"); // Hausgeld
  const [rentIndex, setRentIndex] = useState("0.00"); // Mietspiegel
  const [rent, setRent] = useState("0.00"); // Mieteinnahmen
  const [livingSpace, setLivingSpace] = useState(0); // Wohnflaeche
  const [totalAmount, setTotalAmount] = useState(""); // Gesamtsumme
  const [pricePerSpace, setPricePerSpace] = useState("0.00"); // Preis pro QM
  const [interestPerMonth, setInterestPerMonth] = useState(""); // Zinsen / Monat
  const [repaymentPerMonth, setRepaymentPerMonth] = useState(""); // Tilgung / Monat
  const [monthlyCosts, setMonthlyCosts] = useState(0); // Monatliche Kosten
  const [monthlyCostsNoBuyingCosts, setMonthlyCostsNoBuyingCosts] = useState(0); // Monatliche Kosten ohne NK
  const [monthlyCostsInvest, setMonthlyCostsInvest] = useState(0); // Monatliche Kosten Anlage

  const recalculate = (
    _price,
    _provision,
    _buyingcosts,
    _livingSpace,
    _interest,
    _repayment,
    _condoFee,
    _rent,
    _rentIndex
  ) => {
    if (isNaN(_price) || !_price || _price === 0) return;
    const amt_provision = _price * ((isNaN(_provision) ? 0 : _provision) / 100);
    const amt_buyingCosts =
      _price * ((isNaN(_buyingcosts) ? 0 : _buyingcosts) / 100);
    const amt_total = _price + amt_provision + amt_buyingCosts;
    const amt_interest_yearly = (amt_total * _interest) / 100;
    const amt_repayment_yearly = (amt_total * _repayment) / 100;
    const amt_costs_monthly =
      amt_interest_yearly / 12 +
      amt_repayment_yearly / 12 +
      (isNaN(_condoFee) ? 0 : _condoFee);
    let amt_costs_monthly_invest = 0;
    // rent is higher ranked than rentIndex
    if (
      (isNaN(_rent) || _rent === 0) &&
      !isNaN(_rentIndex) &&
      _rentIndex > 0 &&
      !isNaN(_livingSpace) &&
      _livingSpace > 0
    ) {
      amt_costs_monthly_invest = amt_costs_monthly - _rentIndex * _livingSpace;
    } else {
      amt_costs_monthly_invest = amt_costs_monthly - (isNaN(_rent) ? 0 : _rent);
    }

    setTotalAmount(amt_total.toString());
    if (_livingSpace && !isNaN(_livingSpace)) {
      setPricePerSpace(
        ((_price + amt_provision) / _livingSpace).toFixed(2).toString()
      );
    }
    setInterestPerMonth((amt_interest_yearly / 12).toFixed(2).toString());
    setRepaymentPerMonth((amt_repayment_yearly / 12).toFixed(2).toString());
    setMonthlyCosts(amt_costs_monthly.toFixed(2).toString());
    // preis + provision
    // _price + amt_provision
    // zins = ((_price+amt_provision)*_interest) / 100
    // tilgung = ((preis+provision)*_repayment) / 100
    setMonthlyCostsNoBuyingCosts(
      ((_price + amt_provision) * _interest) / 100 / 12 +
        ((_price + amt_provision) * _repayment) / 100 / 12 +
        (isNaN(_condoFee) ? 0 : _condoFee)
    );
    setMonthlyCostsInvest(amt_costs_monthly_invest.toFixed(2).toString());
  };

  const numberFormat = theString => {
    const r = parseInt(theString.replace(/[^\d]+/gi, ""), 10);
    return r ? r.toLocaleString("de-DE") : "";
  };

  const getBuyingCostsFormatted = () => {
    if (price && price !== "" && buyingcosts) {
      const parsedPrice = parseFloat(price.replace(/[^\d]+/, ""));
      const costs = parsedPrice * (buyingcosts / 100);
      return formatCurrency(costs);
    }
    return "0,00€";
  };

  const formatCurrency = value =>
    INTL.formatNumber(value, {
      style: "currency",
      currency: "EUR"
    });

  const proposeRent = () => {
    if (monthlyCosts && !isNaN(monthlyCosts)) {
      const v_monthly = parseFloat(monthlyCosts);
      const wantedRent = v_monthly + v_monthly * 0.04;
      setRent(Math.round(wantedRent).toString());
      setRentIndex(
        livingSpace
          ? Math.round(Math.round(wantedRent) / livingSpace).toString()
          : "0"
      );
      recalculate(
        str2Float(price),
        provision,
        buyingcosts,
        livingSpace,
        interest,
        repayment,
        str2Float(condoFee),
        wantedRent,
        livingSpace ? wantedRent / livingSpace : 0
      );
    }
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
                  <Rifm
                    value={price}
                    onChange={newVal => {
                      setPrice(newVal);
                      recalculate(
                        str2Float(newVal),
                        provision,
                        buyingcosts,
                        livingSpace,
                        interest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
                      );
                    }}
                    format={numberFormat}
                    replace={v => v.replace(",", ".")}
                  >
                    {({ value, onChange }) => (
                      <TextField
                        id="buyprice"
                        label="Kaufpreis"
                        className={classes.textField}
                        value={value}
                        onChange={onChange}
                        margin="normal"
                        type="tel"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &euro;
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </Rifm>
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
                        str2Float(price),
                        parseFloat(e.target.value),
                        buyingcosts,
                        livingSpace,
                        interest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
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
                        str2Float(price),
                        provision,
                        parseFloat(e.target.value),
                        livingSpace,
                        interest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
                      );
                    }}
                    margin="normal"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                    helperText={getBuyingCostsFormatted()}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="interest"
                    label="Zins p.a."
                    className={classes.textField}
                    value={interest}
                    onChange={e => {
                      const parsedInterest = parseFloat(
                        e.target.value.replace(",", ".")
                      );
                      setInterest(parsedInterest);
                      recalculate(
                        str2Float(price),
                        provision,
                        buyingcosts,
                        livingSpace,
                        parsedInterest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
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
                    id="repayment"
                    label="Tilgung p.a."
                    className={classes.textField}
                    value={repayment}
                    onChange={e => {
                      setRepayment(parseFloat(e.target.value));
                      recalculate(
                        str2Float(price),
                        provision,
                        buyingcosts,
                        livingSpace,
                        interest,
                        parseFloat(e.target.value),
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
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
              </Grid>
              <Grid container item className={classes.root} spacing={2} xs={12}>
                <Grid item xs>
                  <Rifm
                    value={condoFee}
                    onChange={newVal => {
                      setCondoFee(newVal);
                      recalculate(
                        str2Float(price),
                        provision,
                        buyingcosts,
                        livingSpace,
                        interest,
                        repayment,
                        str2Float(newVal),
                        str2Float(rent),
                        str2Float(rentIndex)
                      );
                    }}
                    format={numberFormat}
                    replace={v => v.replace(",", ".")}
                  >
                    {({ value, onChange }) => (
                      <TextField
                        id="condo-fee"
                        label="Hausgeld"
                        className={classes.textField}
                        value={value}
                        onChange={onChange}
                        margin="normal"
                        type="tel"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &euro;
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </Rifm>
                </Grid>
                <Grid item xs>
                  <Rifm
                    value={rentIndex}
                    onChange={newVal => {
                      setRentIndex(newVal);
                      if (livingSpace) {
                        const newRent = Math.round(
                          str2Float(newVal) * livingSpace
                        );
                        setRent(newRent.toString());
                        recalculate(
                          str2Float(price),
                          provision,
                          buyingcosts,
                          livingSpace,
                          interest,
                          repayment,
                          str2Float(condoFee),
                          newRent,
                          str2Float(newVal)
                        );
                      } else {
                        recalculate(
                          str2Float(price),
                          provision,
                          buyingcosts,
                          livingSpace,
                          interest,
                          repayment,
                          str2Float(condoFee),
                          str2Float(rent),
                          str2Float(newVal)
                        );
                      }
                    }}
                    format={numberFormat}
                    replace={v => v.replace(",", ".")}
                  >
                    {({ value, onChange }) => (
                      <TextField
                        id="rent-index"
                        label="Mietspiegel €/m²"
                        className={classes.textField}
                        value={value}
                        onChange={onChange}
                        margin="normal"
                        type="tel"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &euro;
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </Rifm>
                </Grid>
                <Grid item xs>
                  <Rifm
                    value={rent}
                    onChange={newVal => {
                      setRent(newVal);
                      if (livingSpace) {
                        setRentIndex(
                          Math.round(str2Float(newVal) / livingSpace).toString()
                        );
                      }
                      recalculate(
                        str2Float(price),
                        provision,
                        buyingcosts,
                        livingSpace,
                        interest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(newVal),
                        str2Float(rentIndex)
                      );
                    }}
                    format={numberFormat}
                    replace={v => v.replace(",", ".")}
                  >
                    {({ value, onChange }) => (
                      <TextField
                        id="rent"
                        label="Mieteinnahmen / Monat"
                        className={classes.textField}
                        value={value}
                        onChange={onChange}
                        margin="normal"
                        type="tel"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &euro;
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </Rifm>
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
                        str2Float(price),
                        provision,
                        buyingcosts,
                        parseFloat(e.target.value),
                        interest,
                        repayment,
                        str2Float(condoFee),
                        str2Float(rent),
                        str2Float(rentIndex)
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
                  {/*<Rifm
                    value={totalAmount}
                    format={numberFormat}
                    replace={v => v.replace(",", ".")}
                  >
                    {({ value, onChange }) => (
                      <CssTextField
                        id="total-amount"
                        label="Gesamtsumme"
                        className={classes.textField}
                        value={value}
                        margin="normal"
                        // type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &euro;
                            </InputAdornment>
                          )
                        }}
                        disabled
                        variant="outlined"
                      />
                    )}
                      </Rifm>*/}
                  <CssTextField
                    id="total-amount"
                    label="Gesamtsumme"
                    className={classes.textField}
                    value={formatCurrency(totalAmount)}
                    margin="normal"
                    // type="number"
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">&euro;</InputAdornment>
                    //   )
                    // }}
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
                  value={formatCurrency(pricePerSpace)}
                  margin="normal"
                  // type="number"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">&euro;</InputAdornment>
                  //   )
                  // }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="interestPerMonth"
                  label="Zinsen / Monat"
                  className={classes.textField}
                  value={formatCurrency(interestPerMonth)}
                  margin="normal"
                  // type="number"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">&euro;</InputAdornment>
                  //   )
                  // }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="repaymentPerMonth"
                  label="Tilgung / Monat"
                  className={classes.textField}
                  value={formatCurrency(repaymentPerMonth)}
                  margin="normal"
                  // type="number"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">&euro;</InputAdornment>
                  //   )
                  // }}
                  disabled
                />
              </Grid>
              <Grid item xs>
                <CssTextField
                  id="monthly-costs"
                  label="Kosten / Monat"
                  className={classes.textField}
                  value={formatCurrency(monthlyCosts)}
                  margin="normal"
                  // type="number"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">&euro;</InputAdornment>
                  //   )
                  // }}
                  disabled
                  variant="outlined"
                  helperText={`Ohne NK: ${formatCurrency(
                    monthlyCostsNoBuyingCosts
                  )}`}
                />
              </Grid>
              <Grid item xs>
                <CssTextField
                  id="monthly-costs-invest"
                  label="Kosten / Monat (Anlage)"
                  className={classes.textField}
                  value={formatCurrency(monthlyCostsInvest)}
                  margin="normal"
                  // type="number"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">&euro;</InputAdornment>
                  //   )
                  // }}
                  disabled
                  variant="outlined"
                  helperText={
                    parseFloat(monthlyCostsInvest) > 0 ? (
                      <span className={classes.returnNegative}>Verlust</span>
                    ) : parseFloat(monthlyCostsInvest) < 0 ? (
                      <span className={classes.returnPositive}>Gewinn</span>
                    ) : (
                      <span />
                    )
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={() => proposeRent()}
            >
              <MonetizationOnIcon className={classes.leftIcon} />
              Miete vorschlagen
            </Button>
            <a href="https://www.sparkasse.de/service/rechner/nebenkostenrechner.html">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
              >
                SPK NK Rechner
              </Button>
            </a>
            <Grid item xs={12}>
              <a
                className={classes.bmcButton}
                target="_blank"
                href="https://www.buymeacoffee.com/Robs"
              >
                <img
                  className={classes.bmcButtonImg}
                  src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                  alt="Kauf mir einen Kaffee"
                />
                <span style={{ marginLeft: 15, fontSize: 19 }}>
                  Kauf mir einen Kaffee
                </span>
              </a>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(App);
