import Document, { Html, Head, Main, NextScript } from "next/document";
import { MODAL_PORTAL_DOM_ID } from "constants/global";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id={MODAL_PORTAL_DOM_ID} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
