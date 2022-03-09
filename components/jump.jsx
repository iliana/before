import dayjs from "dayjs";
import React, { useContext } from "react";

const expansionEpoch = dayjs("2021-03-01T04:10:00Z");

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
    const expansion = (params.season && params.season >= 12) || (params.time && expansionEpoch.isBefore(params.time));
    params.redirect = expansion ? "/league" : "/";
  }

  return (
    <a className={className} href={`/_before/jump?${new URLSearchParams(params)}`}>
      {children}
    </a>
  );
}
