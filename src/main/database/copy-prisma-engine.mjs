import { cpSync, copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const copyJobs = [
  {
    source: path.join(projectRoot, 'node_modules/.prisma/client'),
    target: path.join(projectRoot, 'dist-electron', 'prisma', '.prisma-client'),
  },
  {
    source: path.join(projectRoot, 'node_modules/@prisma/client'),
    target: path.join(projectRoot, 'dist-electron', 'prisma', '@prisma-client'),
  },
  {
    source: path.join(projectRoot, 'src/main/database/generated'),
    target: path.join(projectRoot, 'dist-electron', 'src', 'main', 'database', 'generated'),
  },
  // 👇 Copia o banco com as tabelas já criadas
  {
    source: path.join(projectRoot, 'src/main/database/dev.db'),
    target: path.join(projectRoot, 'dist-electron', 'src', 'main', 'database', 'dev.db'),
  },
]

for (const { source, target } of copyJobs) {
  if (!existsSync(source)) {
    console.warn(`[prisma] source not found, skipping: ${source}`)
    continue
  }

  const isDir = statSync(source).isDirectory()

  if (isDir) {
    mkdirSync(target, { recursive: true })
    cpSync(source, target, { recursive: true, force: true })
  } else {
    // Arquivo simples (ex: dev.db)
    mkdirSync(path.dirname(target), { recursive: true })
    copyFileSync(source, target)
  }
}

console.info('[prisma] runtime assets copied to dist-electron')
