import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FAQPageStructuredData } from '@/components/structured-data'

export const metadata: Metadata = {
  title: 'Mobilný detailing Senec - Crystal Detailing',
  description:
    'Prémiový mobilný detailing v Sencu a okolí. Ideálne pre zákazníkov z letiska a okolitých obcí. Prídeme k vám domov alebo do firmy.',
  alternates: {
    canonical: 'https://crystaldetailing.sk/senec',
  },
  openGraph: {
    title: 'Mobilný detailing Senec - Prémiové služby | Crystal Detailing',
    description:
      'Prémiový mobilný detailing v Sencu a okolí. Ideálne pre zákazníkov z letiska a okolitých obcí.',
    url: 'https://crystaldetailing.sk/senec',
  },
}

const faqs = [
  {
    question: 'Poskytujete služby v Sencu?',
    answer:
      'Áno, poskytujeme prémiové mobilné detailingové služby v Sencu a okolitých obciach vrátane Ivanky pri Dunaji a Bernolákova.',
  },
  {
    question: 'Ako dlho trvá cesta z Bratislavy do Senca?',
    answer:
      'Cesta z Bratislavy do Senca trvá približne 15-25 minút. Naša mobilná služba prináša všetko potrebné vybavenie priamo k vám.',
  },
  {
    question: 'Poskytujete služby pre firmy v Sencu?',
    answer:
      'Áno, poskytujeme služby pre súkromných zákazníkov aj firmy. Ideálne pre firemné vozidlá a flotily v oblasti letiska.',
  },
  {
    question: 'Aké sú vaše otváracie hodiny?',
    answer:
      'Poskytujeme služby 7 dní v týždni od 8:00 do 20:00. Kontaktujte nás pre dostupné termíny.',
  },
]

export default function SenecPage() {
  return (
    <>
      <FAQPageStructuredData faqs={faqs} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />

        <main className="pt-24 pb-16">
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/lokality" className="text-primary hover:underline text-sm mb-4 inline-block">
                  ← Späť na lokality
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Mobilný detailing v Sencu
              </h1>
              <p className="text-xl text-zinc-300 mb-6">
                Prémiové mobilné detailingové služby v Sencu a okolí. Ideálne pre zákazníkov z letiska a okolitých
                obcí. Prídeme k vám domov alebo do kancelárie.
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

          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Oblasti pokrytia</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {['Senec', 'Ivanka pri Dunaji', 'Bernolákovo'].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Prečo si vybrať nás v Sencu</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      'Mobilná služba – prídeme k vám',
                      'Ideálne pre zákazníkov z letiska',
                      'Prémiové produkty najvyššej kvality',
                      'Skúsení a certifikovaní detaileri',
                      'Flexibilné časové možnosti',
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

          <section className="container mx-auto px-4 py-12">
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Rezervujte si termín v Sencu
                </h2>
                <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                  Kontaktujte nás ešte dnes a dohodneme sa na termíne pre prémiový mobilný detailing v Sencu.
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
                <Link href="/bratislava" className="text-primary hover:underline">
                  Detailing v Bratislave
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


