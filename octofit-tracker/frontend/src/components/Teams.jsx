import useApiCollection from '../hooks/useApiCollection.js'
import CollectionState from './CollectionState.jsx'

export default function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">팀</h1>
      <CollectionState emptyMessage="아직 생성된 팀이 없습니다." error={error} items={items} loading={loading}>
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-md-6 col-lg-4" key={team._id ?? team.id}>
              <article className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{team.name}</h2>
                  <p className="card-text text-secondary">{team.description || '팀 설명이 없습니다.'}</p>
                  <p className="mb-0">멤버 {team.members?.length ?? 0}명</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </CollectionState>
    </main>
  )
}
