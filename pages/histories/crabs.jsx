import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "1e596c72-4a89-4186-bb79-fe72bcdf7115",
        "f2e5964d-29c5-44a6-8a07-6e62b08d75d6",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Yurts, Clowne, and Lucien">
      <Entry title="Five Blessings" election={5}>
        <p>
          Reveling in their influence, both in fan count and votes accumulated, the Crabs went on to have extraordinary
          influence in the Season 5 Election due to their resources and a heavy dose of luck. The Crabs either won or
          were the top voters for five separate Blessings, winning massive stat improvements for many of their players
          and stealing the top pitcher in the league. The one hiccup was the loss of Nagomi McDaniel to the{" "}
          <Link href="jazz-hands">Jazz Hands</Link>, when they won a Blessing that the Crabs were the top voter in.
        </p>
      </Entry>
      <Entry title="The Crabs’ First Championship" season={6} day={110}>
        <p>
          Starting as the second-to-worst team in the entire league in Season 1, the Crabs had become a force to be
          reckoned with by Season 6. Freshly empowered with the Blessings they had won in the Season 5 Election, the
          Crabs dominated both the regular season and postseason, setting the record for most wins in a single season by
          ending the regular season 80-19. The <Link href="pies">Philly Pies</Link> tied that 80-19 record in{" "}
          <Jump time="2021-05-14T20:45:00Z">Season 18</Jump>, though they lost a win due to Black Hole. In the
          postseason, the Crabs swept every team they played against and claimed their first championship.
        </p>
      </Entry>
      <Entry title="Old Fae Seasoning Buys Night Vision Goggles" election={6}>
        <p>
          A large part of early Crabs culture was trying to figure out how to optimize winning coins, and Crabs fans
          often found themselves generating a ton of coins on top of having the largest fanbase at the time. Old Fae
          Seasoning, a Crab fan who knew how to earn a coin, performed an experiment, asking other Crabs to let them
          exclusively vote for Night Vision Goggles. In the Season 6 Election, the Crabs won the Night Vision Goggles,
          with Fae casting 18% of the votes. This was two-thirds of the votes cast by the{" "}
          <Link href="magic">Yellowstone Magic</Link>, who cast 27%. To say that the Crabs lost their mind over the fact
          that Old Fae Seasoning nearly single-handedly bought a Blessing would be an understatement.
        </p>
      </Entry>
      <Entry title="We Are From Chiclawgo" season={8} day={46}>
        <p>
          Day 46 started a team bonding set of four series against the{" "}
          <Link href="firefighters">Chicago Firefighters</Link>. Crabs and Firefighter fans spent nearly a full day in a
          group watch party on Discord, having fun talking about their lore and players especially the brand new
          Firefighter Goobie Ballson. This cemented a long-running love of the Firefighters by the Crabs and served as
          an important bridge to the league for the Crabs.
        </p>
      </Entry>
      <Entry title="Death of a Tillman, Home Gun!" date="Season 9, Day 64" time="2020-10-08T07:10:46Z">
        <p>
          Team dirtbag Tillman Henderson just released a new track on <em>Away Games</em> called “Combs. D”, a
          delightful ditty about the death of his teammate Combs Duende and how he never would have allowed himself to
          be Incinerated like that. It was released to much fanfare, and the umpires celebrated his new musical success
          by Incinerating him. His replacement, assassin Silvaire Roadhouse, was originally contracted to kill
          Henderson. After losing her score, she was stuck finishing out the game for him with a victory-clinching
          three-run home run, the last true “Tilly Triple” on record.
        </p>
      </Entry>
      <Entry title="Nagomi McDaniel Emerges" date="Season 9, Day 103" time="2020-10-10T13:12:52Z">
        <p>
          Fans didn’t know at the time that this was one of Nagomi McDaniel’s last possible chances to escape THE
          SHELLED ONE’S PODS. On Season 9, Day 103, the Crabs hosted the <Link href="sunbeams">Sunbeams</Link> in Birds
          weather. This was the end of another spectacular season for the Crabs, and their 71 wins had fans feeling good
          about the team’s chances at Ascension. They didn’t need a miracle, but got one anyway: It was only the second
          inning when Birds pecked McDaniel free, right before the 3rd inning for{" "}
          <Jump time="2020-10-10T13:14:58Z">her first at-bat</Jump>. The first pitch thrown to her became a two-run home
          run. In the 4th inning, two balls preceded a <Jump time="2020-10-10T13:19:10Z">3-run home run</Jump>.
        </p>
        <p>Nagomi’s pregame ritual happened to be “cursing the sun”.</p>
      </Entry>
      <Entry title="Finn James’ Perfect Game" season={10} day={72}>
        <p>
          Finn James was never the Crabs’ best pitcher. She was good, of course; the Crabs always prided themselves on
          the strength of their pitchers. Her tendency to load bases and rely heavily on fielding certainly made her no
          one’s first guess for the Crabs’ first perfect game. On the hard-fought path to their third championship, with
          four strikeouts in 27 outs, she did just that.
        </p>
        <LineScore id="1e596c72-4a89-4186-bb79-fe72bcdf7115" />
      </Entry>
      <Entry
        title="The Redaction of Forrest Best by the Coward NaN"
        date="Season 15, Day 31"
        time="2021-04-06T22:17:26Z"
      >
        <p>
          Forrest Best was a Season 1 Crab who best personified the Crabs playstyle during the Discipline Era. While not
          a home run monster, Best was incredibly fast, at one point stealing home more than several other teams
          combined, a decent batter, and had strong defense. Tragedy would strike on Day 31 when NaN, who Received{" "}
          <Jump time="2021-04-06T14:10:07Z">Wyatt Mason X’s Echoed Debt</Jump>, hit Best with a pitch, marking it for
          Observation. On the end of play on Day 35,{" "}
          <Jump time="2021-04-07T02:45:00Z" redirect="/player/d35ccee1-9559-49a1-aaa4-7809f7b5c46e">
            Best was Redacted
          </Jump>
          . It would{" "}
          <Jump time="2021-04-14T19:09:06Z" team="b024e975-1c4a-4575-8936-a3754a08806a">
            make a reappearance
          </Jump>{" "}
          on the <Link href="steaks">Steaks</Link> for a while before having its soul{" "}
          <Jump time="2021-06-25T02:29:45Z" team="b024e975-1c4a-4575-8936-a3754a08806a">
            consumed by Consumers
          </Jump>
          , Redacting it for a second time on Season 21, Day 82. Forrest Best was not seen for the rest of Beta.
        </p>
      </Entry>
      <Entry title="The Pinch" date="Season 16, Day 16" time="2021-04-13T06:16:27Z">
        <p>
          Shortly after gaining their Evolution, Carcinization, which would steal their opponent’s best hitter for the
          remainder of a game Black Hole was activated in, Crabs fans theorized that they could permanently move a
          strong batter to their team by Moving a Carcinized player to their lineup while they were temporarily on the
          Crabs. It would take several seasons before the Crabs finally got to put this theory to the test, having two
          opportunities in Season 16, on Days 16 and <Jump time="2021-04-15T01:21:20Z">56</Jump>, both against the{" "}
          <Link href="moist-talkers">Moist Talkers</Link> and both with star hitter Alston Cerveza. Fans had to mobilize
          a massive amount of votes in minutes, as the chance could come at any moment. The plan was successful, and{" "}
          <Jump election={16}>the Crabs pinched Cerveza</Jump> from the Moist Talkers.
        </p>
      </Entry>
      <Entry title="Fish Summer Salmon Cannon" date="Season 16, Day 75" time="2021-04-15T21:05:37Z">
        <p>
          The Crabs, along with much of the league, added Salmon Cannons to their ballparks with the hope that they
          might fend off Consumer attacks. While it was later revealed that they did, they also blasted players
          Elsewhere. While Fish Summer was not a Salmon, it seemed they were fish enough to be the first player launched
          out of a cannon. They Sent The Fish Back.
        </p>
      </Entry>
      <Entry title="Lorcan’s One-Strike Shutout" season={19} day={53}>
        <p>
          The Crabs’ belief in defense stats being real had historically worked very well for them. Case in point: On
          Season 19, Day 53, Lorcan Smaht shut out the <Link href="breath-mints">Breath Mints</Link> with{" "}
          <Jump time="2021-05-19T20:17:01Z">a single strikeout</Jump>, a feat fans found thoroughly hilarious.
        </p>
        <LineScore id="f2e5964d-29c5-44a6-8a07-6e62b08d75d6" />
      </Entry>
      <Entry title="A High Score" season={23} day={24}>
        <p>
          After the Crabs Descended, they landed in Mild Low; games against the{" "}
          <Link href="firefighters">Chicago Firefighters</Link> were less frequent. This, in turn, made any Chiclawgo
          game more of an event, as a gathering of old friends. On{" "}
          <Jump season={23} day={22}>
            Season 23, Day 22
          </Jump>
          , Chiclawgo once again reunited for the first time in six seasons. With the exception of Day 22’s Eclipse, the
          weather seemed fairly uneventful, with a{" "}
          <Jump season={23} day={23}>
            Sum Sun game
          </Jump>{" "}
          followed by this Sun .1 game.
        </p>
        <p>
          The final game on Day 24 was drawing to a close. The Firefighters, with some assistance from Crabs Subtractor
          Kaz Fiasco, led the score at 8.6-4.9 in the top of the 9th, with Finn James pitching. While she had, as Crabs
          fans would say, finned this jame, she historically was able to hold out at slightly under 10 runs to avoid
          getting faxed. When Lou Roseheart came up to bat, they immediately{" "}
          <Jump time="2021-07-20T14:26:22Z">hit a double</Jump>, and then stole third. While stressful, Crabs fans were
          used to James playing these kinds of mind games with them. Next, Stout Schmitt skipped up to plate and
          immediately <Jump time="2021-07-20T14:26:42Z">drew a walk</Jump>. Crabs fans started to sweat as the next
          batter for the Firefighters, Socks Maybe, walked up to bat. With a quick single, Maybe{" "}
          <Jump time="2021-07-20T14:26:57Z">hit Roseheart in</Jump> for 1.9 runs.
        </p>
        <p>
          With the score now 10.5-4.9, <Jump time="2021-07-20T14:27:11Z">James was faxed</Jump>, calling up the
          soon-to-be star of the show, Axel Campbell. Campbell took the mound and threw a single pitch to Magnified Baby
          Triumphant. Triumphant did not hold back, hitting an{" "}
          <Jump time="2021-07-20T14:27:16Z">awe-inspiring home run</Jump> worth 8.7 runs. The score was now 19.2-4.9,
          faxing range for Campbell. Swamuel Mora <Jump time="2021-07-20T14:27:41Z">hit a triple</Jump> off the
          now-shaken Campbell, followed by Gabriel Griffith <Jump time="2021-07-20T14:27:51Z">hitting a sacrifice</Jump>{" "}
          and batting Mora in, scoring another 1.9 runs and bringing the score to 21.1-4.9.{" "}
          <Jump time="2021-07-20T14:28:06Z">Campbell was faxed</Jump> after spending only three pitches on the mound.
          With this as Campbell’s only appearance this season, his ERA hit a resounding 286.2, setting a high score no
          pitcher has yet to match.
        </p>
      </Entry>
      <Entry title="float var = 20.3" season={23} day={58}>
        <p>
          Jon Halifax, scammer and nemesis of Crab-kind, had been banished to{" "}
          <Link href="breath-mints">Kansas City</Link> in the <Jump election={22}>previous season’s Election</Jump>. His
          crimes finally reached their peak on Day 58 when he activated the Equal Sun by scoring a home run in the last
          out of the game, which the Crabs were winning by over 20 points. While this should have tied the game, a
          floating point error in the Breath Mints’ favor awarded them the win. The Crabs lost the game,
          20.3-20.300000000000001. This was the final straw for the Crabs, who demanded Halifax’s head.
        </p>
      </Entry>
      <Entry
        title="A Bank Shot"
        date="Season 23, Day 63"
        time="2021-07-22T06:03:13Z"
        team="adc5b394-8f76-416d-9ce9-813706877b84"
      >
        <p>
          On Day 60, with the Crab’s bloodlust for Jon Halifax at its peak, demands for Debted batter and professional
          assassin Silvaire Roadhouse to kill him reached their crescendo, only to be wildly disappointed when she
          instead caused <Jump time="2021-07-22T03:08:06Z">only Helga Washington to become Unstable</Jump>. It appeared
          Jon Halifax would once again get away with his crimes&hellip; until Day 63. Helga Washington was Incinerated
          and the Instability chained to Halifax, who was{" "}
          <Jump time="2021-07-22T06:06:04Z">Incinerated very shortly thereafter</Jump> to much celebration and chanting
          of “and then he died 🦀” from the Crabs and <Link href="breath-mints">Mints</Link>. Both teams honored the
          sacrifice of Helga Washington for hir role in finally bringing Jon to heel. Silvaire Roadhouse, for her part,
          maintained that the trickshot was entirely intentional.
        </p>
      </Entry>
      <Entry title="Finnstability" season={24} day={14}>
        <p>
          Finn James was a pitcher who loved to make Crabs fans sweat. Well known for their&hellip; <em>unusual</em>{" "}
          pitching style, it wasn’t uncommon to see James load up the bases only to end the inning with no score.
          Alternatively, it also wasn’t uncommon to see her give up runs that were completely unjustifiable. This game,
          however, took James’s brinkmanship to levels she had never reached before.
        </p>
        <p>
          The <Link href="breath-mints">Breath Mints</Link> had already{" "}
          <Jump time="2021-07-26T17:13:23Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            been Incinerated
          </Jump>
          . The <Link href="fridays">Fridays</Link> had also{" "}
          <Jump time="2021-07-26T19:05:46-07:00" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            been Incinerated
          </Jump>{" "}
          and chained their Instability to the Crabs. The Supernova Eclipse, at this point, looked extraordinarily
          deadly. James, in her usual fashion, played the longest innings she possibly could, stretching out the game to
          40 minutes on the material plane, the Crabs under threat of full-team Incineration with every play. They
          survived their seven Unstable games, but Finn James, as always, kept fans on their toes.
        </p>
      </Entry>
    </History>
  );
}
