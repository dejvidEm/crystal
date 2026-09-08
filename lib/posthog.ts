import posthog from "posthog-js"

const CONSENT_KEY = "cookieConsent"

export function hasPostHogConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted"
  } catch {
    return false
  }
}

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key || typeof window === "undefined") return
  if (posthog.__loaded) return

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com"
  const isEu = host.includes(".eu.") || host.includes("eu.")

  posthog.init(key, {
    api_host: host,
    ui_host: isEu ? "https://eu.posthog.com" : "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    opt_out_capturing_by_default: true,
    session_recording: {
      maskAllInputs: true,
    },
    loaded: () => {
      applyPostHogConsent(hasPostHogConsent(), window.location.pathname)
    },
  })
}

export function applyPostHogConsent(accepted: boolean, pathname?: string | null) {
  if (typeof window === "undefined") return

  if (!accepted) {
    posthog.opt_out_capturing()
    return
  }

  posthog.opt_in_capturing()
  if (pathname?.startsWith("/admin")) {
    posthog.stopSessionRecording()
    return
  }
  posthog.startSessionRecording()
}

export function capturePostHogEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return
  posthog.capture(eventName, properties)
}
