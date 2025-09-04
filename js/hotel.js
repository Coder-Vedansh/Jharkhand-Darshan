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

// === Simple Tourism Chatbot ===
const messages = document.getElementById("chat-messages");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Only run chatbot logic if chatbox exists (so it doesn’t break on pages without it)
if (messages && input && sendBtn) {
  const responses = [
    {
      keywords: ["hi", "hello", "hey", "namaste"],
      reply: "👋 Hello! Welcome to Jharkhand Tourism Guide. How can I help you today?"
    },
    {
      keywords: ["hotel", "hotels", "stay", "accommodation", "resort"],
      reply: "🏨 Jharkhand offers many hotels by city:\n\n" +
             "📍 Ranchi – Radisson Blu, Capitol Hill, Green Horizon\n" +
             "📍 Jamshedpur – The Sonnet, Ramada, Ginger Hotel\n" +
             "📍 Deoghar – Amrapali Clarks Inn, Yashoda International\n" +
             "📍 Netarhat – Netarhat Tourist Lodge\n\n" +
             "👉 <a href='hotels.html' class='btn-link'>View Hotels Guide</a>"
    },
    {
      keywords: ["luxury hotel", "5 star", "resort", "premium stay"],
      reply: "✨ Top **luxury hotels in Jharkhand**:\n- Radisson Blu (Ranchi)\n- The Sonnet (Jamshedpur)\n- Capitol Residency (Ranchi)\n\n" +
             "👉 <a href='hotels.html' class='btn-link'>Explore Luxury Hotels</a>"
    },
    {
      keywords: ["budget hotel", "cheap stay", "low cost", "affordable"],
      reply: "💰 **Budget stays** include:\n- Hotel Green Horizon (Ranchi)\n- Hotel Alcor (Jamshedpur)\n- Hotel Ashoka Inn (Deoghar)\n\n" +
             "👉 <a href='hotels.html' class='btn-link'>See Budget Hotels</a>"
    },
    {
      keywords: ["place", "tourist", "visit", "sightseeing"],
      reply: "🌍 Must-visit in Jharkhand:\n- Netarhat (Queen of Chotanagpur)\n- Betla National Park\n- Parasnath Hill\n- Deoghar Temple\n- Patratu Valley"
    },
    {
      keywords: ["food", "cuisine", "eat"],
      reply: "🍲 Jharkhand special dishes: Dhuska, Thekua, Rugra, Chilka Roti, Handia (rice beer)."
    },
    {
      keywords: ["festival", "festivals", "sarhul", "karma", "sohrai", "tusu"],
      reply: "🎉 Jharkhand festivals:\n- Sarhul (nature worship)\n- Karma (folk dance festival)\n- Sohrai (harvest)\n- Tusu (folk harvest festival)"
    },
    {
      keywords: ["wildlife", "animals", "sanctuary", "park"],
      reply: "🦌 Wildlife:\n- Betla National Park (tigers, elephants)\n- Dalma Sanctuary (elephants, deer)\n- Hazaribagh Sanctuary (sloth bears, leopards)"
    },
    {
      keywords: ["about website", "guide"],
      reply: "🌐 This site is your **Jharkhand Tourism Guide** – helping you explore places, hotels, culture, and maps."
    }
  ];

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = text; // supports links
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "❓ Sorry, I don’t know that. Try asking about hotels, tourist spots, culture, or food.";
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

  // Floating Chat Toggle
  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");

  if (chatToggle && chatbox && chatClose) {
    chatToggle.addEventListener("click", () => {
      chatbox.classList.toggle("hidden");
      if (!chatbox.classList.contains("hidden") && messages.childElementCount === 0) {
        addMessage("👋 Hi! I’m your Jharkhand Travel Assistant. Ask me about hotels, places, or culture!", "bot");
      }
    });

    chatClose.addEventListener("click", () => {
      chatbox.classList.add("hidden");
    });
  }
}
