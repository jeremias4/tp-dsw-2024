import * as configuracionService from '../services/configuracion.service.js';

export const crear = async (req, res) => {
  try {
    const data = await configuracionService.crearConfiguracion(req.body, req.user.id);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const listar = async (req, res) => {
  try {
    const data = await configuracionService.obtenerConfiguraciones(req.user.id);
    res.json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const obtener = async (req, res) => {
  const conf = await configuracionService.obtenerConfiguracionPorId(req.params.id);
  if (!conf) return res.status(404).json({ message: 'No encontrada' });
  res.json(conf);
};

export const actualizar = async (req, res) => {
  try {
    const conf = await configuracionService.actualizarConfiguracion(req.params.id, req.body, req.user);
    res.json(conf);
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    await configuracionService.eliminarConfiguracion(req.params.id, req.user);
    res.status(204).end();
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};
