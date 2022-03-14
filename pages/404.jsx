import ErrorPage from "../components/404";

export const config = {
  unstable_runtimeJS: false,
};

export default function Page() {
  return (
    <ErrorPage>
      <p>This page does not exist.</p>
    </ErrorPage>
  );
}
