import { History, Entry, LineScore } from "../../components/histories";

export default function Page() {
  return (
    <History
      id="adc5b394-8f76-416d-9ce9-813706877b84"
      name="Kansas City Breath Mints"
      emoji="🍬"
      color="#178f55"
      slogan="Fresh Breath, Here We Come."
      authors="tc"
    >
      <Entry date="Season 3, Day 57" title="A Rivalry Intensifies" jump={{ season: 3, day: 57 }}>
        <LineScore
          away={{ emoji: "👟", abbr: "CHST", innings: [1, 5, 4, 0, 3, 0, 0, 0, 3] }}
          home={{ emoji: "🍬", abbr: "KCBM", innings: [1, 2, 0, 5, 2, 1, 0, 4, 6] }}
        />
        <p>
          In all of sporting history, there are few rivalries as fierce or as storied as the rivalry between the Kansas
          City Breath Mints and the Charleston Shoe Thieves.
          <sup>
            [<em>citation needed</em>]
          </sup>{" "}
          Season 3, Day 57 was an early chapter in the rivalry, where early on, admittedly, the Mints were not doing too
          well. The Shoe Thieves had star pitcher Mattheo Prestige on the mound, and in the bottom of the second already
          had a 6-3 lead over the Mints. It seemed the Mints could be on the losing end of this bout, when a cruel twist
          struck in the form of a rogue umpire incinerating Mattheo Prestige, replacing them with Gunther O’Brian. At
          the time of their birth, Gunther was a 0 star pitcher with pathetically bad stats, quickly turning the tides
          of the game into an offensive shootout, with both pitchers giving up run after run. By the bottom of the ninth
          inning, the game was tied 16-16, but Gunther was unable to hang on, giving up 5 runs, and being shamed into a
          final score of Breath Mints 21, Shoe Thieves 16. This game is notable for holding the record for the highest
          scoring game for many seasons, at least for as long as scoring in blaseball was logical. Gunther’s first game
          is remembered by the Mints as a chaotic chapter in the rivalry, and over time as Gunther improved from
          blessings, a yummy reaction, and parties into a worthy adversary, Gunther became a fixture of the rivalry.
        </p>
      </Entry>
      <Entry date="Season 5, Day 99" title="The Rise of the Death Mints" jump={{ season: 5, day: 99 }}>
        <p>
          As the race for the season 5 postseason neared its end, it looked like the Breath Mints had a chance to
          finally clinch their first postseason berth. Going into day 99, the final day of the regular season, the
          Breath Mints were tied with the Dallas Steaks, both with a record of 50-48, and both vying for the final
          play-off slot in the Good League. To even have a chance to get into the postseason, the Mints had to win their
          final game against the Boston Flowers. The game was a nailbiter that went to 11 innings, but in the end the
          Mints triumphed, shaming the Flowers with a final score of Breath Mints 7, Flowers 6. Unfortunately, by that
          point, the Steaks had already won their game against Breckenridge Jazz Hands, meaning the Mints and Steaks
          were tied with the same record of 51-48. At this point in time, Divine Favor rankings were not actually listed
          on the site, so they weren’t widely known about, but the Steaks had the better Divine Favor, and thus the
          Mints were eliminated from postseason contention once again, and were the first team to be eliminated by
          tiebreaker. The Mints fanbase decided to cope with these events by rebranding themselves as the Death Mints,
          and being… you know, like mildly edgy by doing things like declaring they would exact their revenge and stuff.
          The Breath Mints would continue on to exact their revenge on the Dallas Steaks in season 15 by knocking them
          out of postseason contention by Divine Favor tiebreaker.
        </p>
      </Entry>
    </History>
  );
}
