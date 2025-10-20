"use client";

import { useEffect, useState } from "react";
import UtilityForm from "./UtilityForm";
import AddressForm from "./AddressForm";
import { isLocalStorageEnabled } from "./helpers/isLocalStorageEnabled";
import crypto from "crypto";

const SignupForm = () => {
  const [knownUtilities, setKnownUtilities] = useState<string[]>([]);

  useEffect(() => {
    if (isLocalStorageEnabled()) {
      const SL_MARKETING_ID = localStorage.getItem("SL_MARKETING_ID");

      if (!SL_MARKETING_ID) {
        const newID = crypto.randomUUID();
        localStorage.setItem("SL_MARKETING_ID", newID);
      }
    }
  }, []);

  return (
    <div>
      {!knownUtilities.length ? (
        <AddressForm setKnownUtilities={setKnownUtilities} />
      ) : (
        <UtilityForm knownUtilities={knownUtilities} />
      )}
    </div>
  );
};

export default SignupForm;
