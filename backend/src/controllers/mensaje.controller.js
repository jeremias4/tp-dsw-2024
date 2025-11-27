import * as mensajeService from '../services/mensaje.service.js';

export const crear = async (req, res) => {
  try {
    const msg = await mensajeService.crearMensaje(req.body);
    res.status(201).json(msg);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const listarPorConversacion = async (req, res) => {
  const mensajes = await mensajeService.obtenerMensajesPorConversacion(req.params.conversacionId);
  res.json(mensajes);
};
