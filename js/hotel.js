// hotel.js
// Clean version: loads data from hotels.json and renders hotel cards with redirect links.

// ---------- State ----------
const state = {
  hotels: [],
  filtered: [],
  sortAsc: true,
  favorites: new Set()
};

// ---------- Helpers ----------
const $ = sel => document.querySelector(sel);

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[c]));
}

// ---------- Load data ----------
async function loadData() {
  try {
    const res = await fetch("hotels.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch hotels.json");
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("hotels.json must be an array");
    state.hotels = data;
  } catch (e) {
    console.error("Error loading hotels.json:", e);
    state.hotels = []; // empty if JSON missing
  }
  state.filtered = state.hotels.slice();
  populateCity();
  render();
}

// ---------- Populate city filter ----------
function populateCity() {
  const citySet = new Set(state.hotels.map(h => h.city).filter(Boolean));
  const sel = $("#city");
  sel.innerHTML = `<option value="">All cities</option>`;
  citySet.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

// ---------- Render hotels ----------
function render() {
  const c = $("#hotels-container");
  c.innerHTML = "";

  if (state.filtered.length === 0) {
    $("#empty").style.display = "block";
    return;
  } else {
    $("#empty").style.display = "none";
  }

  state.filtered.forEach(h => {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "media";
    media.style.backgroundImage = `url(${h.image || ""})`;

    const content = document.createElement("div");
    content.className = "content";

    content.innerHTML = `
      <div class="row">
        <div>
          <h3 class="title">${escapeHtml(h.name)}</h3>
          <div class="meta">${escapeHtml(h.city)} • <span style="font-weight:600">${h.rating}</span> ★</div>
        </div>
        <div style="text-align:right">
          <div class="price">₹${h.price}</div>
          <div class="meta" style="font-size:13px">per night</div>
        </div>
      </div>
      <p class="meta" style="margin-top:10px">${escapeHtml(h.desc || "")}</p>
    `;

    const cta = document.createElement("div");
    cta.className = "cta";

    // ✅ Book button redirects using link from JSON
    const book = document.createElement("a");
    book.className = "btn";
    book.textContent = "Book";
    book.href = h.link || "#";
    book.target = "_blank"; // open in new tab

    // ❤️ Favorites toggle
    const fav = document.createElement("button");
    fav.className = "btn ghost";
    fav.textContent = state.favorites.has(h.id) ? "♥" : "♡";
    fav.addEventListener("click", () => toggleFav(h, fav));

    cta.appendChild(book);
    cta.appendChild(fav);

    content.appendChild(cta);
    card.appendChild(media);
    card.appendChild(content);
    c.appendChild(card);
  });
}

// ---------- Favorites ----------
function toggleFav(h, btn) {
  if (state.favorites.has(h.id)) {
    state.favorites.delete(h.id);
    btn.textContent = "♡";
  } else {
    state.favorites.add(h.id);
    btn.textContent = "♥";
  }
}

// ---------- Filters / Sorting ----------
function applyFilters() {
  const q = $("#q").value.trim().toLowerCase();
  const city = $("#city").value;
  let arr = state.hotels.slice();

  if (city) arr = arr.filter(h => h.city === city);
  if (q) {
    arr = arr.filter(h =>
      (h.name || "").toLowerCase().includes(q) ||
      (h.desc || "").toLowerCase().includes(q) ||
      (h.city || "").toLowerCase().includes(q)
    );
  }

  arr.sort((a, b) => state.sortAsc ? a.price - b.price : b.price - a.price);

  state.filtered = arr;
  render();
}

// ---------- Events ----------
document.addEventListener("DOMContentLoaded", () => {
  loadData();

  $("#q").addEventListener("input", applyFilters);
  $("#city").addEventListener("change", applyFilters);

  $("#clear").addEventListener("click", () => {
    $("#q").value = "";
    $("#city").value = "";
    state.sortAsc = true;
    applyFilters();
  });

  $("#sort").addEventListener("click", e => {
    state.sortAsc = !state.sortAsc;
    e.target.textContent = state.sortAsc ? "Sort by price" : "Sort by price (desc)";
    applyFilters();
  });

  $("#open-favorites").addEventListener("click", () => {
    const ids = Array.from(state.favorites);
    if (ids.length === 0) return alert("No favorites yet.");
    const names = state.hotels
      .filter(h => ids.includes(h.id))
      .map(h => h.name)
      .join("\\n");
    alert("Favorites:\\n" + names);
  });
});
