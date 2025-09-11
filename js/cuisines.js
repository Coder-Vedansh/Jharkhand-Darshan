const dishes = [
  {
    id: 1,
    name: 'Litti Chokha',
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=60',
    type: 'main',
    region: 'Rural Jharkhand & Bihar',
    desc: 'Roasted wheat balls stuffed with spiced sattu (roasted gram) served with mashed roasted vegetables (chokha).'
  },
  {
    id: 2,
    name: 'Dhuska',
    img: 'https://images.unsplash.com/photo-1585238342020-6a8b6b6b6b6b?auto=format&fit=crop&w=800&q=60',
    type: 'snack',
    region: 'Tribal areas',
    desc: 'A savory deep-fried pancake made from fermented rice and lentil batter.'
  },
  {
    id: 3,
    name: 'Pitha',
    img: 'https://images.unsplash.com/photo-1604908177522-6f1a2b1b1b1b?auto=format&fit=crop&w=800&q=60',
    type: 'sweet',
    region: 'Festive',
    desc: 'Rice-based cakes with sweet or savory fillings. Varieties vary by community.'
  },
  {
    id: 4,
    name: 'Bamboo Shoot Curry (Khatta)',
    img: 'https://images.unsplash.com/photo-1598511723740-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=60',
    type: 'main',
    region: 'Forest & tribal cuisine',
    desc: 'Tangy curry made with bamboo shoots, often cooked with pork or freshwater fish in some communities.'
  }
];

// --- Helpers ---
function el(id) {
  return document.getElementById(id);
}

// --- Rendering ---
function renderList(list) {
  const container = el('results');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p class="meta">No dishes found — try a different keyword.</p>';
    return;
  }

  list.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${d.img}" alt="${d.name}" />
      <h3>${d.name}</h3>
      <div class="meta">${d.region} • ${d.type}</div>
      <p class="meta">${d.desc}</p>
      <div class="actions">
        <button class="btn" onclick="showRecipe(${d.id})">View</button>
        <button class="btn primary" onclick="saveFav(${d.id})">Save</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- Dish Actions ---
function showRecipe(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return alert('Dish not found');
  alert(`${d.name}\n\nRegion: ${d.region}\nType: ${d.type}\n\n${d.desc}`);
}

function saveFav(id) {
  const favs = JSON.parse(localStorage.getItem('favDishes') || '[]');
  if (favs.includes(id)) return alert('Already saved');
  favs.push(id);
  localStorage.setItem('favDishes', JSON.stringify(favs));
  alert('Saved to favourites');
}

// --- Search ---
function doSearch() {
  const q = el('q').value.trim().toLowerCase();
  const f = el('filter').value;

  const res = dishes.filter(d => {
    const inQ =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q);
    const inF = f === 'all' ? true : d.type === f;
    return inQ && inF;
  });

  renderList(res);
}

// --- Setup ---
// Search button
el('searchBtn').addEventListener('click', doSearch);

// Enter key search
el('q').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// Quick focus button
el('open-search').addEventListener('click', () => {
  el('q').focus();
});

// Initial render
renderList(dishes);

// Footer year
el('year').textContent = new Date().getFullYear();
