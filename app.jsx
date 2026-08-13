import React, { useState, useMemo, useRef, useEffect } from "react";

/* ============================================================
   THE BOARD — Recruiting War Room Prototype
   Desktop: drag-and-drop board (position × grade)
   iPhone: roster → profile → one-thumb call actions
   ============================================================ */

const GRADES = [
  { id: "RARE", label: "Rare", color: "#0B0B0D", text: "#FFFFFF", tint: "rgba(0,0,0,0.35)" },
  { id: "ALL_LEAGUE", label: "All-League", color: "#39FF14", text: "#0B0B0D", tint: "rgba(57,255,20,0.07)" },
  { id: "WINNABLE_PLUS", label: "Winnable +", color: "#4A4F57", text: "#FFFFFF", tint: "rgba(74,79,87,0.22)" },
  { id: "WINNABLE_MINUS", label: "Winnable −", color: "#C6CBD3", text: "#14181F", tint: "rgba(198,203,211,0.10)" },
  { id: "NGE", label: "NGE", color: "#7B2FBE", text: "#FFFFFF", tint: "rgba(123,47,190,0.10)" },
  { id: "BUST", label: "Bust", color: "#FFD60A", text: "#14181F", tint: "rgba(255,214,10,0.07)" },
  { id: "UNGRADED", label: "Ungraded", color: "#2A323E", text: "#8B95A5", tint: "rgba(255,255,255,0.02)" },
];
const gradeById = (id) => GRADES.find((g) => g.id === (id || "UNGRADED")) || GRADES[6];

const OFFENSE = [
  { id: "QB", label: "QB" },
  { id: "RB", label: "RB" },
  { id: "WR_OUT", label: "OUT WR" },
  { id: "WR_SLOT", label: "SLOT WR" },
  { id: "TE", label: "TE" },
  { id: "OL_SWING", label: "SWING OL" },
  { id: "OL_INT", label: "INT OL" },
];
const DEFENSE = [
  { id: "DE", label: "DE" },
  { id: "DT", label: "DT" },
  { id: "NT", label: "NT" },
  { id: "EDGE", label: "EDGE" },
  { id: "ILB", label: "ILB" },
  { id: "NICKEL", label: "NICKEL" },
  { id: "CB", label: "CB" },
  { id: "SAF", label: "SAF" },
];
const SPECIALISTS = [
  { id: "K", label: "K" },
  { id: "P", label: "P" },
  { id: "LS", label: "LS" },
];
const ALL_POS = [...OFFENSE, ...DEFENSE, ...SPECIALISTS];
const posLabel = (id) => (ALL_POS.find((p) => p.id === id) || {}).label || id;

const STATUSES = [
  { id: "NONE", label: "No status", short: "", color: "transparent", text: "#8B95A5" },
  { id: "OFFERED", label: "Offered", short: "OFF", color: "#1F6FEB", text: "#FFFFFF" },
  { id: "COMMITTED", label: "Committed", short: "COMMIT", color: "#1F9D55", text: "#FFFFFF" },
  { id: "ELSEWHERE", label: "Committed elsewhere", short: "GONE", color: "#C0392B", text: "#FFFFFF" },
];
const statusById = (id) => STATUSES.find((s) => s.id === (id || "NONE")) || STATUSES[0];

const STAFF_GROUPS = [
  {
    label: "Coaches",
    members: [
      "Lanning HC", "Hampton DC", "Mehringer OC", "Samples AHC/RB", "Lorig STC",
      "Araghi Edge", "Douglas WR", "Ka'ai QB", "Michalowski ILB", "Terry OL",
      "Tuioti DL", "Wadood CB", "Smith TE",
    ],
  },
  {
    label: "Assistants & Performance",
    members: [
      "Love S&C", "Kincy Assoc S&C", "Bolton Speed", "Jordan Asst S&C",
      "Ellington Asst WR", "Johnson Asst QB", "Walk Asst OL",
      "Barraza Def Asst", "Bartee Def Asst", "Cogan Def Asst", "Harrison Def Asst",
      "Reed Def Asst", "Rowan Def Asst", "Silva Def Asst", "Stone Def Asst",
      "Cavanaugh Off Asst", "Herron Off Asst", "Kindell Off Asst", "Moore Off Asst",
      "Switzer Off Asst", "Traynor Off Asst", "Whipple Off Asst", "White Off Asst",
      "McElwain ST Asst",
    ],
  },
  {
    label: "Personnel & Operations",
    members: [
      "Malchow CoS", "Hawkins Sr Assoc AD", "Noyer Asst AD", "Look FB Ops",
      "Noyer Ext Rel", "Mahina Academics", "Kamara Player Dev", "Holmes FB Affairs",
      "Dean GM", "Gibbs Asst GM", "Kaneda Personnel", "Young HS Scouting",
      "Sayyah Recruiting", "McKinley Scouting", "Abeln Def Personnel",
      "DiMario Off Personnel", "McKenna Personnel Strat", "West OC Recruiting",
      "Hebert Rec Strategy", "Stemmler Asst Personnel", "King Asst Personnel",
      "Dixon Asst Personnel", "Stephens Asst Personnel",
    ],
  },
];
const STAFF = STAFF_GROUPS.flatMap((g) => g.members);
const RELATIONSHIPS = ["Mom", "Dad", "Guardian", "Coach", "Other"];

/* ---------- Tenancy: each program gets its own walled-off board ---------- */
const TENANT = {
  id: "oregon",
  name: "Oregon Football",
  short: "OREGON",
  primary: "#154733", // Oregon green
  accent: "#FEE123",  // Oregon yellow
};
const BOARD_KEY = "board-" + TENANT.id;

/* ---------- Storage adapter ----------
   Priority: Supabase (if configured in config.js) > Claude artifact storage > this device (localStorage).
   The same file therefore runs as a Claude artifact AND as a standalone GitHub Pages app. */
const _CFG = (typeof window !== "undefined" && window.BOARD_CONFIG) || {};
function makeSupabaseStore(cfg) {
  const headers = { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey };
  const base = cfg.url.replace(/\/$/, "") + "/rest/v1/boards";
  return {
    mode: "cloud",
    async get(key) {
      const r = await fetch(base + "?key=eq." + encodeURIComponent(key) + "&select=value", { headers });
      if (!r.ok) throw new Error("fetch failed");
      const j = await r.json();
      if (!j.length) throw new Error("not found");
      return { value: j[0].value };
    },
    async set(key, value) {
      const r = await fetch(base, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error("save failed");
      return { value };
    },
  };
}
const artifactStore = {
  mode: "shared",
  async get(key) { return await window.storage.get(key, true); },
  async set(key, value) { return await window.storage.set(key, value, true); },
};
const localStore = {
  mode: "device",
  async get(key) {
    const v = window.localStorage.getItem(key);
    if (v === null) throw new Error("not found");
    return { value: v };
  },
  async set(key, value) { window.localStorage.setItem(key, value); return { value }; },
};
const boardStore =
  _CFG.supabase && _CFG.supabase.url && _CFG.supabase.anonKey ? makeSupabaseStore(_CFG.supabase)
  : (typeof window !== "undefined" && window.storage) ? artifactStore
  : localStore;
const STORAGE_MODE = boardStore.mode;

/* Real handset (installed PWA / mobile Safari): render the phone UI full-screen, no bezel */
const IS_SMALL = (() => {
  try { return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 560px)").matches; }
  catch (e) { return false; }
})();
const APP_ICON = "data:image/png;base64,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";

/* ---------- Sample data (all fictional) ---------- */
let _uid = 0;
const P = (name, jersey, pos, cls, grade, order, extra = {}) => ({
  id: `p${++_uid}`,
  name,
  jersey,
  positionGroup: pos,
  classYear: cls,
  grade,
  order,
  status: extra.status || "NONE",
  school: extra.school || { name: "Desert Ridge HS", address: "10045 E Madero Ave, Mesa, AZ 85209" },
  birthday: extra.birthday || "2009-03-14",
  cell: extra.cell || "555-201-7788",
  homeAddress: extra.home || "1428 E Palomino Dr, Gilbert, AZ 85296",
  parents: extra.parents || [
    { name: "Parent / Guardian", relationship: "Mom", cell: "555-201-7789", notes: "Primary decision-maker. Prefers texts before calls." },
  ],
  callLog: extra.callLog || [],
  miscNotes: extra.miscNotes || "",
  updatedBy: "Sayyah Recruiting",
  updatedAt: "Aug 12, 7:42 PM",
});

const initialPlayers = [
  P("Marcus Reyes", 7, "QB", 2027, "RARE", 1, {
    school: { name: "Lake Travis HS", address: "3324 Ranch Rd 620 S, Austin, TX 78738" },
    birthday: "2008-11-02", cell: "555-318-4410",
    home: "77 Vista Ridge Ct, Austin, TX 78738",
    parents: [
      { name: "Elena Reyes", relationship: "Mom", cell: "555-318-4411", notes: "Runs the recruitment. Wants academic plan in writing. Warm but direct." },
      { name: "Carlos Reyes", relationship: "Dad", cell: "555-318-4412", notes: "Former JUCO QB. Talk scheme with him — he'll ask about protections." },
    ],
    callLog: [
      { ts: "Aug 10, 6:15 PM", by: "Lanning HC", notes: "45 min. Family visit set for Sept 12. Mom asked about early enrollment." },
      { ts: "Jul 29, 4:02 PM", by: "Mehringer OC", notes: "Walked through install video. He asked great questions on RPO reads." },
    ],
    miscNotes: "Fast processor. 3.9 GPA. Rival visit scheduled Sept 20 — get him on campus first.",
    status: "OFFERED",
  }),
  P("Dakota Hill", 12, "QB", 2028, "ALL_LEAGUE", 1, { birthday: "2009-06-21", status: "OFFERED" }),
  P("Trey Wallace", 3, "QB", 2027, "WINNABLE_PLUS", 1),
  P("Jaylen Brooks", 21, "RB", 2027, "ALL_LEAGUE", 1, {
    school: { name: "Bishop Gorman HS", address: "5959 S Hualapai Way, Las Vegas, NV 89148" },
    status: "OFFERED",
  }),
  P("Cole Msuya", 28, "RB", 2028, "WINNABLE_PLUS", 1),
  P("Devon Carter", 33, "RB", 2027, "NGE", 1),
  P("Zion Alofa", 11, "WR_OUT", 2027, "RARE", 1, {
    school: { name: "Central Catholic HS", address: "2401 SE Stark St, Portland, OR 97214" },
    status: "COMMITTED",
    miscNotes: "COMMITTED 7/4. Keep the fire lit — rival staffs still calling.",
  }),
  P("Kade Simmons", 18, "WR_OUT", 2028, "WINNABLE_PLUS", 1),
  P("Amari Foster", 1, "WR_OUT", 2027, "WINNABLE_MINUS", 1),
  P("Ty Nakamura", 5, "WR_SLOT", 2027, "ALL_LEAGUE", 1, { birthday: "2009-01-30" }),
  P("Reece Calloway", 14, "WR_SLOT", 2028, null, 1),
  P("Brock Feldman", 85, "TE", 2027, "WINNABLE_PLUS", 1),
  P("Mose Tuiasosopo", 44, "TE", 2028, "ALL_LEAGUE", 1, { status: "OFFERED" }),
  P("Grant Okafor", 72, "OL_SWING", 2027, "RARE", 1, {
    school: { name: "Manhattan HS", address: "2100 Poyntz Ave, Manhattan, KS 66502" },
    status: "OFFERED",
  }),
  P("Judd Rasmussen", 65, "OL_SWING", 2028, "WINNABLE_MINUS", 1),
  P("Paulo Vea", 55, "OL_INT", 2027, "WINNABLE_PLUS", 1),
  P("Hank Dozier", 60, "OL_INT", 2027, "BUST", 1, { miscNotes: "Film doesn't match camp hype. Re-check senior tape before any offer talk." }),
  P("Malik Sorenson", 90, "DE", 2027, "ALL_LEAGUE", 1, { status: "OFFERED" }),
  P("Chase Bigelow", 92, "DE", 2028, "WINNABLE_MINUS", 1),
  P("Tavita Fonoti", 99, "DT", 2027, "WINNABLE_PLUS", 1),
  P("Dre Whitaker", 95, "NT", 2027, "ALL_LEAGUE", 1),
  P("Kingston Blake", 4, "EDGE", 2027, "RARE", 1, {
    school: { name: "Duncanville HS", address: "900 W Camp Wisdom Rd, Duncanville, TX 75116" },
    status: "ELSEWHERE",
    miscNotes: "Committed to rival 8/1. Monitor — decommit chatter from 7-on-7 circuit.",
  }),
  P("Rowan Beck", 40, "ILB", 2028, "WINNABLE_PLUS", 1),
  P("Silas Vaughn", 2, "NICKEL", 2027, "WINNABLE_MINUS", 1),
  P("Izaiah Cortez", 8, "CB", 2027, "ALL_LEAGUE", 1, { status: "OFFERED" }),
  P("Deuce Latham", 24, "CB", 2028, null, 1),
  P("Quentin Marsh", 26, "SAF", 2027, "NGE", 1),
  P("Beau Kekoa", 6, "SAF", 2027, "WINNABLE_PLUS", 1, { school: { name: "Saint Louis School", address: "3142 Waialae Ave, Honolulu, HI 96816" } }),
  P("Aidan Petrov", 39, "K", 2027, "ALL_LEAGUE", 1, {
    school: { name: "Jesuit HS", address: "9000 SW Beaverton Hillsdale Hwy, Portland, OR 97225" },
    miscNotes: "58-yd range in camp. Kicks for a nationally ranked soccer club too — clarify commitment level.",
    status: "OFFERED",
  }),
  P("Finn Gallagher", 47, "K", 2028, null, 1),
  P("Boone Whitley", 36, "P", 2027, "WINNABLE_PLUS", 1, { miscNotes: "Aussie-style roller. 4.6s hang on tape." }),
  P("Gus Reinhardt", 49, "LS", 2027, "WINNABLE_MINUS", 1),
];

/* ---------- Oregon 2027 commits \u2014 loaded from 247Sports & On3 (public data only;
   contact info, family, and addresses intentionally left blank for staff to fill in) ---------- */
const REAL_COMMITS = [
  { id: "uo27-01", name: "Dakota Guerrant", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 100, status: "COMMITTED",
    school: { name: "Harper Woods", address: "Harper Woods, MI" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/16/26 \u00b7 6-1 / 195 \u00b7 Listed: WR",
    links: { s247: "https://247sports.com/Player/dakota-guerrant-46142083/", on3: "https://www.on3.com/rivals/dakota-guerrant-236057/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-02", name: "Rashad Streets", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 101, status: "COMMITTED",
    school: { name: "Millbrook", address: "Raleigh, NC" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 4/3/26 \u00b7 6-4 / 230 \u00b7 Listed: Edge (247) / EDGE (On3)",
    links: { s247: "https://247sports.com/Player/rashad-streets-46154888/", on3: "https://www.on3.com/rivals/rashad-streets-249132/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-03", name: "Tae Walden Jr.", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 102, status: "COMMITTED",
    school: { name: "Collierville", address: "Collierville, TN" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 7/1/26 \u00b7 6-2.5 / 165 \u00b7 Listed: CB (247) / ATH (On3)",
    links: { s247: "https://247sports.com/Player/tae-walden-jr-46155066/", on3: "https://www.on3.com/rivals/tae-walden-jr-253081/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-04", name: "Semaj Stanford", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 103, status: "COMMITTED",
    school: { name: "Broken Arrow", address: "Broken Arrow, OK" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 4/23/26 \u00b7 5-11 / 180 \u00b7 Listed: S",
    links: { s247: "https://247sports.com/Player/semaj-stanford-46146499/", on3: "https://www.on3.com/rivals/semaj-stanford-237956/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-05", name: "Hayden Stepp", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 104, status: "COMMITTED",
    school: { name: "Bishop Gorman", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 7/1/26 \u00b7 6-3.5 / 185 \u00b7 Listed: CB",
    links: { s247: "https://247sports.com/Player/hayden-stepp-46147446/", on3: "https://www.on3.com/rivals/hayden-stepp-236793/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-06", name: "Xavier Sabb", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 105, status: "COMMITTED",
    school: { name: "Glassboro", address: "Glassboro, NJ" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 7/3/26 \u00b7 6-1 / 195 \u00b7 Listed: ATH (247) / WR (On3)",
    links: { s247: "https://247sports.com/Player/xavier-sabb-46142626/", on3: "https://www.on3.com/rivals/xavier-sabb-159065/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-07", name: "Will Mencl", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 106, status: "COMMITTED",
    school: { name: "Chandler", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 4/22/26 \u00b7 6-3 / 200 \u00b7 Listed: QB",
    links: { s247: "https://247sports.com/Player/will-mencl-46156781/", on3: "https://www.on3.com/rivals/will-mencl-250911/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-08", name: "Toa Satele", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 107, status: "COMMITTED",
    school: { name: "Mililani", address: "Mililani, HI" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/3/26 \u00b7 6-3 / 200 \u00b7 Listed: LB",
    links: { s247: "https://247sports.com/Player/toa-satele-46145646/", on3: "https://www.on3.com/rivals/toa-satele-250202/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-09", name: "Cameron Pritchett", jersey: "\u2014", positionGroup: "DE", classYear: 2027, grade: null, order: 108, status: "COMMITTED",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/2/25 \u00b7 6-3 / 231 \u00b7 Listed: Edge (247) / DL (On3)",
    links: { s247: "https://247sports.com/Player/cameron-pritchett-46145331/", on3: "https://www.on3.com/rivals/cam-pritchett-179776/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-10", name: "Zane Rowe", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 109, status: "COMMITTED",
    school: { name: "Denton Guyer", address: "Denton, TX" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 3/13/26 \u00b7 6-4.5 / 265 \u00b7 Listed: DL",
    links: { s247: "https://247sports.com/Player/zane-rowe-46139730/", on3: "https://www.on3.com/rivals/zane-rowe-162696/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-11", name: "CaDarius McMiller", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 110, status: "COMMITTED",
    school: { name: "Tyler High", address: "Tyler, TX" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 2/14/26 \u00b7 6-1 / 196 \u00b7 Listed: RB",
    links: { s247: "https://247sports.com/Player/cadarius-mcmiller-46144140/", on3: "https://www.on3.com/rivals/cadarius-mcmiller-179453/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-12", name: "Josiah Molden", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 111, status: "COMMITTED",
    school: { name: "West Linn", address: "West Linn, OR" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 4/12/26 \u00b7 6-0 / 175 \u00b7 Listed: CB",
    links: { s247: "https://247sports.com/Player/josiah-molden-46140791/", on3: "https://www.on3.com/rivals/josiah-molden-180306/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-13", name: "Cameron Wagner", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 112, status: "COMMITTED",
    school: { name: "St. Joseph-Ogden", address: "St. Joseph, IL" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 5/11/26 \u00b7 6-6 / 300 \u00b7 Listed: OT",
    links: { s247: "https://247sports.com/Player/cameron-wagner-46148737/", on3: "https://www.on3.com/rivals/cameron-wagner-241683/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-14", name: "Gus Corsair", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 113, status: "COMMITTED",
    school: { name: "Hays", address: "Hays, KS" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 5/7/26 \u00b7 6-2.5 / 285 \u00b7 Listed: IOL",
    links: { s247: "https://247sports.com/Player/gus-corsair-46150698/", on3: "https://www.on3.com/rivals/gus-corsair-243716/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-15", name: "Avery Michael", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 114, status: "COMMITTED",
    school: { name: "Turlock", address: "Turlock, CA" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 2/1/26 \u00b7 6-6 / 290 \u00b7 Listed: OT (247) / IOL (On3)",
    links: { s247: "https://247sports.com/Player/avery-michael-46157076/", on3: "https://www.on3.com/rivals/avery-michael-269936/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-16", name: "Malakai Taufoou", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 115, status: "COMMITTED",
    school: { name: "Junipero Serra", address: "San Mateo, CA" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 5/23/26 \u00b7 6-2 / 200 \u00b7 Listed: S",
    links: { s247: "https://247sports.com/Player/malakai-taufoou-46150652/", on3: "https://www.on3.com/rivals/malakai-taufoou-250203/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-17", name: "Brandon Lockley", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 116, status: "COMMITTED",
    school: { name: "St. Joseph's Prep", address: "Philadelphia, PA" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 4/26/26 \u00b7 6-2 / 216 \u00b7 Listed: LB",
    links: { s247: "https://247sports.com/Player/brandon-lockley-46151331/", on3: "https://www.on3.com/rivals/brandon-lockley-jr-242551/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-18", name: "Anthony Cartwright III", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 117, status: "COMMITTED",
    school: { name: "Detroit Country Day", address: "Franklin, MI" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/28/26 \u00b7 6-5 / 235 \u00b7 Listed: ATH (247) / TE (On3)",
    links: { s247: "https://247sports.com/Player/anthony-cartwright-iii-46144402/", on3: "https://www.on3.com/rivals/anthony-cartwright-iii-238202/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-19", name: "Achilles Reyna", jersey: "\u2014", positionGroup: "DE", classYear: 2027, grade: null, order: 118, status: "COMMITTED",
    school: { name: "Rainier Beach", address: "Seattle, WA" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/8/26 \u00b7 6-8 / 250 \u00b7 Listed: DL",
    links: { s247: "https://247sports.com/Player/achilles-reyna-46154487/", on3: "https://www.on3.com/rivals/achilles-reyna-286004/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-20", name: "Josh Christensen", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 119, status: "COMMITTED",
    school: { name: "Lake Oswego", address: "Lake Oswego, OR" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/19/26 \u00b7 6-6 / 250 \u00b7 Listed: Edge (247) / EDGE (On3)",
    links: { s247: "https://247sports.com/Player/josh-christensen-46155573/", on3: "https://www.on3.com/rivals/josh-christensen-281791/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-21", name: "Lex Mailangi", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 120, status: "COMMITTED",
    school: { name: "Mater Dei", address: "Santa Ana, CA" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/24/26 \u00b7 6-3 / 350 \u00b7 Listed: IOL",
    links: { s247: "https://247sports.com/Player/lex-mailangi-46140630/", on3: "https://www.on3.com/rivals/lex-mailangi-155992/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-22", name: "Sam Ngata", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 121, status: "COMMITTED",
    school: { name: "Olympus", address: "Salt Lake City, UT" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 1/24/26 \u00b7 6-3.5 / 215 \u00b7 Listed: LB (247) / ATH (On3)",
    links: { s247: "https://247sports.com/Player/sam-ngata-46157095/", on3: "https://www.on3.com/rivals/sam-ngata-250889/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-23", name: "George VanSandt", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 122, status: "COMMITTED",
    school: { name: "Central Catholic", address: "Portland, OR" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/8/26 \u00b7 6-5 / 235 \u00b7 Listed: TE",
    links: { s247: "https://247sports.com/Player/george-vansandt-46161991/", on3: "https://www.on3.com/rivals/george-vansandt-286183/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
  { id: "uo27-24", name: "Malachi Garlington", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 123, status: "COMMITTED",
    school: { name: "Adrienne C. Nelson", address: "Happy Valley, OR" }, birthday: "", cell: "", homeAddress: "",
    parents: [], callLog: [],
    miscNotes: "Committed 6/8/26 \u00b7 6-3 / 180 \u00b7 Listed: WR",
    links: { s247: "https://247sports.com/Player/malachi-garlington-46161630/", on3: "https://www.on3.com/rivals/malachi-garlington-281890/" },
    updatedBy: "247/On3 import", updatedAt: "Aug 13, 2026" },
];
initialPlayers.push(...REAL_COMMITS);


/* ---------- shared tokens ---------- */
const T = {
  bg: "#12161D",
  panel: "#1A2029",
  panel2: "#20272F",
  line: "#2A323E",
  text: "#E8ECF2",
  dim: "#8B95A5",
  chalk: "#F2F4F8",
};
const font = "'Oswald', 'Arial Narrow', 'Helvetica Neue', sans-serif";
const bodyFont = "'Inter', -apple-system, 'Segoe UI', sans-serif";

const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const telHref = (n) => "tel:" + n.replace(/[^\d+]/g, "");
const smsHref = (n) => "sms:" + n.replace(/[^\d+]/g, "");
const ftHref = (n) => "facetime:" + n.replace(/[^\d+]/g, "");
const nowStamp = () =>
  new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

/* ============================================================ */
export default function App() {
  const [user, setUser] = useState(null); // { name }
  const [loaded, setLoaded] = useState(false);
  const [syncState, setSyncState] = useState("idle"); // idle | saving | saved | error
  const [players, setPlayers] = useState(initialPlayers);
  const saveTimer = useRef(null);
  const skipNextSave = useRef(true);

  /* Load the shared board once on startup; seed it if this is the first run */
  useEffect(() => {
    (async () => {
      try {
        const r = await boardStore.get(BOARD_KEY);
        if (r && r.value) {
          const parsed = JSON.parse(r.value);
          const have = new Set(parsed.map((p) => p.id));
          const newCommits = REAL_COMMITS.filter((p) => !have.has(p.id));
          const merged = [...parsed, ...newCommits];
          skipNextSave.current = true;
          setPlayers(merged);
          if (newCommits.length) {
            try { await boardStore.set(BOARD_KEY, JSON.stringify(merged)); } catch (e2) { /* will retry on next edit */ }
          }
        } else {
          await boardStore.set(BOARD_KEY, JSON.stringify(initialPlayers));
        }
      } catch (e) {
        try { await boardStore.set(BOARD_KEY, JSON.stringify(initialPlayers)); } catch (e2) { /* offline: work locally */ }
      }
      setLoaded(true);
    })();
  }, []);

  /* Debounced save of the whole board to shared storage */
  useEffect(() => {
    if (!loaded) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncState("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        await boardStore.set(BOARD_KEY, JSON.stringify(players));
        setSyncState("saved");
      } catch (e) { setSyncState("error"); }
    }, 600);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [players, loaded]);

  const refreshBoard = async () => {
    try {
      const r = await boardStore.get(BOARD_KEY);
      if (r && r.value) { skipNextSave.current = true; setPlayers(JSON.parse(r.value)); setSyncState("saved"); }
    } catch (e) { setSyncState("error"); }
  };

  const [device, setDevice] = useState(IS_SMALL ? "phone" : "desktop"); // desktop | phone
  const [side, setSide] = useState("OFFENSE");
  const [classFilter, setClassFilter] = useState({ 2027: true, 2028: true });
  const [openId, setOpenId] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null); // {pos, grade}
  const [phoneTab, setPhoneTab] = useState("board"); // board | roster
  const [phonePos, setPhonePos] = useState("QB");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const cols =
    side === "OFFENSE" ? OFFENSE :
    side === "DEFENSE" ? DEFENSE :
    side === "SPECIALISTS" ? SPECIALISTS :
    ALL_POS;
  const activeClasses = Object.keys(classFilter).filter((k) => classFilter[k]).map(Number);

  const visible = useMemo(
    () => players.filter((p) => activeClasses.includes(p.classYear)),
    [players, classFilter]
  );

  const cellPlayers = (pos, gradeId) =>
    visible
      .filter((p) => p.positionGroup === pos && (p.grade || "UNGRADED") === gradeId)
      .sort((a, b) => a.order - b.order);

  const staffName = user ? user.name : "Staff";

  const updatePlayer = (id, patch) =>
    setPlayers((ps) => {
      const cur = ps.find((x) => x.id === id);
      if (!cur) return ps;
      const extra = {};
      if ("grade" in patch && (patch.grade || "UNGRADED") !== (cur.grade || "UNGRADED")) {
        // re-rank to the bottom of the destination stack so orders never collide
        const destMax = ps
          .filter((x) => x.id !== id && x.positionGroup === cur.positionGroup && (x.grade || "UNGRADED") === (patch.grade || "UNGRADED"))
          .reduce((m, x) => Math.max(m, x.order), 0);
        extra.order = destMax + 1;
      }
      return ps.map((p) => (p.id === id ? { ...p, ...patch, ...extra, updatedBy: staffName, updatedAt: nowStamp() } : p));
    });

  /* --- drag & drop: move player into (pos, grade) before targetId (or append) --- */
  const movePlayer = (playerId, pos, gradeId, beforeId) => {
    setPlayers((ps) => {
      const moving = ps.find((p) => p.id === playerId);
      if (!moving) return ps;
      const stack = ps
        .filter((p) => p.id !== playerId && p.positionGroup === pos && (p.grade || "UNGRADED") === gradeId)
        .sort((a, b) => a.order - b.order);
      let insertAt = stack.length;
      if (beforeId) {
        const idx = stack.findIndex((p) => p.id === beforeId);
        if (idx !== -1) insertAt = idx;
      }
      const finalStack = [...stack.slice(0, insertAt), moving, ...stack.slice(insertAt)];
      const rank = new Map(finalStack.map((p, i) => [p.id, i + 1]));
      return ps.map((p) => {
        if (p.id === playerId)
          return { ...p, positionGroup: pos, grade: gradeId === "UNGRADED" ? null : gradeId, order: rank.get(p.id), updatedBy: staffName, updatedAt: nowStamp() };
        if (rank.has(p.id) && p.order !== rank.get(p.id)) return { ...p, order: rank.get(p.id) };
        return p;
      });
    });
  };

  const openPlayer = players.find((p) => p.id === openId);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: bodyFont }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
        `}</style>
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: bodyFont }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 10px; width: 10px; }
        ::-webkit-scrollbar-thumb { background: #2A323E; border-radius: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        select, input, textarea { font-family: inherit; }
        a { color: inherit; }
        .card:active { cursor: grabbing; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* ======= TOP CHROME ======= */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${TENANT.primary} 0%, ${TENANT.primary} 60%, ${TENANT.accent} 100%)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: `1px solid ${T.line}`, background: T.panel, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={APP_ICON} alt="" style={{ width: 32, height: 32 }} />
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            The Board
          </div>
        </div>
        <div style={{ fontFamily: font, fontSize: 12, letterSpacing: "0.2em", color: TENANT.accent, textTransform: "uppercase" }}>
          {TENANT.name} · Staff Access
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.dim }}>
          <span style={{
            width: 8, height: 8, borderRadius: 4,
            background: syncState === "error" ? "#C0392B" : syncState === "saving" ? "#FFD60A" : "#1F9D55",
          }} />
          {syncState === "error"
            ? (STORAGE_MODE === "device" ? "Save failed on this device" : "Offline — changes not saved")
            : syncState === "saving" ? "Saving…"
            : STORAGE_MODE === "device" ? "Saved on this device" : "Shared board synced"}
        </div>
        <button onClick={refreshBoard} style={{ ...btnStyle(false), padding: "6px 12px" }} title="Pull the latest board from your staff">
          ⟳ Refresh
        </button>
        {!IS_SMALL && (
          <Segmented
            options={[{ id: "desktop", label: "PC VIEW" }, { id: "phone", label: "IPHONE VIEW" }]}
            value={device}
            onChange={setDevice}
          />
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{user.name}</span>
          <button onClick={() => setUser(null)} style={{ ...btnStyle(false), padding: "6px 12px" }}>Sign out</button>
        </div>
      </div>

      {device === "desktop" ? (
        <DesktopBoard
          cols={cols} side={side} setSide={setSide}
          classFilter={classFilter} setClassFilter={setClassFilter}
          cellPlayers={cellPlayers} setOpenId={setOpenId}
          dragId={dragId} setDragId={setDragId}
          dragOver={dragOver} setDragOver={setDragOver}
          movePlayer={movePlayer} setShowAdd={setShowAdd}
        />
      ) : (
        <PhoneFrame
          real={IS_SMALL}
          players={visible} allPlayers={players}
          phoneTab={phoneTab} setPhoneTab={setPhoneTab}
          phonePos={phonePos} setPhonePos={setPhonePos}
          search={search} setSearch={setSearch}
          classFilter={classFilter} setClassFilter={setClassFilter}
          setOpenId={setOpenId} openPlayer={openPlayer}
          updatePlayer={updatePlayer} closeProfile={() => setOpenId(null)}
          userName={user.name}
        />
      )}

      {/* Desktop profile modal */}
      {device === "desktop" && openPlayer && (
        <Modal onClose={() => setOpenId(null)}>
          <Profile player={openPlayer} updatePlayer={updatePlayer} onClose={() => setOpenId(null)} compact={false} userName={user.name} />
        </Modal>
      )}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} width={500}>
          <AddProspect
            userName={user.name}
            onAdd={(np) => { setPlayers((ps) => [...ps, np]); setShowAdd(false); }}
            onClose={() => setShowAdd(false)}
          />
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   DESKTOP BOARD
   ============================================================ */
function DesktopBoard({ cols, side, setSide, classFilter, setClassFilter, cellPlayers, setOpenId, dragId, setDragId, dragOver, setDragOver, movePlayer, setShowAdd }) {
  return (
    <div style={{ padding: "16px 20px 40px" }}>
      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
        <Segmented
          options={[
            { id: "ALL", label: "ALL" },
            { id: "OFFENSE", label: "OFFENSE" },
            { id: "DEFENSE", label: "DEFENSE" },
            { id: "SPECIALISTS", label: "SPECIALISTS" },
          ]}
          value={side} onChange={setSide} big
        />
        <div style={{ width: 1, height: 26, background: T.line }} />
        <ClassChips classFilter={classFilter} setClassFilter={setClassFilter} />
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: T.dim }}>Drag a card to change grade, position, or stack order</div>
        <button onClick={() => setShowAdd(true)} style={btnStyle(true)}>+ Add prospect</button>
      </div>

      {/* the grid */}
      <div style={{ overflowX: "auto", border: `1px solid ${T.line}`, borderRadius: 10, background: T.panel }}>
        <div style={{ display: "grid", gridTemplateColumns: `92px repeat(${cols.length}, minmax(${cols.length > 10 ? 116 : 132}px, 1fr))`, minWidth: cols.length * (cols.length > 10 ? 122 : 140) + 92 }}>
          {/* header row */}
          <div style={{ position: "sticky", left: 0, zIndex: 3, background: T.panel, borderBottom: `2px solid ${T.line}` }} />
          {cols.map((c) => (
            <div key={c.id} style={{
              padding: "12px 8px", textAlign: "center", borderBottom: `2px solid ${T.line}`, borderLeft: `1px solid ${T.line}`,
              fontFamily: font, fontWeight: 600, fontSize: 15, letterSpacing: "0.12em",
            }}>
              {c.label}
            </div>
          ))}

          {/* grade lanes */}
          {GRADES.map((g) => (
            <React.Fragment key={g.id}>
              {/* lane label */}
              <div style={{
                position: "sticky", left: 0, zIndex: 2,
                background: T.panel, borderBottom: `1px solid ${T.line}`,
                display: "flex", alignItems: "stretch",
              }}>
                <div style={{ width: 8, background: g.id === "UNGRADED" ? "transparent" : g.color, borderRight: g.id === "UNGRADED" ? `2px dashed ${T.line}` : "none" }} />
                <div style={{
                  padding: "10px 8px", fontFamily: font, fontSize: 12, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: g.id === "UNGRADED" ? T.dim : T.text,
                  display: "flex", alignItems: "center",
                }}>
                  {g.label}
                </div>
              </div>
              {/* cells */}
              {cols.map((c) => {
                const stack = cellPlayers(c.id, g.id);
                const isOver = dragOver && dragOver.pos === c.id && dragOver.grade === g.id;
                return (
                  <div
                    key={c.id + g.id}
                    onDragOver={(e) => { e.preventDefault(); setDragOver({ pos: c.id, grade: g.id }); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => { e.preventDefault(); if (dragId) movePlayer(dragId, c.id, g.id, null); setDragId(null); setDragOver(null); }}
                    style={{
                      minHeight: 52, padding: 6, borderBottom: `1px solid ${T.line}`, borderLeft: `1px solid ${T.line}`,
                      background: isOver ? "rgba(242,244,248,0.08)" : g.tint,
                      transition: "background 120ms",
                      display: "flex", flexDirection: "column", gap: 6,
                    }}
                  >
                    {stack.map((p) => (
                      <BoardCard
                        key={p.id} p={p}
                        onClick={() => setOpenId(p.id)}
                        onDragStart={() => setDragId(p.id)}
                        onDragEnd={() => { setDragId(null); setDragOver(null); }}
                        onDropBefore={() => { if (dragId && dragId !== p.id) movePlayer(dragId, c.id, g.id, p.id); setDragId(null); setDragOver(null); }}
                        dragging={dragId === p.id}
                      />
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardCard({ p, onClick, onDragStart, onDragEnd, onDropBefore, dragging }) {
  const g = gradeById(p.grade);
  const st = statusById(p.status);
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; onDragStart(); }}
      onDragEnd={() => onDragEnd()}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onDropBefore(); }}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 6,
        padding: "6px 8px 6px 0", cursor: "grab", userSelect: "none",
        opacity: dragging ? 0.35 : 1, transition: "opacity 120ms, transform 80ms",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
      }}
      title={`${p.name} · ${posLabel(p.positionGroup)} · ${g.label}`}
    >
      <div style={{ width: 5, alignSelf: "stretch", borderRadius: "6px 0 0 6px", background: g.id === "UNGRADED" ? "transparent" : g.color, border: g.id === "UNGRADED" ? `1px dashed ${T.line}` : "none" }} />
      <div style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: T.dim, minWidth: 20, textAlign: "center" }}>{p.jersey}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: font, fontWeight: 600, fontSize: 13.5, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {p.name}
        </div>
        <div style={{ fontSize: 10.5, color: T.dim, display: "flex", gap: 6, alignItems: "center" }}>
          <span>'{String(p.classYear).slice(2)}</span>
          {st.short && (
            <span style={{ background: st.color, color: st.text, borderRadius: 3, padding: "0 4px", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em" }}>
              {st.short}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PHONE FRAME + MOBILE APP
   ============================================================ */
function PhoneFrame(props) {
  if (props.real) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", height: "calc(100dvh - 74px)", minHeight: 480, display: "flex", flexDirection: "column" }}>
        <MobileApp {...props} />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "26px 12px 60px" }}>
      <div style={{
        width: 393, height: 780, borderRadius: 44, border: `1px solid ${T.line}`,
        background: "#0D1117", boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 10px #05070A",
        overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
      }}>
        {/* dynamic island */}
        <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 118, height: 32, borderRadius: 20, background: "#000", zIndex: 20 }} />
        <MobileApp {...props} />
      </div>
    </div>
  );
}

function MobileApp({ players, phoneTab, setPhoneTab, phonePos, setPhonePos, search, setSearch, classFilter, setClassFilter, setOpenId, openPlayer, updatePlayer, closeProfile, userName, real }) {
  const results = players
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || posLabel(p.positionGroup).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const stacksFor = (pos) =>
    GRADES.map((g) => ({
      grade: g,
      list: players.filter((p) => p.positionGroup === pos && (p.grade || "UNGRADED") === g.id).sort((a, b) => a.order - b.order),
    })).filter((s) => s.list.length > 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
      {/* header */}
      <div style={{ padding: real ? "12px 18px 12px" : "62px 18px 12px", background: "#0D1117", borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={APP_ICON} alt="" style={{ width: 38, height: 38 }} />
          <div>
            <div style={{ fontFamily: font, fontSize: 10, letterSpacing: "0.26em", color: TENANT.accent, textTransform: "uppercase", marginBottom: 2 }}>
              {TENANT.short} FOOTBALL
            </div>
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {phoneTab === "board" ? "The Board" : "Roster"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <ClassChips classFilter={classFilter} setClassFilter={setClassFilter} small />
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {phoneTab === "board" ? (
          <>
            {/* position picker */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "12px 14px", borderBottom: `1px solid ${T.line}` }}>
              {ALL_POS.map((p) => (
                <button key={p.id} onClick={() => setPhonePos(p.id)} style={{
                  ...chipStyle(phonePos === p.id), whiteSpace: "nowrap", fontFamily: font, letterSpacing: "0.08em",
                }}>
                  {p.label}
                </button>
              ))}
            </div>
            <div style={{ padding: "14px 14px 20px" }}>
              {stacksFor(phonePos).length === 0 && (
                <div style={{ color: T.dim, fontSize: 13, textAlign: "center", padding: "40px 0" }}>
                  No prospects in this group for the selected classes.
                </div>
              )}
              {stacksFor(phonePos).map(({ grade, list }) => (
                <div key={grade.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: grade.id === "UNGRADED" ? "transparent" : grade.color, border: grade.id === "UNGRADED" ? `1px dashed ${T.dim}` : "none" }} />
                    <div style={{ fontFamily: font, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: grade.id === "UNGRADED" ? T.dim : T.text }}>
                      {grade.label}
                    </div>
                  </div>
                  {list.map((p) => <MobileRow key={p.id} p={p} onOpen={() => setOpenId(p.id)} />)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: 14 }}>
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or position…"
              style={{
                width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10,
                padding: "12px 14px", color: T.text, fontSize: 15, outline: "none", marginBottom: 12,
              }}
            />
            {results.map((p) => <MobileRow key={p.id} p={p} onOpen={() => setOpenId(p.id)} showPos />)}
            {results.length === 0 && <div style={{ color: T.dim, fontSize: 13, textAlign: "center", padding: "30px 0" }}>No matches. Try a different name.</div>}
          </div>
        )}
      </div>

      {/* tab bar */}
      <div style={{ display: "flex", borderTop: `1px solid ${T.line}`, background: "#0D1117", paddingBottom: 14 }}>
        {[{ id: "board", label: "Board" }, { id: "roster", label: "Roster" }].map((t) => (
          <button key={t.id} onClick={() => setPhoneTab(t.id)} style={{
            flex: 1, padding: "12px 0 8px", background: "transparent", border: "none", cursor: "pointer",
            color: phoneTab === t.id ? T.chalk : T.dim, fontFamily: font, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* profile sheet */}
      {openPlayer && (
        <div style={{ position: "absolute", inset: 0, background: "#0D1117", zIndex: 30, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: real ? "12px 16px 0" : "58px 16px 0", flexShrink: 0 }}>
            <button onClick={closeProfile} style={{ ...btnStyle(false), padding: "6px 14px" }}>‹ Back</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            <Profile player={openPlayer} updatePlayer={updatePlayer} onClose={closeProfile} compact userName={userName} />
          </div>
        </div>
      )}
    </div>
  );
}

function MobileRow({ p, onOpen, showPos }) {
  const g = gradeById(p.grade);
  const st = statusById(p.status);
  return (
    <div onClick={onOpen} style={{
      display: "flex", alignItems: "center", gap: 10, background: T.panel2, border: `1px solid ${T.line}`,
      borderRadius: 10, padding: "10px 12px 10px 0", marginBottom: 8, cursor: "pointer",
    }}>
      <div style={{ width: 5, alignSelf: "stretch", borderRadius: "10px 0 0 10px", background: g.id === "UNGRADED" ? "transparent" : g.color, border: g.id === "UNGRADED" ? `1px dashed ${T.line}` : "none" }} />
      <div style={{ fontFamily: font, fontWeight: 600, fontSize: 15, color: T.dim, minWidth: 26, textAlign: "center" }}>{p.jersey}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: font, fontWeight: 600, fontSize: 15, letterSpacing: "0.03em", textTransform: "uppercase" }}>{p.name}</div>
        <div style={{ fontSize: 11.5, color: T.dim }}>
          {showPos ? `${posLabel(p.positionGroup)} · ` : ""}Class of {p.classYear}{st.short ? ` · ${st.label}` : ""}
        </div>
      </div>
      {p.cell && <a href={telHref(p.cell)} onClick={(e) => e.stopPropagation()} style={{
        width: 38, height: 38, borderRadius: 19, background: "#1F9D55", display: "flex", alignItems: "center",
        justifyContent: "center", textDecoration: "none", fontSize: 16, marginRight: 10, flexShrink: 0,
      }} aria-label={`Call ${p.name}`}>📞</a>}
    </div>
  );
}


function EIn(props) {
  return (
    <input
      {...props}
      style={{
        background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 6, padding: "9px 11px",
        color: T.text, fontSize: 14, outline: "none", width: "100%", ...(props.style || {}),
      }}
    />
  );
}
function ELabel({ children }) {
  return <div style={{ fontSize: 10.5, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: font, fontWeight: 600, margin: "8px 0 4px" }}>{children}</div>;
}

/* ============================================================
   PLAYER PROFILE (shared desktop modal / mobile sheet)
   ============================================================ */
function Profile({ player: p, updatePlayer, onClose, compact, userName }) {
  const g = gradeById(p.grade);
  const st = statusById(p.status);
  const [callBy, setCallBy] = useState(userName || STAFF[0]);
  const [callNotes, setCallNotes] = useState("");
  const [addingCall, setAddingCall] = useState(false);
  const [editing, setEditing] = useState(false);
  const notesRef = useRef(null);

  /* parent/guardian management */
  const setParents = (parents) => updatePlayer(p.id, { parents });
  const updateParent = (i, patch) => setParents(p.parents.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const addParent = () => { setParents([...p.parents, { name: "", relationship: "Mom", cell: "", notes: "" }]); setEditing(true); };
  const removeParent = (i) => setParents(p.parents.filter((_, idx) => idx !== i));


  const addCall = () => {
    if (!callNotes.trim()) return;
    updatePlayer(p.id, { callLog: [{ ts: nowStamp(), by: callBy, notes: callNotes.trim() }, ...p.callLog] });
    setCallNotes(""); setAddingCall(false);
  };

  const S = ({ children }) => (
    <div style={{ fontFamily: font, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: T.dim, margin: "18px 0 8px" }}>
      {children}
    </div>
  );

  return (
    <div style={{ padding: compact ? "12px 16px 40px" : "22px 26px 30px", fontFamily: bodyFont }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 54, height: 54, borderRadius: 10, background: g.id === "UNGRADED" ? T.panel2 : g.color,
          color: g.text, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: font, fontWeight: 700, fontSize: 22, flexShrink: 0,
          border: g.id === "UNGRADED" ? `1px dashed ${T.line}` : "none",
        }}>
          {p.jersey}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: compact ? 24 : 28, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.05 }}>
            {p.name}
          </div>
          <div style={{ color: T.dim, fontSize: 13, marginTop: 3 }}>
            {posLabel(p.positionGroup)} · #{p.jersey} · Class of {p.classYear}
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} style={{ ...btnStyle(editing), padding: "6px 12px" }}>
          {editing ? "Done" : "Edit"}
        </button>
        {!compact && <button onClick={onClose} style={{ ...btnStyle(false), padding: "6px 12px" }}>✕</button>}
      </div>

      {editing && (
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <ELabel>Player name</ELabel>
            <EIn value={p.name} onChange={(e) => updatePlayer(p.id, { name: e.target.value })} />
          </div>
          <div style={{ width: 74 }}>
            <ELabel>Jersey #</ELabel>
            <EIn value={p.jersey} onChange={(e) => updatePlayer(p.id, { jersey: e.target.value })} />
          </div>
          <div style={{ width: 96 }}>
            <ELabel>Class</ELabel>
            <select value={p.classYear} onChange={(e) => updatePlayer(p.id, { classYear: Number(e.target.value) })}
              style={{ width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 6, padding: "9px 8px", color: T.text, fontSize: 14 }}>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
            </select>
          </div>
        </div>
      )}

      {/* evaluation + status */}
      <S>Evaluation</S>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select
          value={p.grade || "UNGRADED"}
          onChange={(e) => updatePlayer(p.id, { grade: e.target.value === "UNGRADED" ? null : e.target.value })}
          style={{
            background: g.id === "UNGRADED" ? T.panel2 : g.color, color: g.text,
            border: `1px solid ${T.line}`, borderRadius: 8, padding: "10px 14px",
            fontFamily: font, fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          {GRADES.map((gr) => <option key={gr.id} value={gr.id} style={{ background: "#1A2029", color: "#E8ECF2" }}>{gr.label}</option>)}
        </select>
        <select
          value={p.status}
          onChange={(e) => updatePlayer(p.id, { status: e.target.value })}
          style={{
            background: st.id === "NONE" ? T.panel2 : st.color, color: st.id === "NONE" ? T.dim : st.text,
            border: `1px solid ${T.line}`, borderRadius: 8, padding: "10px 14px",
            fontFamily: font, fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          {STATUSES.map((s) => <option key={s.id} value={s.id} style={{ background: "#1A2029", color: "#E8ECF2" }}>{s.label}</option>)}
        </select>
      </div>
      <div style={{ fontSize: 11, color: T.dim, marginTop: 6 }}>Last updated by {p.updatedBy} · {p.updatedAt}</div>

      {/* recruiting profile links */}
      <S>Recruiting Profiles</S>
      {editing ? (
        <Panel>
          <ELabel>247Sports profile URL</ELabel>
          <EIn value={(p.links && p.links.s247) || ""} placeholder="https://247sports.com/Player/..."
               onChange={(e) => updatePlayer(p.id, { links: { ...(p.links || {}), s247: e.target.value } })} />
          <ELabel>On3 profile URL</ELabel>
          <EIn value={(p.links && p.links.on3) || ""} placeholder="https://www.on3.com/rivals/..."
               onChange={(e) => updatePlayer(p.id, { links: { ...(p.links || {}), on3: e.target.value } })} />
        </Panel>
      ) : (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.links && p.links.s247 ? (
            <a href={p.links.s247} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 7, background: "#004B82", color: "#fff",
              textDecoration: "none", borderRadius: 8, padding: "9px 16px",
              fontFamily: font, fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
            }}>
              <span style={{ background: "#fff", color: "#004B82", borderRadius: 4, padding: "1px 5px", fontSize: 12 }}>247</span>
              247Sports <span style={{ opacity: 0.65, fontSize: 11 }}>\u2197</span>
            </a>
          ) : null}
          {p.links && p.links.on3 ? (
            <a href={p.links.on3} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 7, background: "#FE3B1F", color: "#fff",
              textDecoration: "none", borderRadius: 8, padding: "9px 16px",
              fontFamily: font, fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
            }}>
              <span style={{ background: "#fff", color: "#FE3B1F", borderRadius: 4, padding: "1px 5px", fontSize: 12 }}>On3</span>
              On3 Profile <span style={{ opacity: 0.65, fontSize: 11 }}>\u2197</span>
            </a>
          ) : null}
          {!(p.links && (p.links.s247 || p.links.on3)) && (
            <div style={{ color: T.dim, fontSize: 13 }}>No profiles linked yet \u2014 tap Edit to add 247Sports and On3 URLs.</div>
          )}
        </div>
      )}

      {/* school / vitals */}
      <S>School</S>
      <Panel>
        {editing ? (
          <>
            <ELabel>School name</ELabel>
            <EIn value={p.school.name} onChange={(e) => updatePlayer(p.id, { school: { ...p.school, name: e.target.value } })} />
            <ELabel>School address</ELabel>
            <EIn value={p.school.address} onChange={(e) => updatePlayer(p.id, { school: { ...p.school, address: e.target.value } })} />
          </>
        ) : (
          <>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{p.school.name}</div>
            <div style={{ fontSize: 12, color: T.dim, marginTop: 2 }}>{p.school.address}</div>
          </>
        )}
      </Panel>

      <S>Vitals</S>
      <Panel>
        {editing ? (
          <>
            <ELabel>Birthday</ELabel>
            <EIn type="date" value={p.birthday} onChange={(e) => updatePlayer(p.id, { birthday: e.target.value })} />
            <ELabel>Home address</ELabel>
            <EIn value={p.homeAddress} onChange={(e) => updatePlayer(p.id, { homeAddress: e.target.value })} />
          </>
        ) : (
          <>
            <KV k="Birthday" v={fmtDate(p.birthday)} />
            <KV k="Home" v={p.homeAddress} />
          </>
        )}
      </Panel>

      {/* player contact */}
      <S>Player Cell</S>
      <Panel>
        {editing ? (
          <>
            <ELabel>Cell number</ELabel>
            <EIn value={p.cell} onChange={(e) => updatePlayer(p.id, { cell: e.target.value })} placeholder="555-000-0000" inputMode="tel" />
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontSize: 17, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: p.cell ? T.text : T.dim }}>{p.cell || "No number yet — tap Edit to add"}</div>
            {p.cell && <ContactButtons number={p.cell} />}
          </div>
        )}
      </Panel>

      {/* parents */}
      <S>Parents & Guardians</S>
      {p.parents.map((par, i) => (
        <Panel key={i} style={{ marginBottom: 8 }}>
          {editing ? (
            <>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <ELabel>Name</ELabel>
                  <EIn value={par.name} placeholder="Full name" onChange={(e) => updateParent(i, { name: e.target.value })} />
                </div>
                <div style={{ width: 118 }}>
                  <ELabel>Relationship</ELabel>
                  <select
                    value={par.relationship}
                    onChange={(e) => updateParent(i, { relationship: e.target.value })}
                    style={{ width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 6, padding: "9px 8px", color: T.text, fontSize: 14 }}
                  >
                    {(RELATIONSHIPS.includes(par.relationship) ? RELATIONSHIPS : [par.relationship, ...RELATIONSHIPS]).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ELabel>Cell number</ELabel>
              <EIn value={par.cell} placeholder="555-000-0000" inputMode="tel" onChange={(e) => updateParent(i, { cell: e.target.value })} />
              <ELabel>Notes for staff</ELabel>
              <textarea
                value={par.notes} rows={2}
                placeholder="Who are they in this recruitment? How do they like to communicate?"
                onChange={(e) => updateParent(i, { notes: e.target.value })}
                style={{ width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 6, padding: "9px 11px", color: T.text, fontSize: 13.5, resize: "vertical", outline: "none", lineHeight: 1.45 }}
              />
              <button onClick={() => removeParent(i)} style={{ ...btnStyle(false), padding: "6px 12px", marginTop: 8, color: "#E88378", borderColor: "rgba(192,57,43,0.5)" }}>
                Remove member
              </button>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{par.name || "—"} <span style={{ color: T.dim, fontWeight: 400, fontSize: 12 }}>· {par.relationship}</span></div>
                  <div style={{ fontSize: 14, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{par.cell || "No number yet"}</div>
                </div>
                {par.cell && <ContactButtons number={par.cell} small />}
              </div>
              {par.notes && (
                <div style={{
                  marginTop: 8, padding: "8px 10px", background: "rgba(255,214,10,0.06)", borderLeft: `3px solid #FFD60A`,
                  borderRadius: 4, fontSize: 12.5, color: "#D8DDE5", lineHeight: 1.45,
                }}>
                  {par.notes}
                </div>
              )}
            </>
          )}
        </Panel>
      ))}
      <button onClick={addParent} style={{ ...btnStyle(false), padding: "9px 16px", width: compact ? "100%" : "auto" }}>
        + Add member
      </button>

      {/* call log */}
      <S>Call Log</S>
      {!addingCall ? (
        <button onClick={() => { setAddingCall(true); setTimeout(() => notesRef.current && notesRef.current.focus(), 50); }} style={{ ...btnStyle(true), width: compact ? "100%" : "auto", padding: "12px 18px" }}>
          + Add call
        </button>
      ) : (
        <Panel>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: T.dim }}>{nowStamp()}</span>
            <select value={callBy} onChange={(e) => setCallBy(e.target.value)} style={{
              background: T.panel2, color: T.text, border: `1px solid ${T.line}`, borderRadius: 6, padding: "6px 10px", fontSize: 13,
            }}>
              {userName && !STAFF.includes(userName) && <option>{userName}</option>}
              {STAFF_GROUPS.map((grp) => (
                <optgroup key={grp.label} label={grp.label}>
                  {grp.members.map((s) => <option key={s}>{s}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <textarea
            ref={notesRef} value={callNotes} onChange={(e) => setCallNotes(e.target.value)}
            placeholder="Notes from the call…" rows={3}
            style={{ width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: 10, color: T.text, fontSize: 14, resize: "vertical", outline: "none" }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={addCall} style={btnStyle(true)}>Save call</button>
            <button onClick={() => setAddingCall(false)} style={btnStyle(false)}>Cancel</button>
          </div>
        </Panel>
      )}
      <div style={{ marginTop: 10 }}>
        {p.callLog.length === 0 && !addingCall && (
          <div style={{ color: T.dim, fontSize: 13, marginTop: 8 }}>No calls logged yet. Log the first one right after you hang up.</div>
        )}
        {p.callLog.map((c, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${T.line}`, padding: "6px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: T.dim }}>{c.ts} · <span style={{ color: T.text, fontWeight: 600 }}>{c.by}</span></div>
            <div style={{ fontSize: 13.5, marginTop: 3, lineHeight: 1.45 }}>{c.notes}</div>
          </div>
        ))}
      </div>

      {/* misc notes */}
      <S>Miscellaneous Notes</S>
      <textarea
        value={p.miscNotes}
        onChange={(e) => updatePlayer(p.id, { miscNotes: e.target.value })}
        placeholder="Scheme fit, academics, visit plans, competing offers…"
        rows={4}
        style={{ width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: 12, color: T.text, fontSize: 14, resize: "vertical", outline: "none", lineHeight: 1.5 }}
      />
    </div>
  );
}

function ContactButtons({ number, small }) {
  const b = (href, label, bg) => (
    <a href={href} style={{
      background: bg, color: "#fff", textDecoration: "none", borderRadius: 8,
      padding: small ? "7px 12px" : "9px 16px", fontFamily: font, fontWeight: 600,
      fontSize: small ? 12 : 13, letterSpacing: "0.08em", textTransform: "uppercase",
    }}>{label}</a>
  );
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {b(telHref(number), "Call", "#1F9D55")}
      {b(ftHref(number), "FaceTime", "#1F6FEB")}
      {b(smsHref(number), "Text", "#4A4F57")}
    </div>
  );
}

/* ============================================================
   ADD PROSPECT
   ============================================================ */
function AddProspect({ onAdd, onClose, userName }) {
  const [f, setF] = useState({
    name: "", jersey: "", pos: "QB", cls: 2027, cell: "", birthday: "",
    schoolName: "", schoolAddress: "", homeAddress: "",
  });
  const [parents, setParents] = useState([]);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const updateParent = (i, patch) => setParents((ps) => ps.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  const inputStyle = { width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "10px 12px", color: T.text, fontSize: 14, outline: "none" };
  const lbl = { fontSize: 10.5, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: font, fontWeight: 600, margin: "10px 0 4px" };

  return (
    <div style={{ padding: 24, maxHeight: "82vh", overflowY: "auto" }}>
      <div style={{ fontFamily: font, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Add prospect</div>
      <div style={{ fontSize: 12, color: T.dim, marginBottom: 6 }}>Only a name is required — everything else can be filled in later from the profile.</div>

      <div style={lbl}>Player name</div>
      <input style={inputStyle} placeholder="First Last" value={f.name} onChange={(e) => set("name", e.target.value)} />

      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 90 }}>
          <div style={lbl}>Jersey #</div>
          <input style={inputStyle} placeholder="#" value={f.jersey} onChange={(e) => set("jersey", e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={lbl}>Position</div>
          <select value={f.pos} onChange={(e) => set("pos", e.target.value)} style={inputStyle}>
            {ALL_POS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
        <div style={{ width: 100 }}>
          <div style={lbl}>Class</div>
          <select value={f.cls} onChange={(e) => set("cls", Number(e.target.value))} style={inputStyle}>
            <option value={2027}>2027</option>
            <option value={2028}>2028</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={lbl}>Cell phone</div>
          <input style={inputStyle} placeholder="555-000-0000" inputMode="tel" value={f.cell} onChange={(e) => set("cell", e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={lbl}>Birthday</div>
          <input type="date" style={inputStyle} value={f.birthday} onChange={(e) => set("birthday", e.target.value)} />
        </div>
      </div>

      <div style={lbl}>School</div>
      <input style={{ ...inputStyle, marginBottom: 8 }} placeholder="School name" value={f.schoolName} onChange={(e) => set("schoolName", e.target.value)} />
      <input style={inputStyle} placeholder="School address" value={f.schoolAddress} onChange={(e) => set("schoolAddress", e.target.value)} />

      <div style={lbl}>Home address</div>
      <input style={inputStyle} placeholder="Street, city, state" value={f.homeAddress} onChange={(e) => set("homeAddress", e.target.value)} />

      <div style={lbl}>Parents & guardians</div>
      {parents.map((par, i) => (
        <div key={i} style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12, marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input style={{ ...inputStyle, flex: 1 }} placeholder="Name" value={par.name} onChange={(e) => updateParent(i, { name: e.target.value })} />
            <select
              value={par.relationship}
              onChange={(e) => updateParent(i, { relationship: e.target.value })}
              style={{ ...inputStyle, width: 110 }}
            >
              {RELATIONSHIPS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <input style={{ ...inputStyle, marginBottom: 8 }} placeholder="Cell number" inputMode="tel" value={par.cell} onChange={(e) => updateParent(i, { cell: e.target.value })} />
          <input style={inputStyle} placeholder="Notes for staff (optional)" value={par.notes} onChange={(e) => updateParent(i, { notes: e.target.value })} />
          <button onClick={() => setParents((ps) => ps.filter((_, idx) => idx !== i))} style={{ ...btnStyle(false), padding: "5px 10px", marginTop: 8, fontSize: 11, color: "#E88378", borderColor: "rgba(192,57,43,0.5)" }}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => setParents((ps) => [...ps, { name: "", relationship: "Mom", cell: "", notes: "" }])} style={{ ...btnStyle(false), padding: "8px 14px", marginBottom: 14 }}>
        + Add member
      </button>

      <div style={{ fontSize: 12, color: T.dim, margin: "4px 0 14px" }}>New prospects land in the Ungraded row of their position group.</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={btnStyle(true)}
          onClick={() => {
            if (!f.name.trim()) return;
            onAdd({
              id: "p" + Math.random().toString(36).slice(2, 8),
              name: f.name.trim(), jersey: f.jersey || "—", positionGroup: f.pos, classYear: f.cls,
              grade: null, order: Date.now() + Math.random(), status: "NONE",
              school: { name: f.schoolName || "—", address: f.schoolAddress || "—" },
              birthday: f.birthday, cell: f.cell || "",
              homeAddress: f.homeAddress || "—",
              parents: parents.filter((par) => par.name.trim() || par.cell.trim()),
              callLog: [], miscNotes: "", updatedBy: userName || "Staff", updatedAt: nowStamp(),
            });
          }}
        >
          Add to board
        </button>
        <button style={btnStyle(false)} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

/* ============================================================
   LOGIN GATE
   ============================================================ */
const STAFF_PASSWORD = "Recruit26";

function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const go = () => {
    if (pw !== STAFF_PASSWORD) { setErr("That password doesn't match. Check with your recruiting coordinator."); return; }
    if (!name.trim()) { setErr("Enter your name so board moves and call logs are credited to you."); return; }
    onLogin({ name: name.trim() });
  };

  const inputStyle = {
    width: "100%", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10,
    padding: "13px 16px", color: T.text, fontSize: 16, outline: "none", marginBottom: 12,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", gap: 5, marginBottom: 18 }}>
            {GRADES.slice(0, 6).map((g) => (
              <div key={g.id} style={{ width: 22, height: 8, borderRadius: 2, background: g.color }} />
            ))}
          </div>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 34, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1 }}>
            The Board
          </div>
          <div style={{ fontFamily: font, fontSize: 13, letterSpacing: "0.24em", color: TENANT.accent, textTransform: "uppercase", marginTop: 8 }}>
            {TENANT.name}
          </div>
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: "0.24em", color: T.dim, textTransform: "uppercase", marginTop: 4 }}>
            Staff Access
          </div>
        </div>

        <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 14, padding: 24 }}>
          <label style={{ display: "block", fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: T.dim, marginBottom: 6 }}>
            Your name
          </label>
          <input
            style={inputStyle} value={name} placeholder="e.g. Young HS Scouting" autoComplete="off"
            onChange={(e) => { setName(e.target.value); setErr(""); }}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />
          <label style={{ display: "block", fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: T.dim, marginBottom: 6 }}>
            Staff password
          </label>
          <input
            type="password" style={inputStyle} value={pw} placeholder="••••••••" autoComplete="off"
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />
          {err && (
            <div style={{ background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.5)", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#F1B2AB", marginBottom: 12 }}>
              {err}
            </div>
          )}
          <button onClick={go} style={{ ...btnStyle(true), width: "100%", padding: "13px 0", fontSize: 15 }}>
            Enter the war room
          </button>
        </div>

        <div style={{ fontSize: 11.5, color: T.dim, textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
          One shared board for the {TENANT.short} staff. Every grade change, board move, and call log is credited to the name you enter.
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL SHARED PIECES
   ============================================================ */
function Segmented({ options, value, onChange, big }) {
  return (
    <div style={{ display: "flex", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: 3 }}>
      {options.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{
          background: value === o.id ? T.chalk : "transparent",
          color: value === o.id ? "#12161D" : T.dim,
          border: "none", borderRadius: 6, cursor: "pointer",
          padding: big ? "9px 22px" : "7px 14px",
          fontFamily: font, fontWeight: 600, fontSize: big ? 14 : 12, letterSpacing: "0.12em",
        }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ClassChips({ classFilter, setClassFilter, small }) {
  const toggle = (y) => {
    const next = { ...classFilter, [y]: !classFilter[y] };
    if (!next[2027] && !next[2028]) return; // always at least one class visible
    setClassFilter(next);
  };
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[2027, 2028].map((y) => (
        <button key={y} onClick={() => toggle(y)} style={{ ...chipStyle(classFilter[y], small), fontFamily: font, letterSpacing: "0.1em" }}>
          CLASS OF {y}
        </button>
      ))}
    </div>
  );
}

const chipStyle = (active, small) => ({
  background: active ? T.chalk : "transparent",
  color: active ? "#12161D" : T.dim,
  border: `1px solid ${active ? T.chalk : T.line}`,
  borderRadius: 20, cursor: "pointer",
  padding: small ? "5px 12px" : "7px 16px",
  fontWeight: 600, fontSize: small ? 11 : 12,
});

const btnStyle = (primary) => ({
  background: primary ? T.chalk : "transparent",
  color: primary ? "#12161D" : T.dim,
  border: `1px solid ${primary ? T.chalk : T.line}`,
  borderRadius: 8, cursor: "pointer", padding: "9px 16px",
  fontFamily: font, fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
});

function Panel({ children, style }) {
  return (
    <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 10, padding: "12px 14px", ...style }}>
      {children}
    </div>
  );
}

function KV({ k, v }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "4px 0" }}>
      <div style={{ width: 78, fontSize: 12, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: font, paddingTop: 2 }}>{k}</div>
      <div style={{ fontSize: 14 }}>{v}</div>
    </div>
  );
}

function Modal({ children, onClose, width }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(5,7,10,0.72)", zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5vh 16px", overflowY: "auto" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: T.bg, border: `1px solid ${T.line}`, borderRadius: 14, width: "100%", maxWidth: width || 680, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
      >
        {children}
      </div>
    </div>
  );
}
