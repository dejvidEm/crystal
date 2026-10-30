import type { Language } from "@/lib/i18n/language-cookie"

export const HOME_UPHOLSTERY_PATH = "/tepovanie-domacnosti" as const
export const HOME_UPHOLSTERY_SOURCE = "home-upholstery" as const

type HomePackage = {
  title: string
  subtitle: string
  features: string[]
  mostPopular?: boolean
}

type HomeAddon = {
  title: string
  description: string
}

export type HomeUpholsteryCopy = {
  pageBadge: string
  priceOnRequest: string
  selectPackage: string
  hero: {
    badge: string
    title: string
    subtitle: string
    trust1: string
    trust2: string
    trust3: string
    formTitle: string
    formSubtitle: string
    messagePlaceholder: string
    itemLabel: string
    items: string[]
    submit: string
  }
  handoverTitle: string
  handoverCta: string
  reviewsTitle: string
  reviewsSubtitle: string
  servicesTitle: string
  servicesSubtitle: string
  additionalTitle: string
  additionalSubtitle: string
  additionalNote: string
  mediaTitle: string
  mediaSubtitle: string
  howItWorksTitle: string
  howItWorksSubtitle: string
  step1Title: string
  step1Description: string
  step2Title: string
  step2Description: string
  step3Title: string
  step3Description: string
  bookCta: string
  whyTitle: string
  whyItems: { title: string; description: string }[]
  faqTitle: string
  faqSubtitle: string
  faqItems: { question: string; answer: string }[]
  bookingTitle: string
  bookingDescription: string
  contactTitle: string
  contactSubtitle: string
  contactPlaceholder: string
  packages: HomePackage[]
  addons: HomeAddon[]
}

const sk: HomeUpholsteryCopy = {
  pageBadge: "Tepovanie domácností",
  priceOnRequest: "Cena na dopyt",
  selectPackage: "Chcem dopyt",
  hero: {
    badge: "Novinka · tepovanie domácností 7 dní v týždni",
    title: "Tepovanie domácností priamo u vás v Bratislave.",
    subtitle:
      "Prídeme k vám domov. Sedačky, koberce, matrace a kreslá – hĺbkové tepovanie bez sťahovania nábytku do čistiarne.",
    trust1: "Výjazd po celej Bratislave a okolí",
    trust2: "Sedačky, koberce, matrace aj kreslá",
    trust3: "Práca u vás – bez odvozu nábytku",
    formTitle: "Dopyt na tepovanie domácností",
    formSubtitle: "Napíšte, čo treba vyčistiť. Ozveme sa s cenou a termínom – ide o tepovanie domácností, nie o auto.",
    messagePlaceholder: "Napr. rohová sedačka, koberec v obývačke, matrac, škvrny od vína…",
    itemLabel: "Čo potrebujete tepovať",
    items: ["Sedačka", "Koberec / podlaha", "Matrac", "Kreslá", "Viac kusov / kombinácia"],
    submit: "Odoslať dopyt na tepovanie domácností",
  },
  handoverTitle: "Nábytok odovzdávame nie čistý, ale nový",
  handoverCta: "Chcem rovnaký výsledok doma",
  reviewsTitle: "Spokojní zákazníci Crystal Detailing",
  reviewsSubtitle: "Rovnaký tím, teraz aj pre tepovanie domácností – sedačky, koberce a matrace u vás doma.",
  servicesTitle: "Balíky tepovania domácností",
  servicesSubtitle: "Vyberte rozsah. Presnú cenu potvrdíme podľa veľkosti, materiálu a znečistenia.",
  additionalTitle: "Doplnkové služby pre domácnosť",
  additionalSubtitle: "Škvrny, dezinfekcia a ďalšie úpravy k tepovaniu nábytku a textílií.",
  additionalNote: "Doplnky doplníme k dopytu podľa stavu textílií.",
  mediaTitle: "Výsledky v detailoch",
  mediaSubtitle: "Ukázka práce s textíliami. Tepovanie domácností robíme s rovnakou precíznosťou.",
  howItWorksTitle: "Ako funguje tepovanie domácností",
  howItWorksSubtitle: "Prídeme k vám domov s vlastnou technikou. Vy len uvoľníte priestor okolo nábytku.",
  step1Title: "1. Pošlite dopyt",
  step1Description:
    "Vyplňte formulár – aký kus nábytku, približná veľkosť a lokalita. Ozveme sa s cenou a voľným termínom.",
  step2Title: "2. Prídeme k vám domov",
  step2Description:
    "Prinesieme extrakčné tepovanie, vodu aj vysávače. Nábytok sa neodváža – pracujeme u vás v byte alebo dome.",
  step3Title: "3. Užite si svieži interiér",
  step3Description:
    "Po práci ostane čistá, svieža textília. Podľa materiálu poradíme, kedy sa na ňu dá znova sadnúť.",
  bookCta: "Chcem tepovanie domácností",
  whyTitle: "Prečo tepovanie domácností u nás",
  whyItems: [
    {
      title: "Prídeme za vami, nábytok nikam nevezieme",
      description:
        "Nemusíte objednať sťahovákov ani čakárne v čistiarni. Tepovanie sedačky aj koberca prebehne u vás doma.",
    },
    {
      title: "Hĺbkové tepovanie, nie len povrch",
      description:
        "Extrakcia ťahá nečistoty, alergény a zápach z hĺbky tkaniny. Vhodné pri deťoch, zvieratách aj po oslavách.",
    },
    {
      title: "Rovnaký tím ako pri mobilnom detailingu",
      description:
        "Starostlivosť Crystal Detailing teraz aj pre domácnosť. Precízna práca, férové jednanie a termín, ktorý vám sedí.",
    },
  ],
  faqTitle: "Často kladené otázky",
  faqSubtitle: "Tepovanie domácností – sedačky, koberce a matrace u vás doma",
  faqItems: [
    {
      question: "Čo všetko tepujete v domácnosti?",
      answer:
        "Sedačky, kreslá, koberce, podlahové textílie a matrace. Pri dopyte napíšte typ a približnú veľkosť.",
    },
    {
      question: "Musím nábytok niekam odvážať?",
      answer: "Nie. Prídeme k vám a pracujeme na mieste. Stačí sprístupniť priestor okolo kusov, ktoré ideme čistiť.",
    },
    {
      question: "Ako dlho to trvá a kedy sa dá znova použiť?",
      answer:
        "Podľa rozsahu zvyčajne niekoľko hodín. Schnutie závisí od materiálu a počasia – pred odchodom vám povieme, kedy je textília znova pripravená.",
    },
    {
      question: "Ako sa počíta cena?",
      answer:
        "Podľa typu kusu, veľkosti, materiálu a znečistenia. Pošlite dopyt alebo fotku a ozveme sa s konkrétnou cenou.",
    },
  ],
  bookingTitle: "Ste pripravení na tepovanie domácností?",
  bookingDescription:
    "Napíšte, čo treba vyčistiť. Dopyt označíme ako tepovanie domácností – nie ako mobilný detailing auta.",
  contactTitle: "Dopyt na tepovanie domácností",
  contactSubtitle: "Táto správa ide do systému ako tepovanie domácností, oddelene od detailingu áut.",
  contactPlaceholder: "Sedačka / koberec / matrac, veľkosť, lokalita, škvrny…",
  packages: [
    {
      title: "Kreslá",
      subtitle: "Menšie kusy a samostatné kreslá",
      features: ["1–2 kreslá", "Hĺbkové tepovanie textílie", "Ošetrenie bežných škvŕn", "Svieža vôňa po vyschnutí"],
    },
    {
      title: "Sedačka",
      subtitle: "Najčastejšia voľba pre obývačku",
      mostPopular: true,
      features: [
        "Dvojsedačka až rohová sedačka",
        "Extrakčné tepovanie sedákov a operadiel",
        "Čistenie vankúšov podľa stavu",
        "Odstránenie zápachu z textílie",
      ],
    },
    {
      title: "Koberec",
      subtitle: "Koberce a textilná podlaha",
      features: ["Kusový koberec alebo tapison", "Hĺbkové tepovanie vlákna", "Ošetrenie mapy a fľakov", "Rýchlejšie schnutie vetraním"],
    },
    {
      title: "Komplet domácnosť",
      subtitle: "Viac kusov v jednej návšteve",
      features: [
        "Sedačka + koberce alebo matrace",
        "Jeden výjazd, viac textílií",
        "Jednotný postup a chémia",
        "Cena podľa rozsahu – na dopyt",
      ],
    },
  ],
  addons: [
    { title: "Matrac", description: "Hĺbkové tepovanie matraca, odstránenie zápachu a roztočov." },
    { title: "Odolné škvrny", description: "Cielené ošetrenie vína, kávy, mastnoty alebo fľakov od zvierat." },
    { title: "Dezinfekcia textílií", description: "Doplnková dezinfekcia po tepovaní pri alergikoch a deťoch." },
    { title: "Záclony a dekoračné textílie", description: "Tepovanie závesov a textilných dekorácií podľa materiálu." },
    { title: "Extra miestnosť", description: "Ďalší koberec alebo miestnosť v tom istom termíne." },
    { title: "Zvieracie chlpy", description: "Dôkladnejšie vysatie a tepovanie pri srsti v tkanine." },
  ],
}

const en: HomeUpholsteryCopy = {
  pageBadge: "Home upholstery cleaning",
  priceOnRequest: "Quote on request",
  selectPackage: "Request a quote",
  hero: {
    badge: "New · home upholstery cleaning 7 days a week",
    title: "Home upholstery cleaning at your place in Bratislava.",
    subtitle:
      "We come to your home. Sofas, carpets, mattresses and armchairs — deep extraction cleaning without taking furniture to a shop.",
    trust1: "We cover Bratislava and nearby towns",
    trust2: "Sofas, carpets, mattresses and chairs",
    trust3: "We work in your home — no furniture haul-away",
    formTitle: "Home upholstery quote",
    formSubtitle: "Tell us what to clean. We reply with a price and slot — this is home upholstery, not car detailing.",
    messagePlaceholder: "e.g. corner sofa, living-room rug, mattress, wine stains…",
    itemLabel: "What should we clean",
    items: ["Sofa", "Carpet / floor", "Mattress", "Armchairs", "Several items / mix"],
    submit: "Send home upholstery request",
  },
  handoverTitle: "We return furniture looking new, not just clean",
  handoverCta: "I want the same result at home",
  reviewsTitle: "Happy Crystal Detailing customers",
  reviewsSubtitle: "The same team, now also for home upholstery — sofas, carpets and mattresses at your place.",
  servicesTitle: "Home upholstery packages",
  servicesSubtitle: "Pick a scope. The exact price depends on size, fabric and soiling.",
  additionalTitle: "Home add-ons",
  additionalSubtitle: "Stains, disinfection and extra rooms alongside furniture cleaning.",
  additionalNote: "Add-ons are confirmed with your quote.",
  mediaTitle: "Results in the details",
  mediaSubtitle: "The same precision, now for home textiles.",
  howItWorksTitle: "How home upholstery cleaning works",
  howItWorksSubtitle: "We bring the machines to your home. You just clear space around the furniture.",
  step1Title: "1. Send a request",
  step1Description: "Tell us the item, size and location. We come back with a price and a time slot.",
  step2Title: "2. We come to your home",
  step2Description: "Extraction cleaning on site. Furniture stays where it is.",
  step3Title: "3. Enjoy a fresher home",
  step3Description: "Clean, fresh textiles. We tell you when you can sit or walk on them again.",
  bookCta: "I want home upholstery cleaning",
  whyTitle: "Why clean home upholstery with us",
  whyItems: [
    {
      title: "We come to you — furniture stays put",
      description: "No haulage, no dry-cleaner queue. Sofa and carpet cleaning happens in your home.",
    },
    {
      title: "Deep extraction, not a surface wipe",
      description: "We pull dirt, allergens and odours from the fibres. Ideal with kids, pets or after parties.",
    },
    {
      title: "The same Crystal Detailing team",
      description: "The care you know from mobile car detailing, now for your home.",
    },
  ],
  faqTitle: "Frequently asked questions",
  faqSubtitle: "Home upholstery cleaning — sofas, carpets and mattresses at your place",
  faqItems: [
    {
      question: "What do you clean at home?",
      answer: "Sofas, armchairs, carpets, textile floors and mattresses. Include type and size in your request.",
    },
    {
      question: "Do I need to take furniture away?",
      answer: "No. We work on site. Just make space around the pieces we will clean.",
    },
    {
      question: "How long does it take?",
      answer: "Usually a few hours depending on scope. Drying time depends on fabric and weather.",
    },
    {
      question: "How is the price calculated?",
      answer: "By item, size, fabric and soiling. Send a request or a photo and we will quote you.",
    },
  ],
  bookingTitle: "Ready for home upholstery cleaning?",
  bookingDescription:
    "Tell us what to clean. The enquiry is tagged as home upholstery — not as mobile car detailing.",
  contactTitle: "Home upholstery request",
  contactSubtitle: "This message is filed as home upholstery cleaning, separate from car detailing.",
  contactPlaceholder: "Sofa / carpet / mattress, size, location, stains…",
  packages: [
    {
      title: "Armchairs",
      subtitle: "Smaller pieces and single chairs",
      features: ["1–2 armchairs", "Deep fabric extraction", "Everyday stain treatment", "Fresh smell after drying"],
    },
    {
      title: "Sofa",
      subtitle: "The most common living-room job",
      mostPopular: true,
      features: ["2-seater to corner sofa", "Seat and back extraction", "Cushions as needed", "Odour removal from fabric"],
    },
    {
      title: "Carpet",
      subtitle: "Rugs and textile flooring",
      features: ["Area rug or fitted carpet", "Deep fibre extraction", "Stain and watermark treatment", "Faster drying with ventilation"],
    },
    {
      title: "Whole home",
      subtitle: "Several items in one visit",
      features: ["Sofa plus carpets or mattresses", "One visit, more textiles", "Consistent process", "Price by scope — on request"],
    },
  ],
  addons: [
    { title: "Mattress", description: "Deep mattress extraction, odour and mite reduction." },
    { title: "Stubborn stains", description: "Targeted treatment for wine, coffee, grease or pet marks." },
    { title: "Textile disinfection", description: "Extra disinfection after cleaning — useful with kids or allergies." },
    { title: "Curtains", description: "Curtains and decorative fabrics where the material allows." },
    { title: "Extra room", description: "Another carpet or room in the same appointment." },
    { title: "Pet hair", description: "More thorough vacuuming and extraction when hair is in the fabric." },
  ],
}

const de: HomeUpholsteryCopy = {
  pageBadge: "Polsterreinigung Zuhause",
  priceOnRequest: "Preis auf Anfrage",
  selectPackage: "Anfrage senden",
  hero: {
    badge: "Neu · Polsterreinigung Zuhause 7 Tage die Woche",
    title: "Polsterreinigung Zuhause direkt bei Ihnen in Bratislava.",
    subtitle:
      "Wir kommen zu Ihnen. Sofas, Teppiche, Matratzen und Sessel — Tiefenreinigung ohne Abtransport der Möbel.",
    trust1: "Einsatz in Bratislava und Umgebung",
    trust2: "Sofas, Teppiche, Matratzen und Sessel",
    trust3: "Arbeit bei Ihnen — ohne Möbelabholung",
    formTitle: "Anfrage Polsterreinigung Zuhause",
    formSubtitle:
      "Schreiben Sie, was gereinigt werden soll. Sie erhalten Preis und Termin — das ist Haus-Polsterreinigung, kein Auto-Detailing.",
    messagePlaceholder: "z. B. Ecksofa, Teppich im Wohnzimmer, Matratze, Weinflecken…",
    itemLabel: "Was sollen wir reinigen",
    items: ["Sofa", "Teppich / Boden", "Matratze", "Sessel", "Mehrere Stücke / Mix"],
    submit: "Anfrage für Polsterreinigung Zuhause senden",
  },
  handoverTitle: "Möbel übergeben wir nicht nur sauber, sondern wie neu",
  handoverCta: "Ich will dasselbe Ergebnis Zuhause",
  reviewsTitle: "Zufriedene Crystal-Detailing-Kunden",
  reviewsSubtitle: "Dasselbe Team, jetzt auch für Polsterreinigung Zuhause.",
  servicesTitle: "Pakete Polsterreinigung Zuhause",
  servicesSubtitle: "Wählen Sie den Umfang. Der Preis hängt von Größe, Material und Verschmutzung ab.",
  additionalTitle: "Zusatzleistungen für Zuhause",
  additionalSubtitle: "Flecken, Desinfektion und weitere Räume zur Polsterreinigung.",
  additionalNote: "Extras bestätigen wir mit Ihrem Angebot.",
  mediaTitle: "Ergebnisse im Detail",
  mediaSubtitle: "Dieselbe Präzision, jetzt für Heimtextilien.",
  howItWorksTitle: "So funktioniert die Polsterreinigung Zuhause",
  howItWorksSubtitle: "Wir bringen die Technik zu Ihnen. Sie schaffen Platz um die Möbel.",
  step1Title: "1. Anfrage senden",
  step1Description: "Stück, Größe und Ort angeben. Wir melden uns mit Preis und Termin.",
  step2Title: "2. Wir kommen zu Ihnen",
  step2Description: "Extraktionsreinigung vor Ort. Die Möbel bleiben stehen.",
  step3Title: "3. Frischeres Zuhause genießen",
  step3Description: "Saubere, frische Textilien. Wir sagen, wann Sie sie wieder nutzen können.",
  bookCta: "Ich will Polsterreinigung Zuhause",
  whyTitle: "Warum Polsterreinigung Zuhause bei uns",
  whyItems: [
    {
      title: "Wir kommen zu Ihnen — Möbel bleiben",
      description: "Kein Transport, keine Reinigungsschlange. Sofa und Teppich werden bei Ihnen gereinigt.",
    },
    {
      title: "Tiefenreinigung, kein Oberflächenwischen",
      description: "Schmutz, Allergene und Gerüche kommen aus der Faser. Ideal bei Kindern, Tieren oder nach Feiern.",
    },
    {
      title: "Dasselbe Crystal-Detailing-Team",
      description: "Die Sorgfalt vom mobilen Autodetailing, jetzt für Ihr Zuhause.",
    },
  ],
  faqTitle: "Häufige Fragen",
  faqSubtitle: "Polsterreinigung Zuhause — Sofas, Teppiche und Matratzen",
  faqItems: [
    {
      question: "Was reinigen Sie Zuhause?",
      answer: "Sofas, Sessel, Teppiche, Textilböden und Matratzen. Typ und Größe in der Anfrage angeben.",
    },
    {
      question: "Muss ich Möbel wegbringen?",
      answer: "Nein. Wir arbeiten vor Ort. Bitte Platz um die Stücke schaffen.",
    },
    {
      question: "Wie lange dauert es?",
      answer: "Meist einige Stunden. Die Trocknung hängt von Material und Wetter ab.",
    },
    {
      question: "Wie wird der Preis berechnet?",
      answer: "Nach Stück, Größe, Material und Verschmutzung. Anfrage oder Foto genügt für ein Angebot.",
    },
  ],
  bookingTitle: "Bereit für Polsterreinigung Zuhause?",
  bookingDescription:
    "Schreiben Sie, was gereinigt werden soll. Die Anfrage wird als Polsterreinigung Zuhause gekennzeichnet — nicht als Auto-Detailing.",
  contactTitle: "Anfrage Polsterreinigung Zuhause",
  contactSubtitle: "Diese Nachricht landet im System getrennt vom Auto-Detailing.",
  contactPlaceholder: "Sofa / Teppich / Matratze, Größe, Ort, Flecken…",
  packages: [
    {
      title: "Sessel",
      subtitle: "Kleinere Stücke und einzelne Sessel",
      features: ["1–2 Sessel", "Tiefenreinigung des Stoffes", "Alltägliche Flecken", "Frischer Duft nach dem Trocknen"],
    },
    {
      title: "Sofa",
      subtitle: "Die häufigste Wahl fürs Wohnzimmer",
      mostPopular: true,
      features: ["Zweisitzer bis Ecksofa", "Extraktion Sitz und Rücken", "Kissen nach Bedarf", "Geruchsentfernung"],
    },
    {
      title: "Teppich",
      subtitle: "Teppiche und Textilboden",
      features: ["Brücke oder Auslegeware", "Tiefenreinigung der Faser", "Flecken und Ränder", "Schnelleres Trocknen"],
    },
    {
      title: "Komplett Zuhause",
      subtitle: "Mehrere Stücke in einem Termin",
      features: ["Sofa plus Teppiche oder Matratzen", "Eine Anfahrt", "Einheitliches Verfahren", "Preis nach Umfang"],
    },
  ],
  addons: [
    { title: "Matratze", description: "Tiefenreinigung der Matratze, Geruch und Milbenreduktion." },
    { title: "Hartnäckige Flecken", description: "Gezielte Behandlung von Wein, Kaffee, Fett oder Tierflecken." },
    { title: "Textildesinfektion", description: "Zusätzliche Desinfektion nach der Reinigung." },
    { title: "Vorhänge", description: "Vorhänge und Dekostoffe je nach Material." },
    { title: "Extra Raum", description: "Weiterer Teppich oder Raum im selben Termin." },
    { title: "Tierhaare", description: "Gründlicheres Saugen und Extrahieren bei Haaren im Stoff." },
  ],
}

const COPY: Record<"sk" | "en" | "de", HomeUpholsteryCopy> = { sk, en, de }

export function getHomeUpholsteryCopy(lang: Language | "sk" | "en" | "de"): HomeUpholsteryCopy {
  if (lang === "en" || lang === "de") return COPY[lang]
  return COPY.sk
}
