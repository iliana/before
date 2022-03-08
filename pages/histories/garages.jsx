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
        "34ef84d9-77f7-4b3a-a92d-6d5b9120f80b",
        "f7ad7826-ca6e-49c2-818e-190408b046fe",
        "cfd4f578-84f3-4078-a4f5-60103338c82a",
        "4f63ec6a-094c-44d2-945d-1325b1f61ad3",
        "47bcac42-f651-4fc9-9f93-5567a7b10daf",
        "fb88756a-6aa1-4ec5-b988-0a1285e045f3",
        "3d953e88-5749-4b1b-822b-336d4e3d01b5",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="fionna adams, Riley “Navi” Murphy, squirrel, and Leo Mathonwy">
      <Entry title="The Incineration of Unremarkable Derrick Krueger" season={3} day={80}>
        {/* insert data */}
        <p>
          Season 3 lit the Garages’ roster on fire. Bennett Browning was incinerated on <Jump time="2020-08-03T22:20:53Z">Day 4</Jump> during BLASPHEMY{/* Red like index Shelled One color? */}, replaced by the beloved Tiana Cash, who would be incinerated on <Jump time="2020-08-05T17:04:08Z">Day 47</Jump>. Shaquille Torres was incinerated on Day 74 during the Shelled One's post-<Jump team="878c1bf6-0d21-4659-bfee-916c8314d69c" season={3} day={73}>Grand Unslam</Jump> monologue. The final incineration for the Garages
          this season would be Derrick “Klutch” Krueger, Jaylen Hotdogfingers’ replacement, tying the Garages with the
          Charleston Shoe Thieves for the most incinerations this season. Most importantly, however, Krueger’s death was
          the final push the fans needed to realize that Mike Townsend was not a disappointment, but a credit to the
          team.
        </p>
      </Entry>
      <Entry title="The Garages Suck, or: The Garages are Okay+" season={6} day={108}>
        <p>
          After a season spent deliberating over Jaylen Hotdogfingers’ necromancy, fans were excited for the Garages’
          first postseason appearance, hoping that the star pitcher could be resurrected to a team with one championship
          under their belt. Instead, the Garages were swept by the Baltimore Crabs, beginning a long history of the
          Garages choking in the postseason.
        </p>
        <LineScore id="34ef84d9-77f7-4b3a-a92d-6d5b9120f80b" />
        <p>
          Season 7 saw the Garages win <Jump season={7} day={105}>their first game</Jump> in the Mild League Championship
          Series against Mexico City, before the Wild Wings won the next three. The Pies swept the Garages in <Jump season={8} day={100}>Season 8’s
          divisional series</Jump>, and the Shoe
          Thieves beat the Garages in 4 during <Jump season={9} day={108}>Season 9’s MLCS</Jump>. Season 11 saw the Garages in the
          <Jump season={11} day={116}>Internet Series</Jump> once again, caught
          in Sun 2 and Black Hole’s loops before losing to the Hellmouth Sunbeams in 5 games, but with only 4 wins
          between them. In Season 12, the Garages made it to <Jump redirect="/league" season={12} day={116}>game 5</Jump> against the Hades Tigers before
          being crushed, 2-7. While the next two seasons saw the Garages in the middle of the league, Season 15 saw the
          team’s record drop like a rock in a sea of immateria. Seattle hosted Party Time for the first time that
          season, finishing the season with <Jump redirect="/standings" season={15} day={100}>a record of 25-74</Jump>.
        </p>
        <p>
          The team’s record never went above 0.500 for the rest of the Expansion Era, even when they next entered the
          postseason in Season 19. Due to Turntables, teams with the lowest scores in a regular season game would win
          their games, seeing the Garages <Jump redirect="/standings" season={15} day={100}>second in the league behind the Wild Wings</Jump>.
          The postseason was under regular scoring, however, and the Garages made it to the Internet Series once again,
          before losing in <Jump redirect="/league" season={19} day={117}>game 5</Jump> to the Tokyo
          Lift. The Garages’ only run during this game was via the Home Field Advantage modification, and Terrell
          Bradley, the starting pitcher, showed true dedication to the Garages’ tradition of choking and <Jump redirect="/league" time="2021-05-23T00:26:49Z">gave up 10 runs</Jump>, faxing out for Nolanestophia Patterson. Patterson would throw one pitch that game, to Silvaire Semiquaver,
          who hit it right into Alaynabella Hollywood’s glove for the third out of the top of the 9th.
        </p>
        <LineScore id="f7ad7826-ca6e-49c2-818e-190408b046fe" />
        <p>
          Seattle would host Party Time the next two seasons, which also meant appearances in the Underbracket, a
          separate postseason tournament for the worst-performing teams, where the lowest scoring teams would win their
          games. Even here, the Garages failed to perform; they couldn’t perform well enough in the regular season to
          make it to the Overbracket, but they were too good to lose to other teams and take the Underchampship. The
          Garages, as fans began to say, were “okay+.”
        </p>
      </Entry>
      <Entry date="Season 8, Day 56" title="Expand Band" time="2020-09-23T23:03:38Z">
        <p>
          When most people think of the effects Jaylen Hotdogfingers had on the league, they remember her Season 7
          Instability Debt, her world tour, or her stint on the PODS and Hall Stars. Ask the Garages, however, and you
          might get a different answer: Season 8. After Season 7, Jaylen saw her Debt Refinanced, and her pitches marked
          players as more likely to feedback, instead of facing incineration.
        </p>
        <p>
          While the Garages managed to escape Season 7 unscathed, they took a huge hit this season, with a total of 5
          lost to the feedback. Seeing Lang Richardson, an original Garage, go to the Pies on <Jump time="2020-09-22T12:20:32Z">Day 21</Jump> in exchange for Nolanestophia Patterson stung, and there was a tragic irony in Cedric Spliff swapping for
          Quack Enjoyable, noted replacement of Kiki Familia, on <Jump time="2020-09-23T09:14:38Z">Day 42</Jump>. It wasn’t until the feedback of fan favorite Allison Abbott for Paula Mason on Day 56 that Garages fans
          reassessed and changed their tune internally.
        </p>
        <p>
          The stance on Discord changed from the age old motto “Don’t break up the band” to “Once a Garage, always a
          Garage” and “Expand Band,” notions that would carry them to the end of the Expansion Era to ease the pain of
          the many players they would come to lose. Season 8 wasn’t done with them yet, however, as Paula Mason swapped
          for Paula Turnip on <Jump time="2020-09-24T14:25:39Z">Day 71</Jump>, and finally Farrell Seagull for Summers Pony on <Jump time="2020-09-26T15:00:56Z">Day 102</Jump>.
        </p>
      </Entry>
      <Entry date="Season 9, Day 7" title="Jaylen Hotdogfingers’ World Tour" time="2020-10-05T22:11:46Z">
        <p>
          Though she’s known forever as a Garage, Jaylen Hotdogfingers traveled the league extensively due to her
          permanent Flickering modification, acquired via <Jump redirect="/leaderboard" season={8} day={100}>Season 8’s idol board</Jump>.
          She first traveled to Philadelphia on Day 7, swapping with the Pies’ Betsy Trombone. She returned on <Jump time="2020-10-06T12:10:10Z">Day 21</Jump> in exchange for Henry Marshallow, before crossing the border to Canada on <Jump time="2020-10-07T20:16:34Z">Day 53</Jump> to swap places with the Moist Talkers’ Ortiz Morse. On <Jump team="eb67ae5e-c4bf-46ca-bbbc-425cd34182ff" time="2020-10-08T07:21:38Z">Day 64</Jump>, she went to the Charleston Shoe Thieves, sending back Beasley Gloom. Though her Flickering became
          Fliickerrriiing during <Jump redirect="/leaderboard" season={10} day={100}>Season 10</Jump>, <Jump redirect="/offseason" time="time=2020-10-18T19%3A30%3A00Z">she landed on the San Francisco Lovers</Jump> after the disbanding of THE SHELLED ONE’S PODS and played Season 11 on only one team, due to a lack of
          Feedback weather.
        </p>
        <p>
          Season 12 saw her world tour continue, going from the Lovers to the Yellowstone Magic on <Jump team="b72f3061-f573-40d7-832a-5ad475bd7909" redirect="/league" time="2021-03-02T03:15:04Z">Day 12</Jump> for Yeong-Ho Garcia, the Hawaiʻi Fridays on <Jump team="7966eb04-efcc-499b-8f03-d13916330531" redirect="/league" time="2021-03-04T00:00:51Z">Day 56</Jump> for James Mora, the Core Mechanics on <Jump team="979aee4a-6d80-4863-bf1c-ee1a78e06024" redirect="/league" time="2021-03-09T20:12:21Z">Season 13, Day 28</Jump> for Lizzy Pasta, and back to Seattle on <Jump redirect="/league" time="2021-03-11T08:06:08Z">Day 64</Jump> for Mindy Kugel. Fans elected to move Hotdogfingers to the Shadows, before she returned in <Jump redirect="/offseason" time="2021-04-11T18:30:00Z">Season 15’s
          election</Jump>. The next leg of her world tour started in Season 17, taking her to
          Charleston again on <Jump redirect="/league" time="2021-04-20T05:01:52Z">Day 15</Jump>, for Fitzgerald Wanderlust, and then to Yellowstone on <Jump team="bfd38797-8404-4b38-8b82-341da28b1f83" redirect="/league" time="2021-04-22T23:08:32Z">Day 79</Jump> for Inky Rutledge. Her world tour ended down in the Core, arriving on <Jump team="7966eb04-efcc-499b-8f03-d13916330531" redirect="/league" time="2021-04-23T10:10:39Z">Day 90</Jump> in exchange for Cravel Gesundheit, after Garages fans’ early-season votes to Reform her Fliickerrriiing paid
          off, <Jump redirect="/offseason" time="2021-04-25T18:15:00Z">rerolling the modification into Super Idol</Jump>.
        </p>
      </Entry>
      <Entry date="Season 10, Day 91" title="No Parties in Seattle" time="2020-10-16T11:15:38Z">
        <p>
          Despite Enhanced Party Time passing during the <Jump redirect="/offseason" time="2020-09-13T19:30:00Z">Season 6 elections</Jump>, Garages players
          remained wallflowers for the three following seasons as the team made it to the postseason. This streak was
          broken by Summers Pony on Season 10, Day 91, becoming the first Garage to ever party.
        </p>
        <p>
          Besty Trombone, however, still refused to give in, and they managed to avoid partying until <Jump time="2021-05-14T15:01:12Z">Season 18, Day 92</Jump>. Conversely, one Garage has partied enough for the team to create a tradition out of it. Arturo Huerta has a
          habit of partying on Day 97, having done so in <Jump redirect="/league" time="2021-03-12T18:05:26Z">Season 13</Jump>, <Jump redirect="/league" time="2021-03-19T17:11:37Z">Season 14</Jump>, and <Jump redirect="/league" time="2021-07-02T18:31:23Z">Season 22</Jump>. Due to this pattern, fans of the team decided that Day 97 is their birthday, and celebrate it every season.
        </p>
      </Entry>
      <Entry date="Season 11, Day 12" title="Goodwin Morin Gets Charmed" time="2020-10-20T03:00:36Z">
        <p>
          Getting Goodwin Morin to her star status was a labor of love, seasons in the making. She was boosted in the <Jump redirect="/offseason" time="2020-10-11T19:15:00Z">Season 9 elections</Jump> with the Secret Weapon blessing, which maxed out her stats, then
          pulled out of the Shadows during the <Jump redirect="/offseason" time="2020-10-18T19:30:00Z">Season 10 elections</Jump> with the Dark Star
          blessing. All eyes were on this legendary all-star to perform. So, naturally, her response to all this
          pressure was to get charmed by Kichiro Guerra, <Jump time="2020-10-20T03:05:24Z">Don Mitchell</Jump>, and <Jump time="2020-10-20T03:06:21Z">Alexander Horne</Jump> during her second-ever appearance on the mound, losing the game to the San Francisco Lovers. This made her one
          of the only two pitchers in the league to get charmed this many times in the season.
        </p>
        <LineScore id="cfd4f578-84f3-4078-a4f5-60103338c82a" />
      </Entry>
      <Entry date="Season 11, Day 116" title="Strategic Loops" time="2020-10-24T23:31:49Z">
        <p>
          One of the most amusing postseason runs for the Garages was in Season 11 against the Hellmouth Sunbeams, a
          seasons-long rivalry that finally came to a head. It all started as pitcher Lenny Marijuana stared down home
          plate. It was the bottom of the 10th, and the score was 6-5. All he had to do was keep it parked. Lenny,
          however, had something of a lead foot. As the runs ticked up, it dawned on him: If he let the Beams get 10
          runs, the count would reset thanks to Sun 2, and they’d both win. Lenny let up exactly 5 runs, ending the game
          6-0, marking Lenny’s first postseason shutout.
        </p>
        <LineScore id="4f63ec6a-094c-44d2-945d-1325b1f61ad3" />
        <p>
          <Jump time="2020-10-25T01:22:04Z">Betsy Trombone</Jump> and <Jump time="2020-10-25T02:26:39Z">Tot Clark</Jump> would come to employ this tactic as well, leaving the league in a perpetual state of Garages gaining and
          losing wins. This was until Arturo Huerta took the mound in <Jump season={11} day={120}>Game 5</Jump>, who let through 9 runs and parked
          it there, costing the Garages the last championship of the Discipline Era.
        </p>
        <LineScore id="47bcac42-f651-4fc9-9f93-5567a7b10daf" />
      </Entry>
      <Entry date="Season 12 Elections" title="Alaynabella Hollywood, an Entity Fueled By Chaos" redirect="/offseason" time="2021-03-07T19:15:00Z">
        <p>
          There was perhaps no Garage that owned the Expansion Era quite like Alaynabella Hollywood, starting the era at
          a paltry 4.7 combined stars and ending it with 21.3. Even her arrival to the team during the Season 12
          elections was an event, with star players Nagomi Mcdaniel and Goodwin Morin caught in the crossfire and
          Hollywood ending up one of the worst pitchers in the league. She wouldn’t see a win until <Jump redirect="/league" season={13} day={96}>Season 13, Day 96</Jump>, but wins aren’t everything for the Garages.
        </p>
        <LineScore id="fb88756a-6aa1-4ec5-b988-0a1285e045f3" />
        <p>
          In Season 15, she would battle the chewed-up Chorby Soul for most runs allowed, taking the lead on <Jump redirect="/league" season={15} day={13}>Day 13</Jump> but finally getting beat by one run
          on <Jump redirect="/league" season={15} day={59}>Day 59</Jump>. During the <Jump redirect="/offseason" time="2021-04-18T18:15:00Z">Season 16
          elections</Jump>, she managed to avoid getting shadowed a second time, by being shadowed
          for Mike Townsend and <i>then</i> moved to the lineup. On Season 17, Day 21, she was <Jump redirect="/league" time="2021-04-20T11:11:50Z">Blooddrained by Richardson Games</Jump>, and, in one of the only documented demonstrations of revenge, Hollywood returned the favor and <Jump redirect="/league" time="2021-04-20T11:24:48Z">drained
          Blood Hamburger</Jump>.
        </p>
        <p>
          She would go on to have <Jump redirect="/league" time="2021-06-24T19:27:01Z">one of the highest scoring skateboard tricks</Jump> in the League, and, to cap off her streak of chaos on <Jump redirect="/league" time="2021-07-21T04:12:28Z">Season 23, Day 37</Jump>, Alaynabella Hollywood stole Lucy Tokkan’s Underhanded Rock Helmet, which may or may not have cost the Philly
          Pies their chance at an evolution-inducing third championship.
        </p>
      </Entry>
      <Entry date="Season 14 Latesiesta" title="Did Anyone Hear an Echo?" redirect="/league" time="2021-03-18T15:45:00Z">
        <p>
          In Season 14, the Garages built Psychoacoustics in the Big Garage, and it came with an unexpected surprise:
          Wyatt Mason X, the tenth of thirteen Echoes given to every team that built Psychoacoustics that Latesiesta.
          Guessing that plot was afoot, Garages fans braced themselves for their newest player being temporary. Despite
          that, 45 minutes later MaX was given a unique nickname and became well-loved by fans before xe had even played
          a single game.
        </p>
        <p>
          As the other Wyatts began to Echo each other into Static starting on <Jump redirect="/league" time="2021-03-18T21:07:27Z">Day 77</Jump>, concern grew about the likelihood of MaX’s survival. Worried fans checked the schedule and plotted out which
          pairs would static and when, and if MaX could avoid a similar fate. As the number of Echoes dwindled, it
          looked likely that xe would be the last one standing and, by sheer luck, xe avoided a collision course with
          any other Wyatt.
        </p>
        <p>
          Although MaX echoed Elsewhere on <Jump redirect="/league" time="2021-03-19T17:14:13Z">Day 97</Jump>, starting a trend of echoing mod-heavy players and hanging out Elsewhere that would continue for most of xer
          career, xe gained a blessing that remained xer own in the <Jump redirect="/offseason" time="2021-03-21T18:15:00Z">Season 14 election</Jump>:
          Maximalist. Ten seasons later, despite numerous close calls, MaX was still on the Garages, even making it back
          from xer seventh and latest trip Elsewhere on <Jump redirect="/league" time="2021-07-30T12:12:58Z">Day 91</Jump> just in time for the Expansion Era to come to a close. No one expected MaX to stay, but xe managed to prove
          everyone wrong.
        </p>
      </Entry>
      <Entry date="Season 14 Elections" title="Chorby Soul Reenters the Ring" redirect="/offseason" time="2021-03-21T18:15:00Z">
        <p>
          As eDensity was examined during the beginnings of the Expansion Era, Chorby Soul drew attention. Some time
          between their incineration on <Jump time="2020-08-04T08:15:44Z">Season 3, Day 14</Jump> and the Expansion Era, <Jump redirect="/player/a1628d97-16ca-4a75-b8df-569bae02bef9" season={12} day={1}>Chorby Soul’s soulscream</Jump> grew so long that, on certain
          browsers, it would say “UNDEFINED” repeatedly, while in certain mobile browsers, it caused the phone to grow
          warmer until the page and browser were both closed.
        </p>
        <p>
          With a mere 200 votes, the Garages resurrected Soul during the Season 14 election, and the team’s new pitcher
          immediately drew the ire of Consumers. Their large soulscream made them their primary target, and each attack
          made their stats drop. Before the end of the week, on <Jump redirect="/league" time="2021-04-05T21:11:42Z">Day 7</Jump>, Soul’s stats dropped as low as they possibly could, displaying all zeroes. Their soulscream still made them
          a ripe target, though, and the team’s fans revered Soul, as they kept other players safe from the Consumers
          and potential Redaction. In the <Jump redirect="/offseason" time="2021-04-11T18:30:00Z">Season 15 election</Jump>, fans Reformed Soul’s
          Observation-causing Debt, then waved farewell as the New York Millennials Plundered the now-Unstable Soul.
        </p>
      </Entry>
      <Entry date="Season 19, Day 104" title="Tables Turned" redirect="/league" time="2021-05-22T01:20:39Z">
        <p>
          After finally succeeding in Exchanging Avila Guzman back onto the team during the <Jump redirect="/offseason" time="2021-05-16T18:15:00Z">Season 18 elections</Jump>, she promptly left once more, not even a full season later, on <Jump redirect="/league" time="2021-05-21T11:08:17Z">Day 91</Jump>. She feedbacked with Aldon Cashmoney IV, a replica, who would turn to dust at the end of the postseason.
          However, this was not the only loss the team would suffer this season. On Day 104, Sparks Beans became the
          first player to be incinerated on the Garages since Season 8, replaced by Lenjamin Zhuge. Although the Garages
          would go on to lose the Internet Series that season, Zhuge outperformed everyone’s expectations and became a
          beloved part of the team.
        </p>
      </Entry>
      <Entry title="We Don’t Want To Lose You" season={22} day={60}>
        <p>
          After being marked Unstable back to back in Season 7, on Days <Jump time="2020-09-18T17:16:04Z">96</Jump> and <Jump time="2020-09-19T20:20:36Z">107</Jump> respectively, Tot Clark and Malik Destiny were marked unstable twice in Season 22, in that order. This first came on <Jump redirect="/league" time="2021-06-30T01:21:07Z">Day 34</Jump>, where the week would finish without an Eclipse, and again on <Jump redirect="/league" time="2021-07-01T01:01:05Z">Day 58</Jump>, followed two days later by a Solar Eclipse game. Fans from the Garages and across the league rallied in
          Discord, swearing in defiance of the gods and rogue umps so much that moderation tools in use at the time were
          ratelimited, in an event later dubbed “Soliswearity” by the team. Tot and Malik escaped unscathed.
        </p>
      </Entry>
      <Entry date="Season 22, Day 99" title="Mike Townsend Hits a Grand Slam!" time="2021-07-02T20:06:44Z">
        <p>
          Mike Townsend has had a storied career, with epithets that rotated as often as he was called into and out of
          the Shadows. Originally a disappointment against anyone but <Jump season={5} day={11}>Jessica Telephone</Jump>, he was sent to the Shadows <Jump redirect="/offseason" time="2020-09-13T19:30:00Z">after
          Jaylen Hotdogfingers’ resurrection</Jump>. Townsend was unshadowed in the <Jump redirect="/offseason" time="2020-10-11T19:15:00Z">Season 9
          election</Jump>, reshadowed in <Jump redirect="/offseason" time="2020-10-18T19:30:00Z">Season 10’s election</Jump>, pulled
          back out in <Jump redirect="/offseason" time="2021-04-18T18:15:00Z">Season 16’s election</Jump>, and managed to avoid getting Faxed back in until <Jump redirect="/league" time="2021-05-12T05:14:53Z">Season 18, Day 37</Jump>. He remained in the Shadows until <Jump redirect="/league" time="2021-07-02T00:23:43Z">Season 22, Day 79</Jump>, when Townsend was Voicemailed to the roster as a batter. This was something of a meme amongst the team’s
          fans, and the meme paid off on the last day of the regular season.
        </p>
        <LineScore id="3d953e88-5749-4b1b-822b-336d4e3d01b5" />
        <p>
          Townsend went on to hit a second grand slam in <Jump time="2021-07-20T20:08:22Z">Season 23, on Day 29</Jump>.
        </p>
      </Entry>
      <Entry title="The End of an Era" redirect="/depth" season={24} day={98}>
        <p>
          With the team prepared to go out together for the Expansion Era’s finale, everyone was shocked when a series
          of devastating events tore four of the Garages’ original players from the team early in the season. On <Jump redirect="/league" time="2021-07-26T20:02:19Z">Day 6</Jump>, Tot Clark entered the Secret Base before being incinerated, managing to steal third base from beyond the
          grave when he exited it. Not long after his death, Oliver Mueller and Mike Townsend were both beaned by Niq
          Nyong’o on Day 19, Redacting them after play ended on Days <Jump redirect="/player/8b53ce82-4b1a-48f0-999d-1774b3719202" time="2021-07-27T10:25:00Z">20</Jump> and <Jump redirect="/player/c6a277c3-d2b5-4363-839b-950896a5ec5e" time="2021-07-27T11:25:00Z">21</Jump>, respectively. The team
          lost yet another player on <Jump redirect="/league" time="2021-07-27T21:31:07Z">Day 30</Jump>, when Lenny Marijuana was stolen by the Cookout’s Thieves’ Guild and given to the Carolina Queens. <Jump redirect="/league" time="2021-07-27T22:25:26Z">A day later</Jump>, Marijuana Voicemailed out from the Shadows, briefly becoming the star of the Queens before getting incinerated on <Jump redirect="/league" time="2021-07-28T01:15:09Z">Day 34</Jump>.
        </p>
        <p>
          Among the tragedies, the Garages decided to head to the Hall of Flame when the Navigate tab appeared during
          Earlsiesta, after an internal debate over whether or not the Hall Monitor is a god. After helping to melt the
          Coin on <Jump redirect="/depth" time="2021-07-30T02:50:00Z">Day 81</Jump>, fans decided to seek refuge in the Hall as the Black Hole (Black
          Hole) began to expand. However, they did not reach their destination in time and got nullified by the Black
          Hole (Black Hole) on Day 98.
        </p>
      </Entry>
    </History>
  );
}
