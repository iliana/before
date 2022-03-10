/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import { useContext } from "react";
import { getTeam } from "../lib/teams";
import { LineScoreData } from "../pages/_app";
import salmonIcon from "./salmon.png";

export default function LineScore({ id, salmon = [] }) {
  const { season, day, away, home } = useContext(LineScoreData)[id];
  return (
    <div className="tw-w-full tw-max-w-full tw-overflow-x-auto tw-my-2 lg:tw-my-3">
      <table className="tw-font-sans tw-whitespace-nowrap tw-text-sm lg:tw-text-base tw-mx-auto">
        <thead>
          <tr className="tw-text-xs lg:tw-text-sm">
            <td />
            <td className="tw-font-bold">
              S{season}/{day}
            </td>
            {away.innings.map((_1, index) => {
              const salmonInning = salmon.find(({ inning }) => inning === index + 1);
              return salmonInning === undefined ? (
                <th key={index} className="tw-w-7 tw-px-1">
                  {index + 1}
                </th>
              ) : (
                salmonInning.away.map((_2, salmonIndex) => (
                  <th key={`${index}.${salmonIndex}`} className="tw-w-7 tw-px-1">
                    {salmonIndex % 2 === 0 ? (
                      index + 1
                    ) : (
                      <div className="tw-h-3 lg:tw-h-3.5 tw-align-bottom">
                        <Image alt="Salmon" src={salmonIcon} loader={({ src }) => src} unoptimized />
                      </div>
                    )}
                  </th>
                ))
              );
            })}
            <th className="tw-w-7 tw-px-1">
              <abbr title="Runs">R</abbr>
            </th>
            <th className="tw-w-7 tw-px-1">
              <abbr title="Hits">H</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <LineScoreRow which="away" team={away} innings={away.innings.length} salmon={salmon} />
          <LineScoreRow which="home" team={home} innings={away.innings.length} salmon={salmon} />
        </tbody>
      </table>
    </div>
  );
}

function minus(count) {
  return count < 0 ? <>&minus;{Math.abs(count)}</> : count;
}

function LineScoreRow({ which, team, innings, salmon }) {
  const teamData = getTeam({ id: team.id });
  return (
    <tr>
      <td className="tw-pr-1">{teamData.emoji}</td>
      <th className="tw-text-left tw-pr-2">{teamData.shorthand}</th>
      {team.innings.map((runs, index) => {
        const salmonInning = salmon.find(({ inning }) => inning === index + 1);
        return salmonInning === undefined ? (
          <td key={index} className="tw-text-center tw-px-1">
            {minus(runs)}
          </td>
        ) : (
          salmonInning[which].map((salmonRuns, salmonIndex) => (
            <td key={`${index}.${salmonIndex}`} className="tw-text-center tw-px-1">
              {minus(salmonRuns)}
            </td>
          ))
        );
      })}
      {[...Array(innings - team.innings.length)].map((_, index) => (
        <td key={index} className="tw-text-center tw-px-1">
          &times;
        </td>
      ))}
      <td className="tw-text-center tw-font-bold tw-px-1">{minus(team.innings.reduce((a, b) => a + b, 0))}</td>
      <td className="tw-text-center tw-font-bold tw-px-1">{minus(team.hits)}</td>
    </tr>
  );
}
