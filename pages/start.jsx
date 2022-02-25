import fs from "fs/promises";
import path from "path";
import { useMemo } from "react";
import TOML from "@iarna/toml";
import { Jump, JumpDefaults } from "../components/jump";

export async function getStaticProps() {
  const text = await fs.readFile(path.join(process.cwd(), "data/start.toml"), { encoding: "utf-8" });
  const data = TOML.parse(text);
  return { props: { eras: data.eras } };
}

export default function Start({ eras }) {
  return (
    <>
      <div className="tw-container">
        <div className="tw-flex tw-items-start lg:tw-items-end tw-font-bold tw-mt-2.5 tw-mb-5 lg:tw-mb-6">
          <h1 className="tw-text-xl lg:tw-text-6xl tw-leading-[1.2] lg:tw-leading-[1.2] tw-uppercase">Blaseball</h1>
          <div className="tw-text-[12px] lg:tw-text-sm tw-leading-[1.5] lg:tw-leading-[1.5] tw-font-sans tw-mx-[5px] lg:tw-m-2.5 tw-p-[5px] tw-pb-[2px] lg:tw-pb-[5px] tw-rounded-[3px] tw-bg-[#656565]/[.65]">
            BETA
          </div>
        </div>

        <p className="tw-text-center tw-text-lg lg:tw-text-xl tw-italic tw-font-medium">
          <strong>Before</strong> replays Blaseball from any moment recorded by the SIBR archives.
        </p>
      </div>

      {eras.map((era) => (
        <Era key={era.title} era={era} />
      ))}
    </>
  );
}

function Era({ era }) {
  return (
    <>
      <h2
        className="tw-text-2xl tw-leading-normal lg:tw-text-4xl lg:tw-leading-normal tw-text-center tw-font-bold tw-mt-6 lg:tw-mt-8 tw-uppercase tw-relative before:tw-absolute before:tw-left-0 before:tw-top-1/2 before:tw-w-full before:tw-h-px before:tw-bg-gray-700"
        style={{ color: era.color }}
      >
        <span className="tw-inline-block tw-relative tw-bg-black tw-px-4 lg:tw-px-5">{era.title}</span>
      </h2>

      <div className="tw-container tw-text-center tw-mb-6 lg:tw-mb-8">
        {era.events ? (
          <>
            <Days>{era.days}</Days>
            <EventList events={era.events} />
          </>
        ) : null}

        {era.seasons.map((season) => (
          <Season key={season.number} season={season} />
        ))}
      </div>
    </>
  );
}

function Season({ season }) {
  return (
    <JumpDefaults.Provider value={useMemo(() => ({ season: season.number }), [season])}>
      {season.title ? (
        <h3 className="tw-text-lg tw-leading-normal lg:tw-text-2xl lg:tw-leading-tight tw-font-bold tw-uppercase tw-mt-1.5 lg:tw-mt-2">
          <Jump day={1} className="hover:tw-no-underline tw-group">
            <span className="tw-block tw-text-sm lg:tw-text-base">
              Season {season.number}
              <span className="tw-sr-only">: </span>
            </span>
            <span className="group-hover:tw-underline" style={{ color: season.color }}>
              {season.title}
            </span>
            {season.extra_title ? (
              <>
                {" "}
                —{" "}
                <span className="group-hover:tw-underline" style={{ color: season.extra_title.color }}>
                  {season.extra_title.title}
                </span>
              </>
            ) : null}
          </Jump>
        </h3>
      ) : (
        <h3 className="tw-text-sm lg:tw-text-base tw-leading-snug lg:tw-leading-normal tw-font-bold tw-uppercase">
          Season {season.number}
        </h3>
      )}
      <Days>{season.days}</Days>
      <EventList events={season.events} />
    </JumpDefaults.Provider>
  );
}

function Days({ children }) {
  return <p className="tw-text-sm lg:tw-text-base tw-font-medium tw-leading-normal lg:tw-leading-snug">{children}</p>;
}

function EventList({ events }) {
  return (
    <ul className="tw-font-sans tw-mt-2 lg:tw-mt-2.5 tw-mb-5 lg:tw-mb-6 tw-before-list">
      {events.map((event) => (
        <Event key={event.title} event={event} />
      ))}
    </ul>
  );
}

function Event({ event }) {
  const { title, butalso, being, ...jump } = event;

  const inner = {
    alert: <Being className="tw-italic">{title}</Being>,
    peanut: <Being className="tw-text-[red]">{title}</Being>,
    monitor: <Being className="tw-text-[#5988ff] [text-shadow:0_0_0.5em_#5988ff]">{title}</Being>,
    coin: <Being className="tw-text-[#ffbe00]">{title}</Being>,
    reader: <Being className="tw-text-[#a16dc3] [text-shadow:0_0_0.5em_#a16dc3]">{title}</Being>,
    parker: (
      <Being mic font="tw-font-sans tw-font-normal">
        {title}
      </Being>
    ),
    microphone: <Being mic>{title}</Being>,
    lootcrates: <Being className="tw-italic tw-text-[#b3b3b3]">{title}</Being>,
    namerifeht: (
      <Being className="tw-text-[#ea5b23]">
        <span className="tw-inline-block tw-scale-x-[-1] [unicode-bidi:bidi-override] [direction:rtl] group-hover:tw-underline">
          {title}
        </span>
      </Being>
    ),
  }[being] ?? <span className="group-hover:tw-underline">{title}</span>;

  return (
    <li>
      <Jump className="lg:tw-whitespace-nowrap hover:tw-no-underline tw-group" {...jump}>
        {inner}
        {butalso ? (
          <>
            {" "}
            — <span className="group-hover:tw-underline">{butalso}</span>
          </>
        ) : null}
      </Jump>
    </li>
  );
}

function Being({ className, font, mic, children }) {
  const quoteClass = `tw-font-client-serif tw-font-medium ${mic ? "tw-text-[#ff007b]" : ""}`;
  return (
    <span className={`${font ?? "tw-font-client-serif tw-font-medium"} ${className}`}>
      <span className={quoteClass}>“</span>
      <span className="group-hover:tw-underline">{children}</span>
      <span className={quoteClass}>”</span>
    </span>
  );
}
