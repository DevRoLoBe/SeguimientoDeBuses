<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script async src="va el Api de Google, generado po tí"></script>
    <script src="../js/script.js" defer></script>
    <style>
        /* Estilos adicionales para el modal de bienvenida */
        #welcomeModal .modal-content {
            background-color: #fff;
            color: #333;
            padding: 20px;
            text-align: center;
        }

        #welcomeModal h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        #welcomeModal p {
            font-size: 18px;
            line-height: 1.6;
        }

        #welcomeModal .logo {
            max-width: 100px;
            margin: 20px auto;
            display: block;
        }

        .map-container {
            height: 500px;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="sidebar" id="sidebar">
        <div class="profile">
            <img src="../images/lugar-frio.jpeg" alt="Foto de perfil">
            <h2><?php echo $_SESSION['user_name']; ?></h2>
        </div>
        <ul class="menu">
            <li class="active" onclick="navigate('inicio')">Inicio</li>
            <li onclick="showRoutes()">Rutas</li>
            <li onclick="navigate('notificaciones')">Notificaciones</li>
            <li onclick="navigate('ruta-inteligente')">Ruta Inteligente</li>
            <li onclick="logout()">Cerrar Sesión</li>
            <li onclick="navigate('comunidad')">Comunidad</li>
            <li onclick="navigate('configuraciones')">Configuraciones</li>
        </ul>
    </div>
    <div class="main-content">
        <div class="header">
            <div class="menu-toggle" id="menu-toggle" onclick="toggleMenu()">&#9776;</div>
            <span id="welcomeMessage">Bienvenido, <?php echo $_SESSION['user_name']; ?>!</span>
        </div>
        <div class="content">
            <div id="map" class="map-container"></div>
        </div>
    </div>

    <!-- Modal de Rutas -->
    <div id="routesModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Rutas de Autobuses</h2>
            <div class="route-list">
                <!-- Aquí se llenará dinámicamente con las rutas -->
            </div>
        </div>
    </div>

    <!-- Modal de Bienvenida -->
    <div id="welcomeModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeWelcomeModal()">&times;</span>
            <img class="logo" src="../images/bus-ico.png" alt="Logo">
            <h2>¡Bienvenido a nuestro Dashboard, <?php echo $_SESSION['user_name']; ?>!</h2>
            <p>Estamos emocionados de tenerte aquí explorando todas las funcionalidades que hemos preparado para ti.</p>
            <p>En nuestro dashboard, puedes:</p>
            <ul>
                <li>Descubrir <strong>rutas de autobuses</strong> para moverte por la ciudad.</li>
                <li>Configurar tus <strong>preferencias</strong> y recibir notificaciones personalizadas.</li>
                <li>Acceder a <strong>rutas inteligentes</strong> que optimizan tu tiempo y comodidad.</li>
                <li>Unirte a la <strong>comunidad</strong> y compartir tus experiencias.</li>
            </ul>
            <p>No dudes en explorar y utilizar todas las herramientas disponibles para una experiencia personalizada.</p>
            <p>¡Disfruta de tu tiempo con nosotros!</p>
        </div>
    </div>

    <script>
        function logout() {
            window.location.href = '../controllers/AuthController.php?logout=true';
        }

        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        }

        function navigate(section) {
            if (section === 'inicio') {
                document.getElementById('welcomeMessage').innerText = 'Bienvenido, <?php echo $_SESSION['user_name']; ?>!';
                showWelcomeModal();
            } else if (section === 'rutas') {
                showRoutes();
            } else {
                alert(`Navegando a: ${section}`);
                // Aquí puedes añadir lógica para navegar a otras secciones si es necesario
            }
        }

        function showRoutes() {
            const modal = document.getElementById('routesModal');
            modal.style.display = 'block';
            // Llenar dinámicamente el listado de rutas
            const routeList = document.querySelector('.route-list');
            routeList.innerHTML = ''; // Limpiar lista previa

            // Simular datos de rutas (puedes obtener estos datos desde una base de datos o API)
            const routes = [
                { empresa: 'Empresa Santa Rosa SAC', ruta: 'Los Olivos, Miraflores, Surco, Ate.' },
                { empresa: 'Empresa 2', ruta: 'San Miguel, La Molina, San Borja.' },
                { empresa: 'Empresa 3', ruta: 'Puente Piedra, Lince, San Isidro.' },
                { empresa: 'Empresa 4', ruta: 'Callao, Magdalena, Miraflores.' },
                { empresa: 'Empresa 5', ruta: 'Comas, Breña, Chorrillos.' },
            ];

            routes.forEach(route => {
                const routeElement = document.createElement('div');
                routeElement.classList.add('route');
                routeElement.innerHTML = `
                    <h3>${route.empresa}</h3>
                    <p>Ruta: ${route.ruta}</p>
                `;
                routeList.appendChild(routeElement);
            });
        }

        function closeModal() {
            const modal = document.getElementById('routesModal');
            modal.style.display = 'none';
        }

        function showWelcomeModal() {
            const modal = document.getElementById('welcomeModal');
            modal.style.display = 'block';
        }

        function closeWelcomeModal() {
            const modal = document.getElementById('welcomeModal');
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            const modals = document.getElementsByClassName('modal');
            for (let i = 0; i < modals.length; i++) {
                if (event.target == modals[i]) {
                    modals[i].style.display = "none";
                }
            }
        }
    </script>
</body>
</html>
