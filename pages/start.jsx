import { useMemo } from "react";
import { Jump, JumpDefaults } from "../components/jump";

export default function Start() {
  return (
    <>
      <div className="tw-container">
        <div className="tw-flex tw-items-start lg:tw-items-end tw-font-bold tw-mt-2.5 tw-mb-5 lg:tw-mb-6">
          <h1 className="tw-text-xl lg:tw-text-6xl tw-leading-[1.2] lg:tw-leading-[1.2] tw-uppercase">Blaseball</h1>
          <div className="tw-text-[12px] lg:tw-text-sm tw-leading-[1.5] lg:tw-leading-[1.5] tw-font-sans tw-mx-[5px] lg:tw-m-2.5 tw-p-[5px] tw-pb-[2px] lg:tw-pb-[5px] tw-rounded-[3px] tw-bg-[#656565]/[.65]">
            BETA
          </div>
        </div>

        <p className="tw-text-center tw-text-lg lg:tw-text-xl tw-italic tw-font-medium">
          <strong>Before</strong> replays Blaseball from any moment recorded by the SIBR archives.
        </p>
      </div>

      <Era title="The Discipline Era" color="#ff0000">
        <Season collapse number={2} days="July 27–August 2, 2020">
          <Event day={100}>Postseason</Event>
          <Event day={108}>The Internet Series</Event>
          <Event time="2020-08-02T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={3} title="Peanut Plague" extraTitle="Uncertainty" color="#c4aa70" days="August 3–9, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-08-03T22:11:19Z">
            <Peanut>BLASPHEMY</Peanut>
          </Event>
          <Event time="2020-08-06T20:52:54Z" team="878c1bf6-0d21-4659-bfee-916c8314d69c">
            The Grand Unslam
          </Event>
          <Event time="2020-08-06T21:47:14Z">
            <Peanut>DID YOU TASTE THE INFINITE?</Peanut>
          </Event>
          <Event time="2020-08-06T22:21:46Z">
            <Peanut>WHERE IS YOUR RESTRAINT?</Peanut>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event time="2020-08-08T21:33:36Z">
            <Peanut>YOU WILL LEARN DISCIPLINE</Peanut>
          </Event>
          <Event day={109}>The Internet Series</Event>
          <Event time="2020-08-09T00:16:56Z" team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            Landry Violence incinerated
          </Event>
          <Event time="2020-08-09T19:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={4} title="Feedback" color="#ff007b" days="August 24–30, 2020">
          <Event time="2020-08-24T15:45:03Z">
            <Peanut>TIME TO LISTEN</Peanut>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2020-08-24T19:19:18Z" team="b024e975-1c4a-4575-8936-a3754a08806a">
            Paula Mason and Thomas Kirby switch teams in the Feedback
          </Event>
          <Event time="2020-08-26T10:19:18Z" team="36569151-a2fb-43c1-9df7-2df512424c82">
            Sandie Turner walks, steals three bases
          </Event>
          <Event time="2020-08-28T15:10:01Z" team="979aee4a-6d80-4863-bf1c-ee1a78e06024">
            Thomas England incinerated, replaced by Sixpack Dogwalker
          </Event>
          <Event time="2020-08-28T21:02:35Z" team="979aee4a-6d80-4863-bf1c-ee1a78e06024">
            Sixpack Dogwalker wields Bangers and Mash after Waveback Event
          </Event>
          <Event day={100}>Postseason</Event>
          <Event time="2020-08-29T21:21:59Z" team="36569151-a2fb-43c1-9df7-2df512424c82">
            Thomas Dracaena hit a ground out to Edric Tosser.
          </Event>
          <Event day={110}>The Internet Series</Event>
          <Event time="2020-08-30T19:09:47Z" redirect="/offseason">
            <Peanut>IT IS TOO LOUD</Peanut>
          </Event>
          <Event time="2020-08-30T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={5} title="Reverb" color="#61b3ff" days="August 31–September 6, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-08-31T20:16:16Z" team="979aee4a-6d80-4863-bf1c-ee1a78e06024">
            Hawaiʻi Fridays shuffled in the Reverb
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={109}>The Internet Series</Event>
          <Event time="2020-09-06T19:00:21Z" redirect="/offseason">
            <Peanut>YOU WORSHIP THEM WHEN I WALK AMONG YOU?</Peanut>
          </Event>
          <Event time="2020-09-06T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={6} title="Idols" color="#ffe082" days="September 7–13, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-09-07T16:10:55Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            The Blooddrain gurgles
          </Event>
          <Event time="2020-09-11T19:00:03Z">
            <Peanut>NO HALF-MEASURES</Peanut>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={108}>The Internet Series</Event>
          <Event time="2020-09-13T19:18:07Z" redirect="/offseason">
            <Peanut>HOTDOGFINGERS? AMUSING</Peanut>
          </Event>
          <Event time="2020-09-13T19:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={7} title="Getting Shelled" color="#ffe082" days="September 14–20, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-09-14T20:04:26Z" team="105bc3ff-1320-4e37-8ef0-8d595cb95dd0">
            Jaylen Hotdogfingers hits Dickerson Morse with a pitch
          </Event>
          <Event day={7} team="7966eb04-efcc-499b-8f03-d13916330531">
            Inky Rutledge pitches first recorded no-hitter
          </Event>
          <Event time="2020-09-15T23:05:55Z" team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            Ruby Tuesday
          </Event>
          <Event time="2020-09-17T07:25:30Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Birds peck Jessica Telephone free
          </Event>
          <Event time="2020-09-17T07:46:54Z">
            <Peanut>WAIT</Peanut>
          </Event>
          <Event day={98} redirect="/leaderboard">
            The Snackrifice
          </Event>
          <Event time="2020-09-18T21:13:34Z">
            <Peanut>THAT IS MORE LIKE IT.</Peanut>
          </Event>
          <Event time="2020-09-18T21:23:57Z">
            <Monitor>where is hotdogfingers</Monitor>
          </Event>
          <Event day={100}>Postseason</Event>
          {/* <Event time="2020-09-19T19:53:00Z" team="57ec08cc-0411-4643-b304-0e80dbc15ac7">
            Mexico City Wild Wings renamed ahead of Solar Eclipse game
          </Event> */}
          <Event day={110}>The Internet Series</Event>
          <Event time="2020-09-20T19:15:36Z" redirect="/offseason">
            <Monitor>i will make you a deal</Monitor>
          </Event>
          <Event time="2020-09-20T19:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={8} title="Rest in Violence" color="#5988ff" days="September 21–27, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-09-21T20:16:35Z" team="105bc3ff-1320-4e37-8ef0-8d595cb95dd0">
            Jaylen Hotdogfingers hits Marquez Clark with a pitch
          </Event>
          <Event time="2020-09-22T23:37:39Z">
            <Monitor>this one at a time thing is killing me</Monitor>
          </Event>
          <Event day={61} team="36569151-a2fb-43c1-9df7-2df512424c82">
            Patty Fox pitches first recorded perfect game
          </Event>
          <Event time="2020-09-25T19:00:48Z" redirect="/leaderboard">
            <Peanut>IT IS COMPLETE</Peanut>
          </Event>
          <Event time="2020-09-25T19:17:48Z" redirect="/leaderboard">
            <Being mic>Hi Friends</Being>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={109}>The Internet Series</Event>
          <Event time="2020-09-27T18:59:23Z" redirect="/offseason">
            <Peanut>STRIKE FOUR</Peanut>
          </Event>
          <Event time="2020-09-27T19:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={9} title="Forecast" color="#576b8c" days="October 5–11, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-10-05T16:30:15Z" team="b72f3061-f573-40d7-832a-5ad475bd7909">
            Crowvertime
          </Event>
          <Event time="2020-10-05T22:04:19Z" team="105bc3ff-1320-4e37-8ef0-8d595cb95dd0">
            Jaylen Hotdogfingers hits Kennedy Cena with a pitch
          </Event>
          <Event time="2020-10-07T13:21:07Z" team="878c1bf6-0d21-4659-bfee-916c8314d69c">
            A Big Peanut crashes into the field, encasing Wyatt Quitter
          </Event>
          <Event time="2020-10-09T18:59:40Z" redirect="/leaderboard">
            <Monitor>*crunch*</Monitor>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={112}>The Internet Series</Event>
          <Event time="2020-10-11T02:23:32Z">
            <Peanut>TIME TO TEACH YOU SOME DISCIPLINE</Peanut> — <span className="group-hover:tw-underline">Day X</span>
          </Event>
          <Event time="2020-10-11T02:47:22Z">
            <Monitor>did i miss something?</Monitor>
          </Event>
          <Event time="2020-10-11T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={10} title="Backdraft" color="#ab383a" days="October 12–18, 2020">
          <Event day={1}>Opening Day</Event>
          <Event time="2020-10-12T22:06:18Z" team="bfd38797-8404-4b38-8b82-341da28b1f83">
            Simon Haley hits a pentaslam
          </Event>
          <Event time="2020-10-16T00:43:01Z" redirect="/leaderboard">
            Tillman Henderson climbs the Idol Leaderboard
          </Event>
          <Event time="2020-10-16T20:04:19Z" redirect="/thehall">
            Jaylen swaps with Tillman
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={111}>The Internet Series</Event>
          <Event time="2020-10-18T00:23:51Z" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            THE CRABS ACCUMULATE 10
          </Event>
          <Event time="2020-10-18T00:33:04Z">
            <Peanut>THIS IS YOUR CHAMPION?</Peanut> — <span className="group-hover:tw-underline">Day X, Part I</span>
          </Event>
          <Event time="2020-10-18T00:38:56Z">
            <Alert>A NEW CHALLENGER APPEARS</Alert> — <span className="group-hover:tw-underline">Day X, Part II</span>
          </Event>
          <Event time="2020-10-18T01:06:48Z">
            <Monitor>*cronch*</Monitor>
          </Event>
          <Event time="2020-10-18T19:10:27Z">
            <Coin>We’re fans, just like you.</Coin>
          </Event>
          <Event time="2020-10-18T19:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={11} title="Peace & Prosperity" color="#3cc28a" days="October 19–25, 2020">
          <Event day={1}>Opening Day</Event>
          <Event day={6} team="b72f3061-f573-40d7-832a-5ad475bd7909">
            Saboteur Jaylen Hotdogfingers pitches 23 home runs
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={116}>The Internet Series</Event>
          <Event time="2020-10-25T03:28:27Z">
            <Coin>You deserve a say.</Coin>
          </Event>
          <Event time="2020-10-25T19:01:13Z" redirect="/offseason">
            <Monitor>your fates are sealed or something</Monitor>
          </Event>
          <Event time="2020-10-25T19:15:00Z" redirect="/offseason">
            Election Results & Credits
          </Event>
        </Season>
      </Era>

      <Era title="The Coffee Cup" color="#9a7b4f" days="November 17–December 8, 2020">
        <JumpDefaults.Provider value={useMemo(() => ({ tournament: 0, redirect: "/" }), [])}>
          <EventList>
            <Event day={1}>Round 1</Event>
            <Event time="2020-11-18T02:22:00Z" team="7fcb63bc-11f2-40b9-b465-f1d458692a63">
              Parker MacMillan IIII Percolated
            </Event>
            <Event day={6}>Round 2</Event>
            <Event day={11}>Round 3</Event>
            <Event day={14}>The Coffee Cup Finals</Event>
            <Event time="2020-12-09T00:27:47Z">
              <Coin>We are all love Coffee, aren’t we?</Coin>
            </Event>
          </EventList>
        </JumpDefaults.Provider>
      </Era>

      <Era title="The Expansion Era" color="#ffbe00">
        <Season number={12} title="The Return" color="#607e82" days="March 1–7, 2021">
          <Event time="2021-03-01T04:06:05Z">
            <Monitor>you want some snacks?</Monitor>
          </Event>
          <Event time="2021-03-01T15:55:58Z">
            <Coin>The wait is over.</Coin>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-03-01T16:05:28Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Chorby Short vs. PolkaDot Patterson
          </Event>
          <Event time="2021-03-02T18:36:01Z">Seasonal Reading</Event>
          <Event time="2021-03-02T18:45:00Z">Earlsiesta</Event>
          <Event time="2021-03-03T05:12:02Z" team="c73b705c-40ad-4633-a6ed-d357ee2e2bcf">
            Wyatt Quitter tastes the infinite
          </Event>
          <Event time="2021-03-04T16:30:13Z">
            <Alert>BREACH DETECTED</Alert>
          </Event>
          <Event time="2021-03-04T16:45:00Z">Latesiesta</Event>
          <Event time="2021-03-04T18:06:46Z" team="ca3f1c8c-c025-4d8e-8eef-5be6accbeb16">
            Peanutiel Duffy is swept Elsewhere
          </Event>
          <Event time="2021-03-05T20:50:01Z">
            <Coin>We have the Flooding issue under control.</Coin>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={112}>The Internet Series</Event>
          <Event time="2021-03-07T18:59:07Z" redirect="/offseason">
            <Coin>Smooth sailing ahead.</Coin>
          </Event>
          <Event time="2021-03-07T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={13} title="Home Free" color="#b185de" days="March 8–14, 2021">
          <Event time="2021-03-08T02:36:38Z">
            <Monitor>pretzels got wet</Monitor>
          </Event>
          <Event time="2021-03-08T15:53:31Z">
            <Coin>Focus on what you do best.</Coin>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-03-08T16:07:33Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            -easley Day returns, Scattered
          </Event>
          <Event time="2021-03-09T18:42:55Z">Seasonal Reading</Event>
          <Event time="2021-03-09T18:50:00Z">Earlsiesta</Event>
          <Event time="2021-03-11T16:45:00Z">Latesiesta</Event>
          <Event day={22} team="f02aeae2-5e6a-4098-9842-02d2273f25c7">
            Aldon Cashmoney hits for the first recorded natural cycle
          </Event>
          <Event time="2021-03-12T00:01:16Z" team="979aee4a-6d80-4863-bf1c-ee1a78e06024">
            Yosh Carpenter pitches for both teams
          </Event>
          <Event time="2021-03-12T21:00:18Z">
            <Coin>Congratulations to Our MVPs.</Coin>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={114}>The Internet Series</Event>
          <Event time="2021-03-14T19:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={14} title="The -ides" color="#bdb3c3" days="March 15–21, 2021">
          <Event time="2021-03-15T01:48:47Z">
            <Monitor>tides rising</Monitor>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-03-15T20:44:41Z">
            <Monitor>you see the boss anywhere?</Monitor>
          </Event>
          <Event time="2021-03-16T17:35:25Z">Seasonal Reading</Event>
          <Event time="2021-03-16T17:37:15Z">
            <Coin>It’s time we ramp up efforts to stay afloat.</Coin>
          </Event>
          <Event time="2021-03-16T17:50:00Z">Earlsiesta</Event>
          <Event time="2021-03-18T15:45:00Z">Latesiesta — The Second Wyatt Masoning</Event>
          <Event time="2021-03-18T21:07:22Z" team="36569151-a2fb-43c1-9df7-2df512424c82">
            Wyatt Mason IX and Wyatt Mason XI Echo into Static
          </Event>
          <Event time="2021-03-19T06:18:07Z" team="747b8e4a-7e50-4638-a973-ea7950a3e739">
            CONSUMERS ATTACK NICHOLAS MORA
          </Event>
          <Event time="2021-03-19T20:00:56Z">
            <Monitor>guess i should read this</Monitor>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={115}>The Internet Series</Event>
          <Event time="2021-03-21T18:01:42Z" redirect="/offseason">
            <Monitor>somebody better do something</Monitor>
          </Event>
          <Event time="2021-03-21T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={15} title="Live Bait" color="#ba7b97" days="April 5–11, 2021">
          <Event time="2021-04-05T14:50:16Z">
            <Coin>We need to level with you</Coin>
          </Event>
          <Event time="2021-04-05T14:58:04Z">
            <Monitor>they sent the fish back</Monitor>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-04-05T16:10:42Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Wyatt Glover is Observed
          </Event>
          <Event time="2021-04-05T16:25:01Z" team="105bc3ff-1320-4e37-8ef0-8d595cb95dd0">
            CONSUMERS ATTACK CHORBY SOUL
          </Event>
          <Event time="2021-04-05T17:40:13Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Wyatt Glover is Redacted
          </Event>
          <Event time="2021-04-05T18:12:29Z" team="bfd38797-8404-4b38-8b82-341da28b1f83">
            The Salmon swim upstream
          </Event>
          <Event time="2021-04-06T17:39:12Z">
            <Reader>immateria materia</Reader>
          </Event>
          <Event time="2021-04-06T17:45:00Z">Earlsiesta</Event>
          <Event time="2021-04-08T15:45:00Z">Latesiesta</Event>
          <Event time="2021-04-08T17:05:31Z" team="b72f3061-f573-40d7-832a-5ad475bd7909">
            Percival Wheeler hops on the Grind Rail
          </Event>
          <Event time="2021-04-08T22:01:21Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Kurt Crueller enters the Secret Base in Yellowstone…
          </Event>
          <Event time="2021-04-08T22:18:19Z" team="bfd38797-8404-4b38-8b82-341da28b1f83">
            …and exits in Charleston
          </Event>
          <Event time="2021-04-09T20:01:44Z">
            <Coin>Congratulations to our MVP(s)!</Coin>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event time="2021-04-10T02:06:38Z" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            CONSUMERS ATTACK ALYSSA HARRELL
          </Event>
          <Event day={111}>The Internet Series</Event>
          <Event time="2021-04-11T18:18:42Z" redirect="/offseason">
            <Lootcrates>Witnesses shape the Current</Lootcrates>
          </Event>
          <Event time="2021-04-11T18:30:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={16} title="Mass Production" color="#b3b3b3" days="April 12–18, 2021">
          <Event day={1}>Opening Day</Event>
          <Event time="2021-04-12T15:22:02Z" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            Baltimore Crabs Attract Brisket Friendo
          </Event>
          <Event time="2021-04-13T04:12:50Z" team="bb4a9de5-c924-4923-a0cb-9d1445f1ee5d">
            Glitter weather
          </Event>
          <Event time="2021-04-13T18:44:03Z">
            <Reader>materia immateria</Reader>
          </Event>
          <Event time="2021-04-13T18:50:00Z">Earlsiesta</Event>
          <Event day={36} team="46358869-dce9-4a01-bfba-ac24fc56f57e">
            28-inning Fridays–Mechanics game
          </Event>
          <Event time="2021-04-15T17:45:00Z">Latesiesta</Event>
          <Event time="2021-04-15T21:05:32Z" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            Salmon Cannons expel Fish Summer Elsewhere
          </Event>
          <Event time="2021-04-16T22:02:11Z">
            <Lootcrates>Accolades collect en masse.</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={114}>The Internet Series</Event>
          <Event time="2021-04-18T18:03:24Z" redirect="/offseason">
            <Coin>We will Preserve what We Love.</Coin>
          </Event>
          <Event time="2021-04-18T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={17} title="Collections" color="#c5a168" days="April 19–25, 2021">
          <Event day={1}>Opening Day</Event>
          <Event time="2021-04-20T17:32:53Z">
            <Lootcrates>The Reader interjects</Lootcrates>
          </Event>
          <Event time="2021-04-20T17:45:00Z">Earlsiesta</Event>
          <Event time="2021-04-22T15:45:00Z">Latesiesta</Event>
          <Event time="2021-04-22T18:17:36Z" team="878c1bf6-0d21-4659-bfee-916c8314d69c">
            10 Runs collected. Incoming Shadow Fax…
          </Event>
          <Event time="2021-04-23T20:04:24Z">
            <Lootcrates>Stars Vaulted</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={112}>The Internet Series</Event>
          <Event time="2021-04-25T18:03:48Z" redirect="/offseason">
            <Lootcrates>The Stacks Remember</Lootcrates>
          </Event>
          <Event time="2021-04-25T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={18} title="New Editions" color="#ff2e2e" days="May 10–16, 2021">
          <Event time="2021-05-10T14:47:24Z">
            <Coin>Chorby Soul has been Preserved!</Coin>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-05-11T18:35:15Z">
            <Reader>lighten up</Reader>
          </Event>
          <Event time="2021-05-11T18:50:00Z">Earlsiesta</Event>
          <Event time="2021-05-13T16:39:09Z">
            <Coin>Please ignore any unauthorized Ballot additions.</Coin>
          </Event>
          <Event time="2021-05-13T16:50:00Z">Latesiesta</Event>
          <Event time="2021-05-14T21:03:20Z">
            <Lootcrates>Undertow tugs against the Current.</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event time="2021-05-15T05:16:16Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Nerd Pacheco’s superallergic reaction
          </Event>
          <Event day={112}>The Internet Series</Event>
          <Event time="2021-05-16T18:03:02Z" redirect="/offseason">
            <Coin>Today’s Results are disappointing.</Coin>
          </Event>
          <Event time="2021-05-16T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={19} title="Undertow" color="#a16dc3" days="May 17–23, 2021">
          <Event day={1}>Opening Day</Event>
          <Event day={14} team="a37f9158-7f82-46bc-908c-c9e2dda7c33b">
            Polarity weather
          </Event>
          <Event time="2021-05-18T17:34:06Z">
            <Coin>We’ve all had enough chaos.</Coin>
          </Event>
          <Event time="2021-05-18T17:50:00Z">Earlsiesta</Event>
          <Event day={65} team="46358869-dce9-4a01-bfba-ac24fc56f57e">
            Kelvin Drumsolo’s 5-game drum solo
          </Event>
          <Event time="2021-05-20T15:45:00Z">Latesiesta</Event>
          <Event time="2021-05-21T20:02:33Z">
            <Monitor>kinda juggling a lot right now</Monitor>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={113}>The Internet Series</Event>
          <Event time="2021-05-23T18:04:49Z" redirect="/offseason">
            <Coin>We’ve been forced to make a Deal</Coin>
          </Event>
          <Event time="2021-05-23T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={20} title="Win(Win)" color="#3faf66" days="June 14–20, 2021">
          <Event time="2021-06-14T03:47:57Z">
            <Monitor>haven’t checked the hall in a bit</Monitor>
          </Event>
          <Event time="2021-06-14T14:47:31Z">
            <Lootcrates>The Historian eyes the Horizon</Lootcrates>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-06-15T17:39:12Z" redirect="/depth">
            <Reader>go long</Reader>
          </Event>
          <Event time="2021-06-15T17:50:00Z">Earlsiesta</Event>
          <Event time="2021-06-16T05:12:47Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Jesús Koch places The Fifth Base in The Oven
          </Event>
          <Event time="2021-06-17T15:45:00Z">Latesiesta</Event>
          <Event time="2021-06-18T20:03:56Z">
            <Lootcrates>Approaching Ends.</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={112}>The Internet Series</Event>
          <Event time="2021-06-20T18:02:09Z" redirect="/offseason">
            <Coin>We must deepen our investments</Coin>
          </Event>
          <Event time="2021-06-20T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={21} title="Red Herring" color="#ea3f66" days="June 21–27, 2021">
          <Event day={1}>Opening Day</Event>
          <Event time="2021-06-22T17:34:48Z">
            <Monitor>who makes this stuff</Monitor>
          </Event>
          <Event time="2021-06-22T17:45:00Z">Earlsiesta</Event>
          <Event time="2021-06-24T15:40:43Z">Latesiesta</Event>
          <Event time="2021-06-24T19:00:30Z" redirect="/depth">
            SMASH
          </Event>
          <Event time="2021-06-24T19:32:28Z">
            <Monitor>something smells fishy</Monitor>
          </Event>
          <Event time="2021-06-24T20:00:30Z" redirect="/depth">
            [TUMBLEWEED SOUNDS]
          </Event>
          <Event time="2021-06-25T21:03:20Z">
            <Lootcrates>The Current Dammed</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={113}>The Internet Series</Event>
          <Event time="2021-06-27T18:04:36Z" redirect="/offseason">
            <Coin>Classified information has been Leaked</Coin>
          </Event>
          <Event time="2021-06-27T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={22} title="Overdue" color="#3c81d8" days="June 28–July 4, 2021">
          <Event day={1}>Opening Day</Event>
          <Event day={13} team="36569151-a2fb-43c1-9df7-2df512424c82">
            New York Millennials get a Pitching Machine
          </Event>
          <Event time="2021-06-29T17:43:16Z">
            <Coin>The ILB Semi-Centennial!</Coin>
          </Event>
          <Event time="2021-06-29T17:55:00Z">Earlsiesta</Event>
          <Event time="2021-07-01T15:44:27Z">
            <Monitor>gotta offload this herring</Monitor>
          </Event>
          <Event time="2021-07-01T17:45:00Z">Latesiesta</Event>
          <Event time="2021-07-02T05:10:49Z" team="b024e975-1c4a-4575-8936-a3754a08806a">
            Baldwin Breadwinner steals The Fifth Base
          </Event>
          <Event time="2021-07-02T21:04:08Z">
            <Lootcrates>A Golden Glove</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event day={113}>The Internet Series</Event>
          <Event time="2021-07-04T18:02:55Z" redirect="/offseason">
            <Coin>An Exhibition Match for the Ages</Coin>
          </Event>
          <Event time="2021-07-04T18:20:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season number={23} title="A Set Up" color="#d9d3d2" days="July 19–25, 2021">
          <Event time="2021-07-19T14:50:56Z">
            <Coin>Following the Postseason, We’ll celebrate</Coin>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event day={1} team="b63be8c2-576a-4d6e-8daf-814f8bcea96f">
            Jazz weather
          </Event>
          <Event time="2021-07-20T17:35:24Z">
            <Reader>game over</Reader>
          </Event>
          <Event time="2021-07-20T17:45:00Z">Earlsiesta</Event>
          <Event time="2021-07-22T01:24:22Z" team="adc5b394-8f76-416d-9ce9-813706877b84">
            Breath Mints 20.3, Crabs 20.3
          </Event>
          <Event time="2021-07-22T15:46:42Z">
            <Monitor>hope there’s fireworks</Monitor>
          </Event>
          <Event time="2021-07-22T15:55:00Z">Latesiesta</Event>
          <Event time="2021-07-23T20:03:51Z">
            <Lootcrates>An Ending Begins</Lootcrates>
          </Event>
          <Event day={100}>Postseason</Event>
          <Event time="2021-07-24T02:02:44Z" team="7966eb04-efcc-499b-8f03-d13916330531">
            Night weather
          </Event>
          <Event day={113}>The Internet Series</Event>
          <Event time="2021-07-25T01:58:06Z">The ILB Semi-Centennial</Event>
          <Event time="2021-07-25T03:38:25Z">
            <Coin>Yes, Sun(Sun) appears to have exploded.</Coin>
          </Event>
          <Event time="2021-07-25T18:02:39Z" redirect="/offseason">
            <Namerifeht>Credit Denied</Namerifeht>
          </Event>
          <Event time="2021-07-25T18:15:00Z" redirect="/offseason">
            Election Results
          </Event>
        </Season>

        <Season
          number={24}
          title="Fire Sale"
          color="#ea5b23"
          extraTitle="Save Situation"
          extraColor="#64aadc"
          days="July 26–30, 2021"
        >
          <Event time="2021-07-26T14:48:14Z">
            <Coin>In Light of Recent Events</Coin>
          </Event>
          <Event day={1}>Opening Day</Event>
          <Event time="2021-07-26T17:13:23Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Kansas City Breath Mints incinerated
          </Event>
          <Event time="2021-07-26T17:37:32Z">
            <Monitor>the breath mints.</Monitor>
          </Event>
          <Event time="2021-07-26T19:05:46-07:00" team="8d87c468-699a-47a8-b40d-cfb73a5660ad">
            Hawaiʻi Fridays incinerated
          </Event>
          <Event time="2021-07-27T02:33:39Z">
            <Monitor>it’s island time</Monitor>
          </Event>
          <Event time="2021-07-27T17:39:46Z" redirect="/depth">
            <Coin>Okay no one panic</Coin>
          </Event>
          <Event time="2021-07-27T17:47:51Z" redirect="/depth">
            <Parker>This is Parker MacMillan IIIII speaking</Parker>
          </Event>
          <Event time="2021-07-27T18:00:00Z">Earlsiesta</Event>
          <Event time="2021-07-27T19:28:44Z" team="9debc64f-74b7-4ae1-a4d6-fce0144b6ea5">
            Black Hole (Black Hole) nullifies Tunnels
          </Event>
          <Event time="2021-07-28T01:46:15Z">
            <Monitor>hey talkers</Monitor>
          </Event>
          <Event day={38} team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            88-minute Pies–Lovers game
          </Event>
          <Event time="2021-07-28T16:45:19Z" redirect="/depth">
            <Alert>HARVEST TRACKING INITIATED</Alert>
          </Event>
          <Event time="2021-07-28T19:34:01Z" redirect="/depth">
            <Reader>sunbeams</Reader>
          </Event>
          <Event time="2021-07-29T01:56:03Z" redirect="/depth">
            <Lootcrates>The Historian Steels Second</Lootcrates>
          </Event>
          <Event time="2021-07-29T03:27:45Z" team="36569151-a2fb-43c1-9df7-2df512424c82">
            New York Millennials nullify the economy
          </Event>
          <Event time="2021-07-29T09:00:13Z">
            <Coin>Wh-t are you doi--</Coin>
          </Event>
          <Event time="2021-07-29T16:37:21Z" redirect="/depth">
            <Monitor>i quit</Monitor>
          </Event>
          <Event time="2021-07-29T16:50:00Z">Latesiesta</Event>
          <Event time="2021-07-30T00:15:07Z" team="23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7">
            Philly Pies nullify themselves
          </Event>
          <Event time="2021-07-30T02:50:00Z" redirect="/depth">
            Rogue Teams approach the Coin
          </Event>
          <Event time="2021-07-30T02:55:15Z" redirect="/depth">
            <Coin>We’r- F-ns, j-st l-ke y--</Coin>
          </Event>
          <Event time="2021-07-30T20:00:33Z" redirect="/">
            <Namerifeht>balance paid</Namerifeht>
          </Event>
          <Event time="2021-07-30T22:30:00Z" redirect="/">
            Credits
          </Event>
        </Season>
      </Era>
    </>
  );
}

function Era({ title, color, days, children }) {
  return (
    <>
      <h2
        className="tw-text-2xl tw-leading-normal lg:tw-text-4xl lg:tw-leading-normal tw-text-center tw-font-bold tw-mt-6 lg:tw-mt-8 tw-uppercase tw-relative before:tw-absolute before:tw-left-0 before:tw-top-1/2 before:tw-w-full before:tw-h-px before:tw-bg-gray-700"
        style={{ color }}
      >
        <span className="tw-inline-block tw-relative tw-bg-black tw-px-4 lg:tw-px-5">{title}</span>
      </h2>

      <div className="tw-container tw-text-center tw-mb-6 lg:tw-mb-8">
        {days ? <Days>{days}</Days> : null}
        {children}
      </div>
    </>
  );
}

function Season({ number, title, color, extraTitle, extraColor, days, children }) {
  return (
    <JumpDefaults.Provider value={useMemo(() => ({ season: number }), [number])}>
      {title ? (
        <h3 className="tw-text-lg tw-leading-normal lg:tw-text-2xl lg:tw-leading-tight tw-font-bold tw-uppercase tw-mt-1.5 lg:tw-mt-2">
          <Jump day={1} className="hover:tw-no-underline tw-group">
            <span className="tw-block tw-text-sm lg:tw-text-base">
              Season {number}
              <span className="tw-sr-only">: </span>
            </span>
            <span className="group-hover:tw-underline" style={{ color }}>
              {title}
            </span>
            {extraTitle ? (
              <>
                {" "}
                —{" "}
                <span className="group-hover:tw-underline" style={{ color: extraColor ?? color }}>
                  {extraTitle}
                </span>
              </>
            ) : null}
          </Jump>
        </h3>
      ) : (
        <h3 className="tw-text-sm lg:tw-text-base tw-leading-snug lg:tw-leading-normal tw-font-bold tw-uppercase">
          Season {number}
        </h3>
      )}
      <Days>{days}</Days>
      <EventList>{children}</EventList>
    </JumpDefaults.Provider>
  );
}

function Days({ children }) {
  return <p className="tw-text-sm lg:tw-text-base tw-font-medium tw-leading-normal lg:tw-leading-snug">{children}</p>;
}

function EventList({ children }) {
  return <ul className="tw-font-sans tw-mt-2 lg:tw-mt-2.5 tw-mb-5 lg:tw-mb-6 tw-before-list">{children}</ul>;
}

function Event({ children, ...jump }) {
  return (
    <li>
      {typeof children === "string" ? (
        <Jump className="lg:tw-whitespace-nowrap" {...jump}>
          {children}
        </Jump>
      ) : (
        <Jump className="lg:tw-whitespace-nowrap hover:tw-no-underline tw-group" {...jump}>
          {children}
        </Jump>
      )}
    </li>
  );
}

function Being({ className, font, mic, children }) {
  const quoteClass = `tw-font-client-serif tw-font-medium ${mic ? "tw-text-[#ff007b]" : ""}`.trim();
  return (
    <span className={`${font ?? "tw-font-client-serif tw-font-medium"} ${className}`.trim()}>
      <span className={quoteClass}>“</span>
      <span className="group-hover:tw-underline">{children}</span>
      <span className={quoteClass}>”</span>
    </span>
  );
}

function Peanut({ children }) {
  return <Being className="tw-text-[red]">{children}</Being>;
}

function Monitor({ children }) {
  return <Being className="tw-text-[#5988ff] [text-shadow:0_0_0.5em_#5988ff]">{children}</Being>;
}

function Alert({ children }) {
  return <Being className="tw-italic">{children}</Being>;
}

function Coin({ children }) {
  return <Being className="tw-text-[#ffbe00]">{children}</Being>;
}

function Reader({ children }) {
  return <Being className="tw-text-[#a16dc3] [text-shadow:0_0_0.5em_#a16dc3]">{children}</Being>;
}

function Lootcrates({ children }) {
  return <Being className="tw-italic tw-text-[#b3b3b3]">{children}</Being>;
}

function Namerifeht({ children }) {
  return (
    <Being className="tw-text-[#ea5b23]">
      <span className="tw-inline-block tw-scale-x-[-1] [unicode-bidi:bidi-override] [direction:rtl] group-hover:tw-underline">
        {children}
      </span>
    </Being>
  );
}

function Parker({ children }) {
  return (
    <Being mic font="tw-font-sans tw-font-normal">
      {children}
    </Being>
  );
}
