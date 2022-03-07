/* FIXME */ /* eslint-disable no-unused-vars */

import Link from "next/link";
import { Jump } from "../../components/jump";
import { History, Entry } from "../../components/histories";
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

export default function Page({ linescores }) {
  return (
    <History authors="ambopteryx, Cicatricks, and HoneyFox">
      <Entry title="A Worm Welcome" season={13} day={1}>
        <p>
          The Ohio Worms, along with their fellow breach teams, stepped to plate for their first-ever game in the ILB
          against the Tokyo Lift. It’s the top of the first, Worms batting. First up was original Worm Lenny Crumb, who
          proceeded to use his first ever at-bat to hit a home run. This historic home run is remembered fondly as a
          wonderful welcome of the Worms to Blaseball.
        </p>
      </Entry>
      <Entry title="Party Time Speedrun" season={13} day={67}>
        <p>
          Mostly due to the Ohio Worms having pitchers with fairly abysmal Ruthlessness— Patchwork Southwick, with the
          most pitching stars, had around .4 Ruthlessness —the Worms managed to enter Party Time on Day 67. This set a
          new record for the earliest day a team entered Party Time. This was also the first time the team’s
          modification Bottom Dweller activated, due to coming last in Wild Low, which boosted the stats of every player
          on the team. While some considered this season a wash with the team’s poor newly generated players, others
          consider this the first step in their long-term plan of gradual improvement. Worms to the moon!
        </p>
      </Entry>
      <Entry title="The Incineration of Augusta Chadwell" season={13} day={89}>
        {/* https://reblase.sibr.dev/game/b508b99f-4611-4647-9d99-3d7456477d94#b7574727-1879-5e2c-5e31-9f05cbac7207 */}
        <p>
          The Ohio Worms were already in Party Time. Fans were riding high on the knowledge that the team would be made
          stronger in just a few more games, as they were snugly placed last in the Wild Low. But of course, this is
          Blaseball, and there is no such thing as true safety. In an Eclipse game against the Miami Dale, Augusta
          Chadwell was incinerated and replaced by Louber Ji-Eun. This was a tragic day for the Worms; their very first
          Incinerated player was only 12 days before the end of the season. Augusta Chadwell was an active player for
          less than a season, and just barely missed the team’s first Bottom Dweller boost. Worms fans still mourn the
          loss of Augusta, oftentimes sectioning off strategy spreadsheets as the Augusta Chadwell Memorial Gardens in
          her honor.
        </p>
      </Entry>
      <Entry date="Season 13 Elections" title="Pitching Machine Self-Plunder">
        {/* S13 election results */}
        <p>
          Pitching Machine had joined the batting lineup the previous election{/* S12 election results */}, and became a
          Batting Machine beloved by many early Ohio Worms fans. There was a creeping worry in the minds of many,
          though: Pitching Machine, being on the Idol Board, was a potential target for Plundering. In a last-ditch
          attempt to keep Pitching Machine on the team, Ohio Worms fans voted to plunder PM themselves. If another team
          had plundered Pitching Machine before them, they would be able to take them back immediately. However, fans’
          fears were unfounded, and so the Worms Plundered PM from the Worms. From this point on, whether it was an
          actual option or not, Worms fans would suggest Plundering PM almost any time election options were discussed.
        </p>
      </Entry>
      <Entry title="Feedback Detected" season={14} day={67}>
        {/* https://reblase.sibr.dev/game/f814e524-a257-4e72-a0c6-f7dae24aa15e#a00d9a37-8722-cfaa-27fd-48f22f6faf65 */}
        <p>
          Throughout Wormstory, the Ohio Worms faced weather-based roster changes fairly rarely. The only two times the
          Worms experienced Feedback swaps during the main season was in Season 14 and Season 17. In season 14, NaN, a
          Worm at the time, swapped places with Rivers Rosa, and on Season 17, Day 28
          {/* https://reblase.sibr.dev/game/40b8345c-862b-4cea-b3c5-03f43b515e46#5ea19ded-3b45-c683-0cef-fb5483842552 */}
          , original Worm Kaz Fiasco was swapped with the Sunbeams’ Igneus Delacruz.
        </p>
        <p>
          Worms fans get attached to players extremely quickly, and so both Rivers Rosa and Iggy became valued Worms
          almost immediately. And so, it was with great pain that Worms fans watched the eventual fates of these two
          players: Rivers Rosa was targeted by Consumers three times during Season 18, on Days 58
          {/* https://reblase.sibr.dev/game/ea1a0bd2-69e5-49e3-81cf-cae27d3dc8fd#05e4783d-8012-cbec-2d34-6f25bcb80eea */}
          , 75
          {/* https://reblase.sibr.dev/game/8f31e005-f0dc-44ea-a57c-3a1434340329#c23e1ae7-d57e-ca9b-cc43-2a2c5c57534c */}
          , and 87{/* https://reblase.sibr.dev/game/5f4556ec-017e-46f4-b39b-0f25f9ea6a54 */}, and was subsequently
          stolen by the Tacos’ Phantom Thieves Guild in Season 22
          {/* https://reblase.sibr.dev/game/ad5f5e4b-478e-485a-9a06-848542b92d46#590dff14-9f59-bbba-e3b0-8f78ae1c8969 */}
          . Iggy was Incinerated in Season 19
          {/* https://reblase.sibr.dev/game/be2b34a4-8bbf-4d59-a4c1-17cba9b63a0f#8585c0fb-af92-f5ce-1ee0-f104eee3c88c */}
          . In the case of Rivers Rosa, Worms were so desperate to get her out of harm’s way that fans used both Wills
          in the Season 20 elections{/* S20 election results */} to move Rivers into the Shadows, first by Foreshadowing
          Xandra Pancakes for Rosa, and then Moving Rosa to the Shadows&#8230; from the Shadows.
        </p>
      </Entry>
      <Entry title="Divine Disfavor" season={14} day={99}>
        {/* Link to standings post-D99 */}
        <p>
          Divine Favor was sometimes a blessing and sometimes a curse; in this particular case, a curse. Due to the
          Bottom Dweller team modification, the Ohio Worms were in a unique position where being dead last could be a
          preferred outcome. This makes it particularly tragic when their tiebreaking Divine Favor puts them on top. At
          the end of Season 14, both the Ohio Worms and the Miami Dale ended the season with 46 wins, but due to the
          Worm’s Divine Favor, the Dale took the last place spot. Not only did the Worms do badly that season, but they
          weren’t even able to be good at being bad. This was, of course, dismaying to many Worms fans. This very case,
          this proof that they were no longer securely the worst of the worst, is considered by some to be when the
          Worms decided to turn. If they couldn’t succeed at being bad, they might as well try being good.
        </p>
      </Entry>
      <Entry title="Scratch Comes Back" season={15} day={16}>
        <p>
          Scratch Deleuze, star player and beloved Worm, was initially swept Elsewhere on Season 14, Day 50
          {/* https://reblase.sibr.dev/game/b6752ba0-5c41-4120-a512-c67ca032989e#95200589-6162-aa94-8420-d4be820e6227 */}
          . Worms fans waited patiently for their return. And waited. And waited. And waited. Play, of course,
          continued. The Worms entered Party Time without their favorite opossum, still lost Elsewhere. On Day 96
          {/* https://reblase.sibr.dev/game/156c8545-cadf-4395-9376-ee1b41beec72#e81d519c-7fd0-7abc-9a5c-4b1e1552a305 */}
          , to fans’ delight, Scratch Deleuze partied while still Elsewhere. Even though they were out of our reach, at
          least Scratch was having a great time out there. The relief was short-lived, however, when the season ended
          and Scratch was still Elsewhere. Fans quickly realized that, with an extended offseason due to the
          implementation of the All You Can Eat decree, it would be several weeks before seeing Scratch’s return. By the
          time Scratch Deleuze came back from Elsewhere almost entirely Scattered, they had been missing for a total of
          20 days on the Material Plane, from March 17th to April 6th.
        </p>
      </Entry>
      <Entry title="Spies and Worms, Enemies For Life (affectionate)" season={16} day={106}>
        <p>
          After a slow improvement of the team over several seasons, the Ohio Worms made it to the postseason. As Day
          106 started, the Houston Spies had won 2 games and Worms had won 1. Patchwork Southwick was pitching under Sun
          2. Fans were tense: if the Worms lost this game, they were out of the postseason, but they still had a chance
          for a comeback. And, of course, Sun 2 made things a bit more complicated, with a loop by either team
          potentially knocking the other team out of the series.
        </p>
        <p>
          The game proved to be a roller coaster of emotions for Worms fans. The Spies looped in inning 5, bringing them
          to 3 wins, so the only way the Worms could stay in would be to loop and win. And, lo and behold, they somehow
          managed it, ending the game at both teams at 3-3, forcing a fifth game&#8212; that the Spies won, eliminating
          the Worms from the postseason anyway. This is often considered by Worms fans to be the start of Patchwork
          Southwick’s Wild Ride, or, at least, the start of Worms fans no longer wanting off Patchwork Southwick’s Wild
          Ride. It was also the first of many times the Spies eliminated the Worms from the Postseason. To date, the
          Worms have been eliminated by the Spies every single time they faced off in the Postseason.
        </p>
      </Entry>
      <Entry title="The Ride Never Ends (A.K.A. ¡SNALE!)" season={18} day={12}>
        <p>
          It was a seemingly normal game, with the Dale at the Wormhole. Patchwork Southwick was pitching for the Ohio
          Worms, and Liam Snail was pitching for the Miami Dale. As the game progressed, the Worms responded to every
          run the Dale scored in kind. By the bottom of the 9th, the Worms and Dale were tied 3-3. And so, the game went
          into overtime. To the delight of all the Worms fans present, the game just kept going, and going, and going.
          No one wanted off Patchwork Southwick’s Wild Ride, and the fact that the Dale’s pitcher was Liam Snail of all
          players just added to the hilarity. After spilling over with a whopping 67 minutes 56 seconds runtime, the
          game ended in the 22nd inning with a final score of Dale 5, Worms 4, breaking the previous record of longest
          game in Material Plane time.
        </p>
        <LineScore {...linescores["bac30156-624e-4171-8f60-d660855b3fd5"]} />
      </Entry>
      <Entry title="The Incineration of Iggy Delacruz" season={19} day={22}>
        {/* https://reblase.sibr.dev/game/be2b34a4-8bbf-4d59-a4c1-17cba9b63a0f#8585c0fb-af92-f5ce-1ee0-f104eee3c88c */}
        <p>
          Igneus Delacruz, notable scamp and former Hellmouth Sunbeam, beloved by all, was unceremoniously incinerated
          by the heartless and unknowable rogue umpires. Worms fans were devastated by the loss of Iggy, who just joined
          the team 2 seasons ago. An international day of mourning is called and statues were erected in their honor in
          every city in the ILB. Millipede Aqualuft could not be reached for comment.
        </p>
      </Entry>
      <Entry title="Worm Logic" season={19} day={99}>
        {/* post-D99 standings page */}
        <p>
          Thanks to the much lauded and scorned Turntables, the Worms had one of their best and worst seasons to date.
          Ending the season with an abysmal 38-61 record, the team was the top of the Wild Low. Secret Bases, mind
          tricks, murderous crows; nothing could stop the Worms from doing what they did best: Wi-Lose! That is, until
          the Postseason began and winners began to advance towards the Internet Series. Like all other postseason runs,
          the Ohio Worms would be knocked out in the first round. Unlike most postseason runs, it would be the Boston
          Flowers doing the bumping, <i>not</i> the Houston Spies. This was a divisive season for Worms fans, with some
          delighted by the strange new mechanic, and others disappointed that they were denied a Bottom Dweller boost;
          without Turntables, the Worms would’ve been at the bottom of the Wild Low.
        </p>
      </Entry>
      <Entry title="SHABOOM! Gatecrash." season={19} day={99}>
        {/* D75 Depth Chart */}
        <p>
          Season 21’s Latesiesta{/* S21 Latesiesta results */} brought the Worms a fantastical four-pack of gifts from
          their friends in the ILB. Thanks to the newly-added replica of Chorby Soul, wielding Chorby’s Soul, and the
          Worms’ Heavy-Handed modification, the team began to plummet down through the Immateria. Their safety was
          ensured by the now-Yolked Uncle Plasma and Liquid Friend who, finally together, tag-team SHABOOMED any
          Consumer brave enough to charge the field. In the depths, the Worms encountered and broke through the gate
          located in Blaseball 2{/* Blaseball 2 archive as of this date? */} due to their eDensity, releasing pickled
          herring for the League’s enjoyment.
        </p>
        <p>
          This result was a huge relief for Worms fans. The whole shebang was a result of gift damage control; fans knew
          they couldn’t avoid getting a heavy Chorby and at least one Hard Boiled replica, so their best attempt at
          self-preservation was getting an extra item for their players and getting the other Hard Boiled player without
          fully knowing what they even did. And so, with Uncle Plasma and Liquid Friend protecting their players and the
          Chorby Replica alike, the Worms descended. SMASH.
        </p>
      </Entry>
      <Entry title="The (Temporary) Incineration of Pudge (and Consequences Thereof)" season={23} day={65}>
        {/* https://reblase.sibr.dev/game/b6d1894c-8639-41c9-8f59-8a8ec4e8e4da#9e12aca2-f066-f9f9-8775-3b560b41b326 */}
        <p>
          Over the seasons, many players have been incinerated and afterwards could be seen in the Hall of Flame. Pudge
          Nakamoto joined them on Season 17, Day 12
          {/* https://reblase.sibr.dev/game/bfb478d3-a861-43a1-a91f-0fbfefa52943#f8f129bd-6d33-c596-4db8-17556caf5e49 */}
          . Little did fans know that just two seasons later they would just&#8230; leave. With the help of their
          Roaming modification, they left the Hall and joined the Spies, and after the next election they roamed to the
          Worms, where they decided to stay for a while. On Season 23, Day 65, a rogue umpire sought to correct this
          anomaly and once again Incinerated Pudge. Fans were sad to see them go, but sure they would return later.
        </p>
        <p>
          Alongside this bittersweet departure, the Worms were perhaps more impacted by Pudge’s replacement, Scoobert
          Toast. Their arrival was controversial, to be light, with fans either adoring or despising their new player.
          This escalated when Scoobert picked up a pair of Golden Rock Shoes on Season 23, Day 79
          {/* https://reblase.sibr.dev/game/8a7b2ebe-b04c-4ef7-9bd9-431ea2ab326a#05cee83f-b784-0835-f814-2201c261e031 */}{" "}
          which gave them Super Idol, and then winning the Credit To the Team blessing in the Season 23 election
          {/* S23 election results */}. This fooled both Worms fans and the League alike into believing that Soobert
          might be the new economy, until it was revealed that the two mods only gave a 6x payout, instead of 10x.
          Scoobert was such a mediocre player on a large lineup, so it didn’t really matter anyways.
        </p>
      </Entry>
      <Entry title="Wild Champions, Ohio Worms" season={23} day={111}>
        <p>
          Worms, privileged to not face the Spies in Season 23’s postseason, made it farther than they ever had before.
          Fans swarmed the team’s watch party channel on Discord to see all their efforts pay off. It all came down to
          one final match against the Sunbeams, in a very familiar situation: Patchwork Southwick pitching in Sun 2
          weather, just like their Spies postseason game in Season 16. Same as it ever was.
        </p>
        <p>
          The game was just as, if not more, intense than the original Wild Ride. Worms managed to loop in the 3rd
          inning, with the score at Beams 3, Worms 2.2, the fractional run coming from a single base stolen by
          Blaserunner Vess Sundae. Through the rest of the game, the Sunbeams scored 4 runs, and Worms only scored 1,
          so, without any other shenanigans, the game would’ve ended at 7-3.2.
        </p>
        <p>
          The Worms’ victory, however, was assured by ultimate pitcher teamwork. Their two other pitchers, Xandra
          Pancakes and Parker Meng, used the Wormhole’s Tunnels to each steal a run. The game ended at 5-5.2, with the
          single fractional run being the deciding factor.
        </p>
        <LineScore {...linescores["1ded3337-0240-41dd-8d2b-049671409c39"]} />
        <p>
          Worms fans writhed with excitement when they realized that they were now Wild League Champions. This was the
          Season Of Worms. Even though they didn’t win the Internet Series, this was a historical first for Worms. They
          started as the worst team, and were now one of the best.
        </p>
      </Entry>
      <Entry date="Season 24 Earlsiesta" title="Make This Worm Hole a Worm Home">
        {/* S24 earlsiesta */}
        <p>
          The Ohio Worms, surprising literally zero people, spotted the newly formed Black Hole (Black Hole) on the Map
          upon its reveal and made a dash for the celestial tear. The decision was immediate and practically unanimous:
          This Worm Hole will be their new Worm Home. They were the first to arrive on the scene of the phenomena and
          remained there until the Horizon expanded and swallowed them{/* S24D82 map post-Big Deal speeches */}, along
          with several other teams. Their arrival triggered “HARVEST TRACKING”, which allowed the League to look into
          the ever-growing Black Hole (Black Hole) to see what rules it had swallowed.
        </p>
      </Entry>
    </History>
  );
}
