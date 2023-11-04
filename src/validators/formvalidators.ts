"use client"

import * as z from "zod"

export const newEventFormSchema = z.object({
  eventName: z.string().min(2).max(50),
  description: z.string().min(0).max(1000),
  startDate: z.date(),
  startTime: z.string(),
  endDate: z.date(),
  endTime: z.string(),
})
