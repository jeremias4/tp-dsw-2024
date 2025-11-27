import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
const prisma = new PrismaClient();

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const crearConversacion = async (usuarioId, configuracionId) => {
  return prisma.conversacion.create({
    data: { usuarioId, configuracionId },
  });
};

export const obtenerConversaciones = async (usuarioId, fechaInicio, fechaFin) => {
  return prisma.conversacion.findMany({
    where: {
      usuarioId,
      fechaInicio: {
        gte: fechaInicio ? new Date(fechaInicio) : undefined,
        lte: fechaFin ? new Date(fechaFin) : undefined,
      },
    },
    include: { mensajes: true, configuracion: true },
    orderBy: { fechaInicio: 'desc' },
  });
};

export const obtenerConversacionPorId = async (id) => {
  return prisma.conversacion.findUnique({
    where: { id: Number(id) },
    include: { mensajes: true, configuracion: true },
  });
};

export const iniciarConversacion = async (usuarioId, configuracionId, texto) => {
  const conversacion = await prisma.conversacion.create({
    data: { usuarioId, configuracionId },
  });

  const mensajeUsuario = await prisma.mensaje.create({
    data: {
      texto,
      tipoMensaje: 'user',
      conversacionId: conversacion.id,
    },
  });

  let respuestaIA = 'Simulación: respuesta generada por IA.';

  if (openai) {
    const config = await prisma.configuracionIA.findUnique({
      where: { id: configuracionId },
    });

    const completion = await openai.chat.completions.create({
      model: config.nombreModelo,
      messages: [{ role: 'user', content: texto }],
      temperature: config.temperatura,
      max_tokens: config.maxTokens,
    });

    respuestaIA = completion.choices[0].message.content;
  }

  const mensajeIA = await prisma.mensaje.create({
    data: {
      texto: respuestaIA,
      tipoMensaje: 'ai',
      conversacionId: conversacion.id,
    },
  });

  return {
    conversacion,
    mensajes: [mensajeUsuario, mensajeIA],
  };
};
