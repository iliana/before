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
        "ae567408-7cb0-4523-aa86-9a12c1fa063c",
        "823dfcb6-dddb-43f4-90ff-eac05827a82e",
        "f8f24fdc-4f2f-4e29-8f89-2840db510852",
        "cb8d4ef9-1b5e-4b57-9170-9217020509a8",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Nix">
      <Entry date="Season 13, Day 79" title="Oh, Applesauce." time="2021-03-12T00:22:00Z">
        <p>
          While Ruffian Applesauce wasn’t the Core Mechanics’ first Incineration, they were an early fan favorite due to
          their home run-centric stat line, pitching potential, and the fact that their name was Ruffian Applesauce.
          Their Incineration in the Mechanics’ first week of play shook up the new team’s fans considerably and was an
          important moment in the developing team culture.
        </p>
      </Entry>
      <Entry election={15} title="Pitch Perfect">
        <p>
          Zoey Kirchner was one of the best natural pitching rolls of all time. Shirai McElroy was a talented future
          star from <Link href="moist-talkers">Canada</Link>. Mindy Kugel was a batter from <Link href="worms">Ohio</Link> with an eye on the mound. Jolene Willowtree was a
          1.7-star pitcher who was on their way to becoming one of the best in the league. They would become one of the
          most consistent rotations in the ILB, an all-star cast with nowhere to go but up.
        </p>
        <p>
          They would reign supreme for only one season. <Jump election={16}>A season later</Jump>, Kirchner was sent to
          <Link href="steaks">Dallas</Link> and <Jump season={20}>would return</Jump> to a rotation with room for only three pitchers. A season
          after Kirchner left, Kugel <Jump time="2021-04-19T17:17:51Z">Reverbed to the lineup</Jump> and Alternated{" "}
          <Jump election={21}>four seasons later</Jump>. Pitch Perfect would never take the Mechanics to a championship;
          in{" "}
          <Jump redirect="/standings" time="2021-05-15T23:00:00Z">
            Season 18
          </Jump>
          , Jaylen Hotdogfingers took Kirchner’s place, and they were still in Dallas in{" "}
          <Jump redirect="/standings" time="2021-06-20T00:00:00Z">
            Season 20
          </Jump>
          , but Pitch Perfect would remain an ideal to which the team always looked back.
        </p>
      </Entry>
      <Entry season={16} day={36} title="Willowtree on Island Time">
        <p>
          This game holds the record for the longest regular-season game by innings in Beta. It was a sign of the
          pitching power that would define the Mechanics, as well as Jolene Willowtree’s growth towards becoming one of
          the best pitchers in the league and one of the most iconic Mechanics players.
        </p>
        <LineScore id="ae567408-7cb0-4523-aa86-9a12c1fa063c" />
      </Entry>
      <Entry date="Season 17, Day 3" title="Kelvin Drumfill" time="2021-04-19T17:17:51Z">
        <p>
          The Mechanics were already in for a rocky season, having traded a 6-star pitcher for a PolkaDot Patterson who
          could <Jump election={16}>no longer throw the ball</Jump>. Bottles Suljak was a solid batter on a team with few batters who could be
          called good, while Mindy Kugel was a staple of the pitching rotation. The Reverb swapped them, while bringing
          Kelvin Drumsolo back up to bat right after they stole second. This cemented the team’s sink to the bottom of
          the league.
        </p>
      </Entry>
      <Entry date="Season 18, Day 84" title="Kelvin Andante Caught for Fax Evasion" time="2021-05-14T05:22:08Z">
        <p>
          The Mechanics <em>just</em> managed to keep themselves qualified for the playoffs, despite one-third of their
          rotation being one of Season 18’s worst pitchers in the league: serial fax-evader Kelvin Andante. Andante
          would spend the entire season refusing to give up 10 runs when it counted, only to finally take a bow on Day
          84 to allow star pitcher Jolene Willowtree to finally take the mound once again.
        </p>
      </Entry>
      <Entry season={18} day={116} title="Fourth and First Win">
        <p>
          In the season that{" "}
          <Jump redirect="/offseason" season={18} day={1}>
            Turntables was on the ballot
          </Jump>
          , the Mechanics would prove their worth by rising up like a phoenix to win the championship. After placing{" "}
          <Jump redirect="/standings" time="2021-04-23T19:40:00Z">
            last in the league in Season 17
          </Jump>{" "}
          and spending most of Season 18 with one-third of the rotation ignoring everyone begging them to leave, the
          Mechanics managed to claw their way into qualifying. They swept the <Link href="pies">Philly Pies</Link>, favorites to win, due in
          equal parts to <Jump time="2021-05-15T05:16:21Z">Nerd Pacheco’s Superallergic reaction</Jump> and the
          Mechanics’ consistent lineup and rotation. They would go on to have tight games in the finals, with neither
          the <Link href="flowers">Flowers’</Link> nor the Mechanics’ pitchers throwing outside the strike zone if they could help it. Jolene
          Willowtree proved their worth on Day 116 by <Jump time="2021-05-15T22:06:03Z">giving up only one run</Jump>.
        </p>
        <LineScore id="823dfcb6-dddb-43f4-90ff-eac05827a82e" />
      </Entry>
      <Entry season={19} day={64} title="Kelvin Drumsolo Performs a Drum Solo">
        <p>
          Kelvin Drumsolo was one of the weakest batters on the Mechanics, who were building a powerfully consistent
          small-ball lineup. Over the course of Season 19, the Mechanics would see their lineup drastically reduced by
          Flooding, culminating on Day 64 when <Jump time="2021-05-20T07:08:43Z">Bees Taswell</Jump> and{" "}
          <Jump time="2021-05-20T07:18:37Z">Drumsolo</Jump> were swept Elsewhere, leaving Gia Holbrook as the only
          player on the lineup. Drumsolo would make <Jump time="2021-05-20T07:33:14Z">a triumphant return</Jump>,
          doubling the size of the lineup, only for Holbrook to be swept away in{" "}
          <Jump time="2021-05-20T07:44:50Z">the bottom of the 9th</Jump>. Drumsolo was left to play the next four games
          alone, winning{" "}
          <Jump season={19} day={65}>
            every
          </Jump>{" "}
          <Jump season={19} day={66}>
            single
          </Jump>{" "}
          <Jump season={19} day={67}>
            one
          </Jump>{" "}
          <Jump season={19} day={68}>
            of them
          </Jump>
          .
        </p>
        <LineScore id="f8f24fdc-4f2f-4e29-8f89-2840db510852" />
        {/* Build function scroll through linescores of all 5  drumsolo games */}
      </Entry>
      <Entry date="Season 20, Day 107" title="Winnie Hess’ Tactical Gurgies" time="2021-06-19T04:21:29Z">
        <p>
          Terrifyingly powerful <Link href="breath-mints">Breath Mints</Link> pitcher Winnie Hess drained some of Gia Holbrook’s defensive ability. This
          would usually be pretty bad if it weren’t for the Mechanics’ Maintenance Mode, which gave the team the Fourth
          Out. Hess siphoned Holbrook in the top of the 9th, giving the Mechanics only one inning with four outs.
        </p>
        <p>
          Adelaide Judochop would come in after the third out and score a run, bringing the score to 2-0. The Mints would
          then score 1 run in the bottom of the 9th which would have, if it weren’t for the Fourth Out, tied the score.
          While the Fourth Strike was then removed, it got the team past one of the most significant hurdles between
          them and{" "}
          <Jump redirect="/standings" time="2021-06-19T23:35:00Z">
            a fifth championship
          </Jump>
          .
        </p>
        <LineScore id="cb8d4ef9-1b5e-4b57-9170-9217020509a8" />
      </Entry>
      <Entry election={20} title="The Zo-Yo">
        <p>
          Season 20 was when the Mechanics first encountered the echoes of the Shelled One. In the first game they
          played against Kirchner since the <Link href="steaks">Steaks</Link> removed them from the shadows,{" "}
          <Jump time="2021-06-15T14:00:53Z">they swallowed a stray peanut</Jump>. Moments later,{" "}
          <Jump time="2021-06-15T14:02:04Z">Kelvin Drumsolo was Shelled</Jump>. However, the Mechanics would live up to
          their “We Can Fix This” motto and saw Kirchner’s allergic reaction not as a tragedy, but as an opportunity.
          They were now in Equivalent Exchange range without the team giving up some of their better players.
        </p>
        <p>
          The Mechanics decided that they weren’t willing to give up any players, though, and instead set themselves to
          an unprecedented feat of strategic coordination. Over 90% of votes were on target, with the majority cast to
          Exchange Shirai McElroy for Zoey Kirchner and the rest cast to Move McElroy back into the team’s shadows. The
          plan went perfectly, Kirchner was returned, and the team flew higher than ever before.
        </p>
      </Entry>
      <Entry season={21} day={104} title="Alto Leaves a Voicemail">
        <p>
          In the bottom of the 7th, Kelvin Drumsolo hit a single and then stole second base, only to be{" "}
          <Jump time="2021-06-26T02:16:38Z">swept Elsewhere</Jump> by a surge of immateria. The Fridays then shut out
          the Mechanics and PolkaDot Patterson, the best batter in the shadows,{" "}
          <Jump time="2021-06-26T02:22:19Z">got voicemailed</Jump> for a still-Elsewhere Drumsolo, the team’s worst
          batter. “Alto” Patterson was an Alternate of an iconic pitcher from the Discipline Era, and was an easy fan
          favorite. They would only play one game with the Mechanics, failing to get on base all game, only to be
          Exchanged in <Jump election={21}>the Election</Jump>.
        </p>
      </Entry>
      <Entry election={21} title="The Mechanics Have Their Hands Full">
        <p>
          The Handful Alternate Trust Blessing left four staples of the lineup &mdash; Cannonball Sports, Gia Bolbrook,
          Mira Lemma, and Christian Combs &mdash; unable to play small ball. The team would go from one of the strongest
          in the ILB to one that struggled to keep up, with formerly disastrous batter Kelvin Drumsolo Infused to become
          one of the stronger batters on the roster. Former stars like Cannonball Sports were stranded on the lineup
          when they were now far more suited to pitching.
        </p>
      </Entry>
      <Entry date="Season 22 Latesiesta" title="Wish List" time="2021-07-01T17:45:00Z">
        <p>
          The Mechanics received several Replicas from the Gift Shop in an attempt to protect their players from another
          Election like <Jump election={21}>Season 21’s</Jump>. This would inspire some heartbreaking lore about Replica Cote Loveless III and Adelaide Judochop. It would
          also prove futile, as Judochop still became a Subtractor, turning her Magnification from a blessing into a
          curse.
        </p>
      </Entry>
      <Entry
        date="Season 23, The Semi-Centennial"
        title="Adelaide Judochop Fills the Stables"
        time="2021-07-25T03:22:13Z"
      >
        <p>
          Mechanics batter Adelaide Judochop had a strong small-ball statline since{" "}
          <Jump time="2021-03-12T00:22:00Z">their first day on the team</Jump>. They also had some untried talent as a
          pitcher, and the Semi-Centennial would test that. Judochop had a remarkable, if somewhat implausible, -42.75
          ERA after becoming the first and only player to activate Stables. Their Magnification meant that{" "}
          <Jump time="2021-07-25T03:21:02Z">a double from Liquid Friend</Jump>,{" "}
          <Jump time="2021-07-25T03:21:17Z">a walk from Valentine Games</Jump>, and{" "}
          <Jump time="2021-07-25T03:22:03Z">a home run from Aldon Cashmoney</Jump>, all on the final out of the inning,
          brought the Vault Legends from 19 runs to 25. Nicholas Mora and Gunther O’Brian on the Rising Stars were
          Stabled, as were Nagomi Mcdaniel, Chorby Soul, and their Replicas on the Vault Legends.
        </p>
      </Entry>
      <Entry season={24} day={24} title="Niq Nyong’o Beans the Mechs">
        <p>
          Due to the Pillars building several Coffee&nbsp;+ renovations, the weather was Coffee 3s. Bees Taswell, an original
          Mechanic who was one of the few strong batters left and <Jump election={22}>recently Infused</Jump>, was hit
          by a pitch in <Jump time="2021-07-27T14:09:35Z">the bottom of the 3rd</Jump> and{" "}
          <Jump redirect="/player/2f85d731-81ed-4a07-9e01-e93f1786a366" time="2021-07-27T14:45:00Z">
            Redacted at the end of play
          </Jump>
          . Christian Combs, one of the batters who carried the Mechanics to their Season 18 victory, was hit in{" "}
          <Jump time="2021-07-27T14:16:22Z">the bottom of the 6th</Jump> and{" "}
          <Jump redirect="/player/9ac2e7c5-5a34-4738-98d8-9f917bc6d119" time="2021-07-27T17:40:00Z">
            disappeared a few days later
          </Jump>
          . Neither of them returned before the end of Beta.
        </p>
      </Entry>
    </History>
  );
}
