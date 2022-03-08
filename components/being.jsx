import React, { useContext } from "react";

export const Quoted = React.createContext(false);

function makeBeing(cls, options) {
  const { quoteClass, innerClass } = options ?? {};
  const className = `tw-font-client-serif tw-font-medium ${cls ?? ""}`.trim();
  const innerClassName = `group-hover:tw-underline ${innerClass ?? ""}`.trim();
  return function Being({ quoted, children }) {
    const defaultQuoted = useContext(Quoted);
    return (
      <span className={className}>
        {quoted ?? defaultQuoted ? <Maybe className={quoteClass}>“</Maybe> : null}
        <span className={innerClassName}>{children}</span>
        {quoted ?? defaultQuoted ? <Maybe className={quoteClass}>”</Maybe> : null}
      </span>
    );
  };
}

function Maybe({ className, children }) {
  return className ? <span className={className}>{children}</span> : children;
}

export const Peanut = makeBeing("tw-text-[red]");
export const Monitor = makeBeing("tw-text-[#5988ff] [text-shadow:0_0_0.5em_#5988ff]");
export const Wyatt = makeBeing(null, { quoteClass: "tw-text-[#ff007b]" });
export const Alert = makeBeing("tw-italic");
export const Coin = makeBeing("tw-text-[#ffbe00]");
export const Reader = makeBeing("tw-text-[#a16dc3] [text-shadow:0_0_0.5em_#a16dc3]");
export const Lootcrates = makeBeing("tw-italic tw-text-[#b3b3b3]");
export const Namerifeht = makeBeing("tw-text-[#ea5b23]", {
  innerClass: "tw-inline-block tw-scale-x-[-1] [unicode-bidi:bidi-override] [direction:rtl]",
});
export const Parker = makeBeing(null, { quoteClass: "tw-text-[#ff007b]", innerClass: "tw-font-sans tw-font-normal" });
