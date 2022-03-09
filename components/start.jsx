import { useMemo } from "react";
import DateRange from "./date-range";
import { Jump, JumpDefaults } from "./jump";

export function Era({ title, color, start, end, children }) {
  // TODO: add "tw-h-32 lg:tw-h-48" and a backgroundImage to the <div> wrapping the <h2>
  return (
    <>
      <div className="tw-max-w-5xl tw-mx-auto tw-flex tw-flex-col tw-justify-end tw-mt-8 lg:tw-mt-12 tw-bg-cover tw-bg-center">
        <h2
          className="tw-text-center tw-text-2xl tw-leading-normal lg:tw-text-4xl lg:tw-leading-normal tw-font-bold tw-uppercase"
          style={{ color }}
        >
          {title}
        </h2>
      </div>

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
  return <ul className="tw-text-left tw-font-sans tw-mt-2 lg:tw-mt-3 tw-mb-5 lg:tw-mb-7 tw-before-list">{children}</ul>;
}

export function Event({ children, ...jump }) {
  const className = `lg:tw-whitespace-nowrap ${
    typeof children === "string" ? "" : "hover:tw-no-underline tw-group"
  }`.trim();
  return (
    <li>
      <Jump className={className} {...jump}>
        {children}
      </Jump>
    </li>
  );
}
