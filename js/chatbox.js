const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Toggle chat
chatToggle.onclick = () => chatbox.style.display = "flex";
closeBtn.onclick = () => chatbox.style.display = "none";

// Add message
function addMessage(msg, type) {
  const div = document.createElement("div");
  div.className = type === "bot" ? "bot-msg" : "user-msg";
  div.innerHTML = msg;   // allow links
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot replies
function botReply(input) {
  input = input.toLowerCase();
  let reply = "Sorry, I didn’t understand that. You can ask about Jharkhand, Hotels, Maps, Places, Festivals, or Services.";

  if (input.includes("jharkhand")) {
    reply = "Jharkhand is known as the <b>'Land of Forests'</b>, rich in culture, waterfalls, hills, and heritage.";
  } 
  else if (input.includes("hotel")) {
    reply = "You can explore our Hotels page here: <a href='hotels.html'>Hotels</a>";
  } 
  else if (input.includes("map")) {
    reply = "Check out Maps of Jharkhand here: <a href='maps.html'>Maps</a>";
  } 
  else if (input.includes("service") || input.includes("website")) {
    reply = "Our website provides info on <b>Tourism, Hotels, Maps, and Chat assistance</b>.";
  } 
  else if (input.includes("hello") || input.includes("hi")) {
    reply = "Hello! 👋 How can I assist you about Jharkhand Tourism?";
  }
  else if (input.includes("culture")) {
    reply = "Jharkhand has a vibrant tribal culture with folk dances like <b>Chhau, Paika, and Santhali</b>, and colorful festivals.";
  }
  else if (input.includes("festival")) {
    reply = "Major festivals of Jharkhand include <b>Karma, Sarhul, Sohrai, and Tusu Parab</b>.";
  }
  else if (input.includes("food")) {
    reply = "Famous foods of Jharkhand include <b>Dhuska, Chilka Roti, Handia (rice beer), Rugra, and Thekua</b>.";
  }
  else if (input.includes("place") || input.includes("visit")) {
    reply = "Top places to visit in Jharkhand: <br> - <b>Ranchi</b> (falls, temples) <br> - <b>Jamshedpur</b> (city of steel) <br> - <b>Deoghar</b> (Baidyanath Temple) <br> - <b>Netarhat</b> (sunrise/sunset views) <br> - <b>Hazaribagh</b> (wildlife sanctuary).";
  }
  else if (input.includes("waterfall")) {
    reply = "Jharkhand is famous for waterfalls: <b>Hundru, Dassam, Jonha, Hirni, and Panchghagh</b> falls.";
  }
  else if (input.includes("best time")) {
    reply = "The best time to visit Jharkhand is <b>October to March</b> when the weather is cool and pleasant.";
  }
  else if (input.includes("capital")) {
    reply = "The capital of Jharkhand is <b>Ranchi</b>.";
  }
  else if (input.includes("airport")) {
    reply = "The main airport of Jharkhand is <b>Birsa Munda Airport, Ranchi</b>.";
  }
  else if (input.includes("about you") || input.includes("who are you")) {
    reply = "I’m your virtual assistant 🤖 here to guide you about Jharkhand Tourism, Hotels, Maps, and Services.";
  }

  addMessage(reply, "bot");
}

// Send message
sendBtn.onclick = () => {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  botReply(text);
  userInput.value = "";
};

// Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
