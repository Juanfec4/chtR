//Check if payload has keys
export const isValidPayload = <T>(payload: T, keys: string[]): boolean => {
  //Check for payload type
  if (typeof payload !== "object" || payload === null) return false;

  // Check if all keys are present in the payload
  const payloadKeys = Object.keys(payload);
  const hasAllKeys = keys.every((key) => payloadKeys.includes(key));

  return hasAllKeys;
};

//Check if any value is undefined
export const hasUndefined = <T>(items: Array<T>): boolean => {
  //Check if contains undefined
  let containsUndefined = items.some((item) => typeof item === "undefined");
  return containsUndefined;
};

//Check if password is valid
export const isValidPassword = (password: string): boolean => {
  //Password regex
  let passwordRegex = RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\\]:;<>,.?/~_+-=|]).{8,32}$"
  );

  return passwordRegex.test(password);
};
