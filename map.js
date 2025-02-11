document.addEventListener('DOMContentLoaded', function() {
    const welcomePanel = document.getElementById('welcome-info');
    const locationPanel = document.getElementById('location-info');
    
    locationPanel.classList.add('hidden');
    
    document.getElementById('welcome-close').addEventListener('click', () => {
        welcomePanel.classList.add('hidden');
    });
    
    document.getElementById('start-exploring').addEventListener('click', () => {
        welcomePanel.classList.add('hidden');
    });

    const map = L.map('map').setView([42.992017,-78.697018], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    locations.forEach(location => {
        const marker = L.marker(location.coordinates)
            .addTo(map);
        
        const popupContent = L.DomUtil.create('div', 'popup-content');
        const imagesHtml = location.images.map(img => 
            `<div class="image-wrapper"><img src="${img}" alt="${location.name}"></div>`
        ).join('');
        
        popupContent.innerHTML = `
            <div class="popup-heart-top">❤️</div>
            <b>${location.name}</b>
            <div class="popup-images">${imagesHtml}</div>
            <p>${location.description}</p>
            <div class="popup-heart-bottom">❤️</div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 800,
            maxHeight: 600,
            className: 'custom-popup'
        });
    });
});

window.showLocationInfo = function(locationId) {
    const location = findLocationById(locationId);
    if (!location) return;

    const infoPanel = document.getElementById('location-info');
    const titleElement = document.getElementById('location-title');
    const imagesContainer = document.getElementById('location-images');
    const descriptionElement = document.getElementById('location-description');
    
    titleElement.textContent = location.name;
    
    imagesContainer.innerHTML = '';
    location.images.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = location.name;
        imagesContainer.appendChild(img);
    });
    
    descriptionElement.textContent = location.description;
    infoPanel.classList.remove('hidden');
};

window.findLocationById = function(id) {
    return locations.find(location => location.id === id);
};

document.getElementById('close-info').addEventListener('click', () => {
    document.getElementById('location-info').classList.add('hidden');
});

document.addEventListener('click', (e) => {
    const infoPanel = document.getElementById('location-info');
    const clickedElement = e.target;
    
    if (!infoPanel.classList.contains('hidden') && 
        !infoPanel.contains(clickedElement) && 
        !clickedElement.closest('.leaflet-popup') && 
        !clickedElement.closest('.leaflet-marker-icon')) {
        infoPanel.classList.add('hidden');
    }
});

document.getElementById('location-info').addEventListener('click', (e) => {
    e.stopPropagation();
});