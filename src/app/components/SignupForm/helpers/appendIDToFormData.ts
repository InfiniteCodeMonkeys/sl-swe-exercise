import { isLocalStorageEnabled } from "./isLocalStorageEnabled";
import { v4 as uuidv4 } from "uuid";

const addMissingIDToLocalStorage = (): string => {
  const newID = uuidv4();
  localStorage.setItem("SL_MARKETING_ID", newID);
  return newID;
};

const appendIDToFormData = (formData: FormData): FormData => {
  if (isLocalStorageEnabled()) {
    const SL_MARKETING_ID = localStorage.getItem("SL_MARKETING_ID");

    if (SL_MARKETING_ID) {
      formData.append("userID", SL_MARKETING_ID);
    } else {
      const newID = addMissingIDToLocalStorage();
      formData.append("userID", newID);
    }
  } else {
    const newID = addMissingIDToLocalStorage();
    formData.append("userID", newID);
  }

  return formData;
};

export default appendIDToFormData;
