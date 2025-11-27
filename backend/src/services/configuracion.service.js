import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const crearConfiguracion = async (data, creadorId) => {
  return prisma.configuracionIA.create({
    data: {
      ...data,
      creadorId,
    },
  });
};

export const obtenerConfiguraciones = async (creadorId) => {
  return prisma.configuracionIA.findMany({
    where: { creadorId },
    orderBy: { createdAt: 'desc' },
  });
};

export const obtenerConfiguracionPorId = async (id) => {
  return prisma.configuracionIA.findUnique({
    where: { id: Number(id) },
  });
};

export const actualizarConfiguracion = async (id, data, user) => {
  const config = await prisma.configuracionIA.findUnique({ where: { id: Number(id) } });
  if (!config) throw new Error('Configuración no encontrada');
  if (config.creadorId !== user.id && user.typeUser !== 'admin')
    throw new Error('No autorizado para modificar esta configuración');

  return prisma.configuracionIA.update({
    where: { id: Number(id) },
    data,
  });
};

export const eliminarConfiguracion = async (id, user) => {
  const config = await prisma.configuracionIA.findUnique({ where: { id: Number(id) } });
  if (!config) throw new Error('Configuración no encontrada');
  if (config.creadorId !== user.id && user.typeUser !== 'admin')
    throw new Error('No autorizado para eliminar esta configuración');

  return prisma.configuracionIA.delete({ where: { id: Number(id) } });
};
