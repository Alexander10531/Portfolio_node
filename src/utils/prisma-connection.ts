const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Conexión exitosa con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}
