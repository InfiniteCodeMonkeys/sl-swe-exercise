import { validateUtilityFormData } from "./helpers/validateFormData";
import { writeToDB } from "./helpers/writeToDB";

export async function submitUtility(formData: FormData) {
  const schemaResult = validateUtilityFormData(formData);
  if (!schemaResult.success || !schemaResult.data) {
    return { success: false, errors: schemaResult.errors };
  }

  // ENHANCEMENT: Add server-side validation for utility account number format

  // ENHANCEMENT: Encrypt utility account number before storing

  const userID = formData.get("userID");

  await writeToDB(userID as string, schemaResult.data);
  return { success: true };
}
