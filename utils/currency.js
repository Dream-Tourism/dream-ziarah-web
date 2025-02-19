const host = "api.frankfurter.app";

async function convertCurrencyFromApi(amount = 0, from = "USD", to) {
  const response = await fetch(
    `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data for price ${price}`);
  }
  const result = await response.json();
  return result?.rates[to].toFixed(2);
}

async function generateToursForCurrentCurrency(tours = [], from = "USD", to) {
  try {
    const responses = await Promise.all(
      tours.map(async (tour) => {
        const data = await convertCurrencyFromApi(tour.price, from, to);
        return {
          ...tour,
          price: data,
        };
      })
    );

    return responses;
  } catch (_error) {}
}

const defaultExchangeRates = {
  USD: 1,
  AED: 3.6725,
  AFN: 70.2965,
  ALL: 95.3816,
  AMD: 402.0042,
  ANG: 1.79,
  AOA: 839.2174,
  ARS: 357.01,
  AUD: 1.5245,
  AWG: 1.79,
  AZN: 1.6978,
  BAM: 1.794,
  BBD: 2.0,
  BDT: 110.1974,
  BGN: 1.7941,
  BHD: 0.376,
  BIF: 2839.9154,
  BMD: 1.0,
  BND: 1.3408,
  BOB: 6.8409,
  BRL: 4.9004,
  BSD: 1.0,
  BTN: 83.3458,
  BWP: 13.6254,
  BYN: 3.1775,
  BZD: 2.0,
  CAD: 1.3694,
  CDF: 2479.9228,
  CHF: 0.8842,
  CLP: 877.6477,
  CNY: 7.1492,
  COP: 4056.9515,
  CRC: 525.0323,
  CUP: 24.0,
  CVE: 101.1432,
  CZK: 22.3641,
  DJF: 177.721,
  DKK: 6.8408,
  DOP: 56.2003,
  DZD: 133.6094,
  EGP: 31.0194,
  ERN: 15.0,
  ETB: 56.0786,
  EUR: 0.9173,
  FJD: 2.2373,
  FKP: 0.7977,
  FOK: 6.8411,
  GBP: 0.7977,
  GEL: 2.7098,
  GGP: 0.7977,
  GHS: 12.0249,
  GIP: 0.7977,
  GMD: 66.5366,
  GNF: 8573.3814,
  GTQ: 7.7381,
  GYD: 208.7964,
  HKD: 7.7985,
  HNL: 24.4028,
  HRK: 6.9112,
  HTG: 132.3534,
  HUF: 347.8474,
  IDR: 15541.9984,
  ILS: 3.7436,
  IMP: 0.7977,
  INR: 83.3404,
  IQD: 1307.8077,
  IRR: 41869.1028,
  ISK: 140.2857,
  JEP: 0.7977,
  JMD: 155.3585,
  JOD: 0.709,
  JPY: 149.5505,
  KES: 153.0539,
  KGS: 88.7513,
  KHR: 4103.1959,
  KID: 1.5246,
  KMF: 451.269,
  KRW: 1301.5695,
  KWD: 0.3078,
  KYD: 0.8333,
  KZT: 460.024,
  LAK: 20405.0041,
  LBP: 15000.0,
  LKR: 327.1368,
  LRD: 188.6852,
  LSL: 18.8198,
  LYD: 4.807,
  MAD: 10.1082,
  MDL: 17.7027,
  MGA: 4509.8472,
  MKD: 56.3605,
  MMK: 2073.812,
  MNT: 3433.0512,
  MOP: 8.0325,
  MRU: 39.6739,
  MUR: 43.9318,
  MVR: 15.4199,
  MWK: 1688.734,
  MXN: 17.1861,
  MYR: 4.6795,
  MZN: 63.8113,
  NAD: 18.8198,
  NGN: 798.4175,
  NIO: 36.1735,
  NOK: 10.7683,
  NPR: 133.3533,
  NZD: 1.6539,
  OMR: 0.3845,
  PAB: 1.0,
  PEN: 3.74,
  PGK: 3.69,
  PHP: 55.3714,
  PKR: 282.4172,
  PLN: 4.0036,
  PYG: 7376.2744,
  QAR: 3.64,
  RON: 4.559,
  RSD: 107.491,
  RUB: 88.458,
  RWF: 1263.0714,
  SAR: 3.75,
  SBD: 8.4983,
  SCR: 13.5302,
  SDG: 559.1342,
  SEK: 10.4931,
  SGD: 1.3411,
  SHP: 0.7977,
  SLE: 22.3701,
  SLL: 22370.1249,
  SOS: 570.4866,
  SRD: 38.0741,
  SSP: 1068.5584,
  STN: 22.4732,
  SYP: 12778.1142,
  SZL: 18.8198,
  THB: 35.2766,
  TJS: 10.9224,
  TMT: 3.493,
  TND: 3.1075,
  TOP: 2.3633,
  TRY: 28.8411,
  TTD: 6.7244,
  TVD: 1.5246,
  TWD: 31.5419,
  TZS: 2501.045,
  UAH: 36.041,
  UGX: 3760.4464,
  UYU: 38.9905,
  UZS: 12277.9637,
  VES: 35.4854,
  VND: 24176.4971,
  VUV: 120.2496,
  WST: 2.7334,
  XAF: 601.692,
  XCD: 2.7,
  XDR: 0.7509,
  XOF: 601.692,
  XPF: 109.4601,
  YER: 247.3071,
  ZAR: 18.82,
  ZMW: 23.3578,
  ZWL: 5765.8004,
};

const convertCurrency = (amount = 0, fromCurrency = "USD", toCurrency) => {
  const exchangeRates = defaultExchangeRates;

  if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];

    return convertedAmount.toFixed(2);
  } else {
    return "Currency not supported";
  }
};

export default convertCurrency;
