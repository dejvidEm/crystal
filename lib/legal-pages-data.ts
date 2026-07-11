import type { ContentLocale } from "@/lib/i18n/locale"

export type LegalPageMeta = {
  title: string
  description: string
}

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  closingParagraphs?: string[]
}

export type LegalPageCopy = {
  meta: LegalPageMeta
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

const privacySk: LegalPageCopy = {
  meta: {
    title: "Ochrana osobných údajov",
    description:
      "Zásady ochrany osobných údajov spoločnosti Crystal Detailing. Aké údaje spracúvame, na aký účel a aké sú vaše práva podľa GDPR.",
  },
  title: "Ochrana osobných údajov",
  lastUpdated: "3. jún 2026",
  intro:
    "Tieto zásady popisujú, ako spoločnosť {{companyName}} (IČO: {{ico}}), prevádzkovateľ značky Crystal Detailing, spracúva vaše osobné údaje v súlade s Nariadením (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.",
  sections: [
    {
      heading: "1. Prevádzkovateľ",
      paragraphs: [
        "{{companyName}}, IČO: {{ico}}, DIČ: {{dic}}.\nE-mail: {{email}}\nTelefón: {{phone}}",
      ],
    },
    {
      heading: "2. Aké údaje spracúvame",
      paragraphs: ["V závislosti od toho, ako nás kontaktujete, môžeme spracúvať:"],
      bullets: [
        "kontaktné údaje – meno, e-mailová adresa, telefónne číslo,",
        "nepovinné údaje – názov firmy a obsah vašej správy či dopytu,",
        "údaje z cenovej kalkulačky – vybraný typ vozidla, služba, lokalita a orientačná cena,",
        "technické údaje – nevyhnutné súbory cookie (jazyk, súhlas s cookies).",
      ],
    },
    {
      heading: "3. Účel a právny základ spracúvania",
      bullets: [
        "Vybavenie dopytu a kontaktu – na základe vašej žiadosti pred uzavretím zmluvy, resp. nášho oprávneného záujmu reagovať na dopyt (čl. 6 ods. 1 písm. b) a f) GDPR).",
        "Poskytnutie služby a fakturácia – plnenie zmluvy a zákonné povinnosti (čl. 6 ods. 1 písm. b) a c) GDPR).",
        "Nevyhnutné cookies – náš oprávnený záujem na funkčnosti webu (čl. 6 ods. 1 písm. f) GDPR).",
      ],
    },
    {
      heading: "4. Príjemcovia a sprostredkovatelia",
      paragraphs: [
        "Na odosielanie e-mailových notifikácií z formulárov využívame službu Resend (Resend, Inc.). Na prevádzku webu a rezervácie ďalej spolupracujeme s poskytovateľmi hostingu (Vercel) a rezervačného systému (Bookio). Títo partneri spracúvajú údaje výhradne pre uvedené účely a na základe príslušných zmlúv.",
      ],
    },
    {
      heading: "5. Doba uchovávania",
      paragraphs: [
        "Osobné údaje uchovávame len po dobu nevyhnutnú na splnenie účelu – pri dopytoch spravidla do vybavenia a primeranú dobu potom, pri zmluvách a fakturácii po dobu vyžadovanú právnymi predpismi.",
      ],
    },
    {
      heading: "6. Vaše práva",
      paragraphs: ["Podľa GDPR máte právo na:"],
      bullets: [
        "prístup k svojim osobným údajom,",
        "opravu nesprávnych alebo neúplných údajov,",
        "vymazanie údajov („právo na zabudnutie“),",
        "obmedzenie spracúvania a námietku proti spracúvaniu,",
        "prenosnosť údajov,",
        "podanie sťažnosti na Úrad na ochranu osobných údajov SR (dataprotection.gov.sk).",
      ],
      closingParagraphs: ["Svoje práva si môžete uplatniť e-mailom na {{email}}."],
    },
    {
      heading: "7. Cookies",
      paragraphs: [
        "Web používa nevyhnutné cookies a lokálne úložisko na zapamätanie jazyka a vášho súhlasu s cookies. Súhlas môžete kedykoľvek odvolať vymazaním údajov prehliadača.",
      ],
    },
    {
      heading: "8. Zmeny zásad",
      paragraphs: [
        "Tieto zásady môžeme priebežne aktualizovať. Aktuálne znenie je vždy dostupné na tejto stránke.",
      ],
    },
  ],
}

const privacyEn: LegalPageCopy = {
  meta: {
    title: "Privacy Policy",
    description:
      "Crystal Detailing privacy policy. What data we process, why, and your rights under GDPR.",
  },
  title: "Privacy Policy",
  lastUpdated: "3 June 2026",
  intro:
    "This policy describes how {{companyName}} (Company ID: {{ico}}), operator of the Crystal Detailing brand, processes your personal data in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Slovak data protection law.",
  sections: [
    {
      heading: "1. Data controller",
      paragraphs: [
        "{{companyName}}, Company ID: {{ico}}, Tax ID: {{dic}}.\nEmail: {{email}}\nPhone: {{phone}}",
      ],
    },
    {
      heading: "2. What data we process",
      paragraphs: ["Depending on how you contact us, we may process:"],
      bullets: [
        "contact details – name, email address, phone number,",
        "optional details – company name and the content of your message or enquiry,",
        "calculator data – selected vehicle type, service, location, and estimated price,",
        "technical data – essential cookies (language, cookie consent).",
      ],
    },
    {
      heading: "3. Purpose and legal basis",
      bullets: [
        "Handling enquiries and contact – based on your request before entering a contract, or our legitimate interest in responding (Art. 6(1)(b) and (f) GDPR).",
        "Providing services and invoicing – contract performance and legal obligations (Art. 6(1)(b) and (c) GDPR).",
        "Essential cookies – our legitimate interest in website functionality (Art. 6(1)(f) GDPR).",
      ],
    },
    {
      heading: "4. Recipients and processors",
      paragraphs: [
        "We use Resend (Resend, Inc.) to send email notifications from forms. We also work with hosting (Vercel) and booking (Bookio) providers. These partners process data only for the stated purposes and under appropriate agreements.",
      ],
    },
    {
      heading: "5. Retention period",
      paragraphs: [
        "We retain personal data only as long as necessary – for enquiries, usually until handled and for a reasonable period thereafter; for contracts and invoicing, as required by law.",
      ],
    },
    {
      heading: "6. Your rights",
      paragraphs: ["Under GDPR you have the right to:"],
      bullets: [
        "access your personal data,",
        "rectify inaccurate or incomplete data,",
        "erasure (“right to be forgotten”),",
        "restrict processing and object to processing,",
        "data portability,",
        "lodge a complaint with the Slovak Data Protection Authority (dataprotection.gov.sk).",
      ],
      closingParagraphs: ["You can exercise your rights by email at {{email}}."],
    },
    {
      heading: "7. Cookies",
      paragraphs: [
        "The website uses essential cookies and local storage to remember language and cookie consent. You can withdraw consent at any time by clearing browser data.",
      ],
    },
    {
      heading: "8. Changes to this policy",
      paragraphs: ["We may update this policy from time to time. The current version is always available on this page."],
    },
  ],
}

const privacyDe: LegalPageCopy = {
  meta: {
    title: "Datenschutzerklärung",
    description:
      "Datenschutzerklärung von Crystal Detailing. Welche Daten wir verarbeiten, warum und welche Rechte Sie nach der DSGVO haben.",
  },
  title: "Datenschutzerklärung",
  lastUpdated: "3. Juni 2026",
  intro:
    "Diese Erklärung beschreibt, wie {{companyName}} (ID-Nr.: {{ico}}), Betreiber der Marke Crystal Detailing, Ihre personenbezogenen Daten gemäß der Verordnung (EU) 2016/679 (DSGVO) und dem slowakischen Datenschutzgesetz verarbeitet.",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [
        "{{companyName}}, ID-Nr.: {{ico}}, Steuernummer: {{dic}}.\nE-Mail: {{email}}\nTelefon: {{phone}}",
      ],
    },
    {
      heading: "2. Welche Daten wir verarbeiten",
      paragraphs: ["Je nach Art der Kontaktaufnahme können wir verarbeiten:"],
      bullets: [
        "Kontaktdaten – Name, E-Mail-Adresse, Telefonnummer,",
        "optionale Angaben – Firmenname und Inhalt Ihrer Nachricht oder Anfrage,",
        "Daten aus dem Preisrechner – Fahrzeugtyp, Leistung, Standort und Richtpreis,",
        "technische Daten – notwendige Cookies (Sprache, Cookie-Einwilligung).",
      ],
    },
    {
      heading: "3. Zweck und Rechtsgrundlage",
      bullets: [
        "Bearbeitung von Anfragen und Kontakt – auf Grundlage Ihrer Anfrage vor Vertragsschluss bzw. unseres berechtigten Interesses an der Beantwortung (Art. 6 Abs. 1 lit. b und f DSGVO).",
        "Erbringung der Leistung und Rechnungsstellung – Vertragserfüllung und gesetzliche Pflichten (Art. 6 Abs. 1 lit. b und c DSGVO).",
        "Notwendige Cookies – unser berechtigtes Interesse an der Funktionsfähigkeit der Website (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      heading: "4. Empfänger und Auftragsverarbeiter",
      paragraphs: [
        "Für E-Mail-Benachrichtigungen aus Formularen nutzen wir Resend (Resend, Inc.). Für den Betrieb der Website und Buchungen arbeiten wir mit Hosting-Anbietern (Vercel) und dem Buchungssystem Bookio zusammen. Diese Partner verarbeiten Daten ausschließlich für die genannten Zwecke auf Grundlage entsprechender Vereinbarungen.",
      ],
    },
    {
      heading: "5. Speicherdauer",
      paragraphs: [
        "Personenbezogene Daten speichern wir nur so lange wie nötig – bei Anfragen in der Regel bis zur Bearbeitung und für eine angemessene Zeit danach; bei Verträgen und Rechnungen gemäß gesetzlicher Vorgaben.",
      ],
    },
    {
      heading: "6. Ihre Rechte",
      paragraphs: ["Nach der DSGVO haben Sie das Recht auf:"],
      bullets: [
        "Auskunft über Ihre personenbezogenen Daten,",
        "Berichtigung unrichtiger oder unvollständiger Daten,",
        "Löschung („Recht auf Vergessenwerden“),",
        "Einschränkung der Verarbeitung und Widerspruch gegen die Verarbeitung,",
        "Datenübertragbarkeit,",
        "Beschwerde beim slowakischen Datenschutzamt (dataprotection.gov.sk).",
      ],
      closingParagraphs: ["Ihre Rechte können Sie per E-Mail unter {{email}} geltend machen."],
    },
    {
      heading: "7. Cookies",
      paragraphs: [
        "Die Website verwendet notwendige Cookies und lokalen Speicher für Sprache und Cookie-Einwilligung. Die Einwilligung können Sie jederzeit durch Löschen der Browserdaten widerrufen.",
      ],
    },
    {
      heading: "8. Änderungen",
      paragraphs: [
        "Wir können diese Erklärung von Zeit zu Zeit aktualisieren. Die aktuelle Fassung ist stets auf dieser Seite verfügbar.",
      ],
    },
  ],
}

const termsSk: LegalPageCopy = {
  meta: {
    title: "Obchodné podmienky",
    description:
      "Obchodné podmienky poskytovania mobilných detailingových služieb Crystal Detailing – objednávka, ceny, platba, storno a reklamácie.",
  },
  title: "Obchodné podmienky",
  lastUpdated: "3. jún 2026",
  intro:
    "Tieto obchodné podmienky upravujú poskytovanie mobilných detailingových služieb spoločnosti {{companyName}} (IČO: {{ico}}, DIČ: {{dic}}), prevádzkovateľa značky Crystal Detailing (ďalej len „poskytovateľ“).",
  sections: [
    {
      heading: "1. Predmet služieb",
      paragraphs: [
        "Poskytovateľ zabezpečuje mobilný detailing vozidiel – čistenie interiéru a exteriéru, tepovanie, renováciu svetlometov, ochranu povrchov a súvisiace služby. Služby sa realizujú na adrese dohodnutej so zákazníkom.",
      ],
    },
    {
      heading: "2. Objednávka a rezervácia",
      paragraphs: [
        "Termín si zákazník rezervuje prostredníctvom online rezervačného systému, telefonicky na {{phone}} alebo e-mailom na {{email}}. Rezervácia je záväzná po jej potvrdení poskytovateľom.",
      ],
    },
    {
      heading: "3. Ceny a platba",
      paragraphs: [
        "Ceny vychádzajú z aktuálneho cenníka a online kalkulačky. Uvedené ceny sú orientačné a finálna cena môže byť upravená podľa skutočného stavu a veľkosti vozidla, o čom je zákazník informovaný pred začatím práce. Platba prebieha po dokončení služby dohodnutým spôsobom.",
      ],
    },
    {
      heading: "4. Podmienky na mieste",
      paragraphs: [
        "Zákazník zabezpečí prístup k vozidlu na dohodnutom mieste a v dohodnutom čase. Pre niektoré služby je potrebný primeraný priestor okolo vozidla. Poskytovateľ disponuje vlastnou vodou a elektrinou, ak nie je dohodnuté inak.",
      ],
    },
    {
      heading: "5. Storno a zmena termínu",
      paragraphs: [
        "Termín je možné bezplatne zrušiť alebo presunúť najneskôr 24 hodín pred jeho začiatkom. Pri neskoršom zrušení alebo neprítomnosti zákazníka môže poskytovateľ účtovať primeraný storno poplatok.",
      ],
    },
    {
      heading: "6. Reklamácie",
      paragraphs: [
        "Prípadné nedostatky služby je potrebné nahlásiť bezodkladne, najneskôr do 48 hodín od jej poskytnutia, na {{email}}. Poskytovateľ reklamáciu posúdi a v prípade oprávnenosti zjedná nápravu v primeranej lehote.",
      ],
    },
    {
      heading: "7. Zodpovednosť",
      paragraphs: [
        "Poskytovateľ vykonáva služby s odbornou starostlivosťou. Nezodpovedá za vady alebo opotrebenie vozidla existujúce pred poskytnutím služby, ani za škody spôsobené skrytými chybami vozidla.",
      ],
    },
    {
      heading: "8. Ochrana osobných údajov",
      paragraphs: [
        "Spracúvanie osobných údajov sa riadi samostatným dokumentom {{privacyLink}}.",
      ],
    },
    {
      heading: "9. Záverečné ustanovenia",
      paragraphs: [
        "Tieto podmienky nadobúdajú účinnosť dňom zverejnenia. Poskytovateľ si vyhradzuje právo ich aktualizovať; rozhodujúce je znenie platné v čase objednávky.",
      ],
    },
  ],
}

const termsEn: LegalPageCopy = {
  meta: {
    title: "Terms of Service",
    description:
      "Terms and conditions for Crystal Detailing mobile detailing services – booking, pricing, payment, cancellation, and complaints.",
  },
  title: "Terms of Service",
  lastUpdated: "3 June 2026",
  intro:
    "These terms govern the provision of mobile detailing services by {{companyName}} (Company ID: {{ico}}, Tax ID: {{dic}}), operator of the Crystal Detailing brand (the “provider”).",
  sections: [
    {
      heading: "1. Scope of services",
      paragraphs: [
        "The provider delivers mobile vehicle detailing – interior and exterior cleaning, upholstery shampooing, headlight restoration, surface protection, and related services. Services are performed at the address agreed with the customer.",
      ],
    },
    {
      heading: "2. Booking and reservation",
      paragraphs: [
        "The customer books an appointment via the online booking system, by phone at {{phone}}, or by email at {{email}}. A reservation is binding once confirmed by the provider.",
      ],
    },
    {
      heading: "3. Prices and payment",
      paragraphs: [
        "Prices are based on the current price list and online calculator. Listed prices are indicative; the final price may be adjusted according to the actual condition and size of the vehicle, and the customer is informed before work begins. Payment is made after completion of the service by the agreed method.",
      ],
    },
    {
      heading: "4. On-site requirements",
      paragraphs: [
        "The customer ensures access to the vehicle at the agreed location and time. Some services require adequate space around the vehicle. The provider brings its own water and power unless otherwise agreed.",
      ],
    },
    {
      heading: "5. Cancellation and rescheduling",
      paragraphs: [
        "An appointment may be cancelled or rescheduled free of charge at least 24 hours before it starts. For later cancellation or customer no-show, the provider may charge a reasonable cancellation fee.",
      ],
    },
    {
      heading: "6. Complaints",
      paragraphs: [
        "Any defects must be reported promptly, at the latest within 48 hours of the service, to {{email}}. The provider will assess the complaint and, if justified, remedy it within a reasonable time.",
      ],
    },
    {
      heading: "7. Liability",
      paragraphs: [
        "The provider performs services with professional care. It is not liable for defects or wear existing before the service, nor for damage caused by hidden faults of the vehicle.",
      ],
    },
    {
      heading: "8. Privacy",
      paragraphs: ["Personal data processing is governed by the separate document {{privacyLink}}."],
    },
    {
      heading: "9. Final provisions",
      paragraphs: [
        "These terms take effect on the date of publication. The provider may update them; the version in force at the time of booking applies.",
      ],
    },
  ],
}

const termsDe: LegalPageCopy = {
  meta: {
    title: "Allgemeine Geschäftsbedingungen",
    description:
      "AGB für mobile Detailing-Leistungen von Crystal Detailing – Buchung, Preise, Zahlung, Stornierung und Reklamationen.",
  },
  title: "Allgemeine Geschäftsbedingungen",
  lastUpdated: "3. Juni 2026",
  intro:
    "Diese Bedingungen regeln die Erbringung mobiler Detailing-Leistungen durch {{companyName}} (ID-Nr.: {{ico}}, Steuernummer: {{dic}}), Betreiber der Marke Crystal Detailing (der „Anbieter“).",
  sections: [
    {
      heading: "1. Leistungsgegenstand",
      paragraphs: [
        "Der Anbieter erbringt mobile Fahrzeugpflege – Innen- und Außenreinigung, Polsterreinigung, Scheinwerfer-Aufbereitung, Oberflächenschutz und verwandte Leistungen. Die Leistungen werden an der mit dem Kunden vereinbarten Adresse erbracht.",
      ],
    },
    {
      heading: "2. Buchung und Terminvereinbarung",
      paragraphs: [
        "Der Kunde bucht einen Termin über das Online-Buchungssystem, telefonisch unter {{phone}} oder per E-Mail an {{email}}. Eine Reservierung ist verbindlich, sobald sie vom Anbieter bestätigt wurde.",
      ],
    },
    {
      heading: "3. Preise und Zahlung",
      paragraphs: [
        "Die Preise richten sich nach der aktuellen Preisliste und dem Online-Rechner. Angegebene Preise sind Richtwerte; der Endpreis kann je nach tatsächlichem Zustand und Größe des Fahrzeugs angepasst werden – der Kunde wird vor Beginn der Arbeit informiert. Die Zahlung erfolgt nach Abschluss der Leistung in vereinbarter Form.",
      ],
    },
    {
      heading: "4. Bedingungen vor Ort",
      paragraphs: [
        "Der Kunde gewährleistet Zugang zum Fahrzeug am vereinbarten Ort und zur vereinbarten Zeit. Für einige Leistungen ist ausreichend Platz um das Fahrzeug erforderlich. Der Anbieter bringt eigenes Wasser und Strom mit, sofern nicht anders vereinbart.",
      ],
    },
    {
      heading: "5. Stornierung und Terminänderung",
      paragraphs: [
        "Ein Termin kann kostenlos spätestens 24 Stunden vor Beginn storniert oder verschoben werden. Bei späterer Stornierung oder Nichterscheinen des Kunden kann der Anbieter eine angemessene Stornogebühr berechnen.",
      ],
    },
    {
      heading: "6. Reklamationen",
      paragraphs: [
        "Mängel sind unverzüglich, spätestens innerhalb von 48 Stunden nach der Leistung, an {{email}} zu melden. Der Anbieter prüft die Reklamation und behebt sie bei Berechtigung in angemessener Frist.",
      ],
    },
    {
      heading: "7. Haftung",
      paragraphs: [
        "Der Anbieter erbringt Leistungen mit fachlicher Sorgfalt. Er haftet nicht für Mängel oder Abnutzung, die vor der Leistung bestanden, noch für Schäden durch versteckte Fahrzeugfehler.",
      ],
    },
    {
      heading: "8. Datenschutz",
      paragraphs: [
        "Die Verarbeitung personenbezogener Daten regelt das separate Dokument {{privacyLink}}.",
      ],
    },
    {
      heading: "9. Schlussbestimmungen",
      paragraphs: [
        "Diese Bedingungen treten mit der Veröffentlichung in Kraft. Der Anbieter kann sie aktualisieren; maßgeblich ist die zum Zeitpunkt der Buchung gültige Fassung.",
      ],
    },
  ],
}

export const privacyCopyByLocale: Record<ContentLocale, LegalPageCopy> = {
  sk: privacySk,
  en: privacyEn,
  de: privacyDe,
}

export const termsCopyByLocale: Record<ContentLocale, LegalPageCopy> = {
  sk: termsSk,
  en: termsEn,
  de: termsDe,
}

export function getPrivacyCopy(lang: ContentLocale): LegalPageCopy {
  return privacyCopyByLocale[lang]
}

export function getTermsCopy(lang: ContentLocale): LegalPageCopy {
  return termsCopyByLocale[lang]
}

export const privacyMetadataSk = privacySk.meta
export const privacyMetadataEn = privacyEn.meta
export const privacyMetadataDe = privacyDe.meta
export const termsMetadataSk = termsSk.meta
export const termsMetadataEn = termsEn.meta
export const termsMetadataDe = termsDe.meta
