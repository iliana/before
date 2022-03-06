import Head from "next/head";
import Nav from "../components/nav";
import "../styles/styles.css";

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
