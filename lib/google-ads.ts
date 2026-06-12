export const GOOGLE_ADS_ID = "AW-18026990459"

/** Google Ads conversion action „Nákup“. */
export const GOOGLE_ADS_PURCHASE_CONVERSION = `${GOOGLE_ADS_ID}/ceI5CNP7zLEcEPuW-JND`

function gtagReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function"
}

export function trackGoogleAdsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (!gtagReady()) return
  window.gtag!("event", eventName, params)
}

export function trackGoogleAdsPurchaseConversion(transactionId?: string) {
  if (!gtagReady()) return
  window.gtag!("event", "conversion", {
    send_to: GOOGLE_ADS_PURCHASE_CONVERSION,
    transaction_id: transactionId ?? "",
  })
}

export function createConversionTransactionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `cd-${Date.now()}`
}
