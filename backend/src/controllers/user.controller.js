import * as userService from '../services/user.service.js';

export const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'No encontrado' });
  res.json(user);
};

export const update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const remove = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).end();
};
