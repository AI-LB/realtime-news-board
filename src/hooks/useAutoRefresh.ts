import { useEffect, useRef, useState } from 'react'

export function useAutoRefresh(callback: () => void, intervalMs = 30_000) {
  const savedCallback = useRef(callback)
  const totalSeconds = intervalMs / 1000
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date())
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(totalSeconds)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Precise 30s refresh trigger
  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current()
      setLastRefreshed(new Date())
      setSecondsUntilRefresh(totalSeconds)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, totalSeconds])

  // 1s countdown tick for progress bar
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsUntilRefresh((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return { lastRefreshed, secondsUntilRefresh, totalSeconds }
}
