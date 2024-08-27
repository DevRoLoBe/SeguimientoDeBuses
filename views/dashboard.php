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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style_dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="sidebar" id="sidebar">
            <div class="profile">
                <img src="../images/lugar-frio.jpeg" alt="Foto de perfil">
                <h2><?php echo $_SESSION['user_name']; ?></h2>
            </div>
            <ul class="menu">
                <li class="active" onclick="navigate('inicio')"><i class="fas fa-map-marked-alt"></i><span>Inicio</span></li>
                <li onclick="navigate('buscar-ruta')"><i class="fas fa-search"></i><span>Buscar Ruta</span></li>
                <li onclick="navigate('mis-viajes')"><i class="fas fa-history"></i><span>Mis Viajes</span></li>
                <li onclick="navigate('ruta-tiempo-real')"><i class="fas fa-bus"></i><span>Ruta en Tiempo Real</span></li>
                <li onclick="navigate('notificaciones')"><i class="fas fa-bell"></i><span>Notificaciones</span></li>
                <li onclick="navigate('configuracion')"><i class="fas fa-cog"></i><span>Configuración</span></li>
                <li onclick="logout()"><i class="fas fa-sign-out-alt"></i><span>Cerrar Sesión</span></li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <div class="menu-toggle" id="menu-toggle" onclick="toggleMenu()">&#9776;</div>
                <span id="welcomeMessage">Bienvenido, <?php echo $_SESSION['user_name']; ?>!</span>
            </div>
            <div id="content-area">
                <div id="map" class="map-container"></div>

                <div id="buscar-ruta" class="content-section" style="display: none;">
                    <h2>Buscar Ruta</h2>
                    <form id="route-search-form">
                        <input type="text" id="origin" placeholder="Origen" required>
                        <input type="text" id="destination" placeholder="Destino" required>
                        <button type="submit">Buscar Ruta</button>
                    </form>
                    <div id="route-results"></div>
                    <div id="route-map" style="height: 400px; margin-top: 20px;"></div>
                </div>

                <div id="mis-viajes" class="content-section" style="display: none;">
                    <h2>Mis Viajes</h2>
                    <ul id="viajes-list"></ul>
                </div>

                <div id="ruta-tiempo-real" class="content-section" style="display: none;">
                    <h2>Ruta en Tiempo Real</h2>
                    <p>Selecciona una ruta para ver su progreso en tiempo real:</p>
                    <select id="real-time-routes">
                        
                    </select>
                    <div id="real-time-map" style="height: 400px; margin-top: 20px;"></div>
                </div>

                <div id="notificaciones" class="content-section" style="display: none;">
                    <h2>Notificaciones</h2>
                    <ul id="notifications-list"></ul>
                </div>

                <div id="configuracion" class="content-section" style="display: none;">
                    <h2>Configuración</h2>
                    <form id="config-form">
                        <label>
                            <input type="checkbox" id="notifications-enabled"> Activar notificaciones
                        </label>
                        <label>
                            <input type="checkbox" id="dark-mode"> Modo oscuro
                        </label>
                        <button type="submit">Guardar configuración</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modales -->
    <div id="roleModal" class="modal">
        <div class="modal-content">
            <h2>Selecciona tu rol</h2>
            <button onclick="RoutesModule.setRole('usuario')">Usuario</button>
            <button onclick="RoutesModule.setRole('bus')">Bus</button>
        </div>
    </div>

    <div id="companyModal" class="modal">
        <div class="modal-content">
            <h2>Selecciona tu empresa</h2>
            <select id="companySelect"></select>
            <button onclick="RoutesModule.selectCompanyAndRoute()">Seleccionar</button>
        </div>
    </div>

    <!-- Información de buses -->
    <div id="busInfo" style="position: absolute; top: 10px; right: 10px; background: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.5); max-height: 300px; overflow-y: auto;"></div>

    <!-- Scripts -->
    <script async src="Tambien va el código de api"></script>
    <script src="../js/routes.js"></script>
    <script src="../js/dashboard.js"></script>
        
</body>
</html>