interface LegalPageProps {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <div className="container-narrow py-12 sm:py-16">
      <h1 className="mb-1 font-display text-3xl font-semibold text-brand-dark">{title}</h1>
      <p className="mb-8 text-sm text-brand-muted">Last updated {updated}</p>
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-2 text-lg font-medium text-brand-dark">{s.heading}</h2>
            <p className="text-sm leading-relaxed text-brand-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
