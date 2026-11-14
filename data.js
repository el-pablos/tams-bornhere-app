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

// ===== HISTORICAL PRICES (mock data by decade) =====
// Based on real historical economic data (BLS consumer price index)
const PRICE_DATA = {
  1940: { bread: 0.08, milk: 0.13, gas: 0.18, eggs: 0.13, house: 3920, car: 850, stamp: 0.03, coffee: 0.19 },
  1950: { bread: 0.14, milk: 0.22, gas: 0.27, eggs: 0.22, house: 8450, car: 2100, stamp: 0.03, coffee: 0.25 },
  1960: { bread: 0.20, milk: 0.31, gas: 0.31, eggs: 0.30, house: 12600, car: 2600, stamp: 0.04, coffee: 0.35 },
  1970: { bread: 0.25, milk: 0.36, gas: 0.36, eggs: 0.35, house: 17900, car: 3500, stamp: 0.06, coffee: 0.45 },
  1980: { bread: 0.50, milk: 0.62, gas: 0.86, eggs: 0.62, house: 47200, car: 7500, stamp: 0.15, coffee: 0.85 },
  1990: { bread: 0.70, milk: 1.05, gas: 1.16, eggs: 0.85, house: 95800, car: 16000, stamp: 0.25, coffee: 1.50 },
  2000: { bread: 0.92, milk: 1.35, gas: 1.30, eggs: 0.95, house: 119600, car: 21000, stamp: 0.33, coffee: 2.00 },
  2010: { bread: 1.35, milk: 1.80, gas: 2.79, eggs: 1.65, house: 221800, car: 28400, stamp: 0.44, coffee: 2.80 },
  2020: { bread: 1.70, milk: 2.20, gas: 2.17, eggs: 1.85, house: 329000, car: 36000, stamp: 0.55, coffee: 4.50 }
};

const CURRENT_PRICES = { bread: 2.50, milk: 3.80, gas: 3.50, eggs: 3.20, house: 420000, car: 48000, stamp: 0.73, coffee: 5.50 };

function getPrices(year) {
  const decade = Math.floor(year / 10) * 10;
  const data = PRICE_DATA[decade] || PRICE_DATA[2020];
  return data;
}

function priceThenNow(year) {
  const then = getPrices(year);
  const items = [
    { name: "Loaf of bread", then: then.bread, now: CURRENT_PRICES.bread },
    { name: "Gallon of milk", then: then.milk, now: CURRENT_PRICES.milk },
    { name: "Gallon of gas", then: then.gas, now: CURRENT_PRICES.gas },
    { name: "Dozen eggs", then: then.eggs, now: CURRENT_PRICES.eggs },
    { name: "New house", then: then.house, now: CURRENT_PRICES.house },
    { name: "New car", then: then.car, now: CURRENT_PRICES.car },
    { name: "Postage stamp", then: then.stamp, now: CURRENT_PRICES.stamp },
    { name: "Pound of coffee", then: then.coffee, now: CURRENT_PRICES.coffee }
  ];
  return items;
}

function formatPrice(v) {
  if (v < 1) return v.toFixed(2);
  if (v < 100) return v.toFixed(2);
  return Math.round(v).toLocaleString('en-US');
}

// ===== #1 SONGS (Billboard) — representative historical data =====
const SONGS = {
  1940: { title: "I'll Never Smile Again", artist: "Tommy Dorsey" },
  1945: { title: "Till the End of Time", artist: "Perry Como" },
  1950: { title: "Goodnight, Irene", artist: "The Weavers" },
  1955: { title: "Cherry Pink and Apple Blossom White", artist: "Perez Prado" },
  1960: { title: "Theme from A Summer Place", artist: "Percy Faith" },
  1965: { title: "Wooly Bully", artist: "Sam the Sham" },
  1969: { title: "Sugar, Sugar", artist: "The Archies" },
  1970: { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel" },
  1975: { title: "Love Will Keep Us Together", artist: "Captain & Tennille" },
  1980: { title: "Call Me", artist: "Blondie" },
  1985: { title: "Careless Whisper", artist: "Wham!" },
  1989: { title: "Look Away", artist: "Chicago" },
  1990: { title: "Hold On", artist: "Wilson Phillips" },
  1995: { title: "Gangsta's Paradise", artist: "Coolio" },
  2000: { title: "Breathe", artist: "Faith Hill" },
  2005: { title: "We Belong Together", artist: "Mariah Carey" },
  2010: { title: "TiK ToK", artist: "Kesha" },
  2015: { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
  2020: { title: "Blinding Lights", artist: "The Weeknd" },
  2025: { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars" }
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
  winter: ["Clear and cold", "Light snow", "Overcast", "Frosty morning"],
  spring: ["Mild and breezy", "Partly cloudy", "Spring showers", "Warm sunshine"],
  summer: ["Hot and sunny", "Humid", "Thunderstorm", "Clear skies"],
  fall: ["Crisp and cool", "Foggy", "Overcast", "Golden afternoon"]
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
    city: city || "your birthplace",
    high: Math.round(temp + 5),
    low: Math.round(temp - 5)
  };
}

// ===== HEADLINES (mock historical events) =====
const HEADLINES = {
  1940: ["Winston Churchill becomes UK Prime Minister", "Battle of Britain rages in the skies"],
  1945: ["World War II ends as Japan surrenders", "United Nations founded"],
  1950: ["Korean War begins", "First credit card introduced (Diners Club)"],
  1955: ["Rosa Parks sparks Montgomery Bus Boycott", "Disneyland opens in California"],
  1960: ["John F. Kennedy elected President", "First weather satellite launched"],
  1965: ["US troops sent to Vietnam", "Martin Luther King Jr. leads Selma march"],
  1969: ["Apollo 11 lands on the Moon", "Woodstock festival draws 400,000"],
  1970: ["Beatles announce breakup", "First Earth Day celebrated"],
  1975: ["Vietnam War ends", "Microsoft founded by Bill Gates"],
  1980: ["Mount St. Helens erupts", "John Lennon assassinated"],
  1985: ["Live Aid concert raises millions for famine relief", "Nintendo releases NES"],
  1989: ["Berlin Wall falls", "World Wide Web invented by Tim Berners-Lee"],
  1990: ["Nelson Mandela freed from prison", "Hubble Space Telescope launched"],
  1995: ["DVD format announced", "eBay founded"],
  2000: ["Y2K passes without major disruption", "Human genome draft completed"],
  2005: ["Hurricane Katrina devastates New Orleans", "YouTube founded"],
  2010: ["iPad launched by Apple", "Instagram released"],
  2015: ["Paris Climate Agreement signed", "Same-sex marriage legalized in US"],
  2020: ["COVID-19 global pandemic", "SpaceX launches first crewed mission"],
  2025: ["AI transforms daily life", "Mars sample return mission planned"]
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
