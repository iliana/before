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
      <Entry title="A Rivalry Intensifies" season={3} day={57}>
        <p>
          In all of sporting history, there are few rivalries as fierce or as storied as the rivalry between the Kansas
          City Breath Mints and the <Link href="shoe-thieves">Charleston Shoe Thieves</Link>
          <span className="tw-whitespace-nowrap">
            .
            <sup className="tw-font-sans">
              [<em>citation&nbsp;needed</em>]
            </sup>
          </span>{" "}
          Season 3, Day 57, was an early chapter in the rivalry, where up to this point the Mints were not doing too
          well. The Shoe Thieves had star pitcher Matteo Prestige on the mound, and in the bottom of the second already
          had a 6-3 lead over the Mints. It seemed the Mints could be on the losing end of this bout, when a cruel twist
          struck in the form of a rogue umpire incinerating Matteo Prestige, replacing them with Gunther O’Brian. At the
          time of their birth, Gunther was a 0-star pitcher with pathetically bad stats, quickly turning the tides of
          the game into an offensive shootout, with both pitchers giving up run after run.
        </p>
        <LineScore id="1f7026c9-1da6-4a4c-b8b8-f417a34af030" />
        <p>
          By the bottom of the ninth inning, the game was tied 16-16, but Gunther was unable to hang on, giving up 5
          runs and being shamed into a final score of Breath Mints 21, Shoe Thieves 16. This game is notable for holding
          the record for the highest scoring game for many seasons, at least for as long as scoring in Blaseball was
          logical. Gunther’s first game is remembered by the Mints as a chaotic chapter in the rivalry, and over time as
          Gunther improved from blessings, a yummy reaction, and parties into a worthy adversary, Gunther became a
          fixture of the rivalry.
        </p>
      </Entry>
      <Entry title="The Rise of the Death Mints" season={5} day={99}>
        <p>
          As the race for the Postseason 5 neared its end, it looked like the Breath Mints had a chance to finally
          clinch their first postseason berth. Going into the final day of the regular season, the Breath Mints were
          tied with the <Link href="steaks">Dallas Steaks</Link>, both with a record of 50-48, and both vying for the
          final playoff slot in the Good League. To even have a chance to get into the postseason, the Mints had to win
          their final game against the <Link href="flowers">Boston Flowers</Link>. The game was a nailbiter that went to
          11 innings, but in the end the Mints triumphed, shaming the Flowers with a final score of Breath Mints 7,
          Flowers 6.
        </p>
        <LineScore id="65879dec-e15e-4c67-a32d-1cd6bca8294a" />
        <p>
          Unfortunately by that point, the Steaks had already won their game against Breckenridge Jazz Hands, meaning
          the Mints and Steaks were tied with the same record of 51-48. At this point, Divine Favor rankings were not
          yet listed on the site and weren’t widely known, but the Steaks had the better Divine Favor, and thus the
          Mints were eliminated from postseason contention once again as the first team to be eliminated by tiebreaker.
          The Mints fanbase decided to cope with these events by rebranding themselves as the Death Mints, and being…
          you know, like mildly edgy by doing things like declaring they would exact their revenge and stuff. The Breath
          Mints would continue on to exact their revenge on the Steaks in Season 15 by{" "}
          <Jump time="2021-04-09T19:45:00Z" redirect="/league">
            knocking them out of postseason contention on Divine Favor tiebreaker
          </Jump>
          .
        </p>
      </Entry>
      <Entry title="The First Beaning" season={7} day={5}>
        <p>
          In the{" "}
          <Jump redirect="/offseason" time="2020-09-13T19:30:00Z">
            Season 6 Election
          </Jump>
          , Jaylen Hotdogfingers was resurrected and given the Debted modifier, and it was kind of a big deal? Anyway,
          Jaylen’s first game pitching that season was against the Breath Mints. In the second inning,{" "}
          <Jump time="2020-09-14T20:04:26Z">Jaylen hit Mints batter Dickerson Morse with a pitch</Jump>, giving him the
          Unstable modifier. What does Unstable do? At the time, we had no idea what it did, there was no description
          given to the modifier and the website, and we were all very scared.
        </p>
        <p>
          Mints pitcher and walk queen Leach Ingram seemed to agree that Unstable was scary and we should avoid it, and
          her strategy to avoid her teammates getting beaned by Jaylen was to just let the other team score as many runs
          as they wanted. Jaylen would bean two more Mints batters during the game, Stew Briggs and Marquez Clark, but
          Leach’s strategy caused the game to easily end in nine innings, with the <Link href="garages">Garages</Link>{" "}
          winning with a score of Garages 20, Breath Mints 1.
        </p>
        <p>
          This game was complete chaos to watch live, and only became scarier when our fears of Unstable were confirmed
          during{" "}
          <Jump season={7} time="2020-09-15T23:05:55Z" team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            Ruby Tuesday
          </Jump>
          . Marquez Clark would go on to be hit with four more pitches, holding the record for the player hit by the
          most pitches, as well as having every other unfortunate thing possible happening to him.
        </p>
      </Entry>
      <Entry title="PDZ Chokes" season={10} day={105}>
        <p>
          It’s the quarterfinals of Postseason 10 and it looks like the Breath Mints might finally be able to punch
          their ticket to their first semifinals appearance ever. The Mints took the first two games of the series
          against the <Link href="shoe-theives">Charleston Shoe Thieves</Link>, and only needed one more win to take the
          series. The game seemed to be going well for the Mints, with the Mints holding a 1-(-1) lead (oh yeah, all the
          teams not in Wild Low had Targeted Shame and the Mints shamed the Thieves in the previous game) going into the
          bottom of the ninth, and only needing to hold onto the shutout to sweep the Thieves.
        </p>
        <p>
          On the mound for the Breath Mints was PolkaDot “PDZ” Zavala, the lesser known of the PolkaDots and thus a
          scrappy underdog for most of her career. PDZ was able to rack up two outs, but also allowed three runners on
          base, having runners at second, third and fourth (oh yeah, all the teams not in Wild High had five bases for
          all of Season 10), leaving a tense situation with only one out needed for the Mints to move on to the
          semifinals. Unfortunately PDZ was unable to hold it together, with Thieves batter Simon Haley hitting a
          quadruple that drove in three runs, shaming the Mints with a final score of Shoe Thieves 2, Breath Mints 1.
        </p>
        <LineScore id="0a5ad466-78c6-4139-a1f5-b479b9e29c29" />
        <p>
          The Breath Mints would go on to lose the next two games and be eliminated from the playoffs. This is a game of
          what could have been, with the Mints being inches away from getting to the semifinals. It would be many more
          months and seasons before the Mints would get there for the first time.
        </p>
      </Entry>
      <Entry title="An Extra Innings Shootout" season={12} day={61}>
        <p>
          This game is probably one of the most exciting games of Blaseball the Mints ever played that did not rely on
          the sim doing something silly to make it iconic. This game is just a back and forth slugfest that both teams
          looked like they were definitely going to win at different points and is a good watch.
        </p>
      </Entry>
      <Entry title="Leach&rsquo;s &ldquo;Shutout&rdquo;" season={12} day={71}>
        <p>
          Leach Ingram may not always have performed the best in the objective sense of winning the game, but certainly
          puts up some of the best performances in terms of being entertaining. This game, however, is not one of those
          games: the Mints won this game handily, with a final score of Breath Mints 4, Steaks 0.
        </p>
        <LineScore id="5efd94fd-875f-423e-a47f-cc464d5684e6" />
        <p>
          Well, the Mints did win the game, but Leach also gave up 13 walks and 20 runs during it, which is a lot and
          maybe shouldn’t count as a shutout. However, due to the Black Hole weather, all 20 of those runs were
          swallowed, leaving the Steaks with no runs, and the Mints with the win. This game truly embodies Leach Ingram,
          a beloved Mint, because even when she plays bad, at least she does it in a way that’s funny, and in this case
          it even got us a win. Sure, it also took away two of our wins from the Black Hole and we’re net negative, but
          who’s counting?
        </p>
      </Entry>
      <Entry title="An Easy Win for the Breath Mints" season={14} day={92}>
        <p>
          Simba Davis is easily one of the worst pitchers to ever play Blaseball. Especially in the Expansion Era, where
          the threshold for a player being good rose significantly, there was really no chance for Simba to take any
          games. On Season 14, Day 92, the Breath Mints definitely did not choke and lose, but won the game, as was
          expected.
        </p>
        <LineScore id="0cab391d-f1e4-4d69-95a4-19b130b4aff5" />
        <p>
          In fact, you don’t even have to watch this game, because the result was so obvious, so you can just take my
          word for it that the Mints won and Simba Davis never got a win.
        </p>
      </Entry>
      <Entry title="The Plansma" season={15} day={52}>
        <p>
          During the{" "}
          <Jump redirect="/offseason" time="2021-03-14T19:15:00Z">
            Season 13 Election
          </Jump>
          , Brisket Friendo and Tad Seeth disappeared from the Breath Mints and Shoe Thieves shadows, respectively,
          possibly in connection to Sutton Picklestein and Tillman Henderson returning to the Hall of Flame. In the{" "}
          <Jump redirect="/offseason" time="2021-03-21T18:15:00Z">
            Season 14 Election
          </Jump>
          , the Mints and Thieves’ Stadiums, the Meadow and the Choux, were declared Crime Scenes, and two
          investigators, Uncle Plasma and Liquid Friend, were hired to investigate the disappearances.
        </p>
        <p>
          How the investigators intended to investigate was revealed when Uncle Plasma, currently a pitcher for the
          Millennials,{" "}
          <Jump season={15} day={31} team="36569151-a2fb-43c1-9df7-2df512424c82">
            entered the Shoe Thieves’ shadows to investigate
          </Jump>{" "}
          at the start of a Millennials&ndash;Shoe Thieves game at the Choux. Witnessing this, the Mints came up with a
          devious plan to recruit Uncle Plasma to the Breath Mints.
        </p>
        <p>
          Knowing that the Mints played the Millennials at the Meadow on Day 52, the Mints planned to cast a ton of
          votes on the Foreshadow Will to swap Uncle Plasma in the shadows with Oscar Vaughan on the Mints rotation.
          Since wills are executed as written, the trade would still go off, even after Uncle Plasma returned to the
          Millennials. The whole thing is a little complicated but{" "}
          <a href="https://www.youtube.com/watch?v=si3Ab71-bso">an explanatory video</a> by{" "}
          <a href="https://twitter.com/rostilicious">@rostilicious</a> describes the process pretty well.
        </p>
        <p>
          In the 35 minutes that Uncle Plasma was in the Mints shadows, the Mints managed to put in 252,180 votes into
          the plan, which{" "}
          <Jump redirect="/offseason" time="2021-04-11T18:30:00Z">
            ended up being 45% of our Will votes
          </Jump>{" "}
          for that season.
        </p>
      </Entry>
      <Entry title="The Dot-Off" season={17} day={40}>
        <p>
          At the very start of Beta in Season 1, the Breath Mints starting pitching rotation had two PolkaDots: PolkaDot
          Zavala and PolkaDot Patterson. The two would have two entirely different career trajectories, with Patterson
          becoming a star of the league and Zavala only ever being a solid presence on the Mints rotation. The two
          PolkaDots would only face each other one time on the mound, on Season 17, Day 40.
        </p>
        <p>
          Neither PolkaDot was at the peak of their career at this point, with Patterson{" "}
          <Jump redirect="/offseason" time="2021-04-18T18:15:00Z">
            having been Alternated to mediocrity in the Season 16 Election
          </Jump>
          , and Zavala{" "}
          <Jump season={17} time="2021-04-20T10:15:25Z">
            suffering an allergic reaction on Season 17, Day 20
          </Jump>
          , but Mints fans were still excited to see the match-up at least once.
        </p>
        <LineScore id="c35c2ad0-c403-41f8-8394-549b8a4654f8" />
        <p>
          Ironically, the highlight of the game was not from either Dot, but from another player far past their prime
          from peanuts and consumers, the King of Miserable Events, Marquez Clark, who stole home not once, but twice in
          the eighth inning, the first player to accomplish such a feat. Not only was everyone baffled at how such a
          terrible player managed to pull this off, but Marq also did it while wearing Shoes of Blaserunning, meaning
          each of those inexplicably stolen bases was worth an extra .2 runs. This game did not end up being
          particularly close &mdash; the Mints won 16.4-1 &mdash; but the Mints were satisfied that this matchup was
          able to happen at least once.
        </p>
      </Entry>
      <Entry title="The 4-20 Sclorigami" season={17} day={61}>
        <LineScore id="73523330-bff4-463f-a2b8-2ebe60dc06e5" />
        <p>
          This game truly highlights the insanity of the Meadow as a stadium. The Mints built their stadium to have low
          Fortification (making weather events happen more often), have Reverb weather much more often, and also have an
          Echo Chamber that occasionally gave batters Reverberating or Repeating for the game. In this particular game,
          the weather just kept happening.
        </p>
        <p>
          Not only was the Crabs lineup shuffled during the third inning, but the Echo Chamber just kept giving out
          temporary modifiers. By the end of the game, every Breath Mints batter except Marco Stink had Repeating, while
          Rodriguez Internet had both Repeating and Reverberating. Even a ghost got into the action, with Hobbs Cain,
          former Pie who was incinerated in Season 8, being given temporary Reverberating while inhabiting haunted
          Kennedy Loser.
        </p>
        <p>
          This game featured a lot of players taking multiple at-bats in a row, particularly Rodriguez Internet, who was
          the only batter to have an at-bat for the Mints in the seventh inning, and continued to take all of the
          at-bats but one in the eight inning, taking seven at-bats in a row. The final score was Crabs 4, Breath Mints
          20, the first game of Blaseball to end with this score.
        </p>
      </Entry>
      <Entry title="Trending on Twitter" season={22} day={110}>
        <p>
          In Season 22, the Breath Mints assembled a roster that is almost certainly the strongest roster in all of
          Blaseball history. Their pitching rotation consisted of only 10-star pitcher Winnie Hess and underhanded
          menace Michelle Sportsman, who together had an ERA of 0.63 in the regular season, which is just absurd. The
          Mints offense consisted of mostly rented replicas, with Aldon Cashmoney II, Valentine Games III, and Goodwin
          Morin IV, all being added to the team from the Gift Shop.
        </p>
        <p>
          In the semi finals of the postseason the Mints faced the Crabs, one of the few teams still standing in the way
          of the Mints winning their first championship. The Mints took the first two games of the series without much
          opposition and only needed to win one more game to make their way to their first Internet Series. This game
          featured both teams having a pitcher with underhanded, basically guaranteeing it to be a clown game. The game
          ended up being more of a battle of the Mints offense against itself than anything else, with every positive
          run the Mints scored getting cancelled out by runs from a home run.
        </p>
        <LineScore id="0e40f4e6-2a42-4c9d-91d1-5b0932d6c369" />
        <p>
          Fortunately for the Mints, the Crabs were also unable to get anything going offensively, and the Mints won
          with a score of Breath Mints 0, Crabs -1. The Mints finishing the sweep of the Crabs demonstrated the
          dominance of the Mints rotation, with the Crabs scoring a total of -1 runs throughout the entire series. This
          dominance caused many Blaseball fans to take to Twitter spamming the Mints famous phrase “The Breath Mints.”
          to celebrate the victory. The repetition went so far that the Breath Mints ended up trending on Twitter, going
          as high as #6 on the list. This entire chronicle might’ve be a gigantic premature celebration, since we
          trended for winning the <em>semifinals</em> for the first time, with still one more series to play for the
          championship. But the Mints were so dominant that it seemed all but assured that we would take it home.
        </p>
      </Entry>
      <Entry title="A Perfect Game in the Internet Series" season={22} day={113}>
        <LineScore id="15bf627b-96d8-4cab-8567-a8fadc04ce6e" />
        <p>
          Truly, there is no larger horse than Winnie Hess. At this point in time, Winnie had 31.72 total stars, the
          most of any Blaseball player, and those stars really showed in her performance. Throughout her career, Winnie
          had three perfect games, including one in a game that went ten innings, but Winnie’s perfect game in the
          Internet Series might be her most iconic.
        </p>
        <p>
          Coming off the high of sweeping the Crabs and trending on Twitter, the Mints seemed like they could be
          unstoppable, especially since their opponents, the Tokyo Lift were the wild card team from the Wild League and
          mostly made it into the finals from incredible weather luck. The first game of the series ended up proving
          that supposition correct, with Winnie Hess pitching a sixteen-strikeout perfect game. This game really set the
          tone of the series not being particularly close, and demonstrates how dominant Winnie could be at this stage
          of her career.
        </p>
      </Entry>
      <Entry title="A Clutch Return" season={22} day={115}>
        <p>
          Game 3 of the season 22 Internet Series promised to be a clown game as soon as the weather for the game was
          revealed. Under Polarity weather, the weather randomly shifts between Polarity&nbsp;+, where runs are scored
          regularly, and Polarity&nbsp;&minus;, where all runs are scored negatively. This basically leaves the entire
          game on a coin-flip, which is <em>super</em> fun when you’re in the finals. The Mints offense again had
          another game against itself, with the Mints score going up and down the entire game, until finally in the
          eight inning the Mints started to rally during Polarity&nbsp;+.
        </p>
        <LineScore id="3d0853ff-3f06-4478-b568-e7a6cd54b63d" />
        <p>
          The Mints scored three runs to tie up the game at 1-1, when suddenly the beloved Leach Ingram returned from
          Elsewhere and immediately hit a solo home run, clinching the series and the championships for the Mints. This
          game was a chaotic game to finish off the Mints championship run, but it was incredibly exciting to watch.
        </p>
      </Entry>
      <Entry title="Breath Mints 20.3, Crabs 20.3" time="2021-07-22T01:24:22Z">
        <p>
          Towards the end of the Expansion Era, some rules were added to Blaseball that made it impossibly convoluted.
          One such rule was Equal Sun, which caused any home run hit with only one out left in the game to score enough
          runs to tie the game. The Mints’ only hope of winning on Day 58 came down to Equal Sun, with the Mints
          trailing the Crabs by a score of 20.3-.1 and two outs. The last hope of the Mints to hit this home run was,
          regrettably, Jon Halifax, an all around not-beloved-at-all Blaseball player.
        </p>
        <p>
          Jon managed to make the comeback happen, hitting a 2-run home run, which Equal Sun turned into a 20.2-run home
          run, tying the game and faxing Crabs pitcher --ntgomery Bullo-k. No more runs were scored for the rest of the
          ninth inning, so everyone was prepared to head to extra innings, when instead the game just ended with the
          Mints being given the win. Somehow, Jon Halifax’s tying home run caused a floating point error, which caused
          the game to think the Mints had a slight lead over the Crabs.
        </p>
        <LineScore id="607d7829-966e-4f2c-882b-d49066040cc2" />
        <p>
          Games where the sim breaks are always generally silly, and this one in particular is memorable due to the
          chaotic nature of the end of Expansion. Jon Halifax{" "}
          <Jump season={23} time="2021-07-22T07:06:04Z">
            would go on to be incinerated five games later
          </Jump>
          , and nobody would miss him.
        </p>
      </Entry>
      <Entry title="We Die" time="2021-07-26T17:13:23Z">
        <p>On Day 3 of Season 24, a rogue umpire incinerated the Kansas City Breath Mints. lmao</p>
      </Entry>
    </History>
  );
}
