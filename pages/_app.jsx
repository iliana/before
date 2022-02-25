import Head from "next/head";
import "../styles/styles.css";
import Nav from "../components/nav";

export default function App({ Component, pageProps }) {
  const navProps = Component.beforeNavProps ?? { open: true, hideSkip: true };
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
