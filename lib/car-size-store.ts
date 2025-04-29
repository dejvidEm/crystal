"use client"

import { create } from "zustand"
import type { CarSize } from "./pricing-data"

interface CarSizeState {
  carSize: CarSize
  setCarSize: (size: CarSize) => void
}

export const useCarSizeStore = create<CarSizeState>((set) => ({
  carSize: "small",
  setCarSize: (size) => set({ carSize: size }),
}))
