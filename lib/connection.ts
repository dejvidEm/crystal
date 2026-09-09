type NetworkInformationLike = {
  saveData?: boolean
  effectiveType?: string
}

function getConnection(): NetworkInformationLike | undefined {
  if (typeof navigator === "undefined") return undefined
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection
}

/** Skip large media on save-data, 2G/3G, or typical mobile viewports. */
export function shouldLoadHeavyMedia(): boolean {
  if (typeof window === "undefined") return false

  const connection = getConnection()
  if (connection?.saveData) return false

  const type = connection?.effectiveType
  if (type === "slow-2g" || type === "2g" || type === "3g") return false

  return !window.matchMedia("(max-width: 767px)").matches
}
