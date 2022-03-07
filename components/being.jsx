function Being({ className, font, mic, children }) {
  const quoteClass = `tw-font-client-serif tw-font-medium ${mic ? "tw-text-[#ff007b]" : ""}`.trim();
  return (
    <span className={`${font ?? "tw-font-client-serif tw-font-medium"} ${className}`.trim()}>
      <span className={quoteClass}>“</span>
      <span className="group-hover:tw-underline">{children}</span>
      <span className={quoteClass}>”</span>
    </span>
  );
}

export function Peanut({ children }) {
  return <Being className="tw-text-[red]">{children}</Being>;
}

export function Monitor({ children }) {
  return <Being className="tw-text-[#5988ff] [text-shadow:0_0_0.5em_#5988ff]">{children}</Being>;
}

export function Wyatt({ children }) {
  return <Being mic>{children}</Being>;
}

export function Alert({ children }) {
  return <Being className="tw-italic">{children}</Being>;
}

export function Coin({ children }) {
  return <Being className="tw-text-[#ffbe00]">{children}</Being>;
}

export function Reader({ children }) {
  return <Being className="tw-text-[#a16dc3] [text-shadow:0_0_0.5em_#a16dc3]">{children}</Being>;
}

export function Lootcrates({ children }) {
  return <Being className="tw-italic tw-text-[#b3b3b3]">{children}</Being>;
}

export function Namerifeht({ children }) {
  return (
    <Being className="tw-text-[#ea5b23]">
      <span className="tw-inline-block tw-scale-x-[-1] [unicode-bidi:bidi-override] [direction:rtl] group-hover:tw-underline">
        {children}
      </span>
    </Being>
  );
}

export function Parker({ children }) {
  return (
    <Being mic font="tw-font-sans tw-font-normal">
      {children}
    </Being>
  );
}
