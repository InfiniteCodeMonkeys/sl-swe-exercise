"use server";
import geoCodingService from "@/app/services/geoCodingService";
import { validateAddressFormData } from "../actions/helpers/validateFormData";
import utilityRatesService from "@/app/services/utilityRatesService";
import { writeToDB } from "./helpers/writeToDB";

export async function submitAddress(formData: FormData) {
  const schemaResult = validateAddressFormData(formData);
  if (!schemaResult.success || !schemaResult.data) {
    return { success: false, errors: schemaResult.errors };
  }

  // validate address with geocoding API
  try {
    const matchedAddress = await geoCodingService({
      address: schemaResult.data.address,
      city: schemaResult.data.city,
      state: schemaResult.data.state,
      zip: schemaResult.data.zip,
    });

    const userID = formData.get("userID");

    await writeToDB(userID as string, schemaResult.data);

    // ENHANCEMENT: Have user verify address instead if multiple matches found

    const utility = await utilityRatesService(matchedAddress);

    return { success: true, utilities: [utility] };
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid address") {
      return { success: false, errors: { address: ["Invalid address"] } };
    }

    if (
      error instanceof Error &&
      error.message === "Failed to fetch geocoding data"
    ) {
      return {
        success: false,
        errors: { address: ["Failed to fetch geocoding data"] },
      };
    }
  }

  // return utilities if valid address

  // Do something with the data (e.g., save to DB)
  return { success: true, utilities: ["Electricity", "Water", "Internet"] };
}
