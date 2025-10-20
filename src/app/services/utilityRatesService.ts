// From https://openei.org/services/doc/rest/util_rates/?version=3#request-parameters

import { OPEN_EI_UTILITY_RATES_URL } from "../consts/urls";

const utilityRatesService = async (address: string) => {
  const addressParam = encodeURIComponent(address);

  const response = await fetch(
    `${OPEN_EI_UTILITY_RATES_URL}?version=7&format=json&api_key=${process.env.OPENEI_API_KEY}&address=${addressParam}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch utility rates");
  }
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("No utility rates found for the given address");
  }
  // ENHANCEMENT: Handle edge cases like multiple utilities returned for a given address
  return data.items[0].utility;
};

export default utilityRatesService;
