import React, { useContext } from "react";

export const JumpDefaults = React.createContext({});

export function Jump({ children, className, ...jump }) {
  const defaults = useContext(JumpDefaults);
  if (!jump) {
    return children;
  }

  const params = new URLSearchParams({
    redirect: jump.season && jump.season > 11 ? "/league" : "/",
    ...defaults,
    ...jump,
  });

  return (
    <a className={className} href={`/_before/jump?${params}`}>
      {children}
    </a>
  );
}
