export const addAutoComma = (value: string) => {
  var removeChar = value.replace(/[^0-9\.]/g, "");
  var removeDot = removeChar.replace(/\./g, ""); // This is to remove "DOT"
  var formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatedNumber;
};

export const removeComma = (value: string) => {
  var removeChar = value.replace(/[^0-9\.]/g, "");
  var removeDot = removeChar.replace(/\./g, "");
  return removeDot;
};
