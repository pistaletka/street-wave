"use client";

import { useEffect } from "react";
import { reachGoal } from "@/lib/analytics";
import type { GoalName } from "@/lib/goals";

export default function PageGoal({ goal }: { goal: GoalName }) {
  useEffect(() => {
    reachGoal(goal);
  }, [goal]);

  return null;
}
