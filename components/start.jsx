import { useMemo } from "react";
import DateRange from "./date-range";
import { Jump, JumpDefaults } from "./jump";

export function Era({ title, color, start, end, children }) {
  return (
    <>
      <h2
        className="tw-text-2xl tw-leading-normal lg:tw-text-4xl lg:tw-leading-normal tw-text-center tw-font-bold tw-mt-6 lg:tw-mt-8 tw-uppercase tw-relative before:tw-absolute before:tw-left-0 before:tw-top-1/2 before:tw-w-full before:tw-h-px before:tw-bg-gray-700"
        style={{ color }}
      >
        <span className="tw-inline-block tw-relative tw-bg-black tw-px-4 lg:tw-px-5">{title}</span>
      </h2>

      <div className="tw-container tw-text-center tw-mb-6 lg:tw-mb-8">
        {start !== undefined && end !== undefined ? <Days start={start} end={end} /> : null}
        {children}
      </div>
    </>
  );
}

export function Season({ number, title, color, extraTitle, extraColor, start, end, children }) {
  return (
    <JumpDefaults.Provider value={useMemo(() => ({ season: number }), [number])}>
      {title ? (
        <h3 className="tw-text-lg tw-leading-normal lg:tw-text-2xl lg:tw-leading-tight tw-font-bold tw-uppercase tw-mt-1.5 lg:tw-mt-2">
          <Jump day={1} className="hover:tw-no-underline tw-group">
            <span className="tw-block tw-text-sm lg:tw-text-base">
              Season {number}
              <span className="tw-sr-only">: </span>
            </span>
            <span className="group-hover:tw-underline" style={{ color }}>
              {title}
            </span>
            {extraTitle ? (
              <>
                {" "}
                —{" "}
                <span className="group-hover:tw-underline" style={{ color: extraColor ?? color }}>
                  {extraTitle}
                </span>
              </>
            ) : null}
          </Jump>
        </h3>
      ) : (
        <h3 className="tw-text-sm lg:tw-text-base tw-leading-snug lg:tw-leading-normal tw-font-bold tw-uppercase">
          Season {number}
        </h3>
      )}
      <Days start={start} end={end} />
      <EventList>{children}</EventList>
    </JumpDefaults.Provider>
  );
}

function Days({ start, end, children }) {
  if (children) {
    return <p className="tw-text-sm lg:tw-text-base tw-font-medium tw-leading-normal lg:tw-leading-snug">{children}</p>;
  }

  return (
    <p className="tw-text-sm lg:tw-text-base tw-font-medium tw-leading-normal lg:tw-leading-snug">
      <DateRange start={start} end={end} />
    </p>
  );
}

export function EventList({ children }) {
  return <ul className="tw-font-sans tw-mt-2 lg:tw-mt-2.5 tw-mb-5 lg:tw-mb-6 tw-before-list">{children}</ul>;
}

export function Event({ children, ...jump }) {
  return (
    <li>
      {typeof children === "string" ? (
        <Jump className="lg:tw-whitespace-nowrap" {...jump}>
          {children}
        </Jump>
      ) : (
        <Jump className="lg:tw-whitespace-nowrap hover:tw-no-underline tw-group" {...jump}>
          {children}
        </Jump>
      )}
    </li>
  );
}
