let map;
let directionsService;
let directionsRenderer;
let realTimeMap;
let realTimeMarkers = [];
let busInfoWindow;
let activeRoutes = [];
let hoveredPolyline = null;

function initMap() {
    const initialPosition = { lat: -12.0464, lng: -77.0428 }; // Lima, Perú
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialPosition,    
        zoom: 13
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    busInfoWindow = new google.maps.InfoWindow();

    RoutesModule.initMap(map);
    drawAllRoutes(map);

    // Añadir ubicación en tiempo real
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            if (!userMarker) {
                userMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new google.maps.Size(30, 30)
                    },
                    title: 'Tu ubicación'
                });
            } else {
                userMarker.setPosition(pos);
            }

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, map.getCenter());
        });
    } else {
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    console.error(browserHasGeolocation ?
                  'Error: El servicio de Geolocalización falló.' :
                  'Error: Tu navegador no soporta geolocalización.');
}

function drawAllRoutes(targetMap) {
    const routes = RoutesModule.getRoutes();
    routes.forEach(route => {
        const path = route.paraderos.map(paradero => new google.maps.LatLng(paradero.lat, paradero.lng));
        const polyline = new google.maps.Polyline({
            path: path,
            strokeColor: route.color,
            strokeOpacity: 0.5,
            strokeWeight: 4
        });

        polyline.setMap(targetMap);

        google.maps.event.addListener(polyline, 'mouseover', function(event) {
            if (hoveredPolyline) {
                hoveredPolyline.setOptions({strokeWeight: 4, strokeOpacity: 0.5});
            }
            polyline.setOptions({strokeWeight: 6, strokeOpacity: 0.8});
            hoveredPolyline = polyline;

            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${route.empresa}</h3><p>${route.description}</p>`,
                position: event.latLng
            });
            infoWindow.open(targetMap);
            
            google.maps.event.addListenerOnce(infoWindow, 'closeclick', function() {
                infoWindow.close();
            });

            google.maps.event.addListenerOnce(polyline, 'mouseout', function() {
                infoWindow.close();
                polyline.setOptions({strokeWeight: 4, strokeOpacity: 0.5});
                hoveredPolyline = null;
            });
        });

        google.maps.event.addListener(polyline, 'click', function(event) {
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${route.empresa}</h3><p>${route.description}</p>`,
                position: event.latLng
            });
            infoWindow.open(targetMap);
        });
    });
}   

function logout() {
    window.location.href = '../controllers/AuthController.php?logout=true';
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function navigate(section) {
    document.querySelectorAll('.menu li').forEach(item => item.classList.remove('active'));
    event.target.closest('li').classList.add('active');

    document.querySelectorAll('.content-section').forEach(el => el.style.display = 'none');
    document.getElementById('map').style.display = 'none';

    switch (section) {
        case 'inicio':
            document.getElementById('map').style.display = 'block';
            google.maps.event.trigger(map, 'resize');
            break;
        case 'buscar-ruta':
            document.getElementById('buscar-ruta').style.display = 'block';
            const routeMap = new google.maps.Map(document.getElementById('route-map'), {
                center: { lat: -12.0464, lng: -77.0428 },
                zoom: 13
            });
            directionsRenderer.setMap(routeMap);
            break;
        case 'ruta-tiempo-real':
            document.getElementById('ruta-tiempo-real').style.display = 'block';
            if (!realTimeMap) {
                realTimeMap = new google.maps.Map(document.getElementById('real-time-map'), {
                    center: { lat: -12.0464, lng: -77.0428 },
                    zoom: 12
                });
            }
            google.maps.event.trigger(realTimeMap, 'resize');
            simulateRealTimeRoutes();
            break;
        case 'mis-viajes':
            document.getElementById('mis-viajes').style.display = 'block';
            loadTrips();
            break;
        case 'notificaciones':
            document.getElementById('notificaciones').style.display = 'block';
            loadNotifications();
            break;
        case 'configuracion':
            document.getElementById('configuracion').style.display = 'block';
            break;
        default:
            console.log('Sección no reconocida');
    }
}

document.getElementById('route-search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    calculateRoutes(origin, destination);
});

function calculateRoutes(origin, destination) {
    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'TRANSIT',
        provideRouteAlternatives: true
    };
    directionsService.route(request, function (result, status) {
        if (status === 'OK') {
            displayMultipleRoutes(result);
        } else {
            alert('No se pudo calcular la ruta: ' + status);
        }
    });
}

function displayMultipleRoutes(result) {
    const routeMap = new google.maps.Map(document.getElementById('route-map'), {
        zoom: 7,
        center: result.routes[0].bounds.getCenter()
    });

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    let output = '<h3>Rutas disponibles:</h3>';

    result.routes.forEach((route, index) => {
        const renderer = new google.maps.DirectionsRenderer({
            map: routeMap,
            directions: result,
            routeIndex: index,
            polylineOptions: {
                strokeColor: colors[index % colors.length],
                strokeOpacity: 0.8,
                strokeWeight: 6
            }
        });

        output += `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <h4>Ruta ${index + 1}</h4>
            <p>Distancia: ${route.legs[0].distance.text}</p>
            <p>Duración estimada: ${route.legs[0].duration.text}</p>
            <p>Empresa: ${getRandomCompany()}</p>
            <button onclick="selectRoute(${index})">Seleccionar esta ruta</button>
        </div>`;
    });

    document.getElementById('route-results').innerHTML = output;
}

function getRandomCompany() {
    const companies = ['Empresa Anconero S.A.C', 'Empresa El Rápido', 'Empresa San felipe S.A.C', 'Empresa La nueva Estrella', 'Empresa Los chinos'];
    return companies[Math.floor(Math.random() * companies.length)];
}

function selectRoute(index) {
    alert(`Has seleccionado la ruta ${index + 1}`);
    // Aquí puedes agregar más funcionalidad, como guardar la ruta seleccionada
}

function loadTrips() {
    const viajes = [
        { fecha: '2024-07-01', origen: 'Casa', destino: 'Trabajo' },
        { fecha: '2024-06-30', origen: 'Trabajo', destino: 'Gimnasio' },
        { fecha: '2024-07-02', origen: 'Casa', destino: 'Universidad' }
    ];

    const viajesList = document.getElementById('viajes-list');
    viajesList.innerHTML = '';
    viajes.forEach(function (viaje) {
        const li = document.createElement('li');
        li.textContent = `${viaje.fecha}: ${viaje.origen} a ${viaje.destino}`;
        viajesList.appendChild(li);
    });
}

function loadNotifications() {
    const notifications = [
        { message: 'Tu bus llegará en 5 minutos', date: '2024-06-35 14:30' },
        { message: 'Retraso en la ruta 101', date: '2024-06-14 09:15' },
        { message: 'Otro bus llegará en 20 minutos, tiene asientos libres', date: '2024-07-02 18:00' }
    ];

    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '';
    notifications.forEach(function (notif) {
        const li = document.createElement('li');
        li.textContent = `${notif.date}: ${notif.message}`;
        notificationsList.appendChild(li);
    });
}

function simulateRealTimeRoutes() {
    const routes = RoutesModule.getRoutes();
    realTimeMarkers.forEach(marker => marker.setMap(null));
    realTimeMarkers = [];

    const selectedRouteIndex = document.getElementById('real-time-routes').value;
    if (selectedRouteIndex === "") return;

    const selectedRoute = routes[selectedRouteIndex];
    drawAllRoutes(realTimeMap);

    const busMarker = new google.maps.Marker({
        position: new google.maps.LatLng(selectedRoute.paraderos[0].lat, selectedRoute.paraderos[0].lng),
        map: realTimeMap,
        icon: {
            url: '../images/bus.jpg',
            scaledSize: new google.maps.Size(30, 30)
        },
        title: `Bus de ${selectedRoute.empresa}`
    });

    realTimeMarkers.push(busMarker);

    let paraderoIndex = 0;
    const path = selectedRoute.paraderos.map(p => new google.maps.LatLng(p.lat, p.lng));
    
    function moveBus() {
        if (paraderoIndex < path.length - 1) {
            const start = path[paraderoIndex];
            const end = path[paraderoIndex + 1];
            const steps = 100;
            let step = 0;

            function animate() {
                step++;
                if (step <= steps) {
                    const nextPosition = google.maps.geometry.spherical.interpolate(start, end, step / steps);
                    busMarker.setPosition(nextPosition);
                    realTimeMap.panTo(nextPosition);
                    setTimeout(animate, 500);
                } else {
                    paraderoIndex++;
                    if (paraderoIndex < path.length - 1) {
                        setTimeout(moveBus, 1000);
                    } else {
                        paraderoIndex = 0;
                        setTimeout(moveBus, 5000);
                    }
                }
            }

            animate();
        }
    }

    moveBus();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: realTimeMap,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new google.maps.Size(30, 30)
                    },
                    title: 'Tu ubicación'
                });

                function updateDistances() {
                    const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, busMarker.getPosition());
                    const infoWindow = new google.maps.InfoWindow({
                        content: `Distancia al bus: ${(distance / 1000).toFixed(2)} km`
                    });
                    infoWindow.open(realTimeMap, userMarker);
                }

                updateDistances();
                setInterval(updateDistances, 100000); // Actualizar cada 5 segundos
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

document.getElementById('config-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const notificationsEnabled = document.getElementById('notifications-enabled').checked;
    const darkMode = document.getElementById('dark-mode').checked;

    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    localStorage.setItem('darkMode', darkMode);

    alert('Configuración guardada');

    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

document.getElementById('real-time-routes').addEventListener('change', function (e) {
    const selectedRoute = e.target.value;
    if (selectedRoute !== "") {
        simulateRealTimeRoutes();
    }
});

function loadSavedConfig() {
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    const darkMode = localStorage.getItem('darkMode') === 'true';

    document.getElementById('notifications-enabled').checked = notificationsEnabled;
    document.getElementById('dark-mode').checked = darkMode;

    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

function populateRealTimeRoutes() {
    const routes = RoutesModule.getRoutes();
    const select = document.getElementById('real-time-routes');
    select.innerHTML = '<option value="">Selecciona una ruta</option>';
    routes.forEach((route, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${route.empresa}: ${route.description}`;
        select.appendChild(option);
    });
}

window.onload = function () {
    initMap();
    loadSavedConfig();
    populateRealTimeRoutes();
};