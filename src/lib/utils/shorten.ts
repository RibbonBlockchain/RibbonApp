export const shorten = (address: string | undefined) => {
  if (!address) return "";
  return `${address.substring(0, 8)}...${address.substring(
    address.length - 5,
    address.length
  )}`;
};

export const shortenTransaction = (address: string | undefined) => {
  if (!address) return "";
  return `${address.substring(0, 14)}...${address.substring(
    address.length - 10,
    address.length
  )}`;
};
