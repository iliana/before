import React, { useContext } from "react";

export const JumpDefaults = React.createContext({});

export function Jump({ children, className, ...jump }) {
  const params = { ...useContext(JumpDefaults), ...jump };

  if (
    params.time === undefined &&
    (params.day === undefined || (params.season === undefined && params.tournament === undefined))
  ) {
    return children;
  }

  if (params.redirect === undefined) {
    const expansion =
      (params.season && params.season >= 12) || (params.time && new Date(params.time).getTime() >= 1614571800000);
    params.redirect = expansion ? "/league" : "/";
  }

  return (
    <a className={className} href={`/_before/jump?${new URLSearchParams(params)}`}>
      {children}
    </a>
  );
}
