/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores(["3589a152-c46c-444b-b14e-2b61e44c9ec9"]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Archranger Beatrice">
      <Entry title="Old Man Logan’s Inning" season={2} day={97} time="2020-07-31T17:59:55Z">
        <p>
          Season 2, Day 97 was the first recorded game in which Logan Rodriguez, the Yellowstone Magic’s “spiteful”
          then-second pitcher, choked in the last three innings. He became a storied player for the Magic, remaining on
          their rotation with less than a star of improvement over the entire Discipline Era. Despite{" "}
          <Jump election={9}>becoming a Siphon</Jump>
          and playing in over thirty Blooddrain games, he never once Siphoned a fellow player’s stars to improve his
          own, and has only partied a handful of times as well.
        </p>
        <p>
          During the Magic’s first playoff run in Season 11, Rodriguez notoriously lost{" "}
          <Jump season={11} day={101}>
            Day 101
          </Jump>
          ’s game, giving up 6 of the Steaks’ 9 runs <Jump time="2020-10-23T22:16:13Z">after the 7th</Jump>, as was
          tradition. This loss set up star pitcher Curry Aliciakeyes to face off against the Moist Talkers’ star pitcher
          PolkaDot Patterson{" "}
          <Jump season={11} day={103}>
            two days later
          </Jump>
          .
        </p>
        <p>
          He was finally displaced by a Reverb to the lineup on{" "}
          <Jump time="2021-04-13T22:19:00Z">Season 16, Day 30</Jump>, and proceeded to hit a ground out. In spite of
          this, Rodriguez’s defense proved a valuable asset during the Magic’s record-breaking Season 17, further
          solidifying him as a favorite heel amongst fans.
        </p>
      </Entry>
      <Entry title="Inky Threw a No-Hitter!" season={7} day={7}>
        <p>
          Inky Rutledge threw the first no-hitter since the Return of Blaseball, finding the 2-Blood Blagonball in the
          process. They then repeated the feat{" "}
          <Jump season={7} day={37}>
            thirty days later
          </Jump>
          . Magic fans were collectively elated, and Inky was the first pitcher to discover a Blagonball; fans then
          campaigned for League officials to allow Rutledge to throw the Blagonball.
        </p>
      </Entry>
      <Entry title="A Breath of Fresh Air" season={8} day={83}>
        <p>
          On Season 8, Day 83, both the Kansas City Breath Mints and the Yellowstone Magic lost their respective games.
          The Magic lost to the Philly Pies, whose 46th win put the floor for the Mild League’s fourth postseason seed
          beyond the Magic’s remaining 16 game, 28 win reach. Shortly after, the Breath Mints lost to the Seattle
          Garages. Both teams agreed to host party time together that season, naming their mutual partnership “Breath of
          Fresh Air”, or “BOFA” for short.
        </p>
      </Entry>
      <Entry title="Chorby Short, Lottery Pick" election={8}>
        <p>
          In the Season 1 Election, the results stated that the Magic won a 10% hitting boost to their entire lineup.
          However, due to the confusion around that Season’s election, three elections ran simultaneously. In the
          displayed reality, the Magic won the vast majority of Blessings, but the enacted reality gave the boost to
          another team entirely.
        </p>
        <p>
          This began the Magic’s seven season Blessing drought, receiving only a net -2% modifier between{" "}
          <Jump election={5}>Season 5</Jump>’s Bad Neighbors and <Jump election={6}>Season 6</Jump>’s Mutually Arising,
          both one by the Shoe Thieves. As the seasons ground on, the Magic stagnant relative to first the Chaotic Good,
          then the Mild Low, the fans underwent several phases of frustration with the sim: They went Feral until they
          burned out and became Mossy, tried and failed to See It with precognition until, finally, in the Season 8
          Election, the Magic won a Blessing.
        </p>
        <p>
          Lottery Pick was a famous Blessing by then, facilitating the resurrection of Jaylen Hotdogfingers just two
          seasons prior. While it’s unknown which Magic fans voted to snipe whatever shenanigans surrounded the Blessing
          this time, the end result was perhaps Magic’s most famous player, and the first instance of umbramancy in the
          league. Chorby Short was pulled from the Seattle Garages’ shadows, where noted terrible pitcher Mike Townsend
          had been seemingly eternally consigned, to the lamenting of Garages fans.
        </p>
        <p>
          The league then underwent a week-long siesta, allowing the Magic to prepare their cool new frog for life in
          the sun.
        </p>
      </Entry>
      <Entry title="O No Blood" election={10}>
        <p>
          Perhaps the most powerful, and certainly the most iconic Blessing the Magic have ever won, O No Blood,
          represented a historic win for the team, the likes of which they had not seen before. Coming off the back of
          star player <Jump time="2020-10-14T07:01:21Z">Annie Roland’s incineration</Jump> that same season, as well as
          the death of a god and the scattering of the PODS, the Season 10 Election was a hopeful denouement to the
          Discipline Era before Peace and Prosperity for both the league and the Magic.
        </p>
        <p>
          Moreover, and perhaps more hilariously, the Game Band hadn’t decided what O No Blood did yet. Rather than a
          description of the mechanics, the team Modification simply read “Players with O No Blood are Good.” Basking in
          victory and enjoying the title of “Canonically Good,” the fans went a little feral again. Typos were made,
          originating “Magic Goo”; it was not a reference to some unknown arcane substance or the actual playing ability
          of the team at the time.
        </p>
        <p>
          To prove the efficacy of O No Blood’s actual effect, preventing players from striking out if there were no
          balls in the count, the Magic not only managed a 10 win jump from the season prior, but{" "}
          <Jump season={11} day={110}>
            made it to the Mild League Championship Series
          </Jump>{" "}
          off of{" "}
          <Jump season={11} day={100}>
            the Wild Card
          </Jump>{" "}
          in Season 11.
        </p>
      </Entry>
      <Entry title="Chorby Short, Foul Ball" date="Season 12, Day 1" time="2021-03-01T16:05:28Z">
        <p>
          By the end of the Grand Siesta, Magic fans had done a bit of stats analysis. After arriving on the roster from
          the Garages’ shadows, Chorby Short had a run-in with Richardson Games, infamously prolific Siphon and
          defensive beast. Games siphoned some of Short’s hitting ability for some petty game action. Obviously this
          made Short worse, but it also meant that she had floored Moxie, meaning that she would swing more often at
          pitches that would otherwise be balls. While otherwise a bad outcome, low Moxie let Short lean on her O No
          Blood to the fullest extent possible; missed swings would be counted as foul balls.
        </p>
        <p>
          PolkaDot Patterson was a terror in the Discipline Era. WIth pitching stats maximized in Season 1, Patterson
          was known for league-topping win-loss ratios. As a consequence of her stats, she threw almost exclusively
          strikes.
        </p>
        <p>
          And so, on Season 12, Day 1, another funny result of O No Blood reared its head. Short would swing at
          anything. Patterson would not throw anything Chorby could hit, let alone a pitch outside the strike zone.
          During her first at bat in the 2nd inning, Chorby Short held the stadium hostage for 112 foul balls, just
          under 10 real-life minutes. The other two at-bats Chorby had foul streaks on were less impressive, at a mere{" "}
          <Jump time="2021-03-01T16:24:21Z">37</Jump> and <Jump time="2021-03-01T16:34:01Z">52</Jump>, respectively.
          Nevertheless, out of all the foul balls with two strikes on the count that game, Chorby Short accounted for
          roughly 95% of them.
        </p>
        <p>
          The game ultimately lasted over 10 minutes longer than the next-closest game, but still did not teeter on the
          brink of Spillover.
        </p>
      </Entry>
      <Entry title="King and Cory" election={12}>
        <p>
          Another historical artifact of the Magic’s Season 1 performance was their team-wide grudge and rivalry against
          the Boston Flowers’ star pitcher, King Weatherman. He knows what he did.
        </p>
        <p>
          Although SIBR’s historical data shows that the Magic actually only played King Weatherman once in Season 1,
          near the beginning of the season rather than in their Good League Division Series, Weatherman was nevertheless
          blamed for their elimination from the Season 1 postseason. This began a rivalry that spanned the whole of the
          Discipline Era, and even caused Magic fans to donate money to a zoo to feed bugs named “Weatherman” to various
          zoo animals.
        </p>
        <p>
          Another albatross around the Magic’s neck was Cory Twelve. Twelve replaced far worse pitcher Famous Oconnor
          way back in Season 2, and stubbornly refused to improve one fraction of a star since. This presented a problem
          for the Magic, both for practical reasons, and because Twelve was a beloved character to the team, often
          imagined as a lunar rover inspired geological survey robot, retrofitted with a mitt and a wizard hat.
        </p>
        <p>
          This debate came to a head in the Season 12 Election, the first election with Wills. As the worst player on
          the team, Twelve presented a hot button issue, with some fans wanting to Revoke Twelve to then-unknown
          consequences, while others wanted to try to Exchange or Alternate them.
        </p>
        <p>
          With debate at a relative standstill, the Election nevertheless came. Magic fans awoke to a bittersweet cup of
          irony: Both camps had gotten what they wanted. Cory Twelve was Alternated, with one of the best stat rolls
          possible, and had immediately been Exchanged for hated rival King Weatherman, who was actually now a slightly
          worse pitcher than the Alternated Twelve.
        </p>
      </Entry>
      <Entry title="Cut Down in His Brine" date="Season 13, Day 13" time="2021-03-09T04:12:29Z">
        <p>
          The transition from Discipline to Expansion meant a lot of changes for the Magic as a whole. One was the death
          of a defining character for Discipline Era Magic, Sutton Picklestein. Picklestein was known for steals and
          triples, and especially steals; at least one Magic fan has argued that the Pickles in the concessions stand
          were given functionality in their honor.
        </p>
        <p>
          Picklestein was incinerated on Season 13, Day 13, and was replaced by Kurt Crueller. Crueller proceeded to get
          an RBI on their first at bat, prompting the thankful-but-mourning cry of “Thanks, Kurt” that became their
          trademark chant.
        </p>
        <p>
          However, Picklestein’s time in the spotlight was not finished after their Incineration. Sutton was not only
          idolized to MVP status on <Jump time="2021-03-12T20:45:00Z">Day 99</Jump>, but also speedran necromancy during
          the <Jump election={13}>Season 13 Election</Jump>, taking the opportunity to drag Tillman Henderson back to
          the Hall with them.
        </p>
      </Entry>
      <Entry title="Redactions" date="Season 15, Day 2" time="2021-04-05T16:11:07Z">
        <p>
          At the end of <Jump election={14}>Season 14</Jump>, the Magic were riding the high of winning Blessings. In
          spite of Wills that did little to affect the team, the Magic won both Precognition, boosting Chorby Short,
          Kurt Crueller, and Tiana Wheeler’s batting by about a star each, and the Nut Button, eliminating all peanut
          allergies from the team’s active roster.
        </p>
        <p>
          However, all was not well in the Election. After a failed necromancy of Sutton Picklestein, the league instead
          reanimated the Incinerated darling and wielder of the Vibe Check, York Silk. Silk, as all returned players,
          was given Debt. Unlike Jaylen Hotdogfingers before him, however, Silk was a batter, and his Debt modification
          was a different color than Jaylen’s. Nobody was sure what would happen.
        </p>
        <p>
          The league found out on Season 15, Day 2. York Silk aimed a hit at Wyatt Glover, getting an automatic out
          while rendering Glover Observed. Play ended without incident.{" "}
          <Jump season={15} day={3}>
            The next day
          </Jump>{" "}
          was in Coffee weather, a bad omen; the only other players that were Observed before this were on the Coffee
          Cup’s Real Game Band, who had been converted into Perks by the Tractor Bean. After play ended, Glover was{" "}
          <Jump time="2021-04-05T16:45:00Z">removed from the roster and Redacted</Jump>, the same modification given to{" "}
          <Jump time="2021-03-14T20:00:00Z" redirect="/player/fad06b19-42a0-47e5-82d7-6e66d4adc9a1">
            Tad Seeth
          </Jump>{" "}
          and{" "}
          <Jump time="2021-03-14T20:00:00Z" redirect="/player/5f5764c7-c3a0-4dae-ad17-c6689f1e8c27">
            Brisket Friendo
          </Jump>{" "}
          the season before.
        </p>
        <p>
          The Magic would go on to lose Chorby Short on{" "}
          <Jump time="2021-04-07T00:45:00Z" redirect="/player/a3947fbc-50ec-45a4-bca4-49ffebb77dbe">
            Day 33
          </Jump>{" "}
          and Kurt Crueller, marked Observed on{" "}
          <Jump time="2021-04-08T22:45:00Z" redirect="/player/114100a4-1bf7-4433-b304-6aad75904055">
            Day 78
          </Jump>
          , when Crueller <Jump time="2021-04-08T22:02:06Z">entered the Secret Base mid-game</Jump> and immediately
          vanished from the roster. Fans were not having a good time. While Glover was a mediocre, if beloved for being
          a Credit to the Team and Fire Eater, player, Short and Crueller were both fan favorites and quite good.
        </p>
        <p>
          Going into Season 16, fans of the Magic collectively attempted to be as uninteresting as possible, going so
          far as to claim they were fans of the “Yosemite Clerics/Science” in the hopes of confusing whatever entities
          had had it out for the team. This did not work. In Season 16, both{" "}
          <Jump time="2021-04-16T19:45:00Z" redirect="/player/9a031b9a-16f8-4165-a468-5d0e28a81151">
            Tiana Wheeler
          </Jump>{" "}
          and{" "}
          <Jump time="2021-04-16T21:45:00Z" redirect="/player/63512571-2eca-4bc4-8ad9-a5308a22ae22">
            Oscar Dollie
          </Jump>{" "}
          were also Redacted, on Days 97 and 99.
        </p>
      </Entry>
      <Entry title="Magic 8 Ball" date="Season 17, Day 99" time="2021-04-23T19:45:00Z" redirect="/standings">
        <p>
          Going into Season 17, Magic fans were exhausted. Sporting as many players in the lineup as in the rotation
          wasn’t a good look for a team staring down the barrel of the Dallas Steaks and Canada Moist Talkers as the
          upper echelon of the Mild League.
        </p>
        <p>
          However, a pair of clever roster shifts prepped Magic for a highlight season: First, there was James Mora, a
          Feedback transfer from Jaylen Hotdogfingers’s much-discussed Fliickerrriiing world tour. Mora was an
          acceptable pitcher, but had stellar batting stats. The fans cast a significant amount of Votes since they
          acquired him to make the Catboy Batboy bat, and it finally stuck. Second, there was Melton Telephone, who
          Francisco Preston was Foreshadowed for. Melton was a strong pitcher with “good bones;” they had strong
          Ruthlessness and especially high Unthwackability. The newly tiny Magic roster suddenly had good defense to
          capitalize on that, even if it had some staffing issues.
        </p>
        <p>
          The end result: A record high, and very “As Above, So Below”, season for the Magic, ending with 72 wins at the
          top of Mild League in record, if not in title. The Magic were eliminated in the Mild League Division Series
          against the Hawaiʻi Fridays; Telephone suffered a debilitating Consumer attack on{" "}
          <Jump time="2021-04-24T01:13:19Z">Day 104</Jump>, and simply could not perform to their usual standard on the
          last day of{" "}
          <Jump season={17} day={105}>
            their postseason run
          </Jump>
          .
        </p>
      </Entry>
      <Entry title="Jesús Koch Places the Fifth Base in the Oven" date="Season 20, Day 38" time="2021-06-16T05:13:02Z">
        <p>
          During the <Jump election={19}>Season 19 Election</Jump>, Jesús Koch was given the first Legendary Item of the
          Expansion Era:{" "}
          <Jump election={19} redirect="/item/eecc9bf3-96b5-4ea9-9a4a-05f0a0d586f0">
            The Super Roamin’ Fifth Base
          </Jump>
          . Its wielder would Roam at the end of play every week, and it seemed to do nothing else.
        </p>
        <p>
          This meant that the Moist Talkers, Koch’s first and only team at the time, were prepared when he first roamed
          to the Pies on{" "}
          <Jump time="2021-06-14T23:45:00Z" redirect="/team/23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Season 20, Day 9
          </Jump>
          ,{" "}
          <Jump time="2021-06-15T08:45:00Z" redirect="/team/b72f3061-f573-40d7-832a-5ad475bd7909">
            Day 18
          </Jump>{" "}
          to the Lovers,{" "}
          <Jump time="2021-06-15T17:45:00Z" redirect="/team/eb67ae5e-c4bf-46ca-bbbc-425cd34182ff">
            Day 27
          </Jump>{" "}
          back home, and finally to the Magic on{" "}
          <Jump time="2021-06-16T02:45:00Z" redirect="/team/7966eb04-efcc-499b-8f03-d13916330531">
            Day 35
          </Jump>
          . Moist Talkers fans shared a welcome packet, full of Koch’s lore and personal details, with each team he
          Roamed to. Three days later, Koch decided to stay with the Magic, placing the Fifth Base in the Oven to the
          chagrin of the Pies.
        </p>
        <p>
          The Magic got one of the fans’ most beloved players, who they believe bonded with another favorite player,
          Bonk Jokes, over a love of trolling the Philly Pies. Some say Jokes dared Koch to do it.
        </p>
      </Entry>
      <Entry
        title="James Mora Drops the Force Field of Observation"
        date="Season 21, Day 79"
        time="2021-06-24T23:15:23Z"
      >
        <p>
          The Idol Board is not a kind or gentle place to be. In Season 17, it was revealed that players who received
          five MVP commendations became Legends. They were removed from play, and replicas of them were available from
          the Gift Shop.
        </p>
        <p>
          During the Magic 8 Ball season, Season 17, James Mora was considered a prime idol, along with pretty much any
          Magic batter; the small lineup made Snacks pay out on volume. However, once the lineup reinflated to an
          average size, Mora remained at or near the top of the Idol Board, high enough to continue receiving MVP awards
          season after season.
        </p>
        <p>
          By the end of Season 19, Magic fans were well aware James Mora would be Vaulted by Season 21. A plan was
          hatched to potentially prevent Mora’s Vaulting, with Steaks and Tigers fans. During a Tarot Reading during
          Season 17’s Earlsiesta, Steaks player Orville Manco was given the{" "}
          <Jump time="2021-04-20T17:45:00Z" redirect="/item/483e2719-6901-4ba0-b564-4b0ec548eeca">
            Force Field of Observation
          </Jump>
          , an item that prevented any roster movement or removal. Manco showcased this by, while being Observed,
          avoiding Redaction in Coffee weathers.
        </p>
        <p>
          Thus, Magic fans, with the Steaks’ blessing, voted for James Mora to Take Orville Manco’s Force Field of
          Observation during the <Jump election={20}>Season 20 Election</Jump>. Mora dutifully held it for 78 games.
          However, on Season 21, Day 79, the Community Chest opened, and a{" "}
          <Jump time="2021-06-24T23:45:00Z" redirect="/item/e04edf58-5c5a-46e3-8e4d-15b6703228cf">
            Head Bat
          </Jump>{" "}
          caught Mora’s eye.
        </p>
        <p>
          After Mora dropped the Force Field of Observation, fans made a concerted effort to vote to Take the{" "}
          <Jump season={21} day={84} redirect="/item/eecc9bf3-96b5-4ea9-9a4a-05f0a0d586f0">
            Super Roamin’ Fifth Base
          </Jump>{" "}
          from Huber Frumple when he held it between Days <Jump time="2021-06-25T03:26:13Z">83</Jump> and{" "}
          <Jump time="2021-06-25T16:05:24Z">95</Jump>, to give to Mora.
        </p>
        <p>
          James Mora <Jump time="2021-06-25T21:03:20Z">was Vaulted</Jump> after Day 99. The Will did not pass.
        </p>
      </Entry>
      <Entry title="Debut in Glory" season={23} day={12}>
        <p>
          In the <Jump election={22}>Season 22 Election</Jump>, the Yellowstone Magic won the Little Swap Blessing,
          trading their most eDense player, Attractor Tiana Wheeler, for a random other team’s least eDense player, the
          Moist Talkers’ Magnified Negative Ziwa Mueller. Ziwa, being the second Moist Talkers transplant in recent
          seasons, went over well with Magic fans. Magnified players were flashy and fun, and the Magic were one of the
          few teams with multiple in their lineup. This resulted in some truly absurd plays.
        </p>
        <p>
          The Magic weren’t favorites to win this game, with star batter Bevan Wise on the mound after{" "}
          <Jump time="2021-06-15T23:19:57Z">an unfortunate Reverb</Jump> and fellow slugger Francisco Preston cursed
          with the Subtractor Modification. In spite of this, in the bottom of the 9th, with a whopping 14-run deficit,
          Bonk Jokes stepped up to the plate with no fear. With the help of Sum Sun and a series of killer plays, the
          Magic went on to score 25 runs in a single inning. This game played a significant role in Magic fans voting
          for and receiving the Enhance Blessing in the <Jump election={23}>Season 23 Election</Jump>, Magnifying the
          whole team.
        </p>
        <LineScore id="3589a152-c46c-444b-b14e-2b61e44c9ec9" />
      </Entry>
      <Entry title="Reigning Champs of the Underbracket" season={23} day={115}>
        <p>
          Thanks to various reasons, including Eizabeth Elliot being a frankly terrible pitcher, Bevan Wise being worse,
          Francisco Preston’s Subtractor and Logan Rodriguez’s Skipping, the Yellowstone Magic secured the Mild League’s
          third seed in the Underbracket. In the Underbracket’s Mild League Champion Series, the Magic unwon against the
          Kansas City Breath Mints, 3-1.
        </p>
        <p>
          This was in no small part due to the efforts of Kirkland Sobremesa. Sobremesa was the first player to clock in
          during a <Jump time="2021-07-24T02:02:50Z">Night Shift</Jump> in the first instance of Night weather, thanks
          to Yellowstone National (Ball)Park’s increased frequency. Sobremesa not only sent ace batter Bevan Wise to the
          shadows in return, but was also pretty bad at Blaseball regardless. The Magic then proceeded to also defeat
          the Mechanics, 3-1, and unsweep the Georgias, thanks in no small part to Sobremesa forming a massive hole in
          the lineup.
        </p>
        <p>
          On Day 115, the Yellowstone Magic unwon the Underbracket, the first and only championship ring the Yellowstone
          Magic would win during Beta. This was also the last underchampionship ring that would be won in Beta; in the
          very next season, Alexandria Rosales of the Houston Spies hit a run into the Black Hole (Black Hole),{" "}
          <Jump time="2021-07-28T12:27:07Z">nullifying the Underbracket</Jump>. This left the Magic reigning
          Underchampions.
        </p>
      </Entry>
      <Entry title="Nullification" date="Season 24, Day 29" time="2021-07-27T20:11:31Z">
        <p>
          As recipients of the Enhance Blessing and teamwide Magnification in the Season 23 Election, the Magic were
          responsible for a lot of nullifications. Not only did Rey Wooten nullify Maximum Sun on Day 29, Bonk Jokes the
          Hotel Motel on <Jump time="2021-07-28T01:08:52Z">Day 34</Jump>, Bevan Wise Sun 0.1 on{" "}
          <Jump time="2021-07-28T13:29:08Z">Day 45</Jump> and Yellowstone National (Ball)Park’s Grind Rail on{" "}
          <Jump time="2021-07-30T13:21:13Z">Day 92</Jump>, and Jesús Koch Voicemail on{" "}
          <Jump time="2021-07-28T15:06:17Z">Day 47</Jump>, but they were also present for the nullification of{" "}
          <Jump time="2021-07-27T20:21:54Z">Free Wills</Jump>,<Jump time="2021-07-27T21:19:55Z">Turntables</Jump>,{" "}
          <Jump time="2021-07-28T13:21:02Z">Bird Hotels</Jump>, <Jump time="2021-07-28T13:50:56Z">Stables</Jump>, the{" "}
          <Jump time="2021-07-28T18:13:14Z">Phantom Thieves’ Guild</Jump>, and Yellowstone’s{" "}
          <Jump time="2021-07-27T20:21:54Z">Big Buckets</Jump>.
        </p>
        <p>
          Perhaps most impressively, they also helped the Philly Pies nullify themselves on{" "}
          <Jump time="2021-07-30T00:15:16Z">Day 79</Jump>, in spite of the fact that the Pies literally{" "}
          <em>couldn’t swing</em> at the time thanks to Avoidance. Magic fans’ rallying cries of “EAT ALL THE RULES” and
          “OH GOD SORRY PIES” rang across the league.
        </p>
      </Entry>
    </History>
  );
}
