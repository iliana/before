import { useState } from "react";

export default function Spoiler({ children }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`${
        revealed
          ? "tw-bg-gray-800 tw-text-white tw-cursor-auto"
          : "tw-bg-gray-700 hover:tw-bg-gray-600 tw-text-transparent selection:tw-text-white"
      } tw-rounded`}
      aria-label="Spoiler"
      aria-expanded={revealed ? "true" : "false"}
      role="button"
      tabIndex={0}
      onClick={() => setRevealed(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setRevealed(true);
        }
      }}
    >
      {children}
    </span>
  );
}
