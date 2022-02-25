#!/usr/bin/env bash

filter=$(cat <<EOF
[.items[].data
    | select(.eDensity != 0 and .eDensity != null)
    | {
        id: .id,
        name: .fullName,
        nickname: .nickname,
        shorthand: .shorthand,
        emoji: .emoji,
        mainColor: .mainColor,
        secondaryColor: .secondaryColor,
        slogan: .slogan
      }]
| sort_by(.name)
EOF
)

curl -s 'https://api.sibr.dev/chronicler/v2/entities?type=Team&at=2021-07-25T18:15:00Z' | jq -c "$filter" | tee data/teams.json
