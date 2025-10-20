export const isValidUtilityNumber = (utility: string, uan: string) => {
  const isAllNumbers = /^\d+$/.test(uan);

  if (utility === "PSEG" && uan.length !== 10 && !isAllNumbers) {
    return false;
  }

  if (utility === "JCPL" && uan.length !== 12 && !isAllNumbers) {
    return false;
  }

  return true;
};
