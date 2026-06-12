declare module "*.mp4" {
  const content: string;
  export default content;
}

type GtagCommand = "config" | "event" | "js" | "set"

interface Window {
  dataLayer?: unknown[]
  gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void
} 