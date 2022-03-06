/* FIXME */ /* eslint-disable no-unused-vars */

import Link from "next/link";
import { Jump } from "../../components/jump";
import { History, Entry } from "../../components/histories";
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

export default function Page({ linescores }) {
  return (
    <History authors="Rudy and Clip Clipperson">
      <Entry date="Season 3, Day 14" title="The First Death of Chorby Soul" jump={{ season: 3, day: 14 }}>
        {" "}
        {/* https://reblase.sibr.dev/game/0af42e9a-7863-41df-80b6-7420bab5900c#6726aa89-f387-6b9f-40b9-5460305ee6a2 */}
        <p>
          To save then-captain Dominic Marijuana from incineration, Chorby Soul threw themself in front of an umpire’s
          fire and chose to burn instead. This would be the first, but not the last, time that an umpire would
          incinerate them. Before this, Soul had cultivated a unique fanbase among Millennials fans, who would chant
          “Chorby Yes!” and “Chorby No!” during games based on their in-game performance.
        </p>
        <p>
          Their legacy lives on, as “Chorby-chanting” commonly rings out around Battin’ Island, as their name is invoked
          as both a blessing and a deliverance for Millennials players. Sandie Turner, Soul’s replacement, would go on
          to become a powerhouse of the Millennials’ batting lineup for seasons to come. Chorby Soul would spend the
          next eleven seasons in the Hall of Flame until they were Plundered by the Seattle Garages in the Season 14
          Election{/* S14 Election results */}.
        </p>
      </Entry>
      <Entry
        date="Season 4, Day 43"
        title="Sophomore Sandie Turner Discovers the 3-Blood Blagonball"
        jump={{ season: 4, day: 43 }}
      >
        {" "}
        {/* https://reblase.sibr.dev/game/92048ee3-9880-4ab7-badf-3c63a4cb2a89#c15ca8a7-14f7-7059-4062-9a70f472befc */}
        <p>
          At the top of the sixth inning, Beasley Gloom, pitching for the Charleston Shoe Thieves, walked Sandie Turner.
          Turner, in eyr sophomore season in the ILB, would then proceed to steal second and third bases before stealing
          home and completing a “Millennials Home Run”, named after the Mills’ chant “F*** Capitalism, Steal Home!” For
          this achievement, ey would discover the 3-Blood Blagonball, the second of such artifacts. An early moment in
          eyr career, this cemented Turner in the hearts of Millennials fans and as a player to watch for seasons to
          come.
        </p>
      </Entry>
      <Entry date="Season 4, Day 108" title="TDHAGOTET" jump={{ season: 4, day: 108 }}>
        {" "}
        {/* https://reblase.sibr.dev/game/53c3e12c-5a94-49ea-9804-4358aee1edb6#73c13473-f56b-d8dd-1a80-f0ef8b3b479e */}
        <p>
          The New York Millennials were poised for a strong playoff showing in Season 4. In the Good League Championship
          Series, they would face their future Blood Donor rivals, the Chicago Firefighters. At the top of the 9th
          inning, Feedback was detected, and Thomas Dracaena hit a ground out to Edric Tosser. Time seemed to stop for
          well over twenty minutes, until it resumed as if nothing had been wrong. Ren Hunter, recently feedbacked from
          the Shoe Thieves, batted Schneider Bendie in for the scoring run, bringing the series to 2-2. It inspired an
          early copypasta still remembered fondly by both teams.
        </p>
      </Entry>
      <Entry date="Season 7, Day 59" title="The Death of Dominic Marijuana" jump={{ season: 7, day: 59 }}>
        {" "}
        {/* https://reblase.sibr.dev/game/ca45dbf1-b465-474b-9490-607eb4d55e98#8aa4ab49-884d-9aca-2021-a08d489ba67b */}
        <p>
          The Millennials had already seen one of their own incinerated in Season 7, when Wesley Dudley was incinerated
          on Day 24
          {/* https://reblase.sibr.dev/game/73f8c8c2-a5ec-423a-aa85-1d810dfc4d4a#aff2bc41-96f0-e637-e74b-73a6c360f427 */}
          , about a week before Ruby Tuesday
          {/* https://reblase.sibr.dev/game/4e3aadf4-ca4f-45c9-a258-446541939704#53b66303-069a-b814-e7a1-5ad8add965b7 */}
          . Dominic Marijuana, who had stepped into the team’s captaincy after Scrap Murphy’s Season 2, Day 40
          {/* https://reblase.sibr.dev/game/995f84d2-ee86-4af6-a81a-45c279aba2d7#d361f824-0745-360c-4d77-4316d6245dc6 */}{" "}
          incineration, was the beloved core of the New York Millennials lineup.
        </p>
        <p>
          Squaring off against recently revived Seattle Garages pitcher Jaylen Hotdogfingers on Day 55
          {/* https://reblase.sibr.dev/game/97f3d301-d134-48ee-b835-b53c63cdee97#65abdc68-8195-2902-56fc-9b68935100da */}
          , Marijuana was hit by a rogue pitch and became Unstable. It would be a long week until Day 63 and
          unfortunately, with Solar Eclipse in the forecast, Dom wouldn’t make it. Less than a season after his
          brother’s incineration on Day 84 of Season 6
          {/* https://reblase.sibr.dev/game/c8eb9f92-5f9e-444f-9ad4-e679a58a10bd#16750f9f-1ef9-d908-5ad9-c5f9a4a1fba7 */}
          , Dom would join Randy, a beloved batter for both the Hellmouth and Breckenridge, in the Hall of Flame.
        </p>
        <p>
          For Millennials fans, no player loomed quite as large, and no absence was felt more acutely. Dom was mourned
          and celebrated throughout the league, and the Millennials would never again have a captain. While Dom would be
          a key player on [Day X], and his replacement Charlatan Seabright became a Mills fan favorite, his absence was
          a depressing low in Mills history.
        </p>
      </Entry>
      <Entry date="Season 8, Day 18" title="Red Hot!" jump={{ season: 8, day: 18 }}>
        {/* https://reblase.sibr.dev/game/0e259fa8-8b32-4373-add1-9a8a084882c7#f55d569c-0c81-62da-80c1-f91f723b3f3c */}
        <p>
          In the Season 7 election{/* S7 election results */}, the New York Millennials won the Hot Sauce Packet
          blessing with 2% of the vote, making Sandie Turner Spicy. During this game against the Baltimore Crabs, Turner
          got three consecutive hits, turning em Red Hot! for the first time. The phrase “Sandie Turner is Red Hot!” is
          immortalized as part of the Mills Cycle, a graph measuring the team’s collective hubris over the course of a
          typical season. It marks a time in the first half of the season when the Millennials are playing well and the
          fans are confident in the team’s postseason chances, and is followed by “Sandie Turner is no longer Red Hot!”
          when the team inevitably falters.
        </p>
      </Entry>
      <Entry date="Season 8, Day 61" title="Patty Fox’s Third Miracle" jump={{ season: 8, day: 61 }}>
        <p>
          Despite never being the Millennials’ strongest pitcher, Patty Fox had always been a bit of a miracle worker.
          Fox became the first pitcher with multiple confirmed immaculate innings, both of which occurred during Season
          3: striking out Isaac Rubberman, Hotbox Sato, and Margarito Nava of the Boston Flowers on Day 47, and Bevan
          Wise, Richardson Turquoise, and future teammate Penelope Mathews of the Yellowstone Magic on Day 77. On Season
          5, Day 22, she famously “paid the debt”, pitching a shutout against the Charleston Shoe Thieves and buying the
          lineup enough time to work their way out of a 4-run deficit inflicted by Targeted Shame. The Millennials would
          go on to win that game 2-0.
        </p>
        <LineScore {...linescores["047aaf44-329b-4237-8f2e-40a4eeae1ba8"]} />
        <p>
          She performed her third miracle when she pitched the first recorded perfect game in Blaseball’s history
          against the Boston Flowers. For her achievement, she discovered the 9-Blood Blagonball, the fourth of such
          artifacts and the second for the team.
        </p>
        <LineScore {...linescores["c8acdfe9-d981-46ba-b202-e977c99b8a4c"]} />
      </Entry>
      <Entry date="Season 10, Day X" title="Dominic Marijuana Baja Blasts God">
        {" "}
        {/* https://reblase.sibr.dev/bossfight/9bb560d9-4925-4845-ad03-26012742ee23 */}
        <p>
          Day X was a momentous day in the history of the ILB, with the return of beloved players under the banner of
          the Hall of Flame and the defeat of the Shelled One at their hands. Every team had a personal connection to
          the events of that game, and the Millennials were no exception.
        </p>
        <p>
          They had two former captains return as members of the Hall Stars: Scrap Murphy and Dominic Marijuana. Murphy,
          the Millennials’ captain when Blaseball returned in Season 1, was an early casualty on Season 2, Day 40
          {/* https://reblase.sibr.dev/game/995f84d2-ee86-4af6-a81a-45c279aba2d7#d361f824-0745-360c-4d77-4316d6245dc6 */}
          . He replaced Sebastian Telephone mid-game when Telephone was incinerated a second time
          {/* https://reblase.sibr.dev/bossfight/9bb560d9-4925-4845-ad03-26012742ee23#f9538c60-83bb-8b6c-6720-3d666594cb75 */}
          . Over the course of the game, Marijuana, Murphy’s successor, hit three home runs against THE SHELLED ONE’S
          PODS, the final of which
          {/* https://reblase.sibr.dev/bossfight/9bb560d9-4925-4845-ad03-26012742ee23#bddd9a75-9259-451a-066f-a52b01924d6f */}{" "}
          dealt 2,039,516 damage to THE PODS and ended the game, adding Blaseball Gods to the list of industries the
          Millennials are proud to have helped kill.
        </p>
      </Entry>
      <Entry date="Season 10 Elections" title="An Actual Airplane and some BIRD SEED">
        {/* S10 election results */}
        <p>
          By the Season 10 election, things were looking up. The return and subsequent release of beloved former captain
          Dominic Marijuana did much to buoy the spirits of a team who sorely missed him. To top it all off, the
          Millennials managed to win two blessings this election. The first, An Actual Airplane, equipped Mills slugger
          Thomas Dracaena with Blaserunning which allowed him to score the first recorded fractional run in ILB history
          on Season 11, Day 48
          {/* https://reblase.sibr.dev/game/06bc5009-8f12-42fa-bf63-2e38d406d2d0#35bf94b9-d72b-8bef-9029-9c442f7a3745 */}
          .
        </p>
        <LineScore {...linescores["06bc5009-8f12-42fa-bf63-2e38d406d2d0"]} />
        <p>
          Dracaena’s baserunning stat was a paltry 1.02 stars at the time of the election, but would be boosted to 2.25
          stars as part of the compensation owed from the verdict of{" "}
          <i>New York Millennials vs. Parker MacMillan III and That Coin, Probably</i> where the Coin was found guilty
          of wire fraud for failing to redistribute the top 1% of players’ wealth after Season 10, as per Season 3’s Eat
          The Rich decree.
        </p>
        <p>
          The team also won the Bird Seed blessing which, during Beta, never came into effect, as no Millennials player
          was Shelled while an active player. Despite this, fans of the Millennials profess their undying love for the
          modification by chanting “BIRD SEED”, with many line breaks between the two words.
        </p>
      </Entry>
      <Entry date="Season 15, Day 86" title="Sandie Turner’s Red Hot! Season" jump={{ season: 15, day: 86 }}>
        {" "}
        {/* https://reblase.sibr.dev/game/99c333a6-5667-432c-a748-a4d2805aef3d#1bb2a34b-f441-6743-9fa6-594de101ed0b */}
        <p>
          During Season 15, the Millennials were hungry for a championship ring, and they looked unstoppable. Theodore
          Cervantes, the Mills’ star pitcher, topped the season’s pitching charts, boasting the lowest ERA, hits per 9
          innings, and home runs per 9 innings, and was in a seven-way tie for third place with five shutouts. Mills
          fans cheered its pursuit of TERMINAL VELOCITY with “Get Cerved!”
        </p>
        <p>
          However, no one had a better season than Sandie Turner. Turner, Infused in the Season 12 election
          {/* S12 election results */}, ended this season with the highest batting average, on-base percentage, slugging
          percentage, and number of total bases. On Day 86, ey also broke the ILB’s single season home run record with
          eyr 48th, finishing the season with 53 total home runs. Turner’s record remained in place until it was broken
          by the Tacos’ Mcdowell Mason on Season 18, Day 60
          {/* https://reblase.sibr.dev/game/62e8477a-7dee-4c47-9660-994f943c9a92#c260fb9f-5c7d-b8a3-fa25-cb9066bb7988 */}
          .
        </p>
        <p>
          Among fans, the common explanation of the team’s stellar performance was “Mills Mad!”, due to a series of
          setbacks that occurred throughout the season. These included the redactions of Peanut Holloway
          {/* post-redaction player card */} and Ren Hunter{/* post-redaction player card */} on Day 15 and a series of
          nine devastating Consumer attacks which plagued the team, injuring Fynn Doyle
          {/* https://reblase.sibr.dev/game/f15ace24-7fae-46f2-b16e-c18bb4bd630f#9006f7c8-0ef4-d65f-210e-f63e1d6b0a7c */}
          , Andrew Solis
          {/* https://reblase.sibr.dev/game/dc564ff6-6973-4292-9cd1-b09f8dce688b#89410e1a-0f81-751c-6876-c0e49d7be234 */}
          , Winnie Mccall
          {/* https://reblase.sibr.dev/game/9c485309-aef3-4d55-a33d-b93cf45255f9#1369e075-d432-01cc-4b41-53f542f1baab */}{" "}
          (twice
          {/* https://reblase.sibr.dev/game/f2f0ba6f-46f0-4011-b76a-3780d8efe7fb#d0b766ff-b861-127c-01dc-eaccc8b54efa */}
          ), Uncle Plasma
          {/* https://reblase.sibr.dev/game/5a42ce29-a2c4-4cf0-aa98-15247deafea7#bdcd2f48-e893-d0ee-4158-1b03b85298fd */}
          , Glabe Moon
          {/* https://reblase.sibr.dev/game/c5c0f30f-8a91-4609-ad8d-7bd42f6512b6#e9aa19d1-786c-58cf-53cf-a91a78ef2867 */}
          , Thomas Dracaena
          {/* https://reblase.sibr.dev/game/24632d6a-7f5c-4e39-bb87-034b03f7aab0#22e2e146-d670-0a5f-1235-0b60d138813c */}
          , Theodore Cervantes
          {/* https://reblase.sibr.dev/game/027f022e-eecc-48db-a25e-5dfb01f91c7c#13adbc7e-a432-6fac-d936-637031ac3450 */}
          , and finally Sandie Turner
          {/* https://reblase.sibr.dev/game/af2c2c5c-635a-41a2-9b2c-3aabc393c76c#5f6172f5-46a3-c1fc-9f47-33f78e3f1e9e */}
          . The attacks ultimately ended the Mills’ championship dreams; they would lose the divisional series against
          the eventual Internet Series Champions, the Canada Moist Talkers, and went into the election determined to win
          it all next season.
        </p>
      </Entry>
      <Entry date="Season 16, Day 88" title="The Second Death of Chorby Soul" jump={{ season: 16, day: 88 }}>
        {" "}
        {/* https://reblase.sibr.dev/game/3c455a07-3b01-445b-94ec-197b0b24ad56#b52839d1-6263-c732-ef4d-78153d64e34f */}
        <p>
          The “Mills Mad” furor quickly gave way to “Mills Sad” with the firing of an unexpected Will in Season 15’s
          election{/* S15 election results */}. Chorby Soul, a Millennial since Blaseball’s return, was Plundered back
          to the team, this time as a pitcher, sending Penelope Mathews to the Seattle Garages. In the previous election
          {/* S14 election results */}, Soul had become the fourth player to return from the Hall of Flame saddled with
          Debt. Their return was not a peaceful one. Chorby Soul’s soul was uniquely heavy which plunged their team deep
          into the Immateria and subjected both the team and Soul themself to constant Consumer attacks.
        </p>
        <p>
          In an attempt to avoid further Redactions, the Seattle Garages Reformed Soul’s Debt, unfortunately rerolling
          it into a permanent form of Unstable. Soul’s return to New York was bittersweet. Players and fans alike
          celebrated the return of a Season 1 player while mourning that the team was, quite literally, sharkbait. The
          writing was on the wall when the weather forecast predicted that Chorby Soul would pitch under a Solar Eclipse
          on Day 88. Fans spent the season celebrating Soul’s life, and many woke up early to watch on in sorrow as
          Chorby Soul burned once again. The Millennials’ tragic season would not stop there, however, as Day 92
          {/* https://reblase.sibr.dev/game/e1526e77-8bc5-4e80-8fc3-f90bf93ef0f5#82ac36d3-82e8-ad47-9de8-c522887b037e */}{" "}
          claimed the life of Winnie Mccall, another beloved Season 1 batter, who would follow Soul to the Hall of
          Flame.
        </p>
      </Entry>
      <Entry
        date="Season 22, Day 13"
        title="The Baby Shower Held ‘Round the League: Lil Pitchy’s ILB Debut"
        jump={{ season: 22, day: 13 }}
      >
        <p>
          At the end of Day 12, the Millennials’ rotation was in a tight spot. Sandie Carver and Schneider Bendie both
          escaped Elsewhere the previous season to avoid being caught in Grand Heists on Day 26
          {/* https://reblase.sibr.dev/game/99ab8ba4-5634-490a-9690-e0ea1ac0e398#a29ee1d5-1a4e-fb3e-f7e7-2564e16071b6 */}{" "}
          and Day 62
          {/* https://reblase.sibr.dev/game/b6ac6325-e132-4853-a043-688d8199ce88#55d5bb59-7e0a-cc3e-3855-433aac07ebe7 */}
          , respectively. Theodore Cervantes, the only currently-active pitcher, was faxed out
          {/* https://reblase.sibr.dev/game/7d497126-26e8-4251-8560-9c915f538b89#5ec6c3b2-6d94-c200-71e2-7e50079656c6 */}{" "}
          for Anathema Elemefayo, who had also escaped Elsewhere on Day 83
          {/* https://reblase.sibr.dev/game/9db2044f-83ad-4e53-bd96-6cabaae1df7a#9444377b-af86-b196-f047-5456330f0cc8 */}{" "}
          of the previous season. Elemefayo pitched the remainder of Day 12 from Elsewhere, but couldn’t pitch Day 13,
          resulting in a situation dubbed “The Faxrifice” after the Tacos’ Season 7 “Snackrifice
          {/* S7 idol board final positions */}.”
        </p>
        <p>
          In order to adhere to ILB Rules, the Millennials were given a baby. Officially named Pitching Machine, but
          dubbed “Lil Pitchy” to differentiate it from the now-Vaulted Pitching Machine, it pitched four innings by
          mostly walking players. Beck Whitney, batting for the Hawaiʻi Fridays, advanced off Lady Matsuyama’s
          sacrifice, sending Lil Pitchy back through the Fax Machine
          {/* https://reblase.sibr.dev/game/a8277930-81e9-43e8-bef2-67fa8b5f7bc7#2b399983-0093-5387-b048-00021188bc04 */}{" "}
          and returning Cervantes to the mound. During the game, Mills fans hosted an impromptu baby shower on behalf of
          its parents, Cervantes and the Fax Machine, and fans from all over the ILB brought gifts for the new baby, the
          darling of the league, now safe in the New York Shadows.
        </p>
      </Entry>
      <Entry date="Season 22, Day 116" title="The New York Perennial Bridesmaids" jump={{ season: 22, day: 116 }}>
        <p>
          The Millennials continued their tradition of strange playoff entrances, making it into the Underbracket
          Playoffs purely because the Canada Moist Talkers, whose qualification would knock the Mills out, received the
          Overbracket Wild Card. The Millennials’ Season 21 playoff birth, Munro Tumblehome, made an impression when
          they were Voicemailed for longtime Millennial star Sandie Turner and carried the team through the Underbracket
          into the finals against the Miami Dale.
        </p>
        <p>
          During the finals, the Millennials took the Dale to a 2-2 series of unwon games, and it looked like the Mills
          might pull off a championship after all. Unfortunately, Anathema Elemefayo and Clare Ballard II wanted to
          non-lose at any cost, stealing two
          {/* https://reblase.sibr.dev/game/ff885cba-a54f-4d21-a5f0-002ceebeb8f3#fc8ea782-d21b-d4ae-e215-77494858176f */}{" "}
          runs
          {/* https://reblase.sibr.dev/game/ff885cba-a54f-4d21-a5f0-002ceebeb8f3#5a0dfca0-fd12-36e9-1e4d-25ebd208981b */}{" "}
          from the Dale through Battin’ Island’s tunnels, and allowing Miami to lose the game and unwin the Underbracket
          Championship Series. This marked the third time the Millennials, perennially knocked out in the Wild Card
          round, made it to the Internet Series only to falter; their first two attempts were Season 3
          {/* https://reblase.sibr.dev/game/749a8d03-d3dd-45a9-b361-629074af911d */} and Season 4
          {/* https://reblase.sibr.dev/game/fc4805d7-f44a-4a15-8da2-7b26df5622b3 */}, both lost to the Hades Tigers.
        </p>
      </Entry>
      <Entry date="Season 22 Elections" title="The Law of Take Backsies & The Sim’s Sense of Humor">
        {/* S22 election results */}
        <p>
          The Season 22 election brought with it a couple of problems. For starters, Castillo Turner and Chorby Short
          had partied within Equivalent Exchange range of each other once again, promising another season of the New
          York-Boston Exchange Program. During the Season 17 election{/* S17 election results */}, the Millennials spent
          two Wills on Short. The first reformed her Instability to Friend of Crows, and the second used her inflated
          star count to trade for Castillo Turner of the Boston Flowers, a very large and very powerful cactus. Castillo
          Turner then partied out of Equivalent Exchange range and would remain in New York until the Season 20 election
          {/* S20 election results */} when the Flowers reversed the swap. Short and Turner would once again travel
          between Boston and New York as a result of the Season 21 election{/* S21 election results */}, with Short in
          Boston and Turner in New York.
        </p>
        <p>
          The Strange Attractor blessing, which would randomly recruit a player with Attractor to the team, appearing on
          the ballot complicated things. As one of only a few available Attractors, Chorby Short had a decent chance of
          not being in New York after the election. Furthermore, the Flowers planned to attempt a yo-yo with their extra
          will: A Roster Swap to move Short to the Shadows, an Equivalent Exchange to trade Short and Turner, and a Move
          to return Short to the Shadows once more. This would leave Short safe from Attractor and end the New
          York-Boston Exchange Program. The only other risk to the Flowers’ plan was the Gachapon blessing, where one
          team would get a random player from the other 23 teams’ Shadows.
        </p>
        <p>
          There was nothing the Millennials could do to guarantee keeping either player, so the fans looked elsewhere
          and found Beck Whitney who, thanks to a party late in the season, was now within Equivalent Exchange star
          range of Turner. Whitney, batting for the Hawaiʻi Fridays at the time and a superstar in her own right, had
          faxed the Mills’ new baby, Lil Pitchy, earlier this season. Another looming problem for the Millennials was
          Under Taker, a blessing which would recruit a random player with Undertaker to the team that won it. One of
          the few potential targets of Under Taker was Thomas Dracaena, beloved longtime Mills slugger who fans insisted
          was a normal human man and not a vampire. The decision was made to Reform Undertaker, knowing full well it
          could potentially roll into Unstable.
        </p>
        <p>
          Despite the anxiety, the election fired without a hitch for the Mills: Castillo Turner was traded for Beck
          Whitney and Undertaker rerolled&#8230; into Siphon. Thomas Dracaena, who was not a vampire, could now legally
          drink blood during Blooddrain. The Flowers’ yo-yo worked, with both Chorby Short and Castillo Turner in the
          Shadows, where Turner was immediately taken at random by the Seattle Garages, winners of Gachapon. Short would
          fax out of the Shadows on Season 23, Day 3
          {/* https://reblase.sibr.dev/game/487fcbf2-7822-461b-8cab-8b7d622c4b16#f8ca0e65-928b-de63-bb90-48093ddb33c0 */}{" "}
          before stealing the Super Roamin’ Fifth Base on Day 8
          {/* https://reblase.sibr.dev/game/88c2d078-6791-4c14-b118-f6e56da2370c#2eb7f91c-73f8-bbfb-2d4a-73d0dacf03cf */}{" "}
          and super roaming off the Flowers on Day 9{/* end of day 9 player card */}. Her first tour stop? New York.
          This was the funniest end to the funniest season the Millennials had during Beta.
        </p>
      </Entry>
      <Entry date="Season 24, Day 59" title="The Millennials Kill the Economy" jump={{ season: 24, day: 59 }}>
        {/* https://reblase.sibr.dev/game/25095a7e-0676-43b4-95cd-6c33d72c2e0d#d91a4543-212a-ae40-58e2-18e7404646f0 */}
        <p>
          Here on the Material Plane, there’s a genre of hit piece that blames millennials for the deaths of several
          industries. On the Immaterial Plane, the New York Millennials took that challenge seriously, nullifying three
          rules with Black Hole (Black Hole). On Day 34
          {/* https://reblase.sibr.dev/game/946d7c74-af0f-40f7-9a26-14fa8ad5f532#58f4d923-122a-cd78-91cd-e451bcd90ea2 */}
          , Thomas Dracaena nullified Fairgrounds. Sandie Turner and Schneider Bendie nullified Sun 30 on Day 43
          {/* https://reblase.sibr.dev/game/25095a7e-0676-43b4-95cd-6c33d72c2e0d#d91a4543-212a-ae40-58e2-18e7404646f0 */}
          . On Day 59, the prophecy was fulfilled when Thomas Dracaena nullified All You Can Eat, the Decree which
          inflated snack payouts the fewer Snack Slots a fan had. All You Can Eat was behind the economic boom seen
          after Season 15, where fans would regularly accrue multiple millions of coins in a season. With that now gone,
          the Millennials officially killed the economy. Perfect for a team who regularly chants “F*** Capitalism, Steal
          Home!”
        </p>
      </Entry>
      <Entry date="Season 24, Day 76" title="Schneider Bendie Crank Calls Kennedy Loser" jump={{ season: 24, day: 76 }}>
        {/* https://reblase.sibr.dev/game/63069471-d63a-4e3c-a61d-e44ba329933d#864f8a7c-19a7-4cfd-313c-2ac6768eaf58 */}
        <p>
          The Millennials had been Hall-bound when teams took flight on the Map, bumping up against the Pulsar (Pulsar)
          and being welcomed into the Hall of Flame. Getting the chance to reunite with Season 1 original Mills Winnie
          Mccall, Wesley Dudley, and Mclaughlin Scorpler was worth the trip. Once the Monitor quit, the teams near the
          Hall went Rogue. Among them, the Millennials, always committed to the bit, said “guess we’ll die” with a
          shrug. Schneider Bendie, emboldened by their nullification of Sun 30, would inhabit Haunted Baltimore Crabs
          batter Kennedy Loser while the Mills played the Lovers
          {/* https://reblase.sibr.dev/game/bf969bd5-879b-4942-ae7b-4ac568265673 */}. This marked the first time an
          active player inhabited another active player and marked another law Schneider Bendie would break.
        </p>
      </Entry>
    </History>
  );
}
