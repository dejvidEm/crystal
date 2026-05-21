import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { zahorieATrnavaDistricts } from '@/lib/district-pages-data'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/site-config'

export const metadata: Metadata = {
  title:
    'Lokality | Mobilný detailing Bratislava, okresy Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda',
  description:
    'Crystal Detailing — mobilný detailing v Bratislave, Pezinoku, Senci, Chorvátskom Grobe a na Záhorí (okres Malacky, Senica, Skalica), v Trnavskom kraji (okres Trnava, Galanta, Dunajská Streda). Prídeme k vám.',
  keywords: [
    'mobilný detailing Bratislava',
    'mobilný detailing okres Malacky',
    'mobilný detailing Senica',
    'mobilný detailing Skalica Holíč',
    'mobilný detailing Trnava',
    'mobilný detailing Galanta',
    'mobilný detailing Dunajská Streda',
    'mobilný detailing Záhorie',
    'tepovanie áut Trnava',
    'detailing Západné Slovensko',
  ],
  alternates: {
    canonical: 'https://crystaldetailing.sk/lokality',
  },
  openGraph: {
    title:
      'Lokality | Mobilný detailing Bratislava, Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda | Crystal Detailing',
    description:
      'Mobilný detailing na Záhorí a v Trnavskom kraji — okresy Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda. Bratislava, Pezinok, Senec, Chorvátsky Grob.',
    url: 'https://crystaldetailing.sk/lokality',
  },
}

const coreLocations = [
  {
    name: 'Bratislava',
    slug: '/bratislava',
    description:
      'Mobilný detailing v Bratislave pre všetky mestské časti. Poskytujeme služby v Starom Meste, Ružinove, Petržalke, Dúbravke a ďalších lokalitách.',
    areas: ['Staré Mesto', 'Ružinov', 'Petržalka', 'Dúbravka', 'Nové Mesto', 'Karlova Ves', 'Devín', 'Devínska Nová Ves'],
  },
  {
    name: 'Pezinok',
    slug: '/pezinok',
    description:
      'Profesionálny mobilný detailing v Pezinoku a okolí. Prídeme k vám domov alebo do firmy a poskytneme prémiové čistenie vášho vozidla.',
    areas: ['Pezinok', 'Svätý Jur', 'Modra'],
  },
  {
    name: 'Senec',
    slug: '/senec',
    description:
      'Mobilné detailingové služby v Sencu a blízkom okolí. Ideálne pre zákazníkov z letiska a okolitých obcí.',
    areas: ['Senec', 'Ivanka pri Dunaji', 'Bernolákovo'],
  },
  {
    name: 'Chorvátsky Grob',
    slug: '/chorvatsky-grob',
    description:
      'Prémiový mobilný detailing v Chorvátskom Grobe a okolitých obciach. Poskytujeme služby pre súkromných zákazníkov aj firmy.',
    areas: ['Chorvátsky Grob', 'Veľký Grob', 'Malinovo'],
  },
]

export default function LokalityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Lokality — kde poskytujeme mobilný detailing
            </h1>
            <p className="text-xl text-zinc-300 mb-4">
              Crystal Detailing prináša prémiové mobilné detailingové služby priamo k vám v{' '}
              <strong className="text-foreground">Bratislave, na Záhorí</strong> (okresy Malacky, Senica, Skalica), v{' '}
              <strong className="text-foreground">Trnavskom kraji</strong> (okres Trnava, Galanta, Dunajská Streda) a
              v bezprostrednom okolí Bratislavy — Pezinok, Senec, Chorvátsky Grob.
            </p>
            <p className="text-zinc-400">
              Naša plne vybavená mobilná jednotka príde na vaše miesto — domov, do firmy alebo na parkovisko. Nemusíte
              nikam jazdiť; na Google a v lokálnom vyhľadávaní nás nájdete pod mobilný detailing v konkrétnych okresoch a
              mestách uvedených nižšie.
            </p>
          </div>
        </section>

        {/* Bratislava region core */}
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gradient">
            Bratislava a bezprostredné okolie
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {coreLocations.map((location) => (
              <Card key={location.slug} className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                      <p className="text-zinc-400 mb-4">{location.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Oblasti pokrytia:</p>
                        <div className="flex flex-wrap gap-2">
                          {location.areas.map((area) => (
                            <span
                              key={area}
                              className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link href={location.slug}>
                        <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                          Viac informácií <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* District landing pages — SEO */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gradient">
            Okresy Záhoria a Trnavského kraja
          </h2>
          <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-10">
            Samostatné stránky pre lokálne SEO — mobilný detailing podľa okresu (Malacky, Senica, Skalica, Trnava,
            Galanta, Dunajská Streda). Kliknite pre viac informácií a FAQ.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {zahorieATrnavaDistricts.map((district) => (
              <Card
                key={district.path}
                className="border-border bg-card hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {district.h1.replace(/^Mobilný detailing v okrese /, 'Okres ')}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-4">{district.lead}</p>
                      <Link href={district.path}>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          Viac informácií <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Ste mimo mapovaných lokalít?</h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Kontaktujte nás — dohodneme výjazd aj mimo uvedených okresov podľa možností a vzdialenosti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+421918722720">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Zavolať: +421 918 722 720
                  </Button>
                </a>
                <a href={CONTACT_MAILTO}>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Email: {CONTACT_EMAIL}
                  </Button>
                </a>
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
              <Link href="/#how-it-works" className="text-primary hover:underline">
                Ako to funguje
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
  )
}
