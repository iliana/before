/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useContext } from "react";
import { getTeam } from "../lib/teams";
import { LineScoreData } from "../pages/_app";
import Image from "./image";
import salmonIcon from "./salmon.png";

function overflowCheck({ target }) {
  const { classList } = target.parentElement;
  if (target.scrollWidth > target.offsetWidth) {
    if (target.scrollLeft > 0) {
      classList.add("tw-before-overflow-left");
    } else {
      classList.remove("tw-before-overflow-left");
    }
    if (target.scrollLeft < target.scrollWidth - target.offsetWidth) {
      classList.add("tw-before-overflow-right");
    } else {
      classList.remove("tw-before-overflow-right");
    }
  }
}

export default function LineScore({ id, salmon = {} }) {
  const { season, day, away, home } = useContext(LineScoreData)[id];
  const container = useRef(null);

  useEffect(() => {
    overflowCheck({ target: container.current });
  }, []);

  return (
    <div className="tw-before-linescore-fade">
      <div
        className="tw-w-full tw-max-w-full tw-overflow-x-auto tw-my-2 lg:tw-my-3"
        onScroll={overflowCheck}
        ref={container}
      >
        <table className="tw-font-sans tw-whitespace-nowrap tw-text-sm lg:tw-text-base tw-mx-auto">
          <thead>
            <tr className="tw-text-xs lg:tw-text-sm">
              <td />
              <td className="tw-font-bold tw-pr-1 lg:tw-pr-2">
                S{season}/{day}
              </td>
              {away.innings.map((_1, index) =>
                ((salmon.away ?? {})[index + 1] ?? [0]).map((_2, salmonIndex) => (
                  <Header key={`${index}.${salmonIndex}`}>
                    {salmonIndex % 2 ? (
                      <div className="tw-h-2.5 lg:tw-h-3.5 tw-px-0.5 lg:tw-px-1">
                        <Image alt="Salmon" src={salmonIcon} />
                      </div>
                    ) : (
                      index + 1
                    )}
                  </Header>
                ))
              )}
              <Header>
                <abbr title="Runs">R</abbr>
              </Header>
              <Header>
                <abbr title="Hits">H</abbr>
              </Header>
            </tr>
          </thead>
          <tbody>
            <LineScoreRow team={away} innings={away.innings.length} salmon={salmon.away ?? {}} />
            <LineScoreRow team={home} innings={away.innings.length} salmon={salmon.home ?? {}} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LineScoreRow({ team, innings, salmon }) {
  const teamData = getTeam({ id: team.id });
  return (
    <tr>
      <td className="tw-pr-1">{teamData.emoji}</td>
      <th className="tw-text-left tw-pr-1 lg:tw-pr-2">{teamData.shorthand}</th>
      {team.innings.map((runs, index) => {
        if (salmon[index + 1]) {
          if (salmon[index + 1].reduce((acc, x) => acc + x, 0) !== runs) {
            throw new Error(
              `salmon runs reported (${salmon[index + 1]}) not equal to total runs in statsheet (${runs}) for inning ${
                index + 1
              }`
            );
          }
          return salmon[index + 1].map((salmonRuns, salmonIndex) => (
            <Cell key={`${index}.${salmonIndex}`}>{salmonRuns}</Cell>
          ));
        }
        return <Cell key={index}>{runs}</Cell>;
      })}
      {[...Array(innings - team.innings.length)].map((_, index) => (
        <Cell key={index}>&times;</Cell>
      ))}
      <Cell bold>{team.innings.reduce((a, b) => a + b, 0)}</Cell>
      <Cell bold>{team.hits}</Cell>
    </tr>
  );
}

function Header({ children }) {
  return <th className="tw-tabular-nums">{children}</th>;
}

function Cell({ bold, children }) {
  return (
    <td
      className={`tw-text-center tw-px-1 tw-w-6 tw-min-w-[1.5rem] lg:tw-w-7 lg:tw-min-w-[1.75rem] tw-tabular-nums ${
        bold ? "tw-font-bold" : ""
      }`.trim()}
    >
      {!Number.isNaN(children) && children < 0 ? <>&minus;{Math.abs(children)}</> : children}
    </td>
  );
}
