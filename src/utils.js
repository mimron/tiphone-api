import crypto from "crypto";

export const encrypt = (data, privateKey) => {
  const hmac = crypto.sign('RSA-SHA256', data, privateKey).toString("base64");
  return hmac;
};

export const getDateTime = () => {
  let local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local;
};