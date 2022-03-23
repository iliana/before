import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "0a5ad466-78c6-4139-a1f5-b479b9e29c29",
        "0cab391d-f1e4-4d69-95a4-19b130b4aff5",
        "0e40f4e6-2a42-4c9d-91d1-5b0932d6c369",
        "15bf627b-96d8-4cab-8567-a8fadc04ce6e",
        "1f7026c9-1da6-4a4c-b8b8-f417a34af030",
        "3d0853ff-3f06-4478-b568-e7a6cd54b63d",
        "5efd94fd-875f-423e-a47f-cc464d5684e6",
        "607d7829-966e-4f2c-882b-d49066040cc2",
        "65879dec-e15e-4c67-a32d-1cd6bca8294a",
        "73523330-bff4-463f-a2b8-2ebe60dc06e5",
        "c35c2ad0-c403-41f8-8394-549b8a4654f8",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="tc">
      <Entry title="A Rivalry Intensifies" season={3} day={57} time="2020-08-06T04:07:15Z">
        <p>
          In all of splorting history, there have been few rivalries as fierce or as storied as the one between the
          Kansas City Breath Mints and the <Link href="shoe-thieves">Charleston Shoe Thieves</Link>
          <span className="tw-whitespace-nowrap">
            .
            <sup className="tw-font-sans">
              [<em>citation&nbsp;needed</em>]
            </sup>
          </span>{" "}
          Season 3, Day 57 was an early chapter in the rivalry, where the Mints were not doing too well up to then. The
          Shoe Thieves had star pitcher Matteo Prestige on the mound, and already had a 6-3 lead over the Mints in the
          bottom of the 2nd. It seemed like the Mints would be on the losing end of this bout when a cruel twist struck:
          a Rogue Umpire Incinerated Prestige, replacing them with Gunther O’Brian. At the time of their birth, O’Brian
          was a 0-star pitcher with pathetically bad stats, quickly turning the tides of the game into an offensive
          shootout, with both pitchers giving up run after run.
        </p>
        <LineScore id="1f7026c9-1da6-4a4c-b8b8-f417a34af030" />
        <p>
          By the bottom of the 9th inning, the game was tied 16-16, but O’Brian was unable to hang on, giving up five
          runs and being Shamed into a final score of Breath Mints 21, Shoe Thieves 16. This game was notable being the
          highest scoring game for many seasons, at least for as long as scoring in Blaseball was logical. Mints fans
          remember O’Brian’s first game as a chaotic chapter in the rivalry and, over time, as he improved from
          Blessings, a yummy reaction, and parties into a worthy adversary, Gunther O’Brian became a fixture of the
          rivalry.
        </p>
      </Entry>
      <Entry title="The Rise of the Death Mints" season={5} day={99}>
        <p>
          As the race for the postseason neared its end, it looked like the Breath Mints had a chance to finally clinch
          their first playoff appearance. Going into the final day of the regular season, the Breath Mints were tied
          with the <Link href="steaks">Dallas Steaks</Link>, both with a record of 50-48, and both vying for the Good
          League’s final playoff spot. To even have a chance to get into the postseason, the Mints had to win their
          final game against the <Link href="flowers">Boston Flowers</Link>. The game was a nailbiter that went to 11
          innings but, in the end, the Mints triumphed, Shaming the Flowers with a final score of Breath Mints 7,
          Flowers 6.
        </p>
        <LineScore id="65879dec-e15e-4c67-a32d-1cd6bca8294a" />
        <p>
          Unfortunately by that point, the Steaks had already won their game against Breckenridge Jazz Hands, meaning
          the Mints and Steaks were tied with the same record of 51-48. At this point, Divine Favor was not yet listed
          on the site and wasn’t widely known, but the Steaks’ was better, and the Mints were eliminated from postseason
          contention once again, this time as the first team to be eliminated by tiebreaker. The Mints fanbase decided
          to cope with these events by rebranding themselves as the Death Mints, and being mildly edgy, declaring they
          would exact their revenge and the like. The Breath Mints would take their revenge on the Steaks in Season 15
          by <Jump time="2021-04-09T19:45:00Z">knocking them out of postseason contention by tiebreaker</Jump>.
        </p>
      </Entry>
      <Entry title="The First Beaning" season={7} day={5}>
        <p>
          In the <Jump election={6}>Season 6 Election</Jump>, Jaylen Hotdogfingers was resurrected and Debted, and it
          was kind of a big deal? Her first game pitching that season was against the Breath Mints. In the 2nd inning,{" "}
          <Jump time="2020-09-14T20:04:26Z">Jaylen hit Mints batter Dickerson Morse with a pitch</Jump>, making him
          Unstable. At the time, fans had no idea what Unstable did; there was no description given to the Modification,
          and fans were all very scared.
        </p>
        <p>
          Mints pitcher and walk queen Leach Ingram agreed that Unstable was scary and should be avoided, and her
          strategy to avoid her teammates getting beaned by Jaylen was to just let the other team score as many runs as
          they wanted. Jaylen beaned two more Mints batters during the game,{" "}
          <Jump time="2020-09-14T20:11:11Z">Stew Briggs</Jump> and{" "}
          <Jump time="2020-09-14T20:34:17Z">Marquez Clark</Jump>, but Ingram’s strategy caused the game to easily end in
          9 innings, with the <Link href="garages">Garages</Link> winning 20-1.
        </p>
        <p>
          This game was complete chaos to watch live, and only became scarier when fans’ fears about Instability were
          confirmed during{" "}
          <Jump season={7} time="2020-09-15T23:05:55Z" team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            Ruby Tuesday
          </Jump>
          . Marquez Clark went on to be hit with four more pitches, holding the record for the player hit by the most
          pitches, as well as having every other unfortunate thing possible happen to him.
        </p>
      </Entry>
      <Entry title="The Tragedy of Headliners" season={7} day={96} time="2020-09-18T17:16:04Z">
        <p>
          In the <Jump election={6}>Season 6 Election</Jump>, the Breath Mints saw an amazing opportunity to improve
          their offense. The Headliners Blessing sorted the winning team’s lineup by order of idolatry, and with
          Headliners looking like a relatively uncontested Blessing and the Mints having a smaller fanbase, the fans put
          it in a lot of time organizing their idols to construct an offense around star batter Boyfriend Monreal.
          Winning the Blessing catapulted the Mints to the top of the league, with the Mints{" "}
          <Jump redirect="/standings" time="2020-09-18T20:50:00Z">
            finishing first in Mild League
          </Jump>{" "}
          and second in the entire league in the regular season.
        </p>
        <p>
          Unfortunately, the story of Headliners ends in tragedy, as Boyfriend Monreal was Incinerated on Day 96.
          Without Monreal at the front, the Mints’ offense reverted to a very unoptimized form, and the Mints lost to
          the <Link href="wild-wings">Wild Wings</Link> in the Mild League Division Series. As the Wild Wings won the
          Internet Series, the Mints considered Season 7 the ultimate what-if on if they still had their Boyfriend.
          Without Monreal in the lineup, the Mints fell further still and{" "}
          <Jump redirect="/standings" time="2020-09-25T02:40:00Z">
            cohosted Party Time in Season 8
          </Jump>{" "}
          with the <Link href="magic">Magic</Link>.
        </p>
      </Entry>
      <Entry title="PDZ Chokes" season={10} day={105}>
        <p>
          In Season 10’s Mild League Division Series, it looked like the Breath Mints would finally punch their ticket
          to their first Mild League Champion Series appearance ever. The Mints took the first two games of the series
          against the <Link href="shoe-theives">Charleston Shoe Thieves</Link>, and only needed one more win to take the
          series. The game seemed to be going well for the Mints: the Mints held a 1-&minus;1 lead going into the bottom
          of the 9th due to Shaming the Thieves the previous game, and they only needed to hold onto the shutout to
          sweep the Thieves.
        </p>
        <p>
          On the mound for the Breath Mints was PolkaDot “PDZ” Zavala, the lesser known of the PolkaDots and, thus, a
          scrappy underdog for most of her career. PDZ was able to rack up 2 outs, but, thanks to the{" "}
          <Link href="crabs">Baltimore Crabs</Link>{" "}
          <Jump election={9}>winning the Fifth Base Bubble last election</Jump>, allowed enough hits to fill three of
          the four bases. This tense situation only needed one more out for the Mints to move on to the MLCS.
          Unfortunately, PDZ was unable to hold it together; Thieves batter Simon Haley{" "}
          <Jump time="2020-10-17T16:26:27Z">hit a quadruple</Jump>, driving in 3 runs and Shaming the Mints with a final
          score of Shoe Thieves 2, Breath Mints 1.
        </p>
        <LineScore id="0a5ad466-78c6-4139-a1f5-b479b9e29c29" />
        <p>
          The Breath Mints went on to lose the next two games and be eliminated from the playoffs. This was a game of
          what could have been, with the Mints inches away from getting to the MLCS. It would be many more months and
          seasons before the Mints got there for the first time.
        </p>
      </Entry>
      <Entry title="Leach’s “Shutout”" season={12} day={71}>
        <p>
          Leach Ingram may not always perform the best in the objective sense of winning the game, but she certainly
          puts up some of the best performances in terms of entertainment. This game, however, is not one of those
          games: the Mints won this game handily, with a final score of 2-0.
        </p>
        <LineScore id="5efd94fd-875f-423e-a47f-cc464d5684e6" />
        <p>
          Well, the Mints did win the game, but Ingram also gave up 13 walks and 20 runs during it, which is quite a lot
          and maybe shouldn’t count as a shutout. However, due to the Black Hole, all 20 of those runs were swallowed,
          leaving the Steaks with no runs and the Mints with the win. This game truly embodied Leach Ingram, a beloved
          Mint, because even when she played bad, she at least did it in a way that was funny and, in this case, it even
          got the Mints a win. It also took away two of their wins from the Black Hole and they net negative, but that
          wasn’t important.
        </p>
        <p>
          This game was also the 24th game between Leach Ingram and <Link href="steaks">Dallas Steaks</Link> pitcher
          Leach Herman, a long-lived Blaseball tradition that fans named the “Leach-Off”. The Breath Mints and the
          Steaks both started Season 1 with pitchers named Leach leading their rotations; since both pitchers were in
          the same position, they would face each other when the two teams played. The Steaks and Mints were in the same
          league for all 24 seasons of Beta, and the Leaches managed to hold onto their mirrored positions for most of
          that period as well, making Leach vs. Leach one of the most common pitching matchups in Blaseball. Steaks fans
          and Mints fans alike celebrated the Leach-Off, bonding the fanbases to this day.
        </p>
      </Entry>
      <Entry title="An Easy Win for the Breath Mints" season={14} day={92}>
        <p>
          Simba Davis was easily one of the worst pitchers to ever play Blaseball. This was especially true in the
          Expansion Era, where the threshold for a player being good rose significantly; there was really no chance for
          Davis to take any games. On Season 14, Day 92, the Breath Mints definitely did not choke and lose, but won the
          game, as was expected.
        </p>
        <LineScore id="0cab391d-f1e4-4d69-95a4-19b130b4aff5" />
        <p>
          In fact, don’t even watch this game, because the result was so obvious, so the historical record that the
          Mints won and Simba Davis never got a win can be trusted.
        </p>
      </Entry>
      <Entry title="The Plansma" season={15} day={52}>
        <p>
          During the <Jump election={13}>Season 13 Election</Jump>, Brisket Friendo and Tad Seeth disappeared from the
          Breath Mints’ and <Link href="shoe-thieves">Shoe Thieves’</Link> shadows, respectively, possibly in connection
          to Sutton Picklestein and Tillman Henderson returning to the Hall of Flame. In the{" "}
          <Jump election={14}>Season 14 Election</Jump>, the Mints and Thieves’ ballparks, the Meadow and the Choux,
          were declared Crime Scenes, and two investigators, Uncle Plasma and Liquid Friend, were hired to investigate
          the disappearances.
        </p>
        <p>
          How this investigation was to be carried out was revealed when Uncle Plasma, a pitcher for the Millennials at
          the time,{" "}
          <Jump season={15} day={31} team="36569151-a2fb-43c1-9df7-2df512424c82">
            entered the Shoe Thieves’ shadows to investigate
          </Jump>{" "}
          at the start of a game at the Choux. Witnessing this, the Mints came up with a devious plan to recruit Uncle
          Plasma to the Breath Mints.
        </p>
        <p>
          Knowing that the Mints would host the Millennials on Day 52, the Mints planned to cast a ton of votes to
          Foreshadow pitcher Oscar Vaughn for Uncle Plasma, putting him on the Mints’ rotation. Since Wills were
          “executed as written”, the trade would still go off even after Uncle Plasma returned to the Millennials.
        </p>
        <p>
          In the 35 minutes that Uncle Plasma was in the Mints’ shadows, fans managed to cast 252,180 votes for the
          plan, which <Jump election={15}>ended up being 45% their our Will votes</Jump> in that Election.
        </p>
      </Entry>
      <Entry title="The Dot-Off" season={17} day={40}>
        <p>
          When Blaseball Returned, the Breath Mints’ rotation had two PolkaDots: PolkaDot Zavala and PolkaDot Patterson.
          The two would have entirely different career trajectories, with Patterson becoming a star of the league and
          Zavala only ever being a solid presence on the Mints’ rotation. The two PolkaDots would only face each other
          one time on the mound, on Season 17, Day 40.
        </p>
        <p>
          Neither PolkaDot was at the peak of their career at this point, with Patterson{" "}
          <Jump election={16}>Alternated to mediocrity in the Season 16 Election</Jump> and Zavala{" "}
          <Jump season={17} time="2021-04-20T10:15:25Z">
            suffering an allergic reaction on Season 17, Day 20
          </Jump>
          , but Mints fans were still excited to see the matchup at least once.
        </p>
        <LineScore id="c35c2ad0-c403-41f8-8394-549b8a4654f8" />
        <p>
          Ironically, the highlight of the game was not from either Dot, but from another player far past their prime
          from peanuts and Consumers: the King of Miserable Events, Marquez Clark. He stole home not{" "}
          <Jump time="2021-04-21T07:34:18Z">once</Jump>, but <Jump time="2021-04-21T07:35:38Z">twice</Jump> in the 8th
          inning, the first player to accomplish such a feat. Not only were fans baffled at how such a terrible player
          managed to pull this off, but Clark also did it while wearing{" "}
          <Jump redirect="/item/7ee005eb-a7d2-4bc1-a88e-bdbf7bfb15c2" season={17} day={40}>
            Shoes of Blaserunning
          </Jump>
          , meaning each of those inexplicable stolen bases was worth an extra .2 runs. This game did not end up being
          particularly close &mdash; the Mints won 16.4-1 &mdash; but the Mints were satisfied that this matchup was
          able to happen at least once.
        </p>
      </Entry>
      <Entry title="The 4-20 Sclorigami" season={17} day={61}>
        <LineScore id="73523330-bff4-463f-a2b8-2ebe60dc06e5" />
        <p>
          This game truly highlighted the absurdity of the Meadow as a ballpark. The Mints built their ballpark to have
          low Fortification, allowing more frequent weather events, have Reverb much more often, and have an Echo
          Chamber that occasionally made batters Reverberate or Repeat for the rest of the game. In this particular
          game, Reverb just kept happening.
        </p>
        <p>
          Not only was the <Link href="crabs">Crabs’</Link> lineup{" "}
          <Jump time="2021-04-22T04:16:53Z">shuffled in the 3rd inning</Jump>, but the Echo Chamber just kept giving out
          temporary Modifications. By the end of the game, every Breath Mints batter except Marco Stink was Repeating,
          while Rodriguez Internet was both Repeating and Reverberating. Even a ghost got in on the action, with Hobbs
          Cain, former <Link href="pies">Pie</Link> who was{" "}
          <Jump team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7" time="2020-09-22T01:14:57Z">
            Incinerated in Season 8
          </Jump>
          , made temporarily Reverberating while inhabiting the Haunted Kennedy Loser.
        </p>
        <p>
          This game featured a lot of players taking multiple at-bats in a row, particularly Rodriguez Internet, who was
          the only batter to have an at-bat for the Mints in the 7th inning, and all but one of the at-bats in the 8th
          inning, taking seven at-bats in a row. The Crabs lost 4-20, the first game of Blaseball to end with this
          score.
        </p>
      </Entry>
      <Entry title="The Breath Mints." season={22} day={110}>
        <p>
          In Season 22, the Breath Mints assembled a roster that was almost certainly the strongest roster in all of
          Blaseball history. Their pitching rotation consisted of only 10-star pitcher Winnie Hess and Underhanded
          menace Michelle Sportsman, who together had an absurd ERA of 0.63 in the regular season. The Mints offense
          consisted of mostly rented Replicas, with Aldon Cashmoney II, Valentine Games III, and Goodwin Morin IV all
          being bought for the team from the Gift Shop.
        </p>
        <p>
          In the Mild League Champion Series, the Mints faced the <Link href="crabs">Crabs</Link>, one of the few teams
          that still stood in the way of the Mints winning their first championship. The Mints took the{" "}
          <Jump season={22} day={108}>
            first
          </Jump>{" "}
          <Jump season={22} day={109}>
            two
          </Jump>{" "}
          games of the series without much opposition and only needed to win one more to make their way to their first
          Internet Series. This game featured both teams having Underhanded pitchers, basically guaranteeing it to be a
          clown game. The game ended up being more of a battle of the Mints offense against itself than anything else,
          with every positive run the Mints scored getting cancelled out by home runs.
        </p>
        <LineScore id="0e40f4e6-2a42-4c9d-91d1-5b0932d6c369" />
        <p>
          Fortunately for the Mints, the Crabs were also unable to get anything going, and the Mints won 0-&minus;1. The
          Mints sweeping the Crabs demonstrated the dominance of the Mints’ rotation, with the Crabs scoring a total of
          -1 runs throughout the entire series. This dominance led many Blaseball fans to take to Twitter spamming the
          Mints’ famous phrase “The Breath Mints.” to celebrate the victory. The repetition went so far that the Breath
          Mints ended up trending on Twitter, going as high as sixth on the list. This entire chronicle could have been
          a gigantic premature celebration, since they trended for winning the <em>Mild League Champion Series</em> for
          the first time, with one more series to play for the championship. The Mints were so dominant, though, that it
          seemed all but assured that they would take it home.
        </p>
      </Entry>
      <Entry title="A Perfect Game in the Internet Series" season={22} day={113}>
        <LineScore id="15bf627b-96d8-4cab-8567-a8fadc04ce6e" />
        <p>
          Truly, there was no larger horse than Winnie Hess. By this game, Winnie had 31.72 total stars, the most of any
          Blaseball player, and those stars really showed in her performance. Throughout her career, Hess had three{" "}
          <Jump season={17} day={83}>
            perfect games
          </Jump>
          , including{" "}
          <Jump season={18} day={15}>
            one that went ten innings
          </Jump>
          , but Winnie’s perfect game in the Internet Series might be her most iconic.
        </p>
        <p>
          Coming off the high of sweeping the Crabs and trending on Twitter, the Mints seemed like they were
          unstoppable, especially since their opponents, the Tokyo Lift were the Wild League’s Wild Card and mostly made
          it into the Internet Series from incredible weather luck. The first game of the series ended up proving that
          supposition correct, with Winnie Hess pitching a 16-strikeout perfect game. This game really set the tone of
          the series not being particularly close, and demonstrated how dominant Hes could be at this stage of her
          career.
        </p>
      </Entry>
      <Entry title="A Clutch Return" season={22} day={115}>
        <p>
          Game 3 of the Internet Series promised to be a clown game as soon as the weather was forecast. Polarity would
          randomly shift between Polarity&nbsp;+, where runs are scored regularly, and Polarity&nbsp;&minus;, where all
          runs are scored negatively. This basically left the entire game up to a coin-flip, which was <em>super</em>{" "}
          fun when playing in the Internet Series. The Mints’ offense again had another game against itself, with the
          score going up and down the entire game until, finally, in the 8th inning the Mints started to rally during
          Polarity&nbsp;+.
        </p>
        <LineScore id="3d0853ff-3f06-4478-b568-e7a6cd54b63d" />
        <p>
          The Mints scored 3 runs to tie up the game at 1-1 when, suddenly, the beloved Leach Ingram{" "}
          <Jump time="2021-07-03T22:21:00Z">returned from Elsewhere</Jump> and immediately hit a solo home run,
          clinching the series and the championships for the Mints. This game was a chaotic game to finish off the
          Mints’ championship run, but it was incredibly exciting to watch.
        </p>
      </Entry>
      <Entry date="Season 23, Day 58" title="Breath Mints 20.3, Crabs 20.3" time="2021-07-22T01:24:22Z">
        <p>
          Towards the end of the Expansion Era, some rules were added to Blaseball that made it impossibly convoluted.
          One was Equal Sun, which caused any home run hit with only one out left to tie the game. The Mints’ only hope
          of winning on Day 58 came down to Equal Sun, with the Mints trailing the Crabs by a score of 20.3-.1 with 2
          outs. The last hope of the Mints to hit this home run was, regrettably, Jon Halifax, an all-around
          not-beloved-at-all Blaseball player.
        </p>
        <p>
          Halifax managed to make the comeback happen, <Jump time="2021-07-22T01:24:37Z">hitting a 2-run home run</Jump>
          , which Equal Sun turned into a 20.2-run home run, tying the game and faxing Crabs pitcher Montgomery Bullock.
          No more runs were scored for the rest of the 9th inning, so both teams were prepared to head to extra innings
          when, instead, the game just ended with the Mints winning. Somehow, Jon Halifax’s tying home run caused a
          floating point error, which caused the game to believe the Mints had a slight lead over the Crabs.
        </p>
        <LineScore id="607d7829-966e-4f2c-882b-d49066040cc2" />
        <p>
          Games where the sim broke were always generally silly, and this one in particular was memorable due to the
          chaotic nature of the end of the Expansion Era. Jon Halifax{" "}
          <Jump season={23} time="2021-07-22T07:06:04Z">
            would go on to be Incinerated five games later
          </Jump>
          , and nobody would miss him.
        </p>
      </Entry>
      <Entry date="Season 24, Day 3" title="We Die" time="2021-07-26T17:13:23Z">
        <p>On Season 24, Day 3, a Rogue Umpire incinerated the Kansas City Breath Mints. lmao</p>
      </Entry>
    </History>
  );
}
