// ------------------ CONFIG ------------------
// Your ORS API key (you gave this earlier)
const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjM5OTA4ZTQ4ZmIwODQ0MGRiZjI3OTlmNjBjNDI2YTM0IiwiaCI6Im11cm11cjY0In0=";

// ------------------ GLOBALS ------------------
let map;
let userLocation = null;        // [lat, lng]
let userMarker = null;
let destMarker = null;
let routeLayer = null;
let routeGeo = null;            // raw route geometry (array of [lon, lat])
let instructionsDiv;

// ------------------ UTIL ------------------
function fmtDistance(meters){
  if (meters >= 1000) return (meters/1000).toFixed(1) + " km";
  return Math.round(meters) + " m";
}
function fmtDuration(seconds){
  if (seconds >= 60){
    const m = Math.floor(seconds/60);
    const s = Math.round(seconds%60);
    return (s === 0) ? `${m} min` : `${m} min ${s}s`;
  } else {
    return `${Math.round(seconds)} s`;
  }
}

// ------------------ MAP & LOCATION ------------------
function initMap(){
  map = L.map('map').setView([28.7041,77.1025], 7); // fallback center (Delhi)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  instructionsDiv = document.getElementById('instructions');

  // try to fetch current location
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      userLocation = [pos.coords.latitude, pos.coords.longitude];
      map.setView(userLocation, 13);
      if (userMarker) userMarker.remove();
      userMarker = L.marker(userLocation).addTo(map).bindPopup("You are here").openPopup();
    }, err => {
      console.warn("Geolocation error:", err);
      instructionsDiv.innerText = "Location access denied or unavailable. Enter destination and we'll route from the default location.";
    }, { enableHighAccuracy: true, maximumAge: 60_000 });
  } else {
    instructionsDiv.innerText = "Geolocation not supported by this browser.";
  }

  // UI hooks
  document.getElementById('routeBtn').addEventListener('click', onRouteClick);
  document.getElementById('recenterBtn').addEventListener('click', () => {
    if (userLocation) map.setView(userLocation, 13);
  });
}

async function onRouteClick(){
  const destText = document.getElementById('destination').value.trim();
  if (!destText){
    alert("Enter a destination name (e.g. Agra).");
    return;
  }
  // ensure we have a start location (fallback to centered map if geolocation didn't work)
  let startLatLng = userLocation;
  if (!startLatLng){
    const center = map.getCenter();
    startLatLng = [center.lat, center.lng];
  }
  try {
    setInstructionsMessage("Geocoding destination...");
    const destCoords = await geocodePlace(destText); // returns [lng, lat]
    setInstructionsMessage("Fetching route...");
    const routeData = await fetchRoute([startLatLng[1], startLatLng[0]], destCoords); // start lng,lat ; dest lng,lat
    renderRoute(routeData, destText);
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
    setInstructionsMessage("No route. See console for details.");
  }
}

// ------------------ GEOCODING ------------------
async function geocodePlace(placeName){
  // GET geocode results (Pelias) - return first match
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(placeName)}&size=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding request failed: " + res.status);
  const data = await res.json();
  if (!data.features || data.features.length === 0) throw new Error("Place not found: " + placeName);
  return data.features[0].geometry.coordinates; // [lng, lat]
}

// ------------------ DIRECTIONS ------------------
async function fetchRoute(startLngLat, endLngLat){
  // startLngLat and endLngLat = [lng, lat]
  // using GET with api_key query param (suitable for browser). You can switch to POST + Authorization header if you prefer.
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLngLat[0]},${startLngLat[1]}&end=${endLngLat[0]},${endLngLat[1]}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Directions request failed: " + res.status);
  const data = await res.json();
  if (!data.features || data.features.length === 0) throw new Error("No route returned");
  return data.features[0]; // geojson feature containing geometry + properties.segments
}

// ------------------ RENDER ROUTE & INSTRUCTIONS ------------------
function setInstructionsMessage(msg){
  instructionsDiv.innerHTML = `<div style="padding:10px;color:#444">${msg}</div>`;
}
function clearRoute(){
  if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
  if (destMarker) { map.removeLayer(destMarker); destMarker = null; }
  // don't remove user marker
  instructionsDiv.innerHTML = "";
  routeGeo = null;
}

function renderRoute(feature, destName){
  clearRoute();

  // geometry: array of [lng, lat]
  routeGeo = feature.geometry.coordinates; // raw geometry order = [lng,lat]
  const latlngs = routeGeo.map(c => [c[1], c[0]]);

  // draw polyline
  routeLayer = L.polyline(latlngs, {color:"#1e88e5", weight:5, opacity:0.9}).addTo(map);
  map.fitBounds(routeLayer.getBounds(), {padding:[40,40]});

  // mark destination
  const last = latlngs[latlngs.length - 1];
  destMarker = L.marker(last).addTo(map).bindPopup(destName);

  // extract steps from segments
  const segments = (feature.properties && feature.properties.segments) || [];
  let allSteps = [];
  for (const seg of segments){
    if (seg.steps && Array.isArray(seg.steps)) allSteps = allSteps.concat(seg.steps);
  }

  if (allSteps.length === 0){
    setInstructionsMessage("Route found, but no turn-by-turn steps available.");
    return;
  }

  // render instructions list
  instructionsDiv.innerHTML = ""; // clear
  const list = document.createElement('div');
  list.style.paddingBottom = "30px";

  allSteps.forEach((step, idx) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'step';
    stepEl.dataset.index = idx;

    // text + meta
    const instr = document.createElement('div');
    instr.className = 'instr';
    instr.innerText = step.instruction || "(no instruction)";

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerText = `${fmtDistance(step.distance || 0)} · ${fmtDuration(step.duration || 0)}`;

    stepEl.appendChild(instr);
    stepEl.appendChild(meta);

    // click behavior: pan to the step's start point using way_points index
    stepEl.addEventListener('click', () => {
      // remove active class from others
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      stepEl.classList.add('active');

      // find coordinate to focus: use way_points[0] if provided
      if (step.way_points && step.way_points.length){
        const idxGeo = step.way_points[0];
        if (routeGeo && routeGeo[idxGeo]){
          const lonlat = routeGeo[idxGeo]; // [lng, lat]
          const latlon = [lonlat[1], lonlat[0]];
          map.setView(latlon, 16);
          L.circleMarker(latlon, {radius:6, fill:true, fillColor:"#1e88e5", color:"#fff", weight:2}).addTo(map)
            .bindPopup(step.instruction).openPopup()
            .on('popupclose', function(e){ this.remove(); });
        }
      } else {
        // fallback: pan to center of route
        map.setView(routeLayer.getBounds().getCenter(), 14);
      }

      // scroll clicked step into view inside instructions container
      stepEl.scrollIntoView({behavior:'smooth', block:'center'});
    });

    list.appendChild(stepEl);
  });

  instructionsDiv.appendChild(list);

  // show summary at top (distance/duration)
  const summary = feature.properties && feature.properties.summary;
  if (summary){
    const summaryEl = document.createElement('div');
    summaryEl.style.fontSize = "13px";
    summaryEl.style.color = "#444";
    summaryEl.style.marginBottom = "8px";
    summaryEl.innerText = `Total: ${fmtDistance(summary.distance || 0)} · ${fmtDuration(summary.duration || 0)}`;
    instructionsDiv.prepend(summaryEl);
  }
}

// ------------------ BOOT ------------------
window.addEventListener('load', initMap);
