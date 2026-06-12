/**
 * Blog – články, kategórie a pomocné funkcie.
 * Nový článok: pridaj záznam do `blogPosts` (zoradené od najnovšieho).
 */

export type BlogCategoryId =
  | "detailing-tips"
  | "tepovanie"
  | "mobilny-detailing"

export type BlogCategory = {
  id: BlogCategoryId
  label: { sk: string; en: string; de: string }
}

export const blogCategories: BlogCategory[] = [
  { id: "detailing-tips", label: { sk: "Detailing tipy", en: "Detailing Tips", de: "Detailing-Tipps" } },
  { id: "tepovanie", label: { sk: "Tepovanie", en: "Upholstery Cleaning", de: "Polsterreinigung" } },
  { id: "mobilny-detailing", label: { sk: "Mobilný detailing", en: "Mobile Detailing", de: "Mobile Autopflege" } },
]

export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }

export type BlogPost = {
  slug: string
  category: BlogCategoryId
  publishedAt: string
  image: string
  imageAlt: { sk: string; en: string; de: string }
  title: { sk: string; en: string; de: string }
  excerpt: { sk: string; en: string; de: string }
  body: { sk: BlogContentBlock[]; en: BlogContentBlock[]; de: BlogContentBlock[] }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "mobilny-detailing-bratislava-rakusko",
    category: "mobilny-detailing",
    publishedAt: "2026-06-06",
    image: "/images/blog/mobilny-detailing-bratislava-rakusko.png",
    imageAlt: {
      sk: "Mobilný detailing auta pri dome v Bratislave – technik Crystal Detailing s výbavou a panorámou Bratislavy",
      en: "Mobile car detailing at a home in Bratislava – Crystal Detailing technician with equipment and Bratislava skyline",
      de: "Mobile Autopflege zu Hause in Bratislava – Crystal Detailing Techniker mit Ausrüstung und Bratislava Skyline",
    },
    title: {
      sk: "Mobilný detailing v Bratislave a v Rakúsku: prídeme k vám domov aj cez hranicu",
      en: "Mobile detailing in Bratislava and Austria: we come to your home, even across the border",
      de: "Mobile Autopflege in Bratislava und Österreich: Wir kommen zu Ihnen nach Hause, auch über die Grenze",
    },
    excerpt: {
      sk: "Profesionálny mobilný detailing v Bratislave, okolí a v Rakúsku pri hranici až po Viedeň. Kompletná výbava, tepovanie a čistenie auta priamo u vás – bez cesty do servisu.",
      en: "Professional mobile detailing in Bratislava, surrounding areas, and Austria near the border up to Vienna. Full equipment, shampooing and car cleaning at your location—no trip to a service centre.",
      de: "Professionelle mobile Autopflege in Bratislava, Umgebung und Österreich nahe der Grenze bis Wien. Komplette Ausrüstung, Polsterreinigung und Autoreinigung bei Ihnen vor Ort – ohne Fahrt zur Werkstatt.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Predstavte si, že auto máte zaparkované pred domom, vo firme alebo na dvore. Príde plne vybavená mobilná jednotka, technik nastaví pracovisko a o pár hodín máte interiér aj exteriér v stave, aký by ste v bežnej umyvárke nedosiahli – bez toho, aby ste niekam museli ísť. Presne tak funguje mobilný detailing Crystal Detailing v Bratislave a okolí.",
        },
        {
          type: "p",
          text: "Na obrázku vidíte typickú scénu z našej práce: technik pri striebornom Audi, mobilný van s organizovanou výbavou a v pozadí Bratislava. Nie je to len marketingová fotka – takto to vyzerá u zákazníkov každý deň. Prídeme na dohodnutú adresu, postaráme sa o auto na mieste a vy medzitým riešite svoj deň.",
        },
        {
          type: "h2",
          text: "Prečo mobilný detailing v Bratislave dáva zmysel",
        },
        {
          type: "p",
          text: "Bratislava je mesto, kde ľudia často nemajú čas strácať pol dňa v servise alebo čakať v rade v automatickej umyvárke. Mobilný detailing rieši presne to: šetrí čas, eliminuje stres a prináša prémiový výsledok priamo k vám.",
        },
        {
          type: "ul",
          items: [
            "nemusíte nikam jazdiť – služba prebehne u vás doma, vo firme alebo na parkovisku",
            "individuálny prístup podľa typu vozidla, veľkosti a stavu znečistenia",
            "profesionálna výbava vrátane tepovača, extraktorov a prémiových prípravkov",
            "možnosť kombinovať služby – od balíka REFRESH po tepovanie a renováciu svetlometov",
            "transparentné ceny podľa cenníka a kalkulačky ešte pred začatím práce",
          ],
        },
        {
          type: "p",
          text: "Či bývate v Starom Meste, Ružinove, Petržalke, Dúbravke alebo v okrajových častiach ako Lamač či Devínska Nová Ves – mobilný detailing je praktickejší než hľadať voľný termín v kamennom servise.",
        },
        {
          type: "h2",
          text: "Kam všade dochádzame okrem Bratislavy",
        },
        {
          type: "p",
          text: "Crystal Detailing pokrýva nielen hlavné mesto, ale celé bezprostredné okolie a západné Slovensko. Bežne vyrazíme do Pezinka, Senca, Chorvátskeho Grobu, na Záhorie (Malacky, Stupava, Senica, Skalica) aj do Trnavského kraja (Trnava, Galanta, Dunajská Streda). Kompletný prehľad nájdete na stránke lokality.",
        },
        {
          type: "p",
          text: "Od roku 2026 sme rozšírili výjazdy aj do Rakúska pri Bratislave. Ak bývate v Hainburg an der Donau, Bruck an der Leitha, v Burgenlande (Eisenstadt, Mattersburg, Neusiedl am See) alebo vo víenskom okolí až po samotnú Viedeň – mobilný detailing vám vieme prísť aj tam. Výjazd zabezpečujeme z Bratislavy, komunikáciu vieme prispôsobiť a službu realizujeme rovnako profesionálne ako na Slovensku.",
        },
        {
          type: "h2",
          text: "Čo všetko vieme urobiť priamo u vás",
        },
        {
          type: "p",
          text: "Mobilný detailing nie je len umytie auta zvonku. Ide o komplexnú starostlivosť o vozidlo – interiér aj exteriér – s dôrazom na detail a kvalitu materiálov.",
        },
        {
          type: "ul",
          items: [
            "umývanie a ošetrenie exteriéru vrátane diskov a prípravkov šetrných k laku",
            "hĺbkové čistenie interiéru – palubná doska, plasty, koža, textílie",
            "tepovanie sedadiel a kobercov extrakčnou metódou",
            "renovácia svetlometov – obnova priehľadnosti a svietivosti",
            "doplnkové služby ako ozónovanie, ošetrenie kože či čistenie motora",
          ],
        },
        {
          type: "p",
          text: "Balíky REFRESH, INTERIÉR, KOMPLET a TEPOVANIE nájdete v cenníku. Cena sa odvíja aj od veľkosti vozidla – SUV a dodávky majú príplatok podľa kategórie. Presný odhad získate v cenovej kalkulačke na webe.",
        },
        {
          type: "h2",
          text: "Ako prebieha objednávka – od rezervácie po hotové auto",
        },
        {
          type: "p",
          text: "Proces je jednoduchý a nemusíte nič zložito riešiť:",
        },
        {
          type: "ul",
          items: [
            "vyberte službu v cenníku alebo kalkulačke a rezervujte termín online cez Bookio",
            "dohodneme presný čas príchodu a adresu – dom, firma, parkovisko",
            "technik príde s mobilným vanom a kompletnou výbavou vrátane vody a elektriny",
            "pred začatím práce potvrdíme rozsah a cenu",
            "po dokončení skontrolujete výsledok a auto môžete hneď používať",
          ],
        },
        {
          type: "p",
          text: "Pri výjazdoch do Rakúska rátať s cestovným časom z Bratislavy – Hainburg je približne 15–20 minút, Eisenstadt okolo hodiny, Viedeň podľa okresu 45–75 minút. Presný čas vám potvrdíme pri rezervácii.",
        },
        {
          type: "h2",
          text: "Pre koho je služba ideálna",
        },
        {
          type: "p",
          text: "Mobilný detailing ocenia majitelia prémiových a bežných áut, rodiny s deťmi (špinavé sedačky a koberce), firmy s firemnými vozidlami, predajcov áut pred odovzdaním kupujúcemu aj ľudia v Rakúsku pri hranici, ktorí nechcú kvôli čisteniu auta cestovať na Slovensko.",
        },
        {
          type: "p",
          text: "Ak hľadáte „mobilný detailing Bratislava“, „tepovanie auta Pezinok“ alebo „mobile Autopflege Wien“ – Crystal Detailing je služba, ktorá príde k vám. Nie vy k nám.",
        },
        {
          type: "h2",
          text: "Záver",
        },
        {
          type: "p",
          text: "Mobilný detailing v Bratislave a v Rakúsku pri hranici je najpraktickejší spôsob, ako mať auto čisté, voňavé a udržiavané bez straty času. Rezervujte si termín ešte dnes – prídeme s výbavou, skúsenosťami a s cieľom, aby ste boli s výsledkom spokojní.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Picture your car parked at home, at the office, or in your driveway. A fully equipped mobile unit arrives, the technician sets up, and a few hours later the interior and exterior are in a condition you would not get at a standard car wash—without you going anywhere. That is how Crystal Detailing mobile service works in Bratislava and the surrounding region.",
        },
        {
          type: "p",
          text: "The photo shows a typical scene from our work: a technician with a silver Audi, a mobile van with organised equipment, and Bratislava in the background. It is not just a marketing shot—this is what it looks like at customers’ locations every day. We come to the agreed address, care for the car on site, and you get on with your day.",
        },
        {
          type: "h2",
          text: "Why mobile detailing in Bratislava makes sense",
        },
        {
          type: "p",
          text: "In Bratislava, people often cannot afford to lose half a day at a service centre or wait in line at an automatic wash. Mobile detailing solves exactly that: it saves time, removes hassle, and delivers a premium result right where you are.",
        },
        {
          type: "ul",
          items: [
            "no need to drive anywhere—service at home, at work, or in a car park",
            "individual approach based on vehicle type, size, and level of soiling",
            "professional equipment including extractors and premium products",
            "combine services—from a REFRESH package to shampooing and headlight restoration",
            "transparent pricing from the price list and calculator before work starts",
          ],
        },
        {
          type: "p",
          text: "Whether you live in the Old Town, Ružinov, Petržalka, Dúbravka, or outlying areas such as Lamač or Devínska Nová Ves—mobile detailing is more practical than hunting for a slot at a fixed-location service.",
        },
        {
          type: "h2",
          text: "Where we travel beyond Bratislava",
        },
        {
          type: "p",
          text: "Crystal Detailing covers not only the capital but the whole immediate area and western Slovakia. We regularly visit Pezinok, Senec, Chorvátsky Grob, Záhorie (Malacky, Stupava, Senica, Skalica), and Trnava region (Trnava, Galanta, Dunajská Streda). See the locations page for the full overview.",
        },
        {
          type: "p",
          text: "From 2026 we also run trips into Austria near Bratislava. If you live in Hainburg an der Donau, Bruck an der Leitha, Burgenland (Eisenstadt, Mattersburg, Neusiedl am See), or the Vienna area up to the city itself—we can come to you there too. We travel from Bratislava and deliver the same professional service as in Slovakia.",
        },
        {
          type: "h2",
          text: "What we can do at your location",
        },
        {
          type: "p",
          text: "Mobile detailing is not just an exterior wash. It is full vehicle care—interior and exterior—with attention to detail and material quality.",
        },
        {
          type: "ul",
          items: [
            "exterior wash and treatment including wheels and paint-safe products",
            "deep interior cleaning—dashboard, plastics, leather, textiles",
            "seat and carpet shampooing with extraction",
            "headlight restoration—clarity and brightness",
            "add-ons such as ozone treatment, leather care, or engine bay cleaning",
          ],
        },
        {
          type: "p",
          text: "REFRESH, INTERIOR, COMPLETE, and SHAMPOOING packages are in the price list. Price also depends on vehicle size—SUVs and vans have a surcharge by category. Get an exact estimate in the online calculator.",
        },
        {
          type: "h2",
          text: "How booking works—from reservation to a finished car",
        },
        {
          type: "p",
          text: "The process is simple:",
        },
        {
          type: "ul",
          items: [
            "choose a service in the price list or calculator and book online via Bookio",
            "we agree arrival time and address—home, office, car park",
            "the technician arrives with the mobile van and full kit including water and power",
            "we confirm scope and price before starting",
            "you check the result when finished and can use the car straight away",
          ],
        },
        {
          type: "p",
          text: "For trips to Austria, allow travel time from Bratislava—Hainburg is roughly 15–20 minutes, Eisenstadt around an hour, Vienna depending on district 45–75 minutes. We confirm the exact timing when you book.",
        },
        {
          type: "h2",
          text: "Who it is ideal for",
        },
        {
          type: "p",
          text: "Mobile detailing suits owners of premium and everyday cars, families with children (dirty seats and carpets), companies with fleet vehicles, sellers preparing a handover, and people in Austria near the border who do not want to drive to Slovakia just to have their car cleaned.",
        },
        {
          type: "p",
          text: "If you search for “mobilný detailing Bratislava”, “car shampooing Pezinok”, or “mobile Autopflege Wien”—Crystal Detailing is the service that comes to you. Not the other way around.",
        },
        {
          type: "h2",
          text: "Conclusion",
        },
        {
          type: "p",
          text: "Mobile detailing in Bratislava and in Austria near the border is the most practical way to keep your car clean, fresh, and well maintained without losing time. Book your slot today—we arrive with equipment, experience, and the goal of a result you will be happy with.",
        },
      ],
      de: [
        {
          type: "p",
          text: "Stellen Sie sich vor, Ihr Auto steht vor dem Haus, im Büro oder in der Einfahrt. Eine voll ausgestattete mobile Einheit kommt an, der Techniker richtet alles ein, und nach wenigen Stunden sind Innen- und Außenbereich in einem Zustand, den Sie in einer normalen Waschanlage nicht erreichen würden – ohne dass Sie irgendwohin fahren müssen. So funktioniert der mobile Service von Crystal Detailing in Bratislava und Umgebung.",
        },
        {
          type: "p",
          text: "Das Foto zeigt eine typische Szene aus unserer Arbeit: ein Techniker bei einem silbernen Audi, ein mobiler Van mit organisierter Ausrüstung und Bratislava im Hintergrund. Das ist nicht nur ein Marketingbild – so sieht es täglich bei unseren Kunden aus. Wir kommen zur vereinbarten Adresse, kümmern uns vor Ort um das Auto, und Sie können Ihren Tag normal weiter verbringen.",
        },
        {
          type: "h2",
          text: "Warum mobile Autopflege in Bratislava sinnvoll ist",
        },
        {
          type: "p",
          text: "In Bratislava können sich viele Menschen keinen halben Tag in der Werkstatt oder Warteschlangen in der Waschanlage leisten. Mobile Autopflege löst genau das: Sie spart Zeit, reduziert Stress und liefert ein Premium-Ergebnis direkt bei Ihnen.",
        },
        {
          type: "ul",
          items: [
            "kein Fahren nötig – Service bei Ihnen zu Hause, im Büro oder auf dem Parkplatz",
            "individueller Ansatz je nach Fahrzeugtyp, Größe und Verschmutzungsgrad",
            "professionelle Ausrüstung inklusive Extraktionsgeräte und Premium-Produkte",
            "Kombination von Leistungen – vom REFRESH-Paket bis zur Polsterreinigung und Scheinwerfer-Aufbereitung",
            "transparente Preise laut Preisliste und Rechner vor Arbeitsbeginn",
          ],
        },
        {
          type: "p",
          text: "Ob Sie in der Altstadt, in Ružinov, Petržalka, Dúbravka oder in Randgebieten wie Lamač oder Devínska Nová Ves wohnen – mobile Autopflege ist praktischer, als einen Termin in einer stationären Werkstatt zu suchen.",
        },
        {
          type: "h2",
          text: "Wohin wir außerhalb Bratislavas fahren",
        },
        {
          type: "p",
          text: "Crystal Detailing deckt nicht nur die Hauptstadt ab, sondern das gesamte unmittelbare Umland und die Westslowakei. Wir fahren regelmäßig nach Pezinok, Senec, Chorvátsky Grob, Záhorie (Malacky, Stupava, Senica, Skalica) und in die Region Trnava (Trnava, Galanta, Dunajská Streda). Den vollständigen Überblick finden Sie auf der Standortseite.",
        },
        {
          type: "p",
          text: "Seit 2026 fahren wir auch nach Österreich nahe Bratislava. Wenn Sie in Hainburg an der Donau, Bruck an der Leitha, im Burgenland (Eisenstadt, Mattersburg, Neusiedl am See) oder im Wiener Umland bis zur Stadt selbst wohnen – können wir auch zu Ihnen kommen. Wir fahren von Bratislava aus und liefern denselben professionellen Service wie in der Slowakei.",
        },
        {
          type: "h2",
          text: "Was wir bei Ihnen vor Ort erledigen können",
        },
        {
          type: "p",
          text: "Mobile Autopflege ist nicht nur eine Außenwäsche. Es ist umfassende Fahrzeugpflege – Innen- und Außenbereich – mit Fokus auf Details und Materialqualität.",
        },
        {
          type: "ul",
          items: [
            "Außenwäsche und -behandlung inklusive Felgen und lackfreundlicher Produkte",
            "Tiefenreinigung des Innenraums – Armaturenbrett, Kunststoffe, Leder, Textilien",
            "Polsterreinigung von Sitzen und Teppichen mit Extraktionsmethode",
            "Scheinwerfer-Aufbereitung – Wiederherstellung von Klarheit und Helligkeit",
            "Zusatzleistungen wie Ozonbehandlung, Lederpflege oder Motorraumreinigung",
          ],
        },
        {
          type: "p",
          text: "Die Pakete REFRESH, INTERIOR, COMPLETE und SHAMPOOING finden Sie in der Preisliste. Der Preis hängt auch von der Fahrzeuggröße ab – SUVs und Transporter haben je nach Kategorie einen Aufpreis. Eine genaue Schätzung erhalten Sie im Online-Rechner.",
        },
        {
          type: "h2",
          text: "So läuft die Buchung ab – von der Reservierung bis zum fertigen Auto",
        },
        {
          type: "p",
          text: "Der Ablauf ist einfach:",
        },
        {
          type: "ul",
          items: [
            "Leistung in Preisliste oder Rechner wählen und online über Bookio buchen",
            "wir vereinbaren Ankunftszeit und Adresse – Zuhause, Büro, Parkplatz",
            "der Techniker kommt mit mobilem Van und kompletter Ausrüstung inklusive Wasser und Strom",
            "wir bestätigen Umfang und Preis vor Arbeitsbeginn",
            "Sie prüfen das Ergebnis nach Abschluss und können das Auto sofort nutzen",
          ],
        },
        {
          type: "p",
          text: "Bei Fahrten nach Österreich sollten Sie die Fahrzeit ab Bratislava einplanen – Hainburg sind etwa 15–20 Minuten, Eisenstadt rund eine Stunde, Wien je nach Bezirk 45–75 Minuten. Die genaue Zeit bestätigen wir bei der Buchung.",
        },
        {
          type: "h2",
          text: "Für wen die Dienstleistung ideal ist",
        },
        {
          type: "p",
          text: "Mobile Autopflege schätzen Besitzer von Premium- und Alltagsfahrzeugen, Familien mit Kindern (schmutzige Sitze und Teppiche), Firmen mit Fuhrpark, Verkäufer vor der Übergabe und Menschen in Österreich nahe der Grenze, die nicht extra in die Slowakei fahren möchten, nur um ihr Auto reinigen zu lassen.",
        },
        {
          type: "p",
          text: "Wenn Sie nach „mobilný detailing Bratislava“, „Autopolsterreinigung Pezinok“ oder „mobile Autopflege Wien“ suchen – Crystal Detailing ist der Service, der zu Ihnen kommt. Nicht umgekehrt.",
        },
        {
          type: "h2",
          text: "Fazit",
        },
        {
          type: "p",
          text: "Mobile Autopflege in Bratislava und in Österreich nahe der Grenze ist der praktischste Weg, Ihr Auto sauber, frisch und gepflegt zu halten, ohne Zeit zu verlieren. Buchen Sie noch heute Ihren Termin – wir kommen mit Ausrüstung, Erfahrung und dem Ziel eines Ergebnisses, mit dem Sie zufrieden sind.",
        },
      ],
    },
  },
  {
  slug: "renovacia-svetlometov-mobilne",
  category: "detailing-tips",
  publishedAt: "2026-06-04",
  image: "/images/blog/renovacia-svetlometov-mobilne.png",
  imageAlt: {
    sk: "Leštenie svetlometu profesionálnou leštičkou pri mobilnej renovácii",
    en: "Headlight polishing with a professional buffer during mobile restoration",
    de: "Scheinwerfer-Politur mit professionellem Poliergerät bei mobiler Aufbereitung",
  },
  title: {
    sk: "Renovácia svetlometov mobilne: zažltnuté svetlá vyriešime priamo u vás",
    en: "Mobile headlight restoration: we fix yellowed lights at your location",
    de: "Mobile Scheinwerfer-Aufbereitung: Vergilbte Scheinwerfer beheben wir direkt bei Ihnen",
  },
  excerpt: {
    sk: "Máte matné alebo zažltnuté svetlomety? Mobilná renovácia svetlometov obnoví vzhľad auta, zlepší svietivosť a pripraví svetlá na bezpečnejšiu jazdu.",
    en: "Dull or yellowed headlights? Mobile headlight restoration restores your car’s look, improves brightness, and prepares lights for safer driving.",
    de: "Matte oder vergilbte Scheinwerfer? Mobile Scheinwerfer-Aufbereitung verbessert das Erscheinungsbild, die Helligkeit und bereitet die Lichter auf sichereres Fahren vor.",
  },
  body: {
    sk: [
      {
        type: "p",
        text: "Matné, zažltnuté alebo zašednuté svetlomety dokážu pokaziť vzhľad celého auta. Aj pekné a udržiavané vozidlo pôsobí staršie, keď má predné svetlá ako zahmlený plast. Lenže nejde iba o vzhľad. Svetlomety majú hlavne svietiť. Keď je ich povrch zoxidovaný, poškriabaný alebo žltý, svetlo sa cez ne nedostáva tak čisto, ako by malo.",
      },
      {
        type: "p",
        text: "Práve preto sa oplatí riešiť renováciu svetlometov skôr, než začnú byť problémom pri nočnej jazde alebo pred technickou kontrolou. Svetelné zariadenia vozidla sú podľa Ministerstva dopravy určené na osvetlenie vozovky alebo na vyžarovanie svetelného signálu pre ostatných účastníkov cestnej premávky a musia spĺňať predpísané technické požiadavky. Kontrolné položky technickej kontroly majú samostatnú časť venovanú osvetleniu a svetelnej signalizácii vozidla.",
      },
      {
        type: "p",
        text: "Dobrá správa je, že kvôli renovácii svetlometov už nemusíte nikam chodiť. Renováciu svetlometov robíme mobilne, priamo u vás doma, vo firme alebo na vhodnom parkovisku.",
      },
      {
        type: "h2",
        text: "Prečo svetlomety časom žltnú a matnejú?",
      },
      {
        type: "p",
        text: "Väčšina moderných áut má predné svetlomety z plastu, nie zo skla. Plast je ľahší, bezpečnejší a dizajnovo praktickejší, ale časom trpí. Slnko, UV žiarenie, prach, špina z ciest, kamienky, posypová soľ, hmyz a bežné umývanie postupne poškodzujú vrchnú ochrannú vrstvu.",
      },
      {
        type: "p",
        text: "Najprv si všimnete jemný zákal. Potom svetlá začnú žltnúť. Neskôr sú matné, zašednuté a auto vyzerá, akoby malo o niekoľko rokov viac.",
      },
      {
        type: "p",
        text: "Problém je, že nejde len o estetiku. Matný plast rozptyľuje svetlo inak než čistý priehľadný povrch. Výsledkom môže byť slabší svetelný výkon, horší pocit z nočnej jazdy a unavenejší vodič.",
      },
      {
        type: "h2",
        text: "Ako spoznáte, že svetlomety potrebujú renováciu?",
      },
      {
        type: "p",
        text: "Renovácia svetlometov sa oplatí vtedy, keď vidíte, že svetlá už nie sú číre. Nemusia byť úplne žlté. Niekedy stačí jemný mliečny povlak a rozdiel po renovácii je obrovský.",
      },
      {
        type: "p",
        text: "Najčastejšie príznaky sú:",
      },
      {
        type: "ul",
        items: [
          "svetlomety sú zažltnuté",
          "plast je matný alebo zašednutý",
          "svetlá pôsobia ako zahmlené",
          "auto v noci svieti slabšie",
          "predná časť auta vyzerá staro",
          "svetlá majú jemné škrabance",
          "chystáte sa na STK",
          "chcete auto pripraviť na predaj",
        ],
      },
      {
        type: "p",
        text: "Ak sa na svetlomet pozriete zboku a plast už nie je priehľadný, je čas to riešiť. Čím skôr sa renovácia spraví, tým lepší výsledok sa dá dosiahnuť.",
      },
      {
        type: "h2",
        text: "Renovácia svetlometov nie je obyčajné preleštenie",
      },
      {
        type: "p",
        text: "Veľa ľudí skúša svetlá doma pretrieť pastou, handrou alebo univerzálnym prípravkom z obchodu. Niekedy to na chvíľu pomôže, ale výsledok často dlho nevydrží. Dôvod je jednoduchý: ak je svetlomet zoxidovaný, nestačí ho len „vyleštiť navrchu“.",
      },
      {
        type: "p",
        text: "Profesionálna renovácia svetlometov zvyčajne zahŕňa viac krokov. Najprv sa svetlá očistia a odmastia. Potom sa okolie dôkladne zamaskuje, aby sa nepoškodil lak, nárazník alebo plastové diely okolo svetla. Následne sa poškodená vrchná vrstva postupne brúsi, svetlomet sa leští a na záver sa aplikuje ochrana, ktorá pomáha predĺžiť výsledok.",
      },
      {
        type: "p",
        text: "Rozdiel je viditeľný hneď. Svetlá sú čírejšie, auto pôsobí mladšie a predná časť vyzerá upravenejšie.",
      },
      {
        type: "h2",
        text: "Mobilná renovácia svetlometov: prídeme za vami",
      },
      {
        type: "p",
        text: "Najväčšia výhoda našej služby je pohodlie. Renováciu svetlometov robíme mobilne, takže nemusíte auto nikam voziť ani čakať v servise.",
      },
      {
        type: "p",
        text: "Prídeme na dohodnuté miesto a svetlá renovujeme priamo tam. Môže to byť pred domom, vo dvore, pri firme alebo na inom vhodnom mieste. Vy zatiaľ môžete pracovať, oddychovať alebo riešiť svoje veci.",
      },
      {
        type: "p",
        text: "Mobilná renovácia svetlometov je ideálna pre ľudí, ktorí nechcú strácať čas. Objednáte si termín, pripravíte auto a my sa postaráme o zvyšok.",
      },
      {
        type: "h2",
        text: "Kedy sa renovácia svetlometov oplatí najviac?",
      },
      {
        type: "p",
        text: "Najlepší čas na renováciu svetiel je vtedy, keď už vidíte prvé známky zažltnutia, ale svetlomet ešte nie je hlboko popraskaný alebo poškodený zvnútra.",
      },
      {
        type: "p",
        text: "Najviac sa oplatí najmä pred STK, pred predajom auta, pred zimou a pred dovolenkou.",
      },
      {
        type: "p",
        text: "Ak sú svetlá matné, zažltnuté alebo pôsobia zanedbane, je rozumné ich vyriešiť ešte pred technickou kontrolou. Samotná renovácia samozrejme negarantuje výsledok STK, pretože kontroluje sa viac vecí vrátane funkčnosti, nastavenia a celkového stavu osvetlenia. TESTEK uvádza samostatné metodické podklady pre kontrolu osvetlenia a svetelnej signalizácie aj pre nastavenie svetlometov pri technických kontrolách.",
      },
      {
        type: "p",
        text: "Zažltnuté svetlomety okamžite znižujú dojem z auta pri predaji. Kupujúci sa pozrie na predok vozidla a auto pôsobí staršie, aj keď je technicky v poriadku. Renovované svetlá vedia opticky omladiť celé vozidlo.",
      },
      {
        type: "p",
        text: "V zime jazdíme častejšie po tme, za dažďa, hmly a horšej viditeľnosti. Práve vtedy je dobré mať svetlá v čo najlepšom stave.",
      },
      {
        type: "p",
        text: "Dlhé presuny, nočné jazdy, diaľnice a cesty mimo mesta sú presne situácie, kde slabé svetlá začnú vadiť. Ak idete autom na dovolenku, renovácia svetlometov je rozumný krok spolu s čistením interiéru a kontrolou auta.",
      },
      {
        type: "h2",
        text: "Pomôže renovácia svetlometov pri slabom svietení?",
      },
      {
        type: "p",
        text: "Áno, ak je problém v zmatnenom alebo zažltnutom vonkajšom plaste svetlometu. Vtedy renovácia pomôže obnoviť priehľadnosť povrchu a svetlo môže prechádzať čistejšie.",
      },
      {
        type: "p",
        text: "Treba však povedať férovo: renovácia nevyrieši všetko. Ak je problém vo vypálenej parabole, slabej žiarovke, nesprávnom nastavení svetiel, poškodení zvnútra alebo elektroinštalácii, bude potrebné riešiť aj technickú príčinu.",
      },
      {
        type: "p",
        text: "Renovácia svetlometov rieši hlavne vonkajší stav plastu. A práve ten býva pri starších autách veľmi častým problémom.",
      },
      {
        type: "h2",
        text: "Prečo neriešiť svetlomety lacným domácim spôsobom?",
      },
      {
        type: "p",
        text: "Internet je plný rád typu zubná pasta, WD-40, lacná pasta z obchodu alebo rýchle preleštenie handrou. Niektoré triky môžu spraviť krátkodobý vizuálny efekt, ale často nevyriešia príčinu.",
      },
      {
        type: "p",
        text: "Problém je hlavne v tom, že ak sa svetlomet len vyleští bez správnej prípravy a ochrany, veľmi rýchlo znova zmatnie. Navyše pri neodbornom brúsení si môžete spraviť hlboké ryhy, nerovnomerný povrch alebo poškodiť lak okolo svetla.",
      },
      {
        type: "p",
        text: "Profesionálna renovácia je bezpečnejšia, dôkladnejšia a výsledok pôsobí čistejšie.",
      },
      {
        type: "h2",
        text: "Ako prebieha mobilná renovácia svetlometov?",
      },
      {
        type: "p",
        text: "Postup závisí od stavu konkrétnych svetiel, ale väčšinou prebieha takto:",
      },
      {
        type: "ul",
        items: [
          "Kontrola stavu svetlometov – či je problém na vonkajšom plaste, alebo ide o poškodenie zvnútra",
          "Čistenie a odmastenie svetlometov od špiny, prachu, mastnoty a zvyškov hmyzu",
          "Maskovanie okolia, aby počas brúsenia a leštenia nedošlo k poškodeniu laku alebo plastov",
          "Postupné brúsenie poškodenej vrchnej vrstvy rôznymi jemnosťami podľa stavu",
          "Leštenie svetlometov pre čo najčírejší a vizuálne čistý povrch",
          "Ochrana svetlometu – aplikácia vrstvy, ktorá spomaľuje opätovné žltnutie a matnenie",
        ],
      },
      {
        type: "p",
        text: "Výsledkom sú svetlá, ktoré vyzerajú výrazne lepšie a často zmenia celý vzhľad auta.",
      },
      {
        type: "h2",
        text: "Dá sa renovovať každý svetlomet?",
      },
      {
        type: "p",
        text: "Nie vždy. Väčšina plastových svetlometov sa renovovať dá, ale výsledok závisí od stavu.",
      },
      {
        type: "p",
        text: "Renovácia je vhodná, keď je svetlomet:",
      },
      {
        type: "ul",
        items: [
          "zažltnutý zvonku",
          "matný",
          "jemne poškriabaný",
          "zoxidovaný",
          "vizuálne starý, ale stále celý",
        ],
      },
      {
        type: "p",
        text: "Renovácia nemusí pomôcť, ak je svetlomet:",
      },
      {
        type: "ul",
        items: [
          "prasknutý",
          "zatečený zvnútra",
          "poškodený vnútri",
          "má vypálenú parabolu",
          "má hlboké poškodenia v plaste",
          "je neodborne opravovaný alebo lakovaný",
        ],
      },
      {
        type: "p",
        text: "Ak si nie ste istí, stačí nám poslať fotku svetlometov. Povieme vám, či renovácia dáva zmysel.",
      },
      {
        type: "h2",
        text: "Koľko trvá renovácia svetlometov?",
      },
      {
        type: "p",
        text: "Pri bežnom stave trvá renovácia oboch predných svetlometov približne niekoľko desiatok minút až pár hodín. Záleží od toho, ako veľmi sú svetlá zničené a aký postup je potrebný.",
      },
      {
        type: "p",
        text: "Mierne zažltnuté svetlá sa riešia rýchlejšie. Silno zmatnené alebo dlhodobo zanedbané svetlomety potrebujú viac práce. Výhoda mobilnej renovácie je, že nemusíte čakať v prevádzke – auto máte pri sebe a služba prebehne priamo na mieste.",
      },
      {
        type: "h2",
        text: "Koľko stojí renovácia svetlometov?",
      },
      {
        type: "p",
        text: "Cena závisí od stavu svetiel, typu auta a rozsahu práce. Iná cena bude pri mierne zmatnených svetlách a iná pri svetlometoch, ktoré sú roky zanedbané.",
      },
      {
        type: "p",
        text: "Najlepšie je poslať nám fotky predných svetiel. Podľa nich vieme povedať, či stačí štandardná renovácia, alebo bude potrebný náročnejší postup.",
      },
      {
        type: "p",
        text: "Dôležité je nepozerať sa len na najlacnejšiu cenu. Pri svetlách ide o vzhľad auta, funkčnosť a bezpečnejšiu jazdu. Lacné rýchle preleštenie bez poriadnej ochrany môže vyzerať dobre pár týždňov, ale problém sa rýchlo vráti.",
      },
      {
        type: "h2",
        text: "Renovácia svetlometov ako súčasť detailingu auta",
      },
      {
        type: "p",
        text: "Renováciu svetlometov odporúčame spojiť aj s ďalšími službami. Najmä ak chcete pripraviť auto na predaj, STK alebo letnú dovolenku.",
      },
      {
        type: "ul",
        items: [
          "renovácia svetlometov + čistenie interiéru",
          "renovácia svetlometov + mobilný detailing",
          "renovácia svetlometov + ručné umytie auta",
          "renovácia svetlometov + ochrana laku",
          "renovácia svetlometov + príprava auta na predaj",
        ],
      },
      {
        type: "p",
        text: "Keď sa vyčistí interiér, umyje exteriér a zrenovujú svetlá, auto pôsobí úplne inak. Často stačí pár hodín práce a vozidlo vyzerá výrazne mladšie.",
      },
      {
        type: "h2",
        text: "Pre koho je mobilná renovácia svetlometov ideálna?",
      },
      {
        type: "p",
        text: "Táto služba je vhodná najmä pre vodičov, ktorí:",
      },
      {
        type: "ul",
        items: [
          "majú zažltnuté alebo matné svetlá",
          "horšie vidia v noci",
          "pripravujú auto na STK",
          "chcú auto predať za lepšiu cenu",
          "nechcú kupovať nové drahé svetlomety",
          "nemajú čas ísť do servisu",
          "chcú vyriešiť svetlá pohodlne doma alebo vo firme",
          "chcú zlepšiť vzhľad prednej časti auta",
        ],
      },
      {
        type: "p",
        text: "Ak vaše auto vyzerá spredu unavene, často za to môžu práve svetlomety.",
      },
      {
        type: "h2",
        text: "Záver: nové svetlá kupovať nemusíte, často stačí renovácia",
      },
      {
        type: "p",
        text: "Zažltnuté svetlomety nemusia hneď znamenať výmenu za nové. V mnohých prípadoch stačí profesionálna renovácia, ktorá obnoví čírosť plastu, zlepší vzhľad auta a pomôže svetlám vyzerať aj fungovať lepšie.",
      },
      {
        type: "p",
        text: "Najlepšie na tom je, že to celé vieme spraviť mobilne. Prídeme za vami, zrenovujeme svetlomety priamo na mieste a vy nemusíte riešiť servis, čakanie ani zbytočné presuny.",
      },
      {
        type: "p",
        text: "Ak máte matné, žlté alebo zašednuté svetlá, objednajte si mobilnú renováciu svetlometov. Vaše auto bude vyzerať lepšie a jazda po tme bude príjemnejšia.",
      },
    ],
    en: [
      {
        type: "p",
        text: "Dull, yellowed, or greyed headlights can ruin the look of an entire car. Even a well-kept vehicle looks older when the front lights resemble foggy plastic. It is not only about appearance—headlights are meant to shine. When the surface is oxidised, scratched, or yellow, light does not pass through as cleanly as it should.",
      },
      {
        type: "p",
        text: "That is why it pays to address headlight restoration before night driving or a technical inspection becomes a problem. Vehicle lighting must meet legal technical requirements, and inspection checklists include a dedicated section for lighting and signalling.",
      },
      {
        type: "p",
        text: "The good news: you do not have to go anywhere for restoration. We offer mobile headlight restoration at your home, workplace, or a suitable parking spot.",
      },
      {
        type: "h2",
        text: "Why do headlights yellow and go dull over time?",
      },
      {
        type: "p",
        text: "Most modern cars use plastic headlights, not glass. Plastic is lighter and safer but suffers from sun, UV, road grime, stone chips, salt, insects, and routine washing that gradually damages the protective top layer.",
      },
      {
        type: "p",
        text: "You notice a light haze first, then yellowing, then matting and greying—and the car looks years older. Hazy plastic scatters light differently than clear plastic, which can mean weaker output, worse night driving, and more driver fatigue.",
      },
      {
        type: "h2",
        text: "How do you know your headlights need restoration?",
      },
      {
        type: "p",
        text: "Restoration is worthwhile when lights are no longer clear—a milky film alone can make a huge difference after treatment.",
      },
      {
        type: "ul",
        items: [
          "yellowed headlights",
          "dull or greyed plastic",
          "hazy, cloudy appearance",
          "weaker light at night",
          "the front of the car looks dated",
          "fine scratches on the lens",
          "MOT/inspection coming up",
          "preparing the car for sale",
        ],
      },
      {
        type: "p",
        text: "If you look at the lens from the side and the plastic is no longer transparent, it is time to act—the sooner, the better the result.",
      },
      {
        type: "h2",
        text: "Headlight restoration is not just a quick polish",
      },
      {
        type: "p",
        text: "Many people try paste, cloth, or shop products at home. It may help briefly, but results often do not last because oxidised lenses need more than a surface buff.",
      },
      {
        type: "p",
        text: "Professional restoration usually includes cleaning and degreasing, masking around the lamp, gradual sanding of the damaged layer, polishing, and a protective coating to extend the result. The difference is visible immediately—clearer lights and a fresher front end.",
      },
      {
        type: "h2",
        text: "Mobile headlight restoration: we come to you",
      },
      {
        type: "p",
        text: "The main benefit is convenience. No towing the car to a workshop or waiting in a service bay—we restore headlights where you are.",
      },
      {
        type: "p",
        text: "Book a time, have the car ready, and we handle the rest while you work or relax.",
      },
      {
        type: "h2",
        text: "When does restoration pay off most?",
      },
      {
        type: "p",
        text: "The best time is when you see early yellowing but the unit is not deeply cracked or damaged inside.",
      },
      {
        type: "p",
        text: "Before inspection: dull or yellow lights should be fixed in good time. Restoration alone does not guarantee a pass—function, aim, and overall lighting are also checked.",
      },
      {
        type: "p",
        text: "Before selling: yellow headlights instantly age the car. Restored lenses can rejuvenate the whole vehicle visually.",
      },
      {
        type: "p",
        text: "Before winter and before a holiday: more night driving, rain, and motorways are exactly when you want the best possible light.",
      },
      {
        type: "h2",
        text: "Will restoration help weak headlights?",
      },
      {
        type: "p",
        text: "Yes, when the issue is hazy or yellowed outer plastic—restoration restores clarity so light passes through more cleanly.",
      },
      {
        type: "p",
        text: "Fair warning: burnt reflectors, weak bulbs, misalignment, internal damage, or wiring need separate technical fixes. Restoration mainly addresses the outer plastic—which is the most common problem on older cars.",
      },
      {
        type: "h2",
        text: "Why avoid cheap DIY fixes?",
      },
      {
        type: "p",
        text: "Toothpaste, WD-40, or a quick cloth polish often give a short-lived look without fixing the cause. Without proper prep and protection, haze returns quickly; amateur sanding can gouge the lens or damage paint around the lamp.",
      },
      {
        type: "h2",
        text: "How does mobile restoration work?",
      },
      {
        type: "ul",
        items: [
          "Condition check – outer plastic vs internal damage",
          "Thorough cleaning and degreasing",
          "Masking to protect paint and trim",
          "Gradual sanding of the damaged layer",
          "Polishing for maximum clarity",
          "Protective coating to slow yellowing and haze",
        ],
      },
      {
        type: "h2",
        text: "Can every headlight be restored?",
      },
      {
        type: "p",
        text: "Not always. Most plastic units can be improved, but cracked, waterlogged, internally damaged, heavily burnt, or badly repaired lenses may need replacement. Send a photo—we will tell you if restoration makes sense.",
      },
      {
        type: "h2",
        text: "How long does it take?",
      },
      {
        type: "p",
        text: "Both front headlights typically take from under an hour to a few hours depending on severity. Mobile service means no waiting at a workshop—your car stays with you on site.",
      },
      {
        type: "h2",
        text: "How much does it cost?",
      },
      {
        type: "p",
        text: "Price depends on condition, vehicle type, and scope. Photos of the front lights help us quote standard or intensive work. The cheapest quick polish without proper protection often fails within weeks.",
      },
      {
        type: "h2",
        text: "Combining with other detailing services",
      },
      {
        type: "ul",
        items: [
          "headlight restoration + interior cleaning",
          "headlight restoration + mobile detailing",
          "headlight restoration + hand wash",
          "headlight restoration + paint protection",
          "headlight restoration + pre-sale preparation",
        ],
      },
      {
        type: "p",
        text: "Clean interior, washed exterior, and restored lights often make the car look years younger in a single visit.",
      },
      {
        type: "h2",
        text: "Who is mobile restoration ideal for?",
      },
      {
        type: "ul",
        items: [
          "yellowed or dull headlights",
          "poor visibility at night",
          "preparing for inspection or sale",
          "avoiding expensive new headlight units",
          "no time for a workshop visit",
          "wanting the job done at home or at work",
        ],
      },
      {
        type: "h2",
        text: "Conclusion",
      },
      {
        type: "p",
        text: "Yellowed headlights do not always mean buying new ones. Professional restoration can restore clarity, improve appearance, and support safer night driving—and we do it all mobile, at your location.",
      },
      {
        type: "p",
        text: "If your lights are dull, yellow, or greyed, book mobile headlight restoration. Your car will look better and driving in the dark will feel more comfortable.",
      },
    ],
    de: [
      {
        type: "p",
        text: "Matte, vergilbte oder grau gewordene Scheinwerfer können das Erscheinungsbild eines ganzen Autos ruinieren. Selbst ein gepflegtes Fahrzeug wirkt älter, wenn die Frontlichter wie trüber Kunststoff aussehen. Es geht nicht nur um die Optik – Scheinwerfer sollen leuchten. Wenn die Oberfläche oxidiert, zerkratzt oder gelb ist, dringt das Licht nicht so sauber durch, wie es sollte.",
      },
      {
        type: "p",
        text: "Deshalb lohnt es sich, die Scheinwerfer-Aufbereitung anzugehen, bevor Nachtfahrten oder eine technische Kontrolle zum Problem werden. Fahrzeugbeleuchtung muss gesetzliche technische Anforderungen erfüllen, und Kontrolllisten enthalten einen eigenen Abschnitt für Beleuchtung und Lichtsignale.",
      },
      {
        type: "p",
        text: "Die gute Nachricht: Sie müssen dafür nirgendwohin fahren. Wir bieten mobile Scheinwerfer-Aufbereitung bei Ihnen zu Hause, am Arbeitsplatz oder an einem geeigneten Parkplatz.",
      },
      {
        type: "h2",
        text: "Warum vergilben und mattieren Scheinwerfer mit der Zeit?",
      },
      {
        type: "p",
        text: "Die meisten modernen Autos haben Kunststoff-Scheinwerfer, kein Glas. Kunststoff ist leichter und sicherer, leidet aber unter Sonne, UV-Strahlung, Straßenschmutz, Steinschlägen, Salz, Insekten und routinemäßigem Waschen, das die Schutzschicht nach und nach angreift.",
      },
      {
        type: "p",
        text: "Zuerst bemerken Sie einen leichten Schleier, dann die Vergilbung, dann Mattigkeit und Graufärbung – und das Auto wirkt Jahre älter. Trüber Kunststoff streut Licht anders als klarer Kunststoff, was schwächere Ausleuchtung, schlechteres Nachtfahren und mehr Ermüdung bedeuten kann.",
      },
      {
        type: "h2",
        text: "Woran erkennen Sie, dass Ihre Scheinwerfer aufbereitet werden müssen?",
      },
      {
        type: "p",
        text: "Eine Aufbereitung lohnt sich, wenn die Lichter nicht mehr klar sind – allein ein milchiger Film kann nach der Behandlung einen großen Unterschied machen.",
      },
      {
        type: "ul",
        items: [
          "vergilbte Scheinwerfer",
          "matte oder grau gewordener Kunststoff",
          "trübes, wolkiges Erscheinungsbild",
          "schwächeres Licht bei Nacht",
          "die Front wirkt veraltet",
          "feine Kratzer auf der Linse",
          "TÜV/Inspektion steht an",
          "Vorbereitung auf den Fahrzeugverkauf",
        ],
      },
      {
        type: "p",
        text: "Wenn Sie die Linse von der Seite betrachten und der Kunststoff nicht mehr transparent ist, ist es Zeit zu handeln – je früher, desto besser das Ergebnis.",
      },
      {
        type: "h2",
        text: "Scheinwerfer-Aufbereitung ist nicht nur schnelles Polieren",
      },
      {
        type: "p",
        text: "Viele versuchen zu Hause Paste, Tuch oder Produkte aus dem Handel. Das hilft kurz, hält aber oft nicht, weil oxidierte Linsen mehr als eine Oberflächenpolitur brauchen.",
      },
      {
        type: "p",
        text: "Professionelle Aufbereitung umfasst in der Regel Reinigung und Entfettung, Abkleben der Umgebung, schrittweises Schleifen der beschädigten Schicht, Polieren und einen Schutzlack zur Verlängerung des Ergebnisses. Der Unterschied ist sofort sichtbar – klarere Lichter und eine frischere Front.",
      },
      {
        type: "h2",
        text: "Mobile Scheinwerfer-Aufbereitung: Wir kommen zu Ihnen",
      },
      {
        type: "p",
        text: "Der größte Vorteil ist der Komfort. Kein Abschleppen zur Werkstatt oder Warten in der Servicebucht – wir bereiten Scheinwerfer dort auf, wo Sie sind.",
      },
      {
        type: "p",
        text: "Buchen Sie einen Termin, halten Sie das Auto bereit, und wir erledigen den Rest, während Sie arbeiten oder entspannen.",
      },
      {
        type: "h2",
        text: "Wann lohnt sich die Aufbereitung am meisten?",
      },
      {
        type: "p",
        text: "Der beste Zeitpunkt ist, wenn erste Vergilbung sichtbar ist, die Einheit aber nicht tief rissig oder innen beschädigt ist.",
      },
      {
        type: "p",
        text: "Vor der Inspektion: matte oder gelbe Lichter sollten rechtzeitig behoben werden. Aufbereitung allein garantiert keinen Bestehen – Funktion, Einstellung und Gesamtbeleuchtung werden ebenfalls geprüft.",
      },
      {
        type: "p",
        text: "Vor dem Verkauf: gelbe Scheinwerfer altern das Auto sofort. Aufbereitete Linsen können das gesamte Fahrzeug optisch verjüngen.",
      },
      {
        type: "p",
        text: "Vor dem Winter und vor dem Urlaub: mehr Nachtfahrten, Regen und Autobahnen sind genau die Situationen, in denen Sie bestmögliches Licht wollen.",
      },
      {
        type: "h2",
        text: "Hilft Aufbereitung bei schwachen Scheinwerfern?",
      },
      {
        type: "p",
        text: "Ja, wenn das Problem trüber oder vergilbter Außenkunststoff ist – Aufbereitung stellt die Klarheit wieder her, sodass Licht sauberer durchdringt.",
      },
      {
        type: "p",
        text: "Fairer Hinweis: verbrannte Reflektoren, schwache Birnen, Fehleinstellung, Innenschäden oder Verkabelung brauchen separate technische Reparaturen. Aufbereitung betrifft vor allem den Außenkunststoff – das häufigste Problem bei älteren Autos.",
      },
      {
        type: "h2",
        text: "Warum billige DIY-Lösungen meiden?",
      },
      {
        type: "p",
        text: "Zahnpasta, WD-40 oder schnelles Polieren mit einem Tuch geben oft nur kurzzeitig ein besseres Bild, ohne die Ursache zu beheben. Ohne richtige Vorbereitung und Schutz kehrt die Trübung schnell zurück; unprofessionelles Schleifen kann Linsen beschädigen oder Lack um die Lampe angreifen.",
      },
      {
        type: "h2",
        text: "Wie läuft die mobile Aufbereitung ab?",
      },
      {
        type: "ul",
        items: [
          "Zustandsprüfung – Außenkunststoff vs. Innenschaden",
          "Gründliche Reinigung und Entfettung",
          "Abkleben zum Schutz von Lack und Zierleisten",
          "Schrittweises Schleifen der beschädigten Schicht",
          "Polieren für maximale Klarheit",
          "Schutzbeschichtung gegen erneute Vergilbung und Trübung",
        ],
      },
      {
        type: "h2",
        text: "Kann jeder Scheinwerfer aufbereitet werden?",
      },
      {
        type: "p",
        text: "Nicht immer. Die meisten Kunststoff-Einheiten lassen sich verbessern, aber rissige, volllaufende, innen beschädigte, stark verbrannte oder schlecht reparierte Linsen brauchen ggf. einen Ersatz. Schicken Sie ein Foto – wir sagen Ihnen, ob Aufbereitung sinnvoll ist.",
      },
      {
        type: "h2",
        text: "Wie lange dauert es?",
      },
      {
        type: "p",
        text: "Beide Frontscheinwerfer dauern je nach Zustand typischerweise von unter einer Stunde bis zu einigen Stunden. Beim mobilen Service warten Sie nicht in der Werkstatt – Ihr Auto bleibt bei Ihnen vor Ort.",
      },
      {
        type: "h2",
        text: "Was kostet es?",
      },
      {
        type: "p",
        text: "Der Preis hängt vom Zustand, Fahrzeugtyp und Umfang ab. Fotos der Frontlichter helfen uns, Standard- oder intensivere Arbeit anzubieten. Das billigste schnelle Polieren ohne richtigen Schutz hält oft nur wenige Wochen.",
      },
      {
        type: "h2",
        text: "Kombination mit anderen Detailing-Leistungen",
      },
      {
        type: "ul",
        items: [
          "Scheinwerfer-Aufbereitung + Innenraumreinigung",
          "Scheinwerfer-Aufbereitung + mobile Autopflege",
          "Scheinwerfer-Aufbereitung + Handwäsche",
          "Scheinwerfer-Aufbereitung + Lackschutz",
          "Scheinwerfer-Aufbereitung + Verkaufsvorbereitung",
        ],
      },
      {
        type: "p",
        text: "Sauberer Innenraum, gewaschener Außenbereich und aufbereitete Lichter lassen das Auto oft in einem Besuch Jahre jünger wirken.",
      },
      {
        type: "h2",
        text: "Für wen ist mobile Aufbereitung ideal?",
      },
      {
        type: "ul",
        items: [
          "vergilbte oder matte Scheinwerfer",
          "schlechte Sicht bei Nacht",
          "Vorbereitung auf Inspektion oder Verkauf",
          "Vermeidung teurer neuer Scheinwerfer-Einheiten",
          "keine Zeit für einen Werkstattbesuch",
          "Erledigung zu Hause oder im Büro",
        ],
      },
      {
        type: "h2",
        text: "Fazit",
      },
      {
        type: "p",
        text: "Vergilbte Scheinwerfer bedeuten nicht immer den Kauf neuer Einheiten. Professionelle Aufbereitung kann Klarheit wiederherstellen, das Erscheinungsbild verbessern und sichereres Nachtfahren unterstützen – und wir machen alles mobil bei Ihnen vor Ort.",
      },
      {
        type: "p",
        text: "Wenn Ihre Lichter matt, gelb oder grau sind, buchen Sie die mobile Scheinwerfer-Aufbereitung. Ihr Auto sieht besser aus und Fahren im Dunkeln fühlt sich angenehmer an.",
      },
    ],
  },
},
  {
  slug: "mobilny-detailing-pred-dovolenkou",
  category: "mobilny-detailing",
  publishedAt: "2026-06-03",
  image: "/images/blog/mobilny-detailing-pred-dovolenkou.png",
  imageAlt: {
    sk: "Čistenie interiéru auta – pena a kefa na čalúnenom paneli dverí pri detailingu pred dovolenkou",
    en: "Car interior cleaning – foam and brush on upholstered door panel before a holiday trip",
    de: "Innenraumreinigung – Schaum und Bürste auf gepolstertem Türpanel vor dem Urlaub",
  },
  title: {
    sk: "Mobilný detailing pred dovolenkou: pripravte auto na leto bez čakania v autoumyvárni",
    en: "Mobile detailing before holiday: prepare your car for summer without the car wash queue",
    de: "Mobile Autopflege vor dem Urlaub: Bereiten Sie Ihr Auto auf den Sommer ohne Waschanlagen-Warteschlange vor",
  },
  excerpt: {
    sk: "Pripravte auto na letnú dovolenku bez stresu. Mobilný detailing vyčistí interiér, odstráni zápach, hmyz, peľ a ochráni lak priamo u vás.",
    en: "Prepare your car for summer holiday without stress. Mobile detailing cleans the interior, removes odour, bugs, pollen, and protects paint at your location.",
    de: "Bereiten Sie Ihr Auto stressfrei auf den Sommerurlaub vor. Mobile Autopflege reinigt den Innenraum, entfernt Gerüche, Insekten, Pollen und schützt den Lack bei Ihnen vor Ort.",
  },
  body: {
    sk: [
      {
        type: "p",
        text: "Letná dovolenka autom má svoje čaro. Naložíte kufre, pustíte navigáciu, deti sa pýtajú „koľko ešte?“, v aute vonia káva z pumpy a pred vami sú stovky kilometrov cesty. Lenže ešte predtým, než vyrazíte, je dobré pozrieť sa na jednu vec, ktorú veľa vodičov necháva na poslednú chvíľu: stav auta zvnútra aj zvonka.",
      },
      {
        type: "p",
        text: "Nie technicky. To patrí do servisu. Reč je o čistote, zápachu, prachu, sedačkách, kufri, laku, oknách, klimatizácii a celkovom pocite z auta. Pretože ísť na dovolenku v aute, ktoré je plné omrviniek, fľakov, prachu, chlpov, mastných okien a starého zápachu, je jednoducho zbytočné utrpenie.",
      },
      {
        type: "p",
        text: "Práve preto je mobilný detailing pred dovolenkou jedna z najlepších vecí, ktoré môžete pre svoje auto aj pohodlie posádky spraviť. Nemusíte stáť v rade v autoumyvárni. Nemusíte si brať voľno. Nemusíte nikam voziť auto. Profesionálne čistenie príde priamo k vám.",
      },
      {
        type: "h2",
        text: "Prečo riešiť detailing auta ešte pred dovolenkou?",
      },
      {
        type: "p",
        text: "Pred dovolenkou väčšina ľudí rieši pneumatiky, servis, diaľničné známky, poistenie, kufre a nabíjačky. Čistenie auta často zostane ako posledná vec. Výsledok? Rýchle opláchnutie na wapke a povysávanie za päť minút.",
      },
      {
        type: "p",
        text: "Lenže dlhá cesta ukáže všetko, čo v meste bežne ignorujete.",
      },
      {
        type: "p",
        text: "Zrazu sedíte v aute nie 20 minút, ale 6, 8 alebo 10 hodín. Prach na palubovke začne vadiť. Mastné čelné sklo zhoršuje výhľad pri nízkom slnku. Zápach z kobercov alebo sedačiek je po pár hodinách neznesiteľný. Deti jedia vzadu, pes leží v kufri, klimatizácia beží naplno a auto dostáva poriadne zabrať.",
      },
      {
        type: "p",
        text: "Detailing pred dovolenkou nie je len o tom, aby auto pekne vyzeralo. Je to o komforte, hygiene a ochrane auta počas celej letnej sezóny.",
      },
      {
        type: "h2",
        text: "Čo všetko dostane auto počas leta zabrať?",
      },
      {
        type: "p",
        text: "Leto je pre auto tvrdšie, než sa zdá. Na prvý pohľad vyzerá ako najľahšie obdobie roka, ale lak aj interiér dostávajú poriadnu nakladačku.",
      },
      {
        type: "p",
        text: "Na karosérii sa drží hmyz, živica, peľ, prach, asfaltové bodky a zvyšky špiny z ciest. Ak sa nechajú na laku dlho, odstraňujú sa ťažšie a môžu zanechať stopy. Najmä zaschnutý hmyz na prednom nárazníku, maske a spätných zrkadlách vie byť poriadne nepríjemný.",
      },
      {
        type: "p",
        text: "Interiér trpí ešte viac. Pot, opaľovací krém, nápoje, jedlo, piesok, chlpy, prach, detské sedačky, kufre, športové veci, mokré uteráky a klimatizácia. To všetko sa mieša v jednom uzavretom priestore.",
      },
      {
        type: "p",
        text: "Preto má zmysel dať auto vyčistiť ešte pred cestou, nie až po nej. Keď vyrazíte s čistým autom, dovolenka sa začína úplne inak.",
      },
      {
        type: "h2",
        text: "Mobilný detailing: čistenie auta bez toho, aby ste niekam chodili",
      },
      {
        type: "p",
        text: "Najväčšia výhoda mobilného detailingu je jednoduchá: auto sa vyčistí tam, kde práve ste.",
      },
      {
        type: "p",
        text: "Doma pred domom. Na firemnom parkovisku. Vo dvore. Pri bytovke. Po dohode na mieste, ktoré vám vyhovuje.",
      },
      {
        type: "p",
        text: "Nemusíte plánovať cestu do prevádzky, čakať, hľadať odvoz späť alebo zabíjať pol dňa kvôli čisteniu auta. Mobilný detailing je ideálny práve pred dovolenkou, keď máte dosť iných vecí na riešenie.",
      },
      {
        type: "p",
        text: "Profesionál príde za vami, prinesie potrebnú výbavu, chémiu, stroje a postará sa o auto priamo na mieste. Vy zatiaľ balíte, pracujete alebo riešite posledné dovolenkové veci.",
      },
      {
        type: "h2",
        text: "Čistenie interiéru auta pred dovolenkou",
      },
      {
        type: "p",
        text: "Interiér je miesto, kde budete počas cesty tráviť najviac času. Preto by mal byť čistý, svieži a príjemný.",
      },
      {
        type: "p",
        text: "Pri mobilnom detailingu sa interiér nerieši štýlom „rýchlo povysávať a pretrieť palubovku“. Kvalitné čistenie ide viac do hĺbky.",
      },
      {
        type: "p",
        text: "Zameriava sa najmä na:",
      },
      {
        type: "ul",
        items: [
          "dôkladné vysávanie interiéru aj batožinového priestoru",
          "čistenie plastov, palubnej dosky a výplní dverí",
          "čistenie držiakov na nápoje, odkladacích priestorov a detailov",
          "umývanie okien zvnútra",
          "odstránenie prachu z miest, kam sa bežne nedostanete",
          "čistenie sedačiek podľa materiálu",
          "tepovanie textilných častí podľa potreby",
          "odstránenie zápachu z interiéru",
        ],
      },
      {
        type: "p",
        text: "Rozdiel spoznáte hneď po otvorení dverí. Auto pôsobí ľahšie, čistejšie a príjemnejšie. A na dlhej ceste je to sakra cítiť.",
      },
      {
        type: "h2",
        text: "Tepovanie sedačiek pred cestou: kedy sa oplatí?",
      },
      {
        type: "p",
        text: "Ak máte textilné sedačky, deti, domáce zvieratá alebo auto používate denne, tepovanie pred dovolenkou dáva veľký zmysel.",
      },
      {
        type: "p",
        text: "Sedačky v aute zachytávajú pot, prach, zvyšky jedla, rozliate nápoje a pachy. Navonok môžu vyzerať „celkom v pohode“, ale pri detailnom čistení sa často ukáže, koľko nečistôt v nich reálne je.",
      },
      {
        type: "p",
        text: "Tepovanie auta pred dovolenkou odporúčame najmä vtedy, keď:",
      },
      {
        type: "ul",
        items: [
          "v aute cítiť zatuchnutý alebo starý zápach",
          "sú na sedačkách mapy alebo fľaky",
          "vozíte deti alebo psa",
          "auto ste dlhšie nedali hĺbkovo vyčistiť",
          "čaká vás dlhá cesta v horúčave",
          "chcete auto pred dovolenkou dostať do čo najlepšieho stavu",
        ],
      },
      {
        type: "p",
        text: "Po tepovaní je dôležité nechať sedačky dobre preschnúť, preto sa čistenie neoplatí nechávať na posledný večer pred odchodom. Ideálne je objednať si ho pár dní vopred.",
      },
      {
        type: "h2",
        text: "Exteriér auta: hmyz, peľ, asfalt a ochrana laku",
      },
      {
        type: "p",
        text: "Pred dovolenkou nejde len o interiér. Exteriér auta dostane počas leta poriadne zabrať, hlavne ak idete stovky kilometrov po diaľnici.",
      },
      {
        type: "p",
        text: "Najviac trpia predné časti auta: nárazník, kapota, čelné sklo, spätné zrkadlá a maska. Hmyz sa pri rýchlej jazde pripečie na lak a ak sa neodstráni včas, ide dole ťažšie. K tomu sa pridá prach, peľ, zvyšky asfaltu a cestná špina.",
      },
      {
        type: "p",
        text: "Profesionálne ručné umytie a detailing exteriéru pomáha odstrániť nečistoty šetrnejšie než bežné kefy alebo rýchle opláchnutie. Po umytí sa oplatí použiť aj ochranu laku, napríklad vosk alebo sealant. Auto sa potom ľahšie umýva, voda lepšie steká a nečistoty sa na povrchu nedržia tak agresívne.",
      },
      {
        type: "p",
        text: "Nie je to zázrak na nesmrteľný lak. Je to praktická ochrana, ktorá sa v lete jednoducho oplatí.",
      },
      {
        type: "h2",
        text: "Prečo nestačí bežná autoumyváreň?",
      },
      {
        type: "p",
        text: "Bežná autoumyváreň má svoje miesto. Keď potrebujete rýchlo opláchnuť auto, je to lepšie než nič. Lenže pred dovolenkou väčšinou potrebujete viac než len mokrú karosériu a povysávané rohože.",
      },
      {
        type: "p",
        text: "Rozdiel medzi bežným umytím a detailingom je v prístupe.",
      },
      {
        type: "p",
        text: "Autoumyváreň rieši auto rýchlo. Detailing rieši auto dôkladne. Mobilný detailing navyše rieši auto bez toho, aby ste sa museli niekam presúvať.",
      },
      {
        type: "p",
        text: "Pri detailingu sa riešia miesta, ktoré bežné čistenie často obíde: medzery medzi sedačkami, držiaky na nápoje, okolie tlačidiel, výduchy, batožinový priestor, vnútorné strany okien, odolnejšie fľaky, zápach a celkový stav interiéru.",
      },
      {
        type: "p",
        text: "A presne tieto detaily robia rozdiel, keď v aute sedíte niekoľko hodín.",
      },
      {
        type: "h2",
        text: "Čisté okná sú pred dovolenkou dôležitejšie, než sa zdá",
      },
      {
        type: "p",
        text: "Mastné okná zvnútra sú jedna z najviac podceňovaných vecí v aute. V meste to možno neriešite, ale na dlhej trase, pri nízkom slnku alebo večer, vedia poriadne zhoršiť výhľad.",
      },
      {
        type: "p",
        text: "Na skle sa zvnútra usádza prach, mastnota, výpary z plastov, odtlačky, zvyšky po klimatizácii a bežná špina z používania auta. Keď na to zasvieti slnko, zrazu vidíte šmuhy, ktoré ste predtým ignorovali.",
      },
      {
        type: "p",
        text: "Pri mobilnom detailingu sa okná čistia dôkladne zvnútra aj zvonka. Výsledok nie je len krajší vzhľad, ale aj lepší pocit z jazdy.",
      },
      {
        type: "h2",
        text: "Auto s deťmi? Detailing pred dovolenkou je skoro povinnosť",
      },
      {
        type: "p",
        text: "Kto cestuje s deťmi, ten vie. Zadné sedačky po pár mesiacoch vyzerajú ako malý sklad potravín, hračiek a neidentifikovateľných omrviniek.",
      },
      {
        type: "p",
        text: "Detské sedačky, rozliate džúsy, čokoláda, keksíky, piesok, blato, mokré topánky. To všetko sa dostáva do kobercov, sedačiek a štrbín.",
      },
      {
        type: "p",
        text: "Pred dovolenkou je preto dobré spraviť poriadok ešte skôr, než sa auto znovu naloží. Čistý interiér znamená menej zápachu, menej prachu a príjemnejšiu cestu pre celú posádku.",
      },
      {
        type: "p",
        text: "A úprimne, keď už máte stráviť pol dňa v aute s deťmi, nech aspoň nesedíte v bordeli.",
      },
      {
        type: "h2",
        text: "Mobilný detailing pre firemné autá pred letom",
      },
      {
        type: "p",
        text: "Mobilný detailing nie je len pre rodiny pred dovolenkou. Veľmi dobre funguje aj pre firemné vozidlá.",
      },
      {
        type: "p",
        text: "Obchodní zástupcovia, manažéri, kuriéri, servisné tímy alebo autá používané na stretnutia so zákazníkmi – všetky tieto vozidlá reprezentujú firmu. Špinavý interiér, fľaky na sedačkách a zaprášená palubovka nerobia dobrý dojem.",
      },
      {
        type: "p",
        text: "Výhoda mobilnej služby je v tom, že autá sa dajú vyčistiť priamo vo firme, bez presúvania do prevádzky. Pri viacerých vozidlách je to obrovská úspora času.",
      },
      {
        type: "h2",
        text: "Kedy si objednať mobilný detailing pred dovolenkou?",
      },
      {
        type: "p",
        text: "Najlepšie je nečakať na posledný deň. Ak chcete tepovanie, ochranu laku alebo dôkladnejšie čistenie, objednajte si termín aspoň pár dní pred odchodom.",
      },
      {
        type: "p",
        text: "Ideálny čas je 3 až 7 dní pred dovolenkou. Auto bude čisté, sedačky stihnú poriadne preschnúť a vy nebudete riešiť stres na poslednú chvíľu.",
      },
      {
        type: "p",
        text: "Ak máte len základné čistenie interiéru a exteriéru, dá sa to zvládnuť aj bližšie k odchodu, ale pri letnej sezóne bývajú termíny rýchlo obsadené. Preto platí jednoduché pravidlo: čím skôr, tým lepšie.",
      },
      {
        type: "h2",
        text: "Čo si pripraviť pred príchodom mobilného detailingu?",
      },
      {
        type: "p",
        text: "Aby čistenie prebehlo čo najlepšie, odporúčame pred príchodom vybrať z auta osobné veci. Najmä doklady, oblečenie, detské hračky, fľaše, nabíjačky, nákupné tašky a veci z kufra.",
      },
      {
        type: "p",
        text: "Auto nemusí byť dokonale vypratané, ale čím menej vecí v ňom zostane, tým lepšie sa dá vyčistiť.",
      },
      {
        type: "p",
        text: "Ak máte špecifický problém, povedzte ho vopred. Napríklad zápach, fľak na sedačke, chlpy po psovi, živicu na laku alebo znečistený kufor. Vďaka tomu sa dá zvoliť správny postup a vyhnúť sa zbytočným prekvapeniam.",
      },
      {
        type: "h2",
        text: "Koľko stojí mobilný detailing pred dovolenkou?",
      },
      {
        type: "p",
        text: "Cena závisí od veľkosti auta, stavu interiéru, rozsahu služieb a toho, či chcete len základné čistenie alebo hĺbkový detailing.",
      },
      {
        type: "p",
        text: "Malé mestské auto v zachovalom stave bude lacnejšie než veľké SUV po rodinnej sezóne, psovi a rozliatom kakau vzadu. To je normálne.",
      },
      {
        type: "p",
        text: "Najlepšie je poslať fotky auta alebo stručne opísať, čo potrebujete. Podľa toho sa dá odporučiť vhodný balík: základné čistenie, hĺbkové čistenie interiéru, tepovanie, exteriérový detailing alebo ochrana laku.",
      },
      {
        type: "p",
        text: "Dôležité je nepozerať len na najnižšiu cenu. Pri detailingu platíte hlavne za čas, dôkladnosť, šetrný postup a výsledok, ktorý vydrží dlhšie než rýchle umytie za pár minút.",
      },
      {
        type: "h2",
        text: "Pre koho je mobilný detailing pred dovolenkou najlepšia voľba?",
      },
      {
        type: "p",
        text: "Mobilný detailing pred letom odporúčame najmä vodičom, ktorí:",
      },
      {
        type: "ul",
        items: [
          "idú autom na dovolenku",
          "cestujú s deťmi",
          "vozia psa",
          "majú v aute zápach alebo fľaky",
          "chcú mať auto čisté bez návštevy prevádzky",
          "potrebujú vyčistiť auto doma alebo vo firme",
          "chcú ochrániť lak pred letnou sezónou",
          "nemajú čas stáť v autoumyvárni",
          "chcú cestovať v príjemnom a čistom interiéri",
        ],
      },
      {
        type: "p",
        text: "Je to služba pre ľudí, ktorí nechcú len „nejako umyť auto“, ale chcú mať auto pripravené poriadne.",
      },
      {
        type: "h2",
        text: "Záver: čisté auto spraví z cesty úplne iný zážitok",
      },
      {
        type: "p",
        text: "Dovolenka nezačína až pri mori. Začína v momente, keď si sadnete do auta, zavriete dvere a vyrazíte.",
      },
      {
        type: "p",
        text: "Ak je interiér čistý, okná bez šmúh, sedačky svieže, kufor pripravený a lak ošetrený, celá cesta pôsobí lepšie. Menej stresu, menej zápachu, viac pohodlia.",
      },
      {
        type: "p",
        text: "Mobilný detailing pred dovolenkou je jednoduchý spôsob, ako pripraviť auto na leto bez zbytočného behania po autoumyvárňach.",
      },
      {
        type: "p",
        text: "Objednajte si čistenie auta priamo k vám domov alebo do práce a vyrazte na dovolenku v aute, v ktorom sa budete cítiť naozaj dobre.",
      },
    ],
    en: [
      {
        type: "p",
        text: "A summer road trip has its charm—luggage, navigation, kids asking “how much longer?”, coffee from the petrol station, and hundreds of kilometres ahead. Before you leave, one thing many drivers leave until the last minute deserves attention: the condition of your car inside and out.",
      },
      {
        type: "p",
        text: "Not mechanical service—that belongs in the workshop. We mean cleanliness, odour, dust, seats, boot, paint, windows, air conditioning, and how the car feels. Travelling in a car full of crumbs, stains, dust, pet hair, greasy windows, and old smells is unnecessary stress.",
      },
      {
        type: "p",
        text: "That is why mobile detailing before your holiday is one of the best things you can do for your car and your comfort. No queue at the car wash, no day off work, no driving anywhere—professional cleaning comes to you.",
      },
      {
        type: "h2",
        text: "Why detail your car before a holiday?",
      },
      {
        type: "p",
        text: "Before a trip most people sort tyres, service, vignettes, insurance, and luggage. Cleaning often stays last—a quick rinse and five minutes of vacuuming. A long drive then reveals everything you usually ignore: hours in the seat, dust on the dashboard, greasy windscreen in low sun, and odours from carpets or seats.",
      },
      {
        type: "p",
        text: "Pre-holiday detailing is not just about looks. It is about comfort, hygiene, and protecting your car through the whole summer season.",
      },
      {
        type: "h2",
        text: "What summer does to your car",
      },
      {
        type: "p",
        text: "Summer is tougher on a car than it seems. Bodywork collects insects, tree sap, pollen, dust, and road grime. The interior gets sweat, sunscreen, food, sand, pet hair, and full air-conditioning use in a closed space. Cleaning before the trip—not after—starts the holiday on the right foot.",
      },
      {
        type: "h2",
        text: "Mobile detailing: cleaning without visiting a wash",
      },
      {
        type: "p",
        text: "The main advantage is simple: your car is cleaned where you are—at home, at work, or in your courtyard. A professional arrives with equipment and products and works on site while you pack or handle other plans.",
      },
      {
        type: "h2",
        text: "Interior cleaning before a holiday",
      },
      {
        type: "p",
        text: "You will spend most of the journey inside the car. Quality mobile detailing goes deeper than a quick vacuum and wipe.",
      },
      {
        type: "ul",
        items: [
          "thorough vacuuming of interior and boot",
          "cleaning plastics, dashboard, and door trims",
          "cup holders, storage areas, and details",
          "interior window cleaning",
          "dust removal from hard-to-reach spots",
          "seat cleaning suited to material",
          "textile shampooing where needed",
          "odour removal",
        ],
      },
      {
        type: "h2",
        text: "Seat shampooing before the trip: when it pays off",
      },
      {
        type: "p",
        text: "With fabric seats, children, pets, or daily use, shampooing before a holiday makes a big difference. Seats hold sweat, dust, food, and odours that are not obvious until a deep clean.",
      },
      {
        type: "ul",
        items: [
          "persistent or stale smell in the car",
          "visible marks or stains on seats",
          "children or a dog travelling with you",
          "no deep clean for a long time",
          "a long trip in hot weather ahead",
          "you want the car in the best possible condition",
        ],
      },
      {
        type: "p",
        text: "Allow time for seats to dry properly—book a few days before departure, not the night before you leave.",
      },
      {
        type: "h2",
        text: "Exterior: insects, pollen, and paint protection",
      },
      {
        type: "p",
        text: "The front of the car takes the hardest hit on motorways. Professional hand washing removes grime more gently than a quick rinse. Paint protection afterwards helps the car stay cleaner longer in summer.",
      },
      {
        type: "h2",
        text: "Why a standard car wash is often not enough",
      },
      {
        type: "p",
        text: "A quick wash has its place. Before a holiday you usually need more: gaps between seats, vents, the boot, interior glass, odours, and overall condition. Detailing addresses what a fast wash often skips.",
      },
      {
        type: "h2",
        text: "Clean windows matter more than you think",
      },
      {
        type: "p",
        text: "Greasy interior glass hurts visibility in low sun on long drives. Thorough interior and exterior glass cleaning improves safety and comfort.",
      },
      {
        type: "h2",
        text: "Travelling with children?",
      },
      {
        type: "p",
        text: "Rear seats collect crumbs, juice, and sand. Sorting the interior before loading luggage means less smell and a more pleasant journey for everyone.",
      },
      {
        type: "h2",
        text: "Company cars before summer",
      },
      {
        type: "p",
        text: "Mobile detailing works for fleet and company vehicles too—cleaned at your premises without losing vehicles for half a day at a wash.",
      },
      {
        type: "h2",
        text: "When to book?",
      },
      {
        type: "p",
        text: "Book 3–7 days before you leave when possible, especially if you need shampooing or paint protection. Summer slots fill up quickly.",
      },
      {
        type: "h2",
        text: "How to prepare for the visit",
      },
      {
        type: "p",
        text: "Remove personal items from the car and mention specific issues upfront—odour, stains, pet hair, or tree sap on paint—so we choose the right approach.",
      },
      {
        type: "h2",
        text: "How much does it cost?",
      },
      {
        type: "p",
        text: "Price depends on vehicle size, condition, and scope—from basic clean to deep interior work and paint protection. Photos and a short description help us recommend the right package.",
      },
      {
        type: "h2",
        text: "Who is it best for?",
      },
      {
        type: "ul",
        items: [
          "holiday road trips",
          "families with children or dogs",
          "odours or stains in the car",
          "cleaning at home or at work",
          "summer paint protection",
          "no time for car wash queues",
        ],
      },
      {
        type: "h2",
        text: "Conclusion",
      },
      {
        type: "p",
        text: "Your holiday starts when you close the door and drive off. A clean interior, clear glass, fresh seats, and protected paint make the whole trip better. Book mobile detailing at your location and travel in a car that genuinely feels good.",
      },
    ],
    de: [
      {
        type: "p",
        text: "Ein Sommer-Roadtrip hat seinen Reiz – Gepäck, Navigation, Kinder fragen „Wie lange noch?“, Kaffee von der Tankstelle und Hunderte Kilometer vor Ihnen. Bevor Sie losfahren, verdient eine Sache Aufmerksamkeit, die viele Fahrer bis zuletzt aufschieben: der Zustand Ihres Autos innen und außen.",
      },
      {
        type: "p",
        text: "Nicht die Mechanik – die gehört in die Werkstatt. Wir meinen Sauberkeit, Geruch, Staub, Sitze, Kofferraum, Lack, Scheiben, Klimaanlage und das Gefühl im Auto. In einem Auto voller Krümel, Flecken, Staub, Tierhaare, fettiger Scheiben und alter Gerüche zu reisen, ist unnötiger Stress.",
      },
      {
        type: "p",
        text: "Deshalb ist mobile Autopflege vor dem Urlaub eine der besten Maßnahmen für Ihr Auto und Ihren Komfort. Keine Schlange in der Waschanlage, kein freier Tag, kein irgendwohin Fahren – professionelle Reinigung kommt zu Ihnen.",
      },
      {
        type: "h2",
        text: "Warum Ihr Auto vor dem Urlaub aufbereitet werden sollte",
      },
      {
        type: "p",
        text: "Vor der Reise kümmern sich die meisten um Reifen, Service, Vignetten, Versicherung und Gepäck. Reinigung bleibt oft zuletzt – ein schnelles Abspülen und fünf Minuten Staubsaugen. Eine lange Fahrt zeigt dann alles, was Sie sonst ignorieren: Stunden im Sitz, Staub auf dem Armaturenbrett, fettige Windschutzscheibe bei tief stehender Sonne und Gerüche aus Teppichen oder Sitzen.",
      },
      {
        type: "p",
        text: "Autopflege vor dem Urlaub geht nicht nur ums Aussehen. Es geht um Komfort, Hygiene und Schutz Ihres Autos durch die ganze Sommersaison.",
      },
      {
        type: "h2",
        text: "Was der Sommer mit Ihrem Auto macht",
      },
      {
        type: "p",
        text: "Der Sommer ist härter fürs Auto, als es scheint. Karosserie sammelt Insekten, Baumharz, Pollen, Staub und Straßenschmutz. Der Innenraum bekommt Schweiß, Sonnencreme, Essen, Sand, Tierhaare und volle Klimaanlage in einem geschlossenen Raum. Reinigung vor der Fahrt – nicht danach – startet den Urlaub richtig.",
      },
      {
        type: "h2",
        text: "Mobile Autopflege: Reinigung ohne Waschanlagen-Besuch",
      },
      {
        type: "p",
        text: "Der größte Vorteil ist einfach: Ihr Auto wird dort gereinigt, wo Sie sind – zu Hause, bei der Arbeit oder im Hof. Ein Profi kommt mit Ausrüstung und Produkten und arbeitet vor Ort, während Sie packen oder andere Dinge erledigen.",
      },
      {
        type: "h2",
        text: "Innenraumreinigung vor dem Urlaub",
      },
      {
        type: "p",
        text: "Die meiste Zeit der Fahrt verbringen Sie im Innenraum. Qualitative mobile Autopflege geht tiefer als schnelles Staubsaugen und Abwischen.",
      },
      {
        type: "ul",
        items: [
          "gründliches Staubsaugen von Innenraum und Kofferraum",
          "Reinigung von Kunststoffen, Armaturenbrett und Türverkleidungen",
          "Getränkehalter, Ablagen und Details",
          "Innenraum-Scheibenreinigung",
          "Staubentfernung an schwer erreichbaren Stellen",
          "Sitzreinigung passend zum Material",
          "Textil-Polsterreinigung bei Bedarf",
          "Geruchsneutralisation",
        ],
      },
      {
        type: "h2",
        text: "Polsterreinigung vor der Fahrt: wann sie sich lohnt",
      },
      {
        type: "p",
        text: "Bei Stoffsitzen, Kindern, Haustieren oder täglicher Nutzung macht Polsterreinigung vor dem Urlaub einen großen Unterschied. Sitze halten Schweiß, Staub, Essen und Gerüche, die bei Tiefenreinigung erst sichtbar werden.",
      },
      {
        type: "ul",
        items: [
          "anhaltender oder muffiger Geruch im Auto",
          "sichtbare Flecken auf den Sitzen",
          "Kinder oder Hund reisen mit",
          "lange keine Tiefenreinigung",
          "lange Fahrt bei Hitze bevorsteht",
          "Auto soll im bestmöglichen Zustand sein",
        ],
      },
      {
        type: "p",
        text: "Planen Sie Trocknungszeit ein – buchen Sie einige Tage vor Abfahrt, nicht am Abend davor.",
      },
      {
        type: "h2",
        text: "Außenbereich: Insekten, Pollen und Lackschutz",
      },
      {
        type: "p",
        text: "Die Front trifft auf Autobahnen am härtesten. Professionelle Handwäsche entfernt Schmutz schonender als schnelles Abspülen. Lackschutz danach hilft, das Auto im Sommer länger sauber zu halten.",
      },
      {
        type: "h2",
        text: "Warum eine normale Waschanlage oft nicht reicht",
      },
      {
        type: "p",
        text: "Eine Schnellwäsche hat ihren Platz. Vor dem Urlaub brauchen Sie meist mehr: Spalten zwischen Sitzen, Lüftung, Kofferraum, Innenscheiben, Gerüche und Gesamtzustand. Detailing adressiert, was eine schnelle Wäsche oft übersieht.",
      },
      {
        type: "h2",
        text: "Saubere Scheiben sind wichtiger als gedacht",
      },
      {
        type: "p",
        text: "Fettige Innenscheiben verschlechtern die Sicht bei tief stehender Sonne auf langen Fahrten. Gründliche Innen- und Außenreinigung verbessert Sicherheit und Komfort.",
      },
      {
        type: "h2",
        text: "Reisen mit Kindern?",
      },
      {
        type: "p",
        text: "Rücksitze sammeln Krümel, Saft und Sand. Innenraum vor dem Beladen in Ordnung bringen bedeutet weniger Geruch und angenehmere Fahrt für alle.",
      },
      {
        type: "h2",
        text: "Firmenwagen vor dem Sommer",
      },
      {
        type: "p",
        text: "Mobile Autopflege funktioniert auch für Fuhrpark und Firmenfahrzeuge – gereinigt bei Ihnen vor Ort, ohne halben Tag in der Waschanlage.",
      },
      {
        type: "h2",
        text: "Wann buchen?",
      },
      {
        type: "p",
        text: "Buchen Sie wenn möglich 3–7 Tage vor Abfahrt, besonders bei Polsterreinigung oder Lackschutz. Sommertermine sind schnell ausgebucht.",
      },
      {
        type: "h2",
        text: "Wie Sie sich auf den Besuch vorbereiten",
      },
      {
        type: "p",
        text: "Entfernen Sie persönliche Gegenstände aus dem Auto und nennen Sie Probleme im Voraus – Geruch, Flecken, Tierhaare oder Baumharz am Lack – damit wir den richtigen Ansatz wählen.",
      },
      {
        type: "h2",
        text: "Was kostet es?",
      },
      {
        type: "p",
        text: "Der Preis hängt von Fahrzeuggröße, Zustand und Umfang ab – von Basisreinigung bis Tiefenreinigung und Lackschutz. Fotos und kurze Beschreibung helfen bei der Paketempfehlung.",
      },
      {
        type: "h2",
        text: "Für wen ist es am besten geeignet?",
      },
      {
        type: "ul",
        items: [
          "Urlaubs-Roadtrips",
          "Familien mit Kindern oder Hunden",
          "Gerüche oder Flecken im Auto",
          "Reinigung zu Hause oder im Büro",
          "Sommerlicher Lackschutz",
          "keine Zeit für Waschanlagen-Schlangen",
        ],
      },
      {
        type: "h2",
        text: "Fazit",
      },
      {
        type: "p",
        text: "Ihr Urlaub beginnt, wenn Sie die Tür schließen und losfahren. Sauberer Innenraum, klare Scheiben, frische Sitze und geschützter Lack machen die ganze Fahrt besser. Buchen Sie mobile Autopflege bei Ihnen vor Ort und reisen Sie in einem Auto, in dem Sie sich wirklich wohlfühlen.",
      },
    ],
  },
},
  {
    slug: "preco-mobilny-detailing-bratislava",
    category: "mobilny-detailing",
    publishedAt: "2026-05-15",
    image: "/images/van-with-logo.png",
    imageAlt: {
      sk: "Mobilná detailingová jednotka Crystal Detailing",
      en: "Crystal Detailing mobile unit",
      de: "Mobile Crystal Detailing Einheit",
    },
    title: {
      sk: "Prečo sa oplatí mobilný detailing v Bratislave",
      en: "Why mobile detailing in Bratislava is worth it",
      de: "Warum sich mobile Autopflege in Bratislava lohnt",
    },
    excerpt: {
      sk: "Ušetríte čas, vyhnete sa rade v umyvárke a získate prémiový výsledok priamo na vašej adrese.",
      en: "Save time, skip the car wash queue, and get premium results right at your address.",
      de: "Sparen Sie Zeit, vermeiden Sie die Warteschlange in der Waschanlage und erhalten Sie Premium-Ergebnisse direkt bei Ihnen vor Ort.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Mobilný detailing nie je len „umyvanie auta na dvore“. Ide o kompletnú starostlivosť o interiér aj exteriér s profesionálnou výbavou, ktorá príde k vám – domov, do firmy alebo na parkovisko.",
        },
        {
          type: "h2",
          text: "Čo získate oproti klasickej umyvárke",
        },
        {
          type: "ul",
          items: [
            "Žiadne čakanie v rade ani strácanie pol dňa v servise",
            "Individuálny prístup podľa typu vozidla a stavu znečistenia",
            "Prémiové prípravky šetrné k laku, koži aj textíliám",
            "Možnosť kombinovať služby – od refresh balíka po tepovanie",
          ],
        },
        {
          type: "p",
          text: "V Bratislave a okolí je čas často dôležitejší než pár eur úspory. Mobilný detailing vám umožní riešiť auto popri práci alebo domácich povinnostiach – my prídeme v dohodnutý termín a o všetko sa postaráme.",
        },
        {
          type: "h2",
          text: "Pre koho je služba ideálna",
        },
        {
          type: "p",
          text: "Pre majiteľov firemných áut, rodiny s deťmi (časté špinavé interiéry), predajcov vozidiel pred odovzdaním kupujúcemu aj pre ľudí, ktorí chcú mať auto vo vizuálne aj hygienicky čistom stave bez starostí s dopravou do servisu.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Mobile detailing is not just “washing a car in the driveway.” It is full interior and exterior care with professional equipment that comes to you—home, office, or parking lot.",
        },
        {
          type: "h2",
          text: "What you gain vs. a classic car wash",
        },
        {
          type: "ul",
          items: [
            "No waiting in line or losing half a day at a service",
            "Individual approach based on vehicle type and soiling",
            "Premium products gentle on paint, leather, and textiles",
            "Combine services—from a refresh package to deep cleaning",
          ],
        },
        {
          type: "p",
          text: "In Bratislava and surrounding areas, time is often more valuable than saving a few euros. Mobile detailing lets you handle your car around work or family—we arrive at the agreed time and take care of everything.",
        },
        {
          type: "h2",
          text: "Who it is ideal for",
        },
        {
          type: "p",
          text: "Company car owners, families with kids (messy interiors), sellers preparing a handover, and anyone who wants their car visually and hygienically clean without driving to a service.",
        },
      ],
      de: [
        {
          type: "p",
          text: "Mobile Autopflege ist nicht nur „Auto in der Einfahrt waschen“. Es ist umfassende Innen- und Außenpflege mit professioneller Ausrüstung, die zu Ihnen kommt – nach Hause, ins Büro oder auf den Parkplatz.",
        },
        {
          type: "h2",
          text: "Was Sie gegenüber einer klassischen Waschanlage gewinnen",
        },
        {
          type: "ul",
          items: [
            "Kein Anstehen in der Schlange und kein halber Tag in der Werkstatt",
            "Individueller Ansatz je nach Fahrzeugtyp und Verschmutzungsgrad",
            "Premium-Produkte, schonend zu Lack, Leder und Textilien",
            "Kombination von Leistungen – vom Refresh-Paket bis zur Tiefenreinigung",
          ],
        },
        {
          type: "p",
          text: "In Bratislava und Umgebung ist Zeit oft wertvoller als ein paar Euro Ersparnis. Mobile Autopflege ermöglicht es Ihnen, das Auto neben Beruf oder Familie zu erledigen – wir kommen zum vereinbarten Termin und kümmern uns um alles.",
        },
        {
          type: "h2",
          text: "Für wen die Dienstleistung ideal ist",
        },
        {
          type: "p",
          text: "Für Firmenwagenbesitzer, Familien mit Kindern (unordentliche Innenräume), Verkäufer vor der Übergabe an den Käufer und alle, die ihr Auto optisch und hygienisch sauber haben möchten, ohne zur Werkstatt fahren zu müssen.",
        },
      ],
    },
  },
  {
    slug: "tepovanie-sedaciek-kedy-a-prečo",
    category: "tepovanie",
    publishedAt: "2026-04-28",
    image: "/images/blog/tepovanie-sedaciek.png",
    imageAlt: {
      sk: "Profesionálne tepovanie sedačiek extrakčným čističom v aute",
      en: "Professional car seat shampooing with an extraction cleaning tool",
      de: "Professionelle Polsterreinigung mit Extraktionsgerät im Auto",
    },
    title: {
      sk: "Tepovanie sedačiek: kedy ho potrebujete a čo od neho čakať",
      en: "Seat shampooing: when you need it and what to expect",
      de: "Polsterreinigung: wann Sie sie brauchen und was Sie erwartet",
    },
    excerpt: {
      sk: "Zápach, škvrny alebo alergie? Tepovanie hĺbkovo odstráni nečistoty, ktoré bežné vysávanie nezvládne.",
      en: "Odour, stains, or allergies? Deep cleaning removes dirt regular vacuuming cannot handle.",
      de: "Geruch, Flecken oder Allergien? Tiefenreinigung entfernt Schmutz, den normales Staubsaugen nicht bewältigt.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Bežné vysávanie odstráni prach a hrubé nečistoty zo povrchu. Tepovanie (extrakčné čistenie) pracuje hlbšie – do vlákien sedačiek, koberčekov a textilných častí dverí.",
        },
        {
          type: "h2",
          text: "Signály, že je čas na tepovanie",
        },
        {
          type: "ul",
          items: [
            "Pretrvávajúci zápach (tabak, zvieratá, vlhkosť)",
            "Viditeľné mapy alebo škvrny na sedadlách",
            "Alergické reakcie v aute",
            "Predaj vozidla – interiér musí pôsobiť ako nový",
          ],
        },
        {
          type: "p",
          text: "Pri mobilnom servise prídeme s extraktorom a vhodnými prípravkami priamo k vám. Čas sušenia závisí od materiálu a sezóny; v lete schnú sedačky rýchlejšie, v zime odporúčame rezervovať termín s dostatočným časom na vysušenie.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Regular vacuuming removes surface dust and coarse dirt. Shampooing (extraction cleaning) goes deeper—into seat fibres, carpets, and textile door panels.",
        },
        {
          type: "h2",
          text: "Signs it is time for a deep clean",
        },
        {
          type: "ul",
          items: [
            "Persistent odour (smoke, pets, moisture)",
            "Visible marks or stains on seats",
            "Allergic reactions in the car",
            "Selling the vehicle—the interior must feel new",
          ],
        },
        {
          type: "p",
          text: "With our mobile service we bring an extractor and suitable products to you. Drying time depends on material and season; in summer seats dry faster, in winter we recommend booking with enough time to dry.",
        },
      ],
      de: [
        {
          type: "p",
          text: "Regelmäßiges Staubsaugen entfernt Oberflächenstaub und groben Schmutz. Polsterreinigung (Extraktionsreinigung) geht tiefer – in Sitzfasern, Teppiche und textile Türverkleidungen.",
        },
        {
          type: "h2",
          text: "Anzeichen, dass es Zeit für eine Tiefenreinigung ist",
        },
        {
          type: "ul",
          items: [
            "Anhaltender Geruch (Rauch, Haustiere, Feuchtigkeit)",
            "Sichtbare Flecken oder Schmutzflecken auf den Sitzen",
            "Allergische Reaktionen im Auto",
            "Fahrzeugverkauf – der Innenraum muss wie neu wirken",
          ],
        },
        {
          type: "p",
          text: "Mit unserem mobilen Service bringen wir Extraktor und passende Produkte zu Ihnen. Die Trocknungszeit hängt vom Material und der Jahreszeit ab; im Sommer trocknen Sitze schneller, im Winter empfehlen wir eine Buchung mit ausreichend Trocknungszeit.",
        },
      ],
    },
  },
  {
    slug: "renovacia-svetlometov-vysledok",
    category: "detailing-tips",
    publishedAt: "2026-03-22",
    image: "/images/headlight-renewal-before-after.png",
    imageAlt: {
      sk: "Pred a po renovácii svetlometov",
      en: "Headlights before and after restoration",
      de: "Scheinwerfer vor und nach der Aufbereitung",
    },
    title: {
      sk: "Renovácia svetlometov: kedy nestačí bežné umývanie",
      en: "Headlight restoration: when a regular wash is not enough",
      de: "Scheinwerfer-Aufbereitung: wenn normales Waschen nicht ausreicht",
    },
    excerpt: {
      sk: "Zažltnuté svetlomety zhoršujú svietivosť aj vzhľad auta. Renovácia ich vráti do takmer nového stavu.",
      en: "Yellowed headlights reduce visibility and hurt your car’s look. Restoration brings them back to near-new.",
      de: "Vergilbte Scheinwerfer verschlechtern die Sicht und den Look Ihres Autos. Aufbereitung bringt sie fast in Neuzustand zurück.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Plastové svetlomety časom oxidujú pod vplyvom UV a poveternostných vplyvov. Výsledkom je matný, žltý povrch a slabšie osvetlenie vozovky – čo je bezpečnostný aj estetický problém.",
        },
        {
          type: "h2",
          text: "Čo zahŕňa profesionálna renovácia",
        },
        {
          type: "ul",
          items: [
            "Odstránenie oxidácie brúsením v niekoľkých stupňoch",
            "Leštenie pre obnovenie priehľadnosti",
            "Aplikácia UV ochrany, aby sa efekt dlhšie udržal",
          ],
        },
        {
          type: "p",
          text: "Výsledok je citeľný hneď po službe. Pri mobilnom servise renováciu vieme urobiť u vás – stačí suché, tienené miesto a dohodnutý čas v našom online rezervačnom systéme.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Plastic headlights oxidise over time from UV and weather. The result is a dull, yellow surface and weaker road lighting—a safety and aesthetic issue.",
        },
        {
          type: "h2",
          text: "What professional restoration includes",
        },
        {
          type: "ul",
          items: [
            "Removing oxidation with multi-step sanding",
            "Polishing to restore clarity",
            "UV protection so the result lasts longer",
          ],
        },
        {
          type: "p",
          text: "The difference is visible immediately. With our mobile service we can do it at your location—just a dry, shaded spot and a booked slot in our online system.",
        },
      ],
      de: [
        {
          type: "p",
          text: "Kunststoff-Scheinwerfer oxidieren mit der Zeit durch UV-Strahlung und Witterung. Das Ergebnis ist eine matte, gelbe Oberfläche und schwächere Straßenbeleuchtung – ein Sicherheits- und Ästhetikproblem.",
        },
        {
          type: "h2",
          text: "Was professionelle Aufbereitung umfasst",
        },
        {
          type: "ul",
          items: [
            "Entfernung der Oxidation durch mehrstufiges Schleifen",
            "Polieren zur Wiederherstellung der Klarheit",
            "UV-Schutz, damit das Ergebnis länger hält",
          ],
        },
        {
          type: "p",
          text: "Der Unterschied ist sofort sichtbar. Mit unserem mobilen Service können wir das bei Ihnen vor Ort erledigen – nur ein trockener, schattiger Platz und ein gebuchter Termin in unserem Online-System.",
        },
      ],
    },
  },
]
const WORDS_PER_MINUTE = 200

function blocksToPlainText(blocks: BlogContentBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "ul") return b.items.join(" ")
      return b.text
    })
    .join(" ")
}

export function getReadingTimeMinutes(blocks: BlogContentBlock[]): number {
  const words = blocksToPlainText(blocks).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function getCategoryById(id: BlogCategoryId): BlogCategory | undefined {
  return blogCategories.find((c) => c.id === id)
}

export function getCategoryLabel(id: BlogCategoryId, lang: "sk" | "en" | "de"): string {
  return getCategoryById(id)?.label[lang] ?? id
}

export type BlogSortOrder = "newest" | "oldest"

export const DEFAULT_BLOG_SORT: BlogSortOrder = "newest"

/** Query `radenie`: `najstarsie` = oldest first; absent or other = newest first */
export function parseBlogSort(param: string | null): BlogSortOrder {
  return param === "najstarsie" ? "oldest" : "newest"
}

export function getAllPosts(sort: BlogSortOrder = DEFAULT_BLOG_SORT): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    const diff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    return sort === "newest" ? diff : -diff
  })
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByCategory(
  category: BlogCategoryId | null,
  sort: BlogSortOrder = DEFAULT_BLOG_SORT,
): BlogPost[] {
  const sorted = getAllPosts(sort)
  if (!category) return sorted
  return sorted.filter((p) => p.category === category)
}

export function formatBlogDate(isoDate: string, lang: "sk" | "en" | "de"): string {
  const date = new Date(isoDate + "T12:00:00")
  const locale = lang === "sk" ? "sk-SK" : lang === "de" ? "de-DE" : "en-GB"
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}

const BLOG_CATEGORY_KEYWORDS: Record<BlogCategoryId, string[]> = {
  "detailing-tips": [
    "detailing tipy",
    "detailing Bratislava",
    "renovácia svetlometov",
    "čistenie auta",
    "mobilný detailing",
  ],
  tepovanie: [
    "tepovanie sedačiek",
    "tepovanie auta",
    "čistenie interiéru",
    "čistenie kobercov v aute",
    "mobilné tepovanie Bratislava",
  ],
  "mobilny-detailing": [
    "mobilný detailing",
    "mobilný detailing Bratislava",
    "detailing pred dovolenkou",
    "výjazdové čistenie auta",
    "detailing doma",
  ],
}

export function getBlogPostKeywords(post: BlogPost): string[] {
  return BLOG_CATEGORY_KEYWORDS[post.category] ?? []
}
