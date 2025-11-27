#!/bin/bash
set -e

echo "=== 🚀 Instalando dependencias del sistema ==="
sudo dnf install -y oracle-epel-release-el8
sudo dnf install -y nodejs git mysql-server unzip

echo "=== 🧩 Iniciando y habilitando MySQL ==="
sudo systemctl enable mysqld
sudo systemctl start mysqld

echo "=== ⚙️ Configurando base de datos ==="
sudo mysql -e "CREATE DATABASE IF NOT EXISTS enterprise_ai_chat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'aiuser'@'localhost' IDENTIFIED BY 'A1StrongPassword!';"
sudo mysql -e "GRANT ALL PRIVILEGES ON enterprise_ai_chat.* TO 'aiuser'@'localhost'; FLUSH PRIVILEGES;"

echo "=== 🧠 Instalando dependencias de Node.js ==="
npm install -g npm@latest
npm install -g prisma pm2
npm install

echo "=== 🔧 Generando cliente Prisma ==="
npx prisma generate

echo "=== ⚙️ Variables de entorno ==="
cat <<EOF > .env
DATABASE_URL="mysql://aiuser:A1StrongPassword!@localhost:3306/enterprise_ai_chat"
JWT_SECRET="$(openssl rand -hex 32)"
OPENAI_API_KEY=""
PORT=4000
EOF

echo "=== 🧬 Migrando base de datos ==="
npx prisma migrate deploy || npx prisma migrate dev --name init

echo "=== 🧭 Configurando servicio PM2 ==="
npx pm2 start src/server.js --name enterprise-ai-chat
npx pm2 save
npx pm2 startup systemd -u $(whoami) --hp $HOME

echo "=== ✅ Instalación completa. Backend corriendo en puerto 4000 ==="
