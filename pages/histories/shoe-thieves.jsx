/* FIXME */ /* eslint-disable no-unused-vars */

import Link from "next/link";
import { Jump } from "../../components/jump";
import { History, Entry } from "../../components/histories";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([]),
    },
  };
}

export default function Page({ linescores }) {
  return <History />;
}
