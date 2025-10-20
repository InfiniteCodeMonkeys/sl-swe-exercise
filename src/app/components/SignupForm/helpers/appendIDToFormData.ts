import { isLocalStorageEnabled } from "./isLocalStorageEnabled";

const appendIDToFormData = (formData: FormData): FormData => {
  if (isLocalStorageEnabled()) {
    const SL_MARKETING_ID = localStorage.getItem("SL_MARKETING_ID");

    if (SL_MARKETING_ID) {
      formData.append("userID", SL_MARKETING_ID);
    } else {
      const newID = crypto.randomUUID();
      localStorage.setItem("SL_MARKETING_ID", newID);
      formData.append("userID", newID);
    }
  } else {
    const newID = crypto.randomUUID();
    localStorage.setItem("SL_MARKETING_ID", newID);
    formData.append("userID", newID);
  }

  return formData;
};

export default appendIDToFormData;
