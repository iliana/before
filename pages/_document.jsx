import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="tw-before-scope">
      <Head>
        <link rel="icon" href="/static/media/favicon-32x32.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="&#x1FA78; Do you remember before? &#x1FA78;" />
        <title>Before</title>
      </Head>
      <body className="tw-bg-black tw-text-white tw-text-dev lg:tw-text-lg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
