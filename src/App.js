import "./App.css";
import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import { injectIntl } from "react-intl";
import { InputNumber } from "primereact/inputnumber";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { parseImmoScout } from "./parser";

const App = props => {
  const INTL = props.intl;
  let location = useLocation();
  const [price, setPrice] = useState("");
  const [provision, setProvision] = useState(0.0);
  const [buyingcosts, setBuyingcosts] = useState(6.5);
  const [interest, setInterest] = useState(1.8); // Zins
  const [repayment, setRepayment] = useState(2); // Tilgung
  const [condoFee, setCondoFee] = useState(0.0); // Hausgeld
  const [rentIndex, setRentIndex] = useState(0.0); // Mietspiegel
  const [rent, setRent] = useState(0.0); // Mieteinnahmen
  const [livingSpace, setLivingSpace] = useState(0); // Wohnflaeche
  const [totalAmount, setTotalAmount] = useState(""); // Gesamtsumme
  const [pricePerSpace, setPricePerSpace] = useState(0.0); // Preis pro QM
  const [interestPerMonth, setInterestPerMonth] = useState(0.0); // Zinsen / Monat
  const [repaymentPerMonth, setRepaymentPerMonth] = useState(0.0); // Tilgung / Monat
  const [monthlyCosts, setMonthlyCosts] = useState(0); // Monatliche Kosten
  const [monthlyCostsNoBuyingCosts, setMonthlyCostsNoBuyingCosts] = useState(0); // Monatliche Kosten ohne NK
  const [monthlyCostsInvest, setMonthlyCostsInvest] = useState(0); // Monatliche Kosten Anlage

  useEffect(() => {
    if (location) {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      if (params && params.hasOwnProperty("is")) {
        // get immoscout url
        console.log(parseImmoScout(params.is));
      }
    }
  }, [location]);

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
    const r = parseFloat(theString, 10);
    return r ? r.toLocaleString("de-DE") : "";
  };

  const getBuyingCostsFormatted = () => {
    if (price && price !== "" && buyingcosts) {
      const parsedPrice = parseFloat(price);
      const costs = parsedPrice * (buyingcosts / 100);
      return formatCurrency(costs);
    }
    return "0,00€";
  };

  const getCommissionCostsFormatted = () => {
    if (price && price !== "" && provision) {
      const parsedPrice = parseFloat(price);
      const costs = parsedPrice * (provision / 100);
      return formatCurrency(costs);
    }
    return "0,00€";
  };

  const formatCurrency = value =>
    INTL.formatNumber(value, {
      style: "currency",
      currency: "EUR"
    });

  const calcRendite = () => {
    if (monthlyCosts && !isNaN(monthlyCosts)) {
      const v_monthly = parseFloat(monthlyCosts) || 0;
      const brutto = parseFloat((rent * 100) / v_monthly);
      if (brutto > 0) return Math.round(brutto - 100);
      return 0;
    }
  };

  const proposeRent = () => {
    if (monthlyCosts && !isNaN(monthlyCosts)) {
      const v_monthly = parseFloat(monthlyCosts) || 0;
      const wantedRent = parseFloat(v_monthly + v_monthly * 0.06);
      setRent(Math.round(wantedRent));
      setRentIndex(
        livingSpace ? Math.round(Math.round(wantedRent) / livingSpace) : 0
      );
      recalculate(
        parseFloat(price),
        provision,
        buyingcosts,
        livingSpace,
        interest,
        repayment,
        parseFloat(condoFee),
        wantedRent,
        livingSpace ? wantedRent / livingSpace : 0
      );
    }
  };

  return (
    <React.Fragment>
      <AppBar />
      <form
        noValidate
        autoComplete="off"
        className="p-m-4"
        onSubmit={e => e.preventDefault()}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fprice">Kaufpreis</label>
            <InputNumber
              id="fprice"
              value={price}
              onValueChange={e => {
                const parsed = parseFloat(e.value) || 0;
                setPrice(parsed);
                recalculate(
                  parseFloat(parsed),
                  provision,
                  buyingcosts,
                  livingSpace,
                  interest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fprovision">Maklerprovision</label>
            <InputNumber
              id="fprovision"
              value={provision}
              onValueChange={e => {
                setProvision(e.value);
                if (!e.value || !parseFloat(e.value)) return;
                recalculate(
                  parseFloat(price),
                  parseFloat(e.value),
                  buyingcosts,
                  livingSpace,
                  interest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fprovision-help" className="p-d-block">
              {getCommissionCostsFormatted()}
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fbuyingcosts">Kaufnebenkosten</label>
            <InputNumber
              id="fbuyingcosts"
              value={buyingcosts}
              onValueChange={e => {
                setProvision(e.value);
                if (!e.value || !parseFloat(e.value)) return;
                recalculate(
                  parseFloat(price),
                  provision,
                  parseFloat(e.value),
                  livingSpace,
                  interest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              {getBuyingCostsFormatted()}
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="finterest">Zins p.a.</label>
            <InputNumber
              id="finterest"
              value={interest}
              prefix="%"
              onValueChange={e => {
                setInterest(e.value);
                if (!e.value || !parseFloat(e.value)) return;
                const parsedInterest = parseFloat(e.value);
                recalculate(
                  parseFloat(price),
                  provision,
                  buyingcosts,
                  livingSpace,
                  parsedInterest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frepayment">Tilgung p.a.</label>
            <InputNumber
              id="frepayment"
              value={repayment}
              prefix="%"
              onValueChange={e => {
                setRepayment(parseFloat(e.value));
                recalculate(
                  parseFloat(price),
                  provision,
                  buyingcosts,
                  livingSpace,
                  interest,
                  parseFloat(e.value),
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fcondoFee">Hausgeld</label>
            <InputNumber
              id="fcondoFee"
              value={condoFee}
              onValueChange={e => {
                setCondoFee(parseFloat(e.value));
                recalculate(
                  parseFloat(price),
                  provision,
                  buyingcosts,
                  livingSpace,
                  interest,
                  repayment,
                  parseFloat(e.value),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frentIndex">Mietspiegel €/m²</label>
            <InputNumber
              id="frentIndex"
              value={rentIndex}
              onValueChange={e => {
                setRentIndex(parseFloat(e.value));
                if (livingSpace) {
                  const newRent = Math.round(parseFloat(e.value) * livingSpace);
                  setRent(newRent.toString());
                  recalculate(
                    parseFloat(price),
                    provision,
                    buyingcosts,
                    livingSpace,
                    interest,
                    repayment,
                    parseFloat(condoFee),
                    newRent,
                    parseFloat(e.value)
                  );
                } else {
                  recalculate(
                    parseFloat(price),
                    provision,
                    buyingcosts,
                    livingSpace,
                    interest,
                    repayment,
                    parseFloat(condoFee),
                    parseFloat(rent),
                    parseFloat(e.value)
                  );
                }
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frent">Mieteinnahmen / Monat</label>
            <InputNumber
              id="frent"
              value={rent}
              onValueChange={e => {
                setRent(e.value);
                if (livingSpace) {
                  setRentIndex(
                    Math.round(parseFloat(e.value) / livingSpace).toString()
                  );
                }
                recalculate(
                  parseFloat(price),
                  provision,
                  buyingcosts,
                  livingSpace,
                  interest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(e.value),
                  parseFloat(rentIndex)
                );
              }}
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="flivingSpace">Wohnfläche</label>
            <InputNumber
              id="flivingSpace"
              value={livingSpace}
              onValueChange={e => {
                setLivingSpace(parseFloat(e.value));
                recalculate(
                  parseFloat(price),
                  provision,
                  buyingcosts,
                  parseFloat(e.value),
                  interest,
                  repayment,
                  parseFloat(condoFee),
                  parseFloat(rent),
                  parseFloat(rentIndex)
                );
              }}
              suffix=" m²"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="ftotalamount">Gesamtsumme</label>
            <InputNumber
              id="ftotalamount"
              value={totalAmount}
              disabled
              mode="currency"
              currency="EUR"
              locale="de-DE"
              minFractionDigits={2}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
        </div>
        <Fieldset legend="Ergebnis">
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="fpriceperspace">€ / m²</label>
              <InputNumber
                id="fpriceperspace"
                value={pricePerSpace}
                disabled
                mode="currency"
                currency="EUR"
                locale="de-DE"
                minFractionDigits={2}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="finterestPerMonth">Zinsen / Monat</label>
              <InputNumber
                id="finterestPerMonth"
                value={interestPerMonth}
                disabled
                mode="currency"
                currency="EUR"
                locale="de-DE"
                minFractionDigits={2}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="frepaymentPerMonth">Tilgung / Monat</label>
              <InputNumber
                id="frepaymentPerMonth"
                value={repaymentPerMonth}
                disabled
                mode="currency"
                currency="EUR"
                locale="de-DE"
                minFractionDigits={2}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="fmonthlyCosts">Kosten / Monat</label>
              <InputNumber
                id="fmonthlyCosts"
                value={monthlyCosts}
                disabled
                mode="currency"
                currency="EUR"
                locale="de-DE"
                minFractionDigits={2}
              />
              <small
                id="fmonthlyCosts-help"
                className="p-d-block"
              >{`Ohne NK: ${formatCurrency(monthlyCostsNoBuyingCosts)}`}</small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="fmonthlyCostsInvest">
                Kosten / Monat (Anlage)
              </label>
              <InputNumber
                id="fmonthlyCostsInvest"
                value={monthlyCostsInvest}
                disabled
                mode="currency"
                currency="EUR"
                locale="de-DE"
                minFractionDigits={2}
              />
              <small id="fmonthlyCostsInvest-help" className="p-d-block">
                {`${calcRendite()} % - `}
                {parseFloat(monthlyCostsInvest) > 0 ? (
                  <span className="text-red">Verlust</span>
                ) : parseFloat(monthlyCostsInvest) < 0 ? (
                  <span className="text-green">Gewinn</span>
                ) : (
                  <span />
                )}
              </small>
            </div>
          </div>
          <span className="p-buttonset">
            <Button
              label="Miete vorschlagen"
              icon="pi pi-dollar"
              onClick={() => proposeRent()}
            />
            <a href="https://www.sparkasse.de/service/rechner/nebenkostenrechner.html">
              <Button label="SPK NK Rechner" />
            </a>
          </span>
          <a
            className="bmcButton"
            target="_blank"
            href="https://www.buymeacoffee.com/Robs"
          >
            <img
              className="bmcButtonImg"
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Kauf mir einen Kaffee"
            />
            <span style={{ marginLeft: 15, fontSize: 19 }}>
              Kauf mir einen Kaffee
            </span>
          </a>
        </Fieldset>
      </form>
    </React.Fragment>
  );
};

export default injectIntl(App);
