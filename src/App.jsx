import { useState } from 'react'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m7 15 4-5 3 3 5-7" /></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M17 5a3 3 0 0 1 0 6M18 20a6 6 0 0 0-2-4.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    up: <path d="m6 14 6-6 6 6" />,
    down: <path d="m6 10 6 6 6-6" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const menu = [
  { icon: 'grid', label: 'Обзор' },
  { icon: 'chart', label: 'Аналитика', badge: '3' },
  { icon: 'bag', label: 'Заказы' },
  { icon: 'users', label: 'Клиенты' },
  { icon: 'settings', label: 'Настройки' },
]

const stats = [
  { label: 'Выручка', value: '1 284 500 ₽', delta: '+12,8%', up: true, spark: [20, 26, 22, 34, 31, 42, 38, 52, 49, 64], color: '#7c6cff' },
  { label: 'Заказы', value: '1 842', delta: '+8,4%', up: true, spark: [30, 28, 36, 32, 40, 38, 46, 44, 52, 58], color: '#38bdf8' },
  { label: 'Средний чек', value: '697 ₽', delta: '+3,1%', up: true, spark: [40, 42, 39, 45, 43, 48, 46, 50, 49, 54], color: '#34d399' },
  { label: 'Конверсия', value: '4,86%', delta: '−0,4%', up: false, spark: [52, 50, 54, 49, 47, 51, 45, 46, 43, 42], color: '#fb7185' },
]

const metrics = {
  revenue: { label: 'Выручка', unit: 'тыс. ₽', color: '#7c6cff', base: 62, amp: 18, trend: 2.6, seed: 0.4 },
  orders: { label: 'Заказы', unit: 'шт.', color: '#38bdf8', base: 110, amp: 34, trend: 5, seed: 1.7 },
  users: { label: 'Пользователи', unit: 'чел.', color: '#34d399', base: 340, amp: 90, trend: 18, seed: 3.1 },
}

const makeData = (metric, period) => {
  const count = period === '7' ? 7 : period === '30' ? 14 : 12
  const m = metrics[metric]
  return Array.from({ length: count }, (_, i) =>
    m.base + Math.sin(i * 0.85 + m.seed) * m.amp + i * m.trend + (i % 3) * m.amp * 0.35,
  )
}

const orders = [
  { id: '#4821', client: 'Анна Ковалёва', product: 'Тариф Pro', date: '21 ноя, 14:32', amount: 2490, status: 'Оплачен' },
  { id: '#4820', client: 'Михаил Орлов', product: 'Тариф Scale', date: '21 ноя, 12:08', amount: 5990, status: 'В обработке' },
  { id: '#4819', client: 'Дарья Смирнова', product: 'Тариф Pro', date: '20 ноя, 18:45', amount: 2490, status: 'Оплачен' },
  { id: '#4818', client: 'Илья Тимофеев', product: 'Разовый платёж', date: '20 ноя, 15:20', amount: 990, status: 'Ожидает' },
  { id: '#4817', client: 'Ольга Белова', product: 'Тариф Scale', date: '19 ноя, 10:11', amount: 5990, status: 'Оплачен' },
  { id: '#4816', client: 'Артём Волков', product: 'Тариф Pro', date: '18 ноя, 17:03', amount: 2490, status: 'Возврат' },
  { id: '#4815', client: 'Екатерина Романова', product: 'Тариф Pro', date: '18 ноя, 09:37', amount: 2490, status: 'Оплачен' },
  { id: '#4814', client: 'Павел Соколов', product: 'Разовый платёж', date: '17 ноя, 16:52', amount: 990, status: 'В обработке' },
]

const sources = [
  { label: 'Прямые', value: 42, color: '#7c6cff' },
  { label: 'Поиск', value: 28, color: '#38bdf8' },
  { label: 'Соцсети', value: 18, color: '#fb7185' },
  { label: 'Рефералы', value: 12, color: '#34d399' },
]

function Sidebar({ open, onClose, active, setActive }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="brand"><span className="brand-mark" />pulse<span>.</span><button className="close-side" onClick={onClose} aria-label="Закрыть меню"><Icon name="close" /></button></div>
        <div className="side-label">РАБОЧЕЕ ПРОСТРАНСТВО</div>
        <nav aria-label="Разделы">
          {menu.map((m) => (
            <button key={m.label} className={active === m.label ? 'side-link active' : 'side-link'} onClick={() => { setActive(m.label); onClose() }}>
              <Icon name={m.icon} />{m.label}{m.badge && <span className="side-badge">{m.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="upgrade">
            <span className="upgrade-icon">✦</span>
            <strong>Раскройте потенциал PULSE</strong>
            <p>Больше метрик и отчётов в тариве Pro.</p>
            <button>Улучшить план <Icon name="arrow" size={15} /></button>
          </div>
          <div className="user"><span className="user-avatar">АК</span><div><strong>Анна Ковалёва</strong><small>Администратор</small></div><Icon name="more" size={18} /></div>
        </div>
      </aside>
    </>
  )
}

function Sparkline({ values, color }) {
  const min = Math.min(...values), max = Math.max(...values)
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(' ')
  return <svg className="spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function StatCards() {
  return (
    <div className="stat-grid">
      {stats.map((s) => (
        <article className="stat-card" key={s.label}>
          <div className="stat-top"><span>{s.label}</span><Icon name="more" size={18} /></div>
          <strong>{s.value}</strong>
          <div className="stat-bottom">
            <span className={s.up ? 'delta up' : 'delta down'}><Icon name={s.up ? 'up' : 'down'} size={14} />{s.delta}</span>
            <small>к прошлому периоду</small>
          </div>
          <Sparkline values={s.spark} color={s.color} />
        </article>
      ))}
    </div>
  )
}

function RevenueChart() {
  const [metric, setMetric] = useState('revenue')
  const [period, setPeriod] = useState('30')
  const [hover, setHover] = useState(-1)
  const data = makeData(metric, period)
  const m = metrics[metric]
  const min = Math.min(...data) * 0.8
  const max = Math.max(...data) * 1.08
  const x = (i) => 42 + (i * 640) / (data.length - 1)
  const y = (v) => 232 - ((v - min) / (max - min)) * 184
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},232 L42,232 Z`

  return (
    <article className="panel chart-panel">
      <div className="panel-head">
        <div><h2>Динамика</h2><p>Ключевые показатели за выбранный период</p></div>
        <div className="chart-controls">
          <div className="segmented">
            {['7', '30', '90'].map((p) => <button key={p} className={period === p ? 'active' : ''} onClick={() => { setPeriod(p); setHover(-1) }}>{p} дн.</button>)}
          </div>
          <button className="icon-outline" aria-label="Скачать отчёт"><Icon name="download" size={17} /></button>
        </div>
      </div>
      <div className="metric-tabs">
        {Object.entries(metrics).map(([key, value]) => (
          <button key={key} className={metric === key ? 'active' : ''} onClick={() => { setMetric(key); setHover(-1) }}>
            <span className="tab-dot" style={{ background: value.color }} />{value.label}
          </button>
        ))}
      </div>
      <div className="chart-wrap">
        <svg viewBox="0 0 720 260" className="line-chart" role="img" aria-label={`График: ${m.label}`}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={m.color} stopOpacity=".35" />
              <stop offset="100%" stopColor={m.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((i) => {
            const gy = 48 + i * 46
            return <g key={i}><line x1="42" y1={gy} x2="682" y2={gy} stroke="#232b3d" strokeDasharray="4 6" /><text x="8" y={gy + 4} fill="#66708a" fontSize="10">{Math.round(max - (i / 4) * (max - min))}</text></g>
          })}
          <path d={area} fill="url(#areaFill)" />
          <path d={line} fill="none" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((v, i) => (
            <g key={i}>
              <circle cx={x(i)} cy={y(v)} r={hover === i ? 6 : 3.5} fill="#0f1422" stroke={m.color} strokeWidth="2.5" />
              <rect x={x(i) - 640 / (data.length - 1) / 2} y="0" width={640 / (data.length - 1)} height="260" fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} />
            </g>
          ))}
          {data.map((_, i) => (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) && (
            <text key={i} x={x(i)} y="252" fill="#66708a" fontSize="10" textAnchor="middle">{period === '7' ? `Пн + ${i}` : `${i + 1}`}</text>
          ))}
        </svg>
        {hover >= 0 && (
          <div className="chart-tooltip" style={{ left: `${(x(hover) / 720) * 100}%`, top: `${(y(data[hover]) / 260) * 100}%` }}>
            <small>{hover + 1} точка</small><strong>{Math.round(data[hover])} {m.unit}</strong>
          </div>
        )}
      </div>
    </article>
  )
}

function Sources() {
  const [active, setActive] = useState(0)
  const radius = 68
  const circumference = 2 * Math.PI * radius
  let offset = 0
  return (
    <article className="panel sources-panel">
      <div className="panel-head"><div><h2>Источники трафика</h2><p>Откуда приходят пользователи</p></div><Icon name="more" size={18} /></div>
      <div className="donut-wrap">
        <svg viewBox="0 0 180 180" className="donut" role="img" aria-label="Распределение источников трафика">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#1b2233" strokeWidth="20" />
          {sources.map((s, i) => {
            const dash = (s.value / 100) * circumference
            const el = <circle key={s.label} cx="90" cy="90" r={radius} fill="none" stroke={s.color}
              strokeWidth={active === i ? 25 : 20} strokeDasharray={`${dash - 3} ${circumference - dash + 3}`}
              strokeDashoffset={-offset} strokeLinecap="round" transform="rotate(-90 90 90)"
              onMouseEnter={() => setActive(i)} style={{ cursor: 'pointer', transition: 'stroke-width .2s' }} />
            offset += dash
            return el
          })}
        </svg>
        <div className="donut-center"><strong>{sources[active].value}%</strong><small>{sources[active].label}</small></div>
      </div>
      <div className="legend">
        {sources.map((s, i) => (
          <button key={s.label} className={active === i ? 'active' : ''} onClick={() => setActive(i)}>
            <span style={{ background: s.color }} />{s.label}<strong>{s.value}%</strong>
          </button>
        ))}
      </div>
    </article>
  )
}

function OrdersTable() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Все')
  const [sort, setSort] = useState({ key: 'date', dir: -1 })
  const [page, setPage] = useState(1)

  let rows = orders.filter((o) =>
    (status === 'Все' || o.status === status) &&
    (o.client.toLowerCase().includes(query.toLowerCase()) || o.id.includes(query)),
  )
  rows = [...rows].sort((a, b) => {
    const av = a[sort.key], bv = b[sort.key]
    return (typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv), 'ru')) * sort.dir
  })
  const pages = Math.max(1, Math.ceil(rows.length / 5))
  const current = Math.min(page, pages)
  const visible = rows.slice((current - 1) * 5, current * 5)
  const sortBy = (key) => setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }))

  return (
    <article className="panel table-panel">
      <div className="panel-head">
        <div><h2>Последние заказы</h2><p>Обновлено только что</p></div>
        <div className="table-tools">
          <label className="table-search"><Icon name="search" size={16} /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Клиент или №" aria-label="Поиск заказов" /></label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} aria-label="Фильтр по статусу">
            {['Все', 'Оплачен', 'В обработке', 'Ожидает', 'Возврат'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr>
            <th onClick={() => sortBy('id')}>Заказ</th><th onClick={() => sortBy('client')}>Клиент</th>
            <th>Продукт</th><th onClick={() => sortBy('date')}>Дата</th>
            <th onClick={() => sortBy('amount')}>Сумма</th><th>Статус</th>
          </tr></thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id}>
                <td className="mono">{o.id}</td><td>{o.client}</td><td className="muted">{o.product}</td>
                <td className="muted">{o.date}</td><td className="strong">{o.amount.toLocaleString('ru-RU')} ₽</td>
                <td><span className={'status ' + o.status.toLowerCase().replace(/ /g, '-')}>{o.status}</span></td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="6" className="no-rows">Заказы не найдены</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="pagination"><span>Показано {visible.length} из {rows.length}</span><div><button disabled={current === 1} onClick={() => setPage(current - 1)}>←</button><span>{current} / {pages}</span><button disabled={current === pages} onClick={() => setPage(current + 1)}>→</button></div></div>
    </article>
  )
}

function Tasks() {
  const [tasks, setTasks] = useState([
    { text: 'Проверить отчёт за ноябрь', done: true },
    { text: 'Обновить тарифы на сайте', done: false },
    { text: 'Созвониться с командой поддержки', done: false },
  ])
  return (
    <article className="panel tasks-panel">
      <div className="panel-head"><div><h2>Задачи</h2><p>{tasks.filter((t) => !t.done).length} осталось</p></div><Icon name="more" size={18} /></div>
      <div className="task-list">
        {tasks.map((t, i) => (
          <button key={t.text} className={t.done ? 'task done' : 'task'} onClick={() => setTasks(tasks.map((x, j) => j === i ? { ...x, done: !x.done } : x))}>
            <span className="task-check">{t.done && <Icon name="check" size={13} />}</span>{t.text}
          </button>
        ))}
      </div>
      <div className="goal">
        <div><strong>Цель месяца</strong><span>78%</span></div>
        <div className="progress"><span /></div>
        <small>781 000 ₽ из 1 000 000 ₽</small>
      </div>
    </article>
  )
}

export default function App() {
  const [active, setActive] = useState('Обзор')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active={active} setActive={setActive} />
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Открыть меню"><Icon name="menu" /></button>
            <div><h1>{active}</h1><p>С возвращением, Анна! Вот что происходит сегодня.</p></div>
          </div>
          <div className="topbar-right">
            <label className="top-search"><Icon name="search" size={18} /><input placeholder="Поиск..." aria-label="Поиск" /></label>
            <button className="icon-outline bell" aria-label="Уведомления"><Icon name="bell" size={18} /><span /></button>
            <span className="top-avatar">АК</span>
          </div>
        </header>
        <div className="content">
          <StatCards />
          <div className="charts-grid"><RevenueChart /><Sources /></div>
          <div className="bottom-grid"><OrdersTable /><Tasks /></div>
        </div>
      </main>
    </div>
  )
}
