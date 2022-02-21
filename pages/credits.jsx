export const config = {
  unstable_runtimeJS: false,
};

export default function Credits() {
  return (
    <div className="tw-container tw-py-4 lg:tw-py-6">
      <div className="tw-text-center tw-before-credits">
        <p className="tw-font-sans tw-mb-4 lg:tw-mb-6">
          View credits for Blaseball:
          <br />
          <a className="tw-underline" href="/_before/jump?redirect=%2Foffseason&time=2020-10-25T19%3A15%3A00Z">
            The Discipline Era
          </a>{" "}
          &middot;{" "}
          <a className="tw-underline" href="/_before/jump?redirect=%2F&time=2021-07-30T22%3A30%3A00Z">
            The Expansion Era
          </a>
        </p>

        <Heading>
          Society for Internet Blaseball Research
          <br />
          Archival Staff
        </Heading>
        <List>
          <li>iliana quorum</li>
          <li>Astrid Reblase</li>
          <li>Allie Signet</li>
          <li>UnderMybrella</li>
        </List>

        <Heading>Quality Assurance</Heading>
        <List>
          <li>fionna adams</li>
        </List>

        <Heading>Additional Infrastructure Support</Heading>
        <List>
          <li>Dillon Lareau</li>
        </List>

        <Heading>Special Thanks</Heading>
        <List>
          <li>jan Sopi</li>
          <li>The Game Band</li>
          <li>Blaseball Wiki admins, historians, and contributors</li>
          <li>The SIBR Community</li>
        </List>

        <p>
          <strong>We are all love Blaseball</strong>
        </p>
      </div>
    </div>
  );
}

function Heading({ children }) {
  return <h2 className="tw-font-bold tw-text-lg lg:tw-text-xl tw-mb-1 lg:tw-mb-1.5">{children}</h2>;
}

function List({ children }) {
  return <ul className="tw-mb-3.5 lg:tw-mb-4">{children}</ul>;
}
