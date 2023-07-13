import prismaClient from '@prisma/client'

const db = new prismaClient.PrismaClient();

export default db;