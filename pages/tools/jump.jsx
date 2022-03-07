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
      const [game, hash] = linkData.split("#");
      setLoading(true);
      fetch(`https://api.sibr.dev/chronicler/v1/games/updates?count=2000&game=${game}&started=true`)
        .then((response) => response.json())
        .then(({ data }) => {
          setLoading(false);
          setTimestamp(data.find((datum) => datum.hash === hash)?.timestamp);
        });
    }
  }, [linkData]);

  useEffect(() => {
    if (loading) {
      setElement(<CgSpinner className="tw-animate-spin" />);
    } else if (timestamp) {
      const time = new Date(timestamp).setUTCMilliseconds(0);
      const timeStr = new Date(offset ? time - 5000 : time).toISOString().replace(/.000Z$/, "Z");
      setElement(
        <>
          <Copy data={timeStr} />
          <Copy data={`time="${timeStr}"`} />
          <Copy data={`<Jump time="${timeStr}"></Jump>`} />
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
            const match = event.target.value.match(/reblase.sibr.dev\/game\/([0-9a-f-]{36}#[0-9a-f-]{36})/);
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
        className="tw-mr-2"
        type="button"
        title="Copy"
        aria-label="Copy"
        onClick={() => {
          navigator.clipboard.writeText(data);
          setCopied(<span className="tw-ml-4 tw-italic">Copied!</span>);
          setTimeout(() => setCopied(), 2000);
        }}
      >
        <HiOutlineClipboardCopy aria-hidden="true" focusable="false" />
      </button>
      <code>{data}</code>
      {copied}
    </p>
  );
}
