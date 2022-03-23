import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([
        "047aaf44-329b-4237-8f2e-40a4eeae1ba8",
        "c8acdfe9-d981-46ba-b202-e977c99b8a4c",
        "06bc5009-8f12-42fa-bf63-2e38d406d2d0",
      ]),
    },
  };
}

export default function Page() {
  return (
    <History authors="Rudy and Clip Clipperson">
      <Entry date="Season 3, Day 14" title="The First Death of Chorby Soul" time="2020-08-04T08:15:44Z">
        <p>
          To save then-captain Dominic Marijuana from incineration, Chorby Soul threw themself in front of a Rogue
          Umpire’s fire and chose to burn instead. This would be the first time, but not the last, that an umpire would
          Incinerate them. Before this, Soul had cultivated a unique fanbase among Millennials fans, who would chant
          “Chorby Yes!” and “Chorby No!” during games based on their in-game performance.
        </p>
        <p>
          Their legacy lives on, as “Chorby-chanting” commonly rings out around Battin’ Island, as their name is invoked
          as both a blessing and a deliverance for Millennials players. Sandie Turner, Soul’s replacement, would go on
          to become a powerhouse of the Millennials’ batting lineup for seasons to come. Chorby Soul spent the next
          eleven seasons in the Hall of Flame until they were Plundered by the{" "}
          <Link href="garages">Seattle Garages</Link> in the{" "}
          <Jump election={14} team="105bc3ff-1320-4e37-8ef0-8d595cb95dd0">
            Season 14 Election
          </Jump>
          .
        </p>
      </Entry>
      <Entry
        date="Season 4, Day 43"
        title="Sophomore Sandie Turner Discovers the 3-Blood Blagonball"
        time="2020-08-26T10:19:49Z"
      >
        <p>
          In the top of the 6th inning, Beasley Gloom, pitching for the{" "}
          <Link href="shoe-thieves">Charleston Shoe Thieves</Link>, walked Sandie Turner. Turner, in eyr sophomore
          season in the ILB, would then proceed to steal second and third bases before stealing home and completing a
          “Millennials Home Run”, named after the Mills’ chant “Fuck Capitalism, Steal Home!” For this achievement, ey
          would discover the 3-Blood Blagonball, the second of such artifacts. An early moment in eyr career, this
          cemented Turner in the hearts of Millennials fans and as a player to watch for seasons to come.
        </p>
      </Entry>
      <Entry
        date="Season 4, Day 108"
        title={<abbr title="Thomas Dracaena hit a ground out to Edric Tosser.">TDHAGOTET</abbr>}
        time="2020-08-29T21:22:02Z"
      >
        <p>
          The New York Millennials were poised for a strong playoff showing in Season 4. In the Good League Championship
          Series, they would face their future Blood Donor rivals, the{" "}
          <Link href="firefighters">Chicago Firefighters</Link>. In the top of the 9th inning, Feedback was detected,
          and Thomas Dracaena hit a ground out to Edric Tosser. Time seemed to stop for well over twenty minutes, until
          it resumed as if nothing had been wrong. Ren Hunter, recently Feedbacked from the{" "}
          <Link href="shoe-thieves">Shoe Thieves</Link>, batted Schneider Bendie in for the scoring run, bringing the
          series to 2-2. It inspired an early copypasta still remembered fondly by both teams.
        </p>
      </Entry>
      <Entry date="Season 7, Day 59" title="The Death of Dominic Marijuana" time="2020-09-17T03:17:57Z">
        <p>
          The Millennials had already seen one of their own incinerated in Season 7, when Wesley Dudley was incinerated
          on <Jump time="2020-09-15T15:03:18Z">Day 24</Jump>, about a week before Ruby Tuesday. Dominic Marijuana, who
          had stepped into the team’s captaincy after Scrap Murphy’s Incineration on{" "}
          <Jump time="2020-07-29T05:59:55Z">Season 2, Day 40</Jump>, was the beloved core of the New York Millennials
          lineup.
        </p>
        <p>
          Squaring off against recently-revived <Link href="garages">Seattle Garages</Link> pitcher Jaylen Hotdogfingers
          on <Jump time="2020-09-16T23:28:53Z">Day 55</Jump>, Marijuana was hit by a rogue pitch and became Unstable. It
          would be a long week until Day 63 and unfortunately, with Solar Eclipse in the forecast, Dom wouldn’t make it.
          Less than a season after his brother’s incineration on{" "}
          <Jump time="2020-09-11T03:13:59Z">Season 6, Day 84</Jump>, Dom would join Randy, a beloved batter for both the{" "}
          <Link href="sunbeams">Hellmouth</Link> and <Link href="jazz-hands">Breckenridge</Link>, in the Hall of Flame.
        </p>
        <p>
          For Millennials fans, no player loomed quite as large, and no absence was felt more acutely. Dom was mourned
          and celebrated throughout the league, and the Millennials would never again have a captain. While Dom would be
          a key player on <Jump time="2020-10-18T00:38:56Z">Day X</Jump>, and his replacement Charlatan Seabright became
          a Mills fan favorite, his absence was a depressing low in Mills history.
        </p>
      </Entry>
      <Entry date="Season 8, Day 18" title="Red Hot!" time="2020-09-22T09:09:04Z">
        <p>
          In the <Jump election={7}>Season 7 Election</Jump>, the New York Millennials won the Hot Sauce Packet Blessing
          with 2% of the vote, making Sandie Turner Spicy. During this game against the{" "}
          <Link href="crabs">Baltimore Crabs</Link>, Turner got three consecutive hits, turning em Red Hot! for the
          first time. The phrase “Sandie Turner is Red Hot!” is immortalized as part of the Mills Cycle
          {/* embed graph? */}, a graph measuring the team’s collective hubris over the course of a typical season. It
          marks a time in the first half of the season when the Millennials are playing well and the fans are confident
          in the team’s postseason chances, and is followed by “Sandie Turner is no longer Red Hot!” when the team
          inevitably falters.
        </p>
      </Entry>
      <Entry title="Patty Fox’s Third Miracle" season={8} day={61}>
        <p>
          Despite never being the Millennials’ strongest pitcher, Patty Fox had always been a bit of a miracle worker.
          Fox became the first pitcher with multiple confirmed immaculate innings, both of which occurred during Season
          3: striking out Isaac Rubberman, Hotbox Sato, and Margarito Nava of the{" "}
          <Link href="flowers">Boston Flowers</Link> on <Jump time="2020-08-05T17:14:37Z">Day 47</Jump>, and Bevan Wise,
          Richardson Turquoise, and future teammate Penelope Mathews of the Yellowstone <Link href="magic">Magic</Link>{" "}
          on <Jump time="2020-08-07T02:04:34Z">Day 77</Jump>. On{" "}
          <Jump season={5} day={22}>
            Season 5, Day 22
          </Jump>
          , she famously “paid the debt”, pitching a shutout against the Charleston Shoe Thieves and buying the lineup
          enough time to work their way out of a 4-run deficit inflicted by Targeted Shame. The Millennials would go on
          to win that game 2-0.
        </p>
        <LineScore id="047aaf44-329b-4237-8f2e-40a4eeae1ba8" />
        <p>
          She performed her third miracle when she pitched the first recorded perfect game in Blaseball’s history
          against the Boston Flowers. For her achievement, she discovered the 9-Blood Blagonball, the fourth of such
          artifacts and the second for the team.
        </p>
        <LineScore id="c8acdfe9-d981-46ba-b202-e977c99b8a4c" />
      </Entry>
      <Entry date="Season 10, Day X" title="Dominic Marijuana Baja Blasts God" time="2020-10-18T00:38:56Z">
        <p>
          Day X was a momentous day in the history of the ILB, with the return of beloved players under the banner of
          the Hall of Flame and the defeat of the Shelled One at their hands. Every team had a personal connection to
          the events of that game, and the Millennials were no exception.
        </p>
        <p>
          They had two former captains return as members of the Hall Stars: Scrap Murphy and Dominic Marijuana. Murphy,
          the Millennials’ captain when Blaseball returned in Season 1, was an early casualty on{" "}
          <Jump time="2020-07-29T05:59:55Z">Season 2, Day 40</Jump>. He replaced Sebastian Telephone mid-game when
          Telephone was <Jump time="2020-10-18T00:49:30Z">Incinerated a second time</Jump>. Over the course of the game,
          Marijuana, Murphy’s successor, hit three home runs against THE SHELLED ONE’S PODS, the{" "}
          <Jump time="2020-10-18T01:06:50Z">final of which</Jump> dealt 2,039,516 damage to THE PODS and ended the game,
          adding Blaseball Gods to the list of industries the Millennials are proud to have helped kill.
        </p>
      </Entry>
      <Entry election={10} title="An Actual Airplane and some BIRD SEED">
        <p>
          By the Season 10 Election, things were looking up. The return and subsequent release of beloved former captain
          Dominic Marijuana did much to buoy the spirits of a team who sorely missed him. To top it all off, the
          Millennials managed to win two Blessings this Election. The first, An Actual Airplane, equipped Mills slugger
          Thomas Dracaena with Blaserunning which allowed him to score the first recorded fractional run in ILB history
          on <Jump time="2020-10-21T16:05:14Z">Season 11, Day 48</Jump>.
        </p>
        <LineScore id="06bc5009-8f12-42fa-bf63-2e38d406d2d0" />
        <p>
          Dracaena’s baserunning stat was a paltry 1.02 stars at the time of the Election, but would be boosted to 2.25
          stars as part of the compensation owed from the verdict of <i>New York Millennials v. Parker MacMillan III</i>
          , where the Coin was found guilty of wire fraud for failing to redistribute the top 1% of players’ wealth
          after Season 10, as per <Jump election={3}>Season 3’s Eat The Rich Decree</Jump>.
        </p>
        <p>
          The team also won the Bird Seed Blessing which, during Beta, never came into effect, as no Millennials player
          was Shelled while an active player. Despite this, fans of the Millennials profess their undying love for the
          modification by chanting “BIRD SEED”, with many line breaks between the two words.
        </p>
      </Entry>
      <Entry date="Season 15, Day 86" title="Sandie Turner’s Red Hot! Season" time="2021-04-09T06:14:04Z">
        <p>
          During Season 15, the Millennials were hungry for a championship ring, and they looked unstoppable. The Mills’
          star pitcher Theodore Cervantes topped the season’s pitching charts, boasting the lowest ERA, hits per 9
          innings, and home runs per 9 innings, and was in a seven-way tie for third place with five shutouts. Mills
          fans cheered its pursuit of TERMINAL VELOCITY with “Get Cerved!”
        </p>
        <p>
          However, no one had a better season than Sandie Turner. Infused in the{" "}
          <Jump election={12}>Season 12 Election</Jump>, Turner ended this season with the highest batting average,
          on-base percentage, slugging percentage, and number of total bases. On Day 86, ey also broke the ILB’s single
          season home run record with eyr 48th, finishing the season with 53 total home runs. Turner’s record remained
          in place until it was broken by the <Link href="tacos">Tacos’</Link> Mcdowell Mason on{" "}
          <Jump time="2021-05-13T04:13:18Z">Season 18, Day 60</Jump>.
        </p>
        <p>
          Among fans, the common explanation of the team’s stellar performance was “Mills Mad!”, due to a series of
          setbacks that occurred throughout the season. These included the redactions of{" "}
          <Jump redirect="/player/667cb445-c288-4e62-b603-27291c1e475d" time="2021-04-06T05:25:00Z">
            Peanut Holloway
          </Jump>{" "}
          and{" "}
          <Jump redirect="/player/198fd9c8-cb75-482d-873e-e6b91d42a446" time="2021-04-06T05:25:00Z">
            Ren Hunter
          </Jump>{" "}
          on Day 15 and a series of nine devastating Consumer attacks which plagued the team, injuring{" "}
          <Jump time="2021-04-08T17:20:24Z">Fynn Doyle</Jump>, <Jump time="2021-04-08T22:06:58Z">Andrew Solis</Jump>,{" "}
          <Jump time="2021-04-09T00:01:32Z">Winnie Mccall</Jump> (<Jump time="2021-04-09T12:13:15Z">twice</Jump>),{" "}
          <Jump time="2021-04-09T01:15:13Z">Uncle Plasma</Jump>, <Jump time="2021-04-09T07:06:02Z">Glabe Moon</Jump>,{" "}
          <Jump time="2021-04-09T13:22:50Z">Thomas Dracaena</Jump>,{" "}
          <Jump time="2021-04-09T19:22:21Z">Theodore Cervantes</Jump>, and finally{" "}
          <Jump time="2021-04-10T01:15:45Z">Sandie Turner</Jump> eyrself. The attacks ultimately ended the Mills’
          championship dreams; they would lose the Wild League Division Series against the eventual Internet Series
          Champions, the <Link href="moist-talkers">Canada Moist Talkers</Link>, and went into the Election determined
          to win it all next season.
        </p>
      </Entry>
      <Entry date="Season 16, Day 88" title="The Second Death of Chorby Soul" time="2021-04-16T10:19:28Z">
        <p>
          The “Mills Mad” furor quickly gave way to “Mills Sad” with the firing of an unexpected Will in{" "}
          <Jump election={15}>the Season 15 Election</Jump>. Chorby Soul, a Millennial since Blaseball’s return, was
          Plundered back to the team, this time as a pitcher, sending Penelope Mathews to the{" "}
          <Link href="garages">Seattle Garages</Link>. In <Jump election={14}>the previous Election</Jump>, Soul had
          become the fourth player to return from the Hall of Flame saddled with Debt. Their return was not a peaceful
          one. Chorby Soul’s soul was uniquely heavy, which plunged their team deep into the immateria and subjected
          both the team and Soul themself to constant Consumer attacks.
        </p>
        <p>
          In an attempt to avoid further Redactions, the Seattle Garages <Jump election={15}>Reformed Soul’s Debt</Jump>
          , unfortunately rerolling it into a permanent form of Unstable. Soul’s return to New York was bittersweet.
          Players and fans alike celebrated the return of a Season 1 player while mourning that the team was sinking
          into Consumer-infested immateria. The writing was on the wall when the weather forecast predicted that Chorby
          Soul would pitch under a Solar Eclipse on Day 88. Fans spent the season celebrating Soul’s life, and many woke
          up early to watch on in sorrow as Chorby Soul burned once again. The Millennials’ tragic season would not stop
          there, however, as <Jump time="2021-04-16T14:08:23Z">Day 92</Jump> claimed the life of Winnie Mccall, another
          beloved Season 1 batter, who would follow Soul to the Hall of Flame.
        </p>
      </Entry>
      <Entry title="The Baby Shower Held ‘Round the League: Lil Pitchy’s ILB Debut" season={22} day={13}>
        <p>
          At the end of Day 12, the Millennials’ rotation was in a tight spot. Sandie Carver and Schneider Bendie both
          escaped Elsewhere the previous season to avoid being caught in Grand Heists on Days{" "}
          <Jump time="2021-06-22T16:22:42Z">26</Jump> and <Jump time="2021-06-24T05:15:21Z">62</Jump>, respectively.
          Theodore Cervantes, the only currently-active pitcher, was <Jump time="2021-06-29T02:24:07Z">faxed out</Jump>{" "}
          for Anathema Elemefayo, who had also escaped Elsewhere on <Jump time="2021-06-25T03:36:05Z">Day 83</Jump> of
          the previous season. Elemefayo pitched the remainder of Day 12 from Elsewhere, but couldn’t pitch Day 13,
          resulting in a situation dubbed “The Faxrifice” after the Tacos’ Season 7 “
          <Jump redirect="/leaderboard" season={7} day={99}>
            Snackrifice
          </Jump>
          .”
        </p>
        <p>
          In order to adhere to ILB Rules, the Millennials were given a baby. Officially named Pitching Machine, but
          dubbed “Lil Pitchy” to differentiate it from the now-Vaulted Pitching Machine, it pitched four innings by
          mostly walking players. Beck Whitney, batting for the <Link href="fridays">Hawaiʻi Fridays</Link>, advanced
          off Lady Matsuyama’s sacrifice, sending Lil Pitchy{" "}
          <Jump time="2021-06-29T03:23:18Z">back through the Fax Machine</Jump> and returning Cervantes to the mound.
          During the game, Mills fans hosted an impromptu baby shower on behalf of its parents, Cervantes and the Fax
          Machine, and fans from all over the ILB brought gifts for the new baby, the darling of the league, now safe in
          the New York shadows.
        </p>
      </Entry>
      <Entry title="The New York Perennial Bridesmaids" season={22} day={116}>
        <p>
          The Millennials continued their tradition of strange playoff entrances, making it into the Underbracket purely
          because the <Link href="moist-talkers">Canada Moist Talkers</Link>, whose qualification would knock the Mills
          out, received the Overbracket Wild Card. The Millennials’ Season 21 playoff birth, Munro Tumblehome, made an
          impression when they voicemailed for longtime Millennial star Sandie Turner and carried the team through the
          Underbracket into the finals against the <Link href="dale">Miami Dale</Link>.
        </p>
        <p>
          During the finals, the Millennials took the Dale to a 2-2 series of unwon games, and it looked like the Mills
          might pull off a championship after all. Unfortunately, Anathema Elemefayo and Clare Ballard II wanted to
          non-lose at any cost, stealing <Jump time="2021-07-03T23:18:31Z">two</Jump>{" "}
          <Jump time="2021-07-03T23:23:02Z">runs</Jump> from the Dale through Battin’ Island’s tunnels, and allowing
          Miami to lose the game and unwin the Underbracket Internet Series. This marked the third time the Millennials,
          perennially knocked out in the Wild Card round, made it to the Internet Series only to falter; their first two
          attempts were{" "}
          <Jump season={3} day={109}>
            Season 3
          </Jump>{" "}
          and{" "}
          <Jump season={4} day={110}>
            Season 4
          </Jump>
          , both lost to the Hades Tigers.
        </p>
      </Entry>
      <Entry election={22} title="The Law of Take Backsies and The Sim’s Sense of Humor">
        <p>
          The Season 22 Election brought with it a couple of problems. For starters, Castillo Turner and Chorby Short
          had partied within Equivalent Exchange range of each other once again, promising another season of the New
          York-<Link href="flowers">Boston</Link> Exchange Program. During the{" "}
          <Jump election={17}>Season 17 Election</Jump>, the Millennials spent two Wills on Short. The first reformed
          her Instability to Friend of Crows, and the second used her inflated star count to trade for Castillo Turner
          of the Boston Flowers, a very large and very powerful cactus. Castillo Turner then partied out of Equivalent
          Exchange range and would remain in New York until the <Jump election={20}>Season 20 Election</Jump> when the
          Flowers reversed the swap. Short and Turner would once again travel between Boston and New York as a result of
          the <Jump election={21}>Season 21 Election</Jump>, with Short in Boston and Turner in New York.
        </p>
        <p>
          The Strange Attractor Blessing, which would randomly recruit a player with Attractor to the team, appearing on
          the ballot complicated things. As one of only a few available Attractors, Chorby Short had a decent chance of
          not being in New York after the Election. Furthermore, the Flowers planned to attempt a yo-yo with their extra
          Will: A Roster Swap to move Short to the shadows, an Equivalent Exchange to trade Short and Turner, and a Move
          to return Short to the shadows once more. This would leave Short safe from Attractor and end the New
          York-Boston Exchange Program. The only other risk to the Flowers’ plan was the Gachapon Blessing, where one
          team would get a random player from the other 23 teams’ shadows.
        </p>
        <p>
          There was nothing the Millennials could do to guarantee keeping either player, so the fans looked elsewhere
          and found Beck Whitney who, thanks to a party late in the season, was now within Equivalent Exchange star
          range of Turner. Whitney, batting for the <Link href="fridays">Hawaiʻi Fridays</Link> at the time and a
          superstar in her own right, had faxed the Mills’ new baby, Lil Pitchy, earlier this season. Another looming
          problem for the Millennials was Under Taker, a Blessing which would recruit a random player with Undertaker to
          the team that won it. One of the few potential targets of Under Taker was Thomas Dracaena, beloved longtime
          Mills slugger who fans insisted was a normal human man and not a vampire. The decision was made to Reform
          Undertaker, fully knowing it could potentially roll into Unstable.
        </p>
        <p>
          Despite the anxiety, the Election fired without a hitch for the Mills: Castillo Turner was traded for Beck
          Whitney and Undertaker rerolled&hellip; into Siphon. Thomas Dracaena, who was not a vampire, could now legally
          drink blood during Blooddrain. The Flowers’ yo-yo worked, with both Chorby Short and Castillo Turner in the
          shadows, where Turner was immediately taken at random by the <Link href="garages">Seattle Garages</Link>,
          winners of Gachapon. Short would fax out of the shadows on{" "}
          <Jump time="2021-07-19T17:12:12Z">Season 23, Day 3</Jump> before stealing the Super Roamin’ Fifth Base on{" "}
          <Jump time="2021-07-19T22:20:31Z">Day 8</Jump> and Roaming off the Flowers on{" "}
          <Jump redirect="/player/a3947fbc-50ec-45a4-bca4-49ffebb77dbe" time="2021-07-19T23:30:00Z">
            Day 9
          </Jump>
          . Her first tour stop? New York. This was the funniest end to the funniest season the Millennials had during
          Beta.
        </p>
      </Entry>
      <Entry
        date="Season 24, Day 59"
        title="The Millennials Kill the Economy"
        season={24}
        day={59}
        time="2021-07-29T03:27:44Z"
      >
        <p>
          On the material plane, there’s a genre of hit piece that blames millennials for the deaths of several
          industries. On the immaterial plane, the New York Millennials took that challenge seriously, nullifying three
          rules with Black Hole (Black Hole). On <Jump time="2021-07-28T01:22:05Z">Day 34</Jump>, Thomas Dracaena
          nullified Fairgrounds. Sandie Turner and Schneider Bendie nullified Sun 30 on{" "}
          <Jump time="2021-07-28T11:23:56Z">Day 43</Jump>. On Day 59, the prophecy was fulfilled when Thomas Dracaena
          nullified All You Can Eat, the Decree which inflated snack payouts the fewer Snack Slots a fan had. All You
          Can Eat was behind the economic boom seen after Season 15, where fans would regularly accrue multiple millions
          of coins in a season. With that now gone, the Millennials officially killed the economy. Perfect for a team
          who regularly chants “Fuck Capitalism, Steal Home!”
        </p>
      </Entry>
      <Entry
        date="Season 24, Day 76"
        title="Schneider Bendie Crank Calls Kennedy Loser"
        team="8d87c468-699a-47a8-b40d-cfb73a5660ad"
        time="2021-07-29T21:21:22Z"
      >
        {/*  */}
        <p>
          The Millennials had been Hall-bound when teams took flight on the Map, bumping up against the Pulsar (Pulsar)
          and being welcomed into the Hall of Flame. Getting the chance to reunite with Season 1 original Mills Winnie
          Mccall, Wesley Dudley, and Mclaughlin Scorpler was worth the trip. Once the Monitor quit, the teams near the
          Hall went Rogue. Among them, the Millennials, always committed to the bit, said “guess we’ll die” with a
          shrug. Schneider Bendie, emboldened by their nullification of Sun 30, would inhabit Haunted{" "}
          <Link href="crabs">Baltimore Crabs</Link> batter Kennedy Loser while{" "}
          <Jump season={24} day={76}>
            the Mills played the Lovers
          </Jump>
          . This marked the first time an active player inhabited another active player and marked another law Schneider
          Bendie would break.
        </p>
      </Entry>
    </History>
  );
}
