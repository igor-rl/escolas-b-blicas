import path from 'node:path'
import { app } from 'electron'
import { PrismaClient } from './generated/client'

function resolveDatabaseFilePath() {
  if (!app.isPackaged) {
    return path.resolve(process.cwd(), 'src/main/database/dev.db')
  }

  return path.join(app.getPath('userData'), 'eb.sqlite')
}

export function getDatabaseUrl() {
  const filePath = resolveDatabaseFilePath()
  return `file:${filePath}`
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
