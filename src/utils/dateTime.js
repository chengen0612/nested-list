import { DateTime, Settings } from "luxon";

const LOCALE = "ja";

Settings.defaultLocale = LOCALE;

export const toLocaleString = (timestamp) => {
  return DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATE_MED);
};

// export const toLocaleRelativeString = (timestamp) => {
//   return DateTime.fromMillis(timestamp).toRelative();
// };

export const toLocaleRelativeString = (timestamp) => {
  // Map luxon unit and unit of rtf.format method
  const UNIT_ORDER_MAP = new Map([
    ["years", "year"],
    ["months", "month"],
    ["weeks", "week"],
    ["days", "day"],
    ["hours", "hour"],
    ["minutes", "minute"],
    ["seconds", "second"],
  ]);

  const duration = DateTime.fromMillis(timestamp)
    .diffNow([
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject();

  let unit;

  for (const [key] of UNIT_ORDER_MAP) {
    if (duration[key]) {
      unit = key;
      break;
    }
  }

  const rtf = new Intl.RelativeTimeFormat(LOCALE, {
    numeric: "auto",
    style: "long",
  });

  return rtf.format(duration[unit], UNIT_ORDER_MAP.get(unit));
};
