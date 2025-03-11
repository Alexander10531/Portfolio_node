import logger from "../config/logger";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    logger.info('Conexión exitosa con la base de datos.')
  } catch (error) {
    logger.info("'Error al conectar con la base de datos:', error"); 
  } finally {
    await prisma.$disconnect();
  }
}
