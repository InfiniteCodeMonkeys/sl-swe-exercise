import { z } from "zod";

const addressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
});

const utilitySchema = z.object({
  accountNumber: z.string().min(1),
  medicaid: z.preprocess((val) => (val === "on" ? true : false), z.boolean()),
  snap: z.preprocess((val) => (val === "on" ? true : false), z.boolean()),
});

const validateAddressFormData = (formData: FormData) => {
  const schemaResult = addressSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
  });

  if (!schemaResult.success) {
    return { success: false, errors: schemaResult.error.flatten().fieldErrors };
  }

  return { success: true, data: schemaResult.data };
};

const validateUtilityFormData = (formData: FormData) => {
  const schemaResult = utilitySchema.safeParse({
    accountNumber: formData.get("accountNumber"),
    medicaid: formData.get("medicaid"),
    snap: formData.get("snap"),
  });

  if (!schemaResult.success) {
    return { success: false, errors: schemaResult.error.flatten().fieldErrors };
  }
  return { success: true, data: schemaResult.data };
};

export { validateAddressFormData, validateUtilityFormData };
