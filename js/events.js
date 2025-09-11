const events = [
  // 🌾 January
  {
    id: "jan",
    name: "Tusu Parab",
    imgs: [
      "images/tusu1.png",
      "images/tusu2.png"
    ],
    date: "January",
    desc: "A harvest festival that paints rural Jharkhand in music and joy. Villages sing soulful Tusu songs, create decorated idols of Goddess Tusu, and immerse them in rivers. The fair-like atmosphere celebrates the end of the harvest and the hopes of a prosperous year."
  },
  {
    id: "jan",
    name: "Sohrai (January)",
    imgs: [
      "images/sohari1.jpg",
      "images/sohari2.jpg"
    ],
    date: "January",
    desc: "Celebrated as cattle worship in January by a few communities. Houses are decorated with mural paintings, animals are fed special meals, and the bond between humans and their livestock is honored."
  },

  // 🌸 February
  {
    id: "feb",
    name: "Baha Festival",
    imgs: [
      "images/baha1.jpg",
      "images/baha2.jpg"
    ],
    date: "February",
    desc: "Known as the flower festival of the Santhal tribe, Baha is a tribute to nature. The priest offers flowers to deities, villagers decorate themselves with blooms, and the forests resound with songs, dances, and drums that celebrate life’s renewal."
  },

  // 🌼 March
  {
    id: "mar",
    name: "Sarhul",
    imgs:
      ["images/sar1.png",
        "images/sar2.png"
      ],
    date: "March",
    desc: "A grand tribal festival, Sarhul marks the tribal New Year. The Sal tree is worshipped as a symbol of fertility and strength, with rituals led by the village priest. Processions, dances, and music continue for days, binding the community in joy and reverence for nature."
  },
  {
    id: "mar",
    name: "Holi",
    imgs: [
      "images/holi1.png", 
      "images/holi2.png"
    ],
    date: "March",
    desc: "Like across India, Holi in Jharkhand is celebrated with colors, drums, and laughter. In tribal belts, folk dances and songs make the festival more rooted in community traditions."
  },

  // 🌿 April
  {
    id: "apr",
    name: "Parasnath Mahotsav",
    imgs: [
      "images/para1.png",
      "images/para2.png"
    ],
    date: "April",
    desc: "A Jain pilgrimage festival at Parasnath Hills in Giridih. Thousands of devotees climb the sacred hill chanting hymns, remembering the 20 Jain Tirthankaras who attained salvation here."
  },
  {
    id: "apr",
    name: "Ram Navami",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "April",
    desc: "One of the most vibrant Hindu festivals in Ranchi and other towns. Huge processions, saffron flags, and devotional songs fill the streets, marking the birth of Lord Rama."
  },

  // 🌧 May
  {
    id: "may",
    name: "Local Agricultural Rituals",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "May",
    desc: "Villages perform rain-inviting ceremonies. Offerings of poultry, grains, or rice beer are made to local deities, reflecting the farmers’ prayers for monsoon blessings."
  },

  // 🌱 June
  {
    id: "jun",
    name: "Ashadhi Puja",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "June",
    desc: "Held before sowing paddy, this is a prayer to the gods for timely rains and good crops. Ritual sacrifices, rice beer, and community gatherings highlight the deep bond between tribal life and agriculture."
  },

  // 🕉 July
  {
    id: "jul",
    name: "Jagannath Rath Yatra (Ranchi)",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "July",
    desc: "The grand chariot procession of Lord Jagannath, Balabhadra, and Subhadra through Ranchi. Devotees pull decorated raths while cultural fairs bring color and joy to the capital city."
  },
  {
    id: "jul",
    name: "Shravani Mela (Deoghar)",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "July",
    desc: "Millions of Kanwariyas travel on foot, carrying holy Ganga water to offer at Baidyanath Dham, one of the 12 Jyotirlingas of Lord Shiva. For an entire month, Deoghar becomes a sea of saffron-clad pilgrims."
  },

  // 🌳 August
  {
    id: "aug",
    name: "Sawan Shivratri",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "August",
    desc: "Observed with night-long vigils and fasting, devotees sing bhajans in honor of Lord Shiva. Deoghar temple is the epicenter of worship."
  },
  {
    id: "aug",
    name: "Karam Festival",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "August",
    desc: "A festival of youth, fertility, and prosperity. Men and women bring Karam branches into the village, plant them, and worship through dances, drumming, and storytelling."
  },

  // 🌕 September
  {
    id: "sep",
    name: "Jitia Vrat (Jivitputrika)",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "September",
    desc: "Observed by mothers who fast strictly for the long life of their children. The rituals symbolize devotion, endurance, and maternal love."
  },

  // 🪔 October
  {
    id: "oct",
    name: "Durga Puja",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "October",
    desc: "Across cities like Ranchi, Dhanbad, and Jamshedpur, towering pandals, idols of Goddess Durga, and cultural programs mark the festival."
  },
  {
    id: "oct",
    name: "Sohrai (Diwali period)",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "October",
    desc: "Coinciding with Diwali, Sohrai honors cattle and celebrates harvest. Houses bloom with Sohrai art, painted with natural colors, depicting animals and nature."
  },

  // 🌞 November
  {
    id: "nov",
    name: "Bandna Festival",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "November",
    desc: "Farmers honor cattle as their family members. Cows and oxen are bathed, decorated, and fed, while homes resonate with folk songs thanking them for their service in farming."
  },
  {
    id: "nov",
    name: "Chhath Puja",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "November",
    desc: "One of the most sacred festivals, dedicated to the Sun God. Devotees stand in rivers and ponds at sunrise and sunset, offering fruits, sugarcane, and diyas."
  },

  // 🎪 December
  {
    id: "dec",
    name: "Lawalong Mela (Chatra)",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1"],
    date: "December",
    desc: "Jharkhand’s largest cattle fair, held on Aghan Purnima. Thousands of cattle are traded, and the fair turns into a carnival with stalls, handicrafts, folk music, and rural theater."
  },
  {
    id: "dec",
    name: "Christmas",
    imgs: ["PLACEHOLDER_IMAGE_LINK_1", "PLACEHOLDER_IMAGE_LINK_2"],
    date: "December",
    desc: "In Ranchi and tribal Christian belts, Christmas is celebrated with midnight prayers, feasts, and community singing."
  }
];

// --- Rendering logic ---
function el(id) { return document.getElementById(id); }

function renderEvents() {
  const container = el("eventList");
  container.innerHTML = "";

  events.forEach(ev => {
    const section = document.createElement("section");
    section.className = "event-section";
    section.id = ev.id;

    // Image gallery
    const imgGallery = ev.imgs
      .map(link => `<img src="${link}" alt="${ev.name}">`)
      .join("");

    section.innerHTML = `
      <div class="event-card">
        <div class="image-gallery">
          ${imgGallery}
        </div>
        <div class="content">
          <h3>${ev.name}</h3>
          <div class="date">${ev.date}</div>
          <p>${ev.desc}</p>
        </div>
      </div>
    `;
    container.appendChild(section);
  });
}

// Scrollspy
function setupScrollspy() {
  const sections = document.querySelectorAll(".event-section");
  const links = document.querySelectorAll(".months a");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.remove("active"));
          const active = document.querySelector(`.months a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(sec => observer.observe(sec));
}

// Init
renderEvents();
setupScrollspy();
el("year").textContent = new Date().getFullYear();
