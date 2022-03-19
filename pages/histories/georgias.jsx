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
        "4ab7b980-e377-46ec-9815-1f6c6e7c3b28",
        "0495f4c6-dc82-40ea-9201-45976ab049d9",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Jasmine, Daekie, and Ari">
      <Entry season={13} day={31} title="Rigby Day">
        <p>
          During the Georgias’ first season of active play, fans watched in terror as star pitcher Rigby Friedrich stood
          toe-to-toe with the Boston Flowers for eighteen innings <i>in a Solar Eclipse</i>. Fans begged Friedrich to
          throw the game, worried about losing a fan favorite in their first season of play, but he wouldn’t listen,
          letting the game drag on and on until the Georgias won. While, ultimately, this game had no casualties, it
          taught the Georgias a very important lesson: Rigby Friedrich would stop at absolutely nothing if it meant he
          could win.
        </p>
        <LineScore id="4ab7b980-e377-46ec-9815-1f6c6e7c3b28" />
      </Entry>
      <Entry date="Season 16, Day 54" title="The FlatteReverb" time="2021-04-14T23:16:00Z">
        <p>
          Flattery McKinley had a storied history on the Georgias. Starting as a bad player with few redeemable
          qualities, McKinley was a quick target for Alternation in one of the Georgias’ first Election. This did make
          her better&hellip; at <i>batting</i>, which was unfortunate as McKinley was in the rotation at the time and,
          against all odds, even worse at pitching now. For the next few seasons, the Georgias were desperate to move
          McKinley to the lineup, something they finally achieved in the{" "}
          <Jump redirect="/offseason" time="2021-04-11T18:30:00Z">
            Season 15 Election
          </Jump>
          &hellip; but only for a moment. Watch in terror, as seasons of Election progress are erased in the blink of an
          eye!
        </p>
      </Entry>
      <Entry date="Season 17, Day 54" title="Alighieri’s Inferno" time="2021-04-21T21:23:04Z">
        <p>
          After the Incineration of Stijn Strongbody{" "}
          <Jump time="2021-04-21T11:03:31Z" team="c73b705c-40ad-4633-a6ed-d357ee2e2bcf">
            earlier in Season 17
          </Jump>
          , the Georgias were the only team left in the league that had a player Incineration, despite witnessing the
          Unstable <Jump time="2021-04-19T15:20:54Z">Chorby Soul</Jump> and{" "}
          <Jump time="2021-04-19T16:18:25Z">Luis Acevedo</Jump>’s Incinerations on Season 17, Days 1 and 2,
          respectively. That luck wouldn’t hold out for long; on Day 54, the Georgias suffered their first Incineration,
          their star batter Hercules Alighieri. For the second season in a row, tragedy struck on Day 54, cementing it
          as an eternally cursed day for the Georgias. Alongside Alighieri’s Incineration, the middle of Season 17
          featured team captain Niq Nyong’o <Jump time="2021-04-21T18:20:18Z">getting swept Elsewhere</Jump> and star
          pitcher Rigby Friedrich <Jump time="2021-04-22T09:08:43Z">suffering an allergic reaction</Jump>, making it
          triply cursed.
        </p>
      </Entry>
      <Entry date="Season 17 Election" title="Triple Trade" redirect="/offseason" time="2021-04-25T18:15:00Z">
        <p>
          While Georgias fans quickly became attached to their original roster, there was always talk of which players
          on other teams would fit in best in Atlantis. A perpetual candidate was “Hot”{" "}
          <Jump redirect="/player/d89da2d2-674c-4b85-8959-a4bd406f760a" time="2021-04-25T18:15:00Z">
            Fish Summer
          </Jump>
          , one of the league’s star batters with a very thematically appropriate name. In this Election, it finally
          happened: the Georgias got to enjoy a Hot Fish Summer&hellip; for ten Election results. The Georgias managed
          to Exchange Summer for a brief moment, sending Montgomery Bullock from Baltimore, before the Crabs Exchanged
          him for Wyatt Mason IV, resulting in a three-way trade that was bad for every team involved. Welcome aboard,
          Ivy!
        </p>
      </Entry>
      <Entry season={19} day={14} title="Undersea Polarity">
        <p>
          Undersea was well-known by the Georgias to be a cruel joke of a Modification, always failing to make up for
          the Georgias’ otherwise middling performance. As the Expansion Era dragged on, however, Undersea went from
          being barely useful to actively detrimental. More often than not, it dug the Georgias into even bigger ditches
          as one unrun turned into many, many more. When Polarity weather was introduced in Season 19, the Georgias got
          to play in its debut game, and it was a sight to behold.
        </p>
        <LineScore id="0495f4c6-dc82-40ea-9201-45976ab049d9" />
      </Entry>
      <Entry date="Season 19, Day 71" title="Superallergy Fraud" time="2021-05-20T14:02:29Z">
        <p>
          After witnessing <Jump time="2021-05-15T05:16:21Z">Nerd Pacheco’s Superallergic reaction</Jump> in Season 18,
          it was clear that no player should ever endure that. In Season 19,{" "}
          <Jump redirect="/player/691f9ab2-9dd4-42e8-bf95-9fd01253c801" season={19} day={71}>
            Wyatt Mason IV
          </Jump>{" "}
          asked a very important question: What if you could just&hellip; simply decide not to? Ivy Echoed their
          recently Unshelled teammate Flattery McKinley, copied <i>her</i> Superallergic Modification, and dumped it
          and, therefore <i>their own</i> Superallergic Modification, when they{" "}
          <Jump time="2021-05-20T14:03:24Z">Echoed Slosh Truk</Jump>, leaving them with{" "}
          <Jump redirect="/player/691f9ab2-9dd4-42e8-bf95-9fd01253c801" time="2021-05-20T14:04:30Z">
            just a normal peanut allergy
          </Jump>
          . Fans started calling this sort of behavior “Echo Fraud.”
        </p>
      </Entry>
      <Entry date="Season 20, Day 48" title="Niq Nyong’o Gets Trapped in the Sun" time="2021-06-16T15:21:58Z">
        <p>
          Going into Season 20, the Georgias’ vibes weren’t great. After a rough Election with a double Will wimdy,
          followed by a Feedback swap that sent away long-time favorite Jan Canberra, the last thing fans wanted to see
          was the Incineration of another beloved original Georgia. Niq Nyong’o was a cornerstone of Georgias lore as
          the team’s captain and reality anchor, and the simulation proved it doesn’t care about what fans want to see.
        </p>
      </Entry>
      <Entry date="Season 21, Day 82" title="Five For Five" time="2021-06-25T02:13:33Z">
        <p>
          What would happen if a player was Unstable and Fireproof at the same time? Violence, that’s what! As part of
          the Georgias’ campaign to reach{" "}
          <Jump redirect="/_before/www.blaseball2.com/" time="2021-06-25T02:13:33Z">
            Cactus Land
          </Jump>
          , the Georgias wish listed a Chorby Soul Replica from the Gift Shop. Combined with a temporary teamwide
          Fireproof Modification, this made every Eclipse game for the rest of the season a blast to watch. In a moment
          of catharsis for the team after the previous season, Chorby Soul V killed three Rogue Umpires in{" "}
          <i>under a minute</i>. On <Jump time="2021-06-25T19:13:51Z">Day 98</Jump>, they killed two more! Five for
          Five, baby!
        </p>
      </Entry>
      <Entry date="Season 21 Election" title="The Clove Gambit" redirect="/offseason" time="2021-06-27T18:15:00Z">
        <p>
          After{" "}
          <Jump redirect="/depth" time="2021-06-24T20:00:30Z">
            reaching Cactus Land
          </Jump>{" "}
          utilizing a quirk of eDensity&#8212; with the team Modification Light-Handed, all items Georgias players held
          had negative eDensity, including the{" "}
          <Jump redirect="/item/04749f19-e782-40e2-9077-e79baa6236f6" season={21} day={99}>
            Chorby’s Soul
          </Jump>{" "}
          held by Chorby Soul Replicas &#8212;the Georgias were rather interested in staying there. After all, Blaseball
          0 was safe from Consumers and gave teams a funny little purple circle on the Depth Chart. Luckily enough,
          Flowers player Gloria Bugsnax stole a Chorby’s Soul from a Replica and, with the Georgias planning on
          shadowing player Clove Ji-Eun the same season, the gambit was clear: Take Bugsnax’s Chorby’s Soul, give it to
          Ji-Eun, and claim a place in the heavens free from sharks&hellip; <i>forever</i>. What a stroke of luck that
          it worked!
        </p>
        <p>
          Or, rather, it worked until the Phantom Thieves’ Guild was ratified during{" "}
          <Jump time="2021-07-01T17:45:00Z">Season 22’s Latesiesta</Jump>, and it was immediately stolen{" "}
          <Jump time="2021-07-01T18:25:39Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            a day later
          </Jump>
          . At least the Georgias tried.
        </p>
      </Entry>
      <Entry date="Season 22, Day 45" title="Flattery and the Fifth Base">
        <p>
          Throughout Season 22, the Georgias struggled with the Fifth Base being placed in the Bubble. On{" "}
          <Jump time="2021-06-29T05:11:56Z">Day 15</Jump>, Georgias batter Sosa Hayes picked up the Fifth Base, Super
          Roamed on{" "}
          <Jump redirect="/player/b7267aba-6114-4d53-a519-bf6c99f4e3a9" time="2021-06-29T08:40:00Z">
            Day 18
          </Jump>{" "}
          to the Miami Dale, and then <i>put the Fifth Base back in the Bubble</i> on{" "}
          <Jump time="2021-06-29T10:13:17Z">Day 20</Jump>, inspiring Flattery McKinley to try their hand at it. They
          picked up the Fifth Base and put it down not <Jump time="2021-06-30T12:27:36Z">once</Jump>, but{" "}
          <Jump time="2021-06-30T12:32:12Z">
            <i>twice</i>
          </Jump>
          , the latter at the very end of the 9th inning. As this was the end of the week, if McKinley was holding the
          Fifth Base at the game’s end, they would’ve Super Roamed away from the team.
        </p>
      </Entry>
      <Entry season={22} day={103} title="Georgias Good?!">
        <p>
          In Season 22, the Georgias had an epiphany: What if, instead of being bad, they decided to be good for a
          change? Georgias fans watched in awe as, in a surprising turn of events, the team somehow reached the top of
          the Wild League with a 78-win record that cemented their first-ever appearance in the Overbracket. The
          tomfoolery commenced. In the first game of the Internet Series, the Georgias were <i>so</i> good that they
          looped the Lift with the Black Hole, giving the Lift a 2-win lead and cementing the Georgias’ downfall. The
          Georgias hubris cycle quickly progressed from “Georgias good!” to “same as it ever was.”
        </p>
      </Entry>
      <Entry date="Season 23, Day 47" title="Hi Siobhan! Bye Siobhan!" time="2021-05-17T16:06:23Z">
        <p>
          Siobhan Chark had a storied history with Feedback. An original member of the Georgias, they Feedbacked with
          Sosa Hayes of the Houston Spies on <Jump time="2021-05-17T16:06:23Z">Season 19, Day 2</Jump> and then to the
          Hellmouth Sunbeams on{" "}
          <Jump time="2021-05-19T08:22:10Z" team="9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            Day 41
          </Jump>
          , matching a record for non-Flickering Feedbacks in a season that was set in Season 7. This wasn’t enough for
          the sim; on{" "}
          <Jump time="2021-06-18T10:21:01Z" team="f02aeae2-5e6a-4098-9842-02d2273f25c7">
            Season 20, Day 90
          </Jump>
          , Chark picked up Flickering Socks, and rejoined the Houston Spies{" "}
          <Jump time="2021-06-21T19:31:43Z" team="9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            shortly after
          </Jump>
          . She was on the Spies long enough to <Jump time="2021-07-02T02:23:48Z">enter the shadows</Jump>, then
          voicemailed out on{" "}
          <Jump time="2021-07-21T13:23:41Z" team="9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            Season 23, Day 46
          </Jump>{" "}
          and proceeded to <i>undo</i> the <i>original</i> Feedback from Season 19 with Hayes, coming back to the
          Georgias.
        </p>
        <p>
          This time in Atlantis didn’t last. Chark would Feedback two more times during Season 23, on Days{" "}
          <Jump time="2021-07-23T03:17:24Z">83</Jump> and <Jump time="2021-07-23T15:19:21Z">95</Jump>, respectively,
          ending up on the Breckenridge Jazz Hands, where she finished the Expansion Era.
        </p>
      </Entry>
      <Entry date="Season 23, Day 97" title="Neerie McCloud Returned from Elsewhere!" time="2021-07-23T17:04:27Z">
        <p>
          Although Neerie McCloud was a big fan favorite on the original Georgias roster, she was swept Elsewhere before
          even a full season of play on <Jump time="2021-03-12T05:25:00Z">Season 13, Day 84</Jump>, and was later
          shadowed in a wimdy during the{" "}
          <Jump redirect="/offseason" time="2021-03-14T19:15:00Z">
            Season 13 Election
          </Jump>{" "}
          in exchange for capable batter Slosh Truk. Never quite good enough to be pulled out, she sat there for a long
          time.
        </p>
        <p>
          To her advantage, a wimdied Shadow Infuse in the{" "}
          <Jump redirect="/offseason" time="2021-05-23T18:15:00Z">
            Season 19 Election
          </Jump>{" "}
          and the Shots in the Dark Blessing in the{" "}
          <Jump redirect="/offseason" time="2021-06-20T18:15:00Z">
            Season 20 Election
          </Jump>{" "}
          left McCloud first in line for Voicemail. On <Jump time="2021-07-23T12:24:27Z">Season 23, Day 92</Jump>, she
          replaced Lachlan Shelton on the lineup. On Day 97, she <i>finally</i> made her triumphant return from
          Elsewhere after 133 days and over ten seasons, a record likely, and hopefully, to never be matched.
        </p>
      </Entry>
      <Entry date="Season 24, Day 16" title="Ghost Redaction" time="2021-07-27T06:10:45Z">
        {/*
        as per original document:

        If this event is not eligible for Georgias Moments due to not actually involving the Georgias, the event below can be subbed in instead!
      */}
        <p>
          Georgias fans didn’t help bring Niq Nyong’o back from the Hall to not watch her play on her new team, the
          Philly Pies. With Observation Debt, Niq Nyong’o beaned Dimi Blather, a dead player on the Maryland Squirrels,
          while they were <Jump time="2021-07-27T06:10:40Z">inhabiting the Haunted Kennedy Loser</Jump>. Blather was
          then Redacted and removed from the Squirrels’ lineup upon{" "}
          <Jump time="2021-07-27T06:11:10Z">entering the Secret Base</Jump>. Sometimes, the sim stitched together a
          highly unlikely series of events to create a truly hilarious moment.
        </p>
      </Entry>
      <Entry season={24} day={28} title="Reunion Special">
        <p>
          In the{" "}
          <Jump redirect="/offseason" time="2021-07-25T18:15:00Z">
            Season 23 Election
          </Jump>
          , the Georgias finally got just what they wanted: They managed to bring Niq Nyong’o back from the dead, and
          they made it the rest of the league’s problem. The Georgias got treated to one last reunion special, where
          they got to play a game against Nyong’o in Philly. It was like the whole gang was back together, except for
          Mint Shupe and Siobhan Chark and Hercules Alighieri and Gita Biscuits and Erin Jesaulenko and Ankle Halifax
          and all the other Georgias who were lost along the way. Maybe Randy Dennis{" "}
          <Jump time="2021-07-27T19:28:32Z">got beaned</Jump>, but they made it out of the week fine, so it was okay! It
          was fine! Everything was fine.
        </p>
      </Entry>
    </History>
  );
}
