/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import Spoiler from "../../components/spoiler";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "3445c14f-87ee-49a0-8fa0-53bcb940bc02",
        "7f079f80-ceef-404b-b3fa-997c1b2c2469",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="YourGenderHere, Agent Blaze, OJ, Crop, Parish, Cloud, and Agent Willow">
      <Entry title="The Clone" date="Season 6 Election" time="2020-09-13T19:30:00Z" redirect="/offseason">
        <p>
          In accord with the Spies’ perennial role as “the team that a new mechanic happened to for the first time”,
          Spies pitcher Donia Bailey was struck by the “Party Line” Blessing, which promised the winning team a brand
          new clone. Donia was sent to the Shadows at the same time as the considerably more famous Mike Townsend— a
          dimension from which she, unlike Mike, has never returned from.
        </p>
        <p>
          This was to make room for Evelton McBlase II, a clone of{" "}
          <Jump time="2020-09-13T19:30:00Z" redirect="/player/a5f8ce83-02b2-498c-9e48-533a1d81aebf">
            the Fridays’ pitcher
          </Jump>{" "}
          and the very first numbered duplicate to join Blaseball since the Return. Evelton McBlase II, immediately
          dubbed “Eviltwin” by the Spies, was a near-exact clone of the original McBlase statwise, who was a
          below-average performer on the mound at the time. This would have been more concerning had the Spies not also
          won a blessing that swapped the winner’s worst pitcher, now Eviltwin, with the best-at-pitching batter on the
          roster, Alexandria Rosales.
        </p>
        <p>
          Eviltwin would later be traded away to the Fridays in{" "}
          <Jump time="2020-09-20T19:30:00Z" redirect="/offseason">
            a dastardly election scheme
          </Jump>
          ; Alexandria would later become the Spies’ ace pitcher and subsequently star batter. Season 6 marked a turning
          point for the Spies in terms of plot, being Perceived by it for the first time, and performance, with an
          actually good rotation.
        </p>
      </Entry>
      <Entry title="NaN’s First Feedback" season={9} day={6} time="2020-10-05T21:17:54Z">
        <p>
          At the end of Season 8, Day 99, Unlimited Tacos player{" "}
          <Jump time="2020-09-25T19:17:48Z" redirect="/leaderboard">
            NaN was 11th on the Idol Board
          </Jump>
          . As a result, they gained the Receiver and Flickering modifications; Receiver had not been seen before.
          Flickering, however, was a permanent modification for NaN, unlike its previous appearance as a Weekly mod.
        </p>
        <p>
          On Season 9, Day 6, the Tacos played their first Feedback game of the season against the Houston Spies. At the
          bottom of the 8th, NaN experienced their first Feedback, swapping with Valentine Games. NaN would not spend
          long on the Spies, though, as the following game against the Mexico City Wild Wings was also in Feedback, and
          <Jump time="2020-10-05T22:04:40Z">NaN swapped for Sosa Hayes</Jump>. NaN was only on the Spies for a total of
          4 innings, at the time one of the shortest periods a player had spent on a team.
        </p>
      </Entry>
      <Entry title="The Season 9 Reverb" season={9} day={52} time="2020-10-07T19:22:06Z">
        <p>
          The Spies and their legendary defense had been on track for the Internet Series. Instead, a catastrophic
          {" "}<Jump time="2020-10-07T19:23:06Z" redirect="/team/9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            full-team Reverb
          </Jump>{" "}
          put all three of the Replacement Elbows, a pitching Blessing won in just{" "}
          <Jump time="2020-09-27T19:30:00Z" redirect="/offseason">
            the previous Election
          </Jump>
          , into the lineup, and replaced them with batters who did not know how to pitch. This destroyed the Spies’
          chances, starting a ten-season streak of repeated chokes on the way to the Internet Series, as well as
          confirming a superstition about the cursedness of Wednesdays that persists to this day.
        </p>
      </Entry>
      <Entry title="Denzel Scott’s Shelling" season={12} day={37} time="2021-03-03T05:12:02Z">
        <p>
          During a game where the Tokyo Lift were being humiliated by the Spies 12-0, Wyatt Quitter of the Lift tasted
          the infinite and Shelled the Spies’ Denzel Scott. This was the first instance of a Honey Roasted player
          Shelling someone, thus revealing what the modification did. Unused to being “plot relevant”, the Spies were
          startled to see the Ticker comment “JUST WAKING UP, WHAT HAPPENED WITH WYATT QUITTER AND DENZEL SCOTT” and to
          find Denzel, a player originally lored to be extremely forgettable and sometimes a car, at the center of
          Blaseball news.
        </p>
        <p>
          Denzel would be Shelled until <Jump time="2021-03-13T03:24:22Z">Season 13, Day 105</Jump>, by which point they
          had missed <Jump time="2021-03-11T22:05:32Z">two</Jump> <Jump time="2021-03-12T20:30:01Z">Incinerations</Jump>{" "}
          on the team. This chain of events caused the Spies fanbase to rework Denzel’s lore in reflection of the trauma
          of Shelling, increasing their presence as a staple of the Spies’ lore and roster.
        </p>
      </Entry>
      <Entry title="Operation Nullpark" date="Season 13 Earlsiesta" time="2021-03-09T18:50:00Z">
        <p>
          Refusing to trust the Coin’s newly unveiled shiny thing, Ballparks, the Spies decided to launch Operation
          Nullpark, an effort to avoid funding the construction of a Ballpark by refusing to contribute to the planting
          of a Flag. While this did not succeed in preventing ILB contractors from finding An Undisclosed Location, the
          Spies did manage to avoid the million-Coin mark for over 19 hours.
        </p>
      </Entry>
      <Entry title="Son Scotch’s Incineration" season={14} day={36} time="2021-03-17T03:07:13Z">
        <p>
          Hearts were shattered across the league when, at the top of the third inning against the Sunbeams, original
          Spies player Son Scotch was Incinerated. Though Scotch had never been a notable player statistically, their
          widely-agreed-upon lore was that they were perceived by those who knew them as their son despite all logic to
          the contrary, meaning they were usually portrayed as an adorable child beloved by the team and, thus, the
          Spies fanbase.
        </p>
        <p>
          Son’s loss would be overshadowed by the death of one of the most notable players in Blaseball history,{" "}
          <Jump time="2021-03-19T07:17:15Z">York Silk</Jump>, later in the season, and their replacement Jomgy
          Rolsenthal performed fairly well, but the impact of Son’s loss was felt not in Spies performance or strategy,
          but in the team’s lore and culture. Much of Spies lore afterward acknowledged how brutal Son’s death was to
          the team, and Spies fans commemorated Day 36 of every season as the “Son Scotch Memorial Game” or “Sonday.”
        </p>
      </Entry>
      <Entry title="The Becker Solis Incident" date="Season 14 Election" time="2021-03-21T18:15:00Z">
        <p>
          Every Election after Season 6, the Spies would collectively ask the question: “Is this the year we bring
          beloved terrible pitcher Donia Bailey out of the Shadows she was thrust into alongside Mike Townsend so long
          ago?” Methods for rescuing Shadowed players were few and far between until the advent of Wills, when
          Foreshadow immediately presented itself as a viable option. While the Spies prioritized other team goals
          during the first two seasons that Wills were in play, everything was set for Donia’s return in Season 14:
          Allergy-stricken batter Morrow Wilson was due for retirement, and Donia could take their place.
        </p>
        <p>
          While things did go according to The Plan (of course), things did not go as originally intended, resulting in
          Becker Solis on the rotation, star batter Fitzgerald Blackburn in the Shadows, and former Friday Karato Bean
          pitching for the Lovers. After initial confusion, Spies fans reacted by loring Becker as a possible “saboteur”
          who forged documents to get onto the roster instead of Donia, possibly out of a desire to reunite with former
          Spy and ostensible sibling Andrew Solis. The Incident stands simultaneously as an example of Donia Bailey’s
          notably recurring misfortune, and the Spies fans’ enthusiasm to develop compelling lore in spite of subverted
          electoral expectations.
        </p>
      </Entry>
      <Entry title="Psychic Blood" date="Season 16 Election" time="2021-04-18T18:15:00Z">
        <p>
          Season 16’s Election came with three new Blood Types for teams to vote for. One of these was Psychic Blood,
          under the Blessing “Mind Trick”. The Houston Spies campaigned hard for this blessing, launching a propaganda
          war against the Tokyo Lift and other teams. When the Election results came in, the Spies ended up winning the
          Blessing with 19% of the vote. All players on the Spies’ roster at the time gained Psychic Blood as their
          Blood Type. This allowed them in future games to use Mind Tricks to change outcomes in a game for their
          benefit, with the first on <Jump time="2021-04-19T17:24:05Z">Season 17, Day 3</Jump>.
        </p>
      </Entry>
      <Entry title="Salmon Dam the Spies" season={18} day={100}>
        <p>
          Going into the Season 18 playoffs, there weren’t many reasons to be hopeful. Heading into Day 80 as the number
          one seed, the Spies would go on a devastating slide, only qualifying as the fourth seed due to the Georgias
          winning over the Tacos on{" "}
          <Jump season={18} day={98}>
            Day 98
          </Jump>
          . Additionally, the Wild Card pit the Spies against the worst possible matchup, the Sunbeams, making things
          even bleaker. However, playoffs were a world where, any given weekend, the unexpected could happen. It did.
          Game 1 was at REDACTED and, as such, Home Field Advantage granted the Spies a free run. A hard-fought inning
          later, the score was 0-1.
        </p>
        <p>
          However, an unexpected factor arose, as Salmon swam upstream, resetting the inning. The Salmon were,
          unexpectedly, thorough enough to erase Home Field Advantage as well. Whatever hopes the fanbase had were now
          dashed. This would mark the first, and only, instance where Salmon eliminated a pre-game advantage. Despite
          the series ending 2-1 in the Sunbeams’ favor, they were in fact outscored 7-10, without factoring Home Field
          Advantage.
        </p>
        <LineScore
          id="3445c14f-87ee-49a0-8fa0-53bcb940bc02"
          salmon={[{ inning: 1, away: [0, 0, 1], home: [1, -1, 0] }]}
        />
      </Entry>
      <Entry title="Sosa Hayes and Siobhan Chark Execute the Plan" season={19} day={2} time="2021-05-17T16:06:23Z">
        <p>
          Siobhan Chark, originally on the Atlantis Georgias, swapped teams with Sosa Hayes due to Feedback. At the
          time, this was frustrating, but not awful: Hayes had just been moved to the lineup in the previous Election
          for their excellent baserunning, but Chark wasn’t horrendous. Chark later Feedbacked to the Sunbeams for Quack
          Enjoyable on <Jump time="2021-05-19T08:22:10Z">Day 41</Jump>, and{" "}
          <Jump time="2021-06-18T10:21:01Z">gained Flickering Socks</Jump> during their time in the Hellmouth. These
          socks made them more likely to Feedback, which the Spies ended up on the other end of when they swapped with
          Comfort Septemberish on <Jump time="2021-06-21T19:31:43Z">Season 21, Day 5</Jump>. Septemberish returned that
          Election, but was traded for Enjoyable rather than Chark. This left Chark on the Spies as the worst batter,
          meaning that they eventually ended up Voicemailed into the shadows on{" "}
          <Jump time="2021-07-02T02:23:48Z">Season 22, Day 81</Jump>. In the meantime, Hayes got to Party a total of 5
          times while on the Georgias and, later, the Miami Dale, an absurd rate compared to the amount of Parties the
          Spies typically have.
        </p>
        <p>
          These two plots came together on <Jump time="2021-07-21T14:22:20Z">Season 23, Day 47</Jump>. Chark had just
          Voicemailed back out onto the Spies lineup{" "}
          <Jump time="2021-07-21T13:23:41Z">the game before</Jump>, and Hayes had returned to the Georgias after{" "}
          <Jump season={22} day={19} redirect="/player/b7267aba-6114-4d53-a519-bf6c99f4e3a9">
            a brief Fifth Base-induced stint on the Dale
          </Jump>
          . In the bottom of the 7th, everything fell into place: Chark, Flickering, Feedbacked once again for Sosa
          Hayes, returning both back to the teams they were originally on before Season 19. This time, though, Hayes was
          6.84 total stars better than they were when they left, and were now a league-leading hitter and baserunner,
          something impossible without their initial absence. Within Spies culture, this series of events is heralded as
          proof that the Plan, the idea that everything, including the bad, is part of a greater plot to help the Spies{" "}
          <Spoiler>win</Spoiler>, was very much real.
        </p>
      </Entry>
      <Entry title="I Simply Refuse to Die" date="Season 19 Election" time="2021-05-23T18:15:00Z">
        <p>
          Seeing an opportunity to cure their lineup of a long-standing blemish, the Kansas City Breath Mints voted to
          Revoke a 6.4-star Pudge Nakamoto during the{" "}
          <Jump time="2021-03-07T19:15:00Z" team="adc5b394-8f76-416d-9ce9-813706877b84">
            Season 12 Election
          </Jump>
          , which took effect shortly after Pudge’s stats were nearly doubled by an untimely Infuse. After being
          tragically thrust into the Hall of Flame on <Jump time="2021-04-20T02:18:19Z">Season 17, Day 12</Jump>, Pudge
          rejected their fate and Roamed out of the Hall and onto the Spies’ roster after the Season 19 Election. They
          were an unexpected addition to the Agency, but a welcome one nonetheless, and an immediate favorite for
          players to root for during games. A few more Roamings and{" "}
          <Jump time="2021-07-22T08:09:02Z">another denied Incineration</Jump> landed Pudge squarely in the Philly Pies’
          Shadows, where they continued to be An Excellent Friend.
        </p>
      </Entry>
      <Entry
        title={
          <>
            Spies (Nearly) <Spoiler>Win</Spoiler>
          </>
        }
        season={20}
        day={104}
      >
        <p>
          Season 20 was fruitful for the Spies, who enjoyed an incredibly strong 2-person pitching rotation, with
          Alexandria Rosales securing victories against nearly every opponent thanks to an{" "}
          <Jump time="2021-06-17T15:45:00Z" redirect="/item/dbdde4f1-a82e-4864-9451-53a9369e27a8">
            Underhanded Passionate Helmet
          </Jump>
          . The Spies went into the postseason with a chart-topping 70-29 record, but were immediately tested by a
          triple whammy in Game 2 against the Miami Dale: Black Hole weather under Sun(Sun), the Dale Underperforming,
          and an incompetent Chorby Soul Replica on the pitcher’s mound meant that scoring too many runs could end the
          Spies’ chance to move to the semifinals on the spot.
        </p>
        <LineScore id="7f079f80-ceef-404b-b3fa-997c1b2c2469" />
        <p>
          The Spies managed to escape this conundrum and a similarly tense set of games against the LA Unlimited Tacos.
          However, their luck ran out when the Internet Series pitted them against the truly monstrous Core Mechanics,
          who, thanks to several convenient Shellings and Elsewhere players,{" "}
          <Jump season={20} day={116}>
            narrowly defeated them
          </Jump>{" "}
          in a nail-biting 3-2 series for the ages.
        </p>
      </Entry>
      <Entry title="First Rule Nullification" season={24} day={28} time="2021-07-27T19:28:54Z">
        <p>
          During Season 24’s Earlsiesta, Black Hole (Black Hole) appeared on the site, alongside{" "}
          <Jump season={24} day={28} redirect="/depth">
            a new Map
          </Jump>
          . When Day 28 started, Jazz began turning into Black Hole (Black Hole) weather. No one knew what this weather
          did until a game between the Hellmouth Sunbeams and Houston Spies. Commissioner Vapor of the Houston Spies hit
          a single in the bottom of the 8th, batting in Fitzgerald Blackburn and giving the Spies 2 runs due to Vapor’s
          Magnified modification; the score was at 8-10. Moments later, a new message appeared: “The Spies collected 10!
          Black Hole (Black Hole) became Agitated. Black Hole (Black Hole) nullified Tunnels!”
        </p>
      </Entry>
      <Entry title="Floating Point Error" season={24} day={56} redirect="/depth">
        <p>
          During Season 24, the Spies wanted to head to the Desert, following the Sunbeams and other teams. On Day 56,
          the Map showed that the Spies had reached the corner, their coordinates showing as X: -1.000 and Y: -1.000.
          Despite this, the Spies were not Scattered like the Sunbeams, Mechs, or Shoe Thieves. Further investigation
          revealed that the Spies had missed the Desert by 0.00001, much to their dismay. The Spies wouldn’t Scatter
          until{" "}
          <Jump season={24} day={57} redirect="/team/9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            the next day
          </Jump>
          .
        </p>
      </Entry>
    </History>
  );
}
