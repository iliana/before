import Link from "next/link";
import { TitleBreak, History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "bac30156-624e-4171-8f60-d660855b3fd5",
        "1ded3337-0240-41dd-8d2b-049671409c39",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="ambopteryx, Cicatricks, and HoneyFox">
      <Entry title="A Worm Welcome" season={13} day={1}>
        <p>
          The Ohio Worms, along with their fellow breach teams, stepped to plate for their first-ever game in the ILB.
          In the top of the 1st against the <Link href="lift">Tokyo Lift</Link>, original Worm Lenny Crumb used his
          first ever at-bat to hit a home run. Fans fondly remember this historic home run as a wonderful welcome of the
          Worms to Blaseball.
        </p>
      </Entry>
      <Entry title="Party Time Speedrun" season={13} day={67}>
        <p>
          The Worms managed to enter Party Time on Day 67, mostly due to the Ohio Worms having pitchers with fairly
          abysmal Ruthlessness &mdash; Patchwork Southwick, with the most pitching stars, had around .4 Ruthlessness.
          This set a new record for the earliest day a team entered Party Time, and was also the first time the team’s
          Modification Bottom Dweller activated, due to coming last in Wild Low, which boosted the stats of every player
          on the team. While some considered this season a wash with the team’s poor newly generated players, others
          consider this the first step in their long-term plan of gradual improvement. Worms to the moon!
        </p>
      </Entry>
      <Entry date="Season 13, Day 89" title="The Incineration of Augusta Chadwell" time="2021-03-12T10:06:27Z">
        <p>
          The Ohio Worms were already in Party Time. Fans were riding high on the knowledge that the team would be made
          stronger in just a few more games, as they were snugly placed last in the Wild Low. But of course, this is
          Blaseball, and there is no such thing as true safety. In an Eclipse game against the{" "}
          <Link href="dale">Miami Dale</Link>, Augusta Chadwell was Incinerated and replaced by Louber Ji-Eun. This was
          a tragic day for the Worms; their very first Incinerated player was only 12 days before the end of the season.
          Augusta Chadwell was an active player for less than a season, and just barely missed the team’s first Bottom
          Dweller boost. Worms fans still mourn the loss of Chadwell, often sectioning off strategy spreadsheets as the
          Augusta Chadwell Memorial Gardens in her honor.
        </p>
      </Entry>
      <Entry election={13} title="Pitching Machine Self-Plunder">
        <p>
          Pitching Machine joined the batting lineup in <Jump election={12}>the previous Election</Jump> and became a
          Batting Machine beloved by many early Ohio Worms fans. There was a creeping worry in the minds of many,
          though: Pitching Machine, being on the Idol Board, was a potential target for Plunder. In a last-ditch attempt
          to keep Pitching Machine on the team, Ohio Worms fans voted to Plunder PM themselves. If another team had
          Plundered Pitching Machine before them, they would be able to take them back immediately. However, fans’ fears
          were unfounded, and so the Worms Plundered PM from the Worms. From this point on, whether it was an actual
          option or not, Worms fans would suggest Plundering PM almost any time Election options were discussed.
        </p>
      </Entry>
      <Entry date="Season 14, Day 67" title="Feedback Detected" time="2021-03-18T10:11:49Z">
        <p>
          Throughout Wormstory, the Ohio Worms faced weather-induced roster changes fairly rarely. The only two times
          the Worms experienced Feedback swaps during the regular season was in Season 14 and Season 17. On Season 14,
          Day 67, NaN, a Worm at the time, swapped places with Rivers Rosa, and on{" "}
          <Jump time="2021-04-20T19:14:38Z">Season 17, Day 28</Jump>, original Worm Kaz Fiasco swapped with the{" "}
          <Link href="sunbeams">Sunbeams’</Link> Igneus Delacruz.
        </p>
        <p>
          Worms fans get attached to players extremely quickly, and so both Rivers Rosa and Iggy became valued Worms
          almost immediately. And so, it was with great pain that Worms fans watched the eventual fates of these two
          players: Rivers Rosa was targeted by Consumers three times during Season 18, on Days{" "}
          <Jump time="2021-05-13T02:07:13Z">58</Jump>, <Jump time="2021-05-13T20:09:24Z">75</Jump>, and{" "}
          <Jump time="2021-05-14T08:20:41Z">87</Jump>, and was subsequently stolen by the{" "}
          <Link href="tacos">Tacos’</Link> Phantom Thieves Guild in <Jump time="2021-07-02T15:23:29Z">Season 22</Jump>.
          Iggy was Incinerated in <Jump time="2021-05-18T12:12:18Z">Season 19</Jump>. In the case of Rivers Rosa, Worms
          were so desperate to get her out of harm’s way that fans used both Wills in the{" "}
          <Jump election={20}>Season 20 Election</Jump> to move Rivers into the shadows, first by Foreshadowing Xandra
          Pancakes for Rosa, and then Moving Rosa to the shadows&hellip; from the shadows.
        </p>
      </Entry>
      <Entry date="Season 14, Day 99" title="Divine Disfavor" redirect="/standings" time="2021-03-19T19:45:00Z">
        <p>
          Divine Favor {/* glossary */} was sometimes a blessing and sometimes a curse; in this particular case, a
          curse. Due to the Bottom Dweller team Modification, the Ohio Worms were in a unique position where being dead
          last could be a preferred outcome. This makes it particularly tragic when their tiebreaking Divine Favor puts
          them on top. At the end of Season 14, both the Ohio Worms and the <Link href="dale">Miami Dale</Link> ended
          the season with 46 wins but, due to the Worms’ Divine Favor, the Dale took the last place spot. Not only did
          the Worms do badly that season, but they weren’t even able to be good at being bad. This dismayed many Worms
          fans. This very case, this proof that they were no longer securely the worst of the worst, was when the Worms
          decided to turn. If they couldn’t succeed at being bad, they might as well try being good.
        </p>
      </Entry>
      <Entry date="Season 15, Day 16" title="Scratch Comes Back" time="2021-04-06T06:18:40Z">
        <p>
          Scratch Deleuze, star player and beloved Worm, was initially swept Elsewhere on{" "}
          <Jump time="2021-03-17T17:07:48Z">Season 14, Day 50</Jump>. Worms fans waited patiently for their return. And
          waited. And waited. And waited. Play, of course, continued. The Worms entered Party Time without their
          favorite opossum, still lost Elsewhere. On <Jump time="2021-03-19T16:19:15Z">Day 96</Jump>, to fans’ delight,
          Scratch Deleuze partied while still Elsewhere. Even though they were out of our reach, at least Scratch was
          having a great time out there. The relief was short-lived, however, when the season ended and Scratch was
          still Elsewhere. Fans quickly realized that, with an extended offseason, it would be several weeks before
          seeing Scratch’s return. By the time Scratch Deleuze came back from Elsewhere almost entirely Scattered, they
          had been missing for a total of 20 days, from March 17th to April 6th.
        </p>
      </Entry>
      <Entry title="Spies and Worms, Enemies for Life (Affectionate)" season={16} day={106}>
        <p>
          After a slow improvement of the team over several seasons, the Ohio Worms made it to the postseason. As Day
          106 started, the <Link href="spies">Houston Spies</Link> had won two games and Worms had won one. Patchwork
          Southwick was pitching under Sun 2. Fans were tense: if the Worms lost this game, they were out of the
          postseason, but they still had a chance for a comeback. And, of course, Sun 2 made things a bit more
          complicated, with a loop by either team potentially knocking the other team out of the series.
        </p>
        <p>
          The game proved to be a rollercoaster of emotions for Worms fans. The Spies looped in the 5th inning, bringing
          them to three wins, so the only way the Worms could stay in would be to loop and win. And, lo and behold, they
          somehow managed it, ending the game at both teams at 3-3, forcing a fifth game &mdash; that the Spies won,
          eliminating the Worms from the postseason anyway. This was the start of Patchwork Southwick’s Wild Ride, or,
          at least, the start of Worms fans no longer wanting off Patchwork Southwick’s Wild Ride. It was also the first
          time the Spies elimited the Worms from the postseason, which happened every time they faced off in the
          postseason throughout the rest of the Expansion Era.
        </p>
      </Entry>
      <Entry title="The Ride Never Ends (a.k.a. ¡SNALE!)" season={18} day={12}>
        <p>
          It was a seemingly normal game with the <Link href="dale">Dale</Link> at the Wormhole. Patchwork Southwick was
          pitching for the Ohio Worms, and Liam Snail was pitching for the Miami Dale. As the game progressed, the Worms
          responded to every run the Dale scored in kind. By the bottom of the 9th, the Worms and Dale were tied 3-3 and
          went into extra innings. To the delight of all the Worms fans present, the game just kept going, and going,
          and going. No one wanted off Patchwork Southwick’s Wild Ride, and the fact that the Dale’s pitcher was Liam
          Snail, of all players, amused Worms fans, as their team emoji was 🐌. After spilling over with a whopping 67
          minutes, 56 seconds runtime, the game ended in the 22nd inning with a final score of Dale 5, Worms 4, breaking
          the previous record of longest game.
        </p>
        <LineScore id="bac30156-624e-4171-8f60-d660855b3fd5" />
      </Entry>
      <Entry date="Season 19, Day 22" title="The Incineration of Iggy Delacruz" time="2021-05-18T12:12:18Z">
        <p>
          Igneus Delacruz, notable scamp and former <Link href="sunbeams">Hellmouth Sunbeam</Link>, beloved by all, was
          unceremoniously Incinerated by the heartless and unknowable Rogue Umpires. Worms fans were devastated by the
          loss of Iggy, who just joined the team 2 seasons prior. {/* try and get more details/drop last lines */} An
          international day of mourning is called and statues were erected in their honor in every city in the ILB.
          Millipede Aqualuft could not be reached for comment.
        </p>
      </Entry>
      <Entry date="Season 19, Day 99" title="Worm Logic" redirect="/standings" time="2021-05-21T19:45:00Z">
        <p>
          Thanks to the equally loved and loathed Turntables, the Worms had one of their best and worst seasons to date.
          Ending the season with an abysmal 38-61 record, the team was the top of the Wild Low. Secret Bases, Mind
          Tricks, murderous crows; nothing could stop the Worms from doing what they did best: Wi-Lose! That is, until
          the postseason began and winners began to advance towards the Internet Series. Like all other postseason runs,
          the Ohio Worms would be knocked out in the first round. Unlike most postseason runs, it would be the{" "}
          <Link href="flowers">Boston Flowers</Link> knocking them out, <em>not</em> the{" "}
          <Link href="spies">Houston Spies</Link>. This was a divisive season for Worms fans, with some delighted by the
          strange new mechanic, and others disappointed that they were denied a Bottom Dweller boost; without
          Turntables, the Worms would’ve been at the bottom of the Wild Low.
        </p>
      </Entry>
      <Entry date="Season 21, Day 75" title="SHABOOM! Gatecrash." redirect="/depth" time="2021-06-24T19:00:30Z">
        <p>
          <Jump time="2021-06-24T15:40:43Z">Season 21’s Latesiesta</Jump> brought the Worms a fantastical four-pack of
          gifts from their friends in the ILB. Thanks to the newly-added Replica of Chorby Soul wielding{" "}
          <Jump redirect="/item/04749f19-e782-40e2-9077-e79baa6236f6" season={21} day={75}>
            Chorby’s Soul
          </Jump>{" "}
          and the Worms’ Heavy-Handed Modification, the team began to plummet down through the immateria. Their safety
          was ensured by the now-Yolked Uncle Plasma and Liquid Friend who, finally together, tag-team SHABOOMED any
          Consumer brave enough to charge the field. In the depths, the Worms encountered and broke through the gate
          located in{" "}
          <Jump redirect="/_before/www.blaseball2.com/" time="2021-06-24T19:10:30Z">
            Blaseball 2
          </Jump>{" "}
          due to their eDensity, releasing pickled herring for the league’s enjoyment.
        </p>
        <p>
          This result was a huge relief for Worms fans. The whole shebang was a result of gift damage control; fans knew
          they couldn’t avoid getting a heavy Chorby and at least one Hard Boiled Replica, so their best attempt at
          self-preservation was getting an extra item for their players and getting the other Hard Boiled player without
          fully knowing what they even did. And so, with Uncle Plasma and Liquid Friend protecting their players and the
          Chorby Replica alike, the Worms descended. SMASH.
        </p>
      </Entry>
      <Entry
        date="Season 23, Day 65"
        title={
          <>
            The (Temporary) Incineration <TitleBreak />
            of Pudge (and Consequences Thereof)
          </>
        }
        time="2021-07-22T08:08:57Z"
      >
        <p>
          Over the seasons, many players have been Incinerated and afterwards could be seen in the Hall of Flame. Pudge
          Nakamoto joined them on <Jump time="2021-04-20T02:18:14Z">Season 17, Day 12</Jump>. Little did fans know that
          just two seasons later they would just&hellip; leave. With the help of their Roaming Modification, they left
          the Hall and joined the <Link href="spies">Spies</Link>, and after{" "}
          <Jump election={20}>the next Election</Jump> they Roamed to the Worms, where they decided to stay for a while.
          On Season 23, Day 65, a Rogue Umpire sought to correct this anomaly and once again Incinerated Pudge. Fans
          were sad to see them go, but were sure they would return later.
        </p>
        <p>
          Alongside this bittersweet departure, the Worms were perhaps more impacted by Pudge’s replacement, Scoobert
          Toast. Their arrival was controversial; fans either adored or despised their new player. This escalated when
          Toast picked up a pair of Golden Rock Shoes on <Jump time="2021-07-22T23:21:45Z">Season 23, Day 79</Jump>{" "}
          which gave them Super Idol, and then winning the Credit to the Team Blessing in the{" "}
          <Jump election={23}>Season 23 Election</Jump>. This fooled fans across the league league into believing that
          Toast might be the new economy, until it was revealed that the two Modifications only gave a 6x payout,
          instead of 10x. Toast was a mediocre player on a large lineup, so it didn’t really matter anyways.
        </p>
      </Entry>
      <Entry title="Wild Champions, Ohio Worms" season={23} day={111}>
        <p>
          Worms, privileged to not face the <Link href="spies">Spies</Link> in Postseason 23, made it farther than they
          ever had before. Fans swarmed the team’s watch party channel on Discord to see all their efforts pay off. It
          all came down to one final game against the <Link href="sunbeams">Sunbeams</Link>, in a very familiar
          situation: Patchwork Southwick pitching in Sun 2 weather, just like their Spies postseason game in Season 16.
          Same as it ever was.
        </p>
        <p>
          This game was more intense than the original Wild Ride. The Worms managed to{" "}
          <Jump time="2021-07-24T18:12:13Z">loop in the 3rd inning</Jump>, with the Beams leading 3-2.2, the fractional
          run coming from <Jump time="2021-07-24T18:03:07Z">a single base stolen by Blaserunner Vess Sundae</Jump>.
          Through the rest of the game, the Sunbeams scored 4 runs, and Worms only scored 1, so, without any other
          shenanigans, the game would’ve ended at 7-3.2.
        </p>
        <p>
          The Worms’ victory, however, was assured by ultimate pitcher teamwork. Their two other pitchers, Xandra
          Pancakes and Parker Meng, used the Wormhole’s Tunnels to each steal a run. The Worms won 5.2-5, with the
          single fractional run being the deciding factor.
        </p>
        <LineScore id="1ded3337-0240-41dd-8d2b-049671409c39" />
        <p>
          Worms fans writhed with excitement when they realized that they were now Wild League Champions. This was the
          Season of Worms. Even though they didn’t win the Internet Series, this was a historical first for Worms. They
          started as the worst team, and were now one of the best.
        </p>
      </Entry>
      <Entry date="Season 24 Earlsiesta" title="Make This Worm Hole a Worm Home" time="2021-07-27T18:00:00Z">
        <p>
          The Ohio Worms, surprising no one, spotted the newly-formed Black Hole (Black Hole) on the Map upon its reveal
          and made a dash for the celestial tear. The decision was immediate and practically unanimous: This Worm Hole
          will be their new Worm Home. They were the first to arrive on the scene of the phenomena and remained there
          until{" "}
          <Jump redirect="/depth" time="2021-07-30T03:07:00Z">
            the Horizon expanded and swallowed them
          </Jump>
          , along with several other teams. Their arrival triggered “HARVEST TRACKING”, which allowed the League to look
          into the ever-growing Black Hole (Black Hole) to see what rules it had swallowed.
        </p>
      </Entry>
    </History>
  );
}
