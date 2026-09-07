import { z } from "zod"
import {
  BOOKING_EXTRAS,
  BOOKING_SERVICES,
  BOOKING_STATUSES,
  VEHICLE_SIZES,
} from "@/lib/booking/types"

const timeSchema = z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const createBookingSchema = z.object({
  vehicleSize: z.enum(VEHICLE_SIZES),
  service: z.enum(BOOKING_SERVICES),
  extras: z.array(z.enum(BOOKING_EXTRAS)).max(6).default([]),
  address: z.string().trim().min(8).max(400),
  customerName: z.string().trim().min(2).max(80),
  customerPhone: z
    .string()
    .trim()
    .min(9)
    .max(32)
    .refine((value) => value.replace(/\D/g, "").length >= 9, "invalid_phone"),
  customerEmail: z.string().trim().email().max(160),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  bookingDate: dateSchema,
  bookingTime: timeSchema,
  locale: z.enum(["sk", "en", "de"]).default("sk"),
  website: z.string().max(80).optional(),
})

export const availabilityQuerySchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
})

export const adminAvailabilitySchema = z.object({
  weekday: z.number().int().min(1).max(7),
  enabled: z.boolean(),
  slots: z.array(timeSchema).max(10),
})

export const adminAvailabilityBatchSchema = z.object({
  days: z.array(adminAvailabilitySchema).min(1).max(7),
})

export const adminBookingStatusSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
  adminNote: z.string().trim().max(400).optional(),
})

export const adminClosedDatesSchema = z.object({
  dates: z.array(dateSchema).max(400),
})
