import { spawnSync } from 'node:child_process'
import path from 'node:path'

const projectRoot = process.cwd()
const schemaPath = path.join(projectRoot, 'src/main/database/schema.prisma')
const databaseUrl = `file:${path.join(projectRoot, 'src/main/database/dev.db')}`

function runPrismaCommand(args, extraEnv = {}) {
  const result = spawnSync('npx', ['prisma', ...args], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      ...extraEnv,
    },
  })

  return result.status === 0
}

if (!runPrismaCommand(['generate', '--schema', schemaPath])) {
  process.exit(1)
}

const migrateSucceeded = runPrismaCommand(
  ['migrate', 'deploy', '--schema', schemaPath],
  { DATABASE_URL: databaseUrl },
)

if (!migrateSucceeded) {
  console.warn('[prisma] migrate deploy failed, running db push fallback')
  if (!runPrismaCommand(['db', 'push', '--schema', schemaPath], { DATABASE_URL: databaseUrl })) {
    process.exit(1)
  }
}
