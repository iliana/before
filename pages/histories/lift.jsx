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
        "f7ad7826-ca6e-49c2-818e-190408b046fe",
        "fdf28d28-0d5f-4bf2-9dc4-b70626183c15",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History>
      <Entry election={10} title="Heart and Swole">
        <p>
          After a climactic Internet Series and an even more climactic{" "}
          <Jump time="2020-10-18T00:33:04Z">Season 10, Day X</Jump>, the Baltimore Crabs became the first team to earn
          three championships and Ascend. In their place, the first new team since the Return of Blaseball was formed:
          The Tokyo Lift. This collection of fresh names and untalented players, along with the idea of a brand new
          team, spawned a chaotic first week of fans organizing themselves and figuring out what the new team’s identity
          would be.
        </p>
      </Entry>
      <Entry
        date="Season 11, Day 73"
        title="We Like, We Like to Party"
        time="2020-10-22T17:40:00Z"
        redirect="/standings"
      >
        <p>
          The rookie Tokyo Lift equalled the Hawaiʻi Fridays’ speed record for entering Party Time. Celebration of the
          Party Time speedrun was an important part of early Lift fan culture, even after the Ohio Worms set their own
          astonishing benchmark of{" "}
          <Jump season={13} day={67} redirect="/standings">
            67 days
          </Jump>
          , a record that will likely never be beaten.
        </p>
      </Entry>
      <Entry
        date="Season 12, Day 6"
        title="Cudi and His Terrible, Horrible, No Good, Very Bad Peanuts"
        time="2021-03-01T21:01:03Z"
      >
        <p>
          Fresh off of the 18-year Great Siesta, the Lift, as the fresh faces of the League who had previously only
          faced Black Hole and Sun 2 weather, were ready to experience their first real season of Blaseball. Experience
          it they did, as just six days into the season, the Lift’s unassuming star batter and best pitching prospect
          Cudi Di Batterino swallowed a peanut and had a devastating allergic reaction. Not only was this the first time
          something bad ever happened to the Lift, this event also foreshadowed the Lift’s propensity toward notable
          peanut-related events throughout the Expansion Era and kickstarted what fans describe as the quintessential
          Lift narrative.
        </p>
        <p>
          Though Di Batterino was soon <Jump election={13}>the target of an accidental Foreshadow</Jump>, he was brought
          out as a pitcher in <Jump election={14}>the following Election</Jump>, where the Lift would devote much of
          their energy and Votes to allow him to recover and shine. After{" "}
          <Jump election={19} team="eb67ae5e-c4bf-46ca-bbbc-425cd34182ff">
            an unexpected Exchange
          </Jump>{" "}
          with the Moist Talkers, the Lift tried and eventually succeeded in{" "}
          <Jump election={21}>Exchanging him back</Jump>, once again making him a batter. Though his unique Intuitive
          Modification nearly restored his hitting stats to what they were before the allergic reaction, those stats
          were very low for that point in the late Expansion Era. He still managed to perform as one of the Lift’s top
          batters in a surprising recovery and return to the Di Batterino of Season 11, only for him to get Shelled{" "}
          <Jump time="2021-06-29T15:17:33Z">25 days into the season</Jump> and never freed before the end of Beta.
        </p>
      </Entry>
      <Entry date="Season 12, Day 37" title="The Return of a Dead God" time="2021-03-03T05:12:02Z">
        <p>
          Up until this point, the only way for a player to be Shelled was the Idol Board or being extremely unlucky in
          Peanut weather, neither of which were likely after the death of the Shelled One. However, on this day, fans
          learned that Honey Roasted players, such as the Lift’s Wyatt Quitter, had a chance to Shell other players,
          sending shockwaves through the league. Not only was this the first Expansion Era Shelling, but it was the
          first of four Shellings by Lift players, making the Lift responsible for over a quarter of all Expansion Era
          Shellings.
        </p>
      </Entry>
      <Entry date="Season 14, Day 77" title="Engine’s 6-Run Home Run" time="2021-03-18T21:07:17Z">
        <p>
          Before Magnification, before Hoops, before absurd scoring Suns, there were two ways to modify runs in
          Blaseball: Coffee weather Modifications and Big Buckets. Rookie Engine Eberhardt, brought out in the{" "}
          <Jump election={13}>Season 13 Election</Jump>, went on to be one of the greatest extra base hitters to ever
          pick up a bat, hitting 295 triples by the end of Beta, barely trailing the greatest Season 1 players.
        </p>
        <p>
          In this case, however, Eberhardt hit a 3-run home run, into the Sixth Circle Stadium’s Big Buckets, while
          Wired. This totalled 6 runs, a record over the previous{" "}
          <Jump team="bfd38797-8404-4b38-8b82-341da28b1f83" time="2020-10-12T22:06:18Z">
            5-run Pentaslam
          </Jump>{" "}
          and the first sign of systems interlocking to form the Expansion Era’s unprecedented scoring plays.
        </p>
      </Entry>
      <Entry date="Season 14, Day 99" title="ECHO STATIC" time="2021-03-19T19:20:19Z">
        <p>
          In the aftermath of <Jump time="2021-03-18T15:45:00Z">the Second Wyatt Masoning</Jump>, the Lift’s own Wyatt
          Mason turned Wyatt Quitter from a Receiver to an Echo on <Jump time="2021-03-18T23:14:36Z">Day 79</Jump>,
          putting both of them at risk of Echoing into Static. When Mason Echoed into Static on{" "}
          <Jump time="2021-03-19T01:05:52Z">Day 81</Jump>, many fans hoped to pull through the end of the season without
          one of the team’s most popular players being lost completely. This tension came to a head on Day 99, when it
          was not only a Feedback game against another Echoing player, but the game that would decide which team got
          into the postseason.
        </p>
        <p>
          Unfortunately, in the bottom of the 7th, Quitter Echoed the Flowers’s Wyatt Mason VI, reducing them both to
          Static. The Lift won the game, but the Flowers drew the Wild Card. Their{" "}
          <Jump season={14} day={100}>
            Day 100
          </Jump>{" "}
          game also took place in Feedback, meaning that if the teams had gotten lucky the previous day, the sim would
          have likely created disaster anyway.
        </p>
      </Entry>
      <Entry date="Season 15, Day 99" title="Oh You Think So Huh" time="2021-04-09T19:04:42Z">
        <p>
          Nandy Slumps, the single biggest hole in the Lift’s leaky pitching rotation, had a well-earned reputation for
          confounding team strategy. She already dodged one concerted shadowing attempt,{" "}
          <Jump election={12}>letting Concrete Mandible take the fall</Jump> on a 0% wimdy. In Season 15, though, she
          virtually monopolized Party Time to become a promising batter. As the Election approached, there was genuine
          enthusiasm for her planned Move into the lineup. In the last game of the season, she was attacked by Consumers
          while staring directly at previously excited fans.
        </p>
      </Entry>
      <Entry
        date="Season 16, Day 88"
        title="Lance No Longer"
        redirect="/player/d86f836e-4edf-4dbd-9743-14f30461ee14"
        time="2021-04-16T10:30:00Z"
      >
        <p>
          Lance Serotonin, one of the Tokyo Lift’s co-captains, <Jump time="2021-04-16T10:26:19Z">struck out</Jump> in
          the last play of a 0.3-run defeat and, seconds later, vanished from the roster. His Redaction was the first in
          a series of calamities to befall the team’s leadership.
        </p>
      </Entry>
      <Entry date="Season 17, Day 14" title="Shell Two, Shell Another for Half Off" time="2021-04-20T04:13:22Z">
        <p>
          14 days into Season 17, Roamin’ player Alejandro Leaf pitched against her first team, the LA Unlimited Tacos.
          After allowing 6 runs with little run support from her own team to balance the score, Leaf tasted the infinite
          and Shelled Felix Garbage, a former Mills teammate from before{" "}
          <Jump election={13} team="36569151-a2fb-43c1-9df7-2df512424c82">
            Leaf was Revoked
          </Jump>
          . This, in itself, was somewhat notable: Although Leaf was not the first pitcher to taste the infinite,
          Garbage’s Shelling marked the first time a player Shelled a former teammate.
        </p>
        <p>
          This wasn’t enough for Leaf as, after allowing 3 more runs and seeing an opposing runner steal third, she went
          on to <Jump time="2021-04-20T04:19:39Z">Shell former Tacos teammate Basilio Fig</Jump> while they were
          simultaneously at bat and in the Secret Base. The Lift ended up losing the game, 11-1,, but Leaf’s act of
          petty vengeance tempered any disappointment over the Lift’s blowout defeat. In the aftermath, then-Tacos
          pitcher{" "}
          <Jump time="2021-04-20T11:21:17Z" team="878c1bf6-0d21-4659-bfee-916c8314d69c">
            Wyatt Mason IV Echoed Garbage’s Shelled Modification
          </Jump>
          , leaving Leaf responsible for Shelling three players in a single game. Some cite the Shelling of two of the
          Tacos’ weaker batters as a major contributor towards their first championship win that season.
        </p>
        <p>
          Leaf ended Beta as the first and only player to both taste the infinite twice in a single game, and to Shell
          former teammates.
        </p>
      </Entry>
      <Entry date="Season 17, Day 44" title="The Stijncineration" time="2021-04-21T11:03:31Z">
        <p>
          A rollercoaster season took another shocking lurch when Stijn Strongbody, another co-captain and co-founder of
          the team, became the first Lift player to enter the Hall of Flame. The Incineration of their beloved batter
          drew sympathetic tributes from across the ILB and helped silence whispers of a Lift heel turn following{" "}
          <Jump time="2021-04-20T04:13:22Z">Day 14</Jump>.
        </p>
      </Entry>
      <Entry date="Season 17, Day 75" title="Capri Sunset: Foiled" time="2021-04-22T19:21:30Z">
        <p>
          The Hellmouth Sunbeams hatched the Capri Sunset plan, a long-term gambit for Party Time gains which would see
          their strongest players strategically shadowed and 0.5-star batter Joe Voorhees promoted to the active roster.
          Lift batter Jessica Telephone was a seasoned &mdash; specifically, Honey Roasted &mdash; veteran and would not
          let the home team tank without a fight. In the top of the 9th, she tasted the infinite and Shelled Voorhees.
          Shorn of his talents, the Sunbeams collapsed and the Lift took a 2-0 victory. This was Telephone’s first
          experience Shelling another player, and the Lift’s last Shelling before the departure of their remaining Honey
          Roasted players.
        </p>
      </Entry>
      <Entry season={18} day={56} title="Dead Ringer">
        <p>
          Fan favorite <Jump time="2021-05-13T00:02:31Z">Rylan O’Lantern</Jump>, star player{" "}
          <Jump time="2021-05-13T00:14:58Z">Jessica Telephone</Jump>, and heavy hitter{" "}
          <Jump time="2021-05-13T00:29:06Z">Gerund Pantheocide</Jump> were all fired Elsewhere by Salmon Cannons in a
          single game. While a triple Elsewhere isn’t particularly special &mdash; the Pies had four players swept away
          on <Jump time="2021-03-19T07:01:51Z">Season 14, Day 87</Jump> &mdash; Day 56 is notable for being the last
          time that the renowned Jessica Telephone saw play before her Alternate was called. O’Lantern and Pantheocide
          both returned within a few days, but Telephone remained Elsewhere through the{" "}
          <Jump election={18}>Season 18 Election</Jump>, when she was hit by Lift’s Alternate Trust Will. A different
          Jessica Telephone returned on <Jump time="2021-05-17T16:14:25Z">Season 19, Day 2</Jump>.
        </p>
      </Entry>
      <Entry date="Season 19, Day 117" title="The Shampionship" time="2021-05-23T00:27:04Z">
        <p>
          The shambolic, Turntable-assisted mockery of a postseason campaign came to be known as the Clown Show, at
          least until the Season 22 playoffs arrived on a unicycle and said “hold my oversized shoes.” The Garages,
          aching to win the Internet Series with their fourth attempt,{" "}
          <Jump time="2021-05-23T00:00:01Z">started with a one-run Home Field Advantage</Jump> but could not add to it.
        </p>
        <p>
          The Lift, meanwhile, came to flex. At one point, Yusef Fenestrate{" "}
          <Jump time="2021-05-23T00:19:42Z">hopped on the Grind Rail and landed a Soul Crusher</Jump>; this was the very
          definition of stunting on an opponent, as it set up Gerund Pantheocide to immediately slam a 3-run homer. A
          final savage dunk on splortsmanship in general, and Terrell Bradley in particular, saw the opposing pitcher,
          and future Lift, faxed out in the last inning of the five-game series. Coolname Galvanic shut out the Garages
          to clinch the Lift’s first title.
        </p>
        <LineScore id="f7ad7826-ca6e-49c2-818e-190408b046fe" />
      </Entry>
      <Entry date="Season 20, Day 13" title="Steal Failed" time="2021-06-15T03:25:09Z">
        <p>
          The Crabs’ Evolution, Carcinization, allowed them to steal the opposing team’s best hitter for the remainder
          of the game when they triggered the Black Hole. In fan lore, Carcinized players sometimes develop crab-like
          features like claws and shells. In the top of the 8th inning, Crabs player Avila Guzman hit a solo home run,
          triggering the Black Hole. However, where this would normally have stolen the Lift’s best hitter, the game log
          instead reported “Steal failed. Gerund Pantheocide was gripped by Force”. Force prevented players from leaving
          their present position, but Pantheocide never had the Modification, nor any item with it. The apparent error
          was lored as an increasingly powerful player simply refusing to obey in-game physics. Pantheocide remained
          with the Lift and, in the 9th inning, hit <Jump time="2021-06-15T03:28:40Z">a defiant home run</Jump> to Shame
          the visiting Crabs.
        </p>
        <LineScore id="fdf28d28-0d5f-4bf2-9dc4-b70626183c15" />
      </Entry>
      <Entry date="Season 21, Day 12" title="The Most Dangerous Job in Blaseball" time="2021-06-22T02:11:06Z">
        <p>
          It already looked like a day to forget. Despite the best efforts of co-captains Yusef Fenestrate and Gerund
          Pantheocide, the Lift were making no headway. In the bottom of the 4th inning, with the Lift down 4-0,
          Pantheocide was Incinerated by a Rogue Umpire. The Lift’s captaincy curse claimed its third victim. Gerund
          Pantheocide was the closest the Lift had to a home-grown breakout star, and her heroics in{" "}
          <Jump season={19} day={117}>
            the Shampionship
          </Jump>{" "}
          earned her a place on the{" "}
          <Jump redirect="/leaderboard" time="2021-06-18T19:40:00Z">
            Idol Board
          </Jump>
          . Some fans had misgivings about her boosted Ego but, in Season 23, this meant a return to Blaseball with the{" "}
          <Jump season={23} day={100} redirect="/team/280c587b-e8f6-4a7e-a8ce-fd2fa2fa3e70">
            Rising Stars
          </Jump>
          . As for Fenestrate, he took cover in the Secret Base after their next at bat. The Pies continued scoring
          without reply and, when Fenestrate <Jump time="2021-06-22T02:20:12Z">finally emerged to steal fifth</Jump>, xe{" "}
          <Jump time="2021-06-22T02:20:33Z">failed to bat hirself in</Jump>. After this, the Tokyo Lift abolished the
          captaincy.
        </p>
      </Entry>
      <Entry date="Season 22, Day 114" title="A Pitching Peanut" time="2021-07-03T21:17:25Z">
        <p>
          The Lift hosted the Mints for the penultimate game of the Internet Series. They almost certainly didn’t
          deserve to be there, as the team{" "}
          <Jump redirect="/standings" time="2021-07-02T20:40:00Z">
            placed 23rd in the league
          </Jump>
          . They only made the Overbracket by drawing the Wild Card, and won the Wild League Champion Series through the
          use of Black Hole and Sun(Sun). On Day 114, the Lift allowed the Kansas City Breath Mints to 10 ten runs,
          activating the Tokyo Fitness Center’s Fax Machine and replacing Uncle Plasma XIV with Cudi di Batterino, who
          was Shelled on <Jump time="2021-06-29T15:17:33Z">Day 25</Jump>.
        </p>
      </Entry>
      <Entry
        date="Season 24, Day 79"
        title="Val Hitherto Epic Victory Royale End of the World Beefwings Hell Revenge Speedrun Cringe Compilation (Not Clickbait)"
        time="2021-07-30T00:21:01Z"
      >
        <p>
          Val Hitherto was often the butt of Lift fans’ jokes, due to his common portrayal in lore as a disaster of a
          person and Blaseball player to boot. After Hitherto’s Foreshadowing for Cudi Di Batterino in{" "}
          <Jump election={14}>Season 14</Jump>, many Lift fans would often jokingly propose either bringing Hitherto
          back in a Will or Revoking him to inflict him and his food stall, “the Beef Wings stand,” onto the league.
          These would become serious proposals, which would then be thrown aside for proposals involving better players.
          This cycle repeated about every other season, culminating in Season 18 and the introduction of the Shadow
          Infuse will. After some debate, it was determined Hitherto was among the best hitting prospects in the Lift’s
          mediocre shadows, and a plan was made to Shadow Infuse his batting to finally bring him back into the light.
        </p>
        <p>
          However, <Jump election={18}>the shadowed Kit Honey received the boost instead</Jump>, with just 1% of the
          Vote, and Silvaire Semiquaver was Foreshadowed to bring Honey to the lineup{" "}
          <Jump election={19}>the next season</Jump>, in the spot that rightfully belonged to Hitherto. Cut to Season
          24, Day 79, the league’s moment of need: Five minutes prior, the Philly Pies were nullified by the looming
          Black Hole (Black Hole). Fans were silent. Suddenly, Deep Darkness takes Kit Honey. The crowd gasped. Out of
          the shadows, the Lift’s Beef-Wing MVP’nt clocked in. Was it an act of vengeance? Justice?
        </p>
        <p>
          <Jump redirect="/depth" time="2021-07-30T03:10:00Z">
            Just 3 days later
          </Jump>
          , the Lift were nullified. Hitherto’s work here was done.
        </p>
      </Entry>
      <Entry season={24} day={81} title="Nullification, or: 3-1 at the End of the World">
        <p>
          In Season 24, the Tokyo Lift set course for the Horizon. Day 81 was their swansong, with Terrell Bradley now
          pitching for{" "}
          <Jump season={19} day={117}>
            his Shampionship tormentors
          </Jump>
          , even pulling double duty to cover for the Shelled Cudi Di Batterino. Their opponents were the Hades Tigers,
          familiar Wild High rivals, with former Lift Mags Banananana pitching and founding Lift{" "}
          <Jump time="2021-07-30T02:18:28Z">Ayanna Dumpington scoring the last run</Jump> to confirm the defeat.{" "}
          <Jump time="2021-07-30T02:22:19Z">A ground out from Kline Greenlemon</Jump> was the Lift’s final act of the
          Expansion Era. On the following day, the Tigers reached the Coin, Incinerating her and triggering the rapid
          expansion of the Event Horizon. The Lift, already poised on the lip of the void, slipped into the Black Hole
          (Black Hole) and{" "}
          <Jump redirect="/depth" time="2021-07-30T03:10:00Z">
            were Nullified
          </Jump>
          .
        </p>
      </Entry>
    </History>
  );
}
