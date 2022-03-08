/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "c76a00d6-3f28-484a-b0e0-7976b9bc6bfa",
        "118460c5-641a-470c-b784-d65bf75e6547",
        "b20b4167-a98d-4414-bbbc-c9022b9ad7f0",
        "06566f8d-3d14-4956-b054-36dc981fd589"
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="grr">
      <Entry title="The Prestige" season={2} day={102}>
        <p>
          Down 2-0 against the Dallas Steaks in the divisional round, ace pitcher Matteo Prestige initiated the reverse sweep with a 7-0 shutout.
        </p>
        <LineScore id="c76a00d6-3f28-484a-b0e0-7976b9bc6bfa" />
        <p>
          In the Good League Championship series, the Flowers couldn’t score against Matteo on <Jump season={2} day={107}>Day 107</Jump> either, letting the Shoe Thieves face the undefeated Philly Pies in the Internet Series.
        </p>
        <LineScore id="118460c5-641a-470c-b784-d65bf75e6547" />
        <p>
          On <Jump season={2} day={108}>Day 108</Jump>, the Shoe Thieves gave the Pies their first-ever playoff loss, before losing the series 1-3. Matteo was the only pitcher who did not get to play the champions, ending with a pristine 0.00 career postseason ERA.
        </p>
      </Entry>
      <Entry date="Season 3, Day 57" title="Gunther’s First Game" time="2020-08-06T04:07:10Z">
        <p>
          During a game against the Breath Mints, the Shoe Thieves’ best pitcher Matteo Prestige was tragically Incinerated, after having an allergic reaction on <Jump time="2020-08-05T22:22:50Z">Day 52</Jump>. To add insult to injury, their replacement was 0 star pitcher Gunther O’Brian. Gunther immediately claimed the title of worst pitcher in the League by blowing a 6-3 lead into a 16-21 defeat, setting a new record for most runs scored in a game. It’s 😔 okay. Gunther later became a fan favorite, and the community celebrated their shutout on <Jump season={6} day={22}>Season 6, Day 22</Jump> as the first of many.
        </p>
        <LineScore id="b20b4167-a98d-4414-bbbc-c9022b9ad7f0" />
      </Entry>
      <Entry date="Season 8, Day 44" title="Famous Shoe Thief Eugenia Garbage" time="2020-09-23T11:04:20Z">
        <p>
          The Shoe Thieves’ history has been marked by a Curse, exclusively Feedbacking Charleston’s best players in exchange for much worse replacements. Fate seemed to take a turn when reality flickered and sent Lachlan Shelton back to Canada in exchange for their best batter, Eugenia Garbage. But the Curse was quickly reinstalled when Feedback hit Eugenia <Jump time="2020-09-23T11:19:21Z">a second time in the same game</Jump>; now up to bat was 1 star batter Simon Haley, somehow the Moist Talkers’ only batter worse than Lachlan.
        </p>
      </Entry>
      <Entry date="Season 9, Day 116" title="Preventing Ascension" time="2020-10-11T02:22:50Z">
        <p>
          In Season 9, three teams were in the run for Ascension: the Philly Pies, swept by the Thieves to steal their #1 playoff spot on <Jump season={9} day={99}>Day 99</Jump>; the Tigers, met and matched in <Jump season={9} day={106}>the divisional series</Jump>; and finally the Baltimore Crabs, the only team they had never faced. With Nagomi McDaniel <Jump time="2020-10-10T13:12:50Z">recently unshelled</Jump>, Thieves tying the series was already a surprise. In game 5, down 2 runs at the bottom of the 9th, Stu Trololol’s clutch factor came in for a legendary 3-run home run.
        </p>
        <LineScore id="06566f8d-3d14-4956-b054-36dc981fd589" />
        <p>
          The Shame would follow the Crabs into <Jump team="8d87c468-699a-47a8-b40d-cfb73a5660ad" season={10} day={1}>the first game of the following season</Jump>, while the Thieves briefly enjoyed their first title before <Jump>facing a much scarier opponent</Jump>{/* S9DX */}.
        </p>
      </Entry>
      <Entry date="Season 10, Day 66" title="Richardson Games Legitimately Acquires 8 Defense Stars" time="2020-10-15T10:15:10Z">
        <p>
          Ever since the <Jump redirect="/offseason" time="2020-08-30T19:15:00Z">Season 4 election</Jump> when they were equipped with the Grappling Hook, Richardson Games had been quite an anomaly: low batting and pitching stars, but excelling in baserunning and defense. While this should be enough to satiate any reasonable player, becoming a Siphon in the <Jump redirect="/offseason" time="2020-10-11T19:15:00Z">Season 9 election</Jump> made Richardson hungry for blood. In season 10, they would go from 5.5 to an absurd 8 defense stars by sipping the entire League. Notable victims included beloved Magic player <Jump time="2020-10-14T22:13:10Z">Chorby Short</Jump> and the very player who <Jump time="2020-08-28T12:27:30Z">originally swapped teams</Jump> with Richardson, <Jump time="2020-10-13T22:07:10Z">Ren Hunter</Jump>.
        </p>
      </Entry>
      <Entry date="Season 11, Day 1" title="Esme’s Haunted" time="2020-10-19T16:05:50Z">
        <p>
          In the <Jump redirect="/offseason" time="2020-10-18T19:30:00Z">Season 10 election</Jump>, the Gods were particularly generous to the Shoe Thieves, granting them five Blessings. Among these were the infamous Noise-Canceling Headphones, the Traveling team modification, and the mysterious “Haunt a random player”. The initial surprise of Esme Ramsey becoming “Haunted” was nowhere near the fans’ collective shock when, on their first plate appearance, Esme instead left their place to none other than Atlas Jonbois, ghost of a renowned Shoe Thief who survived less than three days in the League in Season 3, from <Jump time="2020-08-05T10:19:15Z">Day 40</Jump> to <Jump time="2020-08-05T13:29:50Z">Day 43</Jump>.
        </p>
      </Entry>
      <Entry date="Season 13 Elections" title="Tillman is Called Back to the Void" time="2021-03-14T19:15:00Z">
        <p>
          As the Shoe Thieves implemented the first stage of their multi-season “Pitcher of Blood” plan, to get the Flinching Blood Hamburger on the mound in Tillman Henderson’s place, Tillman’s Returned modification finally triggered, sending him back to the Hall. A departure as sudden as <Jump redirect="/leaderboard" time="2020-10-16T20:04:19Z">their arrival</Jump>, with the mysterious Tad Seeth disappearing from their shadows simultaneously. While it may sound like Tillman’s shoes were hard to fill, newcomer Simba Davis easily took the mantle of terrible pitcher to new limits, including <Jump time="2021-03-16T03:09:20Z">allowing 2 grand slams in a single inning</Jump>.
        </p>
      </Entry>
    </History>
  );
}
