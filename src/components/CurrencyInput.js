import React from "react";
import NumberFormat from "react-number-format";

const CurrencyInput = ({
	name = "",
	id = "",
	value = 0,
	changed = null,
	suffix = "€",
	disabled = false
}) => {
	return (
		<NumberFormat
			className="p-inputtext p-component p-inputnumber-input p-filled"
			name={name}
			id={id}
			value={value}
			thousandSeparator={true}
			suffix={suffix}
			disabled={changed == null}
			onValueChange={values => {
				const { floatValue } = values;
				changed && changed(floatValue);
			}}
		/>
	);
};

export default CurrencyInput;
