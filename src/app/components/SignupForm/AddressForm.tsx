import React, { Dispatch, SetStateAction, useState } from "react";
import { submitAddress } from "./actions/submitAddress";
import { isLocalStorageEnabled } from "./helpers/isLocalStorageEnabled";
import crypto from "crypto";
import appendIDToFormData from "./helpers/appendIDToFormData";

const AddressForm = ({
  setKnownUtilities,
}: {
  setKnownUtilities: Dispatch<SetStateAction<string[]>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formDataWithID = appendIDToFormData(formData);
    const result = await submitAddress(formDataWithID); // server-side code

    if (result.utilities) {
      setKnownUtilities(result.utilities);
    }

    if (result.errors) {
      setError(Object.values(result.errors).flat().join(", "));
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="firstName" className="font-medium">
          First Name
        </label>
        <p className="text-sm text-gray-500">Enter your given name.</p>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="font-medium">
          Last Name
        </label>
        <p className="text-sm text-gray-500">Enter your family name.</p>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="address" className="font-medium">
          Address
        </label>
        <p className="text-sm text-gray-500">
          Street address, including apartment or suite number.
        </p>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="city" className="font-medium">
          City
        </label>
        <p className="text-sm text-gray-500">Enter your city.</p>
        <input
          id="city"
          name="city"
          type="text"
          autoComplete="address-level2"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="state" className="font-medium">
          State
        </label>
        <p className="text-sm text-gray-500">Enter your state or province.</p>
        <input
          id="state"
          name="state"
          type="text"
          autoComplete="address-level1"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="zip" className="font-medium">
          ZIP Code
        </label>
        <p className="text-sm text-gray-500">Enter your postal code.</p>
        <input
          id="zip"
          name="zip"
          type="text"
          autoComplete="postal-code"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Next
      </button>

      {/* ENHANCEMENT: Add an icon to make this more accessible */}
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default AddressForm;
