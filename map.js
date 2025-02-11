// Initialize the map centered on Buffalo
const map = L.map('map').setView([42.992017,-78.697018], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for each location
// Add console logs for debugging
locations.forEach(location => {
    console.log('Adding marker for:', location.name);
    
    const marker = L.marker(location.coordinates)
        .addTo(map);
    
    const popupContent = L.DomUtil.create('div', 'popup-content');
    popupContent.innerHTML = `
        <b>${location.name}</b><br>
        <button class="popup-button" onclick="showLocationInfo(${location.id})">Click for more info</button>
    `;
    
    console.log('Created popup for:', location.name);
    marker.bindPopup(popupContent);
});

// Add debug logging to showLocationInfo
function showLocationInfo(locationId) {
    console.log('showLocationInfo called with ID:', locationId);
    
    const location = findLocationById(locationId);
    console.log('Found location:', location);
    
    if (!location) {
        console.error('Location not found for ID:', locationId);
        return;
    }

    const infoPanel = document.getElementById('location-info');
    const titleElement = document.getElementById('location-title');
    const imagesContainer = document.getElementById('location-images');
    const descriptionElement = document.getElementById('location-description');
    
    console.log('Found DOM elements:', {
        infoPanel: !!infoPanel,
        titleElement: !!titleElement,
        imagesContainer: !!imagesContainer,
        descriptionElement: !!descriptionElement
    });

    titleElement.textContent = location.name;
    
    imagesContainer.innerHTML = '';
    location.images.forEach(imagePath => {
        console.log('Adding image:', imagePath);
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = location.name;
        imagesContainer.appendChild(img);
    });
    
    descriptionElement.textContent = location.description;
    infoPanel.classList.remove('hidden');
    console.log('Info panel should now be visible');
}

function findLocationById(id) {
    return locations.find(location => location.id === id);
}
// ... existing code ...

// Update the close button functionality
document.getElementById('close-info').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default button behavior
    e.stopPropagation(); // Prevent event from bubbling up
    document.getElementById('location-info').classList.add('hidden');
});

// Optional: Add ability to close by clicking outside the panel
document.addEventListener('click', (e) => {
    const infoPanel = document.getElementById('location-info');
    const clickedElement = e.target;
    
    // If the info panel is visible and click is outside the panel
    if (!infoPanel.classList.contains('hidden') && 
        !infoPanel.contains(clickedElement) && 
        !clickedElement.closest('.leaflet-popup') && 
        !clickedElement.closest('.leaflet-marker-icon')) {
        infoPanel.classList.add('hidden');
    }
});

// Prevent clicks inside the info panel from closing it
document.getElementById('location-info').addEventListener('click', (e) => {
    e.stopPropagation();
});