import bs58 from "bs58";
import nacl from "tweetnacl";

// --- Helper: Build URL ---
export const solflareBuildUrl = (path: string, params: URLSearchParams) => {
  return `https://solflare.com/ul/v1/${path}?${params.toString()}`;
};

// --- Helper: Decrypt ---
export const solflareDecryptPayload = (
  data: string,
  nonce: string,
  secret: Uint8Array
) => {
  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    secret
  );
  if (!decryptedData) throw new Error("Unable to decrypt data");
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};

// --- Helper: Encrypt ---
export const solflareEncryptPayload = (payload: any, secret: Uint8Array) => {
  const nonce = nacl.randomBytes(24);
  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    secret
  );
  return [nonce, encryptedPayload];
};
