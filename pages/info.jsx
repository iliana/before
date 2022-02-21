export const config = {
  unstable_runtimeJS: false,
};

export default function Info() {
  return (
    <div className="tw-container tw-py-4 lg:tw-py-6">
      <div className="tw-prose tw-prose-lg tw-prose-invert tw-mx-auto prose-p:tw-text-white prose-li:tw-text-white">
        <p>
          <strong>Before</strong> is a tool for replaying archived Blaseball data developed by the Society for Internet
          Blaseball Research. It works by setting a browser cookie with a time offset. It serves your browser a (mostly)
          unmodified copy of the Blaseball frontend application from that time, then serves that application archived
          data by emulating the application backend.
        </p>
        <p>
          There are many imperfections to this system: there are data gaps in SIBR’s archives; and data for certain
          objects is sometimes not granular enough. This is most notably seen when a player is affected by a game event;
          clicking on the player will not show the change until usually about a minute later. (Incinerations and
          Feedback swaps prior to Season 5 are also impacted by this.)
        </p>
        <p>
          Using Before for research and videos is welcomed; please cite before.sibr.dev, and don’t take our archives as
          the only word of truth, especially in early seasons.
        </p>
        <p>
          If you run into an issue with Before, you can{" "}
          <a href="https://discord.sibr.dev">join the SIBR Discord server</a> and ask in either #help-desk or #before.{" "}
          <a href="https://github.com/iliana/before">Before’s source code is available on GitHub</a>.
        </p>

        <h2>Various tips</h2>
        <ul>
          <li>
            You can flute to your favorite team to pin their games to the top of the Watch Live tab. The most reliable
            way to do this is to jump to an Earlseason (Days 1–27) in the Expansion Era, then click on a team and click
            “Favorite Team”.
          </li>
        </ul>
      </div>
    </div>
  );
}
