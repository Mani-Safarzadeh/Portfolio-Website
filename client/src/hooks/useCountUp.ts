import { useEffect, useState } from 'react'

/**
 * Counts from 0 up to `target` once `active` turns true (ease-out, about `duration` ms).
 * People who turned animations off get the final number straight away.
 */
export function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

/** A number in Persian digits. */
export const faNumber = (value: number) => value.toLocaleString('fa-IR')
