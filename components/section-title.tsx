type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-indigobase/78">{description}</p>
      ) : null}
    </div>
  );
}
