/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores(["07d98d4c-bcca-45e1-9839-219342616b45"]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Dargo, Curubethion, Riptide, Tiger64, and Cynthia">
      <Entry date="Season 3, Day 110" title="Rest in Violence" time="2020-08-09T00:16:59Z">
        <p>
          Landry Violence was the first Tigers player to be Incinerated, the second player overall in the postseason and
          the only one in an Internet Series. They were also one of the Tigers’ best players and, due to their name and
          performance, well-known across the whole league. When they died and were replaced by Paula Turnip, the entire
          league’s eyes were on them. To this day, people still use “RIV” &mdash; “Rest In Violence” &mdash; instead of
          the more conventional “Rest In Peace.” After Violence’s death, the Tigers rallied and defeated the New York
          Millennials to secure their{" "}
          <Jump redirect="/standings" time="2020-08-24T01:00:00Z">
            first championship title
          </Jump>
          .
        </p>
      </Entry>
      <Entry election={5} title="Scorpler’s Jacket">
        <p>
          When Mclaughlin Scorpler snatched the Fireproof Jacket with an unexpected 8% of the Vote, it caught everyone
          by surprise. Scorpler then doubled down by winning the Noise-Cancelling Headphones with the very next
          Blessing. The Headphones immediately replaced the Jacket, sending it out into the ether. Fans laughed it off
          as a funny Scorpler moment.
        </p>
        <p>
          When Scorpler became <Jump time="2020-09-15T23:17:19Z">one of the casualties</Jump> of Ruby Tuesday, it turned
          into grim irony. Without the Jacket, Scorpler was Incinerated during the game, doomed by the Headphones.
          However, there was a wholesome coda for the Canada Moist Talkers, the other victims of Ruby Tuesday. A Season
          7 Blessing that brought back Scorpler’s Memorial Fireproof Jacket, and the Talkers’ Jesús Koch{" "}
          <Jump election={7} team="eb67ae5e-c4bf-46ca-bbbc-425cd34182ff">
            won it with 3% of the vote
          </Jump>
          .
        </p>
      </Entry>
      <Entry date="Season 7, Day 32" title="Death Visits Hades on Ruby Tuesday" time="2020-09-15T23:06:11Z">
        <p>
          Ruby Tuesday holds a particular meaning for the Hades Tigers, which created a crucible that bonded fans
          through fire. Until Ruby Tuesday, the Tigers only experienced a single Incineration: the loss of Tigers legend
          Landry Violence. Their death kindled a spirit of ferocity in fans, but also a bit of hubris.
        </p>
        <p>
          On Ruby Tuesday, the ledger demanded balance. Moody Cookbook and{" "}
          <Jump time="2020-09-15T23:17:19Z">Mclaughlin Scorpler</Jump> were both beloved Tigers, and the Instability
          chaining to Yazmin Mason would spell <Jump time="2020-09-17T15:05:31Z">the eventual doom</Jump> of yet another
          fan favorite. It was sudden loss on a scale that the fans had never experienced, losing so many icons in a
          fraction of a season. The Tigers felt something new in those days: Fear.
        </p>
        <p>
          The sad saga of Frasier Shmurmgle, Scorpler’s replacement, was an expression of this grief and confusion. They
          were a cursed trickster whose lore was constantly redefined, only to be Incinerated on{" "}
          <Jump time="2020-09-17T15:15:12Z">Day 71</Jump> as fan disagreement reached a fever pitch. Shmurmgle’s
          replacement, Usurper Violet, put an end to the strife and an end to the killing. Xe became the manifestation
          of the Tigers, a spirit ruled not by fear, but by righteous vengeance.
        </p>
      </Entry>
      <Entry date="Season 10, Day X" title="Landry Violence’s Magmatic Home Run" time="2020-10-18T01:04:46Z">
        <p>
          In the leadup to Season 10, Day X, fans moved some of their most beloved deceased players into certain
          positions on the Idol Board, lining them up with weather icons. Landry Violence, at 6th, aligned with the
          Solar Eclipse icon, and became a Fire Eater when the Idol Board{" "}
          <Jump redirect="/leaderboard" time="2020-10-16T20:04:19Z">
            locked at the end of Day 99
          </Jump>
          . During Day X, Violence <Jump time="2020-10-18T01:04:06Z">absorbed an Incineration attempt</Jump> and, at
          their next at bat, hit a Magmatic home run. Once Incinerated, they now struck back. Violence, like the other
          Hall Stars, was{" "}
          <Jump redirect="/player/d74a2473-1f29-40fa-a41e-66fa2281dfca" time="2020-10-18T19:30:00Z">
            Released
          </Jump>{" "}
          after the fight was over.
        </p>
      </Entry>
      <Entry season={11} day={115} title="Infinite Tigerbeams">
        <p>
          In Season 11, two new weathers made up the entirety of the forecast: Black Hole and Sun 2. The Sunbeams and
          the Tigers had two of the best offenses in the league, so they kept triggering Sun 2 and Black Hole. With the
          Wild League Champion Series tied at 3-3 after 5 games, the Sunbeams managed to get ahead in a late game rally,
          ending the best of 5 series with 5 wins to the Tigers’ 3. It was the longest postseason series in Beta.
        </p>
        <LineScore id="07d98d4c-bcca-45e1-9839-219342616b45" />
        <p>
          The Beams and Tigers had a long friendship dating back to the Return of Blaseball, and they were both on the
          most important postseason runs of their history. The Tigers were on track for Ascension, and the Beams were
          after their first championship win after season upon season of subpar performance. The series delighted both
          teams’ fanbase, and was seen as the Beams keeping the Tigers in the ILB so they could have many more endless
          series against each other. The Tigers did end up winning a championship{" "}
          <Jump redirect="/standings" time="2021-03-07T00:00:00Z">
            the season after
          </Jump>
          , but with Ascension now out of the picture. For the rest of Beta, when the Tigerbeams played each other,
          everybody won.
        </p>
      </Entry>
      <Entry season={12} day={116} title="Third Championship and Evolution">
        <p>
          In Season 12, the Hades Tigers won 72 games and secured their third championship title. That was mostly thanks
          to a league-leading pitching rotation including Hiroto Wilcox, who sported an absurd 1.33 ERA for one of the
          best pitching seasons ever, and Famous Owens, who had a 4.67 ERA in the regular season, only giving up{" "}
          <Jump time="2021-03-06T22:24:53Z">1 run</Jump> in 3 playoff games. The lineup had Aldon Cashmoney’s Red Hot
          postseason performance, scoring around a quarter of the team’s total runs with a batting average of 0.400, a
          slugging percentage of 0.983, and an OPS of 1.396, with Randy Castillo scoring almost as many runs as
          Cashmoney.
        </p>
        <p>
          As a result of the Based Evolution Decree passing in the <Jump election={12}>Season 12 Election</Jump>, the
          Tigers Evolved and gained the Ambush Modification.
        </p>
      </Entry>
      <Entry date="Season 13, Day 1" title="Mummy Melcon Melt-ons a Rogue Umpire" time="2021-03-08T16:20:36Z">
        <p>
          In the <Jump election={10}>Season 10 Election</Jump>, the Hades Tigers won the Umpire Cream Blessing, making
          the entire team Fireproof. This first came into play in the first game of Season 13, in the 7th inning at the
          Dale’s Worldwide Field. Trying to get umpires to target their players for Incineration, and instead get
          destroyed themselves, was something Tigers fans would continue to call for during the Expansion Era. This was
          the first time it happened, and it was cathartic; Mummy Melcon started playing in Season 7 as{" "}
          <Jump time="2020-09-17T15:05:31Z">Yazmin Mason’s replacement</Jump>. It could be seen as vengeance.
        </p>
      </Entry>
      <Entry date="Season 14, Day 79" title="Dunlap’s Soliloquy" time="2021-03-18T23:09:16Z">
        <p>
          As of Season 14, the Hades Tigers’ rotation saw a total of three player changes since the Return of Blaseball:
          Nicholas Mora swapped for Yazmin Mason in the Season 1 Election, without an associated Blessing. Mason was{" "}
          <Jump time="2020-09-17T15:05:31Z">Incinerated during Season 7</Jump>. Nagomi Meng was sent to the shadows due
          to <Jump election={8}>Season 8’s Composite Blessing</Jump>. When the Tigers played against a Flickering NaN in
          Feedback, fans knew it might be time for another change.
        </p>
        <p>
          Tigers fans held their breath as the game went on but, unfortunately, the odds were not in their favor. In the
          top of the 3rd, reality flickered and Dunlap Figueroa took the mound for the Firefighters. Dunlap quickly
          struck out Nicholas Mora to end the inning but, when the time came for the Firefighters to return to the
          dugout, xe refused to leave the stage. Figueroa would go on to pitch the remainder of the game for both teams,
          granting their now-former team one last hurrah before leaving for Chicago. The Tigers went on to dedicate one
          of their Wills in the <Jump election={14}>Season 14 Election</Jump> to getting Figueroa back, and were
          ultimately successful.
        </p>
      </Entry>
      <Entry season={18} day={99} title="Aldon’s Last Game and Vaulting">
        <p>
          In vis last game before being Vaulted, Aldon Cashmoney hit <Jump time="2021-05-14T20:07:48Z">a double</Jump>,
          two <Jump time="2021-05-14T20:11:48Z">home</Jump> <Jump time="2021-05-14T20:22:53Z">runs</Jump>, and{" "}
          <Jump time="2021-05-14T20:17:33Z">a triple</Jump> off of one of the strongest pitchers in the league to end
          one of the best batting seasons, and possibly the best batting career, in Blaseball. Since the{" "}
          <Jump election={8}>Season 8 Election</Jump>, with no interruption except for{" "}
          <Jump election={12} team="f02aeae2-5e6a-4098-9842-02d2273f25c7">
            a brief trip to the Hellmouth
          </Jump>
          , Cashmoney played for the Hades Tigers. Ve was consistently one of the league’s best and most exciting
          hitters, combining fantastic baserunning with an uncanny ability to hit for power. In Season 18, after putting
          up possibly vis best season, <Jump time="2021-04-23T20:04:24Z">ve was Vaulted</Jump>. Vis Legendary history is
          inextricably tied to the Tigers.
        </p>
      </Entry>
      <Entry election={18} title="The Vault Heist">
        <p>
          Aldon Cashmoney was Vaulted after Season 18, Day 99, removing vim from play. Before that happened, though, the
          Tigers voted to Move Aldon to their lineup. Fans didn’t know what would happen; this was the first time anyone
          successfully tried this. As a result, in the Season 18 Election, the team received a Replica of Aldon
          Cashmoney in their lineup. Aldon Cashmoney II was later dubbed “Aldeux” by the fans and, for the brief time
          the Tigers had vim, vi played an absolutely ridiculous season that ranked among the best in Blaseball history.
        </p>
      </Entry>
      <Entry date="Season 19, Day 1" title="Hiroto vs. Jaylen" time="2021-05-17T15:07:57Z">
        <p>
          Back in Season 7, the whole league watched in fear as the freshly resurrected Jalyen Hotdogfingers dealt with
          the consequences of necromancy. The Tigers may never look back, but their fans will always remember Ruby
          Tuesday. Hiroto Wilcox pitched the game that <Jump time="2020-09-15T23:06:11Z">Moody Cookbook</Jump> and{" "}
          <Jump time="2020-09-15T23:17:19Z">Mclaughlin Scorpler</Jump> were Incinerated during. Wilcox would take up the
          mantle of captain herself later, following in Cookbook’s steps.
        </p>
        <p>
          12 seasons later, Jaylen’s Debt was paid, and she was Exchanged to the Boston Flowers during the{" "}
          <Jump election={18} team="3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e">
            Season 18 Election
          </Jump>
          . Jaylen was arguably the most famous pitcher in the league, but she ended up 10th in Boston’s 12-player
          lineup.
        </p>
        <p>
          For the first time in her career, Jaylen stepped up to the plate as a batter, and on opening day, standing on
          the pitcher’s mound opposite her, was none other than Hiroto Wilcox. Jaylen’s first at bat didn’t take place
          until the 3rd inning. Wilcox threw a clean strike on the first pitch, then a Fiery double strike on the
          second. In the 6th inning, Jaylen stepped up to the plate for the second time, and once again, Hiroto threw a
          strike, then a Fiery double strike to send Jaylen back to the bench. The game ended before Jaylen picked up a
          bat again, and the Tigers won, 6 - 4. Her first game as a batter can be summed up in four pitches, two of
          which were fireballs.
        </p>
        <p>One for Moody. One for Scorpler.</p>
      </Entry>
      <Entry election={19} title="The Hubris Reform">
        <p>
          In the <Jump election={18}>Season 18 Election</Jump>, long time fan favorite Paula Turnip won the Center Of
          Attention blessing, despite most of the Tigers not voting for it. It made her a Super Idol, doubling Snack
          payouts and instantly making her the most profitable player in the league. In the Expansion Era, bad things
          happened to players who were consistently very profitable, so the Tigers tried to Reform Super Idol.
        </p>
        <p>
          It succeeded, turning Turnip from a Super Idol to a Credit To The Team, which quintupled Snack payouts, making
          her even more profitable. Later, <Jump election={20}>fans would again Reform Paula Turnip</Jump> so she would
          no longer be the economy, but it was too little, too late. She was eventually{" "}
          <Jump time="2021-07-23T20:03:51Z">Vaulted in Season 23</Jump>. League officials later confirmed that this was
          entirely random; out of the over 200 known Modifications, the sim decided to pick the only one that punished
          the Tigers for their hubris.
        </p>
      </Entry>
      <Entry date="Season 23, Day 95" title="Famous “Feedback” Owens" time="2021-07-23T15:05:24Z">
        <p>
          The Hades Tigers were no strangers to star players leaving through Feedback; Jessica Telephone and Fish Summer
          were prime examples. Besides Feedback and Ruby Tuesday, the team’s roster was relatively stable for all of
          Blaseball’s first twenty seasons. But, in the waning moments of the Expansion Era, the Tigers came extremely
          close to having no original players left in their active roster. Alternations, Fax Machines, Voicemails, and
          Wills whisked away mainstays <Jump time="2021-06-28T18:23:36Z">Zion Aliciakeyes</Jump> and{" "}
          <Jump time="2021-06-30T02:29:36Z">Randy Castillo</Jump>, Dunlap Figueroa{" "}
          <Jump redirect="/player/7aeb8e0b-f6fb-4a9e-bba2-335dada5f0a3" time="2021-07-21T12:35:00Z">
            Roamed away two days
          </Jump>{" "}
          after <Jump time="2021-07-21T10:27:45Z">stealing the Fifth Base</Jump>, and team captain Hiroto Wilcox
          Feedbacked away on <Jump time="2021-07-23T03:17:24Z">Season 23, Day 83</Jump>.
        </p>
        <p>
          The only one left was Famous Owens, previously a famously inconsistent pitcher, now a fantastic batter. Jazz
          Hands batter Spears Rogers held the{" "}
          <Jump redirect="/item/554aa743-458a-40eb-bc76-4008193b7ca3" season={23} day={95}>
            Fliickerrriiing Greedy Potion of the Famine
          </Jump>
          , making hys Feedback a nigh-certainty. Reality flickered during hys first at bat, in the top of the 2nd
          inning. It was equally likely for the Feedback to target any player on the Tigers’ line upbut, out of the
          eight, Owens was swapped.
        </p>
        <p>
          For the following seven innings, the Tigers were very much a Ship of Theseus. But, with 2 strikes and 2 outs,
          at the last possible moment, they did it again.{" "}
          <Jump time="2021-07-23T15:28:14Z">Famous Owens Feedbacked with Spears Rogers</Jump>, much to the delight of
          both teams’ fanbases.
        </p>
      </Entry>
      <Entry date="Season 24, Day 63" title="Ayanna Dumpington Molotovs a Rogue Ump" time="2021-07-29T07:22:54Z">
        <p>
          Up until Season 24, the Tigers had a drought of Rogue Umpire kills, despite the fact that they intentionally
          built their ballpark to increase the frequency of Incineration attempts during Solar Eclipses. Fans partied
          with other teams that Incinerated Rogue Umpires with their seasonal Fireproof Modifications. Despite all of
          their efforts, the Tigers got nothing. Likewise, Ayanna Dumpington was going through her own journey to find
          her place on the Hades Tigers, but she did <em>not</em> let that stop her from shining. With the amount of
          times she partied, and her performance throughout the Expansion Era, it was safe to say she has become one of
          the Tigers’ staple players.
        </p>
        <p>
          All of this solidified on Day 63, when the immaterial plane was falling apart, but, despite everything,
          Dumpington still chugged on. In the bottom of the 8th inning, Dumpington’s Instability baited a Rogue Ump. As
          she, as a Tiger, was Fireproof, the Rogue Ump was Incinerated instead. At that point, no one could deny that
          she made her place on the Hades Tigers.
        </p>
      </Entry>
      <Entry date="Season 24, Day 81" title="Slag the Coin" redirect="/depth" time="2021-07-30T02:50:00Z">
        <p>
          In Season 24, with the Expansion Era ending, the Tigers initially set course for the Hall of Flame. The team,
          due to its history and its Evolution, saw that as their natural destination. The Coin was then{" "}
          <Jump time="2021-07-29T09:00:13Z">Scattered by the Sunbeams</Jump> as a consequence of{" "}
          <Jump redirect="/depth" time="2021-07-28T19:34:01Z">
            a message from the Reader
          </Jump>
          . This weakened her and gave the Monitor an opening:{" "}
          <Jump redirect="/depth" time="2021-07-29T16:37:21Z">
            It quit
          </Jump>
          , let all of the deceased teams of the Hall, and made all the teams near the Hall go Rogue. The Tigers raced
          towards the Coin, leading a pack of Rogue teams, and{" "}
          <Jump redirect="/depth" time="2021-07-30T02:55:15Z">
            melted her down
          </Jump>
          . Tigers fans found this cathartic, as the Expansion Era, especially its last few seasons, were very hard on
          the team from the Alternation or loss of many fan favorites. The Coin caused it all, and now she burned.
        </p>
        <p>
          After all this, the Tigers raced towards the presumed safety of the Vault, running from an ever-expanding
          Black Hole (Black Hole). They made it in at the last possible moment, <em>barely</em> avoiding being swallowed
          by the Black Hole (Black Hole).
        </p>
      </Entry>
    </History>
  );
}
