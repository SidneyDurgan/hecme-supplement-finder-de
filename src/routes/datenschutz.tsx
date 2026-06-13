import { createFileRoute, Link } from '@tanstack/react-router'

function Datenschutz() {
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
        <h1>Datenschutzerklärung</h1>

        <div className="legal-draft-note">
          Hinweis für den Betreiber: Dieser Text ist ein sorgfältig erstellter Entwurf und vor
          dem Live-Gang von einer datenschutzrechtlich fachkundigen Person zu prüfen. Mit
          „[BITTE PRÜFEN]" markierte Stellen müssen verifiziert oder ergänzt werden. Nach der
          Prüfung diesen Hinweis-Block entfernen.
        </div>

        <section>
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung im Rahmen dieses Supplement-Finders ist:
          </p>
          <p>
            Biotrain GmbH<br />
            In der Au 2<br />
            88263 Horgenzell, Deutschland<br />
            Tel.: +49 75049155262<br />
            E-Mail: <a href="mailto:service@biotrain.de">service@biotrain.de</a><br />
            Geschäftsführer: Dr. Ulrich Pietrek
          </p>
          <p>
            [BITTE PRÜFEN] Sofern ein Datenschutzbeauftragter benannt ist, hier dessen
            Kontaktdaten ergänzen.
          </p>
        </section>

        <section>
          <h2>2. Verarbeitete Daten und Zwecke</h2>
          <p>
            <strong>a) Eingaben im Supplement-Finder:</strong> Wenn Sie Symptome auswählen oder
            eine Frage in den Chat eingeben, werden diese Angaben verarbeitet, um eine
            individuelle Supplement-Empfehlung zu erstellen. Diese Eingaben können
            Gesundheitsdaten im Sinne von Art. 9 DSGVO darstellen (besondere Kategorie
            personenbezogener Daten). Die Eingaben werden von uns nicht dauerhaft gespeichert,
            sondern ausschließlich zur Beantwortung Ihrer Anfrage verarbeitet und an unseren
            KI-Dienstleister übermittelt (siehe Ziffer 4).
          </p>
          <p>
            <strong>b) Technische Daten:</strong> Beim Aufruf der Anwendung werden durch unseren
            Hosting-Dienstleister automatisch technische Daten verarbeitet (insbesondere
            IP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Ressource, übermittelt durch
            Ihren Browser). Dies ist technisch erforderlich, um die Anwendung auszuliefern und
            ihre Sicherheit zu gewährleisten.
          </p>
          <p>
            <strong>c) Missbrauchsschutz (Rate-Limit):</strong> Zum Schutz vor übermäßiger Nutzung
            verarbeiten wir Ihre IP-Adresse kurzzeitig im Arbeitsspeicher, um die Anzahl der
            Anfragen pro Zeiteinheit zu begrenzen. Diese Verarbeitung erfolgt flüchtig und ohne
            dauerhafte Speicherung.
          </p>
        </section>

        <section>
          <h2>3. Rechtsgrundlagen</h2>
          <p>
            Die Verarbeitung Ihrer Eingaben im Finder (Ziffer 2a) erfolgt auf Grundlage Ihrer
            ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a in Verbindung mit Art. 9 Abs.
            2 lit. a DSGVO. Mit der Nutzung des Finders und der Eingabe Ihrer Angaben willigen
            Sie in diese Verarbeitung ein. Sie können Ihre Einwilligung jederzeit mit Wirkung für
            die Zukunft widerrufen, indem Sie die Nutzung beenden.
          </p>
          <p>
            Die Verarbeitung technischer Daten (Ziffer 2b) und des Missbrauchsschutzes (Ziffer
            2c) erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f
            DSGVO am sicheren und stabilen Betrieb der Anwendung.
          </p>
        </section>

        <section>
          <h2>4. KI-Verarbeitung und Datenübermittlung in Drittländer</h2>
          <p>
            Zur Erstellung der Empfehlungen nutzen wir den KI-Dienst der Anthropic PBC, San
            Francisco, USA. Ihre Eingaben werden zu diesem Zweck an Anthropic übermittelt und
            dort verarbeitet. Dabei findet eine Übermittlung in die USA (Drittland) statt.
          </p>
          <p>
            [BITTE PRÜFEN] Grundlage der Übermittlung ist der Abschluss eines
            Auftragsverarbeitungsvertrags sowie der EU-Standardvertragsklauseln mit Anthropic.
            Bitte stellen Sie sicher, dass ein entsprechender Vertrag (Data Processing Addendum)
            mit Anthropic besteht und verlinken Sie hier ggf. die Datenschutzhinweise von
            Anthropic.
          </p>
          <p>
            [BITTE PRÜFEN] Nach den Nutzungsbedingungen der Anthropic-API werden über die API
            übermittelte Daten grundsätzlich nicht zum Training der Modelle verwendet; bitte
            verifizieren Sie den aktuellen Stand und ergänzen Sie die Aufbewahrungsfristen von
            Anthropic.
          </p>
        </section>

        <section>
          <h2>5. Hosting</h2>
          <p>
            Diese Anwendung wird gehostet bei der Vercel Inc., USA. [BITTE PRÜFEN] Vercel
            verarbeitet als Auftragsverarbeiter technische Zugriffsdaten (siehe Ziffer 2b). Auch
            hier kann eine Übermittlung in die USA stattfinden; bitte stellen Sie das Bestehen
            eines Auftragsverarbeitungsvertrags mit Vercel sicher.
          </p>
        </section>

        <section>
          <h2>6. Reichweitenmessung / Analyse</h2>
          <p>
            [BITTE PRÜFEN] Diese Anwendung verwendet ein Webanalyse-Werkzeug zur Reichweiten- und
            Nutzungsmessung. Bitte ergänzen Sie hier das konkret eingesetzte Werkzeug (z.B.
            Vercel Web Analytics oder Google Analytics), den Verarbeitungszweck, die
            Rechtsgrundlage sowie – falls Cookies oder vergleichbare Technologien zum Einsatz
            kommen – einen Hinweis auf die erforderliche Einwilligung (§ 25 TDDDG) und ein
            Einwilligungsbanner. Bei Google Analytics ist zusätzlich die Übermittlung in die USA
            zu beschreiben.
          </p>
        </section>

        <section>
          <h2>7. Speicherdauer</h2>
          <p>
            Ihre Eingaben im Finder werden von uns nicht dauerhaft gespeichert. Zur
            KI-Verarbeitung übermittelte Daten unterliegen den Aufbewahrungsregeln des
            KI-Dienstleisters (siehe Ziffer 4, [BITTE PRÜFEN]). Technische Server-Logdaten werden
            für die Dauer gespeichert, die zur Gewährleistung der Sicherheit erforderlich ist
            [BITTE PRÜFEN: konkrete Frist beim Hoster erfragen].
          </p>
        </section>

        <section>
          <h2>8. Ihre Rechte</h2>
          <p>
            Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
            Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
            (Art. 20) sowie ein Widerspruchsrecht (Art. 21). Eine erteilte Einwilligung können
            Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3). Zur Ausübung
            Ihrer Rechte wenden Sie sich an{' '}
            <a href="mailto:service@biotrain.de">service@biotrain.de</a>.
          </p>
        </section>

        <section>
          <h2>9. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
            Zuständig ist u.a. der Landesbeauftragte für den Datenschutz und die
            Informationsfreiheit Baden-Württemberg. [BITTE PRÜFEN: zuständige Behörde bestätigen]
          </p>
        </section>

        <section>
          <h2>10. Keine medizinische Beratung</h2>
          <p>
            Die Empfehlungen dieses Finders dienen ausschließlich Informationszwecken und
            ersetzen keine ärztliche oder fachliche Beratung, Diagnose oder Behandlung. Bei
            gesundheitlichen Beschwerden konsultieren Sie bitte einen Arzt oder Apotheker.
          </p>
        </section>

        <footer className="legal-footer">
          <Link to="/">← Zurück zum Supplement-Finder</Link>
          {' · '}
          <Link to="/impressum">Impressum</Link>
        </footer>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/datenschutz')({
  component: Datenschutz,
})
