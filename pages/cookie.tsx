import Button from "components/Button";
import { ButtonVariant } from "components/Button/Button";
import { useEffect } from "react";

const Cookie = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`http://localhost:3000/api/cookie`);
    const parsedCookies = parseCookies();
    console.log(parsedCookies);
  };

  const onButtonClick = async () => {
    await fetch("http://localhost:3000/api/cookie", { method: "POST" });
  };

  const parseCookies = () => {
    const splitedCookies = document.cookie.split("; ");
    return Object.fromEntries(splitedCookies.map((item) => item.split("=")));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "110vh",
      }}
    >
      <Button variant={ButtonVariant.Contained} onClick={onButtonClick}>
        Send POST request
      </Button>
    </div>
  );
};

export default Cookie;
