const { buildStoryData, getMoonPhase, getZodiac, getChineseZodiac } = require('./data.js');

let passed = 0, failed = 0;
const results = [];

function assert(name, actual, expected) {
  const ok = actual === expected;
  if (ok) { passed++; results.push(`✅ ${name}`); }
  else { failed++; results.push(`❌ ${name} — expected: ${expected}, got: ${actual}`); }
}

function assertApprox(name, actual, expected, tolerance) {
  const ok = Math.abs(actual - expected) <= tolerance;
  if (ok) { passed++; results.push(`✅ ${name}`); }
  else { failed++; results.push(`❌ ${name} — expected: ~${expected}±${tolerance}, got: ${actual}`); }
}

function assertTruthy(name, actual) {
  if (actual) { passed++; results.push(`✅ ${name}`); }
  else { failed++; results.push(`❌ ${name} — expected truthy, got: ${actual}`); }
}

// ===== MOON PHASE TESTS =====
// July 20, 1969 (Apollo 11) — should be waxing crescent
const apolloDate = new Date(1969, 6, 20);
const apolloMoon = getMoonPhase(apolloDate);
assertTruthy('Moon: Apollo 11 has valid phase name', apolloMoon.name);
assertTruthy('Moon: Apollo 11 has emoji', apolloMoon.emoji);
assertApprox('Moon: Apollo 11 illum in valid range', apolloMoon.illum, 30, 30);

// June 15, 2003 — known full moon
const june2003 = new Date(2003, 5, 15);
const juneMoon = getMoonPhase(june2003);
assertTruthy('Moon: June 15 2003 has valid phase', juneMoon.name);

// New Moon Jan 6, 2000 (reference date)
const refDate = new Date(2000, 0, 6);
const refMoon = getMoonPhase(refDate);
assertTruthy('Moon: Reference date has valid phase', refMoon.name);

// ===== ZODIAC TESTS =====
assert('Zodiac: Jan 20 = Aquarius', getZodiac(1, 20).sign, 'Aquarius');
assert('Zodiac: Feb 19 = Pisces', getZodiac(2, 19).sign, 'Pisces');
assert('Zodiac: Mar 21 = Aries', getZodiac(3, 21).sign, 'Aries');
assert('Zodiac: Apr 20 = Taurus', getZodiac(4, 20).sign, 'Taurus');
assert('Zodiac: May 21 = Gemini', getZodiac(5, 21).sign, 'Gemini');
assert('Zodiac: Jun 21 = Cancer', getZodiac(6, 21).sign, 'Cancer');
assert('Zodiac: Jul 23 = Leo', getZodiac(7, 23).sign, 'Leo');
assert('Zodiac: Aug 23 = Virgo', getZodiac(8, 23).sign, 'Virgo');
assert('Zodiac: Sep 23 = Libra', getZodiac(9, 23).sign, 'Libra');
assert('Zodiac: Oct 23 = Scorpio', getZodiac(10, 23).sign, 'Scorpio');
assert('Zodiac: Nov 22 = Sagittarius', getZodiac(11, 22).sign, 'Sagittarius');
assert('Zodiac: Dec 22 = Capricorn', getZodiac(12, 22).sign, 'Capricorn');
assert('Zodiac: Jun 15 = Gemini', getZodiac(6, 15).sign, 'Gemini');
assertTruthy('Zodiac: has symbol', !!getZodiac(6, 15).symbol);

// ===== CHINESE ZODIAC TESTS =====
assert('Chinese: 2003 = Goat', getChineseZodiac(2003).animal, 'Goat');
assert('Chinese: 1969 = Rooster', getChineseZodiac(1969).animal, 'Rooster');
assert('Chinese: 2000 = Dragon', getChineseZodiac(2000).animal, 'Dragon');
assert('Chinese: 1989 = Snake', getChineseZodiac(1989).animal, 'Snake');
assert('Chinese: 1996 = Rat', getChineseZodiac(1996).animal, 'Rat');
assertTruthy('Chinese: has symbol', !!getChineseZodiac(2003).symbol);

// ===== BUILD STORY DATA TESTS =====
const story = buildStoryData('Tama', 2003, 6, 15, 'Jakarta, Indonesia', null);
assert('Story: name correct', story.name, 'Tama');
assert('Story: year correct', story.year, 2003);
assert('Story: dayOfWeek = Sunday', story.dayOfWeek, 'Sunday');
assertTruthy('Story: daysOnEarth > 7000', story.daysOnEarth > 7000);
assertTruthy('Story: fullMoons > 200', story.fullMoons > 200);
assertTruthy('Story: has moon data', !!story.moon.name);
assertTruthy('Story: has zodiac', !!story.zodiac.sign);
assertTruthy('Story: has chinese zodiac', !!story.chinese.animal);
assertTruthy('Story: has birthstone', !!story.birthstone);
assertTruthy('Story: has birthFlower', !!story.birthFlower);
assertTruthy('Story: has prices array', Array.isArray(story.prices) && story.prices.length === 8);
assertTruthy('Story: has song', !!story.song.title);
assertTruthy('Story: has weather', !!story.weather.temp);
assertTruthy('Story: has headlines', Array.isArray(story.headlines) && story.headlines.length > 0);

// Birthstone & Flower by month
assert('Story: June birthstone = Pearl', story.birthstone, 'Pearl');
assert('Story: June flower = Rose', story.birthFlower, 'Rose');

// Song by year
assert('Story: 1970 song = Lilin-Lilin Kecil', buildStoryData('Test', 1970, 7, 20, 'Jakarta', null).song.title, 'Lilin-Lilin Kecil');
assert('Story: 2000 song = Teman Tapi Mesra', buildStoryData('Test', 2000, 1, 1, 'Jakarta', null).song.title, 'Teman Tapi Mesra');

// Prices by decade
const prices1970 = buildStoryData('Test', 1970, 1, 1, 'Jakarta', null).prices;
assertTruthy('Prices: 1970 beras < 1000', prices1970[0].then < 1000);
assertTruthy('Prices: 1970 bensin < 200', prices1970[2].then < 200);

// Weather determinism (same date = same weather)
const w1 = buildStoryData('A', 2003, 6, 15, 'Jakarta', null).weather;
const w2 = buildStoryData('B', 2003, 6, 15, 'Jakarta', null).weather;
assert('Weather: deterministic temp', w1.temp, w2.temp);
assert('Weather: deterministic condition', w1.condition, w2.condition);

// Date string format
assert('Story: dateStr format', story.dateStr, 'Sunday, June 15, 2003');

// Different year stories
const story1989 = buildStoryData('Test', 1989, 11, 9, 'Berlin', null);
assert('Story: 1989 dayOfWeek = Thursday', story1989.dayOfWeek, 'Thursday');

// ===== EDGE CASES =====
// Leap year date
const leap = buildStoryData('Leap', 2000, 2, 29, 'Paris', null);
assertTruthy('Leap: Feb 29 2000 valid', leap.dayOfWeek !== undefined);

// Early date
const early = buildStoryData('Old', 1975, 1, 1, 'Surabaya', null);
assertTruthy('Early: 1975 has song', !!early.song.title);
assertTruthy('Early: 1975 has prices', early.prices.length === 8);

// ===== SUMMARY =====
console.log('\n========================================');
console.log('  UNIT TEST RESULTS — Tams BornHere App');
console.log('========================================\n');
results.forEach(r => console.log(r));
console.log(`\n  Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`  Status: ${failed === 0 ? '✅ ALL PASSED' : '❌ SOME FAILED'}\n`);
process.exit(failed > 0 ? 1 : 0);
