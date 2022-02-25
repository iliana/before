import fs from "fs/promises";
import path from "path";

async function json(url) {
  return fetch(url).then((res) => res.json());
}

function objectify(list) {
  return list.reduce((o, item) => ({ ...o, [item.id]: item }), {});
}

async function loadLineScore(gameId) {
  const dataPath = path.join(process.cwd(), `data/linescore/${gameId}.json`);
  try {
    return JSON.parse(await fs.readFile(dataPath, { encoding: "utf8" }));
  } catch (e) {
    const game = (await json(`https://api.sibr.dev/chronicler/v1/games/updates?game=${gameId}&order=desc&count=1`))
      .data[0].data;
    const gameStats = (await json(`https://api.blaseball.com/database/gameStatsheets?ids=${game.statsheet}`))[0];
    const teamStats = objectify(
      await json(
        `https://api.blaseball.com/database/teamStatsheets?ids=${gameStats.awayTeamStats},${gameStats.homeTeamStats}`
      )
    );
    const playerStatsIds = Object.values(teamStats).flatMap((stats) => stats.playerStats);
    const playerStats = objectify(
      await json(`https://api.blaseball.com/database/playerStatsheets?ids=${playerStatsIds.join(",")}`)
    );

    /* eslint-disable-next-line no-underscore-dangle */
    const data = { id: game.id ?? game._id, season: game.season + 1, day: game.day + 1 };
    ["away", "home"].forEach((team) => {
      data[team] = {
        id: game[`${team}Team`],
        innings: gameStats[`${team}TeamRunsByInning`],
        hits: teamStats[gameStats[`${team}TeamStats`]].playerStats.reduce((hits, id) => hits + playerStats[id].hits, 0),
      };
    });
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(data));

    return data;
  }
}

export default async function loadLineScores(gameIds) {
  return objectify(await Promise.all(gameIds.map(loadLineScore)));
}
