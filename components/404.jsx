export default function ErrorPage({ children }) {
  return (
    <div className="tw-container tw-mx-auto tw-text-center tw-h-[80vh] tw-flex tw-flex-col tw-justify-center">
      <h1 className="tw-text-3xl lg:tw-text-4xl tw-my-1 lg:tw-my-2">
        <span className="tw-font-bold">404</span> Not Found
      </h1>
      {children}
    </div>
  );
}
