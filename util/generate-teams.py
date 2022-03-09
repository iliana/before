#!/usr/bin/env python3

import json
import urllib.request
from pathlib import Path


def process_team(team):
    return {
        k: team[k]
        for k in [
            "id",
            "fullName",
            "nickname",
            "shorthand",
            "emoji",
            "mainColor",
            "secondaryColor",
            "slogan",
        ]
    }


with urllib.request.urlopen(
    "https://api.sibr.dev/chronicler/v2/entities?type=Team&at=2021-07-25T18:15:00Z"
) as req:
    data = {entry["entityId"]: entry["data"] for entry in json.load(req)["items"]}

teams = sorted(
    [
        process_team(team)
        for team in data.values()
        if team.get("eDensity") is not None and team.get("eDensity") != 0
    ],
    key=lambda team: team["fullName"],
)
teams.append(process_team(data["d2634113-b650-47b9-ad95-673f8e28e687"]))

output = json.dumps(teams, separators=(",", ":"))
print(output)
with open(Path(__file__).parent.parent / "data" / "teams.json", "w") as f:
    f.write(output)
