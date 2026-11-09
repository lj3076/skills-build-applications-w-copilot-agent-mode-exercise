import useApiCollection from '../hooks/useApiCollection.js'
import CollectionState from './CollectionState.jsx'

export default function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <main className="container py-5">
      <h1 className="h2 mb-4">운동 추천</h1>
      <CollectionState emptyMessage="등록된 운동이 없습니다." error={error} items={items} loading={loading}>
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-md-6 col-lg-4" key={workout._id ?? workout.id}>
              <article className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{workout.title}</h2>
                  <p className="card-text">{workout.description}</p>
                  <p className="text-secondary mb-2">
                    {workout.activityType} · {workout.fitnessLevel} · {workout.durationMinutes}분
                  </p>
                  {Array.isArray(workout.instructions) && workout.instructions.length > 0 && (
                    <ol className="mb-0">
                      {workout.instructions.map((instruction, index) => (
                        <li key={`${workout._id ?? workout.id}-instruction-${index}`}>{instruction}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </CollectionState>
    </main>
  )
}
