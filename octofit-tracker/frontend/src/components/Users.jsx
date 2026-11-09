import useApiCollection from '../hooks/useApiCollection.js'
import CollectionState from './CollectionState.jsx'

export default function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">사용자</h1>
      <CollectionState emptyMessage="등록된 사용자가 없습니다." error={error} items={items} loading={loading}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>이름</th><th>이메일</th><th>운동 수준</th><th>목표</th></tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.fitnessLevel}</td>
                  <td>{Array.isArray(user.goals) ? user.goals.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollectionState>
    </main>
  )
}
