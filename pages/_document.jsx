import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="tw-before-scope">
      <Head>
        <link rel="icon" href="/static/media/favicon-32x32.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="tw-bg-black tw-text-white print:tw-text-black lg:tw-text-lg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
