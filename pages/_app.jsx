import "../styles/styles.css";
import Nav from "../components/nav";

export default function App({ Component, pageProps }) {
  const navProps = Component.beforeNavProps ?? { open: true, hideSkip: true };
  return (
    <>
      <Nav {...navProps} />
      <Component {...pageProps} />
    </>
  );
}
