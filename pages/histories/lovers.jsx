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
        "e4b98dce-a9aa-4934-b5f0-0b2b35e9f8dd",
        "ee270d5a-5883-472f-a18e-f3bcee7ad5da",
        "d8b6e7e6-ad7f-4220-88de-c8e235f337f1",
        "6808e2ae-a44b-4acc-a904-a8b58faf1705",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Ackasi, Link, Slampy, EDVA, Tillman, Staradavid, and Nell">
      <Entry title="Kichiro Guerra hits for the Cycle" date="Season 3, Day 35" time="2020-08-05T05:01:23Z">
        <p>
          For a terrifying two seasons before the Alternate Reality Decree hit the league, Kichiro Guerra stood at the
          top as the best of the best. Thanks to Bloodlust hitting her in the{" "}
          <Jump election={2}>Season 2 Election</Jump>, Kichiro joined the coveted list of maxed-out batters. She proved
          her worth by becoming the first player to hit for the cycle in a game against the Boston Flowers, with a{" "}
          <Jump time="2020-08-05T05:01:33Z">triple</Jump>, a <Jump time="2020-08-05T05:05:45Z">double</Jump>, a{" "}
          <Jump time="2020-08-05T05:12:37Z">home run</Jump>, and a <Jump time="2020-08-05T05:21:01Z">single</Jump> in{" "}
          <em>four</em> at bats. Though she may no longer have Bloodlust, or even be on the Lovers, Kichiro Guerra still
          stands as one of the most iconic early season players of Blaseball and one of the most iconic Lovers players
          of all time. After the Society for Internet Blaseball Research discovered she was the first player generated
          out of all original 280 Internet League Blaseball players, it only made sense that she had such a tremendous
          record and achievement.
        </p>
      </Entry>
      <Entry title="Cracking the Crabs" season={7} day={109}>
        <p>
          Season 7 was far from a calm season of Blaseball and this was no exception for the Lovers. Making it all the
          way to the playoffs with a 55-44 record, the Lovers had a hard road ahead of them. They faced off against the
          team they tied with in their division, the Breckenridge Jazz Hands, in the Wild League Division Series with
          resounding success, but the real test would be facing the leader of Wild High, and one of the biggest teams to
          beat, in the Wild League Champion Series, the Baltimore Crabs. With notable pitching from the likes of
          Percival Wheeler, Milo Brown, and Parker Meng, the Lovers would win in a harrowing five-game series, sending
          them to the finals against the Mexico City Wild Wings.
        </p>
        <LineScore id="e4b98dce-a9aa-4934-b5f0-0b2b35e9f8dd" />
      </Entry>
      <Entry title="There’s Really No Excuse For This, is There?" season={8} day={16}>
        <p>
          The Chicago Firefighters and San Francisco Lovers made history when Caleb Alvarado and Sandford Garner both
          pitched 9 scoreless innings, resulting in the first instance of a double shutout. Due to the Firefighters
          having Targeted Shame from{" "}
          <Jump season={8} day={15}>
            the previous game
          </Jump>
          , the team started and ended the game with &minus;1 runs and lost, though Caleb paid out for a shutout while
          Sandford did not.
        </p>
        <LineScore id="ee270d5a-5883-472f-a18e-f3bcee7ad5da" />
      </Entry>
      <Entry title="Crowvertime 1" season={9} day={1}>
        <p>
          Bright and early at the start of Season 9, the Lovers and the Jazz Hands witnessed a phenomenon that would
          become a permanent fixture in Lovers lore and their community. At the top of the 12th inning, Alexander Horne
          would step up to the plate only to be <Jump time="2020-10-05T16:30:22Z">ambushed by a flock of crows</Jump>,
          resulting in the third out of the inning. While this would typically end the half inning, what fans saw
          instead was an impressive, if not concerning, feat of 21 plate appearances among the angry flock. The Lovers
          would score 7 runs and gain 16 additional outs before{" "}
          <Jump time="2020-10-05T16:37:06Z">Helga Moreno got caught stealing second base</Jump>, ending the half inning
          and eventually resulting in the Lovers winning the game. Interestingly, no other bird encounters would take
          place for the rest of the season.
        </p>
        <LineScore id="d8b6e7e6-ad7f-4220-88de-c8e235f337f1" />
      </Entry>
      <Entry title="Where’d You Come From?" date="Season 10 Election" time="2020-10-18T19:30:00Z">
        <p>
          At the end of Season 10, with the Shelled One successfully defeated, the PODS’ team was spread across the
          league. Something strange was afoot, though: For one brief moment, the Hawaiʻi Fridays and the San Francisco
          Lovers both had Montgommery Bullock on their roster, the former from winning the People’s Champion Blessing,
          and the latter from the Popular by Association Blessing. However, less than a day later however, time
          untangled and confusion across the league was averted. The San Francisco Lovers welcomed their newest pitcher,
          who was absolutely not a clone of any existing player, Bontgommery Mullock to the roster.
        </p>
      </Entry>
      <Entry title="Elsewhere Job" date="Season 13, Day 9" time="2021-03-09T00:29:20Z">
        <p>
          Don Mitchell, iconic crime boss, was swept into a surge of immateria and sent Elsewhere. Early days in the era
          made Elsewhere nebulous and scary, so it was a relief when Don tapped into his Reverberating modification and
          returned to hit as if nothing happened. After drawing a walk from the Core Mechanics’ bewildered Lizzy Pasta,
          Don proceeded to steal second, third, and then home, before returning Elsewhere. The Elsewhere Job is a
          testament to his resilience and dedication to the team.
        </p>
      </Entry>
      <Entry
        title="Yosh Carpenter Pitches for the San Francisco Lovers and the Hawaiʻi Fridays"
        date="Season 13, Day 79"
        time="2021-03-12T00:01:16Z"
      >
        <p>
          The Lovers, at this point in the era, had no idea what would be in store for them when it came to Feedback
          weather, but this game would mark the start of a new era for the team. Yosh Carpenter, known in the early
          Discipline Era as one of the best pitchers for the team, Feedbacked in the bottom of the 1st inning for
          Gabriel Griffith of the Hawaiʻi Fridays. As a pitcher, Carpenter made it through his first inning as a Friday,
          but instead of Griffith taking the mound, Yosh stayed on inning after inning for both teams. This gambit
          lasted for all nine innings before the Feedback finally settled, cementing Yosh’s place on the Fridays. While
          this was a hard loss for the Lovers, it’s remembered as a harrowing moment for an absolutely beloved player.
          He simply didn’t want to leave his team, and stayed for as long as he could.
        </p>
      </Entry>
      <Entry title="Whoa. We’re Still Playing?" season={16} day={58}>
        <p>
          Lovers fans joined the Millennials in their team’s watch party channel on Discord to commemorate the
          “pitching” “duel” between a fully-chomped Chorby Soul, at this point undefeated in their quest to never win as
          a pitcher, and the misplaced “trying to pitch with a bat” Cannonball Sports. After looping with the Black
          Hole, the Lovers awarded Chorby with their first win. The riots that erupted that night after over 40 minutes
          of play were heard around the league, with Mills fan EDVA coining the collective chant: “Woah. We’re still
          playing? Haha, looks like everyone else finished their games already. That’s so funny. Like, I always seem to
          lose track of time when I’m with you. I wonder why that is? All these innings, stolen bases, drawn walks.
          Makes you think about where you’re gonna be in another few seasons, right? Here we are, just two typical
          Blaseball teams, still on the field, together. I promise not to let it end if you don’t, okay?”
        </p>
      </Entry>
      <Entry title="Theo Eats His Ring" season={20} day={104}>
        <p>
          Theo King, longtime source of Lovers’ enthusiasm and ire, was unboxable and forever destined to be boxed.
          Lovers’ fans tried to put Theo King in the shadows for the entirety of the Expansion Era, and, each time, Theo
          would dodge and weave and survive, being utterly mediocre and contributing very little to the team. Fitting,
          then, that in the Lovers’ run up to their underchampionship, Theo partied twice and then, in a move that to
          this day remains shrouded in mystery, ate the{" "}
          <Jump season={20} day={104} redirect="/item/dead1271-e77b-49bc-b339-f0277039d9cc">
            Charitable Ring of the Famine
          </Jump>{" "}
          that was hurting his performance. It wasn’t enough, though, and the Lovers unwon their way to ungold. This
          moment of data crime embodied Theo’s spirit and the Lovers’ spirit as a whole. In multiple consultations with
          the Society for Internet Blaseball Research, no conclusive evidence could be gathered on what exactly happened
          to King’s ring, and thus, King eating his ring was both the only emotional, and scientific explanation.
        </p>
      </Entry>
      <Entry title="Haven’t We Seen This Before?" season={20} day={115}>
        <p>
          The Expansion Era left a lot of chaos in its wake, and this was no clearer than in Season 20, when the Reader
          introduced the Underbracket with the Under Achiever Decree. After particularly difficult seasons due to player
          Feedback, the Lovers entered the competition to see who could be the biggest loser. Many obstacles faced them,
          like Overperforming and the disappearance and destruction of several detrimental items for their players.
          Despite these difficulties, the league saw a mirror of the Season 7 playoffs, only this time the Lovers
          celebrated their loss against the Mexico City Wild Wings, becoming the ILB’s first underchampion.
        </p>
      </Entry>
      <Entry
        title="The Good Timeline, and Theo King Kills an Ump"
        date="Season 21 Latesiesta"
        time="2021-06-24T15:40:43Z"
      >
        <p>
          As the danger and terror of the Expansion Era ratcheted up to monumentous levels, the Lovers refused to go
          down without a fight. With the risk of Redaction and Incineration in abundance, several members of the Lovers
          elected to go on a massive campaign to collect support for four gift shop items. This campaign was successful,
          with large contributions coming from the Seattle Garages, the Boston Flowers, and the Atlantis Georgias. In
          this collective effort, the Lovers put the Fireproof Modification, Soul Patches, and the replicas of Uncle
          Plasma and Liquid Friend on their wishlist.
        </p>
        <p>
          These gifts would have immediate positive ramifications for the Lovers: Recovering formerly Redacted Kurt
          Crueller’s soul from 0, a resounding defense from Liquid Friend IV and Uncle Plasma IV and, most momentously,
          on <Jump time="2021-06-24T20:06:21Z">Day 76</Jump>, Theo King became the first Lover to incinerate an umpire
          due to his Fireproof modification. Lovers fans, while reflecting on this season, realized that, had the
          support campaign not been successful, many of their players would have suffered a far worse fate. The relief
          this season held for the team wouldn’t be realized until after the dust settled on the Expansion Era, but it
          was treasured nonetheless.
        </p>
      </Entry>
      <Entry title="Crowvertime 2" season={24} day={38}>
        <p>
          Fans of the Discipline Era fondly remembered Season 9’s Crowvertime, but the Expansion Era ended with a
          Crowvertime to rival it. This regular season game against the Philly Pies served as the record holder for the
          longest ILB game in Beta at a whopping 88 minutes and 12 seconds on the material plane. Lored as a collective
          effort of the bird-loving Lovers and new pitcher Reece Saetang to hold up the end of the world in the safest
          way they could, this matchup would ring home something the Lovers knew well after their underchampionship in
          Season 20: Sometimes, being bad at Blaseball led to the best outcome.
        </p>
        <p>
          The game was tied 9-9 after{" "}
          <Jump time="2021-07-28T05:25:41Z">a late homer drew favor from the Equal Sun</Jump>, sending the game to extra
          innings. It was a heated duel between a Lovers lineup that could not hit and a Pies lineup that was literally
          not allowed to hit, due to their Avoidance Modification. After walking them home twice over,{" "}
          <Jump time="2021-07-28T05:42:47Z">the Lovers again tied the game</Jump>, 11-11. And that’s how the score sat,
          until <Jump time="2021-07-28T06:15:15Z">the 25th inning</Jump>, when again, the Lovers pitching squad,
          pitching at a group of hitters literally not allowed to swing at the ball, walked in three more runners. This
          game would catapult the Lovers into having the most birds in the league, ending with 1086 birds at the end of
          this game.
        </p>
        <LineScore id="6808e2ae-a44b-4acc-a904-a8b58faf1705" />
      </Entry>
    </History>
  );
}
