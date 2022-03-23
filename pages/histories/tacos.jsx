import Link from "next/link";
import { Coin } from "../../components/being";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "3ae0ced8-a816-488a-b0be-0491d20a28d9",
        "a238e10f-df74-4ee8-a5c5-60dc5b35c734",
        "11a8a7d3-460b-4c99-a98a-b0bd1f577073",
        "d6c7de35-0994-46e7-991a-618d23f03b10",
        "63ca9690-30b6-43ec-a30b-8fc344c59f9b",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="DDDragoni, Deejay, Hen, Cliff, Jellorain, and Dune">
      <Entry date="Season 3, Day 73" title="The Grand Unslam" time="2020-08-06T20:52:54Z">
        <p>
          In the top of the 15th inning, the <Link href="shoe-thieves">Charleston Shoe Thieves</Link> already scored 3
          runs, putting them in the lead with the bases loaded. Lee Davenport tried to close the inning out, but Morrow
          Doyle hit a grand slam, giving the Thieves a practically insurmountable lead. The Tacos came up to bat, but
          things were looking bad, there was pretty much no way&mdash;
        </p>
        <p>
          In the top of the 15th inning, the Charleston Shoe Thieves already scored 3 runs, putting them in the lead
          with the bases loaded. Lee Davenport tried to close the inning out, but&mdash;
        </p>
        <p>
          <b>502 BAD GATEWAY</b>
        </p>
        <p>
          The Grand Unslam was a fun glitch, but fans didn’t expect it to be more than that. Then the{" "}
          <Jump election={3}>Season 3 Election</Jump> results came in. “The Grand Unslam weakened the Bridge. Spacetime
          Tears over Los Angeles. The Infinite cit(ies) shine.” The Los Angeles Tacos became the Unlimited Tacos.
        </p>
        <p>
          That wasn’t the only change that Election: the Tacos had also won two Blessings: Anticapitalism and
          Exploratory Surgeries, the latter of which Alternated their three worst pitchers. A player named Wyatt Mason
          was Alternated each time. Prior to the Election, fans knew there to be a single Wyatt Mason, a pitcher. After
          wondering if the Blessing somehow hit Mason, fans discovered that every player on the Tacos was now named
          Wyatt Mason, an event later dubbed the Wyatt Masoning. It was only after the Unmasoning, where fans helped
          Interim-Intern Commissioner Parker MacMillan III correct the roster’s names via Twitter, when fans realized
          that the Blessing <em>did</em> hit the same player, Wyatt Glover, formerly Comfort Glover, all three times.
        </p>
        <p>
          The events surrounding becoming Unlimited were probably the most fundamental events in Tacos team culture. It
          gave fans an identity, and the story and unique name attracted a large portion of the team’s early fans. NaN,
          created when MacMillan III tried to Unmason Wyatt Mason, quickly became a fan favorite and a core of the team.
          It also gave the team a unique footprint on the league: with{" "}
          <Jump redirect="/player/c0177f76-67fc-4316-b650-894159dede45" season={24} day={1}>
            two
          </Jump>{" "}
          <Jump redirect="/player/afc90398-b891-4cdf-9dea-af8a3a79d793" season={24} day={1}>
            exceptions
          </Jump>
          , every player named Wyatt or Mason was once a Taco.
        </p>
      </Entry>
      <Entry season={4} day={99} title="The Chillover">
        <p>
          During an objectively terrible Tacos season, Blaseball experienced its first ever Spillover. The game was a
          grand total of 24 innings and 65 minutes long, breaking two league records to become the longest game in
          Blaseball history. This record was eventually broken, and fans now know how a Spillover works but, at the
          time, it was a new and enjoyable discovery that didn’t actually give fans any information about Spillovers.
        </p>
        <p>
          It was a fitting end to a season when the Tacos were trying their hardest to suck and the{" "}
          <Link href="flowers">Boston Flowers</Link> faced two <Jump time="2020-08-27T02:01:38Z">devastating</Jump>{" "}
          <Jump time="2020-08-29T06:10:27Z">Incinerations</Jump>. The two teams joined together to dub the event “The
          Chillover” or “The Protest Picnic.” For both teams, it was a memorable ending to the season, and built
          camaraderie between the two teams that would continue to grow in Season 6 and onwards, when the Tacos and
          Flowers would both end up in the newly-formed Wild Low.
        </p>
        <LineScore id="3ae0ced8-a816-488a-b0be-0491d20a28d9" />
      </Entry>
      <Entry date="Season 5, Day 78" title="Party Time Speedrun" redirect="/standings" time="2020-09-03T21:35:00Z">
        <p>
          For much of the Discipline Era, the Tacos were so bad that fans considered them statistical outliers.
          Unfortunate Blessings, a half-dozen allergic reactions, and unfavorable Feedbacks weakened them to the point
          where some individual players had more stars than the rest of the team.
        </p>
        <p>
          Fans decided to embrace it. While most teams would race to the top, they would race to the bottom, striving to
          be mathematically eliminated from playoff contention and reach Party Time faster than any team had before. In
          Season 5, they were successful, reaching Party Time on Day 78 to raucous applause and confusion. The Tacos
          maintained their reputation as the Bad Team for quite a while, which was instrumental in performing the
          Snackrifice.
        </p>
      </Entry>
      <Entry date="Season 7, Day 99" title="The Snackrifice" redirect="/leaderboard" time="2020-09-18T20:55:00Z">
        <p>
          Angry at the gods for not winning any decent Blessings for several seasons, tired of cheering on games that
          the team consistently lost, and in defiance of the Shelled One barking red text at the league, Tacos fans
          decided to strike back and attempt to break the game. Noting that players above the Idol Board’s red line{" "}
          <Jump redirect="/leaderboard" time="2020-09-11T18:55:00Z">
            last season
          </Jump>{" "}
          were Shelled, Tacos fans started a week-long campaign to get all of the Tacos’ pitchers Shelled. This started
          the legendary “Tacoganda Machine,” where fans created and shared memes, propaganda, and instructional graphics
          to organize other Blaseball fans into manipulating the Idol Board to achieve the unexpected.
        </p>
        <p>
          At the end of the season, all five Tacos pitchers &mdash; Francisca Sasquatch, Alejandro Leaf, Patel Beyonce,
          Sexton Wheerer and Wyatt Pothos &mdash; were Shelled, leaving the team wondering what would happen on Season
          8’s opening day. This led to the birth of Pitching Machine, a tired Tacoganda Machine and leadership staff,
          and an influx of excited new fans looking to help with more hijinks.
        </p>
        <p>
          A couple seasons later, this led to unexpected consequences. On{" "}
          <Jump time="2020-10-11T02:23:32Z">Season 9, Day X</Jump>, all Shelled players were forcibly recruited to THE
          SHELLED ONE’S PODS. This, of course, included quite a few Tacos: Four of the five that had been Snackrificed
          were still Shelled, community darling Wyatt Quitter, who was Shelled by random Peanut weather, and the
          blood-hungry Pitching Machine. This devastated the Tacos fanbase. They experienced the consequences of their
          own actions, but not for the last time.
        </p>
      </Entry>
      <Entry
        date="Season 8, Day 47"
        title={
          <>
            Sexton Wheerer, the Pitching Machine <br className="tw-hidden lg:tw-inline" />
            (Except Not That One, It’s in a Peanut Shell Right Now)
          </>
        }
      >
        <p>
          Following the Snackrifice, the Tacos were graced by the ILB with a Pitching Machine, who immediately became
          both a league darling and one of the biggest money makers of the league. While Pitching Machine reeled in
          winning games and huge pendant cashouts, the streak could only last so long. On Day 47, a little over halfway
          through the season, Sexton Wheerer became the Unshelled Snackrificed Taco and rejoined the pitching rotation.
          Now Pitching Machine was only playing every other game while Wheerer, an objectively bad pitcher, brought some
          humility back to the team by reminding fans that, while they now had a robot on the team, it didn’t mean they
          didn’t still suck.
        </p>
        <p>
          This duo lasted until the end of the season when Pitching Machine,{" "}
          <Jump redirect="/leaderboard" time="2020-09-25T18:55:00Z">
            at the top of the Idol Board
          </Jump>
          , was Shelled for being just too dang good at Blaseball. Wheerer, who was not good enough to be in danger of
          yet another Shelling, became the only pitcher for the Tacos. This remained true for the entirety of Seasons 9
          and 10, for a grand total of 202 games in a row played solo. Wheerer was not given respite until{" "}
          <Jump time="2020-10-19T17:01:07Z">Season 11</Jump>, and was not given a break from pitching at all until the{" "}
          <Jump election={14}>Season 14 Election</Jump>, when he was sent to the shadows for a much needed rest.
        </p>
      </Entry>
      <Entry date="Season 8, Day 99" title="NaN Becomes a Receiver" redirect="/leaderboard" time="2020-09-25T18:55:00Z">
        <p>
          During Season 8, three microphone icons appeared on the Idol Board, in addition to the ominous red line. Fans
          knew what the red line meant, and speculated that the three microphones would require three players linked to
          the original Wyatt Mason. Tacos fans, already tired from their recent Idol Board exploits in Season 7, were
          once again called upon to have their players used as pioneers.
        </p>
        <p>
          A compromise was made, and NaN was selected as the only Taco put forth, joining Sixpack Dogwalker and Jaylen
          Hotdogfingers. NaN and Dogwalker became Receivers, their pre-game rituals now connected to the Microphone,
          held by the original Wyatt Mason. All three players also started Flickering. In Season 9, Taco fans knew that
          this may be their last season with NaN and prepared to say goodbye before their long journey. Their journey
          started in <Link href="spies">Houston</Link>, Feedbacking with Valentine Games on{" "}
          <Jump time="2020-10-05T21:17:54Z">Season 9, Day 6</Jump>, and led to NaN tying with{" "}
          <Jump redirect="/player/38a1e7ce-64ed-433d-b29c-becc4720caa1" season={24} day={95}>
            two
          </Jump>{" "}
          <Jump redirect="/player/defbc540-a36d-460b-afd8-07da2375ee63" season={24} day={95}>
            other
          </Jump>{" "}
          Blaseball players for joining the most teams.
        </p>
      </Entry>
      <Entry season={11} day={36} title="Taco Tuesday">
        <p>
          In Season 11, the Unlimited Tacos were playing the <Link href="dale">Miami Dale</Link> under Sun 2 weather,
          with Peanut Bong facing off against former Tacos pitcher Wyatt Owens. The Tacos’ offense was on fire,
          activating <Jump time="2020-10-21T04:18:16Z">Sun 2</Jump> <Jump time="2020-10-21T04:27:14Z">twice</Jump> and{" "}
          <Jump time="2020-10-21T04:33:58Z">ending the 9th inning</Jump> with a score of 3-3, taking the game to extra
          innings. The Tacos scored <Jump time="2020-10-21T04:35:04Z">two</Jump>{" "}
          <Jump time="2020-10-21T04:35:26Z">runs</Jump> in the top of the 10th, and Bong{" "}
          <Jump time="2020-10-21T04:36:57Z">gave up 2 runs</Jump> in the bottom of the 10th, re-tying the game. Both
          teams <Jump time="2020-10-21T04:40:34Z">scored</Jump> <Jump time="2020-10-21T04:42:05Z">again</Jump> in the
          11th, bringing the score to 6-6 when, in the 12th, the Tacos started another rally. They scored 9 runs in all,{" "}
          <Jump time="2020-10-21T04:44:51Z">activating Sun 2 a third time</Jump>, but came just one run short of retying
          the game. In all, the Tacos scored an astounding 35 runs and lost to the Dale, who scored 6.
        </p>
        <LineScore id="a238e10f-df74-4ee8-a5c5-60dc5b35c734" />
        <p>
          Tacos fans went wild and declared this game “Taco Tuesday,” gaining a longstanding affection for both scoring
          lots of runs and Sun 2, leading to multiple Sun 2-related Blessings and renovations. It also gave Peanut Bong
          a reputation as a somewhat crafty planner, giving up precisely the number of runs needed to keep the game
          going.
        </p>
      </Entry>
      <Entry date="Season 13, Day 99" title="Coin Said Peanut Bong" time="2021-03-12T21:00:18Z">
        <p>
          In Season 13, fans were very suspicious of the newly-introduced MVP system. After discussion of a second
          Snackrifice was discarded, some Tacos fans hatched a plan: Idolize a bunch of bad players from the shadows to
          try and protect the league’s best and most beloved players, potentially sabotaging whatever superteam fans
          suspected would form from them. After conferring with the rest of the league, a roster was put together:{" "}
          <Jump redirect="/player/9820f2c5-f9da-4a07-b610-c2dd7bee2ef6" season={13} day={99}>
            Peanut Bong
          </Jump>{" "}
          from the Tacos,{" "}
          <Jump Dominic Woman>
            Dominic Woman
          </Jump>{" "}
          from the <Link href="tigers">Tigers</Link>,{" "}
          <Jump redirect="/player/ac5e4ce2-de6f-408b-9910-a52bb1d1a978" season={13} day={99}>
            Yams Rolsenthal
          </Jump>{" "}
          from the <Link href="jazz-hands">Jazz Hands</Link>,{" "}
          <Jump redirect="/player/1f145436-b25d-49b9-a1e3-2d3c91626211" season={13} day={99}>
            Joe Voorhees
          </Jump>{" "}
          from the <Link href="sunbeams">Sunbeams</Link>, and{" "}
          <Jump redirect="/player/89c8f6bf-94a2-4e56-8412-bdb0182509a9" season={13} day={99}>
            Concrete Mandible
          </Jump>{" "}
          from the <Link href="lift">Lift</Link>. This effort, combined with the <Link href="magic">Magic’s</Link> plan
          to honor Sutton Picklestein after <Jump time="2021-03-09T04:12:29Z">their death</Jump>, formed the “Dom Wom
          Joe Bong Yams Con (with extra Pickles).” The effort was only partially successful, with only two of the
          players becoming MVPs, but led to the single most important event in all of Blaseball: The Coin said{" "}
          <Coin quoted>Peanut Bong</Coin>.
        </p>
      </Entry>
      <Entry season={13} day={111} title="Caleb Alvarado">
        <p>
          The LA Unlimited Tacos never won a playoff game against <Link href="firefighters">Chicago Firefighters</Link>{" "}
          pitcher Caleb Alvarado. They faced Alvarado on three separate playoff occasions. In Season 13, a day after{" "}
          <Jump season={13} day={110}>
            the Tacos’ first postseason win ever
          </Jump>
          , Los Angeli lost its second game to Chicago before making a comeback to advance to{" "}
          <Jump season={13} day={114}>
            their first-ever Internet Series appearance
          </Jump>
          . In Season 16, the Tacos{" "}
          <Jump season={16} day={103}>
            lost their first playoff game
          </Jump>{" "}
          to Alvarado after being favored to win.
        </p>
        <p>
          With this history in fans’ minds, Posteason 17 seemed grim, as{" "}
          <Jump season={17} day={102}>
            their first game
          </Jump>{" "}
          was once again against the Chicago Firefighters and starting pitcher Caleb Alverado. The Tacos lost this game
          they were favorites to win, but it was the only loss in their postseason run. The Tacos scored 12 runs off of
          Gabriel Griffith in the next game, accounting for more than a quarter of the runs scored against Griffith in
          the regular season. Alvarado became somewhat of a memetic nemesis for the Tacos fanbase after this.
        </p>
      </Entry>
      <Entry date="Season 15, Day 14" title="The Incineration of Nicholas Vincent" time="2021-04-06T04:10:12Z">
        <p>
          Nicholas “NV/Envy” Vincent was called up to the Tacos’ lineup in the{" "}
          <Jump election={13}>Season 13 Election</Jump>, swapping with ground out-happy Vito Kravitz. Vincent’s debut
          was eagerly anticipated by many fans and, upon arrival, they didn’t disappoint. They put up a strong season
          with the potential to become a star with some parties or Infusions. It wasn’t just their performance that
          endeared them to fans, either. Fans quickly developed a lovingly crafted backstory, created in collaboration
          with the <Link href="sunbeams">Sunbeams</Link>, and a sizable gallery of fanart. Then, tragedy struck.
        </p>
        <p>
          14 days into their sophomore season on the team, Nicholas Vincent was Incinerated. They hit one last homer,
          and then they were nothing but smoke on the breeze. Vincent’s Incineration left a considerable void, both in
          the team’s performance and their culture, and fans still mourn them to this day.
        </p>
      </Entry>
      <Entry date="Season 15, Day 74" title="Rat Batson’s Solo Home Run Season" time="2021-04-08T18:04:53Z">
        <p>
          Rat Batson was not a popular player. It had replaced Nicholas Vincent, a beloved and skilled player, after
          their Incineration, and had a name very similar to the Tacos’ own Rat Mason, in a way some felt was a mockery
          of the Tacos’ propensity for repeating names. It didn’t help that Batson was very bad at batting; it almost
          never swung at pitches, leading to jokes that it just stood at the plate without a bat. The only thing it
          could do semi-reliably was draw walks. It even had a negative RBI at times, having batted in -0.2 runs as of
          Day 29 and -1.1 runs as of Day 65, due to Coffee 3s.
        </p>
        <p>
          But, on Day 74 of its one and only season on the lineup, Rat Batson hit a home run off of Rivers Clembons, a
          very good pitcher that, by all accounts, should have struck it out. A minor event in the grand scheme of
          things &mdash; it didn’t even change the outcome of the game &mdash; but a major turning point in Batson’s
          reception, and almost a microcosm of the Tacos’ history. It was a reminder that even the underdoggiest of
          underdogs can have their moment.
        </p>
      </Entry>
      <Entry
        date="Season 17, Day 14"
        title="The Shelling of Felix Garbage and Basilio Fig by the Scorned Alejandro Leaf"
        time="2021-04-20T04:13:22Z"
      >
        <p>
          Exactly two seasons after Nicholas Vincent’s death, Yummy Elliott took the mound to face the{" "}
          <Link href="lift">Tokyo Lift</Link>, with starting pitcher Alejandro Leaf. Leaf, a former Taco who left the
          team in the aftermath of the Snackrifice, was Honey-Roasted and pitching in Peanut Weather. Aly tasted the
          infinite, Shelling fellow former teammate Felix Garbage, who joined the Tacos in the previous election, and{" "}
          <Jump time="2021-04-20T04:19:39Z">Basilio Fig</Jump>, who was commonly lored to be flora-based, like Leaf.
        </p>
        <p>
          This game led to the Tacos’ lineup of six players decreasing to only the four remaining original Los Angeles
          Tacos left: Mcdowell Mason, Basilio Mason, Rat Mason, and Sexton Wheerer. Shortly after this event, pitcher
          Wyatt “Ivy” Mason IV <Jump time="2021-04-20T11:21:17Z">Echoed their Shelled teammate</Jump>, further reducing
          the active roster to six total players.
        </p>
      </Entry>
      <Entry season={17} day={114} title="The Tacos Win">
        <p>
          Once known as the Worst Team, the Tacos made it to the Internet Series twice in the early Expansion Era. They
          were swept both times, by the <Link href="crabs">Crabs</Link> in Season 13 and the{" "}
          <Link href="moist-talkers">Moist Talkers</Link> in Season 14. After early playoff losses in the next few
          seasons, the Tacos were ready to make another run at it in Season 17. Due to some Shellings early in the
          season, they entered the finals with a truncated team of only six players. Mcdowell Mason, Rat Mason, Basilio
          Mason, and Sexton Wheerer crewed the lineup, all of whom were original Tacos from the Return of Blaseball, and
          still marked by the Wyatt Masoning. Yummy Elliot led the rotation, the Season 12 rookie who was emblematic of
          their rise through the Expansion Era, followed by Vito Kravitz, oft-maligned but with a new niche in pitching.
        </p>
        <p>
          The Tacos entered the playoffs as the Wild League’s first seed and, after a brief stumble, proved to be nearly
          unstoppable. They{" "}
          <Jump season={17} day={105}>
            beat the Firefighters
          </Jump>{" "}
          3-1,{" "}
          <Jump season={17} day={109}>
            swept the Dale
          </Jump>{" "}
          in three games, and faced off against the <Link href="fridays">Hawaiʻi Fridays</Link> in the Internet Series,
          with two former Tacos on their roster, Baldwin Breadwinner and Valentine Games. The Tacos won the first two
          games handily, but the third was a close contest, coming down to a tie in{" "}
          <Jump time="2021-04-24T22:23:53Z">the bottom of the 9th</Jump>, at 1-1, with 1 out, Basilio Mason at bat, and
          Sexton Wheerer on third. This was the perfect setup for a championship-winning sacrifice fly.
        </p>
        <p>
          Then Wheerer <Jump time="2021-04-24T22:24:14Z">got caught stealing home</Jump> like a dingus. In the next
          inning, McDowell <Jump time="2021-04-24T22:26:39Z">reached third</Jump>, Rat{" "}
          <Jump time="2021-04-24T22:27:04Z">hit a sacrifice bunt</Jump>, and the Fridays were Shamed. The LA Unlimited
          Tacos won the Internet Series. They started from the bottom, the worst team in Season 1 and at risk of
          Relegation, and over 16 long seasons of struggle, Snackrifice, and parties, they finally made it to the top.
        </p>
        <LineScore id="11a8a7d3-460b-4c99-a98a-b0bd1f577073" />
      </Entry>
      <Entry season={20} day={3} title="Sickos">
        <p>
          In the <Jump election={19}>Season 19 Election</Jump>, the Tacos won the Underhanded Blessing, and the
          Modification landed on Michelle Sportsman, their newest pitcher. Sportsman was the perfect pitcher to become
          Underhanded: Home runs were her biggest weakness as a pitcher, and now, with any home runs she allowed
          becoming unruns, they were her biggest strength. Her first game proved this, with the Tacos defeating the
          Flowers 4-&minus;1.
        </p>
        <LineScore id="d6c7de35-0994-46e7-991a-618d23f03b10" />
        <p>
          Sportsman went on to achieve the league’s first-ever negative ERA of -0.20 that season, and Tacos fans adopted{" "}
          <i>The Onion</i>’s “Sickos” comic as a memetic celebration of the sheer mathematical criminality that
          Underhanded brought to the table. Fans’ opinion of Underhanded would sour over time as it spread across the
          league but, for the time being, Tacos fans reveled in it.
        </p>
      </Entry>
      <Entry
        date="Season 22, Day 9"
        title="5 Runs Scored: The Incineration of Goobie Ballson"
        time="2021-06-28T23:05:54Z"
      >
        <p>
          The Heat Magnet was first offered as a ballpark renovation in{" "}
          <Jump time="2021-03-16T17:50:00Z">Season 14</Jump>, promising to “absorb heat from an Incineration and pass it
          on to the Thermal Converter.” Curious about what that meant, but dreading the death that would activate it,
          Tacos fans waited with nervous anticipation. And waited. And waited.
        </p>
        <p>
          Goobie Ballson joined the Tacos in the <Jump election={21}>Season 21 Election</Jump>, Exchanged by the{" "}
          <Link href="georgias">Georgias</Link> for Fish Summer, who had themself joined the team in a complicated 3-way
          trade a few season earlier. Ballson was a well-known and popular player, especially with the{" "}
          <Link href="firefighters">Chicago Firefighters</Link>, their original team, though there were jokes about them
          secretly being responsible for several unfortunate events throughout the league. With Ballson on the team,
          fans were excited to be a part of this player’s storied history. Then, on Season 22, Day 9, Ballson was
          Incinerated, barely 24 hours after they joined the team. Amidst the shock and confusion, there was some
          excitement mixed in; this was the first time a player was Incinerated in a ballpark with a Heat Magnet. What
          would it do? Would it ensure Ballson’s replacement was strong? Would it give the team a powerful new effect?
          What was worth the life of a beloved player?
        </p>
        <LineScore id="63ca9690-30b6-43ec-a30b-8fc344c59f9b" />
        <p>
          Five runs. The Heat Magnet gave five runs. It didn’t even make a difference in the outcome of the game. As
          fans everywhere mourned the loss of Ballson, “Five Runs Scored” became a meme amongst Tacos fans as a
          shorthand to express their nihilistic emotional overload upon witnessing the long-anticipated results of this
          ballpark renovation, and a general way to express that things may not turn out as planned.
        </p>
      </Entry>
    </History>
  );
}
