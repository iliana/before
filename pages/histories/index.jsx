import Link from "next/link";
import { teams } from "../../lib/teams";
import TeamIcon from "../../components/team-icon";

export default function Page() {
  return (
    <div className="tw-container">
      <p className="tw-text-center tw-text-lg lg:tw-text-xl tw-italic tw-font-medium tw-my-5 lg:tw-my-6">
        A collection of important events from each team’s oral histories, as shared by their fans.
      </p>
      <h3 className="tw-text-center tw-font-bold tw-text-2xl tw-leading-[1.2] lg:tw-text-[2rem] lg:tw-leading-[1.2] tw-my-5 lg:tw-my-6">
        Internet League Blaseball
      </h3>
      <div className="tw-w-fit lg:tw-w-[400px] tw-mx-auto tw-my-5 lg:tw-my-6">
        {teams.map((team) => (
          <Link key={team.id} href={`/histories/${team.slug}`} passHref>
            <a className="tw-block tw-px-[10px] tw-py-[7px] tw-mx-[6px] hover:tw-no-underline tw-rounded-[5px] odd:tw-bg-[#131313] hover:tw-bg-[#424242]">
              <TeamIcon size="small" emoji={team.emoji} color={team.mainColor} />
              <span
                className="tw-pl-[20px] tw-text-lg lg:tw-text-xl tw-leading-normal lg:tw-leading-normal"
                style={{ color: team.secondaryColor }}
              >
                {team.name}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
