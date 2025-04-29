import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image optimization utilities
export function getImageSrc(src: string): string {
  // If it's already an absolute URL or data URL, return as is
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src
  }

  // If it's a local path, ensure it has a leading slash
  if (!src.startsWith("/")) {
    return `/${src}`
  }

  return src
}

// Generate a placeholder image URL with dimensions
export function getPlaceholderImage(width: number, height: number, text?: string): string {
  const encodedText = text ? encodeURIComponent(text) : "Loading..."
  return `/placeholder.svg?width=${width}&height=${height}&text=${encodedText}`
}

// Convert file size to human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
