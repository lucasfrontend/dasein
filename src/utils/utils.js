import moment from 'moment'

export function getCurrentDate() {
  return moment().format('dddd, MMMM Do YYYY')
}

export function convertToDollars(value, dolarBlue) {
  const dollarValue = parseFloat(dolarBlue);
  const amount = parseFloat(value);

  if (isNaN(dollarValue) || isNaN(amount) || dollarValue === 0) {
    throw new Error("Los valores proporcionados son inválidos.");
  }

  const dollars = amount / dollarValue;
  return dollars.toFixed(2); // Redondear a 2 decimales
}

export function convertToArgs(dollars, dolarBlue) {
  const dollarValue = parseFloat(dolarBlue);
  const dollarsAmount = parseFloat(dollars);

  if (isNaN(dollarValue) || isNaN(dollarsAmount) || dollarValue === 0) {
    console.error("Error: Los valores proporcionados son inválidos.", dollarValue, dollarsAmount);
    throw new Error("Los valores proporcionados son inválidos.");
  }

  const pesos = dollarsAmount * dollarValue;
  return pesos;
}


export function formatDate(format, date) {
  var fec = date.substring(0, 10);
  var separator = "/",
    formatSeparator = "/";
  if (fec.indexOf("-") > -1) separator = "-";
  if (format.indexOf("-") > -1) formatSeparator = "-";
  if (!date) return null;
  const [year, month, day] = fec.split(separator);
  var formated = `${day}${formatSeparator}${month}${formatSeparator}${year}`;

  if (format === "yyyy-mm-dd" || format === "yyyy/mm/dd") {
    formated = `${year}${formatSeparator}${month}${formatSeparator}${day}`;
  }

  if (format === "dd-mm-yyyy" || format === "dd/mm/yyyy") {
    formated = `${day}${formatSeparator}${month}${formatSeparator}${year}`;
  }

  return formated;
}


export function getExpirationColor(expirationDate) {
  const currentDate = moment();
  const expiration = moment(expirationDate, 'DD/MM/YYYY');

  const diffInDays = expiration.diff(currentDate, 'days');

  console.log("diffInDays", diffInDays)

  if (diffInDays < 0) {
    return "red"; // Vencido (color rojo)
  } else if (diffInDays === 0) {
    return "red"; // Vence hoy (color rojo)
  } else if (diffInDays <= 7) {
    return "orange"; // Faltan menos de una semana (color naranja)
  } else {
    return "green"; // Aún no vencido (color verde)
  }
}
/*
export function getColorWithin180Days(date) {
  const currentDate = moment();
  const startDate = moment(date, 'DD/MM/YYYY');
  const diffInDays = currentDate.diff(startDate, 'days');

  if (diffInDays <= 7) {
    return "orange"; // Faltan menos de una semana para que se cumplan los 180 días (color naranja)
  } else if (diffInDays >= 180) {
    return "red"; // Han pasado 180 días o más desde la fecha (color rojo)
  } else {
    return "green"; // Dentro del plazo de 180 días (color verde)
  }
}
*/
export function getColorWithin180Days(date) {
  const currentDate = moment();
  const startDate = moment(date, 'DD/MM/YYYY');
  const diffInDays = currentDate.diff(startDate, 'days');

  if (diffInDays >= 173 && diffInDays <= 179) {
    return "orange"; // Faltan exactamente 7 días para que se cumplan los 180 días (color naranja)
  } else if (diffInDays >= 180) {
    return "red"; // Han pasado 180 días o más desde la fecha (color rojo)
  } else {
    return "green"; // Dentro del plazo de 180 días (color verde)
  }
}

export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}