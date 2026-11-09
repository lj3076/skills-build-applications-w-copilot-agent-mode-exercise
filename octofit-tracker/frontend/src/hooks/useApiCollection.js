import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadItems() {
      setLoading(true)
      setError('')
      try {
        const collection = await fetchCollection(endpoint, controller.signal)
        if (active) {
          setItems(collection)
        }
      } catch (requestError) {
        if (active && !controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : '데이터를 불러오지 못했습니다.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadItems()
    return () => {
      active = false
      controller.abort()
    }
  }, [endpoint])

  return { items, loading, error }
}
