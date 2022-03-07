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
        "e83806f4-1d8c-4c61-815a-884f31bfd9a9",
        "477f451a-7bc0-4c4d-887d-a3e2d057569c",
        "bbf1b3d0-de4a-4248-a67f-5ec69378bc43",
        "9298a48f-c2fc-4821-9466-1ecacfd35a56",
        "50d1d815-1b16-45bc-a1fb-6b357736c13a",
        "78d3a18f-c368-41b8-bff6-d4e1304dcc87",
        "613ef50b-ef18-47d2-acbf-fcd8c6515a7c",
        "d1daa9db-b7c2-4352-b993-da1505684bda",
        "a193f2f0-0fe7-423b-9387-da91626dffd5",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Sour, King Solomon, deafhobbit, and the Orion System">
      <Entry title="Where Were You When Comfort Septemberish Stole Home?" season={2} day={104}>
        {" "}
        {/* https://reblase.sibr.dev/game/e83806f4-1d8c-4c61-815a-884f31bfd9a9#9d34dc97-5259-4053-1088-7469096c3f50 */}
        <p>
          On the precipice of elimination from the divisional series, the Jazz Hands would see their luck turn around
          when Comfort Septemberish stole home in the bottom of the 9th, opening the door for Aldon Cashmoney to deliver
          a two-run home run death blow to the Tigers. This knocked the Tigers out of contention so hard it got into the
          Blaseball Beat. Jazz Hands fans still ask to this day, “Where were you when Comfort Septemberish stole home?”
        </p>
        <LineScore id="e83806f4-1d8c-4c61-815a-884f31bfd9a9" />
      </Entry>
      <Entry title="The First Jazzbeams Double Incineration" season={3} day={23}>
        <p>
          It was an eclipse game like any other, at first. The sun had gone out and there was always a chance someone
          was going to go out in flames, but it seemed standard at first. When Jazz Hands player Ogden Mendoza burned
          {/* https://reblase.sibr.dev/game/03a06d29-68d2-48b8-af2f-f6e6b7de4c5f#3137a8c2-3b31-32ce-e9f7-d18d9afb5dcf */}
          , fans thought that had to be the end of it. Then Velasquez Meadows of the Sunbeams was incinerated too
          {/* https://reblase.sibr.dev/game/03a06d29-68d2-48b8-af2f-f6e6b7de4c5f#bfaf08dc-a5c4-7ef7-4b7b-a237e774951b */}
          , the first instance of multiple players incinerated in the same game and the first Jazzbeams to die together.
          The first Jazzbeams double Incineration would not be the last, however, and would hover over both teams for
          many seasons to come.
        </p>
      </Entry>
      <Entry title="Lowe Tames the Tigers" season={5} day={102}>
        <p>
          The Tigers were on a hot streak. They had just won back-to-back championships and were potentially on track
          for their third and the Ascension that came with it. The only thing standing in their way was Jazz Hands
          pitcher Lowe Forbes, at the time possessing only a single pitching star. If the Jazz Hands lost this game,
          they’d be up against the Tigers’ best pitchers. Against all odds, Lowe held the Tigers to 2 runs, with the
          Tigers ultimately losing 2-10 and cementing Lowe Forbes as one of the Jazz Hands pitchers of all time.
        </p>
        <LineScore id="477f451a-7bc0-4c4d-887d-a3e2d057569c" />
      </Entry>
      <Entry title="August Sky vs. PolkaDot Patterson" season={5} day={106}>
        <p>
          August Sky was an ace for the Jazz Hands, but she was up against 5-star PolkaDot Patterson. August and the
          team would go on not only to hold on, but to do so for a then-record 23 innings. Ultimately, the Jazz Hands
          would lose this game, but before they did, the entire league was held hostage by an absurd-for-the-time
          pitcher’s duel.
        </p>
        <LineScore id="bbf1b3d0-de4a-4248-a67f-5ec69378bc43" />
      </Entry>
      <Entry title="Declan Suzanne Eats a Peanut, Causes a Win Anyway" season={5} day={112}>
        {" "}
        {/* https://reblase.sibr.dev/game/9298a48f-c2fc-4821-9466-1ecacfd35a56#df1e3178-9876-ead6-9211-49ca53cbe764 */}
        <p>
          Season 5’s postseason was going great for the Jazz Hands. They had tamed the Tigers, thrown a 23-inning game
          against PolkaDot Patterson, and now were one win away from their first championship. The score was tied up and
          it looked like the Jazz Hands had a chance to win it all.
        </p>
        <p>
          Firefighters batter Declan Suzanne then ate a peanut and had an allergic reaction. Declan ended up reaching
          first on a fielder’s choice despite this, pushing Justice Spoon home and winning the game for the
          Firefighters. The Jazz Hands would ultimately lose their first and only Internet Series to the Firefighters.
        </p>
        <LineScore id="9298a48f-c2fc-4821-9466-1ecacfd35a56" />
      </Entry>
      <Entry title="No Eyes Eleven Hearts Can’t Lose" season={6} day={95}>
        <p>
          Day 95 marked the final game of Campos Arias’ undefeated 19-0 season. Such a feat likely never would have
          happened if Campos wasn’t alternated during the Season 4 election, which tripled her pitching stars and helped
          round out the Jazz Hands’ rotation.
        </p>
        <LineScore id="50d1d815-1b16-45bc-a1fb-6b357736c13a" />
      </Entry>
      <Entry title="The Burke/Pothos Showdown" season={12} day={66}>
        <p>
          When two of the best pitchers in the league go head-to-head, fans take notice. But they weren’t ready for the
          ridiculous pitcher duel that the Jazz Hands and Wild Wings would get caught up in as Wyatt Pothos and Burke
          Gonzales faced off. A 0-0 tie going into extras was fairly predictable, but things only got weirder from
          there.
        </p>
        <p>
          From the 10th inning onwards, a Baby Doyle double was the only hit
          {/* https://reblase.sibr.dev/game/78d3a18f-c368-41b8-bff6-d4e1304dcc87#3428ba94-d38b-2509-118f-438e1755cb48 */}{" "}
          for 10 more innings. That’s it. The game goes for an absurd 21 innings, until the deadlock is broken by the
          most unlikely of Conrad Vaughan homers
          {/* https://reblase.sibr.dev/game/78d3a18f-c368-41b8-bff6-d4e1304dcc87#09cf4a91-fea3-68bb-65e6-865b823aafa5 */}
          . Pothos held on for one more inning to seal the deal for the Jazz Hands.
        </p>
        <LineScore id="78d3a18f-c368-41b8-bff6-d4e1304dcc87" />
      </Entry>
      <Entry title="Combs Estes and the Thursday Blues" season={13} day={98}>
        <p>
          Season 13 had been unkind to the Jazz Hands, and to Combs Estes in particular. A devastating Reverb shuffled
          the entire roster
          {/* https://reblase.sibr.dev/game/05bc5a39-f72d-44db-9867-b799e01c2f76#d0627b9e-21e5-6d45-c2c0-705b32a7748b */}
          , allergic reactions decimated stat lines, and Blooddrain added insult to injury. Combs had gone from a
          4.5-star pitcher to a 0-star batter two games from a rest.
        </p>
        <p>
          Day 98 was an Eclipse game against the Sunbeams. Combs was incinerated
          {/* https://reblase.sibr.dev/game/ed28e440-672c-4893-8acb-688007e5144c#77bb33da-ac47-3928-1bb8-14b6a8e2a24b */}
          , Sunbeams player Sutton Bishop following close behind
          {/* https://reblase.sibr.dev/game/ed28e440-672c-4893-8acb-688007e5144c#885a62d0-cc77-b263-dc12-264d4f808cd9 */}
          , the second Jazzbeams to die together. Dubbed “The Thursday Blues” by fans, this unfortunate season taught
          fans that The Tower Always Looms, an important lesson that they would come to fear and embrace.
        </p>
      </Entry>
      <Entry title="Lowe Forbes Good???" season={15} day={79}>
        <p>
          Lowe Forbes was never the best Jazz Hands player. However, they were a far better pitcher than batter. After
          the devastating Season 13 Reverb, Lowe was a batter, and not a very good one. For one game, however, Lowe was
          on fire, with a triple
          {/* https://reblase.sibr.dev/game/613ef50b-ef18-47d2-acbf-fcd8c6515a7c#237440e9-eebc-ac50-04cd-5d7ede3edcd9 */}
          , a sac bunt
          {/* https://reblase.sibr.dev/game/613ef50b-ef18-47d2-acbf-fcd8c6515a7c#5472fe10-ae1f-ecb5-e0ef-4b92839c47f3 */}
          , a 3-run home run
          {/* https://reblase.sibr.dev/game/613ef50b-ef18-47d2-acbf-fcd8c6515a7c#7eeeb370-eb22-86a1-9d92-28a25042837e */}
          , a single
          {/* https://reblase.sibr.dev/game/613ef50b-ef18-47d2-acbf-fcd8c6515a7c#4bf59e26-275b-48b9-7521-ebdc24dcd658 */}
          , and a walk
          {/* https://reblase.sibr.dev/game/613ef50b-ef18-47d2-acbf-fcd8c6515a7c#25c10fcc-9038-f7c0-1590-b87d0d297837 */}
          . This was the play of a competent batter, one that knew how to hit a blaseball with a bat, which was a task
          Lowe struggled with otherwise. For this one game, Lowe was a competent batter. Lowe’s surprising plays
          markedly contributed to that game’s 12-4 defeat of the Atlantis Georgias.
        </p>
        <LineScore id="613ef50b-ef18-47d2-acbf-fcd8c6515a7c" />
      </Entry>
      <Entry title="Le Gring" season={16} day={14}>
        {" "}
        {/* https://reblase.sibr.dev/game/5591a72d-aad2-4cf6-b659-dd50be63f1e4#a625f532-e96b-04da-3579-49a61a357fd2 */}
        <p>
          The very first item to ever be granted to a player from Glitter weather was a Leg Ring, given to Walton
          Sports. This, understandably, put the Jazz Hands’ perfectly normal man and team dad into the spotlight for a
          bit. The Leg Ring and it’s rather silly name became an immediate joke with Jazz Hands fans, who figured Walton
          probably thought it was French or something in confusion and called “Le Gring.” The item would be associated
          with Walton for most of the rest of the era, despite dropping it for the Cape of Containment in Season 18’s
          election{/* S18 election results */}.
        </p>
      </Entry>
      <Entry title="Hype Builds in The Pocket!" season={19} day={1}>
        <p>
          Hype Train was broken. It gave too much of an advantage to the home team, it didn’t decay in its inaugural
          season, and, overall, it interacted in really funny ways with the coinciding Turntables.
        </p>
        <p>And the Jazz Hands loved it, likely benefitting from it the most.</p>
        <LineScore id="d1daa9db-b7c2-4352-b993-da1505684bda" />
        <p>
          The Jazz Hands ended the season with a 50-7 home record and an 8-37 away record. The unstoppable Jazz Hands
          Hype Train started right out of the gate on Day 1 and didn’t stop, even as it drove the team to -55 Wins.
        </p>
      </Entry>
      <Entry title="The Firewall" season={21} day={22}>
        {" "}
        {/* https://reblase.sibr.dev/game/bd21d34f-d3ac-4492-b400-934b18b51fec#2ca530a1-bc6c-c801-6fcd-9a287888a732 */}
        <p>
          Silvaire Roadhouse’s Instability-causing Debt and Eclipse weather were a bad mix. The Jazz Hands had gotten
          lucky; Silvaire’s first flyout had been caught by a Fire Eater
          {/* https://reblase.sibr.dev/game/bd21d34f-d3ac-4492-b400-934b18b51fec#552b3e8b-b608-a46e-d25b-f60087b420d1 */}
          , but that luck was going to run out if someone didn’t do something.
        </p>
        <p>
          In the bottom of the 8th, Silvaire stepped up to plate and Riley Firewall stepped onto the mound. Riley has
          thrown a shutout up to this point, and it’d be easy to keep it going. Riley has a legacy to uphold as The
          Firewall, however, as he was preceded by beloved Fire Protector Raúl Leal. Four balls. Silvaire walks. No one
          dies. The Firewall holds.
        </p>
      </Entry>
      <Entry title="Melonconomy" season={23} day={1}>
        <p>
          For a very brief moment in Season 23, Collins Melon was the economy. On Day 1, they stole 12 bases while only
          having 4 hits in the entire game.
        </p>
        <LineScore id="a193f2f0-0fe7-423b-9387-da91626dffd5" />
        <p>
          This one game was the culmination of Collins Melon becoming ridiculously big after an Infuse in Season 14
          {/* S14 election results */} and a number of parties, while somehow flying under the radar until the Reader
          removed their Alternate modification{/* S16 Earlsiesta */}. Once they were noticed, fans leaguewide went “why
          does Collins Melon have 25 stars?”
        </p>
        <p>
          Previously a <Spoiler>Spy</Spoiler>, Jazz Hands fans gave them the moniker “Agent M” while they flew under the
          league’s radar, seemingly no one outside of Breckenridge noticing they had more stars than contemporaries
          Castillo Turner and Winnie Hess. This was the perfect start to the end of the Era of Melon, their final season
          in the ILB, as well: Disrupt the economy, refuse to elaborate, and then leave.
        </p>
      </Entry>
      <Entry title="LCD Soundsystem Fraud" season={23} day={95}>
        <p>
          During the Season 23 Latesiesta, Spears Rogers received a Fliickerrriiing Potion from the Gift Shop. During
          the Feedback game on Day 95, Spears switched places with Famous Owens
          {/* https://reblase.sibr.dev/game/66aca6fd-ed0d-4124-97d6-82aeadcadc97#f6a15532-3d3e-fd97-5e25-def34ce11cfc */}
          , resulting in the Tigers’ roster becoming entirely Ship of Theseused, losing their last original player. The
          panic of Jazz Hands fans and the despair of the Tigers fans, watching together on Discord, led to both teams
          being allowed to swear without filtration.
        </p>
        <p>
          As if hearing the fans’ profanity-laden cries, Spears stepped up for one final at-bat, with two outs on the
          board. Strike, looking. Strike, looking. Spears Rogers and Famous Owens swapped places in the Feedback at that
          moment
          {/* https://reblase.sibr.dev/game/66aca6fd-ed0d-4124-97d6-82aeadcadc97#52a493d3-2512-6771-70c8-4c168c9d8193 */}
          . Famous struck out looking and the game ended. The Tigers’ last original player returned. Since The Pocket
          had an LCD Soundsystem, the dramatic duo even received two boosts as their teams swore at them. Appreciate the
          hustle.
        </p>
      </Entry>
      <Entry title="They Faxed a Baby" season={24} day={5}>
        {" "}
        {/* https://reblase.sibr.dev/game/04a1107a-7531-436b-8302-1cb508314496#2ae78877-37f9-5c1b-c31a-f3db224c33a4 */}
        <p>
          The ILB Semi-Centennial was kind of a Big Deal. The Jazz Hands’ very own Baby Doyle played for the Rising
          Stars and, unlike Collins Melon, returned. However, Baby did not return as a batter, but as a pitcher. Baby
          cannot pitch. In their first game on the mound, while Perked in Coffee weather, the Magnified Baby Doyle was
          faxed after 5 ⅔ innings after allowing 12 runs. 10 of those runs were from the rival Baby, the Magnified
          Triumphant, the rival Baby. Doyle did not pitch again and, luckily, Voicemailed back onto the lineup on Day 14
          {/* https://reblase.sibr.dev/game/b0bbea6c-34c8-4c9d-bad6-3d44c0440cd2#3def9abf-07d3-ed0e-2eff-87a6a01f5dc8 */}
          .
        </p>
      </Entry>
    </History>
  );
}
