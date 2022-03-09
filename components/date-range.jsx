import dayjs from "dayjs";

export default function DateRange({ start: startDate, end: endDate }) {
  const start = dayjs(startDate).hour(12);
  const end = endDate !== undefined ? dayjs(endDate).hour(12) : start.add(6, "day");

  return (
    <>
      <time dateTime={start.format("YYYY-MM-DD")}>
        {start.format("MMMM D")}
        {start.year() !== end.year() ? `, ${start.year()}` : ""}
      </time>
      &ndash;
      <time dateTime={end.format("YYYY-MM-DD")}>
        {start.month() !== end.month() ? `${end.format("MMMM")} ` : ""}
        {end.format("D, YYYY")}
      </time>
    </>
  );
}
