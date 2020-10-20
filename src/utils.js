/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
export const formatMoney = (a, n, x, s, c) => {
	var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
		num = a.toFixed(Math.max(0, ~~n));

	return (c ? num.replace(".", c) : num).replace(
		new RegExp(re, "g"),
		"$&" + (s || ",")
	);
};

export const str2Float = stringValue =>
	parseFloat(stringValue.replace(/[^\d]+/, ""));

export const formatNumber = n => {
	// format number 1000000 to 1,234,567
	return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const toDecimal = val => val.toFixed(Math.max(0, ~~2));

export const calcPricePerSQM = (price = 0, sqm = 0) => {
	return toDecimal(price / sqm);
};

export const calcCommissionAmt = (price = 0, commissionPct = 0) => {
	let res = parseFloat(0);

	if (commissionPct > 0) {
		res = price * (commissionPct / 100);
	}

	return toDecimal(res);
};

export const calcBuycostsAmt = (price = 0, buycostPct = 0) => {
	let res = parseFloat(0);

	if (buycostPct > 0) {
		res = price * (buycostPct / 100);
	}

	return toDecimal(res);
};

export const calcGrandTotalBuying = (
	price = 0,
	commissionPct = 0,
	buycostPct = 0
) => {
	let res = parseFloat(price);
	if (commissionPct > 0) {
		res = res + res * (commissionPct / 100);
	}
	if (buycostPct > 0) {
		res = res + res * (buycostPct / 100);
	}

	return toDecimal(res);
};

export const calcInterestPerMonthAmt = (totalCredit = 0, interestPct = 0) =>
	parseFloat((totalCredit * interestPct) / 100 / 12);
export const calcRepaymentPerMonthAmt = (totalCredit = 0, repayPct = 0) =>
	parseFloat((totalCredit * repayPct) / 100 / 12);
