import { useState } from 'react'
import documents from 'virtual:documents'
import './App.css'
import MarkdownViewer from './MarkdownViewer'

const folderOf = (file: string) => file.includes('/') ? file.slice(0, file.lastIndexOf('/')) : ''
const nameOf = (file: string) => file.slice(file.lastIndexOf('/') + 1)
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase()
const hrefOf = (file: string) => /\.md$/i.test(file)
  ? '/?document=' + encodeURIComponent(file)
  : '/' + file.split('/').map(encodeURIComponent).join('/')
const folders = [...new Set(documents.map(folderOf))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
const pageSize = 20

function DocumentLibrary() {
  const [query, setQuery] = useState('')
  const [folderQuery, setFolderQuery] = useState('')
  const [folder, setFolder] = useState<string | null>(null)
  const [sort, setSort] = useState('asc')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const filtered = documents.filter(file =>
    (folder === null || folderOf(file) === folder) &&
    normalize(query).split(/\s+/).every(word => normalize(file).includes(word)) &&
    (type === 'all' || (type === 'md' ? /\.md$/i.test(file) : /\.html?$/i.test(file))),
  ).sort((a, b) => (sort === 'asc' ? 1 : -1) * nameOf(a).localeCompare(nameOf(b), undefined, { numeric: true }))
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pages)
  const start = (currentPage - 1) * pageSize

  function selectFolder(value: string | null) {
    setFolder(value)
    setPage(1)
  }

  return (
    <div className="workspace">
      <aside className="sidebar" aria-label="Thư mục tài liệu">
        <a className="brand" href="/"> <span className="brand-icon">LR</span><span>Love Rec<small>INTERNAL LIBRARY</small></span></a>
        <div className="sidebar-label">THƯ MỤC <span>{folders.length}</span></div>
        <input className="folder-search" aria-label="Tìm thư mục" placeholder="Tìm thư mục…" value={folderQuery} onChange={event => setFolderQuery(event.target.value)} />
        <nav>
          <button className={folder === null ? 'folder-button active' : 'folder-button'} onClick={() => selectFolder(null)}><span>▦</span> Tất cả tài liệu <span className="count">{documents.length}</span></button>
          {folders.filter(value => normalize(value || 'Thư mục gốc').includes(normalize(folderQuery))).map(value => (
            <button key={value} className={folder === value ? 'folder-button active' : 'folder-button'} onClick={() => selectFolder(value)} title={value || 'Thư mục gốc'}><span aria-hidden="true">▱</span><span className="folder-name">{value || 'Thư mục gốc'}</span><span className="count">{documents.filter(file => folderOf(file) === value).length}</span></button>
          ))}
          {!folders.some(value => normalize(value || 'Thư mục gốc').includes(normalize(folderQuery))) && <p className="sidebar-empty">Không tìm thấy thư mục.</p>}
        </nav>
        <p className="sidebar-footer">Một nơi cho mọi tài liệu dự án.</p>
      </aside>
      <main>
        <header>
          <p className="eyebrow">KHÔNG GIAN LÀM VIỆC / TÀI LIỆU</p>
          <div className="title-row"><h1>{folder === null ? 'Tất cả tài liệu' : folder || 'Thư mục gốc'}</h1><span className="total-badge">{folder === null ? documents.length : documents.filter(file => folderOf(file) === folder).length} tài liệu</span></div>
          <p className="intro">Tìm nhanh báo cáo, duyệt thư mục và mở tài liệu bạn cần.</p>
        </header>
        <section className="document-panel" aria-label="Danh sách tài liệu">
          <div className="toolbar">
            <div className="search"><span aria-hidden="true">⌕</span><input aria-label="Tìm tài liệu" placeholder="Tìm theo tên file hoặc đường dẫn…" value={query} onChange={event => { setQuery(event.target.value); setPage(1) }} />{query && <button aria-label="Xóa tìm kiếm" onClick={() => { setQuery(''); setPage(1) }}>×</button>}</div>
            <select aria-label="Loại tài liệu" value={type} onChange={event => { setType(event.target.value); setPage(1) }}><option value="all">Mọi định dạng</option><option value="html">HTML</option><option value="md">Markdown</option></select>
            <select aria-label="Sắp xếp tài liệu" value={sort} onChange={event => { setSort(event.target.value); setPage(1) }}><option value="asc">Tên: A → Z</option><option value="desc">Tên: Z → A</option></select>
          </div>
          <div className="result-info" aria-live="polite"><span>{filtered.length} tài liệu{query && ` khớp với “${query}”`}</span>{(query || type !== 'all' || folder !== null) && <button onClick={() => { setQuery(''); setType('all'); selectFolder(null) }}>Xóa bộ lọc</button>}</div>
          <div className="list-heading"><span>TÊN TÀI LIỆU</span><span>THƯ MỤC</span><span>THAO TÁC</span></div>
          <ul className="document-list">
            {filtered.slice(start, start + pageSize).map(file => (
              <li key={file}>
                <a className="document-link" href={hrefOf(file)}>
                  <span className={'file-icon ' + (/\.md$/i.test(file) ? 'markdown' : '')} aria-hidden="true">{/\.md$/i.test(file) ? 'MD' : 'HTML'}</span>
                  <span className="file-info"><strong>{nameOf(file)}</strong><span>/{file}</span></span>
                </a>
                <button className="folder-tag" onClick={() => selectFolder(folderOf(file))} title={'Lọc thư mục ' + folderOf(file)}>{folderOf(file) || 'Thư mục gốc'}</button>
                <a className="open" href={hrefOf(file)} aria-label={'Mở ' + nameOf(file)}>Mở <span aria-hidden="true">→</span></a>
              </li>
            ))}
          </ul>
          {filtered.length === 0 && <div className="empty"><span aria-hidden="true">⌕</span><h2>{documents.length ? 'Không tìm thấy tài liệu' : 'Chưa có tài liệu'}</h2><p>Thử từ khóa khác hoặc xóa bộ lọc để xem tất cả.</p></div>}
          <footer className="pagination"><span>{filtered.length ? `${start + 1}–${Math.min(start + pageSize, filtered.length)} trên ${filtered.length} tài liệu` : '0 tài liệu'}</span><div><button disabled={currentPage === 1} aria-label="Trang trước" onClick={() => setPage(currentPage - 1)}>←</button><span>Trang {currentPage} / {pages}</span><button disabled={currentPage === pages} aria-label="Trang sau" onClick={() => setPage(currentPage + 1)}>→</button></div></footer>
        </section>
        <p className="hint">Chọn tên tài liệu hoặc “Mở →” để xem tài liệu</p>
      </main>
    </div>
  )
}

function App() {
  const document = new URLSearchParams(window.location.search).get('document')
  if (document !== null) return <MarkdownViewer file={document} />
  return <DocumentLibrary />
}

export default App
