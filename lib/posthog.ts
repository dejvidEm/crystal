import posthog from "posthog-js"

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
    session_recording: {
      maskAllInputs: true,
    },
    loaded: (client) => {
      syncSessionRecording(window.location.pathname)
      client.onFeatureFlags(() => {
        syncSessionRecording(window.location.pathname)
      })
    },
  })
}

export function syncSessionRecording(pathname?: string | null) {
  if (typeof window === "undefined") return

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
