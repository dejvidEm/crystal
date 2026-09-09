let initScheduled = false
let posthogClient: typeof import("posthog-js").default | null = null

function applyRecording(
  client: typeof import("posthog-js").default,
  pathname?: string | null,
) {
  if (pathname?.startsWith("/admin")) {
    client.stopSessionRecording()
    return
  }
  client.startSessionRecording()
}

function startClient(client: typeof import("posthog-js").default) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key || client.__loaded) {
    posthogClient = client
    return
  }

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
  const isEu = host.includes(".eu.") || host.includes("eu.")

  client.init(key, {
    api_host: host,
    ui_host: isEu ? "https://eu.posthog.com" : "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
    },
    loaded: (readyClient) => {
      applyRecording(readyClient as typeof client, window.location.pathname)
      readyClient.onFeatureFlags(() => {
        applyRecording(readyClient as typeof client, window.location.pathname)
      })
    },
  })

  posthogClient = client
}

export function initPostHog() {
  if (typeof window === "undefined" || initScheduled) return
  initScheduled = true

  const run = () => {
    void import("posthog-js").then(({ default: posthog }) => {
      startClient(posthog)
    })
  }

  const requestIdle = window.requestIdleCallback
  if (typeof requestIdle === "function") {
    requestIdle(run, { timeout: 4000 })
    return
  }

  window.setTimeout(run, 2000)
}

export function syncSessionRecording(pathname?: string | null) {
  if (typeof window === "undefined") return
  if (!posthogClient) return
  applyRecording(posthogClient, pathname)
}

export function capturePostHogEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return
  if (posthogClient) {
    posthogClient.capture(eventName, properties)
    return
  }
  void import("posthog-js").then(({ default: posthog }) => {
    posthog.capture(eventName, properties)
  })
}
