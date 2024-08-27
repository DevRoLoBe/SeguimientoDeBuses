const RoutesModule = (() => {
    let map;
    let userMarker;
    let busMarkers = [];
    let routes = [
        {
            id: 1,
            empresa: "El Rápido",
            description: "Ruta Ate - Callao",
            color: "#FF0000",
            paraderos: [
                { nombre: "Ate (Salida)", lat: -12.0262, lng: -76.9191 },
                { nombre: "Santa Anita", lat: -12.0435, lng: -76.9714 },
                { nombre: "La Victoria", lat: -12.0653, lng: -77.0311 },
                { nombre: "Cercado de Lima", lat: -12.0464, lng: -77.0428 },
                { nombre: "Callao (Llegada)", lat: -12.0565, lng: -77.1181 }
            ]
        },
        {
            id: 2,
            empresa: "Lima Bus",
            description: "Ruta Chorrillos - San Juan de Lurigancho",
            color: "#00FF00",
            paraderos: [
                { nombre: "Chorrillos (Salida)", lat: -12.1679, lng: -77.0230 },
                { nombre: "Barranco", lat: -12.1494, lng: -77.0206 },
                { nombre: "Miraflores", lat: -12.1195, lng: -77.0299 },
                { nombre: "Lince", lat: -12.0909, lng: -77.0336 },
                { nombre: "SJL (Llegada)", lat: -11.9589, lng: -77.0057 }
            ]
        },
        {
            id: 3,
            empresa: "Metropolitano",
            description: "Ruta Independencia - Chorrillos",
            color: "#0000FF",
            paraderos: [
                { nombre: "Independencia (Salida)", lat: -11.9916, lng: -77.0587 },
                { nombre: "Los Olivos", lat: -11.9789, lng: -77.0709 },
                { nombre: "Centro de Lima", lat: -12.0548, lng: -77.0336 },
                { nombre: "Barranco", lat: -12.1372, lng: -77.0208 },
                { nombre: "Chorrillos (Llegada)", lat: -12.1747, lng: -77.0233 }
            ]
        },
        {
            id: 4,
            empresa: "San Felipe Express",
            description: "Ruta Comas - Villa El Salvador",
            color: "#FFFF00",
            paraderos: [
                { nombre: "Comas (Salida)", lat: -11.9490, lng: -77.0504 },
                { nombre: "Los Olivos", lat: -11.9789, lng: -77.0709 },
                { nombre: "San Miguel", lat: -12.0776, lng: -77.0824 },
                { nombre: "Surco", lat: -12.1416, lng: -76.9917 },
                { nombre: "VES (Llegada)", lat: -12.2136, lng: -76.9319 }
            ]
        },
        {
            id: 5,
            empresa: "Chosicano",
            description: "Ruta Chosica - Cercado de Lima",
            color: "#FF00FF",
            paraderos: [
                { nombre: "Chosica (Salida)", lat: -11.9430, lng: -76.6892 },
                { nombre: "Chaclacayo", lat: -11.9775, lng: -76.7692 },
                { nombre: "Ate", lat: -12.0262, lng: -76.9191 },
                { nombre: "La Victoria", lat: -12.0653, lng: -77.0311 },
                { nombre: "Cercado de Lima (Llegada)", lat: -12.0464, lng: -77.0428 }
            ]
        },
        {
            id: 6,
            empresa: "Línea Azul",
            description: "Ruta Ventanilla - La Molina",
            color: "#00FFFF",
            paraderos: [
                { nombre: "Ventanilla (Salida)", lat: -11.8594, lng: -77.1269 },
                { nombre: "Callao", lat: -12.0565, lng: -77.1181 },
                { nombre: "San Miguel", lat: -12.0776, lng: -77.0824 },
                { nombre: "San Borja", lat: -12.1086, lng: -76.9898 },
                { nombre: "La Molina (Llegada)", lat: -12.0686, lng: -76.9023 }
            ]
        }
        ,{
            id: 7,
            empresa: "El Anconero",
            description: "Ruta Terminal Conchitas (Ancón) - UPC Monterrico",
            color: "#800080", // Púrpura
            paraderos: [
                { nombre: "Terminal Conchitas - Ancón", lat: -11.7762, lng: -77.1702 },
                { nombre: "Villas De Ancón", lat: -11.7503, lng: -77.1631 },
                { nombre: "Control Ancón", lat: -11.7784, lng: -77.1747 },
                { nombre: "Óvalo Villa Estela", lat: -11.8167, lng: -77.1167 },
                { nombre: "Intercambio Vial Ventanilla", lat: -11.8736, lng: -77.1272 },
                { nombre: "Ovalo Zapallal", lat: -11.9181, lng: -77.0792 },
                { nombre: "Panamericana Norte, 2015", lat: -11.9594, lng: -77.0647 },
                { nombre: "Plaza Vea", lat: -11.9947, lng: -77.0614 },
                { nombre: "Mega Plaza", lat: -12.0106, lng: -77.0581 },
                { nombre: "Plaza Norte", lat: -12.0064, lng: -77.0583 },
                { nombre: "Caquetá", lat: -12.0389, lng: -77.0444 },
                { nombre: "Plaza Bolognesi / Alfonso Ugarte", lat: -12.0572, lng: -77.0369 },
                { nombre: "Plaza Jorge Chávez", lat: -12.0689, lng: -77.0378 },
                { nombre: "Rebagliati", lat: -12.0778, lng: -77.0394 },
                { nombre: "Plaza Real Salaverry", lat: -12.0900, lng: -77.0517 },
                { nombre: "Javier Prado", lat: -12.0894, lng: -77.0597 },
                { nombre: "Av. Salaverry / Av. Pezet", lat: -12.1000, lng: -77.0597 },
                { nombre: "Angamos Oeste", lat: -12.1119, lng: -77.0358 },
                { nombre: "Tomás Marsano", lat: -12.1269, lng: -76.9997 },
                { nombre: "Caminos Del Inca", lat: -12.1269, lng: -76.9864 },
                { nombre: "Puente Primavera", lat: -12.1102, lng: -76.9760 },
                { nombre: "Upc Monterrico", lat: -12.1019, lng: -76.9622 }
            ]
        }
    ];
     
    function initMap() {
        const initialLocation = { lat: -12.0464, lng: -77.0428 }; // Centro de Lima

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 11,
            center: initialLocation,
        });

        showRoleModal();
    }

    function drawRoutes() {
        const directionsService = new google.maps.DirectionsService();
    
        routes.forEach(route => {
            const waypoints = route.paraderos.slice(1, -1).map(paradero => ({
                location: new google.maps.LatLng(paradero.lat, paradero.lng),
                stopover: true
            }));
    
            const request = {
                origin: new google.maps.LatLng(route.paraderos[0].lat, route.paraderos[0].lng),
                destination: new google.maps.LatLng(route.paraderos[route.paraderos.length - 1].lat, route.paraderos[route.paraderos.length - 1].lng),
                waypoints: waypoints,
                travelMode: 'DRIVING'
            };
    
            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    const polyline = new google.maps.Polyline({
                        path: result.routes[0].overview_path,
                        strokeColor: route.color,
                        strokeOpacity: 0.5,
                        strokeWeight: 4
                    });
    
                    polyline.setMap(map);
    
                    google.maps.event.addListener(polyline, 'mouseover', function(event) {
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<h3>${route.empresa}</h3><p>${route.description}</p>`,
                            position: event.latLng
                        });
                        infoWindow.open(map);
                        
                        google.maps.event.addListenerOnce(infoWindow, 'closeclick', function() {
                            infoWindow.close();
                        });
                    });
    
                    route.paraderos.forEach((paradero, index) => {
                        const marker = new google.maps.Marker({
                            position: { lat: paradero.lat, lng: paradero.lng },
                            map: map,
                            title: paradero.nombre,
                            icon: {
                                url: index === 0 || index === route.paraderos.length - 1 
                                    ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                                    : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                scaledSize: new google.maps.Size(30, 30)
                            }
                        });
    
                        marker.addListener('click', () => {
                            const infoWindow = new google.maps.InfoWindow({
                                content: `
                                    <div>
                                        <h3>${route.empresa}</h3>
                                        <p>${route.description}</p>
                                        <p>Paradero: ${paradero.nombre}</p>
                                    </div>
                                `
                            });
                            infoWindow.open(map, marker);
                        });
                    });
                } else {
                    console.error(`Error al obtener la ruta: ${status}`);
                }
            });
        });
    }

    function showRoleModal() {
        const roleModal = document.getElementById('roleModal');
        roleModal.style.display = 'block';
    }

    function setRole(selectedRole) {
        const roleModal = document.getElementById('roleModal');
        roleModal.style.display = 'none';

        if (selectedRole === 'usuario') {
            showAllBuses();
            getCurrentLocation();
        } else if (selectedRole === 'bus') {
            showCompanyModal();
        }
    }

    function showAllBuses() {
        drawRoutes();
        routes.forEach(route => {
            for (let i = 0; i < 3; i++) {
                simulateBusMovement(route, i);
            }
        });
    }

    function showCompanyModal() {
        const companyModal = document.getElementById('companyModal');
        companyModal.style.display = 'block';

        const companySelect = document.getElementById('companySelect');
        companySelect.innerHTML = '';
        routes.forEach((route, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = route.empresa;
            companySelect.appendChild(option);
        });
    }

    function selectCompanyAndRoute() {
        const companySelect = document.getElementById('companySelect');
        const selectedRouteIndex = companySelect.value;
        const selectedRoute = routes[selectedRouteIndex];

        const companyModal = document.getElementById('companyModal');
        companyModal.style.display = 'none';

        showBusLocation(selectedRoute);
    }

    function showBusLocation(route) {
        const busLocation = route.paraderos[0]; // Comenzar desde el primer paradero
        const busMarker = createBusMarker(route, { lat: busLocation.lat, lng: busLocation.lng });
        map.setCenter({ lat: busLocation.lat, lng: busLocation.lng });
        map.setZoom(15);
    }

    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    updateUserLocation(userLocation);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    alert("No se pudo obtener tu ubicación. Usando ubicación predeterminada.");
                    updateUserLocation({ lat: -12.0464, lng: -77.0428 }); // Centro de Lima como ubicación predeterminada
                }
            );
        } else {
            alert("La geolocalización no es compatible con este navegador. Usando ubicación predeterminada.");
            updateUserLocation({ lat: -12.0464, lng: -77.0428 }); // Centro de Lima como ubicación predeterminada
        }
    }

    function updateUserLocation(location) {
        if (!userMarker) {
            userMarker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Tu ubicación',
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
        } else {
            userMarker.setPosition(location);
        }

        map.setCenter(location);
        updateNearestBuses(location);
    }

    function simulateBusMovement(route, delay) {
        let paraderoIndex = 0;
        const busMarker = createBusMarker(route, { lat: route.paraderos[0].lat, lng: route.paraderos[0].lng });
    
        busMarkers.push(busMarker);
    
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true
        });
    
        function moveBus() {
            if (paraderoIndex < route.paraderos.length - 1) {
                const start = route.paraderos[paraderoIndex];
                const end = route.paraderos[paraderoIndex + 1];
    
                const request = {
                    origin: new google.maps.LatLng(start.lat, start.lng),
                    destination: new google.maps.LatLng(end.lat, end.lng),
                    travelMode: 'DRIVING'
                };
    
                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                        const path = result.routes[0].overview_path;
                        let step = 0;
    
                        function animate() {
                            if (step < path.length) {
                                busMarker.setPosition(path[step]);
                                step++;
                                setTimeout(animate, 1000 + delay * 20);
                            } else {
                                paraderoIndex++;
                                if (paraderoIndex < route.paraderos.length - 1) {
                                    setTimeout(moveBus, 10000);
                                } else {
                                    paraderoIndex = 0;
                                    setTimeout(moveBus, 18000);
                                }
                            }
                        }
    
                        animate();
                    }
                });
            }
        }
    
        setTimeout(moveBus, delay * 5000);
    }

    function createBusMarker(route, position) {
        const busMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: `Bus de ${route.empresa}`,
            icon: {
                url: '../images/bus.jpg',
                scaledSize: new google.maps.Size(30, 30)
            }
        });
    
        const driverNames = ['Juan Pérez', 'María González', 'Carlos Rodríguez'];
        const licensePlates = ['ABC-123', 'DEF-456', 'GHI-789'];
    
        busMarker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <h3>Información del Bus</h3>
                    <p>Empresa: ${route.empresa}</p>
                    <p>Conductor: ${driverNames[Math.floor(Math.random() * driverNames.length)]}</p>
                    <p>Placa: ${licensePlates[Math.floor(Math.random() * licensePlates.length)]}</p>
                    <p>Velocidad: ${Math.floor(Math.random() * (90 - 10 + 1)) + 10} km/h</p>
                    <img src="../images/${route.empresa.toLowerCase().replace(/\s+/g, '_')}.jpg" alt="${route.empresa}" style="width:100px;height:auto;">
                `
            });
            infoWindow.open(map, busMarker);
        });
    
        return busMarker;
    }

    let busInfoWindow = null;
    function updateNearestBuses(userLocation) {
        const userLatLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);
        
        let content = '<div id="busInfo">';
        
        busMarkers.forEach(busMarker => {
            const busPosition = busMarker.getPosition();
            const distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, busPosition);
            const speed = Math.floor(Math.random() * (90 - 10 + 1)) + 10; // Velocidad aleatoria entre 10 y 90 km/h
            const time = Math.round(distance / (speed * 1000 / 3600));

            content += `
                <h3>${busMarker.getTitle()}</h3>
                <p>Distancia: ${distance.toFixed(2)} metros</p>
                <p>Velocidad: ${speed} km/h</p>
                <p>Tiempo estimado: ${time} segundos</p>
                <hr>
            `;
        });

        content += '</div>';

        if (busInfoWindow) {
            busInfoWindow.setContent(content);
        } else {
            busInfoWindow = new google.maps.InfoWindow({
                content: content,
                position: userLocation
            });
            busInfoWindow.open(map);
        }
    }

    return {
        initMap,
        setRole,
        selectCompanyAndRoute,
        getRoutes: () => routes,
        simulateBusMovement
    };
})();

window.initMap = RoutesModule.initMap;