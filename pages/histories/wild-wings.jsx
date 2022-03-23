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
        "9d85897e-e689-4eeb-b2ae-b69679a3ebc7",
        "690964fd-50b8-4aa3-bc9e-ae31a6a3f3e9",
        "ff5669a8-0df9-42ce-9a0f-fbe08f26f231",
        "7d0c4e54-1276-47ad-8d79-c86790b120d4",
        "e9ad6c70-41dd-4e7e-87cf-fc547ac0b7a3",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Spludge237">
      <Entry title="Change Comes For Us All" date="Season 7, Day 107" time="2020-09-19T20:20:36Z">
        <p>
          The early history of the Mexico City Wild Wings can be summed up in one word: immutable. For seven long
          seasons, chaos reigned across the league, and Incinerations, Reverbs, Feedback, and Elections sent fan
          favorites moving from team to team and provided the major events of Blaseball. The Wings, however, stayed the
          same, leading to the popular fan mantra “The Bucket Protects”.
        </p>
        <p>
          In Season 7, the Wings found themselves in the playoffs for the first time, and ran into the player that
          defined the season for other teams, Jaylen Hotdogfingers. On Day 105, Jaylen set the record for number of
          Instabilities caused, beaning five players. On Day 107, a Wing finally proved to be mortal. Rest in Violence,
          Miguel Wheeler. Welcome to the team, Case Sports.
        </p>
      </Entry>
      <Entry title="Add Them to the List" season={7} day={113}>
        <p>
          A Blaseball fan could be forgiven for not remembering that the Wild Wings won a championship. So much of
          Season 7 was about Jaylen Hotdogfingers’ necromancy and, even in the postseason, the{" "}
          <Link href="lovers">Lovers</Link> beating the <Link href="crabs">Crabs</Link>
          to get to the Internet Series was the biggest story.
        </p>
        <p>
          Yet, on Day 113, the Mexico City Wild Wings won the Internet Series with a tense final inning. Stephanie
          Winters, pitching for the Wings, conceded a run in the top of the 9th to put the Lovers ahead 3-2, only to see
          Summers Preston first drive José Haley home, then capitalize on a Larry Horne single to cross home plate
          herself, shaming the Lovers and winning the championship.
        </p>
        <LineScore id="9d85897e-e689-4eeb-b2ae-b69679a3ebc7" />
        <p>
          It also marked the end of José Haley and Kennedy Rodgers’ time with the Wings. Despite a community-wide effort
          to encourage people to leave the Champs in the Making Blessing, which gave the winning team three random
          players from the champions, for the Wings, the Firefighters won with 6% of the vote.
        </p>
      </Entry>
      <Entry title="Goobie Ballson, Murderer" date="Season 8, Day 36" time="2020-09-23T03:05:04Z">
        <p>
          It is hard to pinpoint what started the close friendship between the Wild Wings and the{" "}
          <Link href="firefighters">Firefighters</Link>. Was it Champs in the Making? Was it the Sports-Butt Memorial
          Series? Or was it Season 8, Day 36 when José Haley was Incinerated in a routine game against the Lovers and
          replaced by Goobie Ballson? Wings fans were unsettled; Haley was a beloved member of the team, and fans wished
          them well in Chicago, but it seemed like everyone immediately forgot about him in favor of this funnily-named
          upstart.
        </p>
        <p>
          An in-joke quickly spawned. What if it wasn’t a Rogue Umpire that Incinerated Haley. What if it was Goobie
          themself, desperate for attention, eliminating José to step into the limelight? After all, Goobie’s pre-game
          ritual is “Washing the Blood Off”, which was very suspicious. Wings fans couldn’t let their friends in
          Chicago, or anywhere else, know about their conspiracy theory; “let them enjoy their Goobie in peace,” they
          thought. So, for the longest time, only the Wings knew the “truth” about the death of José Haley. Like all
          secrets, eventually the Firefighters found out, and they were very good sports about it.
        </p>
      </Entry>
      <Entry title="Case Sports Hits Singles No More" date="Season 12, Day 79" time="2021-03-05T00:10:13Z">
        <p>
          The time between eras, the Grand Siesta, was a time for fans to rest, recharge, and enjoy the Coffee Cup. That
          is, of course, provided that they weren’t representing{" "}
          <Link href="millennials">the New York Millennials</Link> in their lawsuit against the Coin for the absence of
          Season 10’s Eat The Rich payout. The trial took place on Discord and was a chaotic mess of arguments,
          violence, and Incinerations but, in the end, justice prevailed. As part of the ruling, it was found that Case
          Sports, in the Wings’ shadows at the time, was too dangerous and/or in too much danger if they had time to
          practice law. They were sent back to the Wings’ lineup, the first time a team’s roster changed due to fans
          outside of an Election.
        </p>
        <p>
          Blaseball is not safe either and, on Season 12, Day 79, Case Sports was Incinerated. This was the first
          Incineration of the Expansion Era, beating Joshua Butt’s by about 15 minutes, and led to the establishment of
          the Sports-Butt Memorial Series, held every season between the <Link href="firefighters">Firefighters</Link>{" "}
          and the Wings.
        </p>
      </Entry>
      <Entry title="New Plan: Stop Making Plans" date="Season 12, Day 98" time="2021-03-05T19:09:09Z">
        <p>
          The Coffee Cup proved what Wings fans speculated: Cell Barajas was a very good pitcher, which was a shame
          because she was in the Wings’ lineup. It was clear Barajas had to pitch, but in the pre-Wills era, the only
          way to achieve this was by winning the Best Offense Blessing, swapping the best pitching batter and the worst
          pitcher.
        </p>
        <p>
          When it came to the worst pitcher, Mullen Petersen took the cake, frustrating the Wings in her plate
          appearances, though Stephanie Winters was only slightly behind her. Mullen was projected to be a good, if not
          spectacular, batter. It was a perfect plan. The sim laughs at perfect plans, though: on Day 97, the Wings
          entered Party Time and, on Day 98, Mullen Petersen partied, making her fractionally better than Stephanie
          Winters. When the Wings <Jump election={12}>won the Best Offense Blessing</Jump>, Winters was sent to the
          lineup instead.
        </p>
      </Entry>
      <Entry title="Burke Gonzales is All You Need" season={13} day={86}>
        <p>
          The history of the Mexico City Wild Wings cannot be told without contemplating the pitching prowess of Burke
          Gonzales. In the early seasons of the Expansion Era, the best pitchers in the league were terrifying forces,
          and Gonzales was a shining example of this, never posting an ERA over 2.25.
        </p>
        <p>
          On Season 13, Day 86, Gonzales, a Triple Threat, and the Tacos’ Yummy Elliot were having the sort of pitching
          duel common in the era, to the point where the bottom of the 8th started{" "}
          <Jump time="2021-03-12T07:18:56Z">19 minutes past the hour</Jump>, the scores still tied at 0-0. In the bottom
          of the 8th, <Jump time="2021-03-12T07:19:37Z">a Rogue Umpire tried to Incinerate Basilio Fig</Jump> but became
          Magmatic instead, guaranteeing a home run during their next at-bat.
        </p>
        <p>
          In the top of the 9th, with 2 outs, Gonzales improbably{" "}
          <Jump time="2021-03-12T07:20:42Z">conceded a triple to McDowell Mason</Jump>. He then struck out Valentine
          Games with the runner on third, triggering Triple Threat and scoring 0.3 unruns. Despite happening in the late
          hours of the night for most Wings fans, it quickly became the strongest example of the importance of Burke
          Gonzales, tiny pitching god.
        </p>
        <LineScore id="690964fd-50b8-4aa3-bc9e-ae31a6a3f3e9" />
      </Entry>
      <Entry title="Pspspspspspspspsps" date="Season 15, Day 13" time="2021-04-10T21:14:25Z">
        <p>
          Blaseball is famed for its emergent narratives, with the sim telling many stories great and small and almost
          all tremendously tragic. On <Jump time="2021-03-05T05:12:54Z">Season 12, Day 84</Jump>, during the inaugural
          Sports-Butt Memorial Series, Stephanie Winters was Shelled and the grand tradition of trying to summon the
          birds began.
        </p>
        <p>
          As the plot of the Expansion Era introduced new weather, Birds became increasingly rare, and the opportunities
          for Winters to be freed became appointment viewing. Meanwhile, in Season 15, the Wings drew the Wild Card and
          made it all the way to the Internet Series against the <Link href="moist-talkers">Canada Moist Talkers</Link>.
          On Day 113, the Birds finally heeded fans’ calls, and Winters was freed. The Wings didn’t score another run in
          the series, and lost. Fans celebrated anyway.
        </p>
      </Entry>
      <Entry title="The Wings of Daedalus" date="Season 17, Day 94" time="2021-04-23T14:21:15Z">
        <p>
          It is hard to identify exactly when Greek mythology started creeping into Wings fan discussions. Perhaps being
          an unchanged team for so long, coming to terms with the inevitability of change in Blaseball pushed fans
          toward the Ship of Theseus. Maybe the many seasons of almost-success caused fans to identify with poor
          Sisyphus and his boulder. Maybe the Wings drawing the Sun major arcana resulted in the birth of the enigmatic
          Project Icarus.
        </p>
        <p>
          All three of these themes were present in Season 17, where <Jump time="2021-04-21T23:07:43Z">Day 56</Jump>’s
          Feedback saw perennial Wild Wings hitter Summers Preston sent to the <Link href="dale">Dale</Link> in exchange
          for the famed Nagomi Mcdaniel. This was followed by a truly catastrophic Reverb on Day 94 during an away game
          against the Dale that saw Mcdaniel and Joshua Watson sent to the rotation and Barajas and Gonzales brought
          onto the lineup, demolishing both the Wings’ pitching prowess and what little remained of their batting.
        </p>
        <p>
          This set the stage for the most contentious discussion in Wings history where, during Season 18, fans had to
          decide whether to engage in a full-blown tank season to try and get some players to party. To add insult to
          injury, the only party of the game was due Worldwide Field’s PsychoAcoustics Echoing the Wings’ Life of the
          Party Modification, resulting in Preston <Jump time="2021-04-23T14:19:24Z">partying</Jump> and, eventually,{" "}
          <Jump time="2021-04-23T14:27:42Z">hitting in the winning run</Jump>.
        </p>
      </Entry>
      <Entry title="The Star That Burns Twice As Bright" date="Season 18, Day 32" time="2021-05-12T00:07:03Z">
        <p>
          There are some that argue that one of the goals of Blaseball is to be unobserved. Blaseball always has a main
          character, and fans desperately don’t want their teams to be it. By and large, the Wings sailed through the
          seasons below the radar of plot relevance, surfacing only to threaten legal action. The Wings batting was
          always in need of improvement, though, and so a plan was created to Plunder a ringer from another team’s
          shadows. All it would require is a player no-one had ever heard of and getting them onto the Idol Board.
        </p>
        <p>
          With the blessing of the <Link href="worms">Ohio Worms</Link>, Aurora Blortles was targeted, and a large,
          multi-team cooperative effort was undertaken to get Blortles{" "}
          <Jump time="2021-04-23T19:45:00Z">onto the Idol Board at the end of the season</Jump> just long enough for
          Wings fans to cast their Plunder votes. Unlike so many other plans, <Jump election={17}>it succeeded</Jump>{" "}
          and, following the Season 17 Reverb, Blortles was brought onto the lineup to honor the multi-team effort to
          bring an actually good batter to the Wings. They were Incinerated on Season 18, Day 32, and the fans’ calls
          for a tank season grew louder and louder.
        </p>
      </Entry>
      <Entry title="Too Cool For Blaseball" season={19} day={2}>
        <p>
          Balanced opposites are a philosophic principle found in belief systems the world over. Where there is light,
          there is darkness; where there is matter, there is the void; for every Burke Gonzales, there is an Axel
          Cardenas. Cardenas wasn’t a good hitter, but he made up for it by being an absolutely atrocious pitcher, which
          was exactly what he promised to be.
        </p>
        <p>
          He was, therefore, the core of the tanking strategy. On Season 19, Day 2, Cardenas demonstrated his tremendous
          losing potential at his first opportunity, <Jump time="2021-05-17T16:10:37Z">conceding 10 runs</Jump> to the
          Dale in the first 3 innings, before eventually losing the game 21-0.2. He would eventually finish the season
          with an eye-watering 13.20 ERA in 30 games pitched, and the tank season was in full swing.
        </p>
        <p>
          Or, it would have been, if it was not Season 19, played under Turntables, making Cardenas an asset rather than
          a liability.
        </p>
        <LineScore id="ff5669a8-0df9-42ce-9a0f-fbe08f26f231" />
      </Entry>
      <Entry title="Too Blaseball to be Cool" season={21} day={5}>
        <p>
          There is a statistical principle colloquially known as the Law of Large Numbers, which states that regardless
          of how improbable an event is, if there are enough opportunities, it will eventually happen. This was the only
          possible explanation for Season 21, Day 5, when Axel Cardenas pitched a 3-0.2 victory over the{" "}
          <Link href="worms">Ohio Worms</Link>.
        </p>
        <LineScore id="7d0c4e54-1276-47ad-8d79-c86790b120d4" />
        <p>
          At first glance, it could be assumed that the tank season was successful, and Cardenas improved tremendously.
          This would be a fair observation, and also entirely inaccurate: Axel had improved his pitching by a half a
          star which, in an era of rampant stat inflation, was nothing. All it meant was that Blaseball is weird, and
          sometimes a pitcher with no stats can almost throw a shutout, or a team with absolutely no batting can
          occasionally go on a tear and <Jump time="2020-09-20T03:00:00Z">win a championship</Jump> in memory of{" "}
          <Jump time="2020-09-19T20:20:36Z">a tire full of rats</Jump>.
        </p>
      </Entry>
      <Entry title="The End of Immortality" date="Season 22, Day 24" time="2021-06-29T14:13:36Z">
        <p>
          As the seasons wore on, the Wings’ roster slowly morphed and changed. Not Yong Wright, though. Wright was the
          metaphysical embodiment of the immutable Wings of old: not only had he been on the Wings’ active roster since
          the Return of Blaseball, but he was never displaced from his original spot in the lineup, only shifting as
          other players were shunted about. Wright was an enduring link to the before times, when weather happened to
          other people and the Bucket actually protected, when there weren’t Wills that allowed for Exchanges. Then, on
          Season 22, Day 24, he wasn’t. Fans knew the end of the era was in sight, and the Wings would have to face the
          unknown without the only knowable thing in the whole splort.
        </p>
      </Entry>
      <Entry title="I Was Told That There Wasn’t Going To Be Any Math" season={23} day={13}>
        <p>
          As the Expansion Era headed towards its end, teams had to come to grips with the basic math of the game
          becoming further unmoored. Subtractor, Underhanded, Buckets, Hoops, and Polarity all combined in manners that
          were not always intuitive or intended. On Day 13, the <Link href="flowers">Boston Flowers</Link> visited the
          Bucket for a game in Jazz weather, which riffed immediately into Polarity&nbsp;+. At various points in the
          game, the score was 0-&minus;2, 1-&minus;5, 1-&minus;9, 0-&minus;6, &minus;2-&minus;6, &minus;3-&minus;4,
          before the game ended with a final score of &minus;2-0.
        </p>
        <LineScore id="e9ad6c70-41dd-4e7e-87cf-fc547ac0b7a3" />
        <p>Were the game played under the scoring conditions of Season 7, the final score would have been 6-18.</p>
      </Entry>
    </History>
  );
}
