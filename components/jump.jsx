import dayjs from "dayjs";
import React, { useContext } from "react";

const expansionEpoch = dayjs("2021-03-01T04:10:00Z");
const electionTimes = {
  2: "2020-08-02T19:15:00Z",
  3: "2020-08-09T19:30:00Z",
  4: "2020-08-30T19:15:00Z",
  5: "2020-09-06T19:15:00Z",
  6: "2020-09-13T19:30:00Z",
  7: "2020-09-20T19:30:00Z",
  8: "2020-09-27T19:30:00Z",
  9: "2020-10-11T19:15:00Z",
  10: "2020-10-18T19:30:00Z",
  11: "2020-10-25T19:15:00Z",
  12: "2021-03-07T19:15:00Z",
  13: "2021-03-14T19:15:00Z",
  14: "2021-03-21T18:15:00Z",
  15: "2021-04-11T18:30:00Z",
  16: "2021-04-18T18:15:00Z",
  17: "2021-04-25T18:15:00Z",
  18: "2021-05-16T18:15:00Z",
  19: "2021-05-23T18:15:00Z",
  20: "2021-06-20T18:15:00Z",
  21: "2021-06-27T18:15:00Z",
  22: "2021-07-04T18:20:00Z",
  23: "2021-07-25T18:15:00Z",
};

export const JumpDefaults = React.createContext({});

export function Jump({ children, className, election, ...jump }) {
  const defaults = useContext(JumpDefaults);
  const electionTime = electionTimes[election === true ? defaults.season : election];
  const params = {
    ...defaults,
    ...(electionTime ? { time: electionTime, redirect: "/offseason" } : {}),
    ...jump,
  };

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
