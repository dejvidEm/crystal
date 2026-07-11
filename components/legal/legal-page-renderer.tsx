"use client"

import Link from "next/link"
import { LegalPage } from "@/components/legal-page"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale, type ContentLocale } from "@/lib/i18n/locale"
import type { LegalPageCopy } from "@/lib/legal-pages-data"
import {
  COMPANY_LEGAL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site-config"

type LegalPageRendererProps = {
  copies: Record<ContentLocale, LegalPageCopy>
  showPrivacyLink?: boolean
}

export default function LegalPageRenderer({ copies, showPrivacyLink = false }: LegalPageRendererProps) {
  const { language, t } = useLanguage()
  const copy = copies[toContentLocale(language)]
  const privacyLinkLabel = t.footer.privacyPolicy

  return (
    <LegalPage title={copy.title} lastUpdated={copy.lastUpdated} lastUpdatedLabel={t.legal.lastUpdated}>
      <p>{interpolate(copy.intro)}</p>
      {copy.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <LegalParagraph
              key={paragraph}
              text={paragraph}
              showPrivacyLink={showPrivacyLink}
              privacyLinkLabel={privacyLinkLabel}
            />
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul>
              {section.bullets.map((item) => (
                <li key={item}>{item.includes("dataprotection.gov.sk") ? <DpaBullet text={item} /> : item}</li>
              ))}
            </ul>
          )}
          {section.closingParagraphs?.map((paragraph) => (
            <LegalParagraph
              key={paragraph}
              text={paragraph}
              showPrivacyLink={showPrivacyLink}
              privacyLinkLabel={privacyLinkLabel}
            />
          ))}
        </section>
      ))}
    </LegalPage>
  )
}

function LegalParagraph({
  text,
  showPrivacyLink,
  privacyLinkLabel,
}: {
  text: string
  showPrivacyLink: boolean
  privacyLinkLabel: string
}) {
  const content = interpolate(text)

  if (showPrivacyLink && content.includes("{{privacyLink}}")) {
    const [before, after] = content.split("{{privacyLink}}")
    return (
      <p>
        {before}
        <Link href="/ochrana-osobnych-udajov">{privacyLinkLabel}</Link>
        {after}
      </p>
    )
  }

  const lines = content.split("\n")
  return (
    <>
      {lines.map((line) => (
        <p key={line}>
          <LineWithLinks line={line} />
        </p>
      ))}
    </>
  )
}

function LineWithLinks({ line }: { line: string }) {
  if (line.includes(CONTACT_EMAIL)) {
    const parts = line.split(CONTACT_EMAIL)
    return (
      <>
        {parts[0]}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        {parts[1]}
      </>
    )
  }
  if (line.includes(CONTACT_PHONE_DISPLAY)) {
    const parts = line.split(CONTACT_PHONE_DISPLAY)
    return (
      <>
        {parts[0]}
        <a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE_DISPLAY}</a>
        {parts[1]}
      </>
    )
  }
  return <>{line}</>
}

function DpaBullet({ text }: { text: string }) {
  const marker = "dataprotection.gov.sk"
  const idx = text.indexOf(marker)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">
        {marker}
      </a>
      {text.slice(idx + marker.length)}
    </>
  )
}

function interpolate(text: string): string {
  return text
    .replace(/\{\{companyName\}\}/g, COMPANY_LEGAL.name)
    .replace(/\{\{ico\}\}/g, COMPANY_LEGAL.ico)
    .replace(/\{\{dic\}\}/g, COMPANY_LEGAL.dic)
    .replace(/\{\{email\}\}/g, CONTACT_EMAIL)
    .replace(/\{\{phone\}\}/g, CONTACT_PHONE_DISPLAY)
}
