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
  title: "Obchodné podmienky | Crystal Detailing",
  description:
    "Obchodné podmienky poskytovania mobilných detailingových služieb Crystal Detailing – objednávka, ceny, platba, storno a reklamácie.",
  alternates: {
    canonical: "https://crystaldetailing.sk/obchodne-podmienky",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <LegalPage title="Obchodné podmienky" lastUpdated="3. jún 2026">
      <p>
        Tieto obchodné podmienky upravujú poskytovanie mobilných detailingových služieb spoločnosti{" "}
        {COMPANY_LEGAL.name} (IČO: {COMPANY_LEGAL.ico}, DIČ: {COMPANY_LEGAL.dic}), prevádzkovateľa
        značky Crystal Detailing (ďalej len „poskytovateľ“).
      </p>

      <section>
        <h2>1. Predmet služieb</h2>
        <p>
          Poskytovateľ zabezpečuje mobilný detailing vozidiel – čistenie interiéru a exteriéru,
          tepovanie, renováciu svetlometov, ochranu povrchov a súvisiace služby. Služby sa
          realizujú na adrese dohodnutej so zákazníkom.
        </p>
      </section>

      <section>
        <h2>2. Objednávka a rezervácia</h2>
        <p>
          Termín si zákazník rezervuje prostredníctvom online rezervačného systému, telefonicky na{" "}
          <a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE_DISPLAY}</a> alebo e-mailom na{" "}
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>. Rezervácia je záväzná po jej potvrdení
          poskytovateľom.
        </p>
      </section>

      <section>
        <h2>3. Ceny a platba</h2>
        <p>
          Ceny vychádzajú z aktuálneho cenníka a online kalkulačky. Uvedené ceny sú orientačné a
          finálna cena môže byť upravená podľa skutočného stavu a veľkosti vozidla, o čom je
          zákazník informovaný pred začatím práce. Platba prebieha po dokončení služby dohodnutým
          spôsobom.
        </p>
      </section>

      <section>
        <h2>4. Podmienky na mieste</h2>
        <p>
          Zákazník zabezpečí prístup k vozidlu na dohodnutom mieste a v dohodnutom čase. Pre niektoré
          služby je potrebný primeraný priestor okolo vozidla. Poskytovateľ disponuje vlastnou vodou
          a elektrinou, ak nie je dohodnuté inak.
        </p>
      </section>

      <section>
        <h2>5. Storno a zmena termínu</h2>
        <p>
          Termín je možné bezplatne zrušiť alebo presunúť najneskôr 24 hodín pred jeho začiatkom.
          Pri neskoršom zrušení alebo neprítomnosti zákazníka môže poskytovateľ účtovať primeraný
          storno poplatok.
        </p>
      </section>

      <section>
        <h2>6. Reklamácie</h2>
        <p>
          Prípadné nedostatky služby je potrebné nahlásiť bezodkladne, najneskôr do 48 hodín od jej
          poskytnutia, na <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>. Poskytovateľ reklamáciu
          posúdi a v prípade oprávnenosti zjedná nápravu v primeranej lehote.
        </p>
      </section>

      <section>
        <h2>7. Zodpovednosť</h2>
        <p>
          Poskytovateľ vykonáva služby s odbornou starostlivosťou. Nezodpovedá za vady alebo
          opotrebenie vozidla existujúce pred poskytnutím služby, ani za škody spôsobené skrytými
          chybami vozidla.
        </p>
      </section>

      <section>
        <h2>8. Ochrana osobných údajov</h2>
        <p>
          Spracúvanie osobných údajov sa riadi samostatným dokumentom{" "}
          <a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a>.
        </p>
      </section>

      <section>
        <h2>9. Záverečné ustanovenia</h2>
        <p>
          Tieto podmienky nadobúdajú účinnosť dňom zverejnenia. Poskytovateľ si vyhradzuje právo ich
          aktualizovať; rozhodujúce je znenie platné v čase objednávky.
        </p>
      </section>
    </LegalPage>
  )
}
