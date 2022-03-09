/* eslint-disable no-unused-vars */
import Link from "next/link";
import { History, Entry } from "../../components/histories";
import { Jump } from "../../components/jump";
import LineScore from "../../components/linescore";
import loadLineScores from "../../lib/linescore";

export async function getStaticProps() {
  return {
    props: {
      linescores: await loadLineScores([]),
    },
  };
}

export default function Page() {
  return (
    <History authors="YourGenderHere, Agent Blaze, OJ, Crop, Parish, Cloud, and Agent Willow">
    </History>
  );
}
