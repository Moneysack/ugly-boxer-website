import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { COMPANY_INFO, AFFILIATE_INFO } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Impressum | UglyBoxer',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG',
  robots: 'noindex, nofollow',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <LegalPageLayout
          title="Impressum"
          lastUpdated="01. Februar 2026"
        >
          {/* § 5 TMG - Angaben gemäß Telemediengesetz */}
          <LegalSection title="Angaben gemäß § 5 TMG">
            <p><strong>{COMPANY_INFO.name}</strong></p>
            <p>
              {COMPANY_INFO.address.street}<br />
              {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}<br />
              {COMPANY_INFO.address.country}
            </p>
          </LegalSection>

          {/* Vertreten durch */}
          <LegalSection title="Vertreten durch">
            <p>Geschäftsführer: {COMPANY_INFO.managingDirector}</p>
          </LegalSection>

          {/* Kontakt */}
          <LegalSection title="Kontakt">
            <p>E-Mail: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[var(--ugly-pink)] hover:underline">{COMPANY_INFO.email}</a></p>
            {COMPANY_INFO.phone && COMPANY_INFO.phone !== '+49 XXX XXXXXXX' && (
              <p>Telefon: {COMPANY_INFO.phone}</p>
            )}
          </LegalSection>

          {/* Registereintrag */}
          <LegalSection title="Registereintrag">
            <p>Eintragung im Handelsregister</p>
            <p>Registergericht: {COMPANY_INFO.commercialRegister.court}</p>
            <p>Registernummer: {COMPANY_INFO.commercialRegister.number}</p>
            <p>EUID: {COMPANY_INFO.commercialRegister.euid}</p>
          </LegalSection>

          {/* Umsatzsteuer-ID (nur anzeigen wenn vorhanden) */}
          {COMPANY_INFO.vatId && (
            <LegalSection title="Umsatzsteuer-ID">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a
                Umsatzsteuergesetz:<br />
                {COMPANY_INFO.vatId}
              </p>
            </LegalSection>
          )}

          {/* Verantwortlich für den Inhalt */}
          <LegalSection title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
            <p>{COMPANY_INFO.responsibleForContent}</p>
          </LegalSection>

          {/* Amazon Partnerprogramm (rechtlich notwendig!) */}
          <LegalSection title="Teilnahme am Amazon Partnerprogramm">
            <p>
              {AFFILIATE_INFO.amazonPartnerProgram.description}
            </p>
            <p className="mt-4">
              UglyBoxer ist Teilnehmer des Partnerprogramms von Amazon EU,
              das zur Bereitstellung eines Mediums für Websites konzipiert wurde,
              mittels dessen durch die Platzierung von Werbeanzeigen und Links
              zu Amazon.de Werbekostenerstattung verdient werden kann.
            </p>
            <p className="mt-4">
              Amazon und das Amazon-Logo sind Warenzeichen von Amazon.com, Inc.
              oder eines seiner verbundenen Unternehmen.
            </p>
          </LegalSection>

          {/* Online-Streitbeilegung */}
          <LegalSection title="Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ugly-pink)] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>

          {/* Haftungsausschluss (optional, aber empfohlen) */}
          <LegalSection title="Haftungsausschluss">
            <h3 className="text-lg font-bold text-[var(--ugly-green)] mb-2">
              Haftung für Inhalte
            </h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Haftung für Links
            </h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>

            <h3 className="text-lg font-bold text-[var(--ugly-green)] mt-6 mb-2">
              Urheberrecht
            </h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
              Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
              jeweiligen Autors bzw. Erstellers.
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>

      <Footer />
    </div>
  );
}
