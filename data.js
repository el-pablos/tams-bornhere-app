/* Tams - BornHere App | Data & Calculation Engine
   Semua perhitungan dilakukan lokal — tanpa panggilan API eksternal.
*/

// ===== MOON PHASE CALCULATION =====
// Based on astronomical synodic month (29.53059 days)
// Reference new moon: 2000-01-06 18:14 UTC (known astronomical new moon)
const MOON_PHASES = [
  { name: "New Moon", emoji: "🌑", illum: 0 },
  { name: "Waxing Crescent", emoji: "🌒", illum: 0.25 },
  { name: "First Quarter", emoji: "🌓", illum: 0.5 },
  { name: "Waxing Gibbous", emoji: "🌔", illum: 0.75 },
  { name: "Full Moon", emoji: "🌕", illum: 1.0 },
  { name: "Waning Gibbous", emoji: "🌖", illum: 0.75 },
  { name: "Last Quarter", emoji: "🌗", illum: 0.5 },
  { name: "Waning Crescent", emoji: "🌘", illum: 0.25 }
];

function getMoonPhase(date) {
  const synodic = 29.53058867;
  const refNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const diff = date.getTime() - refNewMoon;
  const daysSince = diff / (1000 * 60 * 60 * 24);
  let phase = (daysSince % synodic) / synodic;
  if (phase < 0) phase += 1;
  const phaseIndex = Math.floor(phase * 8) % 8;
  const illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
  return { ...MOON_PHASES[phaseIndex], illum: illum, phase: phase };
}

function countFullMoonsSince(birthDate) {
  const synodic = 29.53058867;
  const refNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const now = Date.now();
  const birthMs = birthDate.getTime();
  // Count full moons (phase ≈ 0.5) between birth and now
  const startPhase = ((birthMs - refNewMoon) / (1000 * 60 * 60 * 24 * synodic)) % 1;
  const endPhase = ((now - refNewMoon) / (1000 * 60 * 60 * 24 * synodic)) % 1;
  const totalCycles = (now - birthMs) / (1000 * 60 * 60 * 24 * synodic);
  return Math.floor(totalCycles);
}

// ===== ZODIAC =====
const ZODIAC = [
  { sign: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19] },
  { sign: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20] },
  { sign: "Aries", symbol: "♈", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22] },
  { sign: "Leo", symbol: "♌", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22] },
  { sign: "Libra", symbol: "♎", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] }
];

function getZodiac(month, day) {
  for (const z of ZODIAC) {
    if (z.start[0] === 12 && month === 12 && day >= z.start[1]) return z;
    if (z.start[0] === 12 && month === 1 && day <= z.end[1]) return z;
    if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) {
      if (!(z.end[0] === 1 && month === 1 && day > 19)) return z;
    }
  }
  return ZODIAC[0];
}

// ===== CHINESE ZODIAC =====
const CHINESE_ZODIAC = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
const CHINESE_SYMBOLS = ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"];

function getChineseZodiac(year) {
  // Chinese new year varies (late Jan/Feb), approximation: use year offset
  // For precision before Feb 4, use previous year
  const idx = (year - 4) % 12;
  return { animal: CHINESE_ZODIAC[idx], symbol: CHINESE_SYMBOLS[idx] };
}

// ===== BIRTHSTONE =====
const BIRTHSTONES = [
  "Garnet","Amethyst","Aquamarine","Diamond","Emerald","Pearl",
  "Ruby","Peridot","Sapphire","Opal","Citrine","Turquoise"
];

// ===== BIRTH FLOWER =====
const BIRTH_FLOWERS = [
  "Carnation","Violet","Daffodil","Daisy","Lily of the Valley","Rose",
  "Larkspur","Gladiolus","Aster","Marigold","Chrysanthemum","Narcissus"
];

// ===== DAYS ON EARTH =====
function daysOnEarth(birthDate) {
  const now = new Date();
  const diff = now - birthDate;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ===== DAY OF WEEK =====
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function getDayOfWeek(date) {
  return DAYS[date.getDay()];
}

// ===== HISTORICAL PRICES (IDR — data berdasarkan inflasi Indonesia) =====
// Sumber: BPS, Bank Indonesia, kaspaspace.com, metrotvnews.com
const PRICE_DATA = {
  1970: { rice: 250, noodle: 25, gas: 75, eggs: 150, house: 2500000, motor: 145000, stamp: 15, coffee: 100 },
  1980: { rice: 400, noodle: 60, gas: 160, eggs: 350, house: 8000000, motor: 400000, stamp: 50, coffee: 250 },
  1990: { rice: 1000, noodle: 150, gas: 350, eggs: 900, house: 25000000, motor: 1500000, stamp: 150, coffee: 500 },
  2000: { rice: 3500, noodle: 500, gas: 1150, eggs: 4000, house: 80000000, motor: 8000000, stamp: 400, coffee: 2000 },
  2010: { rice: 10000, noodle: 1500, gas: 6000, eggs: 12000, house: 200000000, motor: 12000000, stamp: 600, coffee: 5000 },
  2020: { rice: 15000, noodle: 2500, gas: 6500, eggs: 18000, house: 350000000, motor: 16000000, stamp: 800, coffee: 8000 }
};

const CURRENT_PRICES = { rice: 25000, noodle: 3000, gas: 7500, eggs: 28000, house: 500000000, motor: 18000000, stamp: 1000, coffee: 12000 };

function getPrices(year) {
  const decade = Math.floor(year / 10) * 10;
  const data = PRICE_DATA[decade] || PRICE_DATA[2020];
  return data;
}

function priceThenNow(year) {
  const then = getPrices(year);
  const items = [
    { name: "Beras 1 kg", then: then.rice, now: CURRENT_PRICES.rice },
    { name: "Mi instan", then: then.noodle, now: CURRENT_PRICES.noodle },
    { name: "Bensin 1 liter", then: then.gas, now: CURRENT_PRICES.gas },
    { name: "Telur 1 kg", then: then.eggs, now: CURRENT_PRICES.eggs },
    { name: "Rumah tinggal", then: then.house, now: CURRENT_PRICES.house },
    { name: "Sepeda motor", then: then.motor, now: CURRENT_PRICES.motor },
    { name: "Ongkos angkot", then: then.stamp, now: CURRENT_PRICES.stamp },
    { name: "Kopi sachet", then: then.coffee, now: CURRENT_PRICES.coffee }
  ];
  return items;
}

function formatPrice(v) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + "jt";
  if (v >= 1000) return Math.round(v / 1000) + "rb";
  return Math.round(v).toString();
}

// ===== LAGU HITS INDONESIA — per dekade =====
// Sumber: chart radio Prambors, kompilasi musik Indonesia
const SONGS = {
  1970: { title: "Lilin-Lilin Kecil", artist: "Chrisye" },
  1975: { title: "Bujangan", artist: "Koes Plus" },
  1980: { title: "Sakura", artist: "Fariz RM" },
  1985: { title: "Jarum Neraka", artist: "Nicky Astria" },
  1989: { title: "Badai Pasti Berlalu", artist: "Chrisye" },
  1990: { title: "Pesawat Tempurku", artist: "Iwan Fals" },
  1995: { title: "Bintang Kehidupan", artist: "Nike Ardilla" },
  2000: { title: "Teman Tapi Mesra", artist: "Ratu" },
  2005: { title: "Ya Sudahlah", artist: "Bondan Prakoso & Fade2Black" },
  2010: { title: "Lebih Indah", artist: "Adera" },
  2015: { title: "Diam-Diam Suka", artist: "Cherrybelle" },
  2020: { title: "Manusia Kuat", artist: "Tulus" },
  2025: { title: "Teh Hijau", artist: "Tulus" }
};

function getSong(year) {
  const keys = Object.keys(SONGS).map(Number).sort((a,b) => a - b);
  let best = SONGS[keys[0]];
  for (const k of keys) {
    if (k <= year) best = SONGS[k];
  }
  return best;
}

// ===== WEATHER (mock seasonal by month & region) =====
const WEATHER_CONDITIONS = {
  winter: ["Cerah dan sejuk", "Hujan ringan", "Mendung", "Dingin pagi"],
  spring: ["Hangat dan berangin", "Berawan sebagian", "Hujan musim", "Cerah ceria"],
  summer: ["Panas terik", "Lembab", "Hujan badai", "Langit cerah"],
  fall: ["Sejuk dan nyaman", "Berkabut", "Mendung", "Sore keemasan"]
};

function getMockWeather(date, city) {
  const month = date.getMonth();
  let season, tempBase;
  if (month >= 11 || month <= 1) { season = "winter"; tempBase = 5; }
  else if (month >= 2 && month <= 4) { season = "spring"; tempBase = 18; }
  else if (month >= 5 && month <= 7) { season = "summer"; tempBase = 28; }
  else { season = "fall"; tempBase = 15; }

  const conditions = WEATHER_CONDITIONS[season];
  const seed = date.getDate() + date.getMonth() * 31;
  const condition = conditions[seed % conditions.length];
  const temp = tempBase + ((seed * 7) % 15) - 7;

  return {
    temp: Math.round(temp),
    condition: condition,
    city: city || "tempat lahir kamu",
    high: Math.round(temp + 5),
    low: Math.round(temp - 5)
  };
}

// ===== HEADLINE SEJARAH INDONESIA — per dekade =====
// Sumber: Wikipedia, metrotvnews.com, garis waktu sejarah Indonesia
const HEADLINES = {
  1945: ["Proklamasi Kemerdekaan Indonesia 17 Agustus 1945", "Pertempuran Surabaya 10 November 1945"],
  1950: ["Pengakuan kedaulatan RI oleh Belanda", "Konferensi Asia-Afrika di Bandung 1955"],
  1960: ["Dekrit Presiden 5 Juli 1959", "G30S dan awal Orde Baru 1965"],
  1970: ["Soekarno meninggal dunia 21 Juni 1970", "Boom minyak dunia mengubah perekonomian RI"],
  1980: ["Swasembada beras tercapai", "Deregulasi perbankan dan reformasi pajak 1983"],
  1990: ["Krisis Finansial Asia 1997", "Soeharto mundur 21 Mei 1998, era Reformasi dimulai"],
  2000: ["Tsunami Aceh 26 Desember 2004", "Pemilu presiden langsung pertama 2004 — SBY terpilih"],
  2010: ["Joko Widodo terpilih presiden 2014", "Asian Games 2018 di Jakarta-Palembang"],
  2020: ["Pandemi COVID-19 melanda Indonesia", "Ekonomi terkontraksi -2,07% lalu rebound 2021"],
  2025: ["Danantara resmi berdiri sebagai dana kekayaan negara", "Program makan gratis untuk pelajar diluncurkan"]
};

function getHeadlines(year) {
  const keys = Object.keys(HEADLINES).map(Number).sort((a,b) => a - b);
  let best = HEADLINES[keys[0]];
  for (const k of keys) {
    if (k <= year) best = HEADLINES[k];
  }
  return best;
}

// ===== FULL STORY DATA ASSEMBLY =====
function buildStoryData(name, year, month, day, city, birthTime) {
  const birthDate = new Date(year, month - 1, day);
  const moon = getMoonPhase(birthDate);
  const zodiac = getZodiac(month, day);
  const chinese = getChineseZodiac(year);
  const birthstone = BIRTHSTONES[month - 1];
  const birthFlower = BIRTH_FLOWERS[month - 1];
  const days = daysOnEarth(birthDate);
  const dayOfWeek = getDayOfWeek(birthDate);
  const fullMoons = countFullMoonsSince(birthDate);
  const prices = priceThenNow(year);
  const song = getSong(year);
  const weather = getMockWeather(birthDate, city);
  const headlines = getHeadlines(year);
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return {
    name: name || "Friend",
    birthDate: birthDate,
    dateStr: `${dayOfWeek}, ${monthNames[month - 1]} ${day}, ${year}`,
    city: city || "Unknown",
    dayOfWeek,
    daysOnEarth: days,
    fullMoons,
    moon,
    zodiac,
    chinese,
    birthstone,
    birthFlower,
    prices,
    song,
    weather,
    headlines,
    year
  };
}

// Export for use
if (typeof module !== 'undefined') module.exports = { buildStoryData, getMoonPhase, getZodiac, getChineseZodiac };
