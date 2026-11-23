// Builds page/front.html (v9): a front page in the style of the leading entries,
// with our own verified Sunday stories and our own drawings (reused from earlier versions of this page).
// Usage: node page/build-v9.cjs <v8 front.html> <v6 front.html>
const fs = require('fs');
const [v8, v6] = process.argv.slice(2).map((f) => fs.readFileSync(f, 'utf8'));

const light = v8.match(/<svg viewBox="0 0 (316|182) [0-9]+"[\s\S]*?<\/svg>/g);
const dark = v6.match(/<svg class="scene" viewBox="0 0 (264|193) [0-9]+"[\s\S]*?<\/svg>/g);
// Strip the banner and chip labels drawn inside the old scenes: v9 puts its labels in HTML.
const clean = (svg) => svg
  .replace(/<rect x="\d+" y="\d+" width="\d+" height="20" rx="2" fill="[^"]+"\/><text[^>]*>[^<]*<\/text>/g, '')
  .replace(/<text x="8" y="130"[^>]*>[^<]*<\/text>/g, '')
  .replace(/^<svg /, '<svg class="scene" ');
const scene = {
  cop: clean(light[0]), benghazi: clean(light[1]), hormuz: clean(light[2]),
  dymer: dark[1],
  sparta: clean(light[4]), poland: clean(light[5]), stocks: clean(light[6]), korea: clean(light[7]),
  ebola: clean(light[8]), canaries: clean(light[9]), colombia: clean(light[10]), khartoum: clean(light[11]),
  tennis: '<svg class="scene" viewBox="0 0 182 56" preserveAspectRatio="xMidYMid slice"><rect width="182" height="56" fill="#dbe8f4"/><rect x="40" y="14" width="102" height="38" fill="#2f6fb5"/><rect x="40" y="14" width="102" height="38" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M40 33 h102 M66 14 v38 M116 14 v38 M66 33 h50" stroke="#fff" stroke-width="1.2"/><path d="M91 14 v38" stroke="#0b1a33" stroke-width="2.5"/><circle cx="76" cy="24" r="3" fill="#d9f03a"/><path d="M150 6 h14 v6 q0 8 -7 9 q-7 -1 -7 -9z" fill="#f2b632"/><rect x="155" y="21" width="4" height="5" fill="#f2b632"/><rect x="151" y="26" width="12" height="3" fill="#f2b632"/></svg>',
};

const R = { eu: ['Europe', '#2f5fb3'], me: ['Middle East', '#c4611c'], af: ['Africa', '#2f8a4c'], as: ['Asia', '#b8862b'], am: ['Americas', '#7a3fa8'], oc: ['Oceania', '#1f8f8a'], gl: ['World', '#3d4452'] };
const ST = { conf: ['CONFIRMED', '#2f7d4a'], off: ['OFFICIAL', '#14213d'], clm: ['CLAIM', '#c98a12'], rep: ['REPORTED', '#5b6470'] };

const leads = [
  { n: 1, place: 'Antalya, Türkiye', r: 'gl', field: 'Climate', st: 'conf', pic: scene.cop, h: 'COP31 ends with no deal', sub: 'EU, Panama object: final draft never names fossil fuels', src: 'UN News · Euronews · Al Jazeera', lat: 36.9, lon: 30.7 },
  { n: 2, place: 'Dymer, Kyiv region', r: 'eu', field: 'War', st: 'off', pic: scene.dymer, h: 'Russian drones kill 12+ near Kyiv', sub: 'Block partly collapses; boy, 7, pulled out after 14 hours', src: 'Kyiv governor · Al Jazeera · France 24', lat: 50.8, lon: 30.3 },
  { n: 3, place: 'Benghazi, Libya', r: 'af', field: 'War', st: 'conf', pic: scene.benghazi, h: 'Sea drone capsizes a Russian warship', sub: 'Corvette Merkury hit at naval base; several dead, 10+ hurt', src: 'Reuters · Al Jazeera · Xinhua', lat: 32.1, lon: 20.1 },
];
const cards = [
  { n: 4, place: 'Strait of Hormuz', r: 'me', field: 'Iran war', st: 'clm', pic: scene.hormuz, h: 'Iran says mines halt two tankers', sub: 'UKMTO logs a tanker incident off Chabahar', src: 'Anadolu · Euronews', lat: 26.6, lon: 56.3 },
  { n: 5, place: 'Lublin, Poland', r: 'eu', field: 'Security', st: 'off', pic: scene.poland, h: 'Poland names Russian missiles', sub: 'Three Kh-101s, built in Dubna', src: 'Prosecutors · France 24', lat: 51.2, lon: 22.6 },
  { n: 6, place: 'Gulf of Finland', r: 'eu', field: 'Security', st: 'conf', pic: scene.sparta, h: 'Russia tows drone-hit ship', sub: 'Freighter, hit Saturday, leaves Finnish waters', src: 'Euronews · Al Jazeera', lat: 60.0, lon: 27.0 },
  { n: 7, place: 'Beijing · Seoul', r: 'as', field: 'Markets', st: 'off', pic: scene.stocks, h: 'Beijing, Seoul steady stocks', sub: 'Margin cut; Seoul readies a 10trn-won fund', src: 'Xinhua · Korea Times', lat: 39.9, lon: 116.4 },
  { n: 8, place: 'Seoul', r: 'as', field: 'Education', st: 'conf', pic: scene.korea, h: 'AI cheating ousts minister', sub: 'Choi Kyo-jin quits after 111 device cases', src: 'AFP · Xinhua', lat: 37.6, lon: 127.0 },
  { n: 9, place: 'Khartoum', r: 'af', field: 'War', st: 'conf', pic: scene.khartoum, h: 'Drones kill four around Khartoum', sub: 'A UN building is hit with staff inside', src: 'Al Jazeera · Africanews', lat: 15.6, lon: 32.5 },
  { n: 10, place: 'Ituri, DR Congo', r: 'af', field: 'Health', st: 'off', pic: scene.ebola, h: 'Fighting traps Ebola medics', sub: 'Staff shelter 24h+ in a maternity ward, WHO says', src: 'WHO · Reuters', lat: 1.6, lon: 30.3 },
  { n: 11, place: 'El Hierro, Spain', r: 'eu', field: 'Migration', st: 'conf', pic: scene.canaries, h: '350+ migrants land in a single day', sub: 'Six boats reach the Canary island', src: 'Euronews · EFE', lat: 27.6, lon: -18.0 },
  { n: 12, place: 'Bogotá', r: 'am', field: 'Politics', st: 'off', pic: scene.colombia, h: 'Colombia asks X to suspend Petro', sub: 'Ministry cites incitement; he cries censorship', src: 'Rio Times · MercoPress', lat: 4.7, lon: -74.1 },
  { n: 13, place: 'Turin', r: 'eu', field: 'Sport', st: 'conf', pic: scene.tennis, h: 'Alcaraz wins his first ATP Finals', sub: 'Beats Zverev 6-2, 7-6 in the final', src: 'ATP · Al Jazeera', lat: 45.1, lon: 7.7 },
];
const briefs = [
  { f: 'sa', r: 'me', h: 'Houthis claim hit on Rabigh refinery', sub: 'Saudi Arabia · coalition downs a missile', src: 'Al Jazeera', st: 'clm', lat: 22.8, lon: 39.0 },
  { f: 'ps', r: 'me', h: 'Settlers torch cars in four villages', sub: 'West Bank · Eisenkot: "Jewish terrorism"', src: 'France 24', lat: 32.0, lon: 35.2 },
  { f: 'il', r: 'me', h: 'Likud–Eisenkot talks end, no deal', sub: 'Herzliya · four hours; to meet again', src: 'Times of Israel', lat: 32.2, lon: 34.8 },
  { f: 'ua', r: 'eu', h: 'Odesa schools go online all week', sub: 'Odesa · power grid badly damaged', src: 'Ukrenergo', lat: 46.5, lon: 30.7 },
  { f: 'tr', r: 'eu', h: 'Thousands march over TV-station raid', sub: 'Istanbul · opposition rally to the Bosphorus', src: 'France 24', lat: 41.0, lon: 29.0 },
  { f: 'ke', r: 'af', h: 'Kenya, DR Congo to restore full ties', sub: 'Oyo, Rep. of Congo · summit deal', src: 'The Star · Xinhua', lat: -1.2, lon: 16.0 },
  { f: 'np', r: 'as', h: 'Nepal PM Balendra Shah visits Delhi', sub: 'New Delhi · first state visit', src: 'Kathmandu Post', lat: 28.6, lon: 77.2 },
  { f: 'pk', r: 'as', h: 'Lahore air quality index hits 538', sub: 'Lahore · worst of any big city', src: 'Dawn', lat: 31.5, lon: 74.3 },
  { f: 'bd', r: 'as', h: 'Garment unrest shuts 317 factories', sub: 'Gazipur · owners put losses at $428m', src: 'Daily Star · AFP', lat: 24.0, lon: 90.4 },
  { f: 'us', r: 'am', h: 'US futures rebound after AI-stock rout', sub: 'New York · Dow futures +412 points', src: 'CNBC', lat: 40.7, lon: -74.0 },
  { f: 'pt', r: 'eu', h: 'Márquez seals 8th MotoGP crown', sub: 'Portimão · ties Agostini\'s record', src: 'AP · Euronews', lat: 37.2, lon: -8.6 },
  { f: 'us', r: 'am', h: 'Verstappen wins the 2026 Las Vegas GP', sub: 'Las Vegas · from pole, 75th career win', src: 'F1', lat: 36.1, lon: -115.2 },
];
const numbers = [
  ['2 days', 1, 'COP31 overtime, then no deal', '#f2b632'],
  ['12+', 2, 'killed by drones near Kyiv', '#ff8a7a'],
  ['~2,700', 2, 'drones at Ukraine in a week', '#7fb2ff'],
  ['2', 4, 'supertankers halted, Iran says', '#f2b632'],
  ['350+', 11, 'migrants on El Hierro in a day', '#7fe0a8'],
  ['6-2 7-6', 13, 'Alcaraz beats Zverev in Turin', '#c9a6ff'],
];
const utc = [
  ['00–03', 'Dymer hit'], ['~01:00', 'Benghazi ship hit'], ['05:28', 'Vegas GP'],
  ['~14:00', 'COP31: no deal'], ['14:25', 'Chabahar tanker'], ['17:54', 'Kh-101s named'],
  ['~19:00', 'Alcaraz wins'], ['~22:40', 'US futures up'],
];
const leftOut = [
  ['Russia\'s 400-drone barrage', 'Fri 20 Nov'], ['Bolsonaro taken to intensive care', 'Fri 20 Nov'], ['ICJ Myanmar genocide ruling', 'Thu 19 Nov'],
  ['"El Chapo Isidro" arrest', 'Sat 21 Nov'], ['Sparta II drone hit', 'Sat 21 Nov'], ['Serang factory fire', 'Sat 21 Nov'],
  ['Iran\'s strikes on Bahrain', 'Sat 21 Nov'], ['BepiColombo reaches Mercury', 'Sat 21 Nov'], ['Peru M6.7 earthquake', 'Sat 21 Nov'],
];

const flags = {
  sa: '<rect width="30" height="20" fill="#006c35"/><rect x="7" y="8" width="16" height="2" fill="#fff"/><rect x="9" y="12" width="12" height="1.5" fill="#fff"/>',
  ps: '<rect width="30" height="6.7" fill="#000"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#149954"/><path d="M0 0 L12 10 L0 20z" fill="#e4312b"/>',
  il: '<rect width="30" height="20" fill="#fff"/><rect y="2.5" width="30" height="2.5" fill="#0038b8"/><rect y="15" width="30" height="2.5" fill="#0038b8"/><path d="M15 6.5 l3 5.2 h-6z M15 13.5 l3 -5.2 h-6z" fill="none" stroke="#0038b8" stroke-width="1"/>',
  ua: '<rect width="30" height="10" fill="#0057b7"/><rect y="10" width="30" height="10" fill="#ffd700"/>',
  tr: '<rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.3" cy="10" r="4" fill="#e30a17"/><path d="M17 10 l3.5 -1.2 l-2.2 3 v-3.6 l2.2 3z" fill="#fff"/>',
  ke: '<rect width="30" height="20" fill="#fff"/><rect width="30" height="6" fill="#000"/><rect y="7" width="30" height="6" fill="#bb0000"/><rect y="14" width="30" height="6" fill="#006600"/><ellipse cx="15" cy="10" rx="3" ry="6" fill="#bb0000" stroke="#fff" stroke-width=".8"/>',
  np: '<rect width="30" height="20" fill="#f7f3ea"/><path d="M8 1 L22 10 H12 L22 19 H8z" fill="#dc143c" stroke="#003893" stroke-width="1.2"/>',
  pk: '<rect width="30" height="20" fill="#01411c"/><rect width="8" height="20" fill="#fff"/><circle cx="19" cy="10" r="5" fill="#fff"/><circle cx="20.5" cy="8.8" r="4.4" fill="#01411c"/>',
  bd: '<rect width="30" height="20" fill="#006a4e"/><circle cx="13.5" cy="10" r="5.5" fill="#f42a41"/>',
  us: '<rect width="30" height="20" fill="#fff"/><g fill="#b22234"><rect width="30" height="2.2"/><rect y="4.4" width="30" height="2.2"/><rect y="8.8" width="30" height="2.2"/><rect y="13.2" width="30" height="2.2"/><rect y="17.6" width="30" height="2.4"/></g><rect width="13" height="11" fill="#3c3b6e"/>',
  pt: '<rect width="30" height="20" fill="#da291c"/><rect width="12" height="20" fill="#046a38"/><circle cx="12" cy="10" r="3.5" fill="#ffe900"/>',
};
const flag = (f) => `<svg class="flag" viewBox="0 0 30 20">${flags[f]}</svg>`;
const badge = (st) => `<span class="st" style="background:${ST[st][1]}">${ST[st][0]}</span>`;

const regionCount = {};
for (const s of [...leads, ...cards, ...briefs]) regionCount[s.r] = (regionCount[s.r] || 0) + 1;
const total = leads.length + cards.length + briefs.length;
const chips = Object.entries(R).filter(([k]) => regionCount[k]).map(([k, [name, c]]) => `<span class="chip" style="background:${c}">${name.toUpperCase()} ${regionCount[k]}</span>`).join('');

const leadHtml = (s) => `<div class="lead">
  <div class="pic">${s.pic}<span class="pill"><i style="background:${R[s.r][1]}">${s.n}</i>${s.place.toUpperCase()}</span>${badge(s.st)}</div>
  <div class="kick" style="color:${R[s.r][1]}">${R[s.r][0].toUpperCase()} <span>· ${s.field.toUpperCase()}</span></div>
  <h2>${s.h}</h2><div class="sub">${s.sub}</div><div class="src">${s.src}</div></div>`;
const cardHtml = (s) => `<div class="card">
  <div class="pic">${s.pic}<span class="pill"><i style="background:${R[s.r][1]}">${s.n}</i>${s.place.toUpperCase()}</span>${badge(s.st)}</div>
  <div class="kick" style="color:${R[s.r][1]}">${R[s.r][0].toUpperCase()} <span>· ${s.field.toUpperCase()}</span></div>
  <h3>${s.h}</h3><div class="sub">${s.sub}</div><div class="src">${s.src}</div></div>`;
const briefHtml = (s, i) => `<div class="brief">${flag(s.f)}<div><div class="bh"><b style="color:${R[s.r][1]}">${14 + i}</b> ${s.h}${s.st ? ' ' + badge(s.st) : ''}</div><div class="bs"><span>${s.sub}</span><em>${s.src}</em></div></div></div>`;

const pins = [...leads, ...cards].map((s) => ({ n: s.n, lat: s.lat, lon: s.lon, c: R[s.r][1] }));
const dots = briefs.map((s) => ({ lat: s.lat, lon: s.lon, c: R[s.r][1] }));

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>The World on Sunday 22 November 2026</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; background: #f5f0e4; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1b2130; position: relative; font-variant-numeric: lining-nums; }
  .caps, .chip, .st, .pill, .kick { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; letter-spacing: .4px; }
  h1 { font-family: Georgia, serif; font-weight: 700; font-size: 100px; line-height: 92px; height: 92px; white-space: nowrap; color: #111; letter-spacing: -2px; transform-origin: left center; padding-left: 10px; }
  .meta { display: flex; align-items: center; gap: 6px; padding: 4px 12px 0; height: 22px; font-size: 11.5px; }
  .meta .count { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; margin-right: 8px; }
  .chip { color: #fff; font-size: 9.6px; padding: 1px 5px; border-radius: 2px; }
  .meta .press { margin-left: auto; color: #c0392b; font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; }
  .utc { margin: 4px 12px 0; height: 20px; background: #14213d; color: #e9edf5; border-radius: 2px; display: flex; align-items: center; gap: 7px; padding: 0 8px; font-size: 10.3px; white-space: nowrap; overflow: hidden; }
  .utc .lab { background: #fff; color: #14213d; font-size: 9.5px; padding: 0 4px; border-radius: 2px; }
  .utc b { color: #7fb2ff; font-weight: 700; margin-right: 3px; }
  .utc .sep { color: #5b6a86; }
  .top { display: flex; gap: 8px; padding: 6px 12px 0; height: 246px; }
  .lead { width: 268px; flex: 0 0 268px; background: #fffdf7; border: 1px solid #d8cfbd; }
  .lead .pic { height: 112px; }
  .pic { position: relative; overflow: hidden; }
  .pic svg.scene { display: block; width: 100%; height: 100%; }
  .pill { position: absolute; left: 6px; top: 6px; background: #fff; color: #14213d; font-size: 10.4px; padding: 1px 6px 1px 2px; border-radius: 2px; display: flex; align-items: center; gap: 5px; box-shadow: 0 1px 2px rgba(0,0,0,.25); }
  .pill i { display: inline-flex; width: 15px; height: 15px; border-radius: 50%; color: #fff; font-style: normal; font-size: 9.5px; align-items: center; justify-content: center; }
  .st { position: absolute; right: 6px; bottom: 6px; color: #fff; font-size: 9.4px; padding: 1px 5px; border-radius: 2px; }
  .brief .st { position: static; font-size: 8.4px; padding: 0 4px; vertical-align: 1px; }
  .kick { font-size: 10.2px; padding: 6px 8px 0; }
  .kick span { color: #6b7280; }
  .lead h2 { font-family: Georgia, serif; font-size: 25px; line-height: 1.06; padding: 3px 8px 0; color: #111; letter-spacing: -.3px; }
  .sub { font-size: 11px; font-weight: 600; padding: 3px 8px 0; line-height: 1.25; color: #2b3140; }
  .src { font-size: 9.6px; color: #7a8090; padding: 2px 8px 0; white-space: nowrap; overflow: hidden; }
  .nums { flex: 1; background: #1c2333; color: #fff; padding: 8px 10px; }
  .nums .h { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: .6px; color: #e9edf5; margin-bottom: 3px; }
  .nums .row { height: 35px; }
  .nums b { font-family: Georgia, serif; font-size: 22px; line-height: 21px; display: block; }
  .nums .lbl { font-size: 10px; color: #dfe4ee; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
  .nums .lbl i { display: inline-flex; width: 14px; height: 14px; border-radius: 50%; background: #fff; color: #1c2333; font-style: normal; font-size: 8.5px; font-weight: 700; align-items: center; justify-content: center; flex: 0 0 auto; }
  .cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px 8px; padding: 7px 12px 0; }
  .card { background: #fffdf7; border: 1px solid #d8cfbd; height: 166px; overflow: hidden; }
  .card .pic { height: 58px; }
  .card .kick { font-size: 9.4px; padding-top: 5px; }
  .card h3 { font-family: Georgia, serif; font-size: 17px; line-height: 1.08; padding: 2px 8px 0; color: #111; letter-spacing: -.2px; }
  .card .sub { font-size: 10.4px; }
  .card .src { font-size: 9px; }
  .also { padding: 7px 12px 0; }
  .also .hd { display: flex; align-items: center; gap: 6px; border-bottom: 2px solid #111; padding-bottom: 2px; font-size: 9.6px; color: #4b5262; }
  .also .hd .t { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 12px; color: #111; margin-right: auto; letter-spacing: .5px; }
  .also .hd .st { position: static; font-size: 8.6px; }
  .bgrid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-flow: column; grid-template-rows: repeat(4, 30px); column-gap: 14px; padding-top: 4px; }
  .brief { display: flex; gap: 6px; align-items: flex-start; overflow: hidden; }
  .flag { width: 21px; height: 14px; flex: 0 0 21px; margin-top: 2px; box-shadow: 0 0 0 1px #c9c2b2; }
  .brief > div { min-width: 0; flex: 1; }
  .bh { font-size: 12.4px; font-weight: 700; line-height: 15px; white-space: nowrap; overflow: hidden; color: #111; }
  .bs { font-size: 9.8px; color: #5b6272; display: flex; justify-content: space-between; gap: 6px; white-space: nowrap; line-height: 13px; }
  .bs span { overflow: hidden; text-overflow: ellipsis; }
  .bs em { font-style: italic; color: #8a8f99; flex: 0 0 auto; }
  .bottom { display: flex; gap: 10px; padding: 6px 12px 0; }
  .check { flex: 1; border: 2px solid #c0392b; background: #fbefe9; padding: 5px 9px; height: 118px; }
  .check .tg { display: inline-block; background: #c0392b; color: #fff; font-family: Bahnschrift, 'Segoe UI', sans-serif; font-weight: 700; font-size: 11px; padding: 2px 6px; letter-spacing: .6px; margin-right: 8px; }
  .check .lead1 { font-size: 12.4px; font-weight: 600; line-height: 1.3; }
  .check .lo { color: #c0392b; font-weight: 700; font-size: 11px; margin: 5px 0 2px; }
  .check .items { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 10px; row-gap: 1px; font-size: 10.6px; }
  .check .items span em { color: #c0392b; font-style: normal; font-weight: 700; margin-left: 4px; }
  .mapbox { width: 292px; flex: 0 0 292px; border: 1px solid #c9c2b2; background: #fff; padding: 3px 5px; height: 118px; }
  .mapbox .hd { display: flex; justify-content: space-between; font-size: 9.4px; color: #6b7280; }
  .mapbox .hd b { font-family: Bahnschrift, 'Segoe UI', sans-serif; color: #111; letter-spacing: .5px; }
  .foot { position: absolute; left: 12px; right: 12px; bottom: 3px; border-top: 1px solid #111; padding-top: 2px; display: flex; justify-content: space-between; font-size: 9.2px; color: #4b5262; white-space: nowrap; }
  .foot em { font-style: italic; }
</style>
</head>
<body>
<h1 id="date">Sunday 22 November 2026</h1>
<div class="meta"><span class="count">${total} STORIES · ${Object.keys(regionCount).filter((k) => k !== 'gl').length} REGIONS · ALL FROM THIS ONE DAY</span>${chips}<span class="press">FULL DAY · 00:00–24:00 UTC</span></div>
<div class="utc"><span class="lab caps">UTC</span>${utc.map(([t, x]) => `<span><b>${t}</b>${x}</span>`).join('<span class="sep">›</span>')}</div>
<section class="top">${leads.map(leadHtml).join('')}
  <div class="nums"><div class="h">THE DAY IN NUMBERS</div>${numbers.map(([v, n, l, c]) => `<div class="row"><b style="color:${c}">${v}</b><div class="lbl"><i>${n}</i>${l}</div></div>`).join('')}</div>
</section>
<section class="cards">${cards.map(cardHtml).join('')}</section>
<section class="also">
  <div class="hd"><span class="t">ALSO ON SUNDAY 22 NOVEMBER</span>${badge('conf')} official / 2+ outlets ${badge('off')} on the record ${badge('clm')} one side's claim</div>
  <div class="bgrid">${briefs.map(briefHtml).join('')}</div>
</section>
<section class="bottom">
  <div class="check"><div class="lead1"><span class="tg">DATE CHECK</span>Every story on this page happened or was first reported on Sun 22 Nov 2026 (UTC), across the full day, 00:00–24:00 UTC.</div>
    <div class="lo">Left out because they happened on another day:</div>
    <div class="items">${leftOut.map(([x, d]) => `<span>${x}<em>${d}</em></span>`).join('')}</div></div>
  <div class="mapbox"><div class="hd"><b>WHERE IT HAPPENED</b><span>pins = story numbers</span></div><svg id="map" width="280" height="98" viewBox="0 0 280 98"></svg></div>
</section>
<div class="foot"><span>Sources: UN News · Reuters · AFP · AP · Al Jazeera · France 24 · Euronews · Xinhua · Anadolu · Kyiv governor · WHO · Dawn · CNBC</span><em>Scenes are drawn illustrations · full day to 24:00 UTC</em></div>
<script>
  // Fit the date to the full width.
  const d = document.getElementById('date');
  d.style.transform = 'scaleX(' + Math.min(1, 1004 / d.scrollWidth) + ')';
  // Hand-drawn world map, equirectangular: longitude -170..190, latitude 78..-50.
  const W = 280, H = 98, px = (lon, lat) => [((lon + 170) / 360) * W, ((78 - lat) / 128) * H];
  const land = ${JSON.stringify([
    [[-168,66],[-162,70],[-140,70],[-125,72],[-95,75],[-80,73],[-62,62],[-56,52],[-66,45],[-70,42],[-76,35],[-81,30],[-80,25],[-84,30],[-90,29],[-97,26],[-97,20],[-90,16],[-84,10],[-79,8],[-88,14],[-105,20],[-110,24],[-115,30],[-118,34],[-124,40],[-124,48],[-131,55],[-140,59],[-152,58],[-165,55],[-160,60],[-166,62]],
    [[-55,60],[-45,60],[-20,70],[-20,77],[-40,78],[-62,78],[-72,76],[-58,70]],
    [[-79,8],[-72,12],[-62,11],[-52,5],[-35,-5],[-38,-13],[-40,-22],[-48,-26],[-58,-34],[-62,-40],[-65,-46],[-68,-50],[-74,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,1]],
    [[-10,36],[-9,43],[-2,44],[-5,48],[2,51],[8,54],[8,57],[5,62],[14,68],[25,71],[40,68],[60,69],[80,73],[100,76],[115,74],[140,73],[160,70],[180,68],[188,66],[170,60],[163,57],[156,51],[143,59],[135,55],[141,48],[130,42],[129,35],[122,40],[121,31],[118,24],[110,21],[108,16],[109,11],[105,9],[100,13],[99,8],[103,1],[98,8],[97,16],[92,21],[88,22],[80,15],[77,8],[73,17],[72,21],[67,25],[61,25],[57,26],[56,24],[59,22],[52,16],[44,12],[43,16],[39,22],[35,28],[34,31],[36,36],[27,37],[23,38],[19,42],[13,45],[16,38],[10,44],[3,43],[-2,37],[-6,36]],
    [[-5,50],[1,51],[2,53],[-2,57],[-5,58],[-6,55],[-3,54],[-5,52]],
    [[-17,21],[-16,12],[-12,7],[-8,4],[-3,5],[5,6],[9,4],[10,-2],[13,-8],[12,-17],[15,-27],[18,-34],[25,-34],[32,-28],[35,-22],[40,-15],[40,-5],[44,-1],[51,11],[43,12],[37,19],[32,31],[20,32],[10,37],[-1,36],[-6,36],[-10,30]],
    [[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],
    [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[141,-38],[131,-31],[115,-34]],
    [[130,31],[135,34],[141,41],[142,45],[144,43],[140,38],[139,35],[132,33]],
    [[95,5],[100,1],[106,-6],[104,-5],[98,2]], [[109,1],[117,7],[119,1],[116,-4],[110,-3]], [[131,-1],[141,-3],[150,-10],[141,-9],[137,-5]],
  ])};
  const pins = ${JSON.stringify(pins)}, dots = ${JSON.stringify(dots)};
  const map = document.getElementById('map'), ns = 'http://www.w3.org/2000/svg';
  const el = (n, a) => { const e = document.createElementNS(ns, n); for (const k in a) e.setAttribute(k, a[k]); map.append(e); return e; };
  el('rect', { width: W, height: H, fill: '#dde9f3' });
  for (const p of land) el('polygon', { points: p.map(([lo, la]) => px(lo, la).map((v) => v.toFixed(1)).join(',')).join(' '), fill: '#efe3c2', stroke: '#cdbb8f', 'stroke-width': .5 });
  for (const q of dots) { const [x, y] = px(q.lon, q.lat); el('circle', { cx: x, cy: y, r: 2.3, fill: q.c, stroke: '#fff', 'stroke-width': .6 }); }
  const P = pins.map((p) => { const [x, y] = px(p.lon, p.lat); return { ...p, x0: x, y0: y, x, y }; }), Rr = 6.4;
  for (let it = 0; it < 400; it++) { for (const a of P) for (const b of P) { if (a === b) continue; const dx = b.x - a.x, dy = b.y - a.y, dd = Math.hypot(dx, dy) || .01; if (dd < 2 * Rr + 1) { const k = (2 * Rr + 1 - dd) / 2; a.x -= dx / dd * k; a.y -= dy / dd * k; b.x += dx / dd * k; b.y += dy / dd * k; } } for (const p of P) { p.x = Math.min(W - Rr, Math.max(Rr, p.x)); p.y = Math.min(H - Rr, Math.max(Rr, p.y)); } }
  for (const p of P) if (Math.hypot(p.x - p.x0, p.y - p.y0) > 2) el('line', { x1: p.x0, y1: p.y0, x2: p.x, y2: p.y, stroke: '#1b2130', 'stroke-width': .7 });
  for (const p of P) { el('circle', { cx: p.x, cy: p.y, r: Rr, fill: p.c, stroke: '#fff', 'stroke-width': 1 }); const t = el('text', { x: p.x, y: p.y + 2.9, 'text-anchor': 'middle', 'font-size': 8, 'font-weight': 700, fill: '#fff', 'font-family': 'Segoe UI' }); t.textContent = p.n; }
</script>
</body>
</html>
`;
fs.writeFileSync(require('path').join(__dirname, 'front.html'), html);
console.log('v9 written:', total, 'stories');
