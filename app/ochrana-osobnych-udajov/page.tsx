import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import {
  COMPANY_LEGAL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Crystal Detailing",
  description:
    "Zásady ochrany osobných údajov spoločnosti Crystal Detailing. Aké údaje spracúvame, na aký účel a aké sú vaše práva podľa GDPR.",
  alternates: {
    canonical: "https://crystaldetailing.sk/ochrana-osobnych-udajov",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Ochrana osobných údajov" lastUpdated="3. jún 2026">
      <p>
        Tieto zásady popisujú, ako spoločnosť {COMPANY_LEGAL.name} (IČO: {COMPANY_LEGAL.ico}),
        prevádzkovateľ značky Crystal Detailing, spracúva vaše osobné údaje v súlade s Nariadením
        (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
      </p>

      <section>
        <h2>1. Prevádzkovateľ</h2>
        <p>
          {COMPANY_LEGAL.name}, IČO: {COMPANY_LEGAL.ico}, DIČ: {COMPANY_LEGAL.dic}.
          <br />
          E-mail: <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
          <br />
          Telefón: <a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE_DISPLAY}</a>
        </p>
      </section>

      <section>
        <h2>2. Aké údaje spracúvame</h2>
        <p>V závislosti od toho, ako nás kontaktujete, môžeme spracúvať:</p>
        <ul>
          <li>kontaktné údaje – meno, e-mailová adresa, telefónne číslo,</li>
          <li>nepovinné údaje – názov firmy a obsah vašej správy či dopytu,</li>
          <li>
            údaje z cenovej kalkulačky – vybraný typ vozidla, služba, lokalita a orientačná cena,
          </li>
          <li>technické údaje – nevyhnutné súbory cookie (jazyk, súhlas s cookies).</li>
        </ul>
      </section>

      <section>
        <h2>3. Účel a právny základ spracúvania</h2>
        <ul>
          <li>
            <strong>Vybavenie dopytu a kontaktu</strong> – na základe vašej žiadosti pred uzavretím
            zmluvy, resp. nášho oprávneného záujmu reagovať na dopyt (čl. 6 ods. 1 písm. b) a f)
            GDPR).
          </li>
          <li>
            <strong>Poskytnutie služby a fakturácia</strong> – plnenie zmluvy a zákonné povinnosti
            (čl. 6 ods. 1 písm. b) a c) GDPR).
          </li>
          <li>
            <strong>Nevyhnutné cookies</strong> – náš oprávnený záujem na funkčnosti webu (čl. 6
            ods. 1 písm. f) GDPR).
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Príjemcovia a sprostredkovatelia</h2>
        <p>
          Na odosielanie e-mailových notifikácií z formulárov využívame službu Resend (Resend,
          Inc.). Na prevádzku webu a rezervácie ďalej spolupracujeme s poskytovateľmi hostingu
          (Vercel) a rezervačného systému (Bookio). Títo partneri spracúvajú údaje výhradne pre
          uvedené účely a na základe príslušných zmlúv.
        </p>
      </section>

      <section>
        <h2>5. Doba uchovávania</h2>
        <p>
          Osobné údaje uchovávame len po dobu nevyhnutnú na splnenie účelu – pri dopytoch spravidla
          do vybavenia a primeranú dobu potom, pri zmluvách a fakturácii po dobu vyžadovanú právnymi
          predpismi.
        </p>
      </section>

      <section>
        <h2>6. Vaše práva</h2>
        <p>Podľa GDPR máte právo na:</p>
        <ul>
          <li>prístup k svojim osobným údajom,</li>
          <li>opravu nesprávnych alebo neúplných údajov,</li>
          <li>vymazanie údajov („právo na zabudnutie“),</li>
          <li>obmedzenie spracúvania a námietku proti spracúvaniu,</li>
          <li>prenosnosť údajov,</li>
          <li>
            podanie sťažnosti na Úrad na ochranu osobných údajov SR (
            <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">
              dataprotection.gov.sk
            </a>
            ).
          </li>
        </ul>
        <p>
          Svoje práva si môžete uplatniť e-mailom na <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>
          Web používa nevyhnutné cookies a lokálne úložisko na zapamätanie jazyka a vášho súhlasu s
          cookies. Súhlas môžete kedykoľvek odvolať vymazaním údajov prehliadača.
        </p>
      </section>

      <section>
        <h2>8. Zmeny zásad</h2>
        <p>
          Tieto zásady môžeme priebežne aktualizovať. Aktuálne znenie je vždy dostupné na tejto
          stránke.
        </p>
      </section>
    </LegalPage>
  )
}
