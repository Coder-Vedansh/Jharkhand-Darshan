// Initialize map centered on Jharkhand
const map = L.map('jharkhand-map').setView([23.61, 85.27], 7);

// Add OpenStreetMap tiles (Free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Tourist spots data
const places = [
  { name: "Ranchi - Capital City", coords: [23.3441, 85.3096], info: "Known as the 'City of Waterfalls'. Nearby: Hundru, Dassam, Jonha Falls." },
  { name: "Netarhat", coords: [23.4786, 84.2714], info: "Called the 'Queen of Chotanagpur'. Famous for sunrise and sunset points." },
  { name: "Betla National Park", coords: [23.8353, 84.1928], info: "Wildlife sanctuary with tigers, elephants, and deer." },
  { name: "Deoghar (Baidyanath Dham)", coords: [24.4828, 86.6945], info: "One of the 12 Jyotirlingas, a major pilgrimage site." },
  { name: "Parasnath Hill", coords: [23.95, 86.15], info: "Important Jain pilgrimage site and the highest hill in Jharkhand." },
  { name: "Patratu Valley", coords: [23.68, 85.28], info: "Scenic valley road trip destination with winding roads." },
  { name: "Jamshedpur", coords: [22.8046, 86.2029], info: "Industrial city, home to Tata Steel, Jubilee Park, and Dimna Lake." }
];

// Add markers to the map
places.forEach(place => {
  L.marker(place.coords)
    .addTo(map)
    .bindPopup(`<b>${place.name}</b><br>${place.info}`);
});
