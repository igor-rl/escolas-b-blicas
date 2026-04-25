import { cpSync, existsSync, mkdirSync } from 'node:fs'
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
]

for (const { source, target } of copyJobs) {
  if (!existsSync(source)) {
    continue
  }

  mkdirSync(target, { recursive: true })
  cpSync(source, target, { recursive: true, force: true })
}

console.info('[prisma] runtime assets copied to dist-electron')
