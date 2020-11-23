import "./App.css";
import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import { injectIntl } from "react-intl";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { parseImmoScout } from "./parser";
import CurrencyInput from "./components/CurrencyInput";
import {
  calcPricePerSQM,
  calcGrandTotalBuying,
  calcCommissionAmt,
  calcBuycostsAmt,
  calcInterestPerMonthAmt,
  calcRepaymentPerMonthAmt
} from "./utils";

const App = props => {
  const INTL = props.intl;
  let location = useLocation();
  const [price, setPrice] = useState(0);
  const [provision, setProvision] = useState(0.0);
  const [buyingcosts, setBuyingcosts] = useState(6.5);
  const [interest, setInterest] = useState(1.2); // Zins
  const [repayment, setRepayment] = useState(2); // Tilgung
  const [condoFee, setCondoFee] = useState(0.0); // Hausgeld
  const [rentIndex, setRentIndex] = useState(0.0); // Mietspiegel
  const [rent, setRent] = useState(0.0); // Mieteinnahmen
  const [livingSpace, setLivingSpace] = useState(0); // Wohnflaeche

  useEffect(() => {
    if (location) {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      if (params && params.hasOwnProperty("is")) {
        // get immoscout url
        console.log(parseImmoScout(params.is));
      }
    }
  }, [location]);

  const getBuyingCostsFormatted = () => {
    const costs = calcBuycostsAmt(price, buyingcosts);
    return formatCurrency(costs);
  };

  const getCommissionCostsFormatted = () => {
    const costs = calcCommissionAmt(price, provision);
    return formatCurrency(costs);
  };

  const formatCurrency = value =>
    INTL.formatNumber(value, {
      style: "currency",
      currency: "EUR"
    });

  const calcRendite = () => {
    return ((rent * 12 * 100) / parseFloat(price)).toFixed(2);
  };

  const proposeRent = () => {
    let wantedRent = (parseFloat(price) * 6) / 100 / 12;
    if (condoFee > 0) {
      wantedRent += condoFee;
    }
    setRent(Math.round(wantedRent));
    setRentIndex(livingSpace ? Math.round(wantedRent / livingSpace) : 0);
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
            <CurrencyInput
              id="fprice"
              value={price}
              changed={setPrice}
              name="fprice"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fprovision">Maklerprovision</label>
            <CurrencyInput
              id="fprovision"
              name="fprovision"
              value={provision}
              changed={setProvision}
              suffix="%"
            />
            <small id="fprovision-help" className="p-d-block">
              {getCommissionCostsFormatted()}
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fbuyingcosts">Kaufnebenkosten</label>
            <CurrencyInput
              id="fbuyingcosts"
              name="fbuyingcosts"
              value={buyingcosts}
              changed={setBuyingcosts}
              suffix="%"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              {getBuyingCostsFormatted()}
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="finterest">Zins p.a.</label>
            <CurrencyInput
              id="finterest"
              name="finterest"
              value={interest}
              changed={setInterest}
              suffix="%"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frepayment">Tilgung p.a.</label>
            <CurrencyInput
              id="frepayment"
              name="frepayment"
              value={repayment}
              changed={setRepayment}
              suffix="%"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="fcondoFee">Hausgeld</label>
            <CurrencyInput
              id="fcondoFee"
              name="fcondoFee"
              value={condoFee}
              changed={setCondoFee}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frentIndex">Mietspiegel €/m²</label>
            <CurrencyInput
              id="frentIndex"
              name="frentIndex"
              value={rentIndex}
              changed={e => {
                setRentIndex(e);
                if (livingSpace > 0) {
                  setRent(livingSpace * e);
                }
              }}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="frent">Mieteinnahmen / Monat</label>
            <CurrencyInput
              id="frent"
              name="frent"
              value={rent}
              changed={e => {
                setRent(e);
                if (livingSpace > 0) {
                  setRentIndex(e / livingSpace);
                }
              }}
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="flivingSpace">Wohnfläche</label>
            <CurrencyInput
              id="flivingSpace"
              name="flivingSpace"
              value={livingSpace}
              changed={e => {
                setLivingSpace(e);
                if (rent > 0) {
                  setRentIndex(rent / e);
                } else if (rentIndex > 0) {
                  setRent(e * rentIndex);
                }
              }}
              suffix="m²"
            />
            <small id="fbuyingcosts-help" className="p-d-block">
              &nbsp;
            </small>
          </div>
          <div className="p-field p-col-12 p-md-3 p-grid">
            <label htmlFor="ftotalamount">Gesamtsumme</label>
            <CurrencyInput
              id="ftotalamount"
              name="ftotalamount"
              value={calcGrandTotalBuying(price, provision, buyingcosts)}
              changed={null}
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
              <CurrencyInput
                id="fpriceperspace"
                name="fpriceperspace"
                value={calcPricePerSQM(price, livingSpace)}
                changed={null}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="finterestPerMonth">Zinsen / Monat</label>
              <CurrencyInput
                id="finterestPerMonth"
                name="finterestPerMonth"
                value={calcInterestPerMonthAmt(
                  calcGrandTotalBuying(price, provision, buyingcosts),
                  interest
                )}
                changed={null}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="frepaymentPerMonth">Tilgung / Monat</label>
              <CurrencyInput
                id="frepaymentPerMonth"
                name="frepaymentPerMonth"
                value={calcRepaymentPerMonthAmt(
                  calcGrandTotalBuying(price, provision, buyingcosts),
                  repayment
                )}
                changed={null}
              />
              <small id="fbuyingcosts-help" className="p-d-block">
                &nbsp;
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="fmonthlyCosts">Kosten / Monat</label>
              <CurrencyInput
                id="fmonthlyCosts"
                name="fmonthlyCosts"
                value={
                  calcRepaymentPerMonthAmt(
                    calcGrandTotalBuying(price, provision, buyingcosts),
                    repayment
                  ) +
                  calcInterestPerMonthAmt(
                    calcGrandTotalBuying(price, provision, buyingcosts),
                    interest
                  ) +
                  condoFee
                }
                changed={null}
              />
              <small id="fmonthlyCosts-help" className="p-d-block">
                {`Ohne NK: ${formatCurrency(
                  calcInterestPerMonthAmt(
                    calcGrandTotalBuying(price, provision, 0),
                    interest
                  ) +
                    calcRepaymentPerMonthAmt(
                      calcGrandTotalBuying(price, provision, 0),
                      repayment
                    ) +
                    condoFee
                )}`}
                <br />
                {`Ohne Hausgeld: ${formatCurrency(
                  calcInterestPerMonthAmt(
                    calcGrandTotalBuying(price, provision, 0),
                    interest
                  ) +
                    calcRepaymentPerMonthAmt(
                      calcGrandTotalBuying(price, provision, 0),
                      repayment
                    )
                )}`}
              </small>
            </div>
            <div className="p-field p-col-12 p-md-3 p-grid">
              <label htmlFor="fmonthlyCostsInvest">
                Kosten / Monat (Anlage)
              </label>
              <CurrencyInput
                id="fmonthlyCostsInvest"
                name="fmonthlyCostsInvest"
                value={
                  rentIndex && rentIndex > 0
                    ? calcRepaymentPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        repayment
                      ) +
                      calcInterestPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        interest
                      ) +
                      condoFee -
                      rentIndex * livingSpace
                    : calcRepaymentPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        repayment
                      ) +
                      calcInterestPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        interest
                      ) +
                      condoFee -
                      rent
                }
                changed={null}
              />
              <small id="fmonthlyCostsInvest-help" className="p-d-block">
                {`${calcRendite()} % - `}
                {parseFloat(
                  rentIndex && rentIndex > 0
                    ? calcRepaymentPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        repayment
                      ) +
                        calcInterestPerMonthAmt(
                          calcGrandTotalBuying(price, provision, buyingcosts),
                          interest
                        ) +
                        condoFee -
                        rentIndex * livingSpace
                    : calcRepaymentPerMonthAmt(
                        calcGrandTotalBuying(price, provision, buyingcosts),
                        repayment
                      ) +
                        calcInterestPerMonthAmt(
                          calcGrandTotalBuying(price, provision, buyingcosts),
                          interest
                        ) +
                        condoFee -
                        rent
                ) > 0 ? (
                  <span className="text-red">Verlust</span>
                ) : parseFloat(
                    rentIndex && rentIndex > 0
                      ? calcRepaymentPerMonthAmt(
                          calcGrandTotalBuying(price, provision, buyingcosts),
                          repayment
                        ) +
                          calcInterestPerMonthAmt(
                            calcGrandTotalBuying(price, provision, buyingcosts),
                            interest
                          ) +
                          condoFee -
                          rentIndex * livingSpace
                      : calcRepaymentPerMonthAmt(
                          calcGrandTotalBuying(price, provision, buyingcosts),
                          repayment
                        ) +
                          calcInterestPerMonthAmt(
                            calcGrandTotalBuying(price, provision, buyingcosts),
                            interest
                          ) +
                          condoFee -
                          rent
                  ) < 0 ? (
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
              onClick={proposeRent}
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
