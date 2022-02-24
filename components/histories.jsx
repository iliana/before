import Jump from "./jump";

export function History({ id, name, emoji, color, slogan, authors, children }) {
  return (
    <>
      <div className="tw-font-client-serif tw-w-96 tw-max-w-max tw-mx-auto tw-my-6 lg:tw-my-8 tw-text-center">
        <div className="tw-flex tw-gap-x-2.5 tw-text-left">
          <div
            className="tw-text-[1.75rem] tw-leading-10 tw-h-10 tw-w-10 lg:tw-text-4xl lg:tw-leading-[3.75rem] lg:tw-h-[3.75rem] lg:tw-w-[3.75rem] tw-rounded-full tw-text-center"
            style={{ backgroundColor: color }}
          >
            {emoji}
          </div>
          <div>
            <h2 className="tw-text-[1.375rem] tw-leading-[1.65rem] lg:tw-text-2xl lg:tw-leading-[1.8rem]">{name}</h2>
            <div className="tw-italic tw-text-base">“{slogan}”</div>
          </div>
        </div>
        <button
          className="tw-mt-4 tw-rounded-full tw-cursor-pointer tw-border tw-border-white tw-font-bold tw-text-sm tw-h-8 tw-px-[15px] tw-py-[5px] hover:tw-opacity-80"
          style={{ backgroundColor: color }}
        >
          Change Favorite Team
        </button>
        <div className="tw-font-serif tw-text-sm lg:tw-text-base tw-mt-6">
          <span className="tw-italic">History compiled by:</span> {authors}
        </div>
      </div>
      <div className="tw-container tw-mx-auto">{children}</div>
    </>
  );
}

export function Entry({ date, title, jump, children }) {
  return (
    <div className="tw-my-6 lg:tw-my-8">
      <h3 className="tw-text-center tw-font-bold tw-text-xl lg:tw-text-2xl tw-mb-1.5 lg:tw-mb-2">
        <Jump className="hover:tw-no-underline tw-group" {...jump}>
          {date ? (
            <span className="tw-block tw-text-sm lg:tw-text-base tw-uppercase">
              {date}
              <span className="tw-sr-only">: </span>
            </span>
          ) : null}
          <span className="group-hover:tw-underline">{title}</span>
        </Jump>
      </h3>
      <div className="tw-max-w-prose tw-mx-auto tw-leading-relaxed tw-font-sans">{children}</div>
    </div>
  );
}

export function LineScore({ away, home }) {
  return (
    <div className="tw-w-full tw-max-w-full tw-overflow-x-auto tw-my-2 lg:tw-my-3">
      <table className="tw-font-sans tw-whitespace-nowrap tw-text-sm lg:tw-text-base tw-mx-auto">
        <thead>
          <tr className="tw-text-xs lg:tw-text-sm">
            <td />
            {away.innings.map((_, i) => (
              <>
                {/* eslint-disable-next-line react/jsx-key */}
                <th className="tw-w-7 tw-px-1">{i + 1}</th>
              </>
            ))}
            <th className="tw-w-7 tw-px-1">
              <abbr title="Runs">R</abbr>
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

function LineScoreRow({ team }) {
  return (
    <tr>
      <th className="tw-text-left tw-pr-2">
        {team.emoji}
        {"\u2004"}
        {team.abbr}
      </th>
      {team.innings.map((x) => (
        <>
          {/* eslint-disable-next-line react/jsx-key */}
          <td className="tw-text-center tw-px-1">{x}</td>
        </>
      ))}
      <td className="tw-text-center tw-font-bold tw-px-1">{team.innings.reduce((a, b) => a + b, 0)}</td>
    </tr>
  );
}
