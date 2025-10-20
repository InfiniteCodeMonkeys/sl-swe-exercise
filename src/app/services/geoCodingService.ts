import { GEOCODING_URL } from "../consts/urls";

const geoCodingService = async (address: {
  address: string;
  city: string;
  state: string;
  zip: string;
}) => {
  const params = new URLSearchParams({
    address: `${address.address}, ${address.city}, ${address.state} ${address.zip}`,
    benchmark: "4",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch geocoding data");
  }

  const data = await response.json();

  const matchedAddresses = data.result.addressMatches[0].matchedAddress;

  if (!matchedAddresses) {
    throw new Error("Invalid address");
  }
  return matchedAddresses;
};

export default geoCodingService;
