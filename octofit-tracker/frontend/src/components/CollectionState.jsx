export default function CollectionState({ loading, error, items, emptyMessage, children }) {
  if (loading) {
    return <p aria-live="polite" className="text-secondary">불러오는 중...</p>
  }

  if (error) {
    return <p className="alert alert-danger" role="alert">{error}</p>
  }

  if (items.length === 0) {
    return <p className="text-secondary">{emptyMessage}</p>
  }

  return children
}
