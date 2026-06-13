import { createFileRoute, Link } from '@tanstack/react-router'

function Impressum() {
  return (
    <div className="legal-page">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/" className="brand brand-button" title="Zurück zum Finder">
            <div className="brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <ellipse cx="11" cy="11" rx="7" ry="4.5" transform="rotate(-35 11 11)" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5.5" y1="8.5" x2="16.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">HEC<span className="brand-plus">+</span>ME</span>
              <span className="brand-tagline">Supplement Finder</span>
            </div>
          </Link>
          <Link to="/" className="reset-header-btn">← Zurück</Link>
        </div>
      </header>

      <main className="legal-content">
        <h1>Impressum</h1>

        <section>
          <h2>Biotrain GmbH</h2>
          <p>
            In der Au 2<br />
            88263 Horgenzell<br />
            Deutschland
          </p>
          <p>
            Tel.: +49 75049155262<br />
            Fax: +49 75049154159<br />
            E-Mail: <a href="mailto:service@biotrain.de">service@biotrain.de</a>
          </p>
        </section>

        <section>
          <h2>Registereintrag &amp; Aufsicht</h2>
          <p>
            USt-ID: DE295531186<br />
            Registergericht Ulm HRB 730852<br />
            Aufsichtsbehörde: Regierungspräsidium Tübingen
          </p>
        </section>

        <section>
          <h2>Geschäftsführer</h2>
          <p>
            Dr. Ulrich Pietrek<br />
            In der Au 2<br />
            D-88263 Horgenzell<br />
            E-Mail: <a href="mailto:ulrich.pietrek@biotrain.de">ulrich.pietrek@biotrain.de</a>
          </p>
        </section>

        <section>
          <h2>Online-Streitbeilegung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur außergerichtlichen Online-Streitbeilegung
            (OS-Plattform) bereit, die Sie unter folgendem Link finden:{' '}
            <a href="https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=DE" target="_blank" rel="noopener">
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir
            nicht verpflichtet und auch nicht bereit.
          </p>
        </section>

        <section>
          <h2>Hinweis zum geistigen Eigentum</h2>
          <p>
            Sofern nicht anders angegeben, sind alle Materialien, insbesondere Namen, Logos, Bilder, Texte,
            Illustrationen, Designs, Symbole, Fotografien, Charaktere, Videoclips sowie schriftliche und andere
            Materialien, die auf dieser Website erscheinen (zusammenfassend als „Inhalte" bezeichnet), durch
            Urheber-, Marken- und sonstige geistige Eigentumsrechte geschützt. Diese Rechte stehen der Biotrain
            GmbH, verbundenen Unternehmen der Biotrain GmbH und/oder Lizenzgebern der Biotrain GmbH zu. Nutzer
            dieser Website dürfen die Inhalte weder ganz noch teilweise wiederverwenden, reproduzieren,
            veröffentlichen, übertragen, verteilen, anzeigen, ändern, abgeleitete Werke davon erstellen,
            verkaufen oder sich an einem Verkauf oder einer Verwertung in irgendeiner Weise beteiligen.
          </p>
        </section>

        <section>
          <h2>Haftungshinweis</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer
            Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </section>

        <section>
          <h2>Hinweis zur Supplement-Beratung</h2>
          <p>
            Die Empfehlungen dieses Supplement-Finders dienen ausschließlich zu Informationszwecken und ersetzen
            keine ärztliche oder fachliche Beratung, Diagnose oder Behandlung. Nahrungsergänzungsmittel sind kein
            Ersatz für eine ausgewogene Ernährung und gesunde Lebensweise. Bei gesundheitlichen Beschwerden oder
            der Einnahme von Medikamenten konsultieren Sie bitte einen Arzt oder Apotheker.
          </p>
        </section>

        <footer className="legal-footer">
          <Link to="/">← Zurück zum Supplement-Finder</Link>
          {' · '}
          <Link to="/datenschutz">Datenschutz</Link>
        </footer>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/impressum')({
  component: Impressum,
})
