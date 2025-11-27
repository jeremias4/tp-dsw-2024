import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

export const createUser = async (data) => {
  const hashed = await hashPassword(data.password);
  return prisma.usuario.create({ data: { ...data, password: hashed } });
};

export const loginUser = async (email, password) => {
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');
  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Credenciales inválidas');
  const token = generateToken(user);
  return { token, user };
};

export const getAllUsers = () => prisma.usuario.findMany();

export const getUserById = (id) =>
  prisma.usuario.findUnique({ where: { id: Number(id) } });

export const updateUser = async (id, data) => {
  if (data.password) data.password = await hashPassword(data.password);
  return prisma.usuario.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteUser = (id) =>
  prisma.usuario.delete({ where: { id: Number(id) } });
