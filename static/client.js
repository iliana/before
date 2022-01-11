(function () {
  // TODO: make this a template variable?
  const replace_urls = {
    "api.blaseball.com": "",
    "blaseball-configs.s3.us-west-2.amazonaws.com": "/_before/s3-configs",
    "blaseball-configs-qa.s3.us-west-2.amazonaws.com": "/_before/s3-configs"
  };

  function replace_request_url(url) {
    if (typeof url === "string") {
      url = new URL(url, location);
      let replace = replace_urls[url.hostname];
      if (replace !== undefined) {
        url.pathname = replace + url.pathname;
        url.host = location.host;
        url.protocol = location.protocol;
      }
    }

    return url;
  }

  window._before_time = parseInt(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("offset_sec"))
      .split("=")[1]
  );

  // cursed glue
  var bind = Function.bind;
  var unbind = bind.bind(bind);

  function instantiate(constructor, args) {
    return new (unbind(constructor, null).apply(null, args))();
  }

  const CurrentDate = Date;
  Date = (function (Date) {
    for (var n of Object.getOwnPropertyNames(Date)) {
      if (n in TrickeryDate) continue;

      let desc = Object.getOwnPropertyDescriptor(Date, n);
      Object.defineProperty(TrickeryDate, n, desc);
    }

    return TrickeryDate;

    function TrickeryDate() {
      if (arguments.length > 0) {
        return instantiate(CurrentDate, arguments);
      }

      var date = instantiate(CurrentDate, arguments);
      date = instantiate(CurrentDate, [
        date.getTime() - window._before_time * 1000,
      ]);
      return date;
    }
  })(Date);

  const TrueSource = EventSource;
  EventSource = (function (EventSource) {
    for (var n of Object.getOwnPropertyNames(EventSource)) {
      if (n in TrickSource) continue;

      let desc = Object.getOwnPropertyDescriptor(EventSource, n);
      Object.defineProperty(TrickSource, n, desc);
    }

    return TrickSource;

    function TrickSource(url, options) {
      url = replace_request_url(url).toString();
      return instantiate(TrueSource, [
        `${url}?_before_offset_time=${window._before_time}`,
        options,
      ]);
    }
  })(EventSource);

  const _before_old_fetch = fetch.bind(window);
  fetch = async function (url, options) {
    url = replace_request_url(url);

    if (options === undefined) {
      options = {
        headers: {
          "X-Before-Time": window._before_time,
        },
      };
    } else {
      if (options["headers"] != undefined) {
        options["headers"]["X-Before-Time"] = window._before_time;
      } else {
        options["headers"] = {
          "X-Before-Time": window._before_time,
        };
      }
    }

    return _before_old_fetch(url, options);
  };

  function _before_set_time() {
    document.getElementById("_before_current").innerText =
      new Date().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "long",
      });
  }
  _before_set_time();
  window.setInterval(_before_set_time, 1000);
})();
