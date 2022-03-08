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
        "06566f8d-3d14-4956-b054-36dc981fd589",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="grr">
      <Entry title="The Prestige" season={2} day={102}>
        <p>
          Down 2-0 against the Dallas Steaks in the divisional round, ace pitcher Matteo Prestige initiated the reverse
          sweep with a 7-0 shutout.
        </p>
        <LineScore id="c76a00d6-3f28-484a-b0e0-7976b9bc6bfa" />
        <p>
          In the Good League Championship series, the Flowers couldn’t score against Matteo on{" "}
          <Jump season={2} day={107}>
            Day 107
          </Jump>{" "}
          either, letting the Shoe Thieves face the undefeated Philly Pies in the Internet Series.
        </p>
        <LineScore id="118460c5-641a-470c-b784-d65bf75e6547" />
        <p>
          On{" "}
          <Jump season={2} day={108}>
            Day 108
          </Jump>
          , the Shoe Thieves gave the Pies their first-ever playoff loss, before losing the series 1-3. Matteo was the
          only pitcher who did not get to play the champions, ending with a pristine 0.00 career postseason ERA.
        </p>
      </Entry>
      <Entry date="Season 3, Day 57" title="Gunther’s First Game" time="2020-08-06T04:07:10Z">
        <p>
          During a game against the Breath Mints, the Shoe Thieves’ best pitcher Matteo Prestige was tragically
          Incinerated, after having an allergic reaction on <Jump time="2020-08-05T22:22:50Z">Day 52</Jump>. To add
          insult to injury, their replacement was 0 star pitcher Gunther O’Brian. Gunther immediately claimed the title
          of worst pitcher in the League by blowing a 6-3 lead into a 16-21 defeat, setting a new record for most runs
          scored in a game. It’s 😔 okay. Gunther later became a fan favorite, and the community celebrated their
          shutout on{" "}
          <Jump season={6} day={22}>
            Season 6, Day 22
          </Jump>{" "}
          as the first of many.
        </p>
        <LineScore id="b20b4167-a98d-4414-bbbc-c9022b9ad7f0" />
      </Entry>
      <Entry date="Season 8, Day 44" title="Famous Shoe Thief Eugenia Garbage" time="2020-09-23T11:04:20Z">
        <p>
          The Shoe Thieves’ history has been marked by a Curse, exclusively Feedbacking Charleston’s best players in
          exchange for much worse replacements. Fate seemed to take a turn when reality flickered and sent Lachlan
          Shelton back to Canada in exchange for their best batter, Eugenia Garbage. But the Curse was quickly
          reinstalled when Feedback hit Eugenia <Jump time="2020-09-23T11:19:21Z">a second time in the same game</Jump>;
          now up to bat was 1 star batter Simon Haley, somehow the Moist Talkers’ only batter worse than Lachlan.
        </p>
      </Entry>
      <Entry date="Season 9, Day 116" title="Preventing Ascension" time="2020-10-11T02:22:50Z">
        <p>
          In Season 9, three teams were in the run for Ascension: the Philly Pies, swept by the Thieves to steal their
          #1 playoff spot on{" "}
          <Jump season={9} day={99}>
            Day 99
          </Jump>
          ; the Tigers, met and matched in{" "}
          <Jump season={9} day={106}>
            the divisional series
          </Jump>
          ; and finally the Baltimore Crabs, the only team they had never faced. With Nagomi McDaniel{" "}
          <Jump time="2020-10-10T13:12:50Z">recently unshelled</Jump>, Thieves tying the series was already a surprise.
          In game 5, down 2 runs at the bottom of the 9th, Stu Trololol’s clutch factor came in for a legendary 3-run
          home run.
        </p>
        <LineScore id="06566f8d-3d14-4956-b054-36dc981fd589" />
        <p>
          The Shame would follow the Crabs into{" "}
          <Jump team="8d87c468-699a-47a8-b40d-cfb73a5660ad" time="2020-10-12T16:01:16Z">
            the first game of the following season
          </Jump>
          , while the Thieves briefly enjoyed their first title before{" "}
          <Jump time="2020-10-11T02:23:32Z">facing a much scarier opponent</Jump>.
        </p>
      </Entry>
      <Entry
        date="Season 10, Day 66"
        title="Richardson Games Legitimately Acquires 8 Defense Stars"
        time="2020-10-15T10:15:10Z"
      >
        <p>
          Ever since the{" "}
          <Jump redirect="/offseason" time="2020-08-30T19:15:00Z">
            Season 4 election
          </Jump>{" "}
          when they were equipped with the Grappling Hook, Richardson Games had been quite an anomaly: low batting and
          pitching stars, but excelling in baserunning and defense. While this should be enough to satiate any
          reasonable player, becoming a Siphon in the{" "}
          <Jump redirect="/offseason" time="2020-10-11T19:15:00Z">
            Season 9 election
          </Jump>{" "}
          made Richardson hungry for blood. In season 10, they would go from 5.5 to an absurd 8 defense stars by sipping
          the entire League. Notable victims included beloved Magic player{" "}
          <Jump time="2020-10-14T22:13:10Z">Chorby Short</Jump> and the very player who{" "}
          <Jump time="2020-08-28T12:27:30Z">originally swapped teams</Jump> with Richardson,{" "}
          <Jump time="2020-10-13T22:07:10Z">Ren Hunter</Jump>.
        </p>
      </Entry>
      <Entry date="Season 11, Day 1" title="Esme’s Haunted" time="2020-10-19T16:05:50Z">
        <p>
          In the{" "}
          <Jump redirect="/offseason" time="2020-10-18T19:30:00Z">
            Season 10 election
          </Jump>
          , the Gods were particularly generous to the Shoe Thieves, granting them five Blessings. Among these were the
          infamous Noise-Canceling Headphones, the Traveling team modification, and the mysterious “Haunt a random
          player”. The initial surprise of Esme Ramsey becoming “Haunted” was nowhere near the fans’ collective shock
          when, on their first plate appearance, Esme instead left their place to none other than Atlas Jonbois, ghost
          of a renowned Shoe Thief who survived less than three days in the League in Season 3, from{" "}
          <Jump time="2020-08-05T10:19:15Z">Day 40</Jump> to <Jump time="2020-08-05T13:29:50Z">Day 43</Jump>.
        </p>
      </Entry>
      <Entry
        date="Season 13 Elections"
        title="Tillman is Called Back to the Void"
        redirect="/offseason"
        time="2021-03-14T19:15:00Z"
      >
        <p>
          As the Shoe Thieves implemented the first stage of their multi-season “Pitcher of Blood” plan, to get the
          Flinching Blood Hamburger on the mound in Tillman Henderson’s place, Tillman’s Returned modification finally
          triggered, sending him back to the Hall. A departure as sudden as{" "}
          <Jump redirect="/leaderboard" time="2020-10-16T20:04:19Z">
            their arrival
          </Jump>
          , with the mysterious Tad Seeth disappearing from their shadows simultaneously. While it may sound like
          Tillman’s shoes were hard to fill, newcomer Simba Davis easily took the mantle of terrible pitcher to new
          limits, including <Jump time="2021-03-16T03:09:20Z">allowing 2 grand slams in a single inning</Jump>.
        </p>
      </Entry>
      <Entry date="Season 14 Elections" title="The Sneakers Alliance" redirect="/offseason" time="2021-03-21T18:15:00Z">
        <p>
          <Jump time="2021-03-16T12:01:20Z">Sebastian Woodman’s incineration</Jump> hit hard, especially for their
          replacement Bennet Bluesky, a mediocre batter but a great pitcher, born in the wrong position. With the help
          of partners in crime the Houston Spies, Shoe Thieves fans pulled a state of the art mutually beneficial
          Exchange with notoriously bad pitcher Jordan Hildebert, finally taking a bat. Combined with a Blood
          Hamburger-Simba Davis Foreshadow and Herring Winfield Infusion, the Thieves managed to pull off a powerful set
          of Wills, only impaired by the comical amount of Roamers who would keep joining the team.
        </p>
      </Entry>
      <Entry date="Season 17, Day 78" title="Yeet Bright Day" time="2021-04-22T22:20:40Z">
        <p>
          Most teams had their iconic terrible pitchers, but few have seen as many as Charleston. Ironically{" "}
          <Jump team="eb67ae5e-c4bf-46ca-bbbc-425cd34182ff" redirect="/offseason" time="2021-03-21T18:15:00Z">
            Revoked
          </Jump>{" "}
          from “sister team” Canada Moist Talkers, Bright Zimmerman was the latest dent in the Thieves’ rotation, as
          they had just Foreshadowed Simba Davis. When Fax Machines were installed, the community was ecstatic to
          finally see this problem resolve itself. Zimmerman became the Shoe Thieves’ first Faxed pitcher, with nothing
          less than a grand slam. This event was celebrated with Moist Talkers and Pies fans, other teams who suffered
          from Bright’s unique pitching style.
        </p>
      </Entry>
      <Entry date="Season 18, Day 53" title="The Games Swap" time="2021-05-12T21:03:15Z">
        <p>
          For about 13 seasons, the Shoe Thieves fans joked that they never heard of Reverb. The weather seemed harmless
          when it hit and shuffled their rotation at <Jump time="2021-04-23T12:09:10Z">the end of Season 17</Jump>.
          Thieves were not ready for what the sim had in store: Swapping a great pitcher with terrible batting stats for
          a great batter incapable of pitching. For their history in and out of the game, Cornelius Games and Richardson
          Games may have been the funniest Reverb targets possible. This event is likely what led to a seemingly endless
          series of Shadow Faxes in Charleston.
        </p>
      </Entry>
      <Entry
        date="Season 18 Elections"
        title="A Blood and Bon Voyage!"
        redirect="/offseason"
        time="2021-05-16T18:15:00Z"
      >
        <p>
          Name an unfortunate Blaseball event, and it likely happened to the Shoe Thieves in the Expansion Era. With
          players looking so volatile, the community had their eyes on permanent team modifications. Having hosted more
          Roamers than any other team, Bon Voyage! seemed an easy choice. A Blood was more of a desperate attempt at
          finally getting a blood type after missing all the previous ones. Not only did the Thieves get both, both
          turned out to be incredibly fitting. Stew Briggs immediately Roamed away, triggering 4 parties, and A Blood’s
          effect tied perfectly with the team’s historical themes of Blood Thieves and their major arcana, the Wheel of
          Fortune.
        </p>
      </Entry>
      <Entry date="Season 21, Day 17" title="Richardson Games Steals the Fifth Base" time="2021-06-22T07:06:20Z">
        <p>
          On{" "}
          <Jump team="7966eb04-efcc-499b-8f03-d13916330531" time="2021-06-16T05:12:47Z">
            Season 20, Day 38
          </Jump>
          , Jesús Koch placed the Fifth Base in the Oven. For almost a season, it sat there, forcing the Philly Pies to
          play five base Blaseball for every home game. Richardson Games was the first player to try picking it up by
          stealing fifth, becoming Super Roamin’ in the process, to the horror of Thieves fans who had{" "}
          <Jump redirect="/offseason" time="2021-06-20T18:15:00Z">
            just recently
          </Jump>{" "}
          put them back in the lineup. Immediately after faxing Beans McBlase with a 10th run, Richardson simply put the
          base back in the very same game, happy to have dropped the impairing Coasting Jersey. Not fast enough to avoid
          panic votes moving Games to the bottom of the lineup in{" "}
          <Jump redirect="/offseason" time="2021-06-27T18:15:00Z">
            that season’s election
          </Jump>
          , though.
        </p>
      </Entry>
      <Entry date="Season 23, Day 90" title="Gunther’s Death" time="2021-07-23T10:04:50Z">
        <p>
          On <Jump time="2021-07-23T04:04:20Z">Day 84</Jump>, the Shoe Thieves were hit by Reverb, swapping pitcher
          Gunther O’Brian for batter Richardson Games, who the sim really wanted to see on the mound. On{" "}
          <Jump time="2021-07-23T08:03:40Z">Day 88</Jump>, Debted player Silvaire Roadhouse made Gunther Unstable.
          Finally, on Day 90, Jazz weather turned into Solar Eclipse. It took this series of unlikely events for the fan
          favorite to be incinerated, replaced by the strangely consistent Orion Ultrabass. Fan love for Gunther
          throughout the community led them to be named an MVP posthumously, joining the{" "}
          <Jump time="2021-07-25T01:58:06Z">Semi-Centennial</Jump> to later be{" "}
          <Jump redirect="/team/b72f3061-f573-40d7-832a-5ad475bd7909" time="2021-07-25T03:55:55Z">
            redrafted into the League
          </Jump>
          . After{" "}
          <Jump redirect="/offseason" time="2021-05-23T18:15:00Z">
            Pudge
          </Jump>{" "}
          and{" "}
          <Jump redirect="/offseason" time="2021-07-04T18:20:00Z">
            Alejandro
          </Jump>{" "}
          Roamed out, yet another Thief escaped the Hall of Flame.
        </p>
      </Entry>
      <Entry date="Season 23, Day 103" title="Richardson Games With the Steel Chair" time="2021-07-24T00:04:40Z">
        <p>
          In <Jump time="2021-07-22T15:55:00Z">Season 23</Jump>, the Gift Shop’s main surprise was a new item called
          Steel Chair, which, in Charleston, was given to Richardson Games. The Choux’s Light Switch prevented the Shoe
          Thieves from needing protection against Consumers. It was in the playoffs that Richardson would finally show
          off their moves, by defending the Seattle Garages from repeated Consumer attacks attracted by Tot Clark’s
          Chorby’s Soul. The Charitable Steel Chair broke during the{" "}
          <Jump time="2021-07-24T03:17:15Z">final game of the series</Jump>, letting the Garages continue unharmed into
          the postseason.
        </p>
      </Entry>
      <Entry
        date="Season 24, Day 72"
        title="Party Till We Die"
        redirect="/team/bfd38797-8404-4b38-8b82-341da28b1f83"
        time="2021-07-29T16:35:15Z"
      >
        <p>
          During the{" "}
          <Jump redirect="/offseason" time="2021-07-25T18:15:00Z">
            Season 23 election
          </Jump>
          , the Shoe Thieves fans made a clear choice by voting for Containment rather than Roamless: If this was the
          final season, they’d go out in style. “Party till we die” became the unofficial fan chant for the season, and
          reached its apex when Parker MacMillan finally Roamed to the team on{" "}
          <Jump redirect="/team/bfd38797-8404-4b38-8b82-341da28b1f83" time="2021-07-29T07:34:30Z">
            Day 63
          </Jump>
          . The very next day,{" "}
          <Jump team="b72f3061-f573-40d7-832a-5ad475bd7909" time="2021-07-29T08:17:39Z">
            Enhanced Party Time was nullified
          </Jump>
          . When Parker Roamed away on Day 72, leaving the team Unstable and triggering the Good Riddance modification,
          the Shoe Thieves were the only team able to Party. With Castillo Turner Roaming in at the same time, fans knew
          the party wouldn’t end there.
        </p>
      </Entry>
    </History>
  );
}
