import * as conversacionService from '../services/conversacion.service.js';

export const iniciarConversacion = async (req, res) => {
  try {
    const { configuracionId, texto } = req.body;
    const usuarioId = req.user.id;
    const result = await conversacionService.iniciarConversacion(usuarioId, configuracionId, texto);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const listarConversaciones = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const usuarioId = req.user.id;
    const convs = await conversacionService.obtenerConversaciones(usuarioId, fechaInicio, fechaFin);
    res.json(convs);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const obtenerPorId = async (req, res) => {
  const conv = await conversacionService.obtenerConversacionPorId(req.params.id);
  if (!conv) return res.status(404).json({ message: 'No encontrado' });
  res.json(conv);
};
