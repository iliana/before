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
        "34ef84d9-77f7-4b3a-a92d-6d5b9120f80b",
        "f7ad7826-ca6e-49c2-818e-190408b046fe",
        "cfd4f578-84f3-4078-a4f5-60103338c82a",
        "4f63ec6a-094c-44d2-945d-1325b1f61ad3",
        "47bcac42-f651-4fc9-9f93-5567a7b10daf",
        "fb88756a-6aa1-4ec5-b988-0a1285e045f3",
        "3d953e88-5749-4b1b-822b-336d4e3d01b5"
      ]),
    },
  };
}

export default function Page({ linescores }) {
  return (
    <History authors={"fionna adams, Riley \"Navi\" Murphy, squirrel, and Leo Mathonwy"}>
      <Entry date="Season 3, Day 80" title="The Incineration of Unremarkable Derrick Krueger" jump={{ season: 3, day: 80 }}>{/* insert data */}
        <p>
          Season 3 lit the Garages' roster on fire. Bennett Browning was incinerated on Day 4 {/* https://reblase.sibr.dev/game/702e2592-d472-4f19-aa5c-fe72d8129aa3#365fbd82-b3c9-979f-3e41-fab5b6aa8a61 */}, replaced by the beloved Tiana Cash, who would be incinerated on Day 47 {/* https://reblase.sibr.dev/game/2762a0d1-d40f-4ff2-8647-eb91242a4b16#92dda187-c6f9-5cb4-28fd-206c489e7a79 */}. Shaquille Torres was incinerated on Day 74 {/* not in Reblase */}. The final incineration for the Garages this season would be Derrick "Klutch" Krueger, Jaylen Hotdogfingers' replacement, tying the Garages with the Charleston Shoe Thieves for the most incinerations this season. Most importantly, however, Krueger's death was the final push the fans needed to realize that Mike Townsend was not a disappointment, but a credit to the team.
        </p>
      </Entry>
      <Entry date="Season 6, Day 108" title="The Garages Suck, or: The Garages are Okay+" jump={{ season: 6, day: 108 }}>
        <p>
          After a season spent deliberating over Jaylen Hotdogfingers' necromancy, fans were excited for the Garages' first postseason appearance, hoping that the star pitcher could be resurrected to a team with one championship under their belt. Instead, the Garages were swept by the Baltimore Crabs, beginning a long history of the Garages choking in the postseason.
        </p>
          <LineScore {...linescores["34ef84d9-77f7-4b3a-a92d-6d5b9120f80b"]} />
        <p>
          Season 7 saw the Garages win their first game {/* https://reblase.sibr.dev/game/71b101ae-d358-4e6e-a965-d6c3768ffba3 */} in the Mild League Championship Series against Mexico City, before the Wild Wings won the next three. The Pies swept the Garages in Season 8's divisional series{/* https://reblase.sibr.dev/game/cd373188-a8b2-48d1-9655-55655df771c6 */}, and the Shoe Thieves beat the Garages in 4 during Season 9's MLCS {/* https://reblase.sibr.dev/game/a91eddfd-418a-4c9a-84a1-05e967869158 */}. Season 11 saw the Garages in the Internet Series {/* https://reblase.sibr.dev/game/4f63ec6a-094c-44d2-945d-1325b1f61ad3 */} once again, caught in Sun 2 and Black Hole’s loops before losing to the Hellmouth Sunbeams in 5 games, but with only 4 wins between them. In Season 12, the Garages made it to game 5 {/* https://reblase.sibr.dev/game/0f19d78d-c27d-4146-863d-b55e6dae1679 */} against the Hades Tigers before being crushed, 2-7. While the next two seasons saw the Garages in the middle of the league, Season 15 saw the team's record drop like a rock in a sea of immateria. Seattle hosted Party Time for the first time that season, finishing the season with a record of 25-74{/* S15 post-day 99 standings */}.
        </p>
        <p>
          The team's record never went above 0.500 for the rest of the Expansion Era, even when they next entered the postseason in Season 19. Due to Turntables, teams with the lowest scores in a regular season game would win their games, seeing the Garages second in the league behind the Wild Wings{/* S19 post-day 99 standings */}. The postseason was under regular scoring, however, and the Garages made it to the Internet Series once again, before losing in game 5 {/* https://reblase.sibr.dev/game/f7ad7826-ca6e-49c2-818e-190408b046fe */}to the Tokyo Lift. The Garages' only run during this game was via the Home Field Advantage modification, and Terrell Bradley, the starting pitcher, showed true dedication to the Garages' tradition of choking and gave up 10 runs{/* https://reblase.sibr.dev/game/f7ad7826-ca6e-49c2-818e-190408b046fe#a4ce4994-bf51-8979-b839-fa96edee55b9 */}, faxing out for Nolanestophia Patterson. Patterson would throw one pitch that game, to Silvaire Semiquaver, who hit it right into Alaynabella Hollywood’s glove for the third out of the top of the 9th.
        </p>
        <LineScore {...linescores["f7ad7826-ca6e-49c2-818e-190408b046fe"]} />
        <p>
          Seattle would host Party Time the next two seasons, which also meant appearances in the Underbracket, a separate postseason tournament for the worst-performing teams, where the lowest scoring teams would win their games. Even here, the Garages failed to perform; they couldn't perform well enough in the regular season to make it to the Overbracket, but they were too good to lose to other teams and take the Underchampship. The Garages, as fans began to say, were "okay+."
        </p>
      </Entry>
      <Entry date="Season 8, Day 56" title="Expand Band" jump={{ season: 8, day: 56 }}>{/* https://reblase.sibr.dev/game/3dc0e14a-e1ed-4109-a199-efdd4971ffea#a35c237e-8e5c-0e58-977f-99174690a59c */}
        <p>
          When most people think of the effects Jaylen Hotdogfingers had on the league, they remember her Season 7 instability debt, her world tour, or her stint on the Pods and Hall Stars. Ask the Garages, however, and you might get a different answer: Season 8. After Season 7, Jaylen saw her debt Refinanced, and her pitches marked players as more likely to feedback, instead of facing incineration.
        </p>
        <p>
          While the Garages managed to escape Season 7 unscathed, they took a huge hit this season, with a total of 5 lost to the feedback. Seeing Lang Richardson, an original Garage, go to the Pies on Day 21 {/* https://reblase.sibr.dev/game/ef8467c7-f9cf-4b8f-be68-216fd3f62852#63c7263d-c426-2f6f-0fdf-765415378eb9 */}in exchange for Nolanestophia Patterson stung, and there was a tragic irony in Cedric Spliff swapping for Quack Enjoyable, noted replacement of Kiki Familia, on Day 42{/* https://reblase.sibr.dev/game/f3a353d3-8592-482b-b383-b014df0c5a60#fc4ad38a-bb41-9b95-fd43-2655bbeab247 */}. It wasn't until the feedback of fan favorite Allison Abbott for Paula Mason on Day 56 that Garages fans reassessed and changed their tune internally.
        </p>
        <p>
          The stance on Discord changed from the age old motto "Don't break up the band" to "Once a Garage, always a Garage" and "Expand Band," notions that would carry them to the end of the Expansion Era to ease the pain of the many players they would come to lose. Season 8 wasn't done with them yet, however, as Paula Mason swapped for Paula Turnip on Day 71{/* https://reblase.sibr.dev/game/e092a120-435a-44bb-803a-ebe9d7c87619#c6ceb06b-7c52-6d9c-2712-d9a1ee1edf47 */}, and finally Farrell Seagull for Summers Pony on Day 102{/* https://reblase.sibr.dev/game/4811a890-02b1-436a-be28-9be8d53613b5#750c360c-19d4-1ea9-1915-2099a246678a */}.
        </p>
      </Entry>
      <Entry date="Season 9, Day 7" title="Jaylen Hotdogfingers' World Tour" jump={{ season: 9, day: 7 }}>{/* https://reblase.sibr.dev/game/22ce4d81-a283-46b4-8787-8dce1de75fbe#0ca00320-6a8d-af2e-02f1-9a14bbb8dc83 */}
        <p>
          Though she’s known forever as a Garage, Jaylen Hotdogfingers traveled the league extensively due to her permanent Flickering modification, acquired via Season 8's idol board{/* S8 idol board final positions */}. She first traveled to Philadelphia on Day 7, swapping with the Pies' Betsy Trombone. She returned on Day 21{/* https://reblase.sibr.dev/game/adde79a8-06fd-431e-a1d9-7aa4ced53755#5af3d0dd-1cb1-b9b7-0995-d124ab1fcd87 */} in exchange for Henry Marshallow, before crossing the border to Canada on Day 53{/* https://reblase.sibr.dev/game/b74fd813-11b7-4de9-81c3-881546071b06#269afe3d-b510-9249-79fa-643fc981497e */} to swap places with the Moist Talkers' Ortiz Morse. On Day 64{/* https://reblase.sibr.dev/game/9ff421ce-f25c-4c0e-8d93-f05c1bae2977#8dcbabe7-9cc2-e34a-3849-d3b80d680646 */} , she went to the Charleston Shoe Thieves, sending back Beasley Gloom. Though her Flickering became Fliickerrriiing during Season 10 {/* S10 idol board final positions */}, she landed on the San Francisco Lovers after the disbanding of THE SHELLED ONE'S PODS and played Season 11 on only one team, due to a lack of Feedback weather.
        </p>
        <p>
          Season 12 saw her world tour continue, going from the Lovers to the Yellowstone Magic on Day 12{/* https://reblase.sibr.dev/game/1430732d-3489-4306-9cf0-039e7e0ecba8#77185dfa-5e47-6028-18f1-ad65ac5f8c8a */} for Yeong-Ho Garcia, the Hawai’i Fridays on Day 56{/* https://reblase.sibr.dev/game/de8676e2-0b77-4a52-9349-928757c24289#fa023705-2393-0945-2953-b6ee018328bc */} for James Mora, the Core Mechanics on Season 13, Day 28{/* https://reblase.sibr.dev/game/8932e26a-8dbf-4516-b70e-e31606016c55#47a80de3-bc7e-a01e-8dec-7dac318503a8 */} for Lizzy Pasta, and back to Seattle on Day 64{/* https://reblase.sibr.dev/game/a351f1c9-7890-45ce-bb8a-86f4901006e3#25ebf0ae-f2ec-5a06-35c3-340dc35b3674 */} for Mindy Kugel. Fans elected to move Hotdogfingers to the Shadows, before she returned in Season 15's election{/* S15 election results */}. The next leg of her world tour started in Season 17, taking her to Charleston again on Day 15{/* https://reblase.sibr.dev/game/2a9130c7-d34a-421e-a0cc-75660e16f2b2#e2ec0e75-282b-fc89-72c9-35a7218130be */}, for Fitzgerald Wanderlust, and then to Yellowstone on Day 79{/* https://reblase.sibr.dev/game/7fab6ec6-3ef2-432b-9849-438fe33cc0ff#e812add7-713f-1888-a692-eafed708c784 */} for Inky Rutledge. Her world tour ended down in the Core, arriving on Day 90{/* https://reblase.sibr.dev/game/5f921dae-5266-4b84-9473-c123c1f157d9#2494b007-50d1-ec0c-0da3-8826e961fb70 */} in exchange for Cravel Gesundheit, after Garages fans' early-season votes to Reform her Fliickerrriiing paid off, rerolling the modification into Super Idol{/* S17 election results */}.
        </p>
      </Entry>
      <Entry date="Season 10, Day 91" title="No Parties in Seattle" jump={{ season: 10, day: 91 }}>{/* https://reblase.sibr.dev/game/b92f3af2-ca9f-4aef-8a7c-09d19e16fe2f#03bd5244-0e73-f8e4-cdee-8b92a278f192 */}
        <p>
          Despite Enhanced Party Time passing during the Season 6 elections{/* S6 election results */}, Garages players remained wallflowers for the three following seasons as the team made it to the postseason. This streak was broken by Summers Pony on Season 10, Day 91, becoming the first Garage to ever party.
        </p>
        <p>
          Besty Trombone, however, still refused to give in, and they managed to avoid partying until Season 18, Day 92{/* https://reblase.sibr.dev/game/e4c7e486-846e-40e1-a30d-e69159a60353#772edcfc-bbb3-db85-c5d0-b04467b7ea90 */}. Conversely, one Garage has partied enough for the team to create a tradition out of it. Arturo Huerta has a habit of partying on Day 97, having done so in Season 13{/* https://reblase.sibr.dev/game/17e2ac45-a420-403a-bded-aad4fe196b6d#865c63f9-411e-ed01-1e0f-ef289ce25616 */}, Season 14{/* https://reblase.sibr.dev/game/48c41163-2494-41c4-9b58-e124683f34cb#29edfefc-ac5c-e77d-2f34-f76d551326e2 */}, and Season 22{/* https://reblase.sibr.dev/game/841e280c-f795-4f4c-90b6-7fec2b6cac1d#5f2db3fe-3b90-c4b6-d200-b74794ed94d9 */}. Due to this pattern, fans of the team decided that Day 97 is their birthday, and celebrate it every season.
        </p>
      </Entry>
      <Entry date="Season 11, Day 12" title="Goodwin Morin Gets Charmed" jump={{ season: 11, day: 12 }}>{/* https://reblase.sibr.dev/game/cfd4f578-84f3-4078-a4f5-60103338c82a#98f28ea6-db64-1a37-69a9-482ad1983911 */}
        <p>
          Getting Goodwin Morin to her star status was a labor of love, seasons in the making. She was boosted in the Season 9 elections{/* S9 election results */} with the Secret Weapon blessing, which maxed out her stats, then pulled out of the Shadows during the Season 10 elections{/* S10 election results */} with the Dark Star blessing. All eyes were on this legendary all-star to perform. So, naturally, her response to all this pressure was to get charmed by Kichiro Guerra, Don Mitchell{/* https://reblase.sibr.dev/game/cfd4f578-84f3-4078-a4f5-60103338c82a#98f28ea6-db64-1a37-69a9-482ad1983911 */}, and Alexander Horne{/* https://reblase.sibr.dev/game/cfd4f578-84f3-4078-a4f5-60103338c82a#48c90abd-ba6a-2dee-bc8b-64b23c6368ab */} during her second-ever appearance on the mound, losing the game to the San Francisco Lovers. This made her one of the only two pitchers in the league to get charmed this many times in the season.
        </p>
        <LineScore {...linescores["cfd4f578-84f3-4078-a4f5-60103338c82a"]} />
      </Entry>
      <Entry date="Season 11, Day 116" title="Strategic Loops" jump={{ season: 11, day: 116 }}>{/* https://reblase.sibr.dev/game/4f63ec6a-094c-44d2-945d-1325b1f61ad3#21d80c23-55e1-9ada-88cb-794e561d2e2c */}
        <p>
          One of the most amusing postseason runs for the Garages was in Season 11 against the Hellmouth Sunbeams, a seasons-long rivalry that finally came to a head. It all started as pitcher Lenny Marijuana stared down home plate. It was the bottom of the 10th, and the score was 6-5. All he had to do was keep it parked. Lenny, however, had something of a lead foot. As the runs ticked up, it dawned on him: If he let the Beams get 10 runs, the count would reset thanks to Sun 2, and they’d both win. Lenny let up exactly 5 runs, ending the game 6-0, marking Lenny’s first postseason shutout.
        </p>
        <LineScore {...linescores["4f63ec6a-094c-44d2-945d-1325b1f61ad3"]} />
        <p>
          Betsy Trombone{/* https://reblase.sibr.dev/game/46cd84cc-c7c5-4d20-831b-5acacd43d948#41303449-8a5a-e21b-fd82-6d585eb4a2d4 */} and Tot Clark{/* https://reblase.sibr.dev/game/6f65f33a-c7c8-41c2-b481-7dd747484441#b4056a39-a632-d995-8fa9-e7b8ba1659e4 */} would come to employ this tactic as well, leaving the league in a perpetual state of Garages gaining and losing wins. This was until Arturo Huerta took the mound in Game 5{/* https://reblase.sibr.dev/game/47bcac42-f651-4fc9-9f93-5567a7b10daf */}, who let through 9 runs and parked it there, costing the Garages the last championship of the Discipline Era.
        </p>
        <LineScore {...linescores ["47bcac42-f651-4fc9-9f93-5567a7b10daf"]} />
      </Entry>
      <Entry date="Season 12 Elections" title="Alaynabella Hollywood, an Entity Fueled By Chaos"> {/* S12 election results */}
        <p>
          There was perhaps no Garage that owned the Expansion Era quite like Alaynabella Hollywood, starting the era at a paltry 4.7 combined stars and ending it with 21.3. Even her arrival to the team during the Season 12 elections was an event, with star players Nagomi Mcdaniel and Goodwin Morin caught in the crossfire and Hollywood ending up one of the worst pitchers in the league. She wouldn't see a win until Season 13, Day 96{/* https://reblase.sibr.dev/game/fb88756a-6aa1-4ec5-b988-0a1285e045f3 */}, but wins aren't everything for the Garages.
        </p>
        <LineScore {...linescores ["fb88756a-6aa1-4ec5-b988-0a1285e045f3"]} />
        <p>
          In Season 15, she would battle the chewed-up Chorby Soul for most runs allowed, taking the lead on Day 13{/* https://reblase.sibr.dev/game/e6a6e75f-1433-4296-9659-bc7c3e37ae30 */} but finally getting beat by one run on Day 59{/* https://reblase.sibr.dev/game/91b0bb34-ac1a-4ab8-a816-311f40ea699c */}. During the Season 16 elections{/* S16 election results */}, she managed to avoid getting shadowed a second time, by being shadowed for Mike Townsend and <i>then</i> moved to the lineup. On Season 17, Day 21{/* https://reblase.sibr.dev/game/0048292c-eec0-435a-8db4-67d4eeae9319 */}, she was blooddrained by Richardson Games, and, in one of the only documented demonstrations of revenge, Hollywood returned the favor and drained Blood Hamburger.
        </p>
        <p>
          She would go on to have one of the highest scoring skateboard tricks in the league{/* https://reblase.sibr.dev/game/955fff8b-4108-4db6-a678-06cde5a641cf#b0fb5cd2-46fb-5b4e-16ff-a779208b630d */}, and, to cap off her streak of chaos on Season 23, Day 37{/* https://reblase.sibr.dev/game/862fcfe0-8b02-4b86-a539-ceec9e80f55f#4bf62be3-0880-a116-2dde-8ac64977a2de */}, Alaynabella Hollywood stole Lucy Tokkan's Underhanded Rock Helmet, which may or may not have cost the Philly Pies their chance at an evolution-inducing third championship.
        </p>
      </Entry>
      <Entry date="Season 14 Latesiesta" title="Did Anyone Hear an Echo?">{/* S14 Latesiesta */}
        <p>
          In Season 14, the Garages built Psychoacoustics in the Big Garage, and it came with an unexpected surprise: Wyatt Mason X, the tenth of thirteen Echoes given to every team that built Psychoacoustics that Latesiesta. Guessing that plot was afoot, Garages fans braced themselves for their newest player being temporary. Despite that, 45 minutes later MaX was given a unique nickname and became well-loved by fans before xe had even played a single game.
        </p>
        <p>
          As the other Wyatts began to Echo each other into Static starting on Day 77{/* https://reblase.sibr.dev/game/993aa7f0-cde5-4665-830e-12544084404d#1c103c6b-2d2d-346e-0859-6c59ad813558 */}, concern grew about the likelihood of MaX's survival. Worried fans checked the schedule and plotted out which pairs would static and when, and if MaX could avoid a similar fate. As the number of Echoes dwindled, it looked likely that xe would be the last one standing and, by sheer luck, xe avoided a collision course with any other Wyatt.
        </p>
        <p>
          Although MaX echoed Elsewhere on Day 97{/* https://reblase.sibr.dev/game/48c41163-2494-41c4-9b58-e124683f34cb#f2fe1687-8951-8af2-899c-0de8b0503d97 */}, starting a trend of echoing mod-heavy players and hanging out Elsewhere that would continue for most of xer career, xe gained a blessing that remained xer own in the Season 14 Election{/* S14 election results */}: Maximalist. Ten seasons later, despite numerous close calls, MaX was still on the Garages, even making it back from xer seventh and latest trip Elsewhere on Day 91{/* https://reblase.sibr.dev/game/ad8d5766-531d-4c1b-bae8-9ab1d95ea2c7#a0fce129-686c-a464-e0a4-fe39a8437664 */} just in time for the Expansion Era to come to a close. No one expected MaX to stay, but xe managed to prove everyone wrong.
        </p>
      </Entry>
      <Entry date="Season 14 Election" title="Chorby Soul Reenters the Ring">{/* S14 election results */}
        <p>
          As eDensity was examined during the beginnings of the Expansion Era, Chorby Soul drew attention. Some time between their incineration on Season 3, Day 14{/* https://reblase.sibr.dev/game/0af42e9a-7863-41df-80b6-7420bab5900c#6726aa89-f387-6b9f-40b9-5460305ee6a2 */} and the Expansion Era, Chorby Soul's soulscream{/* player card link? */} grew so long that, on certain browsers, it would say "UNDEFINED" repeatedly, while in certain mobile browsers, it caused the phone to grow warmer until the page and browser were both closed.
        </p>
        <p>
          With a mere 200 votes, the Garages resurrected Soul during the Season 14 election, and the team's new pitcher immediately drew the ire of Consumers. Their large soulscream made them their primary target, and each attack made their stats drop. Before the end of the week, on Day 7{/* https://reblase.sibr.dev/game/e5db1298-bba0-4aa4-bd11-3d163d0366dd#651eede4-f2eb-4e9c-755f-030ff121f909 */}, Soul's stats dropped as low as they possibly could, displaying all zeroes. Their soulscream still made them a ripe target, though, and the team's fans revered Soul, as they kept other players safe from the Consumers and potential redaction. In the Season 15 election{/* S15 election results */}, fans Reformed Soul's Observation-causing Debt, then waved farewell as the New York Millennials plundered the now-Unstable Soul.
        </p>
      </Entry>
      <Entry date="Season 19, Day 104" title="Tables Turned" jump={{ season: 19, day: 104 }}>{/* https://reblase.sibr.dev/game/70847b4d-7032-4c71-a489-25e0fda2c439#cb200729-807d-6569-08b1-dd2f6bf9aa92 */}
        <p>
          After finally succeeding in Exchanging Avila Guzman back onto the team during the Season 18 elections{/* S18 election results */}, she promptly left once more, not even a full season later, on Day 91{/* https://reblase.sibr.dev/game/78b120e5-6294-4c6f-8a99-e14bc366430d#6d376869-297e-298e-bca1-8cd1947ff869 */}. She feedbacked with Aldon Cashmoney IV, a replica, who would turn to dust at the end of the postseason. However, this was not the only loss the team would suffer this season. On Day 104, Sparks Beans became the first player to be incinerated on the Garages since Season 8, replaced by Lenjamin Zhuge. Although the Garages would go on to lose the Internet Series that season, Zhuge outperformed everyone’s expectations and became a beloved part of the team.
        </p>
      </Entry>
      <Entry date="Season 22, Day 60" title="We Don't Want To Lose You" jump={{ season: 22, day: 60 }}>
        <p>
          After being marked Unstable back to back in Season 7, on Day 96{/* https://reblase.sibr.dev/game/ab1a4e1f-d0c1-4f2d-b362-2a78147aec43#32cfef3c-b777-fabc-490f-44d892cafb62 */} and Day 107{/* https://reblase.sibr.dev/game/8184552f-d5e1-4399-aa56-8e1570fce458#c439b214-503d-49be-db2c-a3322acaf2f8 */} respectively, Tot Clark and Malik Destiny were marked unstable twice in Season 22, in that order. This first came on Day 34{/* https://reblase.sibr.dev/game/7ac77c87-c473-4ce6-96f8-88f6d2b2a273#240b7380-09a5-384e-f423-cdaaadbc4945 */}, where the week would finish without an eclipse, and again on Day 58{/* https://reblase.sibr.dev/game/3ca6b72a-70c1-4d9e-9172-2c81e45f1318#448dba0a-596b-d82c-e34c-f2ae751a8ef4 */}, followed two days later by a Solar Eclipse game. Fans from the Garages and across the league rallied in Discord, swearing in defiance of the gods and rogue ups so much that moderation tools in use at the time were ratelimited, in an event later dubbed “Soliswearity” by the team. Tot and Malik escaped unscathed.
        </p>
      </Entry>
      <Entry date="Season 22, Day 99" title="Mike Townsend Hits a Grand Slam!" jump={{ season: 22, day: 99 }}>{/* https://reblase.sibr.dev/game/3d953e88-5749-4b1b-822b-336d4e3d01b5#b21cb6c0-c500-da64-fa3a-2e90b3e8af2e */}
        <p>
          Mike Townsend has had a storied career, with epithets that rotated as often as he was called into and out of the Shadows. Originally a disappointment against anyone but Jessica Telephone{/* https://reblase.sibr.dev/game/829173cd-d969-43bf-b3fa-b8a9326e7f3a */}, he was sent to the Shadows after Jaylen Hotdogfingers' resurrection{/* S6 election results */}. Townsend was unshadowed in the Season 9 election{/* S9 election results */}, reshadowed in Season 10's election{/* S10 election results */}, pulled back out in Season 16’s election{/* S16 election results */}, and managed to avoid getting faxed back in until Season 18, Day 37{/* https://reblase.sibr.dev/game/1fff27e7-10c1-450f-86df-8931e52c8cfa#64948d7c-3cff-49ed-0612-303cfc4f3e65 */}. He remained in the Shadows until Season 22, Day 79{/* https://reblase.sibr.dev/game/1434ae18-a3a5-4019-93d1-b1d3d45b3c7a#e4c7742d-4b12-6625-f203-c2e211d7c1f5 */}, when Townsend was voicemailed to the roster as a batter. This was something of a meme amongst the team's fans, and the meme paid off on the last day of the regular season.
        </p>
        <LineScore {...linescores ["3d953e88-5749-4b1b-822b-336d4e3d01b5"]} />
        <p>
          Townsend went on to hit a second grand slam in Season 23, on Day 29{/* https://reblase.sibr.dev/game/527f9c87-6c0b-4e2d-a04e-dc301a3d08fe#2a25b0ac-c012-51ed-3d6b-d311b90f1b06 */}.
        </p>
      </Entry>
      <Entry date="Season 24, Day 98" title="The End of an Era" jump={{ season: 24, day: 98 }}>
        <p>
          With the team prepared to go out together for the Expansion Era’s finale, everyone was shocked when a series of devastating events tore four of the Garages’ original players from the team early in the season. On Day 6{/* https://reblase.sibr.dev/game/f7d59177-0296-4ee8-a2e7-952a0527288c#50a48e41-816c-8c6e-bd36-ea4938868063 */}, Tot Clark entered the Secret Base before being incinerated, managing to steal third base from beyond the grave when he exited it. Not long after his death, Oliver Mueller and Mike Townsend were both beaned by Niq Nyong’o on Day 19, causing them to become Redacted after play ended on Day 20{/* Mueller post-game player card */} and Day 21{/* Townsend post-game player card */}, respectively. The team lost yet another player on Day 30{/* https://reblase.sibr.dev/game/c220de68-86e5-48ea-8314-2238bb005fc3#186206af-5a50-78e7-2109-760b97cbabae */}, when Lenny Marijuana was stolen by the Cookout’s Thieves’ Guild and given to the Carolina Queens. A day later{/* https://reblase.sibr.dev/game/4b114c78-f4f2-4f31-bc30-7df34f83c56d#8bc8b3de-c7ef-c999-29a7-6288e1b9092b */}, Marijuana voicemailed out from the Shadows, briefly becoming the star of the Queens before getting incinerated on Day 34{/* https://reblase.sibr.dev/game/bdbe82f8-060e-48d9-ad1a-69d80c4c8c18#370f45b0-488d-6769-1c9d-94005f692e54 */}.
        </p>
        <p>
          Among the tragedies, the Garages decided to head to the Hall of Flame when the Navigate tab appeared during Earlsiesta, after an internal debate over whether or not the Hall Monitor is a god. After helping to melt the Coin on Day 81{/* same link as in index */}, fans decided to seek refuge in the Hall as the Black Hole (Black Hole) began to expand. However, they did not reach their destination in time and got nullified by the Black Hole (Black Hole) on Day 98.
        </p>
      </Entry>
    </History>
  );
}
