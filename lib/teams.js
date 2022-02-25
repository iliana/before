import rawTeams from "../data/teams.json";

export const teams = rawTeams.map((t) => ({
  ...t,
  emoji: Number.isNaN(Number(t.emoji)) ? t.emoji : String.fromCodePoint(t.emoji),
  slug: t.nickname.toLowerCase().replace(" ", "-"),
}));

export function getTeamIndex(filter) {
  return teams.findIndex((t) => Object.entries(filter).every(([k, v]) => t[k] === v));
}

export function getTeam(filter) {
  return teams[getTeamIndex(filter)];
}
