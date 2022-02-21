import Link from "next/link";
import MenuIcon from "./menu.svg";
import Back5m from "./back-5m.svg";
import Back30s from "./back-30s.svg";
import Forward5m from "./forward-5m.svg";
import Forward30s from "./forward-30s.svg";

function SkipLink({ Icon, hide, duration, unit }) {
  return hide ? null : (
    <a
      href={`/_before/relative?${unit}=${duration}`}
      title={`Skip ${duration > 0 ? "forward" : "back"} ${Math.abs(duration)} ${unit}`}
    >
      <Icon className="tw-h-4 lg:tw-h-5 tw-fill-white" />
    </a>
  );
}

export default function Nav({ open, hideSkip }) {
  return (
    <div className="tw-before-scope">
      <div className="tw-bg-gray-900 tw-text-white tw-text-sm lg:tw-text-base tw-border-b tw-border-gray-800 tw-z-[9999]">
        <div className="tw-relative tw-container tw-py-1.5 lg:tw-py-2">
          <details open={open ?? false}>
            <summary className="tw-group tw-space-x-1.5 tw-inline-block tw-font-bold tw-cursor-pointer">
              <MenuIcon
                className="tw-inline tw-h-3.5 lg:tw-h-4 tw-w-2.5 lg:tw-w-3 tw-stroke-0 tw-fill-gray-100"
                aria-hidden="true"
              />
              <span className="tw-italic group-hover:tw-underline">Before</span>
            </summary>
            <div className="tw-font-sans tw-pt-1">
              <ul className="tw-before-list">
                <li>
                  <Link href="/start">Index</Link>
                </li>
                <li>
                  <Link href="/info">More info</Link>
                </li>
                <li>
                  <Link href="/credits">Credits</Link>
                </li>
              </ul>
            </div>
          </details>

          <div className="tw-hidden lg:tw-block tw-absolute tw-py-2 tw-top-0 tw-left-28">
            <span id="tw-before-current-time" className="tw-font-sans tw-font-bold tw-text-xs" />
          </div>

          <div className="tw-absolute tw-h-8 lg:tw-h-10 tw-top-0 tw-right-5 lg:tw-right-7 tw-flex tw-gap-3 tw-items-center">
            <SkipLink Icon={Back5m} hide={hideSkip} duration={-5} unit="minutes" />
            <SkipLink Icon={Back30s} hide={hideSkip} duration={-30} unit="seconds" />
            <form
              action="/_before/jump"
              method="get"
              className="tw-font-sans tw-flex tw-items-center tw-gap-1 lg:tw-gap-1.5 tw-text-sm"
            >
              <input
                className="tw-bg-black tw-border tw-border-gray-800 tw-text-center tw-w-10 lg:tw-w-14 tw-rounded tw-py-px"
                name="season"
                placeholder="Season"
              />
              <input
                className="tw-bg-black tw-border tw-border-gray-800 tw-text-center tw-w-10 lg:tw-w-14 tw-rounded tw-py-px"
                name="day"
                placeholder="Day"
              />
              <input
                className="tw-bg-gray-700 tw-text-center tw-font-bold tw-rounded-full tw-hidden lg:tw-block tw-px-2.5 tw-py-px"
                type="submit"
                value="Go"
              />
            </form>
            <SkipLink Icon={Forward30s} hide={hideSkip} duration={30} unit="seconds" />
            <SkipLink Icon={Forward5m} hide={hideSkip} duration={5} unit="minutes" />
          </div>
        </div>
      </div>
    </div>
  );
}
