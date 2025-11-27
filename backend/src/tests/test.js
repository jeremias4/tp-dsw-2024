#!/usr/bin/env node
import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';
let token = null;

const api = axios.create({
  baseURL: API_URL,
  validateStatus: () => true,
});

const authHeaders = () => token ? { Authorization: `Bearer ${token}` } : {};

const log = (msg, color = 'cyan') => console.log(chalk[color](msg));
const divider = () => console.log(chalk.gray('------------------------------------------------'));

async function mainMenu() {
  console.clear();
  log('🧠 Backend Tester CLI — Enterprise AI Chat', 'green');
  divider();
  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Selecciona una sección para probar:',
      choices: [
        'Usuarios',
        'Configuraciones IA',
        'Conversaciones',
        'Salir',
      ],
    },
  ]);

  switch (section) {
    case 'Usuarios': await menuUsuarios(); break;
    case 'Configuraciones IA': await menuConfigIA(); break;
    case 'Conversaciones': await menuConversaciones(); break;
    default: process.exit(0);
  }
}

async function menuUsuarios() {
  divider();
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Operación de usuario:',
      choices: [
        'Registrar usuario',
        'Login usuario',
        'Listar usuarios (admin)',
        'Volver',
      ],
    },
  ]);

  if (action === 'Registrar usuario') await registrarUsuario();
  if (action === 'Login usuario') await loginUsuario();
  if (action === 'Listar usuarios (admin)') await listarUsuarios();
  await volver(mainMenu);
}

async function registrarUsuario() {
  const answers = await inquirer.prompt([
    { name: 'name', message: 'Nombre:' },
    { name: 'email', message: 'Email:' },
    { name: 'password', message: 'Contraseña:' },
    { name: 'typeUser', message: 'Tipo (employee/admin):', default: 'employee' },
  ]);
  const res = await api.post('/users/register', answers);
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function loginUsuario() {
  const { email, password } = await inquirer.prompt([
    { name: 'email', message: 'Email:' },
    { name: 'password', message: 'Contraseña:' },
  ]);
  const res = await api.post('/users/login', { email, password });
  if (res.data.token) {
    token = res.data.token;
    log('🔐 Login exitoso — Token guardado.', 'green');
  } else log('❌ Error de login', 'red');
}

async function listarUsuarios() {
  const res = await api.get('/users', { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function menuConfigIA() {
  divider();
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Operación Configuración IA:',
      choices: [
        'Crear configuración',
        'Listar configuraciones',
        'Volver',
      ],
    },
  ]);

  if (action === 'Crear configuración') await crearConfig();
  if (action === 'Listar configuraciones') await listarConfigs();
  await volver(mainMenu);
}

async function crearConfig() {
  const conf = await inquirer.prompt([
    { name: 'nombreModelo', message: 'Modelo (ej: gpt-4-turbo):' },
    { name: 'temperatura', message: 'Temperatura (0–1):', default: 0.7 },
    { name: 'maxTokens', message: 'Max tokens:', default: 512 },
  ]);
  const res = await api.post('/configuraciones', conf, { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function listarConfigs() {
  const res = await api.get('/configuraciones', { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function menuConversaciones() {
  divider();
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Operación Conversación:',
      choices: [
        'Iniciar conversación',
        'Listar conversaciones',
        'Ver mensajes',
        'Volver',
      ],
    },
  ]);

  if (action === 'Iniciar conversación') await iniciarConversacion();
  if (action === 'Listar conversaciones') await listarConversaciones();
  if (action === 'Ver mensajes') await verMensajes();
  await volver(mainMenu);
}

async function iniciarConversacion() {
  const { configuracionId, texto } = await inquirer.prompt([
    { name: 'configuracionId', message: 'ID de Configuración IA:' },
    { name: 'texto', message: 'Mensaje inicial:' },
  ]);
  const res = await api.post('/conversaciones/iniciar', { configuracionId: Number(configuracionId), texto }, { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function listarConversaciones() {
  const res = await api.get('/conversaciones', { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function verMensajes() {
  const { conversacionId } = await inquirer.prompt([
    { name: 'conversacionId', message: 'ID de conversación:' },
  ]);
  const res = await api.get(`/mensajes/${conversacionId}`, { headers: authHeaders() });
  log(JSON.stringify(res.data, null, 2), 'yellow');
}

async function volver(callback) {
  divider();
  await inquirer.prompt([{ name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  await callback();
}

// Iniciar CLI
await mainMenu();
