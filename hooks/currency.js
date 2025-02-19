

import { GET_LATEST_EXCHANGE_RATE } from "@/constant/constants";
import { useEffect, useState } from "react";
const useCurrencyExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  useEffect(() => {
    fetch(GET_LATEST_EXCHANGE_RATE)
      .then(resp => resp.json())
      .then((data) => {
        setExchangeRates(data?.conversion_rates)
      });
  }, []);

  return exchangeRates;
}

export default useCurrencyExchangeRates;