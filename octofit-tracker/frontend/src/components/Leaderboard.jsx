import { formatDate } from '../api.js'
import useApiCollection from '../hooks/useApiCollection.js'
import CollectionState from './CollectionState.jsx'

export default function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">리더보드</h1>
      <CollectionState emptyMessage="아직 리더보드 기록이 없습니다." error={error} items={items} loading={loading}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>순위</th><th>사용자</th><th>팀</th><th>포인트</th><th>기간</th></tr>
            </thead>
            <tbody>
              {items.map((entry, index) => (
                <tr key={entry._id ?? entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.user?.name ?? '알 수 없는 사용자'}</td>
                  <td>{entry.team?.name ?? '개인'}</td>
                  <td>{entry.points ?? 0}</td>
                  <td>{formatDate(entry.periodStart)} - {formatDate(entry.periodEnd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollectionState>
    </main>
  )
}
