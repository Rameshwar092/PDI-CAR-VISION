import { PRIVACY, TERMS, UPDATED } from '../legal.js';

const PAGES = { privacy: PRIVACY, terms: TERMS };

/** Privacy Policy / Terms & Conditions, shown inside the site (same tab). */
export default function LegalPage({ page }) {
  const doc = PAGES[page];
  if (!doc) return null;
  const other = page === 'privacy' ? ['#terms', 'Terms & Conditions'] : ['#privacy-policy', 'Privacy Policy'];

  return (
    <main className="legal" id="legal">
      <div className="wrap">
        <a className="legal-back" href="#home">{'←'} Back to home</a>
        <h1>{doc.title}</h1>
        <p className="legal-date">Last updated: {UPDATED}</p>

        {doc.intro.map((t, i) => <p key={i} className="legal-intro">{t}</p>)}

        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p && <p>{s.p}</p>}
            {s.list && (
              <ul>{s.list.map(([b, t]) => <li key={b}><b>{b}:</b> {t}</li>)}</ul>
            )}
            {s.bullets && <ul>{s.bullets.map((t) => <li key={t}>{t}</li>)}</ul>}
            {s.after && <p>{s.after}</p>}
          </section>
        ))}

        <p className="legal-also">See also: <a href={other[0]}>{other[1]}</a></p>
      </div>
    </main>
  );
}
