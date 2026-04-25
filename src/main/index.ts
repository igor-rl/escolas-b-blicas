import path from 'node:path'
import { execSync } from 'node:child_process'
import { app } from 'electron'
import { prisma, getDatabaseUrl } from './database/client'

export async function bootstrapDatabase() {
  const databaseUrl = getDatabaseUrl()

  // Em dev, aplica migrations automaticamente
  if (!app.isPackaged) {
    const schemaPath = path.join(
      process.cwd(),
      'src/main/database/schema.prisma'
    )
    try {
      execSync(
        `npx prisma migrate deploy --schema="${schemaPath}"`,
        {
          env: { ...process.env, DATABASE_URL: databaseUrl },
          stdio: 'inherit',
        }
      )
    } catch (err) {
      console.warn('[database] migrate deploy falhou, tentando db push...', err)
      execSync(
        `npx prisma db push --schema="${schemaPath}"`,
        {
          env: { ...process.env, DATABASE_URL: databaseUrl },
          stdio: 'inherit',
        }
      )
    }
  }

  await prisma.$queryRaw`SELECT 1`
  console.info('[database] SQLite connection ready', { databaseUrl })
}