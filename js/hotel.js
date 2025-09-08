// === Sidebar Menu ===
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
  const main = document.getElementById("main");
  if (main) main.style.marginLeft = "250px";
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
  const main = document.getElementById("main");
  if (main) main.style.marginLeft = "0";
}

// === Hotels from Database (JSON file) ===
const hotelsContainer = document.getElementById("hotels-container");
const searchInput = document.getElementById("hotel-search");
const cityFilter = document.getElementById("city-filter");

let allHotels = [];

// Render Hotels
function renderHotels(list) {
  hotelsContainer.innerHTML = "";
  if (list.length === 0) {
    hotelsContainer.innerHTML = "<p>No hotels found.</p>";
    return;
  }
  list.forEach(h => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
      <div class="hotel-card">
        <img src="${h.image}" alt="${h.name}" class="hotel-img"/>
        <h2>${h.name} <small class="text-muted">(${h.city})</small></h2>
        <p><strong>Address:</strong> ${h.address}</p>
        <p><strong>⭐ Rating:</strong> ${"★".repeat(h.stars)} (${h.stars} Star)</p>
        <p><strong>Check-in:</strong> ${h.checkin} | <strong>Check-out:</strong> ${h.checkout}</p>
        <p>${h.desc}</p>
        <a href="${h.link}" target="_blank" class="book-btn">Book Now</a>
      </div>
    `;
    hotelsContainer.appendChild(col);
  });
}

// Filter + Search
function filterHotels() {
  const query = searchInput.value.toLowerCase();
  const city = cityFilter.value;
  let filtered = allHotels;

  if (city !== "all") {
    filtered = filtered.filter(h => h.city === city);
  }
  if (query) {
    filtered = filtered.filter(h => 
      h.name.toLowerCase().includes(query) ||
      h.address.toLowerCase().includes(query)
    );
  }
  renderHotels(filtered);
}

// Load from hotels_full.json
fetch("hotels.json")
  .then(res => res.json())
  .then(data => {
    allHotels = data;

    // Populate city dropdown dynamically
    const cities = [...new Set(allHotels.map(h => h.city))];
    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      cityFilter.appendChild(opt);
    });

    renderHotels(allHotels);
  });

// Search & filter events
searchInput.addEventListener("input", filterHotels);
cityFilter.addEventListener("change", filterHotels);

// === Chatbot (unchanged, trimmed version) ===
const messages = document.getElementById("chat-messages");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

if (messages && input && sendBtn) {
  const responses = [
    {
      keywords: ["hi", "hello"],
      reply: "👋 Hello! Welcome to Jharkhand Tourism Hotels Guide."
    },
    {
      keywords: ["hotel", "stay"],
      reply: "🏨 Use the search and filters above to explore 1000+ hotels in Jharkhand."
    },
    {
      keywords: ["places", "visit"],
      reply: "🌍 Top attractions: Netarhat, Betla National Park, Parasnath Hill, Patratu Valley."
    }
  ];

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "❓ Sorry, I don’t know that. Try asking about hotels, places, or culture.";
    for (let item of responses) {
      if (item.keywords.some(word => lower.includes(word))) {
        reply = item.reply;
        break;
      }
    }
    addMessage(reply, "bot");
  }

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      addMessage(text, "user");
      botReply(text);
      input.value = "";
    }
  });

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
  });

  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");

  if (chatToggle && chatbox && chatClose) {
    chatToggle.addEventListener("click", () => {
      chatbox.classList.toggle("hidden");
      if (!chatbox.classList.contains("hidden") && messages.childElementCount === 0) {
        addMessage("👋 Hi! I’m your Jharkhand Travel Assistant.", "bot");
      }
    });

    chatClose.addEventListener("click", () => {
      chatbox.classList.add("hidden");
    });
  }
}
