import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import contrast from "../lib/contrast";
import { teams, getTeamIndex } from "../lib/teams";
import { Jump, JumpDefaults } from "./jump";
import TeamIcon from "./team-icon";

// Number of teams in the carousel. This is 25 to include the Data Witches.
const c = 25;

function contrastColor(color) {
  return contrast(color, "#000000") > contrast(color, "#ffffff") ? "#000000" : "#ffffff";
}

export function History({ authors, children }) {
  const slug = useRouter().pathname.split("/").pop();
  const index = getTeamIndex({ slug });
  const team = teams[index];

  const previous = teams[(((index - 1) % c) + c) % c]; // stares directly at camera
  const next = teams[(index + 1) % c];

  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(Cookies.get("favorite_team") === team.id);
  }, [team.id]);

  return (
    <JumpDefaults.Provider value={useMemo(() => ({ team: team.id }), [team.id])}>
      <div className="tw-container tw-flex tw-gap-y-6 tw-flex-wrap lg:tw-flex-nowrap tw-justify-between tw-mt-3 lg:tw-mt-6">
        <div className="tw-order-3 tw-basis-full lg:tw-basis-auto lg:tw-order-2 tw-font-client-serif tw-flex tw-justify-center tw-gap-x-2.5 tw-text-left">
          <TeamIcon size="teamCard" emoji={team.emoji} color={team.mainColor} />
          <div>
            <h2 className="tw-text-[1.375rem] tw-leading-[1.65rem] lg:tw-text-2xl lg:tw-leading-[1.8rem]">
              {team.fullName}
            </h2>
            <div className="tw-italic tw-text-base">&quot;{team.slogan}&quot;</div>
          </div>
        </div>
        <WebRing className="tw-order-1 lg:tw-basis-48" team={previous} previous />
        <WebRing className="tw-order-2 lg:tw-basis-48 lg:tw-order-3 lg:tw-justify-end" team={next} />
      </div>
      <div className="tw-container tw-font-client-serif lg:tw-max-w-xl tw-mb-6 lg:tw-mb-8 tw-text-center">
        <button
          type="button"
          disabled={favorite}
          onClick={() => {
            if (!favorite) {
              Cookies.set("favorite_team", team.id);
              setFavorite(true);
            }
          }}
          className="tw-mt-4 tw-rounded-full tw-cursor-pointer disabled:tw-cursor-default tw-border disabled:tw-border-0 tw-border-white tw-font-bold tw-text-sm tw-h-8 tw-px-[15px] tw-py-[5px] hover:tw-opacity-80 disabled:hover:tw-opacity-100"
          style={{ backgroundColor: team.mainColor, color: contrastColor(team.mainColor) }}
        >
          {favorite ? "Favorite Team" : "Change Favorite Team"}
        </button>
        <div className="tw-font-serif tw-text-sm lg:tw-text-base tw-mt-6">
          <span className="tw-italic">Team history compiled by:</span> {authors}
        </div>
      </div>
      <div className="tw-container tw-mx-auto">{children}</div>
    </JumpDefaults.Provider>
  );
}

export function Entry({ date, title, children, ...jump }) {
  const theDate =
    date ??
    (jump.season !== undefined && jump.day !== undefined ? `Season ${jump.season}, Day ${jump.day}` : undefined);
  return (
    <div className="tw-my-6 lg:tw-my-8">
      <h3 className="tw-text-center tw-font-bold tw-text-xl lg:tw-text-2xl tw-mb-1.5 lg:tw-mb-2">
        <Jump className="hover:tw-no-underline tw-group" {...jump}>
          {theDate ? (
            <span className="tw-block tw-text-sm lg:tw-text-base tw-uppercase">
              {theDate}
              <span className="tw-sr-only">: </span>
            </span>
          ) : null}
          <span className="group-hover:tw-underline tw-block">{title}</span>
        </Jump>
      </h3>
      <div className="tw-before-history tw-max-w-prose tw-mx-auto tw-leading-relaxed">{children}</div>
    </div>
  );
}

function WebRing({ className, team, previous }) {
  return (
    <Link href={`/histories/${team.slug}`} passHref>
      <a href="passedHref" className={`${className} tw-flex tw-items-center tw-gap-2 hover:tw-no-underline tw-group`}>
        {previous ? <HiArrowLeft className="tw-h-4 tw-w-4" /> : null}
        <TeamIcon size="small" emoji={team.emoji} color={team.mainColor} />
        <span className="group-hover:tw-underline">{team.nickname}</span>
        {previous ? null : <HiArrowRight className="tw-h-4 tw-w-4" />}
      </a>
    </Link>
  );
}
