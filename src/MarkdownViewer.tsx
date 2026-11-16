import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import documents from 'virtual:documents'
import './MarkdownViewer.css'

export default function MarkdownViewer({ file }: { file: string }) {
  const [mode, setMode] = useState<'preview' | 'raw'>('preview')
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState('')
  const valid = documents.includes(file) && /\.md$/i.test(file)
  const url = '/' + file.split('/').map(encodeURIComponent).join('/')

  useEffect(() => {
    if (!valid) return
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Không thể tải tài liệu. Vui lòng thử lại.')
        return response.text()
      })
      .then(setContent)
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Không thể tải tài liệu.')
      })
    return () => controller.abort()
  }, [url, valid])

  function resolveLink(href: string, image = false) {
    const resolved = new URL(href, new URL(url, window.location.origin))
    if (!image && resolved.origin === window.location.origin && /\.md$/i.test(resolved.pathname)) {
      const destination = decodeURIComponent(resolved.pathname.slice(1))
      if (documents.includes(destination)) return '/?document=' + encodeURIComponent(destination) + resolved.hash
    }
    return resolved.href
  }

  return (
    <main className="markdown-viewer">
      <a className="back-link" href="/">← Thư viện tài liệu</a>
      <header className="viewer-header">
        <div><p className="eyebrow">MARKDOWN</p><h1>{file.slice(file.lastIndexOf('/') + 1)}</h1><p className="viewer-path">/{file}</p></div>
        <div className="view-switch" role="group" aria-label="Chế độ xem Markdown">
          <button aria-pressed={mode === 'preview'} onClick={() => setMode('preview')}>Preview</button>
          <button aria-pressed={mode === 'raw'} onClick={() => setMode('raw')}>Raw</button>
        </div>
      </header>
      {!valid ? <p role="alert">Không tìm thấy tài liệu Markdown.</p> : error ? <p role="alert">{error}</p> : content === null ? <p role="status">Đang tải tài liệu…</p> : (
        <article className={'markdown-content ' + (mode === 'raw' ? 'raw-content' : '')}>
          {mode === 'raw' ? <pre>{content}</pre> : <Markdown remarkPlugins={[remarkGfm]} components={{
            a: ({ href, children, ...props }) => <a {...props} href={href ? resolveLink(href) : undefined}>{children}</a>,
            img: ({ src, alt, ...props }) => <img {...props} src={typeof src === 'string' ? resolveLink(src, true) : undefined} alt={alt ?? ''} />,
          }}>{content}</Markdown>}
        </article>
      )}
    </main>
  )
}
