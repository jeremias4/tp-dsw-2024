#!/bin/bash
set -e

# === CONFIGURACIÓN BÁSICA ===
CONTAINER_NAME="oracle-ai-chat"
IMAGE="images:oracle/9/cloud"     # Oracle Linux 9 minimal LXC image
PROFILE="default"
USER="oracle"
PASSWORD="A1StrongPassword!"
PORT_SSH=2222
IP_STATIC="10.0.3.50"

echo "=== 🧩 Creando contenedor LXC de Oracle Linux 9 Minimal ==="

# Verificar LXC
if ! command -v lxc &>/dev/null; then
  echo "Instalando LXC..."
  sudo apt update && sudo apt install -y lxd
  sudo lxd init --auto
fi

# Descargar la imagen si no existe
if ! lxc image list | grep -q "oracle/9"; then
  echo "Descargando imagen Oracle Linux 9..."
  lxc image copy $IMAGE local: --alias oracle9
fi

# Crear contenedor
echo "Creando contenedor $CONTAINER_NAME..."
lxc launch oracle9 $CONTAINER_NAME -p $PROFILE

# Esperar inicialización
sleep 10

# Configurar red e IP estática
echo "Configurando red..."
lxc exec $CONTAINER_NAME -- bash -c "echo -e 'DEVICE=eth0\nBOOTPROTO=dhcp\nONBOOT=yes' > /etc/sysconfig/network-scripts/ifcfg-eth0"
lxc restart $CONTAINER_NAME
sleep 5

# Configurar usuario
echo "Creando usuario $USER..."
lxc exec $CONTAINER_NAME -- bash -c "
  useradd -m -s /bin/bash $USER
  echo '$USER:$PASSWORD' | chpasswd
  usermod -aG wheel $USER
"

# Habilitar sudo sin contraseña
lxc exec $CONTAINER_NAME -- bash -c "
  echo '$USER ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/$USER
  chmod 440 /etc/sudoers.d/$USER
"

# Instalar utilidades mínimas
echo "Instalando herramientas base..."
lxc exec $CONTAINER_NAME -- dnf install -y sudo vim curl wget net-tools

# Configurar SSH
echo "Instalando y configurando SSH..."
lxc exec $CONTAINER_NAME -- dnf install -y openssh-server
lxc exec $CONTAINER_NAME -- systemctl enable sshd
lxc exec $CONTAINER_NAME -- systemctl start sshd

# Mapear puerto SSH hacia el host
echo "Mapeando puerto SSH ($PORT_SSH) hacia el host..."
lxc config device add $CONTAINER_NAME sshproxy proxy listen=tcp:0.0.0.0:$PORT_SSH connect=tcp:127.0.0.1:22

# Mostrar información final
IP=$(lxc list $CONTAINER_NAME -c 4 | grep eth0 | awk '{print $2}')

echo "=== ✅ VM Oracle Linux 9 Minimal creada exitosamente ==="
echo "Nombre:     $CONTAINER_NAME"
echo "IP interna: $IP"
echo "SSH:        ssh $USER@localhost -p $PORT_SSH"
echo "Contraseña: $PASSWORD"
echo "========================================="
echo "Siguiente paso:"
echo "1️⃣  ssh $USER@localhost -p $PORT_SSH"
echo "2️⃣  git clone tu backend y ejecutar ./install.sh"
