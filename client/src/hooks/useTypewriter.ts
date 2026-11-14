import { useEffect, useState } from 'react'

const TYPE_MS = 90
const DELETE_MS = 45
const HOLD_MS = 1600 // how long a finished word stays on screen
const GAP_MS = 350 // pause between deleting one word and typing the next
const REDUCED_MOTION_CYCLE_MS = 2800

/**
 * Types each word letter by letter, deletes it, then moves to the next word,
 * forever. Returns the text to show right now.
 * Pass a stable array (for example a module constant).
 * With "reduce motion" on, it skips the typing and just swaps whole words.
 */
export function useTypewriter(words: readonly string[]): string {
  const [reduceMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0) // letters of the current word shown
  const [deleting, setDeleting] = useState(false)

  const word = words[index] ?? ''
  const wordCount = words.length

  useEffect(() => {
    if (reduceMotion) {
      const id = setInterval(() => setIndex((i) => (i + 1) % wordCount), REDUCED_MOTION_CYCLE_MS)
      return () => clearInterval(id)
    }

    let delay: number
    let next: () => void
    if (!deleting && count < word.length) {
      delay = TYPE_MS
      next = () => setCount(count + 1)
    } else if (!deleting) {
      delay = HOLD_MS
      next = () => setDeleting(true)
    } else if (count > 0) {
      delay = DELETE_MS
      next = () => setCount(count - 1)
    } else {
      delay = GAP_MS
      next = () => {
        setDeleting(false)
        setIndex((index + 1) % wordCount)
      }
    }

    const id = setTimeout(next, delay)
    return () => clearTimeout(id)
  }, [reduceMotion, deleting, count, index, word.length, wordCount])

  return reduceMotion ? word : word.slice(0, count)
}
