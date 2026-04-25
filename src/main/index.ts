import { prisma, getDatabaseUrl } from './database/client'

export async function bootstrapDatabase() {
  const databaseUrl = getDatabaseUrl()
  await prisma.$queryRaw`SELECT 1`
  console.info('[database] SQLite connection ready', { databaseUrl })
}
