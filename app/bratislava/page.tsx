import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FAQPageStructuredData } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Mobilný detailing Bratislava - Crystal Detailing',
  description:
    'Prémiový mobilný detailing v Bratislave. Poskytujeme služby vo všetkých mestských častiach: Staré Mesto, Ružinov, Petržalka, Dúbravka a ďalšie. Prídeme k vám domov alebo do firmy.',
  alternates: {
    canonical: 'https://crystaldetailing.sk/bratislava',
  },
  openGraph: {
    title: 'Mobilný detailing Bratislava - Prémiové služby | Crystal Detailing',
    description:
      'Prémiový mobilný detailing v Bratislave. Poskytujeme služby vo všetkých mestských častiach. Prídeme k vám domov alebo do firmy.',
    url: 'https://crystaldetailing.sk/bratislava',
  },
}

const faqs = [
  {
    question: 'Ako funguje mobilný detailing v Bratislave?',
    answer:
      'Jednoducho nás kontaktujte a dohodneme sa na termíne. Naša plne vybavená mobilná jednotka príde na vaše miesto v Bratislave – domov, do kancelárie alebo na parkovisko. Prinášame vlastnú vodu, elektrinu a všetky potrebné produkty. Nemusíte nikam jazdiť.',
  },
  {
    question: 'V ktorých častiach Bratislavy poskytujete služby?',
    answer:
      'Poskytujeme služby vo všetkých mestských častiach Bratislavy vrátane Starého Mesta, Ružinova, Petržalky, Dúbravky, Nového Mesta, Karlovej Vsi, Devína, Devínskej Novej Vsi a ďalších lokalít.',
  },
  {
    question: 'Koľko stojí mobilný detailing v Bratislave?',
    answer:
      'Ceny sa líšia podľa typu služby a veľkosti vozidla. Základné balíky začínajú od 69€. Pre presnú cenu použite našu online kalkulačku alebo nás kontaktujte.',
  },
  {
    question: 'Ako dlho trvá detailingové ošetrenie?',
    answer:
      'Čas závisí od vybraného balíka a stavu vozidla. Základné balíky trvajú 2-3 hodiny, kompletný detailing môže trvať 4-6 hodín. Presný čas vám povedieme pri rezervácii.',
  },
  {
    question: 'Potrebujem byť prítomný počas detailingového ošetrenia?',
    answer:
      'Nie je to nutné. Môžete pokračovať vo svojej práci alebo aktivitách. Po dokončení vás informujeme a predáme vozidlo v perfektnom stave.',
  },
  {
    question: 'Aké produkty používate?',
    answer:
      'Používame len prémiové detailingové produkty najvyššej kvality vrátane keramických povlakov, profesionálnych leštičiek a pH vyvážených čistiacich prostriedkov, ktoré sú jemné, ale účinné.',
  },
]

export default function BratislavaPage() {
  return (
    <>
      <FAQPageStructuredData faqs={faqs} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link
                  href="/lokality"
                  className="text-primary hover:underline text-sm mb-4 inline-block"
                >
                  ← Späť na lokality
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Mobilný detailing v Bratislave
              </h1>
              <p className="text-xl text-zinc-300 mb-6">
                Prémiové mobilné detailingové služby pre všetky mestské časti Bratislavy. Prídeme k vám domov, do
                kancelárie alebo na parkovisko.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+421918722720">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="mr-2 h-5 w-5" />
                    Zavolať: +421 918 722 720
                  </Button>
                </a>
                <a href="mailto:crystalbratislava@gmail.com">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Oblasti pokrytia v Bratislave</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Staré Mesto',
                  'Ružinov',
                  'Petržalka',
                  'Dúbravka',
                  'Nové Mesto',
                  'Karlova Ves',
                  'Devín',
                  'Devínska Nová Ves',
                  'Lamač',
                  'Záhorská Bystrica',
                  'Vrakuňa',
                  'Podunajské Biskupice',
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400">
                Poskytujeme služby aj v ďalších lokalitách v rámci Bratislavy. Kontaktujte nás pre viac informácií.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Ako to funguje v Bratislave</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Rezervácia</h3>
                    <p className="text-zinc-400">
                      Kontaktujte nás telefonicky alebo cez online rezervačný systém. Dohodneme sa na termíne a
                      mieste.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Príchod</h3>
                    <p className="text-zinc-400">
                      Naša mobilná jednotka príde na vaše miesto v Bratislave. Prinášame všetko potrebné vybavenie a
                      produkty.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Hotovo</h3>
                    <p className="text-zinc-400">
                      Po dokončení práce vám predáme vozidlo v perfektnom stave. Môžete pokračovať v používaní
                      vozidla.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Čo je zahrnuté</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      'Profesionálne čistenie exteriéru a interiéru',
                      'Použitie prémiových detailingových produktov',
                      'Vlastná voda a elektrina',
                      'Flexibilné časové možnosti',
                      'Poistenie práce',
                      'Záruka na vykonanú prácu',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Často kladené otázky</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                      <p className="text-zinc-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-12">
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Pripravení na prémiový detailing v Bratislave?
                </h2>
                <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                  Rezervujte si termín teraz a zažite prémiový mobilný detailing priamo u vás v Bratislave.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=sk">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Rezervovať termín
                    </Button>
                  </a>
                  <Link href="/calc">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Získať cenovú ponuku
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Internal Links */}
          <section className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-zinc-400 mb-4">Pozrite si tiež:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#services" className="text-primary hover:underline">
                  Naše služby
                </Link>
                <Link href="/lokality" className="text-primary hover:underline">
                  Všetky lokality
                </Link>
                <Link href="/calc" className="text-primary hover:underline">
                  Cenová kalkulačka
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}


