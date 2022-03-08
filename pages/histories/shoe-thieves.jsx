/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([]),
    },
  };
}

export default function Page() {
  return (
    <History authors="grr">
      <Entry title="The Prestige" season={2} day={102}>
        <p>Down 2-0 against the Dallas Steaks in the divisional round, ace pitcher Matteo Prestige initiated the reverse sweep with a 7-0 shutout. In the Good League Championship series, the Flowers couldn’t score against Matteo on <Jump season={2} day={107}>Day 107</Jump> either, letting the Shoe Thieves face the undefeated Philly Pies in the Internet Series. On <Jump season={2} day={108}>Day 108</Jump>, the Shoe Thieves gave the Pies their first-ever playoff loss, before losing the series 1-3. Matteo was the only pitcher who did not get to play the champions, ending with a pristine 0.00 career postseason ERA.</p>
      </Entry>
    </History>
  );
}
