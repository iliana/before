import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "9298a48f-c2fc-4821-9466-1ecacfd35a56",
        "ee270d5a-5883-472f-a18e-f3bcee7ad5da",
        "462481f4-7f97-441c-9fc9-c3dc3c5844a4",
        "8d4c1d3e-63df-4ce4-a582-b7f1dda1a7c1",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Corvoda, Caff, and Stara">
      <Entry title="Tyreek’s Incineration" date="Season 2, Day 24">
        <p>
          Tyreek Olive was not only the Firefighters first and, for most of the Discipline Era, only Incineration, they
          were also the league’s fifth Incineration ever. Olive later went on to become a Hall Star, and for seasons was
          a paragon for the Firefighters. Their replacement was Paula Mason, who would go on to be the Firefighters’ and
          ILB’s first Feedback swap on{" "}
          <Jump season={4} day={4}>
            Season 4, Day 4
          </Jump>
          , and also help nullify Sum Sun on{" "}
          <Jump season={24} day={37}>
            Season 24, Day 37
          </Jump>{" "}
          while playing for the <Link href="spies">Houston Spies</Link>.
        </p>
      </Entry>
      <Entry title="Triple Peanut Game" season={3} day={20}>
        <p>
          This game devastated the Firefighters’ chances this season, as three different players had allergic reactions
          in rapid succession. This started with <Jump time="2020-08-04T14:11:02Z">Edric Tosser</Jump> at the bottom of
          the 4th, followed by <Jump time="2020-08-04T14:16:40Z">Joshua Butt</Jump> at the top of the 6th, and ending
          with <Jump time="2020-08-04T14:24:36Z">Paula Mason</Jump> at the top of the 9th. The Firefighters would go on
          to have a fourth allergic reaction on <Jump time="2020-08-07T02:19:00Z">Day 77</Jump>, when Declan Suzanne ate
          the first of many peanuts, proving the legume to be a true enemy of the team.
        </p>
      </Entry>
      <Entry title="Against All Odds" election={3}>
        <p>
          Coming off a season decimated by peanuts, the Firefighters managed to win three Blessings, despite extremely
          low odds on all of them, with the Firefighters casting 7% of the vote or less. It was a miraculous turnaround
          for what should have been, by all accounts, a ruined team. While they would go on to eventually lose all three
          players that were aided by Team-Building Exercises, it was still enough to eventually lead to a championship
          for the team.
        </p>
      </Entry>
      <Entry title="Reverb Never Hurt the Firefighters" date="Season 5, Day 30" time="2020-09-01T21:19:57Z">
        <p>
          The Firefighters would come to have a storied history with Reverbs in the Expansion Era, with no less than two
          rotation Reverbs, a second full team Reverb, and half the league’s Reverberating players, and their
          familiarity with it began with this full team Reverb. While dread was an immediate reaction, with star pitcher
          Axel Trololol becoming a batter, it became clear that the team was far more well-optimized as the season went
          on: they went on to win the championship.
        </p>
      </Entry>
      <Entry title="Midwestern Grit" date="Season 5, Day 112" time="2020-09-06T01:26:38Z">
        <p>
          For the first time since Season 1, the Firefighters found themselves in the Internet Series. After two tight
          series against the <Link href="millennials">Millennials</Link> and the <Link href="lovers">Lovers</Link>,
          things were looking rough as the team remained tied with the <Link href="jazz-hands">Jazz Hands</Link> at the
          bottom of the 9th in Game 4 and needed a win to take the series to a fifth game. With two runners on base,
          Declan Suzanne made the move of his career when he ate a peanut and immediately reached on fielder’s choice,
          allowing the team to score. With the help of the Targeted Shame from that game, the Firefighters clinched the
          championship.
        </p>
        <LineScore id="9298a48f-c2fc-4821-9466-1ecacfd35a56" />
      </Entry>
      <Entry title="Fireproof Jacket" election={7}>
        <p>
          This particular Election shaped the Firefighters’ history and culture much more than it seemed at the time.
          After two seasons of casting 47% of the votes to try and nab the Fireproof Jacket, said by many a Chicagoan to
          once belong to former Firefighter Tyreek Olive, they finally managed to get it. Conversely, the other Blessing
          they managed to win that Election was from a single fan’s votes, stealing players from the{" "}
          <Link href="wild-wings">Mexico City Wild Wings</Link> and creating a friendship that would last the ages in
          the process.
        </p>
      </Entry>
      <Entry title="Double Shutout" season={8} day={16}>
        <p>
          The Chicago Firefighters and <Link href="lovers">San Francisco Lovers</Link> made history when Caleb Alvarado
          and Sandford Garner both pitched nine scoreless innings, resulting in the first instance of a double shutout.
          Due to the Firefighters having Targeted Shame from <Jump time="2020-09-22T06:34:27Z">the previous game</Jump>,
          the team started and ended the game with &minus;1 runs and lost, though Caleb paid out for a shutout while
          Sandford did not.
        </p>
        <LineScore id="ee270d5a-5883-472f-a18e-f3bcee7ad5da" />
      </Entry>
      <Entry title="No Dogs in Chicago" date="Season 8, Day 36" time="2020-09-23T03:05:04Z">
        <p>
          On Season 8, Day 36, José Haley was Incinerated, leaving Kennedy Rodgers the team’s only remaining player who
          joined the team via the Champs in the Making Blessing from <Jump election={7}>the prior Election</Jump>. Their
          replacement would go on to be one of the most beloved Firefighters players in the team’s history: Goobie
          Ballson.
        </p>
      </Entry>
      <Entry
        title="Hendricks Richardson hit a Ground Out to Joshua Butt"
        date="Season 9, Day 100"
        time="2020-10-09T20:10:44Z"
      >
        <p>
          After previously breaking the sim when{" "}
          <Jump time="2020-08-29T21:21:59Z">Thomas Draceana hit a ground out to Edric Tosser</Jump>, the Firefighters
          froze time once again during the first-ever Wild Card Series against the{" "}
          <Link href="sunbeams">Hellmouth Sunbeams</Link>. This was also the beginning of a strong friendship with the{" "}
          <Link href="fridays">Fridays</Link> after getting the Wild Card together, in an alliance called “OFWAFC: On
          Fridays, We Are From Chicago.”
        </p>
      </Entry>
      <Entry title={<>So The Wind Blows&hellip;</>} date="Season 12, Day 61" time="2021-03-04T05:11:53Z">
        <p>
          It didn’t take too long for things to start happening to the Firefighters in the Expansion Era. After being
          hit by two <Jump time="2021-03-02T17:16:23Z">back</Jump>-to-<Jump time="2021-03-02T18:02:22Z">back</Jump>{" "}
          Reverbs earlier in the season, <Jump time="2021-03-02T18:36:01Z">the Reader picking a Firefighter</Jump>{" "}
          during the Earlsiesta’s first-ever Tarot Reading, and a third allergic reaction from Declan Suzanne on{" "}
          <Jump time="2021-03-03T10:12:26Z">Day 42</Jump>, it was obvious that the Firefighters were really “lucky” this
          season. However, it was the Feedback that traded Edric Tosser with Jazz Hands pitcher Agan Harrison that
          really hit home just how eventful a season it would be.
        </p>
      </Entry>
      <Entry title="Butt’s Law Prevails" date="Season 12, Day 79" time="2021-03-05T00:14:30Z">
        <p>
          Season 12’s bad luck didn’t let up. Only 18 days after losing Edric Tosser to the Feedback, fan favorite
          Joshua Butt, often seen as a parental figure to the team, was Incinerated by a Rogue Umpire and replaced by
          Gita Sparrow. Maybe in an attempt to lighten the blow, Sparrow’s first at-bat resulted in a single, and she
          was later batted in to help the Firefighters win with a shutout.
        </p>
        <p>
          This Incineration also occurred four minutes after the{" "}
          <Jump time="2021-03-05T00:10:13Z">Incineration of Wild Wings player and famed lawyer Case Sports</Jump>. Both
          the Firefighters and Wild Wings had filed lawsuits against Blaseball management during the Grand Siesta, so
          many fans saw this as the day Blaseball decided to get its revenge. When Firefighters player Peanutiel Duffy
          tasted the infinite and Shelled Wild Wings player Stephanie Winters on{" "}
          <Jump time="2021-03-05T05:12:54Z">Day 84</Jump>, fans had further proof that the sim may be sentient.
        </p>
      </Entry>
      <Entry title="Rocky Rotation" date="Season 14, Day 67" time="2021-03-18T10:11:49Z">
        <p>
          Season 14 proved to be just as tumultuous as Season 12. After a rotation Reverb on{" "}
          <Jump time="2021-03-18T06:26:38Z">Day 63</Jump>, Flickering pitcher NaN, on the Worms at the time, Feedbacked
          with Chicago’s fan-favorite Rivers Rosa. This not only split up the “Twin Roses” Rivers Rosa and Lou
          Roseheart, but also forced Chicago to play against Rivers for the remainder of the game.
        </p>
      </Entry>
      <Entry title="A Championship Dashed" season={16} day={117}>
        <p>
          The final game of Postseason 16 was one most Firefighters fans were expecting to lose, but they didn’t expect
          to lose so phenomenally. The <Link href="steaks">Steaks</Link> led the league all season long. Agan Harrison
          on the mound was a guaranteed loss, but the surprise Sun 2 weather on top of it meant they likely wouldn’t
          even get a chance at Game 5. All fans could do was watch in horror as Harrison let a 3-run home run go at the
          top of the 1st inning, hoping that, if the Steaks did loop them, they could catch up and get their fifth game.
        </p>
        <LineScore id="462481f4-7f97-441c-9fc9-c3dc3c5844a4" />
      </Entry>
      <Entry title="That Time We Destroyed Axel Campbell’s ERA" season={23} day={24}>
        <p>
          A normal game for the Firefighters versus the <Link href="crabs">Crabs</Link> would later turn into a moment
          of triumph, becoming the perfect example of just how powerful Magnified batters back-to-back in a lineup can
          be. At the top of the 9th inning under Sun .1 weather, Socks Maybe{" "}
          <Jump time="2021-07-20T14:26:57Z">hit a single</Jump>, letting Lou Roseheart score a tenth (and a half) run
          for the Firefighters, <Jump time="2021-07-20T14:27:11Z">faxing out Finn James</Jump> and bringing out Axel
          Campbell. With two runners on base, Socks and Stout Schmitt, Magnified Baby Triumphant stepped up to bat.
          Without a single strike or ball, Triumphant{" "}
          <Jump time="2021-07-20T14:27:16Z">immediately hit a home run</Jump>, which totaled 8.7 runs from that play
          alone. Afterward, Swamuel Mora, also Magnified, stepped up to bat and{" "}
          <Jump time="2021-07-20T14:27:41Z">hit a triple</Jump>. Then, Gabriel “GG” Griffith{" "}
          <Jump time="2021-07-20T14:27:51Z">hit a ground out</Jump> to bring Mora home for another 1.9 runs, immediately{" "}
          <Jump time="2021-07-20T14:28:06Z">faxing Campbell out again</Jump>.
        </p>
      </Entry>
      <Entry title="Triple Nullification" season={24} day={37}>
        <p>
          Season 24 was a mess for every team, and there was no exception for the Firefighters. However, with the Black
          Hole (Black Hole) looming, the Firefighters had opportunities to nullify league rules. On Day 37 against the{" "}
          <Link href="spies">Houston Spies</Link>, the Firefighters helped nullify not just one, but two rules. At
          first, only <Jump time="2021-07-28T04:13:52Z">Stout Schmitt’s Hot Lucky Ring was nullified</Jump> in the
          bottom of the 5th, leading many fans to believe that nothing too eventful would happen in this game. However,
          former Firefighter Paula Mason scored a 10th run for the Spies,{" "}
          <Jump time="2021-07-28T04:17:02Z">nullifying Sum Sun</Jump>. Afterwards, the Spies collected another 10 runs
          to <Jump time="2021-07-28T04:29:20Z">nullify Hype Train</Jump>, leaving the Firefighters victorious with an
          ending score of 1-0 after all the dust settled.
        </p>
        <LineScore id="8d4c1d3e-63df-4ce4-a582-b7f1dda1a7c1" />
      </Entry>
    </History>
  );
}
