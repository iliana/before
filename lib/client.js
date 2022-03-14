import Cookies from "js-cookie";

window.Before = {
  time: parseInt(Cookies.get("offset_sec"), 10),
};

// cursed glue
const unbind = Function.bind.bind(Function.bind);
function instantiate(constructor, args) {
  /* eslint-disable-next-line prefer-spread */
  return new (unbind(constructor, null).apply(null, args))();
}

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

const CurrentDate = Date;
/* eslint-disable-next-line no-global-assign */
Date = ((Date) => {
  function TrickeryDate(...args) {
    if (args.length > 0) {
      return instantiate(CurrentDate, args);
    }

    let date = instantiate(CurrentDate, args);
    date = instantiate(CurrentDate, [date.getTime() - window.Before.time * 1000]);
    return date;
  }

  Object.getOwnPropertyNames(Date).forEach((n) => {
    if (!(n in TrickeryDate)) {
      const desc = Object.getOwnPropertyDescriptor(Date, n);
      Object.defineProperty(TrickeryDate, n, desc);
    }
  });

  return TrickeryDate;
})(Date);

function setNavbarTime() {
  document.getElementById("tw-before-current-time").innerText = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "long",
  });
}
setNavbarTime();
setInterval(setNavbarTime, 1000);

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

const TrueSource = EventSource;
/* eslint-disable-next-line no-global-assign */
EventSource = ((EventSource) => {
  function TrickSource(url, options) {
    return instantiate(TrueSource, [`${url}?_before_offset_time=${window.Before.time}`, options]);
  }

  Object.getOwnPropertyNames(EventSource).forEach((n) => {
    if (!(n in TrickSource)) {
      const desc = Object.getOwnPropertyDescriptor(EventSource, n);
      Object.defineProperty(TrickSource, n, desc);
    }
  });

  return TrickSource;
})(EventSource);

// =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=   =^..^=

const oldFetch = fetch.bind(window);
/* eslint-disable-next-line no-global-assign */
fetch = (url, options) =>
  oldFetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "X-Before-Time": window.Before.time,
    },
  });
