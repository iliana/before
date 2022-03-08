import Head from "next/head";
import Nav from "../components/nav";
import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  const navProps = { open: true, hideSkip: true, ...Component.beforeNavProps };
  return (
    <>
      <Head>
        <title>Before</title>
      </Head>
      <Nav {...navProps} />
      <Component {...pageProps} />
    </>
  );
}
