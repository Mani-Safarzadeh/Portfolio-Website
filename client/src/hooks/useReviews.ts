import { useCallback, useState } from 'react'
import { INITIAL_REVIEWS, type NewReview, type Review } from '@/data/reviewsData'

function newId() {
  return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `r-${Date.now()}-${Math.random()}`
}

/**
 * The list of reviews, newest first.
 * For now they live in memory only (a refresh brings back the examples).
 * When the API is ready, only this hook needs to change: load with fetch, and send in `addReview`.
 */
export function useReviews() {
  const [reviews, setReviews] = useState<readonly Review[]>(INITIAL_REVIEWS)

  const addReview = useCallback((input: NewReview) => {
    const review: Review = { ...input, id: newId(), createdAt: new Date().toISOString() }
    setReviews((current) => [review, ...current])
  }, [])

  return { reviews, addReview }
}
