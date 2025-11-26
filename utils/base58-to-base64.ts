import bs58 from "bs58";

export const base58ToBase64 = (base58String: string): string => {
  const bytes = bs58.decode(base58String);

  const base64String = Buffer.from(bytes).toString("base64");

  return base64String;
};
