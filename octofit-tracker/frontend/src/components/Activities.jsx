import { formatDate } from '../api.js'
import useApiCollection from '../hooks/useApiCollection.js'
import CollectionState from './CollectionState.jsx'

export default function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">활동</h1>
      <CollectionState emptyMessage="아직 기록된 활동이 없습니다." error={error} items={items} loading={loading}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>사용자</th><th>종류</th><th>시간(분)</th><th>거리(km)</th><th>날짜</th></tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? activity.id}>
                  <td>{activity.user?.name ?? '알 수 없는 사용자'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm ?? 0}</td>
                  <td>{formatDate(activity.recordedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollectionState>
    </main>
  )
}
