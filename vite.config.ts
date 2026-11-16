import { readdirSync } from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

function documentDirectory(): Plugin {
  const moduleId = '\0virtual:documents'
  let publicDir: string

  function listDocuments(directory: string, prefix = ''): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      if (entry.name.startsWith('.')) return []
      const relative = prefix + entry.name
      if (entry.isDirectory()) return listDocuments(path.join(directory, entry.name), relative + '/')
      return entry.isFile() && /\.(?:html?|md)$/i.test(entry.name) ? [relative] : []
    }).sort()
  }

  return {
    name: 'document-directory',
    configResolved(config) { publicDir = config.publicDir },
    resolveId(id) { if (id === 'virtual:documents') return moduleId },
    load(id) {
      if (id === moduleId) return `export default ${JSON.stringify(listDocuments(publicDir))}`
    },
    configureServer(server) {
      server.watcher.add(publicDir)
      const refresh = (file: string) => {
        if (!file.startsWith(publicDir + path.sep) || !/\.(?:html?|md)$/i.test(file)) return
        const module = server.moduleGraph.getModuleById(moduleId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh).on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), documentDirectory()],
})
