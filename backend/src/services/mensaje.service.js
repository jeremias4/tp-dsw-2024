import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const crearMensaje = (data) => prisma.mensaje.create({ data });

export const obtenerMensajesPorConversacion = (conversacionId) =>
  prisma.mensaje.findMany({
    where: { conversacionId: Number(conversacionId) },
    orderBy: { fecha: 'asc' },
  });
