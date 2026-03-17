declare global {
  interface Window {
    ym?: (...args: any[]) => void
  }
}

const COUNTER_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)

export function hasMetrika(): boolean {
  return typeof window !== "undefined" && typeof window.ym === "function" && !!COUNTER_ID
}

export function reachGoal(goalName: string, params: Record<string, any> = {}) {
  if (!hasMetrika()) return

  window.ym!(COUNTER_ID, "reachGoal", goalName, params)
}

export function getMetrikaClientId(): Promise<string> {
  return new Promise((resolve) => {
    if (!hasMetrika()) {
      resolve("")
      return
    }

    try {
      window.ym!(COUNTER_ID, "getClientID", (clientID: string) => {
        resolve(clientID || "")
      })
    } catch {
      resolve("")
    }
  })
}