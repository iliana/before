import { useState } from "react";

export default function Spoiler({ children }) {
  const [revealed, setRevealed] = useState(false);
  return revealed ? (
    <span className="tw-bg-gray-800 tw-text-white tw-cursor-[inherit] tw-rounded" role="presentation" tabIndex={-1}>
      {children}
    </span>
  ) : (
    <span
      className="tw-bg-gray-700 hover:tw-bg-gray-600 tw-text-transparent selection:tw-text-white tw-rounded"
      aria-label="Spoilier"
      aria-expanded={false}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        setRevealed(true);
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setRevealed(true);
          event.preventDefault();
        }
      }}
    >
      {children}
    </span>
  );
}
