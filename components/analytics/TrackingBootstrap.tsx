"use client"

import { useEffect } from "react"
import { saveTrackingData } from "@/lib/tracking"

export default function TrackingBootstrap() {
  useEffect(() => {
    saveTrackingData()
  }, [])

  return null
}