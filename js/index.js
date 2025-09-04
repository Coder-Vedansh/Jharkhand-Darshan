// === Tourism Chatbot for Jharkhand ===
const messages = document.getElementById("chat-messages");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Tourism-focused responses with multiple triggers
const responses = [
  {
    keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening"],
    reply: "👋 Hello and welcome to Jharkhand Tourism Guide! I can help you with places to visit, best time to travel, culture, food, festivals, and more. What would you like to know?"
  },
  {
    keywords: ["capital", "ranchi"],
    reply: "🏙️ The capital of Jharkhand is **Ranchi**, often called the ‘City of Waterfalls’. Ranchi is a hub for visitors with nearby attractions like Hundru Falls, Dassam Falls, and Tagore Hill."
  },
  {
    keywords: ["best time", "weather", "season", "when visit"],
    reply: "🌤️ The best time to visit Jharkhand is **October to March**. The weather is cool and pleasant, perfect for exploring waterfalls, national parks, and hill towns like Netarhat."
  },
  {
    keywords: ["waterfall", "falls", "hundru", "dassam", "jonha", "panchghagh"],
    reply: "💦 Jharkhand is famous for its spectacular waterfalls. Popular ones include:\n- **Hundru Falls** (43 km from Ranchi)\n- **Dassam Falls** (40 km from Ranchi)\n- **Jonha Falls** (40 km from Ranchi)\n- **Panchghagh Falls** (60 km from Ranchi).\nEach is surrounded by lush greenery and is a must-visit for nature lovers."
  },
  {
    keywords: ["festival", "festivals", "sarhul", "karma", "sohrai", "tusu"],
    reply: "🎉 Jharkhand’s culture is deeply rooted in its festivals:\n- **Sarhul** (spring festival of nature)\n- **Karma** (celebrated with dance and music around the Karma tree)\n- **Sohrai** (harvest festival with beautiful wall paintings)\n- **Tusu** (folk festival of harvest in winter).\nThese are great times to experience tribal traditions and local joy."
  },
  {
    keywords: ["food", "cuisine", "eat", "dish", "dishes"],
    reply: "🍲 Jharkhand offers unique and delicious local food:\n- **Dhuska** (fried rice-lentil bread)\n- **Thekua** (sweet snack during festivals)\n- **Chilka Roti** (rice-based roti)\n- **Rugra** (a seasonal mushroom delicacy)\n- **Handia** (fermented rice drink).\nDon’t miss tasting these when you visit!"
  },
  {
    keywords: ["wildlife", "animals", "sanctuary", "park", "forest"],
    reply: "🦌 Jharkhand is rich in forests and wildlife. Top spots include:\n- **Betla National Park** (tigers, elephants, bison)\n- **Dalma Wildlife Sanctuary** (elephants, deer, birds)\n- **Hazaribagh Wildlife Sanctuary** (sloth bears, leopards).\nPerfect for eco-tourism and jungle safaris!"
  },
  {
    keywords: ["culture", "tradition", "dance", "tribal"],
    reply: "🎭 Jharkhand’s culture is vibrant and tribal heritage is strong. You’ll see traditional dances like **Chhau** (a martial dance), **Karma**, and **Jhumair**. Handicrafts made of bamboo, wood, and tribal paintings are also worth exploring."
  },
  {
    keywords: ["mines", "mineral", "industry", "coal"],
    reply: "⛏️ Jharkhand is known as the **Land of Minerals**. It has rich reserves of coal, iron ore, copper, bauxite, and uranium. Industrial towns like **Jamshedpur**, known for Tata Steel, highlight its importance in India’s economy."
  },
  {
    keywords: ["place", "tourist", "visit", "sightseeing", "destination"],
    reply: "🌍 Top tourist destinations in Jharkhand:\n- **Netarhat** (Queen of Chotanagpur hills, sunrise/sunset views)\n- **Betla National Park** (wildlife & safari)\n- **Parasnath Hill** (important Jain pilgrimage site)\n- **Deoghar** (Baidyanath Temple, one of the 12 Jyotirlingas)\n- **Patratu Valley** (scenic road trip).\nEach place offers a different flavor of Jharkhand."
  },
  {
    keywords: ["how reach", "reach jharkhand", "travel", "transport"],
    reply: "🚆✈️ Jharkhand is well connected:\n- **By Air**: Ranchi has the main airport with flights from major Indian cities.\n- **By Train**: Ranchi, Dhanbad, Jamshedpur, and Hazaribagh are major railway hubs.\n- **By Road**: National Highways connect Jharkhand to Kolkata, Patna, and other states."
  },
  {
    keywords: ["about website", "this site", "your website", "guide"],
    reply: "🌐 This website is your **Jharkhand Tourism Guide** – designed to help travelers discover attractions, culture, food, festivals, hotels, and maps of Jharkhand. Use it to plan your perfect trip!"
  }
];

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function botReply(userText) {
  const lower = userText.toLowerCase();
  let reply = "❓ I’m not sure about that. Try asking about Jharkhand’s **places, food, culture, wildlife, or festivals**.";

  for (let item of responses) {
    if (item.keywords.some(word => lower.includes(word))) {
      reply = item.reply;
      break;
    }
  }

  addMessage(reply, "bot");
}

// Handle send
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    addMessage(text, "user");
    botReply(text);
    input.value = "";
  }
});

// Handle Enter key
input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// === Floating Chat Toggle & Close ===
const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const chatClose = document.getElementById("chat-close");

chatToggle.addEventListener("click", () => {
  chatbox.classList.toggle("hidden");

  // Show welcome message only once when opened
  if (!chatbox.classList.contains("hidden") && messages.childElementCount === 0) {
    addMessage("👋 Hi! I’m your Jharkhand Travel Assistant. Ask me about tourist places, waterfalls, food, culture, or how to plan your trip!", "bot");
  }
});

chatClose.addEventListener("click", () => {
  chatbox.classList.add("hidden");
});

// === Sidebar Menu ===
function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  if (sidebar) sidebar.style.width = "250px";
  if (main) main.style.marginLeft = "250px"; // only shift if main exists
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  if (sidebar) sidebar.style.width = "0";
  if (main) main.style.marginLeft = "0"; // only shift if main exists
}
