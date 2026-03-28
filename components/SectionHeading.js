export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 md:gap-4 ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow ? (
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-text-faint)]">
          {eyebrow}
        </span>
      ) : null}

      <div>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-text)] md:text-4xl xl:text-5xl">
          {title}
        </h2>
        <div
          className={`mt-4 h-1 w-16 rounded-full bg-[var(--color-primary)] ${
            centered ? "mx-auto" : ""
          }`}
        />
      </div>

      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
