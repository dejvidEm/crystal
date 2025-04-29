/**
 * Helper functions for image optimization
 */

// Calculate the optimal image dimensions based on the container size
export function getOptimalImageDimensions(
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number = 16 / 9,
): { width: number; height: number } {
  // If container dimensions are provided, use them
  if (containerWidth && containerHeight) {
    return {
      width: containerWidth,
      height: containerHeight,
    }
  }

  // If only width is provided, calculate height based on aspect ratio
  if (containerWidth) {
    return {
      width: containerWidth,
      height: Math.round(containerWidth / aspectRatio),
    }
  }

  // If only height is provided, calculate width based on aspect ratio
  if (containerHeight) {
    return {
      width: Math.round(containerHeight * aspectRatio),
      height: containerHeight,
    }
  }

  // Default dimensions if nothing is provided
  return {
    width: 800,
    height: 450,
  }
}

// Get appropriate sizes attribute based on layout
export function getSizes(layout: "fill" | "responsive" | "fixed" | "intrinsic" | string): string {
  switch (layout) {
    case "fill":
      return "100vw"
    case "responsive":
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    case "hero":
      return "100vw"
    case "thumbnail":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 400px, 300px"
    default:
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }
}

// Determine if an image should use priority loading
export function shouldPrioritize(position: "hero" | "above-fold" | "below-fold"): boolean {
  return position === "hero" || position === "above-fold"
}
