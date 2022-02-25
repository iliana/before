import { getTeam } from "../lib/teams";

export default function LineScore({ season, day, away, home }) {
  return (
    <div className="tw-w-full tw-max-w-full tw-overflow-x-auto tw-my-2 lg:tw-my-3">
      <table className="tw-font-sans tw-whitespace-nowrap tw-text-sm lg:tw-text-base tw-mx-auto">
        <thead>
          <tr className="tw-text-xs lg:tw-text-sm">
            <td />
            <td className="tw-font-bold">
              S{season}/{day}
            </td>
            {away.innings.map((_, i) => (
              <>
                {/* eslint-disable-next-line react/jsx-key */}
                <th className="tw-w-7 tw-px-1">{i + 1}</th>
              </>
            ))}
            <th className="tw-w-7 tw-px-1">
              <abbr title="Runs">R</abbr>
            </th>
            <th className="tw-w-7 tw-px-1">
              <abbr title="Hits">H</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <LineScoreRow team={away} />
          <LineScoreRow team={home} />
        </tbody>
      </table>
    </div>
  );
}

function minus(count) {
  return count < 0 ? <>&minus;{Math.abs(count)}</> : count;
}

function LineScoreRow({ team }) {
  const teamData = getTeam({ id: team.id });
  return (
    <tr>
      <td className="tw-pr-1">{teamData.emoji}</td>
      <th className="tw-text-left tw-pr-2">{teamData.shorthand}</th>
      {team.innings.map((runs) => (
        <>
          {/* eslint-disable-next-line react/jsx-key */}
          <td className="tw-text-center tw-px-1">{minus(runs)}</td>
        </>
      ))}
      <td className="tw-text-center tw-font-bold tw-px-1">{minus(team.innings.reduce((a, b) => a + b, 0))}</td>
      <td className="tw-text-center tw-font-bold tw-px-1">{minus(team.hits)}</td>
    </tr>
  );
}
