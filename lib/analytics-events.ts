import { trackGoogleAdsEvent } from "@/lib/google-ads"

export type AnalyticsEventName =
  | "click_whatsapp"
  | "click_phone"
  | "click_bookio"
  | "start_calculator"
  | "submit_contact_form"

export type AnalyticsLocation =
  | "hero"
  | "floating_button"
  | "pricing"
  | "footer"
  | "contact"
  | "navbar"
  | "calc"
  | "booking"
  | "service_page"
  | "district_page"
  | "other"

type AnalyticsEventParams = {
  location: AnalyticsLocation
  [key: string]: string | number | boolean | undefined
}

/** Bezpečne odošle udalosť do gtag, ak je analytika dostupná. */
export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams,
): void {
  trackGoogleAdsEvent(eventName, params)
}
