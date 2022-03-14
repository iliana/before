import ErrorPage from "../../components/404";

/* eslint-disable @next/next/no-sync-scripts */

export const config = {
  unstable_runtimeJS: false,
};

export default function Page() {
  return (
    <ErrorPage>
      <p>This page does not exist yet.</p>
      <p>
        You can{" "}
        <a href="/_before/jump?time=@@BEFORE_TIME@@" className="tw-underline">
          jump to when it does
        </a>
        .
      </p>
      <script src="/_before/client.js" />
    </ErrorPage>
  );
}

Page.beforeNavProps = { open: false, hideSkip: false };
