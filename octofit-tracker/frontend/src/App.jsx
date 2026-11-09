import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'

const pages = [
  { path: '/activities', label: '활동', Component: Activities },
  { path: '/leaderboard', label: '리더보드', Component: Leaderboard },
  { path: '/teams', label: '팀', Component: Teams },
  { path: '/users', label: '사용자', Component: Users },
  { path: '/workouts', label: '운동', Component: Workouts },
]

function Dashboard() {
  return (
    <main className="container py-5">
      <p className="small fw-semibold text-success text-uppercase mb-2">OctoFit Tracker</p>
      <h1 className="mb-3">운동 목표를 함께 달성하세요</h1>
      <p className="text-secondary mb-4">활동을 기록하고, 팀과 함께 진행 상황을 확인하세요.</p>
      <div className="row g-3">
        {pages.map(({ path, label }) => (
          <div className="col-sm-6 col-lg-4" key={path}>
            <Link className="card card-body h-100 text-decoration-none" to={path}>
              <span className="h5 mb-0">{label} 보기</span>
            </Link>
          </div>
        ))}
      </div>
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

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={logo} width="40" height="40" alt="" />
            OctoFit Tracker
          </Link>
          <nav className="nav flex-wrap" aria-label="주요 탐색">
            {pages.map(({ path, label }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {pages.map(({ path, Component }) => (
          <Route element={<Component />} key={path} path={path} />
        ))}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
