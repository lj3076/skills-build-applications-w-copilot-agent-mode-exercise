import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Overview() {
  return (
    <main className="container py-5">
      <div className="mb-5">
        <p className="small fw-semibold text-success text-uppercase mb-2">OctoFit Tracker</p>
        <h1 className="h2 mb-0">대시보드</h1>
      </div>
      <section aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="h5 mb-3">오늘의 활동</h2>
        <p className="text-secondary">아직 기록된 활동이 없습니다.</p>
      </section>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2">페이지를 찾을 수 없습니다.</h1>
      <Link to="/">대시보드로 이동</Link>
    </main>
  )
}

export default function OctoFitApp() {
  return (
    <BrowserRouter>
      <header className="navbar bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">OctoFit Tracker</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}