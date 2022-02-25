const classes = {
  small: "tw-text-[14pt] tw-leading-[1.875rem] tw-h-[1.875rem] tw-w-[1.875rem]",
  teamCard:
    "tw-text-[1.75rem] tw-leading-10 tw-h-10 tw-w-10 lg:tw-text-4xl lg:tw-leading-[3.75rem] lg:tw-h-[3.75rem] lg:tw-w-[3.75rem]",
};

export default function TeamIcon({ className, size, emoji, color }) {
  return (
    <div
      className={`${classes[size ?? "small"]} tw-inline-block tw-rounded-full tw-text-center ${className}`}
      style={{
        backgroundColor: color,
      }}
    >
      {emoji}
    </div>
  );
}
