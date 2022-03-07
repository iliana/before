import Head from "next/head";
import React, { useMemo } from "react";
import Nav from "../components/nav";
import "../styles/styles.css";

export const LineScoreData = React.createContext();

export default function App({ Component, pageProps }) {
  const navProps = { open: true, hideSkip: true, ...Component.beforeNavProps };
  return (
    <LineScoreData.Provider value={useMemo(() => pageProps.linescores, [pageProps.linescores])}>
      <Head>
        <title>Before</title>
      </Head>
      <Nav {...navProps} />
      <Component {...pageProps} />
    </LineScoreData.Provider>
  );
}
