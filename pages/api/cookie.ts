import { NextApiResponse, NextApiRequest } from "next";
import { serialize, CookieSerializeOptions } from "cookie";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.status(200).json({});
  }

  if (req.method === "GET") {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const domain = "localhost";

    res.setHeader("Set-Cookie", [
      createCookies("AvailableCookie", "AvailableCookieValue", {
        httpOnly: false,
        expires: expirationDate,
        path: "/",
        domain,
      }),
      createCookies("NotReadableCookie", "NotReadableValue", {
        httpOnly: true,
        expires: expirationDate,
        path: "/",
        domain,
      }),
      createCookies("__Secure-Cookie", "cookie-value", {
        expires: expirationDate,
        path: "/",
        secure: true,
      }),
    ]);
    res.status(200).json({ data: {} });
  }
};

const createCookies = (
  key: string,
  value: string,
  options: CookieSerializeOptions
): string => {
  return serialize(key, value, options);
};

export default handler;
