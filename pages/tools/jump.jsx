import dayjs from "dayjs";
import { useCallback, useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function Page() {
  const [linkData, setLinkData] = useState();
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState();
  const [offset, setOffset] = useState();
  const [element, setElement] = useState();

  useEffect(() => {
    if (linkData) {
      const [kind, remainder] = linkData.split("/");
      const [game, hash] = remainder.split("#");
      setLoading(true);
      if (kind === "bossfight") {
        fetch(`https://api.sibr.dev/chronicler/v2/versions?type=Bossfight&count=1000&id=${game}`)
          .then((response) => response.json())
          .then(({ items }) => {
            setLoading(false);
            setTimestamp(items.find((item) => item.hash === hash)?.validFrom);
          });
      } else {
        fetch(`https://api.sibr.dev/chronicler/v1/games/updates?count=2000&game=${game}&started=true`)
          .then((response) => response.json())
          .then(({ data }) => {
            setLoading(false);
            setTimestamp(data.find((datum) => datum.hash === hash)?.timestamp);
          });
      }
    }
  }, [linkData]);

  useEffect(() => {
    if (loading) {
      setElement(<CgSpinner className="tw-animate-spin" />);
    } else if (timestamp) {
      const time = dayjs(timestamp)
        .subtract(offset ? 5 : 0, "seconds")
        .toISOString()
        .replace(/\.[0-9]{3}Z$/, "Z");
      setElement(
        <>
          <Copy data={time} />
          <Copy data={`time="${time}"`} />
          <Copy data={`<Jump time="${time}"></Jump>`} />
        </>
      );
    } else {
      setElement();
    }
  }, [loading, timestamp, offset]);

  return (
    <div className="tw-container tw-font-sans tw-my-4">
      <label htmlFor="reblase-anchor" className="tw-block tw-my-2">
        Reblase anchor:
        <input
          id="reblase-anchor"
          type="text"
          placeholder="Reblase anchor"
          className="tw-bg-black tw-border tw-border-gray-800 tw-p-1 tw-ml-2 tw-w-96 tw-rounded"
          onFocus={(event) => event.target.select()}
          onInput={(event) => {
            const match = event.target.value.match(
              /reblase.sibr.dev\/((game|bossfight|semicentennial)\/[0-9a-f-]{36}#[0-9a-f-]{36})/
            );
            setLinkData(match ? match[1] : undefined);
          }}
          ref={useCallback((node) => {
            if (node) {
              node.dispatchEvent(new Event("input"));
            }
          }, [])}
        />
      </label>
      <label htmlFor="offset" className="tw-block tw-my-2">
        <input
          id="offset"
          type="checkbox"
          className="tw-mr-2"
          onChange={(event) => setOffset(event.target.checked)}
          ref={useCallback((node) => {
            if (node) {
              node.dispatchEvent(new Event("change"));
            }
          }, [])}
        />
        Offset time 5 seconds in the past
      </label>
      <div className="tw-my-4">{element}</div>
    </div>
  );
}

function Copy({ data }) {
  const [copied, setCopied] = useState();

  return (
    <p>
      <button
        type="button"
        title="Copy"
        aria-label="Copy"
        onClick={() => {
          navigator.clipboard.writeText(data);
          setCopied(<span className="tw-ml-4 tw-italic">Copied!</span>);
          setTimeout(() => setCopied(), 2000);
        }}
      >
        <HiOutlineClipboardCopy className="tw-mr-2 tw-inline" aria-hidden="true" focusable="false" />
        <code>{data}</code>
      </button>
      {copied}
    </p>
  );
}
