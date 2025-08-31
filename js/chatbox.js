// ==== Navbar Toggle ====
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// ==== Chatbox Toggle ====
const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeBtn = document.getElementById("close-btn");

chatToggle.addEventListener("click", () => {
  chatbox.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  chatbox.style.display = "none";
});

// ==== Chatbot Logic ====
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Predefined answers
const responses = {
  "hello": "Hi 👋! Welcome to Jharkhand Tourism.",
  "hi": "Hello there! Ask me about Jharkhand, hotels, or maps.",
  "jharkhand": "Jharkhand is known as 'The Land of Forests'. It is rich in waterfalls, wildlife, and tribal culture.",
  "capital": "The capital of Jharkhand is Ranchi.",
  "hotels": "We offer top hotels and stays in Ranchi, Jamshedpur, Dhanbad and more. 👉 <a href='hotels.html'>View Hotels</a>",
  "maps": "Explore Jharkhand using our interactive maps. 👉 <a href='maps.html'>Open Maps</a>",
  "services": "We provide tourism services, hotel bookings, and travel guides.",
  "website": "This is the official Jharkhand Tourism website.",
  "culture": "Jharkhand has a vibrant tribal culture with folk dances like Chhau, Santhali, and Paika.",
  "waterfalls": "Famous waterfalls include Hundru, Dassam, Jonha, Lodh, and Panchghagh.",
  "festivals": "Important festivals are Sarhul, Karma, Sohrai, and Tusu Parab, celebrated with dances and rituals.",
  "food": "Popular foods include Dhuska, Pitha, Rugra (mushroom), Handia (rice beer), and Thekua.",
  "wildlife": "Visit Betla National Park, Dalma Wildlife Sanctuary, and Hazaribagh National Park to see elephants, tigers, and deer.",
  "best time": "The best time to visit Jharkhand is between October and March when the weather is pleasant.",
  "transport": "You can reach Jharkhand by train (Ranchi, Dhanbad, Jamshedpur stations) or by air (Birsa Munda Airport, Ranchi).",
  "language": "The main languages are Hindi, Nagpuri, Santhali, and Kurukh.",
  "districts": "Jharkhand has 24 districts including Ranchi, Dhanbad, Bokaro, Hazaribagh, and Jamshedpur.",
  "shopping": "Jharkhand is famous for tribal handicrafts, bamboo works, wooden carvings, and handloom textiles.",
  "adventure": "You can enjoy trekking, rock climbing, jungle safaris, and water sports in Jharkhand.",
  "bye": "Goodbye! Have a wonderful journey in Jharkhand 🌿."
};

// Function to add messages
function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "bot" ? "bot-msg" : "user-msg");
  msgDiv.innerHTML = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Handle user input
sendBtn.addEventListener("click", () => {
  let input = userInput.value.trim().toLowerCase();
  if (input === "") return;

  addMessage(userInput.value, "user"); // user message
  userInput.value = "";

  // Bot response
  let reply = "Sorry, I don't have info about that. Try asking about Jharkhand, hotels, culture, or waterfalls.";
  for (let key in responses) {
    if (input.includes(key)) {
      reply = responses[key];
      break;
    }
  }

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 500);
});

// Press Enter to send
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
