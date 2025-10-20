import { useState } from "react";
import { submitUtility } from "./actions/submitUtility";
import { isValidUtilityNumber } from "./helpers/validateUtility";
import appendIDToFormData from "./helpers/appendIDToFormData";

const UtilityForm = ({ knownUtilities }: { knownUtilities: string[] }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const accountNumber = formData.get("accountNumber");
    const validUAN = isValidUtilityNumber(
      knownUtilities[0],
      accountNumber as string
    );

    if (!validUAN) {
      setError("Invalid account number for the selected utility.");
      return;
    }

    const formDataWithID = appendIDToFormData(formData);

    const result = await submitUtility(formDataWithID); // server-side code

    if (result.success) {
      setSuccess(true);
    }

    if (result.errors) {
      setError(Object.values(result.errors).flat().join(", "));
    }
  };

  if (success) {
    return (
      <p className="text-green-600">
        Utility information submitted successfully!
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="accountNumber" className="font-medium">
          {knownUtilities[0]} Account Number
        </label>
        <p className="text-sm text-gray-500">
          Please enter your account number for your utility provider.
        </p>
        <input
          id="accountNumber"
          name="accountNumber"
          type="text"
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Assistance Program</label>
        <p className="text-sm text-gray-500">
          Please select any assistance programs you are enrolled in.
        </p>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="medicaid" />
          Medicaid
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="snap" />
          SNAP
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
      {/* ENHANCEMENT: Add an icon to make this more accessible */}
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default UtilityForm;
