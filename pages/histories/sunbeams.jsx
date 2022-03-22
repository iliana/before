/* eslint-disable no-unused-vars */
import Link from "next/link";
import { Reader } from "../../components/being";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([]),
    },
  };
}

export default function Page() {
  return (
    <History authors="dasyuridae, iznj, KT Ellen, licomice, Luquos, and Olive">
      <Entry title="The Hellmouth Opens" date="Season 1 Election">
        <p>
          The Season 1 Election may have been small, but it packed a punch: A pitcher died, Blessings were won,
          players were traded. Moab, home of the Moab Sunbeams, was swallowed by the Hellmouth. In-game, this event
          changed nothing but the name of the team, but it became the foundation for the Sunbeams’ home, lore, identity,
          and narratives moving forward. The players may have mostly forgotten Moab, but the fans never did.
        </p>
      </Entry>
      <Entry title="Big Sips, Big Hits" date="Season 3, Day 2" time="2020-08-03T17:20:46Z">
        <p>
          The Sunbeams were lucky to make it through Season 2 without experiencing any of the sixteen Incinerations that
          occured. However, that luck would soon run out when they were subject to the first incineration of Season 3
          only two days in. The team’s best player, 4-star batter Rhys Trombone, was Incinerated, replaced by 1-star
          Dudley Mueller. After seasons of mediocrity, Dudley swallowed a peanut on{" "}
          <Jump time="2020-09-24T14:22:17Z">Season 8, Day 71</Jump>, and had a yummy reaction, followed by it becoming a
          Siphon in the <Jump election={9}>Season 9 Election</Jump>. Throughout Season 10, Dudley Siphoned players seven
          times, partied twice, and benefitted from the Tacos’ Sharing Signs Blessing won in the{" "}
          <Jump election={10}>Season 10 Election</Jump>, making it the team’s first 5-star player.
        </p>
      </Entry>
      <Entry title="2 Incin 2 Furious" season={3} day={23}>
        <p>
          The Hellmouth Sunbeams and <Link href="jazz-hands">Breckenridge Jazz Hands</Link> had the unfortunate pleasure of sharing Blaseball’s first
          game with more than one Incineration on Season 3, Day 23, when Sunbeams batter{" "}
          <Jump time="2020-08-04T17:15:49Z">Velasquez Meadows</Jump> was Incinerated mere innings after Jazz Hands
          pitcher <Jump time="2020-08-04T17:07:15Z">Ogden Mendoza</Jump>. While double Incinerations were rare in Beta,
          the two teams decided once wasn’t enough and, ten seasons later,{" "}
          <Jump time="2021-03-12T19:16:41Z">Combs Estes</Jump> of the Jazz Hands and{" "}
          <Jump time="2021-03-12T19:30:54Z">Sutton Bishop</Jump> of the Sunbeams were both Incinerated on Season 13, Day
          98, only the third instance of a game with multiple Incinerations without Unstable players.
        </p>
      </Entry>
      <Entry title="The Precog Trio" election={4}>
        <p>
          The Sunbeams won their first Blessing during the Season 4 Election: The hotly contested Precognition, which
          granted Randall “Randy” Marijuana, Emmett Internet, and Nagomi Nava with a 20% hitting boost. Tragically, the
          team barely got to enjoy the fruits of their victory before Emmett’s Incineration on{" "}
          <Jump time="2020-09-04T10:17:22Z">Season 5, Day 91</Jump>, followed by Randy’s Feedback to the <Link href="jazz-hands">Jazz Hands</Link> on{" "}
          <Jump time="2020-09-09T11:01:43Z">Season 6, Day 44</Jump>, and subsequent Incineration{" "}
          <Jump time="2020-09-11T03:13:59Z">40 days later</Jump>. The swift loss of two favorites led to fears of a
          “Precog Curse” and concerns that Nava would soon suffer the same fate. Instead, she became a Fire Eater during
          the <Jump election={9}>Season 9 Election</Jump>, and, on{" "}
          <Jump time="2020-10-12T16:03:27Z">Season 10, Day 1</Jump>, became the first player to swallow a Rogue Umpire’s
          fire. Randy and Emmett were later resurrected and Released as players on the Hall Stars, prompting speculation
          that they had known their fates all along.
        </p>
      </Entry>
      <Entry title="Walking on Sunshine" election={8}>
        <p>
          During the Season 8 Election, the Sunbeams won Base Instincts, a team Modification that gave batters a chance
          to draw walks past first base. Sunbeams fans embraced the walking lifestyle, going all in at every opportunity
          they could to boost their players’ walking prowess. This has led to moments such as Nagomi Nava walking three
          runners in at once on <Jump time="2020-10-06T16:14:08Z">Season 9, Day 25</Jump>, and the fans choosing to pull
          Paula Reddick and hir high Moxie from the shadows during the <Jump election={15}>Season 15 Election</Jump>.
          Additionally, Hendricks Richardson became the first player to combine Blood abilities when, on{" "}
          <Jump time="2021-04-23T11:21:50Z">Season 17, Day 91</Jump>, he echoed the <Link href="spies">Houston Spies’</Link> Psychic Blood and
          convinced the umpire to allow a walk, then triggered Base Instincts, allowing Richardson to continue on to
          second. The Sunbeams were consistently on the walks leaderboard during Beta, with Nagomi Nava becoming the
          first player to record 1,000 walks on <Jump time="2021-07-22T12:10:59Z">Season 23, Day 69</Jump>.
        </p>
      </Entry>
      <Entry title="Hendricks Richardson Hit a Ground Out to Joshua Butt" season={9} day={100}>
        <p>
          During the first game of Postseason 9, Sunbeams batter Hendricks Richardson hit a ground out to
          <Link href="firefighters">Firefighter</Link> Joshua Butt, distorting time itself. In those seven minutes spent staring at the game log,
          something happened. The Hellmouth Sunbeams and Chicago Firefighters realized they had an unbreakable bond:
          They had to destroy each other&hellip; or was it something else? They still don’t know, really.
        </p>
      </Entry>
      <Entry title="Moon’s Haunted?" season={10} day={100}>
        <p>
          On track for their worst record ever, the Sunbeams tied the <Link href="fridays">Hawaiʻi Fridays</Link> to be the first teams to enter
          Party Time in Season 10, co-hosting the party with them on the moon. They went on to enjoy their first-ever
          parties, with seven of their players partying. They were then unexpectedly drawn as Wild Cards alongside the
          <Link href="millennials">Millennials</Link>, the first instance of what would become known as the Hellennial Wild Cards. After knocking the
          <Link href="tacos">Unlimited Tacos</Link> out of their first postseason in the Wild Card Round, they were then swept by future champions
          the <Link href="crabs">Baltimore Crabs</Link>. They returned happily to the moon party just in time for it to be swallowed by the Black
          Hole Tot Fox opened early on{" "}
          <Jump season={10} day={113}>
            Day 113
          </Jump>
          , leading to an emergency party evacuation. The collapse of the Sun proved to be a decisive end to the
          Sunbeams’ tumultuous, worst-recorded season of Blaseball.
        </p>
      </Entry>
      <Entry title="The Nut Button" election={10}>
        <p>
          The Season 10 battle for the Nut Button Blessing was fierce, but the Sunbeams ultimately won, curing all of
          their allergic players and giving Sandoval Crossing the Superyummy Modification. Fans were excited until they
          learned Sandy would Underperform in every weather but Peanuts. When Peanut Misters were presented as a
          ballpark renovation in Season 14, it was less appealing than other options offered and fans didn’t build it, a
          decision that would haunt them after <Jump time="2021-03-18T23:00:06Z">Day 79</Jump>, when they discovered the
          Tokyo Fitness Center’s Peanut Mister made Superyummy players Overperform in non-Peanut weathers. Fans resolved
          to get Sandy a Peanut Mister the next time it was offered, which wouldn’t be for seven more seasons. When a
          Peanut Mister was finally offered again to the Sunbeams in Season 22, fans rejoiced and funded it with room to
          spare.
        </p>
        <p>
          Just ignore that <Jump time="2021-07-02T12:26:15Z">Sandy was faxed nineteen days later.</Jump>
        </p>
      </Entry>
      <Entry title="Congratulations [champion]!" season={11} day={120}>
        <p>
          During Season 11, the Sunbeams thrived in the new Black Hole/Sun 2 binary, earning their greatest win-loss
          record to date and giving them an easy road to the postseason. Once there, they left their mark in every round
          they played. During the Wild League Division Series, they shamed the <Link href="spies">Spies</Link>, ending the series 3-&minus;1 and
          advancing after only{" "}
          <Jump season={11} day={103}>
            two
          </Jump>{" "}
          <Jump season={11} day={104}>
            games
          </Jump>
          , before saving their longtime anti-rivals, the <Link href="tigers">Hades Tigers</Link>, from Ascension after winning Game 6 of the Wild
          League Champion Series on Day 115. The team went on to drag out the Internet Series against the <Link href="garages">Seattle Garages</Link> as long as possible with two Black Hole loops, to the point that fans across the league were
          crying out for them to end it. The score was up to 9 runs once again before the Sunbeams’ famously bad pitcher
          “Lone Star” Lars Taylor was able to bring them the win and the title during Game 5 on Day 120.
        </p>
      </Entry>
      <Entry title="Nerd Shoved in a Peanut Locker" date="Season 12, Day 56" time="2021-03-04T00:26:17Z">
        <p>
          Original Sunbeam batter Nerd Pacheco was launched into league-wide relevance during the Expansion Era, despite
          only playing 76 games total. They became one of the first players to be Shelled by a Honey Roasted player when
          Peanut Bong tasted the infinite on <Jump time="2021-03-04T00:26:17Z">Season 12, Day 56</Jump>. Still Shelled,
          Pacheco was traded to the <Link href="tigers">Hades Tigers</Link> during the{" "}
          <Jump election={12} team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            Season 12 Election
          </Jump>
          , then to the <Link href="pies">Philly Pies</Link> during the{" "}
          <Jump election={13} team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Season 13 Election
          </Jump>
          . Despite fans of all three teams chanting to free them, Pacheco set the record for longest time spent Shelled
          while on a team’s active roster. Over five seasons later, Pacheco was pecked free on{" "}
          <Jump time="2021-05-11T20:12:47Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Season 18, Day 28
          </Jump>
          . They had a strong debut, including a perfect game on{" "}
          <Jump season={18} day={90} team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Day 90
          </Jump>
          , only to be hit by the first and only Superallergic peanut reaction in Beta on{" "}
          <Jump time="2021-05-15T05:16:21Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Day 107
          </Jump>
          . With their stats nearly zeroed out, Nerd was{" "}
          <Jump election={18} team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            retired to the shadows
          </Jump>
          .
        </p>
      </Entry>
      <Entry title="Bickle Batter Plan (With a Side of Trebuchets)" election={13}>
        <p>
          During the Expansion Era, the Sunbeams took advantage of newly-introduced Wills and made strides to optimize
          their player positions, starting with original pitcher Eugenia Bickle. A decent pitcher, Bickle’s hitting
          stats were intriguing enough for them to be shadowed for rookie Jayden Wright in the Season 13 Election.
          Bickle was brought back out of the shadows and onto the lineup <Jump election={14}>the next Election</Jump> in exchange for Sigmund
          Castillo. Still, the Sunbeams weren’t done, going on to Shadow Infuse Castillo during the{" "}
          <Jump election={18}>Season 18 Election</Jump>, then again in the <Jump election={19}>Season 19 Election</Jump>{" "}
          while simultaneously bringing them out of the shadows as a pitcher in exchange for Lars Taylor. Armed with new
          trebuchets, the sentient castle became one of the Sunbeams’ all-star pitchers, posting a team-low ERA and WHIP
          in their debut season on the mound, and even{" "}
          <Jump season={21} day={47}>
            out-pitching league legend Castillo Turner
          </Jump>
          . Bickle came into her own by consistently getting on base to be hit in by the lineup leaders “Quadruple H”
          &mdash; Hahn Fox, Hendricks Richardson, Howell Franklin, and Nagomi Nava &mdash; and even leading the league
          in walks in Season 24.
        </p>
      </Entry>
      <Entry title="Don’t Estimate the Beams" season={21} day={100}>
        <p>
          During Season 21, Sunbeams fans were preparing for an Overbracket win. Instead, the team suffered a season of
          small misfortunes that ended with them missing the postseason by tiebreaker alone after losing{" "}
          <Jump season={21} day={99}>
            their final game
          </Jump>{" "}
          to the <Link href="worms">Ohio Worms</Link>. When the Sunbeams were pulled as an Underbracket Wild Card, they surprised everyone by
          sweeping the <Link href="dale">Miami Dale</Link> in just one game thanks to Sun 30. The team continued through the Underbracket to
          finally face their fellow Wild Cards, the <Link href="moist-talkers">Canada Moist Talkers</Link>, in the Underbracket Internet Series. On{" "}
          <Jump season={21} day={113}>
            Day 113
          </Jump>
          , through a combination of Black Hole weather, Sun(Sun), surprisingly poor pitching by Elvis Figueroa, and{" "}
          <Jump time="2021-06-26T20:21:06Z">a beautiful grand slam</Jump> by Talkers hitter Lachlan Shelton, the
          Sunbeams secured two wins in the first game of the series. With one final loss on{" "}
          <Jump season={21} day={114}>
            Day 114
          </Jump>
          , the Sunbeams secured the achievement of being the first team to collect both an Overbracket and
          Underbracket championship title.
        </p>
      </Entry>
      <Entry title="Gatecrash, Groundout, Gooseboss" season={23} day={99}>
        <p>
          Sutton Bishop was Incinerated on <Jump time="2021-03-12T19:30:54Z">Season 13, Day 98</Jump>, the first and
          only Incineration of an active Sunbeam during the Expansion Era. After the announcement of the Semi-Centennial
          during the <Jump time="2021-06-29T17:43:16Z">Season 22 Earlsiesta</Jump>, the fans hatched a plan to see their
          goose again. Fans Idolized Sutton, pushing it above the golden line on the Idol Board before the end of the
          regular season, giving it Ego and <Jump time="2021-07-23T20:03:51Z">naming it an MVP</Jump>. According to
          plan, Sutton was resurrected and played in the <Jump time="2021-07-25T01:58:06Z">Semi-Centennial</Jump> as a
          pitcher for the Rising Stars, only to end up Forged by the Vault Legends, forcing it to remain in the Vault at
          the end of the game. Just when the fans thought their plan had failed, during the{" "}
          <Jump election={23} team="3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e">
            Season 23 Election
          </Jump>
          , the Boston Flowers won a Blessing that traded one of their players with a random Vaulted player. The player
          that was Unvaulted? Sutton Bishop.
        </p>
      </Entry>
      <Entry
        title="The Sunbeams Misunderstand Instructions So Heavily the Coin Dies"
        season={24}
        day={51}
        time="2021-07-28T19:34:01Z"
        redirect="/depth"
      >
        <p>
          From the moment the Map appeared in{" "}
          <Jump time="2021-07-27T18:00:00Z" redirect="/depth">
            Season 24
          </Jump>
          , fans knew where the Sunbeams were headed. Zooming straight across the map, the Beams were the first team to
          reach{" "}
          <Jump time="2021-07-27T18:00:00Z" redirect="/_before/www.blaseball0.com/">
            the Desert
          </Jump>
          , arriving on Day 51. They were rewarded with a cryptic message from the Reader and the complete Scattering of
          the team’s name along with every player on it. Fans of the team, angered by the Coin claiming{" "}
          <Jump time="2021-07-28T19:45:00Z" redirect="/standings">
            their team had been overestimated
          </Jump>
          , listened to only one of the Reader’s multiple{" "}
          <Jump time="2021-07-28T19:34:01Z" redirect="/depth">
            cryptic metaphors
          </Jump>
          : <Reader>charge the mound</Reader>. They immediately turned around and raced back to the center of the map,
          where the Coin was waiting. The rest of the Scattered teams followed close behind in a charge that fans called
          the Desert Bus for Wrath. The Sunbeams struck the coin on <Jump time="2021-07-29T09:00:13Z">Day 65</Jump>,
          Scattering her and setting the stage for her later Incineration.
        </p>
      </Entry>
      <Entry title="Yeehaw, Lil’ Star" season={24} day={88} time="2021-07-30T09:28:46Z">
        <p>
          Lars Taylor started their career in Season 1 as a 0-star pitcher and, by far, the worst player on the team,
          but they stole the hearts of Sunbeams fans nonetheless. He gained the affectionate nickname “No Stars Lars”,
          which became “Lone Star Lars” after gaining a star in the <Jump election={6}>Season 6 Election</Jump>. Taylor
          continued to be terrible at the game, but would occasionally pull off miracles. In the Expansion Era, fans
          gave Taylor their love through the Trust Will in the <Jump election={12}>Season 12 Election</Jump> to give the
          pitcher&hellip; Flippers? A batting Modification.{/* consider reword when glossary function gets added */} During the <Jump election={19}>Season 19 Election</Jump>,
          fans made the difficult decision to Foreshadow Taylor for Sigmund Castillo. There he remained until Season 24,
          Day 88 when, in the midst of the team being Scattered and Blaseball itself being consumed by a Black Hole
          (Black Hole), Taylor surprised fans by clocking in for a Night Shift, taking Paula Reddick spot in the lineup.
          Finally, a chance to use his Flippers.
        </p>
      </Entry>
    </History>
  );
}
