import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { COMPANY_INFO, DATA_PROCESSING } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | UglyBoxer',
  description: 'Datenschutzerklärung gemäß DSGVO für UglyBoxer.com',
  robots: 'noindex, nofollow',
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <LegalPageLayout
          title="Datenschutzerklärung"
          lastUpdated="01. Februar 2026"
        >
          {/* 1. Datenschutz auf einen Blick */}
          <LegalSection title="1. Datenschutz auf einen Blick">
            <h3 className="text-lg font-bold text-[var(--ugly-green)] mb-2">
              Allgemeine Hinweise
            </h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten,
              mit denen Sie persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
              unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </LegalSection>

          {/* 2. Verantwortlicher */}
          <LegalSection title="2. Verantwortlicher">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2">
              <strong>{COMPANY_INFO.name}</strong><br />
              {COMPANY_INFO.address.street}<br />
              {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}
            </p>
            <p className="mt-2">
              E-Mail: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[var(--ugly-pink)] hover:underline">{COMPANY_INFO.email}</a>
            </p>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten (z. B. Namen,
              E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </LegalSection>

          {/* 3. Datenerfassung */}
          <LegalSection title="3. Datenerfassung auf dieser Website">
            <h3 className="text-lg font-bold text-[var(--ugly-green)] mb-2">
              Welche Daten erfassen wir?
            </h3>
            <p>Wir erfassen folgende Datenarten:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Server-Logfiles:</strong> IP-Adresse, Browser-Typ,
                Betriebssystem, Datum und Uhrzeit des Zugriffs
              </li>
              <li>
                <strong>Voting-Daten:</strong> Anonyme Session-IDs zur
                Verhinderung von Mehrfach-Votes (keine personenbezogenen Daten)
              </li>
              <li>
                <strong>Analytics-Daten:</strong> Anonymisierte
                Nutzungsstatistiken über Vercel Analytics
              </li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Wofür nutzen wir Ihre Daten?
            </h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Bereitstellung und Optimierung der Website</li>
              <li>Verhinderung von Mehrfach-Votings (via Session-ID)</li>
              <li>Analyse des Nutzerverhaltens (anonymisiert)</li>
              <li>Bereitstellung von Affiliate-Links zu Produkten</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Welche Rechte haben Sie bezüglich Ihrer Daten?
            </h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
              Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
              erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
              Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
              Datenverarbeitung erteilt haben, können Sie diese Einwilligung
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht,
              unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
            </p>
          </LegalSection>

          {/* 4. Rechtsgrundlage */}
          <LegalSection title="4. Rechtsgrundlage der Verarbeitung">
            <p>
              Die Verarbeitung Ihrer Daten erfolgt auf folgenden
              Rechtsgrundlagen (Art. 6 DSGVO):
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse):</strong>{' '}
                Server-Logfiles, technisch notwendige Cookies, Verhinderung
                von Missbrauch
              </li>
              <li>
                <strong>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung):</strong>{' '}
                Analytics und nicht-essenzielle Cookies (falls künftig implementiert)
              </li>
            </ul>
          </LegalSection>

          {/* 5. Hosting & Server-Logfiles */}
          <LegalSection title="5. Hosting und Server-Logfiles">
            <p>
              Diese Website wird gehostet bei {DATA_PROCESSING.vercel.name}.
              Der Anbieter erhebt und speichert automatisch Informationen in
              sogenannten Server-Logfiles, die Ihr Browser automatisch an uns
              übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-4">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage
              von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
              berechtigtes Interesse an der technisch fehlerfreien Darstellung
              und der Optimierung seiner Website.
            </p>
            <p className="mt-4">
              Datenschutzerklärung des Hosting-Anbieters:{' '}
              <a
                href={DATA_PROCESSING.vercel.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ugly-pink)] hover:underline"
              >
                {DATA_PROCESSING.vercel.privacyPolicy}
              </a>
            </p>
          </LegalSection>

          {/* 6. Externe Dienstleister */}
          <LegalSection title="6. Externe Dienstleister und Datenübermittlung">
            <h3 className="text-lg font-bold text-[var(--ugly-green)] mb-2">
              Vercel (Hosting & Analytics)
            </h3>
            <p>
              Diese Website wird gehostet bei {DATA_PROCESSING.vercel.name}.
              Server-Standort: {DATA_PROCESSING.vercel.location}.
            </p>
            <p className="mt-2">
              Vercel erfasst automatisch technische Informationen
              (IP-Adresse, Browser, Zugriffszeitpunkte) zur Bereitstellung
              des Dienstes. Vercel Analytics sammelt anonymisierte Daten über
              Seitenaufrufe und Nutzerverhalten.
            </p>
            <p className="mt-2">
              Datenschutzerklärung:{' '}
              <a
                href={DATA_PROCESSING.vercel.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ugly-pink)] hover:underline"
              >
                {DATA_PROCESSING.vercel.privacyPolicy}
              </a>
            </p>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Supabase (Datenbank)
            </h3>
            <p>
              Für die Speicherung von Produktdaten und Votes nutzen wir
              {' '}{DATA_PROCESSING.supabase.name}. Server-Standort:{' '}
              {DATA_PROCESSING.supabase.location}.
            </p>
            <p className="mt-2">
              In der Datenbank werden ausschließlich produktbezogene Daten
              und anonyme Voting-Informationen (Session-IDs) gespeichert.
              Es werden keine personenbezogenen Daten wie Namen oder
              E-Mail-Adressen erfasst.
            </p>
            <p className="mt-2">
              Datenschutzerklärung:{' '}
              <a
                href={DATA_PROCESSING.supabase.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ugly-pink)] hover:underline"
              >
                {DATA_PROCESSING.supabase.privacyPolicy}
              </a>
            </p>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Amazon Partnerprogramm
            </h3>
            <p>
              Diese Website enthält Affiliate-Links zu Amazon. Wenn Sie auf
              einen Link klicken, wird Ihre IP-Adresse an Amazon übertragen.
              Amazon kann diese Informationen nutzen, um Ihre Interaktionen
              zu tracken.
            </p>
            <p className="mt-2">
              Anbieter: {DATA_PROCESSING.amazon.name}<br />
              Standort: {DATA_PROCESSING.amazon.location}
            </p>
            <p className="mt-2">
              Datenschutzerklärung:{' '}
              <a
                href={DATA_PROCESSING.amazon.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ugly-pink)] hover:underline"
              >
                Amazon Datenschutz
              </a>
            </p>
          </LegalSection>

          {/* 7. Cookies */}
          <LegalSection title="7. Cookies">
            <p>
              Diese Website verwendet Session-Cookies, um das Voting-System
              zu ermöglichen und Mehrfach-Votes zu verhindern. Cookies sind
              kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
            </p>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Essenzielle Cookies:
            </h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Session-ID:</strong> Zur Verhinderung von Mehrfach-Votes
                (technisch notwendig)
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Anonymisierte
                Performance-Messung
              </li>
            </ul>
            <p className="mt-4">
              Sie können Cookies in Ihren Browser-Einstellungen jederzeit
              löschen oder blockieren. Beachten Sie jedoch, dass die Website
              dann möglicherweise nicht mehr vollständig funktioniert.
            </p>
          </LegalSection>

          {/* 8. Speicherdauer */}
          <LegalSection title="8. Speicherdauer">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Server-Logfiles:</strong> 7 Tage
              </li>
              <li>
                <strong>Voting-Daten:</strong> Unbegrenzt (anonymisiert, keine
                personenbezogenen Daten)
              </li>
              <li>
                <strong>Session-Cookies:</strong> Bis zum Schließen des Browsers
              </li>
              <li>
                <strong>Analytics-Daten:</strong> 24 Monate (Vercel Analytics)
              </li>
            </ul>
          </LegalSection>

          {/* 9. Ihre Rechte (DSGVO Art. 15-22) */}
          <LegalSection title="9. Ihre Rechte">
            <p>Sie haben folgende Rechte bezüglich Ihrer Daten:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Auskunft (Art. 15 DSGVO):</strong> Information über
                gespeicherte Daten
              </li>
              <li>
                <strong>Berichtigung (Art. 16 DSGVO):</strong> Korrektur
                falscher Daten
              </li>
              <li>
                <strong>Löschung (Art. 17 DSGVO):</strong> Recht auf
                "Vergessenwerden"
              </li>
              <li>
                <strong>Einschränkung (Art. 18 DSGVO):</strong> Einschränkung
                der Verarbeitung
              </li>
              <li>
                <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong>
                Erhalt Ihrer Daten in strukturiertem Format
              </li>
              <li>
                <strong>Widerspruch (Art. 21 DSGVO):</strong> Widerspruch
                gegen Verarbeitung
              </li>
              <li>
                <strong>Beschwerde:</strong> Beschwerde bei Aufsichtsbehörde
              </li>
            </ul>
            <p className="mt-4">
              Kontakt für Datenschutzanfragen:{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-[var(--ugly-pink)] hover:underline">
                {COMPANY_INFO.email}
              </a>
            </p>
          </LegalSection>

          {/* 10. SSL/TLS Verschlüsselung */}
          <LegalSection title="10. SSL- bzw. TLS-Verschlüsselung">
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von "http://"
              auf "https://" wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
            <p className="mt-2">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können
              die Daten, die Sie an uns übermitteln, nicht von Dritten
              mitgelesen werden.
            </p>
          </LegalSection>

          {/* 11. Änderungen */}
          <LegalSection title="11. Änderungen dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
              damit sie stets den aktuellen rechtlichen Anforderungen
              entspricht oder um Änderungen unserer Leistungen in der
              Datenschutzerklärung umzusetzen, z. B. bei der Einführung
              neuer Services. Für Ihren erneuten Besuch gilt dann die
              neue Datenschutzerklärung.
            </p>
          </LegalSection>

          {/* 12. Fragen zum Datenschutz */}
          <LegalSection title="12. Fragen zum Datenschutz">
            <p>
              Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte
              eine E-Mail an:{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-[var(--ugly-pink)] hover:underline">
                {COMPANY_INFO.email}
              </a>
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>

      <Footer />
    </div>
  );
}
