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
  { id: "WINNABLE", label: "Winnable", color: "#C6CBD3", text: "#14181F", tint: "rgba(198,203,211,0.10)" },
  { id: "WINNABLE_MINUS", label: "Winnable −", color: "#FFFFFF", text: "#14181F", tint: "rgba(255,255,255,0.05)" },
  { id: "NGE", label: "NGE", color: "#7B2FBE", text: "#FFFFFF", tint: "rgba(123,47,190,0.10)" },
  { id: "BUST", label: "Bust", color: "#FFD60A", text: "#14181F", tint: "rgba(255,214,10,0.07)" },
  { id: "UNGRADED", label: "Ungraded", color: "#2A323E", text: "#8B95A5", tint: "rgba(255,255,255,0.02)" },
];
const gradeById = (id) => GRADES.find((g) => g.id === (id || "UNGRADED")) || GRADES.find((g) => g.id === "UNGRADED");

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
const APP_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAABZfElEQVR42u29eZwcZZ0//n6qr+npns6cCTlISAiHJBDkNAaWhEs5jEQInou6rO7ubxdF5at+XTXGa1dlEfWr7PHCRdRdF1QQDxYVEoR4cCZIEDkSEnLN0T0zPV3T01c9vz96ns7TNXV2VVdXdT/v12teM1NdXV1V/Tzven/Oh6CdsAWStO38EAAov3mkpH75lM2nRCfKydeECJZQSk8CABBcCGABAFSIcqafLqeYL1veNxoP197D/82/ZvQZ6n347fwxvbqeZqKPSnX/h3pClt+7ciBH7H5eVzKE+aEZS/vGeiJzti2IFPXfkAqhr2R87L5oRQGAck9S6qeyokjhP1KQaQrMhAgeDlWKhaFe/ClbiLxwwYmJl8nq5+Z84LYtCGM9sH07lK1bobQLZZDAX8Es6c0hvC2QFj1zzqmhClmOMN1AQY8HsMAKyelNVDMS0HpfI8ThF6KwQrpBOVcjArRDgq9BlrK/SwOS1EwiLEyVaoSoR4IJZYYafkeJENEiQwBIJQkyJCEBQD+VFQBQpPAfEzFyGAr+lIoXH5YI9q257NAuQlD7HEpBtm9HaP12KCTgZBhcAty8OYS7767wm5Zcc+ZiVKS3MlXXiKIL4oQWaL4CfA2ytJmEp6cADdWfBgkywuOJDgBINFqb67RYNCTNVLK662CvgrEJCYm49GJPrPxHitD2nqRy3wkXHHqVJ0PcDQmbofAkKQiwSWoPz20mPPEt2nTOGgn0IhC8XU14PJmpzcLa9vTRARoeztbuhyxTKqhCIEgY7AvNmc+J7uqm3uQMEnEo8+ZR0t0VIj09FTrUG6WJeYQAwII+UEZ8PLI5ilSSYLD3KJ9KlO4kJPxtiSg7Tr/80M4aGd6FUNCIMBgEuHlzCKfcTTErtzmlp0l6vNlZ82WlZxAezhJGbDP5QsdMjK54rO561f9bPYbWfeOPxfbh0Un3OcjjgxHoicsKyokrKRnqjdIVx5Ea+RXylE4VqgTbE6vQWLxKnIwMKS3/4Mwrj6QBYMsWSJ9ZBUKuRUUQoItm7qJN56wJEfxVmVRuMCK8aHoG4REC0Ekiy5QaTUKtSSsg0Ekwmh9LFnXXSPHc02NUTYg8GcYIvqmAfFutCv1MhP4kQBXxHfuWc66goH9XIcrlWrvXSG9W4Wl9oc0iumgsiWIhh2gsWT2XQq62nf3P/tZ6XUDALtiYYmNJPRabSYyMENedFcHpq6WaaTw2IdWIMREn91CQ751xxaGfsPfddRdC1/qQCP1FgCof3yzxfYaZueoUD0Z66bG5kbBGCE+QUvAQiYRRKonAlRMybZQQu+IxvP70MmVk2BOr1OZhLE5I1TyWPvvaKw7dRwB6110IbfaZj9A3BLj2vHXR3z26o8gTXyJMzwSA7NH7imK+jO7nRuYoPauE16kkx4jCKmFEImHXz0Hvc/lz03uP0T5GxxbE3DxSVM+/yy4oYeMlMbpiSXW+FvKU8kTIFOG2bQivX4+KH4iw9QTImbuLNp2zJhoJ/d8YSteqiQ8HcijsmUQjpNfuxNcoWRkRSjtC63p5gm2UULXIrl2UaSNkeO7pIXLp+RHl/DNpnSIMAz8mhHyB+Qj9YBa3lAClvzg/ovzmkdLgZWcNxOPSp7vDyg3869kKbZj4/EZ4/ARTKzGtyac3qQT8R6JGZNqO5rkRKfLzdMmibvLeq5UaEcbihBTylKa6ybdKCt165pVH0q1Wg60hwC1bJGzdqjBzNxwKfSVKSic7JT6/qzw2MdSTqNOUWCeTp954aGciPGllgrz3bQpdeyqlemYxpSCtIEHPCZBXfT090U9HUaxTfWO5ErqfG6kLbASV+ASpCTTqduBJ0e9EaWYmMzK8cG2I/uU1UaxYQmv+wRjBN6fl0hdet3lseNsWhDdshacX6S0Bziq/RZvOWRMLh/6bV30AkN03hcndI75XfOoBaTZABREK2FH5er5KtQXhN0K0qgj/9i8lvOWiSK20JN6FXSFJuv70yw/tpLTKSV6pQW8IkDN5l2w6+8OJCL1Zrfro48OGFQV+UXxGg1jLtyfMW4FmuTn8qAitqsEli7rJP/wVpWesVBSWUN0dD3/wjCsOfNNLk7jpBMhM3pWXnHVMuS9yK4vwaqm+IAQ3nDzF/YhYVEGhKEEgmKQaBGiRIiPCd14VIe++SqpMFUJksFdBGPixQunfnnnlkbQXJnFzCXA2xWXwsrMGepKRR3iT14+qz8ysMIr+BVHluUl+rSbSTiTyIAVPjEjwpJUJ8vG/U5TFA0otQFLKly9/3eax4WaX0jWNAFli87FvOeeK7rDyU7XJm//NflPiaybpqclOy4+nt49QdfqfFYtaaw9XKEqm58mOpbcPe7/Zfu1qOvvVF2jXPJ7JF9AVj+EzH5HAm8REwaXrrj3y0BP/hshZf4NSYAiQmb3Hbjz3qu6uyo8bMXlbQX5Wn6rt4tNzWwHahZoE1URmdH56nydUYPAIkFeDLEByMC2RxQNKjQS3bUN4wwb3zWHXR8va89ZFld88Ulp++dk3qclv+rGDxI6/r9mDJhIJWyazdgxk8OpJj1jM/m+U/LQITq0k7ZJZJ/oytcalX8dqNJas/ajB+OBfv6vgth+UpFSS4GBaIlTCL39z18KPbtiA8rYtcP3CQm4eTPqL8yOvPvJoacmmsz8cj9Ov8CYvdh6p5fb5JcqrKApCIVV34JBU+1EUBZFIuLYf+7+dUKkQW/+HQxThEEWlQhCLKgiHKApFCeFQYwE7/nj857Hjqz+ff1+hKKFSIbWfToWiKLrWjV8RCkdRqdR3uw5HwiiXK3j+JYqxtILzzwmjWJFIV0S56K1vThUv/sDUb7ZtQfg7D7vXht81Alx73rroq488Wlp++dk3qcmPPj6MqWzVzg/rEEg0lkQoHEUoHPX2iwhJpr4Xtk8oJKFUKuu+p9XmrB0S0NrfyjEqFVIjLZ6MnCpR9vns2Izg9M6JbbN73e1uAjMyZA/uIJJgOBLGi3tLZNfzUemidaBjk4REo+Sid12ZLF/y4dzDt90Wi/385xVXAiOSW+T3u0d3FJe+8Yybokn65crU0XPjI72tVnyNmBZsgOnV7foZRqap2lzkAwpGZm+zAixG52p0TiKFR3/sBmGsGpnEf35Jph/cWuWobI4CMelzD3x/0cf/7u8Khdtui7niQ3P86GQBjxVvPPsiiZR/VWP3nhBGtx2oRXj8Sn5WEpvVf/uV5Iwiq3YDCloE6QW0orpaZCfyF+cqQKN2YkGAXqrMkkXd5HMfobUBGCG49C3vP/Tgli2QnC7R6WwEbd4c0iI/AIEgPyvkGDTlp6fieDKxogzZfmry8YJ01J9RKEqa21pB0H4hPfW4ZGOVJ7x26ETTFY/hwKFp+s+3HV2Rr0Txyx//+6KLtm6Fctddztx4jSvALZCwFcrKS846BuHKobrB+adqwKPVwQ4rTUCD3JXFjolrhyTU0WG3yUbr+DzRWlGkdhRuu5Oh3eYKQVOBTAmyhGm2LZ+bWfqej2QO0i2QGl2fuHH2XA8i0fPDqUhlhyQp88eJgjgICs/nkR6bNFV+XgQ7mBNYzxmsHjh+DG4YgY+AqgMR6iiqUd6c+v3sbxbd5Y9hNeBhFBnmtzPSYtfBEyF/HlbuRSfCbMyyoJ3fAyK169EIjADV4MjwSB5TUxRrTglheBwk1R16w3uv7P/Bf8mThfXrQR5+2H7tcEMzfu1566LYCmVZOP/9UKi8Ss5Mo49KkDPTSI8Ot1T1GRFcO4M3E9W/tdQc218vmMC/1ojis/sePb+fljnOv86/prVPJ5nG7TAH1IuIqfHQ7yrkvl8VyII+UClCThkvlf5t61Yo6xvkMtsKkOX6Lb/87JtCocoH5cw0igNdUDJ50woPr31+RikBQSZHpsSM0kP0FBdLL+H/V6e1sOO4meqiB3YdeuehZwaz6+RVIjsOn0vYySkyQVWA1e9OWwWyPMGFCxSy5JgwQmFyyhv/Ijl+9Sdzv9+yBZJdFWhvdMz6/U44++w1dLD8tJyZrr3kN/JjJNduPfqMfHNGakrPt6Y+llZpmhX12WhNcCNKV0+1Wrk3nUqCQYbaL8jS6j51QxdNzKuuSRxSpHP//hMHHrcbGbY3Sp4DWXveumgFyp3J0dmTG+hCYc+k78hP74u3U/7md1NXryxNK2qqRw560VWjPDuzbc0kPy3zXcBcCAR5zKv5g/HMf/7oaGSYUvrft90Wi616DoQ1VXWXADdvDuFuVI5U8l9KUeXU4VBV/XX/qWCY6CzW2nVH9an9WXokoEVEWoSo3oc/vlGNrlWCs6rA2LlZ2d9KCo/VY3Wi8gsqCWpFhll6zC8fLFIAUEJ0RX508OZr70bl7rut85qlHTfP9vVbedYZV84r0Q8y8gNQC3poqT8/kV9Q+/WplY8eARiljlgNBugFUawSmlkqi1UVayXlRRCbfRdQUE1hoyYKD/2uQl7ZVxVg4Sj9+y99avGGa69F5ZprIpbSTCwz5drz1kUVQr5QN1ANTF8/kF+7LU+o1zrKiv+NV0dulZFpqVArx9ZTpkZtsPRK9zqRGO2M63ZZn1iLVxjv3PHDCORJSuVJSstl6d//35Yhy+RjOgPWnrcuevfdd9eZvgsq3QgPZ4lZjW9QnpR+NXeNkpmtTH71cdSVHXrJyFYUorrixE76iVaKjRYpmpG6kdneKRDrzVSDIjueKM0SWnlFpti15Yc/LBW3bDHnN2Nn4exiRiecffaaBC0/zZu+RlFfPzc3CJrSM9pm1+w0igabKbZmqS03zV0rXabb3TQ2W7Td6jzxu3jg/YJ8M9Wh3igFgJIinfGpLx18BltAjKpEjEfKc88RAKigshUAwiPE1PT1C6kFKfKlFcjQCnqo97dKfo0QipESdYtkrJ631c8SSc/hht/D5ou6njgIYDz0swe7CCVdCgDkZ8hWAtC7VxmLPMnI9GWBjxSlG4dD0yjPpwiPkEBEfY3W9vAb9NJKrPjRrE58O/vomcZetMVqlCQFGiM+dcejIOPAoWm6d78czs1ElUIxv/GG9y9587XXomJkCuu+8LuLLi4DAAt8MPUn5yZ8Y/rqdWrR+nLbzRnstrmp9qXpldHZJV6n5qodohUpMI2by0GfG4yPfvUbiqxczQ9UFGwxywnUHi2bN4ewdatSVX/Kqel03lT9tUr56fVA40kwKC2t7Ki0Ria6EZmoTWytBqROKi2sJFQbtfEy+zxBfNatIbVACCL56fHNSKZM9+6dqo6nSP70D/zNko1GbbO0R80pp9AtW7ZI6rQXI/XXSglv5QsMwpdsNSBglxSs9NfTSrK2S8RWTXYjstML9Ng9PwH9eRCERr9OVOBvd4ZJqZKiTAVu2QJp927tGuGQpvr71reUg/LUFT2gN6bT+SpTygRTk9Xgh3pdj1aoP63mBvw2vhECKwYPWrsrK8rPqHkAe41fuIhfhEj9XtZQgLXRstIAgW/JZdckNlrzQ30dfHssrfPv9KYHdh/8/IJfQWmUMHfszW2YUC5XUC5X0JcsITUvBUJCx+RzyZ1fviX7/DXXRKLPPadUjBXg3XdXgKO+Pzb5WqH+GlnyT/16ENfysOPf0ir/UufSWc2rUxOTkcpqpBFBI6Vq/Hlo/e5kJWh3DWutuRHkOmGj5TVf2BerDQxZxk0AsGrV3Bsm1Yu/zSEAOOHss9ekqHJqbkquDcBW+P7sdHLRWryonZNEreTymUWXeUKy20Far2uMnYBFI/tZbc7QCWasVSI0I8GgBkCMFlo/cGiavjoRQaEQpoVCft07r11y9tatUNQlcnUj58DhQyEAIDPKdfzA8lL9meX2mRV4azl52xFWghlOCMjOGiBGKtTsOMKX13wVqA52tLs4YDz13E5ZAgBZGqClEvlbABgdLdU91ec4Tk4++eyBMp0c5QenXsMDr31/VvKV1CTJrwsi4J769CNxdUIVCE9meot22XX7tKMCZBbrpZcPUQAoj2fQNW8y/sMfloqUghBSDYrURsva89ZFAYBGlHfzA4rdnFaTn52nnd7/nZ4H6MS8bmSfZp1TJydGW13Ey6yqg70W5DlhhYMmD2UkAAj39WNGXvi3ALB+/dHgb40AL51NfAatXMebJ0Ys2wozWJ3cbOUpJ1SgPSKz086qFSa/MKe1/Xq88rPy4A+6KWzETUywHRyp/p6eSJJyGe+YJUBFRYBbpK2zTQ8qpenTtKRkq9Sf2WLPdlSh+n1BfwK6RX5m6wi3g2JtVxI0cwdpkRw/H9pdAR44NF3LlQpj+uwrLl5xwtatUFh5nFQ1f38dBgBpRrmIfzMLfrTS1LXT1t7oiabnP7TzBGxXsrSS9OxnkunkQIpehNdpY4OgKEMrJPjKngTp7s3RIllKSKR8GQD88sF14RoB/u7RHUVs3hxSm79qOem1+rOj6IyeaGYmQbu1CrJDHFaitKLywtuxrWWpGO2rNw+c5MQGYYybuecYb01nR2rB3nIZ79i8eXPo0ot2lDkTGFh7+FDIivnrp4Fi5WloZibokanRYLNbhhc0k1iYmv4Z4+qgh9nDX02eVvyB7e4bP3Bomk5PJAkzg8fHn1nAVo6TWPR3bHzqcjOC8fsCR1pftNWnnt7TUut1vad00MlQNBzw75hulMSsvD/Ia4XYDdIWyVJSKRYuBoALLkC4NqIlEvlrLXnph8YHbvlItLabvW5lkOg5mwU6m7TcHrNGr3dqMM9MlDH+GskcrRsvVugl1d/rJOl3j+4oVlVgZUlQzN9GzQijiFgzBpPIO+xMWC03M/L1WXHbCFgH8wOOZCgqFZx7wQUI/+7RHVWbJp2ZXMH7/7RMnaCu79vIGgl2mzDo+WWEIhTQe/Cy7XpBjGYqyE7E2HilJgFnyv0rJ/NLTwRmgyCUSCd3wpNYTxG6MWCMom6dABEgaR8TvN3MYC2LNlQhp9cIkEiR87VuYND9f3omhdY6CG49dfVMnXZPuhYBEqHW/A7eD1hW8NqjBEhxEr+jOrLSavO3kb6AZiYqn9JitUzOTC1a6VQjVKCA3XEl4AxMyOWm5Nq2fJ6eAQBStQdgfQBEjVbUA5sRi9uBCjvHUw9YM6d3Ow9ws4XcBewToSDD5kCiMmFESML9A5s3bw6FypBOUsozn+VNGXXre78FQPh292btvO20+zZqmV8qlee01WdtxdUEys4ryC34rYK1w2dt6vVIUrSsPzqO+HHBxpV6vLBlHAQszt1wVLNFfs3kLVdQLEuY19uDYrEEqpQWjIyN/0Bq1wCImwNWq8uGXkG5Xn5huzum9drta60p3OkqT8+a4H3FonuRPTRipVIinSxJUmRFsicRWHJye2DqBUuMBrDWdrOBH3RzV72NJ7lGl+xs9JyC/nC1kpIlyNBd8gMApTy5SqLAYr8rFS/9ImZBDifdpoOsArUWJ2J/WyU8LbLSIlQ7xwmy39FK56Igr93rFay66NSpMIqCiEQoTuKjIwx+SoGxmkLihCSNOm6YbTOqN24Xk0ZrpTi9HoJ6atBskSb+c8zIz6hFl9/bd5mNWa0mCALukGDdvQ/R88PqCHCrI75aA8TqGiBOB4peR10tE1lrXQarpOgnNWeXBI3+1yIpuwRrVdWpG7ZaPTc/kyA/ngTpNd8EzhdIl+9HidnSmF4MFKOW40bdNlpNfnoE5IQctPx/WkqwEUJSv099XJ7szFr2B9kkFv6+5qs/NkYkdQ9ANw7eSmJ0wxRpZA0F/sntl1wuK52erRCm2Xt5NWZEhma+Pp5Qtc6NP44ZCQYdRnmmAo3zFO/uK5Uia8NBHBjNJD8z34xVv42fzFwj5cS/piaYRonT6H8nAQ+j9zYagXYSuW72A14r40CYxu4KKCmoJ96s4zbaLstv5KenyIzeY6Wio1GCcaJUrapduws5+U1BGgXMhHnsrinM/IZzRl679AF0Qn5WAi+8SezVoLQ6Yfl1PNwgBiPT1MvrcpP89a7RL+PPjjLsdBQLOcvrg6jJUhRvGpjAem31vRyETnPe7E5stT8vKH42o6U93b5fbt8TO3mkwgw2V3V2rA1BgAamiFZgJCjF6o2Sl199Ym6oQaukbjXK3IyHg5kLxs/pVX4lPVsmsFCB/iI5vclmFjH1k1nqBxJslDhbeV+M8gKFCqw3ZRslQfEY0fHH+IEI1eVnRkm/otmAuw8cK+qw2SpZRIHdV3+lUhmxqCRMYD3iUwc2/DTgjNSggHukZyWNx0sXARuPfsox9QP5Nar+CkUJ0VgS0VhSECBvalh5CreK8ATJeWMm6+VPqv/X+06a/T0JBXiU/OwoQL3sFkGAPh9YdhOHBdy550aqj5GkERG6PTbV6q/TVaBdBajX3EVoafjXtyIIzz/fgV7pnxemcSevNqgHuwpQD0IB+sDUFQgOzFJgvFCDneoHZITnFvkJBWgwwIT6E2j0e2lmw9ZOjgQ3ozFLxylAoyYHzVSCdmtyBQQEtFUgrwQFATag8Oxsb5WJJdBeitHNh5qV9Wfa1URmpOdGFFgkQtsYVE4nQTPLpwSCYza7tX5yp5rCjaTAGKHjCLAVA0dUagg04+HHj2W9hr7tSJRukF/H1gKLFILWIqhLsLpNhG6ZxlrmbjtHiFkFh9okFgrQoQp0M/qrtXpaUFWgRGWy6dr/D8cuWzHntXg8jl/85Pt47PFHEYv1UE31W5giJ590Gt79V/+AQqkCAPinz32UrjltDdlw6VsAAKHyBP7l1q9SQxVdmCLLjzsZ177z/XNes/J+vxKh1mp7bjzk23lxJd4MdqoGhQ+wSYNabfYE1QRWSILO61ZIbyqJQqmCWCRUe60n1QsAkGVKYwarqKZSKfSketGPaZTQXdvem6o+vQuluLV7G4vi2CVLMJWdqCdHi+/3s1nshATVD2/13+1Kgq484Dtd/TWrtKjdfH6M7OwiznXeyGSLiGC69n9/KgoAyOfzlo+jfn9/KopYJNQWpnUzxkw7kp+b+YAdpwC1lrZsde6f33HXj39MU798iFz7zvcjFkmiJ9WL3+74DR743x/S3JSMwb4QUQBNEzRfVJDNZo/ef3Qj2ZNALDk4qwaLlpUoAJLJFmtK9Ku33oJCofp+frWvdrIgrD7UtRShUH8dToB6C5zrLTzj1oBtt2Ub9+87DOAwvRYgbNvE2Kt44flXsGRRN5klJ03IMqXg3sfIqpAbs3UOhcIUYWTHzPC9r+ylmUyVXPv7U23pRnFCiO0Y/XW7GqStCdBI4bml+jqhR99gX0iT5LriMRiRn+bkxDSSPQlI0bmEJVFZl0xlmdJsbgJqMrXy3k5Sg0amb9AVYaNJ0B1tAqsXMmpGtLfdF+rOFxXEYtWoL8NUgTR0rEy2iBtu3EIAYCydrguqmCGV7K370Ks3v5vEwhXkp7P4yb3/3Vb33I30GD0ybAfTmJGhXSJUz33Tx4ub9rYfVGCzgh3NLIBvNfhAhiv3bJb0YpFQLRBi6X2xaN3+p556Gs48dwOWnXAm2k39uWlJqE3ioJIf4yKW/uJJO6xmdGDwWgE26wvXI7q2VYIWorWW7psqncby+wpFCDgTAV6vZd0sE7hRXlJzQbgTvvxmfNluJ68GDT2xxgXXN27dSk859XXkrde+AxlVTp8RsrmJuoDKT+67F0oxWxdlbjc0K0G6U6HmAlNmaEbkxUvl1yzya2el11TiTPXWRYFZdYhEZctOxf5UFJlsEU8/8UhbRoG1xpobwRB+TgSFDPmqj5b0AwyqCdxs8hNw6X42EATJZOeawnYINMhEaHf86dUJN1MgOCU8Nf+oyc+J/09N+G1nwzUz2CHIz8H3MlvBwVdy8DALYiQShMRi0VopXaFUQbIngf7+FJYuW9i2QRC33C56qWB+U4B6KS78NlEJ0gLzV7S0qk+DsYrBvhABqhUghVJeU71Z+mwuEs3MZpZOA1T9itPZEdIJRNioJeR0TnjhDuMjvbz6c7sTdNsSoNuLxgjVd9TEzOfzWDjQj5KL5m5/KmqpmUG+qOgehxFiR7gMbKpAvSYJflOBVhY8ajT3z0gJt00eoFHipxvqT6AKuwpubLxCAWAqO1FHVNlsFlPZCWSyRcvpNXulEcp3gimUKpjI5lxLzwkSCfrx4ezEN8dSW/j382rQ6fH1QFaedGLdXTx0cBRA/ULCQQmEaEW53B50nawAFZKgrOtKbkq2VH7GghP8fplMdtand7SHoNZ+Wp9vdn6d9r04baHlZTTYigndLMHF1gRZtHgIhaIEuVpWac0EDkoqDJ/pbkSCVshRrOOhTTL792UpcNS3ZwX5ogJZPpqrl0gQIsuU8tsG+4yjwQpJUInKhClKNcze3xEmMZ0kIPOonXnC/zab52aBCC0zVr2f+hittjDbvhuMne3qJ6sgPk2isZ1uEo9KiEdB8kUF8aiEfFFBIkEI/7qR+uMV4mBfiDB/oNslem0BHRKUcxNIJHvrxr+cm3DUXl7Pb6f3t9qH1wryUyvmtiVAJyawID59BebkGIywGiEu/vM7jfhsmfc6CnD2gUP5+WEnwVhP0empOK3tfownWBpJQa8HFuTnHgnyP82Y6E7OrZ3vuy3yo5NE8zWt7Wg8uGDVXPb1w6Udzd5G02AE+bk/Ma0QplNSbUfyk6hMrD4QauOWEZyWCmSv0Uki5yYQiYR11Z9Z1xW1iWtHILFor19EVVvmAfJ+DoH2MaM7Kcqrda1GkfJqMESH+Mg8Wk+KEzWfIPMDMqLTSkfRUnx6fj6rprRQgAICHUZqbrkg9B4iuuWaKtM3kSAkkSCEbbfqq1P7AZ2oOKEAm2D6Nqr+hOkrCK/t7qGm8uMwuz2RRC0nzks15xclKAXpZI3IT8sMFhBoV1jyEeoEPbRIMZHsneObc0Pp+U31NdQQ1YsTd8NnJ5SfP6G3Zq/WUpZW1/f1YhlM/lz8tuymngqs5bnNkpyVMR7rT6FQ5Dsp9XJzqnfONva/ltAwEkt+FFItMYGLhVytNAWolt0VC839zESyVxCeh2Q3nR2pVW3oKRUt82M6a040fCJ0tcqEUr2V6+yqKr7pgkTlunNlr80u9Xl0bM0mdau3Wx6bCULiUQlunD9oNdlcIQmayWTRCtrWCpb4oepDSyS1hADPPGMNSaW86eCbzWYxmh6huSkZrHsw0PoOwrWa2iFgnByddNG4/ldSzJfnvJ7iCjPGcvV9WvpolWKSo94qmNyUjDVrXo95PbGmNimdnCpgXk8MmG2T/9Qzuxu+TonK5LjjFtDlK84hpaLpRCUAUFaAsDR3u9H5VgkvhrB09P9duZeoskd/fBolQmu9xlbx27D+fOLVHMvmikiPHaSZTBbZiXRN2CSSvb52SVlqhuCmGVws5PC9O79DLli/wbOLnBjPYDQ9jkMH9mPn049h28OP4smndlGviTDZk0BuCJC73Qu+p0IE2Yo14ZCYVppOhhKVSXdqPv35ffeT3r5+Twfzdde9E3/c9Vs00jQhk8nipg/9Pfnghz7Wkol44OAwXn7xudr4fP7Pz0CWKbUzPnkFK8uUPvTQNnLCyuM9nWcHDx7GYzufxx+ffBh/eOIPdP++w75QgMziHBhaUL0/dpohBL0SpLevH719/Thh5fG4YP0GfPBDH8PuZ3eT22//N9z9o3ubToSM+IY1iK+Yd/Z0HFN/V5xC5BVjKkSQ7ZYgLwNSoRTieyq+82s5xbyeGMbGK7S/377vrNVYsngBlixewI9PfOnLXyTbtj9CWeccMyXIuwUAoDgz05J5tmr1KuBdV2NiPEO2PfI4vvH1W/DHXTtpVzzmG1O4ZSYw7/trJVatXoVbvvp1vPVtbyMfvulDdP++w80hwRWJGvExtcZIb+WxIEtSZRzbW8GCgQr6u0NIhquDN1eeNV/D9v2WubKEzHQFT7wcxbP7InQsV8LYLDkyk3l4mYTEdKIpinBoYL7n6g8ABgaPaUix+pEUV61ehTvv/D7uue8B8plPf4RmMln096d0k6N5go9HZSLLrW8S29vXj00b34BNG9+AO++4nWz9wr/QYiFXS8AODAG62Q5LbVq3Guee+3rseOQP5Lrr3olt2x+hbpLg+PFxRONSjfjGciWsPBZk7dICrjithAtPqDbyJHGNBP68dfdNUTp6T7u6APbgj66XAYyT377SjV/9OYwHngP2j4UprwhDKwiSexKukqBX/l01+nrnmZIbvy0IPQQ3bXwDTlyxhLzjXW+lhcKUoRJk26q//bVU6HXvuR5rz1tP/s9NN+LJp3ZRvyhB0QxhFnfe+X1sWH8+4R3RjfrAkj0JyKt7aubnWK6EVIjgpo3TZPtHsrjlXZM18mNkp/6xg6hSqP0o00f/Znj9cdPYuqmA7R/J4gOXZAkjZPZ7eJlkOf3EbL+x8QodHBhoDQH2Dbbl2Fy1ehX+63v/Q3jFp5UHyL/mx+s4YeXxuPfen2LD+vNJdiLtC17xvBTOLyawHgmuXvWahkmQBQCGl0l1frj1q8rkrhvS5GOX5RBVCrYJzg0wYvzYZTncdUOavH7FDGEkmAqRGgnqTZ5kT8IySaZSrRnYy45boWsaqlWS38lCiwQ/8bFPY2y8Qs2CPHwqj1/n2YknHwc/kKBnBBiU9jg3f+WWht+rJj8AuGnjNLnr+nGsHmoN8WmZ1quHCvje+6bxgUuyJFuhtSjy8DIJ3an5mrWmuSm5ZiabEaHaFPUKg4PzESRSa8SMZFaKFgnmiwr8Tn4Md/znf5Fq/m9recEzAgyKGb1q9SpsvvqqhlSgmvxuvnqKfOwyfxI/U4M3Xz1F1NfQnZqvqzD0iJAnnaXHn96aa+rqMu1YrdVRJUiE+bGPfmKOomXXwhrFNpqQ7bU5fNOH/p7M5Ast5QahADVw/fV/Y9v0HT8+Xmf2fubNMnn7uilfqD4jNfj2dVP4zJurBMAixLkhWFJ6eoGT/lS0JdczNNBnKc0lyApx1epVuiowKOqP4YMf+hhOPPm4lnKDUIA6g+zMM9ZYUoESlclUX5KygEcxX8ZfriuQ910w6Wvy40nw/esLeOsZcs0nKHdLwIoEprMjti6gtm7HrCnqNXr7+k1J26ylVBCw6Zrr6u55kJcK+Jvr309aGRcQ/QB18JarrrIUsFFIghYHumr/rzwW5F+uzgaC/GrXMF3AP20uYOlgmTB/IKtWMQqKaGGwL0SiXV0tu5ahgfnELFAQdGw4/2z096dQKNS7L4KmAAFg45s3IdU70LLPFyawDtaetx5d8dicQaZWPHIvqau++PyVOc28Pr8jFpvB56/M1VWm8L5ANeHx5i9Pkt2p+XRooK9l12E1BzHIBNnb1481p60hskwDT/S9ff04/4ILWqYChQLUwQkrj8fSZQtNHcpM/RXzZVx8WpFcdNp0oNQfbwpfdNo01q8qE0aCLKgjUZnwgQ+94AcAzO8naEUVSE2BDgx0xPg887WnzdkW1NXy3njZm9pfAQYxmfrcs841VH+87w8A3n9uPpDkx+PGiwp1ipZXgYwIefWnViCUDLX0BljNQQx6qszprz2ndh1BNH3ryHzNSS2rEPOEABtddq/VWLZ0saEfkFd/61eVyVkrKoEeiDRP8PrjpvH6FTM1cmARYZ4wtJKiFZKgY+MV2qoyOIYVy49HJ2DRkqUAqpU3QDD9f2prqxVmsCe1wM2o+5sYz+A97303RtMjdGhgPqkO/uW4/vq/qXajcAF6+WysFpMppWg8jEtPLSAWm2lYATrxGxJSH3RQphsfSCROcdbxRWzfHUY0HobcLaFHpfZyU3KNBNWpMCuWL2vpZOrpX9K2qo/H0EAf+vtTcFq66Rccv3wleeH5V5ruz6yunifZI0C/mq9PPrWLzuQLeAHVG7djx2O4+0f34n9/cT9xgwT7U9GaNFcn0PI3EQBet7zgiPx2/CmBX/05jCz3nEiXIwCA6Vz16d6drH7mQLg0Zx+2LZUELjkphNcfN93wdV98bE65Gd11gQ2WEqNWfmpSSSW7WzomWA5iu1aDMLCUn0wmC1mmlHWlBqodpt1Mhv7whz6APzzxB8qT1cUXXojr3nO9a9fjle9WPW897wbjJhLJXgATdUSdnUjj9tv/Dbd89evOv5TZfDY+EhyLAcWZIsoLj46vpYNlsnqocdX14e/Nw3d3xKh1T8Vcf0k0nqhFcP/jNwm89Yww+afN9U0RrJrBy4+BNJiMULNGq7kpec6ZDQ4tbOmYGBycX1cNwtR6sidhqd2+G9j97G784yc/XrctlUph0zXXYdPGN7ioAueT/fsO08G+EOHL4NyuBPnDE3+gLzz/Su3/F55/hd5//6+xc9cu4sY8Y+6mViDQy2KWSmXM5As1lcbM7D1797r6OfwTtlCYIiFU/X9RVP1/S1KNNTUtSjG86z+6sX13mBq1wrfsauCO8d0dMfrqRIjcdb19Yu5LAKuX5Qk7r9wQIGWrZDKdlQ1TSIxMUKuuDSdR5GhX15wF2KvBG1CvIn5jYyPYseMx2hWP1fm17r//19j/iQ+71nU6lUphJl9APlF1gfDNUN1EKtlLAFB1oOK73/sfev6GK4gbpN6qTj6Bb4elFT0aTY+48gTUSujVSjU4trdi24dH4hS3PhTG9t1hOpismrHFfHnODw7kNLer96n9cGS4fXeYfnl7wvZ1kzjFsb1HAzr8miW8eakmGd4EbRTfueM/HPvGtJK0vTSJBwfn18ZlVzxW93Pbv38LE+MZV81GNiabFQgplPRfe2Tbz135DKcPzo5UgHqEmJuSHSsJPeSLCuR8iJK6J2QDg6rQhXufrvrLWJdo+vjw3P0AYM+k8bF4t8BwlkyfMp9G49Ugxr1Pd+PGC8u2TWErUCutwb4QcVoGt2//QUffXW9fP4YG5pN92ZGWjkPeMlFbE7t27fJ0TZxmwi1rq1X1456lwbQTeIczAMRj9tNfXhg+2p0ZALqfG3FFocgypfyxDhXCeGG4EbPHZOBoKCqFJOjg0GDLJ1SrU3F0FVtfiMzkC9j3yh6XTOBk3feuZ6E4RSyCtkWgK0H0FkK32rjTLrEYvW4nAkziFFk5pLnMpdsoT4Fm5ZDt9zVC6smeBGLRxmdLdfW+ETqaHnd0zWxxJN5Xmej2LiickycNE3vHx8dc+Zx4d2rOQznoSdHNhnptcE8IsB1a6qtVnxM0o1okkSDEzXO09PRUpQY5LYMbTY/b7kCjBaPFkRLdxDMyZN+J+nuplEvuuGOms5Yf0I5IIxZFu6ChNBgBd6EVMFEP4ESCEC1zJl9UDM2ceBR1pVFOl93Ug1ZLqZ55xztmlrHxCi3OzDg6DutIzZ+fPE09VYFzzVHF9Q9vVedtBr8tcGZVAfIkKJoh2DCB2Y9VUrMKNUnpkd/cSYWG93FL/fHENa/H2YQozsy4Ug61ePEiTeXXSvDfSSjsjlNtpkg1LRSvLYEgK0BBgA2SYbNMbCPy8yuYz7WRdXnrSHRspO53oxiaPzelQp6mnhFiMjHPE9XEm8BePvzaCSIK7DO4NYCZqnQaZEmFrBOFU5Msky3W/W4UWqk4POHJ03QOIYqxIwhQQMMkswo3AhtmC/q0AmblcMDR5qhOs/mnMgfqfjcKK4sjtQJeNS8NwqJIHUWAzYoCq0PabmNsbMSTFj3NSIVpdnqNFpxm87P0kD17X3ZmAltcHKndIFJghAKswY0qELcSVlupKJoVBa4bRFQmg30hcuwxzvIvxyeqFS/ZrHOXiVEuaKsCIl6V44kgiM8I0Esf4Ey+ANYf0CnsKBE3o8BmJMevBesnpRPvdrYWCCO+sXTa8cOPLY5UMwtnfX5e+P5ysnHp4sJFi9xxT2RzuuV2gtq0USqV28MEzk2X5oS0GVYsX+7KZ+zc9UdPvhQzc5UnO7+adt2p+dTpanCM+LJZ500+tcrhvAp8mLlNFixwp/Df6YNCIMAmcLI7UucDjMaSs/0BgdPXrHF8/InxDPa+spd6kexpxUy1S3xuRYENTS1VVYXT1eCmJl+mgDvdfNQNNtm5svNtZV4ga2fvFC/vfanuPrF2WMIE1oe6fDbQPsBMJouZfAEz+QKyE2mkR4exbt05ZOObNzk+9q5du3Do4Gjrn1A6fiMzf1KzgyBqAnFjNbiRDK17ADnBkkXzDdVfM9WgVhoOWzNlw/rzyQkrna9bMjGeqUXf+eCHSIWxh0CXwm2++irCmwEXX3ghNr55kysBkJ/85B5fX7tWKVorQMNDFBghTsvg2IRm7cwKRWf1surO1F4rvpl8AWPgu3xncdZrF+FTn/6sK8c/ePBwbT0QdUt8AZ8RYDOCIL19/XCrHbcaL770Mu7+0b201bWOemYva/PulnntFLNlcI4m4Gh6nKlaKlGZZKdyWLBgQcPHa1WDTQBYvHgh/uUrX6y7H8uOWwE3ewC+sOcAZvIFLFnUTfiV4YQC7CAF2Czc9s2v6Ta09Iv643+3Qgmqmws4LYNjRDrYFyJuNERoVYNN9nB2c8EgLfCdmINYPukXiHZYKtxz3wP47vf+p6nqz0nViERlwv/45b45LYNTV904rQdW++HaqfRtYjyDB7c9RLviMU3VJ9JgfEaAQSHBh7dvwwf+4X1zyE+vr1vTvxydrsu8+dsqElT71BYtdKcRAlD1nzlNQtcqh2sXEtz2yOO1AJ0W2Ql/oMsE6IYPz+8NEe657wG867p3ezJDnCRN+w2sgen8Y5yldqgbIDjtmjw00Ifu1HyqRdpBJ8LvfPv/BbIXX2AJ0C315kcS3P3sblx33Tvx/uuv05wVVv0rzejybEURtgo8ibixGNJU5kBdAjEri2sUWpkA7dAF5s47bseOHY9RofYCZAIz4vObGXznHbfj6mvfTu+//9e6Pj8ra632d4eapup4Xx9v+lqNAjczH5AnE6dVIGrF50Y9sF5JpF5KjFut6pv5sP7HT2+lQv01jpasCeJXBXjde67H73dsJyxlQV3CZPXpmpm2t4CQXbXIR3v9GADpTs2nqR5nDzde8XXFY66UeaVSKfD1wEHG7md34x3vequlZRNEEMRnCtDPARCWsvDE44+TdevOITP5Avr7U74yLfxEdlqY308c5ewBwPDIkTq/lhv1wOpyOF79tbpFvh384Ee/wBsvv4yyxGfeOhHwgACdKLdiIReIjtALFizAvff+FNdccwXJZLKIxXqon56sfidBx+a0XK++3agHVpfDmcGttTrcwsPbt+Gqq96EG/72vXPuhR8bvrYtATpRcEFbEvO2276NpcsWIpPJzvH/CYfzXDVVnCm6shocr/jY5HZaD6wuh6sj3AAEQzLZIlKpFLrisTr3jNfjsFAoBnqcGnXnERpaA1/83D8TADX/kdumRhDSYPIFa4upZ/MhqmVq2oVa8U1nR4jTBdJbWQ7nBjZtfAPuvPP7+N9f3E/WrTuHsIeD2XgUD2oHClArwuTUhA2aCrxg/QZsWH8+AVAzhd0kQS9SZmrfXYO1wPGYeWCHqaiFC5y1wWJKjzfrZsvhHB1XqxwuiKkwq1avwr33/rTa/KMFQZ12WhjdcxOYJ9AgEeF1f/WBekVkkgpjh9TaJRGaBRIWOEyCHk2P1xKqeTgth1u0ZGlb+cpu+erXcdZrF3ke2Q66CcyLupauC+x2MGRiPFP34yYuXn8uzjxjDVFH3tqd1OyAKalmmZpOl8dsx8WRbvzQPxkSer6ouB6sC7oCbJkPsJkR4InxDK7YeBl93br19MxzzqMXbPgLetVVb8LD27e59hmnrzn16GSXKTUaWF6atc00fe1isC9EnHZeKc7MaKoap8tj9vb1Gy6OpIbfE6GBqnvmzDPW6JrCIjXGWAGaEqAWW9olMa/SXvbvO4z06DCyE2kcOjiKHTseo9dsfhu9847bXTn+mjMvqDf5DJzLnagAayTosAxOz9QdGz3s+Nzm93v/YBoeHsadd9yOO++4Hffc9wBefOllV4//lquuMlSAAtYR1mJLN9bC9YIEo7GkZt++f/z0VrrxzZuI087Qq09ZWZ2I4xWaSBDSSRn2VqPAgPMyOD1TN5ubdnwdPfOOJ2Pjh6iXvsDn//QcPvJ/PkH5OXX9e99FPrP1i64cf+156zHY93kR6XUBbamXZ/IF3OdCS/uhgT4sXbawIweGlSgwUC2Dc7oY0v6Xd2o+dPfs3edcnbqQouPE9GIP529+63b6ta9+yZXjsk43XgVDgh4E8ZQAvaz6iETCuvb9zl27HB+frS8rnpPGJqZTpa3X+cWNcji71SDNJMNvf+e71I1gndm4FHmALSLAYiHnaaqLepHjevWw15XPWLhwyBWXQDtibLxC3akCmfvQHOwLEVeWxxzyj4LPZLI4ePCwa+NSD6IZQoebwG5iwfxqp+OgJkI3G/N6nLdmGkundZW8U8Xkp2qQmXwBL+w54Nq4FA9mHxNg0Ko/9MDWuhCJ0NpwYzEkPbhRDmcnRaeZzRBYEMZpao9AYw+ejlKAbjaM7Osb7DhSa+QB4QRTky9TPRPbaTnc4OD8llSDeNm0tNmpLx1fCmdH9TE/oBfBkEhErOrZtEllMQ3G6gPCCCMZqktSsuxMAdpJ0XE7EZpdUzOCEt3dcc/GQkdFgfXkolVCaxfTd+5EbI5jma/YCGIS67LjVjh6v5mPL593RkpaiyN5Cb57i5uqcHo679k16CnAdvBBWlaA7UpsnUCyTZ3gDqtACsUSclPynO2shtdpPXBvXz/m91f7FprBbw1RBZpA5o2uCeK3rs6FYglybiLwX0gzFy3yQt04rQLJTuWQyWQxNl6h7AeodsCeyRew/+Wdjs+zZ97xJJsPtZWTljeBW/XgbIfFmZo2+5rtByyVvb1RnVYKZ6USZLYKxLF/a/PVV9UdI5WqWhvZbI4sPf505wTY3X7KLiyRurHZCvdJO5jAlgnQbyZwJAzPgi1BNU+dwE4tsBOcsPJ43PLVrzf1M4YWLGq774evk5ZlSlmgRSRB20Ng02Bi0eA+1dshEXpsvEKHBuY7bjjhBdxI1QkKRBmcMTxviNpM5RjUNJh2yRlcfMxAIM7TjVQd3yp10f7KGwXYSE9AL01UAe8RFNPSaaqOQHBh5qe0pQDNOjyrX2sH8hsfH2vq8dWdm4P0RA+Kaek0VcfPEB2g7UHdQMX1ShCe+Dopd9Atv55fB7RWHl1QTMtoV1fHLCQugiDW1Z+rBMirPTURBloB6vSqEwjOurvtuDiS2mJga9YEddF0pwnvVqGOGzREgMwU5n/aFVq96pqlFlPxCvGLCay+bK1E4hNXBIMA2eJIrVhT12sTOKgKsBldcqwkajtWgLyZy4iw1YQ4ky8glUq5cqyxdNrSfk4iu6waxK1qhXxRqR0zGg8jlajYPkYqOZec+f/dqALxVgW2Z2dv9QOzGQrQSOUVfLyQXtNMYC3Sa4XZa9QR2q21IKy0Zc8XQrZ9gK8/bhqDyaO5jNOnVAv23XiCs2MV82WkQgSrh+xn7JsJX4UkHK8F4iXceiAKqB+U7rTK2rP3ZdfPzYoCbHhVOHWKi9/SXs7fcIUrxxlNj1CtGxlNzwBLkpbIQk8xvufCSXLzfd01wiNnL0A0PYMpwJQEF1S6AQDDofqV04oDXUfVX3oGl60rEBKntgm6MFUCEDt6rbwqHq/QpcsSgZqorVwcqdkmsCxXWmYCu/VgaYaryQoayiRWkxyv/rwiwUKxhEgkjGJhruy97LKLyaaNb3D8GRPjGc1OJWq8OmG/bIzmCT66Xsaju0Lk9/s4wltSb3sW82XNhgnDtb/q949y71t5ehf5l6tHbZMfzRPsnzSutHFjMSQv4ZfFkZqJZtWra7XDSiR7MZMfxqpVp7qkAPe6fj+sCDlHpRTqNBdPF0QqA3Juom5d4P7+FDa9eSO58cabXFJ/48hkzE3gA9nGb+N9H8zi2tv7yPbd4ZrZOueBk7ff+WH9qjL53vumgQZiKuMy8FI6SYGqg6dSypFsPkQHu1BjUjcWQ/JUAfpgcaRmNA/gfYBeqr/06DAWLR7CW67e7IrQ2PvK3qacu5lFG27kS+JVntcrwdWe6IsX4H9/cX/dJFy8eKGrquTQgf2aC68DQHg4S6YHuigA7B8L02dHY6QRXxsA3HX9OH7wVJI8+kwF+ycj6EpWFeVMroIx5ehnD0rmx+8/JoI3nlDA287INUR+ALD3CFXGciXClGcso6AccJOylSk7+aLSNgnLiWQvYlEFy49bTr7w+X/GCSuPd01oNKO9lprPSqVyXSqMYxNYbfJ6SYarVq9q6vF3Pv2Y7muyTClBNcpazJfxi91hnHrZTMMJ0W87I4e3nQEUJQVRpYCiFENU8b7dEIlT/PrVpIRZP2QxX64NEn4ip1LOv+fh4WGMjY558l3bWRzJbQSd/L5y860ozszUov5DA32uCo1nn3tJV2g0W23XCLBQlOZ0S7VjCrdjLuCTTz9jfN1cIOTRXSF8dL1zq5CRXivID6j6/x7dFaq7Ri3Tyo0yuNu+9TV881u3U6OBP5Mv4MSTj8OOR/7g6OYuWrLUc/NUyxxzG16YvW6oPCPsevJhz0xf3UToRshPKxG6nYjw5b0vGU7O8Eh1TkbjYTw1kqB7hiuBv+bfvtKN3++LHVV/w1mipWTcaFSazebQFY/NyTHUIg2n6wMPDfShvz+lW2vtRXdjsY6vNn710IPU7fts9V5LrRgIQcDuZ3fjhedfMX765iZqAYpivoxvPtoX6FZXJE5x64MxSwrDDZOSJZmbJYBPZ0dIbtp5xm2yJ6F7PYKcWoMXX3oZLzz/imu8Y9eUFq0kdPCzn//UmsnK5ch9d0eM/nF/V2Cv+clnobBodDQenpP/x8ONDit66wHPIcrxCp102JWHLY5kBLeXxQREvz4z/OKnP/TE9BUEaBP3/eweS5OzsGeyLk3ls/d1B/aaP/OzeRIjPwB15m8d+blQBjcxnsGefdbcJTP5AsbGRhxfn1nqTjNWhZNlStuxBtkt3PXjH7tu/tqB5PQA7YiHt2+zJcuj6ZkaaWzfHaZf3p4IlClM4hRf3p7A7/fFaC3p+kCuzlxkNaZj4xXarDK4wb4QYT/s81gbKze6hbRrNUhQcc99D7hq/jYCoQA18NVbb7G1P1OBjDxuvq+b7vhTcEjwwWe6wZfkFfNlFPbUtwHjAyDJnoTjNAh1krm6Xx//eV3xmCvdQpYtXezpfRXmrzFu/sqnWz5BBAFqqL8dOx6jdp9K3c+N1E3ga/9jHv3j/i5fkyCJUzz1MlWuu6OXGl2LGscvX+k436c4M1NTlnrNSvntbhTLt/PaIEHDnXfcXlN/rbQ6BQGq8IlPfbwhxpJlSsNPHqpVTxTzZbzx1n764DPdviRBEqd48JlubPz2IsJ8mNF4eI7pq6XO3DAlc/LkHKVnBDeK5YPSwLXd8eJLL+MfP72V8gpfEKAP8OEPfcCRT0KWKcWBHHgSfNttSfql+/23NMCX7k/ibbclj0Z8Z8lPbfpq9ZdzowrE7lPfal9GI7SyGkSgionxDN7z3ndQtys/GiVTya0BGnR8Zssn8N3v/Q91+qUU9kyCJ0Gg6hPc+LUUfvtKVQ22QhGSOIXUHcNvX+nGxq+l6nx+ADTJT0+huVEFMjxsz6dnpS+jGVg1iIjKtg7vee+7mxr4sMJbfB/RsFtMGnTl5wb58SSYGM4SnLmIMvPy9/ti9Kqvx7B+VYz89ekTyqVnUokRYbMWSmd9AMdl4IGnevDjpyNgeX5WyE+vu7AbvrTDhw7Z2n80PUIBOLpR8XgSg30hokeAzcgDbBZa1T+vURw4OIz3/fV1eOKJnZT5/fzAMcFcWdwl7H52N/7xkx9vKOhhxRxOPHmIFE+ZT1nDBKCaJrN99yAZ/EmErl6WJ2cdX8RZixV0RUhDresBICtXa3fZ+7NyCPszEvZnKZ54OYpn98Vpdt8UigPhOmVazJcRfvKQbg85Pf+cG+vsjk9MVp/WfdbyJnNTMibGM46iz8nuCLpT8ynGD2u+7lYeYAnds0okRjtVVPC4574H8H8//n9oenQYzSQ/q1Yr30e04Y7QQSe+22//N3z3e/9DmzkwZZlSPD6McLIXxdfUf8ZYrjRLhl48g0rAQNcc1Uf3TELW6T6tFZllysmNKpA9e/fZ2j+TyWI0Pe6IAHv7+jE0MJ/s33e4qSbwwsGkKCmdJb5/v+0WPPHEzrp51sp7o15Gw5VuMHbh5ULVE+MZjKbHcejAfux8+jH87y8fmvOFNBtybgJ4vGpSsvU61ErMbegdv7L3CCm/auwDM1pYZ7AvRBYv9q65qNu5dMcuHsKTT9UfPx6VPBsLbkWirQSivFy0is2zZ597CbuefBi/euhBqq6l94vZW+cmWnnSiQpPgJlMtukneuYZa0gqlXLFsW3mN8pNybVr8pMpkkj2ojyfojjgfJDyJrbm6+kZhIezltulJxKEaJm/Y+MVOtgXIqeueX2Dfqvs7ORNYdczu2gmk7W0YDlTnmzcOMHLe1+i+/cdrvkC2bVW1zlZ6CjHMZvNgo3rJ5/apXmv9T5Day5oXSv7DHYdVuaZ0Wc4RaFQRDY3QdPpPNKjw9Ay+dnc80PHnVRvNYWLda2aQ4CHDo42/WS9NrE7wRxxcz0II1JiZOT0O+yKxyyRH6/UZJlSNz6XKVxG8owI3Ti+lfHmxWe0Yp6pz8tLxWf1WtUE2JIgiPCPNMHMdoH8GDFYaeHu9XfIrs+Nz5VlShMJUluEnn94eHFdXt27VswzXu15SX6Nxi58nQjNNzYUTRq8gZft20WtbPvBS+LjP7NRfpCCcjOFamy+CW2FBI0CJK1QrW58divPQ8Bb6LbEF+apID8j4ssXFVcVG/P/WTlmvqggkSDETfJlxNcuq7UJNAbx7Xc48bEoqB4RaBGUEyJin5kvKhjsCxE7BORUqanPm/3vNrEKeAu75q/jZTEF2sfc5UnOjATjUan292BfiKjJkX+dBRrYb/V+dsCOqz6OHULkyY4/JxYBZv8Lc7izIAhQwFDtmREh/7eWiRuPgpgRrN3z0iNEq+TIk6AeSQv4X/W5UbUmTGCBOYRhpoLU5Meb0Hokp0WU/P/sb6s+QTOy0/MZsn15xaf1t5ZaFiTpH7hVsisUYAeTnXrim5GBlhmrRXhmwRQz1WklD9HIpLerCI3IX0SL25sEhQLsMGiRBb+NNw2NiIJFhdXRYS2CU5vMRuTIXm8k6izLlLIfIyXIXheE1h5msCBAAVvkpyY8LdWj/lErRi3yUpOd+n8zE5cnR/YZdkhQj7S1zleQn1CAggA70PTVM+msEIKaCI1MXPVvNZlqERNPdo2atTxJi+BG+ytApxAE2KFEaKac1OajEXFZMUfV6pOPwPL7Nar4+PMTpCdgFeFCUWqafS0QTEJk5GI1cKBFRHrK0QpB6aXWmJ0Lf2x19FaYvO2j+tzkJREFbnPYnfy8KmtEgZntZ/Yeo+iyHimyahat1/mcQXWUW4yO4MGNlvqWFkUSaB91Z0aCar+ZE+VotJ9W9YgW+amjwVY+S5Yrlrarz8UqcQvC9I8C5H8LBegA0Vi1rThrjsi28f+rt/O/td4LVGsN5dyELSmvp0yMyMtsglpVO1rmrBW1pNfQQOt4TInpETK/Whs7rkISNBYDJCqTeBSu+fUUkqBjmawlQovFemj1/GXS6uU0O52Q+TnjhAANF0Vqd8JLJjR8nomU8f/q7fzrmvsqiPVXt2cy2m3Il7wnQqLvqiCiWtphUGPpx0ELy0Ea7ZPcFiXDn9WevP39KSw/brlWq3mi87cV6O7/8t6XoF6UKJEgZGy8Qs88Yw350I0fRgndiGAaJXS7Hsxgxx1Lp/GNW7fOaSvPyPm8Y99DFiXOqF1LItwLLAaRy/UPtkS417oan30ve49cnkAi3IsXJx/Co6/eoUton/mIhMvWVshEjii9SUWy+p1M5CQFALj3mO7/7/9dkX70gORLcm1GTKKjCDCZkGot/73AosVDmtsHLomR/lua2+C1KxzGTLnq64idWEG5IJH0l5Q56mv5ccvJ0KIVKBWLntyTE046g+SmHqGZTLZObfb3p/CFz/8z5vUNIp9v3pq3xZkZAMCprzkOschnyQf+4X1190SWKT2l7xKyqv9NKFbk+gdoKIFoKNH4A1jjvdFQAucseicAEDUJzuQL+OdPxvEPb6eE5kPAAkhAyPoHLmBZHiHL+//rJ8N44lmJ/PklmfohCKpWfepzcpoL2DEEGI0lkZO97UCcyWSRSPbWzOFEgpD02AyNnZcA0FwCZORXM+XOKwFfCs0xT1OplGfkV3sQ9SRqyjgelSDLFaw5bQ2Z1zeIyfExRLu6akTVLIyNjmH1KSuxdNnCmiJlRNifXKxNnipCdIWQKzKKsoyBrhM0Fc/aUymlee/SekicYsPaPP3zS/42hYUCbND29xqxqAJZ5bepVGZ8cT9mz8eXOXNOlnQszszUvd8qmbbSr5YvTkJA2+xlyk9L7YlKEJ+rTi2UC/5xsUjRVMs+W5YpNcv3K87MWCYw9b7s72hXly1C7ZbmeztOdMzqRIIQq/67doVW2ys3TfOOurnqVeE7cTCpoRSzvjxXnsyskJcWSTZqSk8rI55fb298ieYDggUyOlkB8kpQmMABg16lTSsHU0vdENGoqdlpRFpq81at9KyQoBPzWsA/D2+hAH0OrXxCAXuDW+3L0yM/q8rQCvl5bQIDQKEyJQaCxfEhTOAGyUgzB7CJiMaSmmZ3Zcz7NY6VbMnztZWVYtaSid0VjyGbzUIrRsVMYUZk/P9qclO/pkWO6mPlpuZGdkfkF6rqVJXz10xoBUG8/r7GZ2/F8Ki/5q7WWsNukWBHmcCFooSBoQWmVRpukV8yIc1JhO6Kx1D6AUHhXWXETgw19RxCkaraqZRmkPmqdsB31zO76GvPOp+oTVOGUrGISDRa+20Efp9SsVgLsPDbRg/tgTr5GACefGoXfeD+n5ELL7nyqLkcBtxy2zJy5Y932ze/hkMHR+dMpuemfk1PLFxI+mKLvXk4V2TsPPwTzddu/c8iufPzMZB48wNn/XHggUcl5f6HI6Qr7j8F6FYbfB7k2OUn15yssaiCTCZb94Hthmgs6Vk6jBHRJhKESG8sIdTb/IGd+2UXci9M6ya29venkOxJNP88pmTdyhg20NetO4esWL686efyp+f/jCee2Kl7T6KxJFZ2ryUsQlsySF2iqIDMJhtTHK09NtrGb39p+ndUz10yky/gpJUJsmFtvukDZXgUuP/hiC87QfHRYPVvO1i0eAiFolSbmx1HgF6aFWb3r5POxWoXDz/dE6/Ox0/3xM/z3o2V4NQE2HFRYD99uZ12LlY+w2+Tzw/n0+l9OflEaPUD1SlqUYFOz5ETEBAWjv9Fi1MVqE5LE2kwAgLCwgnU9blJ8jUCbEWdrICAgEArSV4oQAEBgcCZ+Y2SYCyqaBOg8AEKCAh0mgIUdq+AgEDgFKAwgQUEBATpuU2Aej3sBAQEBPxg9jo1gXl33xwC5KPB7ZhTJCAgINSgLgGqoyQCAgICXhLbTL7geut7ywQoICAg0Ao1x3d/9kL9AYBUKpd2MtPXT92LBQQE2t801VroXEv9NaMVVkXBrjl5gF60RRIQEGhP0lMTmR3S4rtQaRGjU2gpSwkUh8TXKCAg4JRUeNJSt9QzI0Yj0uPVnxtJ0LXeixQHJSJhFzOBjZhSQEBAwC4h8mSnpfD0jsHep97PiSJMJHvr/icEL0qESNPMBC6VyshNySIXUEBAwFXzWEsdNmKyOoE6w4WC7pOUSuXP6h29XjxIQECgfZVgo++360O0Aj7QSwh5SZLCkT+WSmXRDktAQKBhhafeplZ/avNXj9zY9mbk/SV7EiiVypyFS16RDp192ksgdCfPkHwkWFSDCAgIaHGBln+O9+8ZBUDM/IBmROtEkRYLOVQU7JoYO/yshLvvrmhFgkUgREBAwA4nGNXrtnoBqmgsWb8GNMVBYLYShEWCAYhAiICAgCsq0Sy5uZnm7hzzdzauwVJgCMGLNQKkCn1a3RCVD4QIM1hAQMCIzMwIr5Xqj6Gu0o3gwRoBQpKeU+8oKkIEBAScEqRfXGksAMIx4Cs1Ahw5buGLfCCE7Sj8gAICArzJqmXCGik4P1iPqd4B5KbkmvnLAiCzBHhBWPnNIyV1ICQ3JaO/PyXMYAEBgbr0FbP9rGzzVP2p85pnAyCzBPjwrC6kd2jJRgEBgc4yW/XUn1Ypmx7hqRczb7X5m5OPVoEQCf/KEWAV0/nJh+sU4OwbhBksIBAc8mqUbMxqbtWEpm5R1Uipm1fKFeAaIABQaOkPcwgwm74ww/sBhRksIBAc81SPqBpVgFbX4NB7zW6yc7PQ35+qy/+rKNiVTadHVQR4QRi4u5Kfzt3Js6WIBgsIBJsYnZCgHcXIm75mra1aaf4C9Dv867MEWPUDEiL9mpeKIhosINAeJrLV4IVVc1qr55/6fUa1wl5AHf1lHKdBgFVMjB1+tqJUq0KKhRyKhdwcM1hAQCA4xMcrMzMyU5Og1Y4sXi5iZAfHHNNT9z+f/qJJgFoSMScrojmCgECA1Z2VecvITosEjd7vpAV+s81/xl963AYAZI5sHBgYCkuRYX4bU4CHDo62zJYXEBBoXAVqzVsrrxn5EZuxUJFbWLR4CACQyWRr2zKjR+YIvjkbsun0qKLga/w2EQwREPCerKyYnlZNYDVhGfXi481mMz+gXzEwuJjwtb9qTjMwgQEQcjv/r5ybQG5KxsDQAmEKCwi4RHJGi//w/+uRldbrVvxxjfj0goRFi4eQHjtI62p/VZxmSIB8MIQhJysYGIiLESwg4ABaiwapSc2KQtMzU/UCHnbNVT+bt2ZgqS9atb9ztJ7eQXoHj7lSIriP3yZ8gQIC7pm4PNmZBRu01KETa8xsqcmgkh/z/fEEqFBsnBg78jPrJjCAibEjP1OrQOELFBBonPy0EoWtEKSeGatnqlqpwODPx24pnZ9FT7IngUJRUqk/bfIDgJDRweKJ5EFC8Hb2f6k4g1BIQk8qgampaQBAuVxBWCyoJCBgCPUcmckXUC5XUC5XdM3NcrliSELhSBjhSLi2X1c8Vjum0Xv547P91H+bXYuV47dC/RWLJczMVFCpFNnm989M517Qe4/h+pdaKpDlBQrTV0DA3GRUR12NIrONfGajjRD0an1bvXZHo+iKx3R8f/rqz5QAAYAQfIr/X6s6RESEBTodesShbhvFR25bEWgw8zs20u/PD1i6bKFG2Vs9dzVEgBNjR35WqeAX/DaWXJjqHRAkKNCxCq/ZY97Il8cTmJ1jaSlQN5RuK8F4iK/6qFTwCzP1Z4kAAYBI5OPqbTlZmVNrJ0hQoNMUXiPkYbW7slv5eEb5gu0wZ485pgfpdL5e/WlwlhZClr646dxILJ7sJQSvO8qwxTkBEUAERQTaS/UZjWUr45w/BpsbLACiFciwA6vv8WvQwg2wwEd2crK2TVHwtYn0ke9aeb9k9YMUlL6oDohkMlkkexJ1FSJCCQoI1aet5PRSX7ycL35oUuom+an7/VUU7FJQ+qLVY1gmwGw6ParlVDxyZAoDA3ERFRawZQa6QShudEFxo5280eepm4PqVW80k/D82rHF6XUlexI4cmRqTuCD7/jsignMmcIvaJnC+Rlg8ZIBpMcmhCksCM6x2WjFpGM/VsxEs/Nh5+zGubF8Ov64WuYq/38zzVNmaqtzBYOO16w6lYyMjGMmf7TbS7FQ/kZ2fOTrdo4j2f1gLVOYpcawMhRhCnujhPxsNhpFTRtdQ9buPbOSamI3mmrVxNSr2W2mqe2Vym01Tjz5uDnNDioKdkkR+nm7xyKNnEDv4MLVEqHPqLeLWmEBtwnFybGbYWJqnYM6p07rIRDk5gJ+glatLwAUZ0pn5KbSO+0eL9TQIJjOjUTjiUmJkDfw2/P5AuLxGEgojsJMXpjCHQj2XbNIp1YJmNl40NvHatRVXQpmZQzqna+ZSc1IjW3XKkUT5Oce+SV7EsiMF+rIr6LQD09NjN7byDGJkxOa13/Mz0IhXK6lBHOyguxE2lOpL+CdEvJKyWmpKLP1Lexcq14zAbNz1XufILrmYGBoARYtWkj27XuVAkdXriwWSvfksumrGz2u5OSkJjNHrlT7A5k8PeaYnrYlvCANcr+sz+rVg1DrWq1UcVh5D9tulRTFA98dpHoHsGjRQnLo0OE68qso2OWE/BwTIABQlC5VbysWcjhyZApLly3UXFE+6OQXpIHtpYO9kX31HPR6DT7ttGnX+lsvDUXdHsqsVMyNFBwBa+S3bNmx5NChw7RUKteZvlrc4zkBZtPp0UKh/CYjEuRrhrUGY5AQ5Kd6Mx5AdutRrbxupVBf7291swH1sc0ajwryCgb5KRQb7eT76SHkxomWCtMvSuGuJ8Jh6R38dpYjeMwxPYjFInNK5oSJ4L1yVeenGe2vFxQwe7/R63yQggUKtIIK6vIxPk+P/c2XlGnl3PH7q8EfU+sz+c9WH5vdx3bLrfMTFi0ewsJFSzTJr1Aov2lqfOTnbnxOyK0TLhWmXwyFY3IoHLpEiwT7B5KaJCiixN6An8haE1uPIPReM4LRd6pFGlqRU574jD6HN1n56+OVnlEkmld6fINSI3LkI778NfFqUxCiM/IbGFysSX7FQumjcjb9Hbc+K+TmiRcL+d/qkeDkZA7xeGxO84R2JUKraRWNHruR46pVl5FKU6syM8WnJgY90jHqOsyIgxGQ3n3klZ+auHjCUqeo8EqYHcPoYaEmZPX/6vPl02AEGie/ZE8CIyPj0CK/XDZ9s5ufF3L7AvRIEDiaJ7hw8XzIcl6zPIj/CTIh6hGBW8e2Q5I8YajNQzXBqBWPUdCHLyHjFZPW/nolYWofnfra1OaoWvnxilK9v55vUe0zNCpTM1J0WvdSqL/GceLJxyEai+LIkSkoitJ08msKAVohwXIljIUL+1Aqh2oJ00YTvVHF02oVZ/X8m3F96kmp5R9Tv8YTt56PzoiIecWld9/UrZn4dSy0VJ7W56l9gWrzXk1CanPabh2u2T521tMQ0H74nX76qSSdTiMzXpjlkOaTH+BCFFgPuWz65kKh/CataJqcm8CRI1NIJqQ59cPqCaUXMfYiSudG/pxe6ZST67F7T4yWWtR63WztWqP7pb5vVjqR6K1jq/Xb7Dr10lf4e+Zm5FrAucm7etVryKHDBykrb1NHe5tFfoDDShArSKQGr6BK5ad6A6m/P4VkTwL79x22tR6BXv1lK1SiUeWA1v9Wr8sKCRqRmN429Xu0Pl+voqKRe212D6yQm9Y5OV0PV6D1Jm8s1qsZ7ACq0V45O/bzZp4D8eJCUwMDQ0oJD0RjkdO1JlY0lsQxx/QgNyXXNVKwMnj1JrNZSZSVkiqzJFg9ArY7wRohQKdKWMsXZqbutMjRCpnpEa+ZItU7Ryv7eWUlCNgHK2tLj1VVn4bJu1OK4A1u5Pn5ggAZkqmBH0VjkU1akzwaSyKZqC68bkaEepNGa5Lq7WNm4ph1/dAjRCeqxEzRur2SmF0StPNduKm6rJ6nUHf+9/UtXbYQAJBO56Gl+pzW9vqaAAFg3sCCG0MSuUVvojM1CFS7TasbKliddG74eKwSjptEYkXluk1+Rse3QjZG5rYd8ndCaoL8/O/rY+JGS/UB1a4uk+nhW708L9KKm5HsGTgdBN+OxiKn65mriWQvBgbiAGDJP+iUCPTKsIyK5LW6k7ilBpuh8OwQWCvUgVB17Ul8A4OLdc1dZvKC4q8a6ecXSAIEmF+QfFJRKjcYqTGviNDMj2VGHH5yzFv15wkINJv4CoUJqmfuzuQLkKTQN6QI/bwX/j5fEWCN4FKDVxDQzzE1qLtfshexqIJkTwLpdB7p0eGWqRIBAQHt+cKyOnJTMgpFSZP4mOqjIJ9qdpTX9wRYM4tTg1+LxsI36JmeDOpgSSaTbSlJCZIU6HSkegfq5qS6Xb3fVJ8vCRCo+QY/FY1FNumZn1pECMAXZCgg0Imkx+afEfHNqr57QPG5Vvj6AkGAvFkcjoQ/XyoU1mgpLiNVyH8ZZhFkAQEB++ZtLNZLCoUJakXtAYAkSb4wdwNDgDwRqv2DZjl80VgSkUi45i/MTckAgEwmCy1VKSAgoE14vN+dwSiNRUPx+Zb4AkGAdYowHP47tgCTnbUXmDrUQqEoQc5NQItcBQTaneDM5keN9EwITz1vItHYL8rl8m1+Jr5AESBD1UdI3qsolRusllXpkSJTiUePnaj/0meVo4BA0KEe23MIbnass6itFXWnlf8qSaFvgNL/9JOPr60IkMe8gQU3Vkrl6xRFOd3qE89KnW00lqx/mnVIt2o28P10zUbnxL/m1Tk3+x6VSmXHx2XnGImE59wjK8RmReHx4kOSpJ2hSPhOrys4Op4A61UhLgbwDkaGdlJT/NbuSKsSRf1b6wnsxudauSd2usRYWT5SS8nrVdaoj6vXlMJvrgyztmNWzttqh6BGxoSdz2ekB+C/QPHrIKm9tiRAHrNdZ94NYC2A5VbVoYBAM8mvVYTspByz3rSVdgLYC+B3UgTf8UP+niBAi+qQErKYAJcCdIkgRQEBYxwlO3KAAr+MRCP7JsYOP9uu10s67Qs+Sor0NbOb1gJYDgCCHAU6iOQAYG8oEn6kUiqHKcifCKUHg27S2sX/D1rXjmwqe6e/AAAAAElFTkSuQmCC";

/* ---------- Sample data (all fictional) ---------- */
const initialPlayers = [];

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

/* ---------- Oregon offer board (QB/RB/WR, 2027 + 2028) \u2014 loaded from 247Sports.
   Public data only; contact info left blank for staff. Status ELSEWHERE reflects the
   commitment 247 lists; verify before writing a kid off. ---------- */
const OFFERED_TARGETS = [
  { id: "of27-01", name: "Trae Taylor", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 300, status: "ELSEWHERE",
    school: { name: "Millard South", address: "Omaha, NE" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 203 \u00b7 247 rating 98 \u00b7 247 lists commitment: Nebraska",
    links: { s247: "https://247sports.com/Player/trae-taylor-46134912/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-02", name: "Jake Nawrot", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 301, status: "ELSEWHERE",
    school: { name: "John Hersey", address: "Arlington Heights, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 200 \u00b7 247 rating 94 \u00b7 247 lists commitment: Kentucky",
    links: { s247: "https://247sports.com/Player/jake-nawrot-46154682/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-03", name: "Peter Bourque", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 302, status: "ELSEWHERE",
    school: { name: "Tabor Academy", address: "Marion, MA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 220 \u00b7 247 rating 94 \u00b7 247 lists commitment: Virginia Tech",
    links: { s247: "https://247sports.com/Player/peter-bourque-46149965/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-04", name: "Kavian Bryant", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 303, status: "ELSEWHERE",
    school: { name: "Palestine Westwood", address: "Palestine, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 190 \u00b7 247 rating 93 \u00b7 247 lists commitment: Texas Tech",
    links: { s247: "https://247sports.com/Player/kavian-bryant-46145096/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-05", name: "Keegan Croucher", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 304, status: "ELSEWHERE",
    school: { name: "Baylor School", address: "Chattanooga, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 205 \u00b7 247 rating 91 \u00b7 247 lists commitment: Ole Miss",
    links: { s247: "https://247sports.com/Player/keegan-croucher-46149869/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-06", name: "Blake Roskopf", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 305, status: "ELSEWHERE",
    school: { name: "Desert Edge", address: "Goodyear, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 235 \u00b7 247 rating 90 \u00b7 247 lists commitment: Washington",
    links: { s247: "https://247sports.com/Player/blake-roskopf-46155022/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-07", name: "Trent Seaborn", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 306, status: "ELSEWHERE",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 200 \u00b7 247 rating 90 \u00b7 247 lists commitment: Alabama",
    links: { s247: "https://247sports.com/Player/trent-seaborn-46136488/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-08", name: "Brady Edmunds", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 307, status: "ELSEWHERE",
    school: { name: "Huntington Beach", address: "Huntington Beach, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 220 \u00b7 247 rating 90 \u00b7 247 lists commitment: Ohio State",
    links: { s247: "https://247sports.com/Player/brady-edmunds-46140325/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-09", name: "Kamden Lopati", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 308, status: "ELSEWHERE",
    school: { name: "West", address: "Salt Lake City, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 220 \u00b7 247 rating 89 \u00b7 247 lists commitment: Michigan",
    links: { s247: "https://247sports.com/Player/kamden-lopati-46148735/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-10", name: "Andre Adams", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 309, status: "ELSEWHERE",
    school: { name: "Antioch", address: "Antioch, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 180 \u00b7 247 rating 89 \u00b7 247 lists commitment: Colorado",
    links: { s247: "https://247sports.com/Player/andre-adams-46151463/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-11", name: "Weston Nielsen", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 310, status: "ELSEWHERE",
    school: { name: "Bastrop", address: "Bastrop, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 180 \u00b7 247 rating 89 \u00b7 247 lists commitment: Arizona State",
    links: { s247: "https://247sports.com/Player/weston-nielsen-46144165/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-12", name: "Wonderful Monds IV", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 311, status: "ELSEWHERE",
    school: { name: "Vero Beach", address: "Vero Beach, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 224 \u00b7 247 rating 88 \u00b7 247 lists commitment: Notre Dame",
    links: { s247: "https://247sports.com/Player/wonderful-monds-iv-46150691/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-13", name: "Jameson Purcell", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 312, status: "ELSEWHERE",
    school: { name: "Maine South", address: "Park Ridge, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 200 \u00b7 247 rating 88 \u00b7 247 lists commitment: Indiana",
    links: { s247: "https://247sports.com/Player/jameson-purcell-46143376/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-14", name: "Dane Weber", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 313, status: "ELSEWHERE",
    school: { name: "Chaparral", address: "Temecula, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 220 \u00b7 247 rating 88 \u00b7 247 lists commitment: California",
    links: { s247: "https://247sports.com/Player/dane-weber-46155270/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-15", name: "Sione Kaho", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 314, status: "ELSEWHERE",
    school: { name: "Lincoln", address: "Tacoma, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 205 \u00b7 247 rating 88 \u00b7 247 lists commitment: Stanford",
    links: { s247: "https://247sports.com/Player/sione-kaho-46143572/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-16", name: "Daniel Mielke", jersey: "\u2014", positionGroup: "QB", classYear: 2027, grade: null, order: 315, status: "OFFERED",
    school: { name: "Murrieta Valley", address: "Murrieta, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 205 \u00b7 247 rating 84",
    links: { s247: "https://247sports.com/Player/daniel-mielke-46141846/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-17", name: "Kemon Spell", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 316, status: "ELSEWHERE",
    school: { name: "McKeesport", address: "McKeesport, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 205 \u00b7 247 rating 98 \u00b7 247 lists commitment: Georgia",
    links: { s247: "https://247sports.com/Player/kemon-spell-46144644/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-18", name: "David Gabriel Georges", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 317, status: "ELSEWHERE",
    school: { name: "Baylor School", address: "Chattanooga, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 210 \u00b7 247 rating 98 \u00b7 247 lists commitment: Tennessee",
    links: { s247: "https://247sports.com/Player/david-gabriel-georges-46152057/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-19", name: "Landen Williams-Callis", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 318, status: "ELSEWHERE",
    school: { name: "Richmond Randle", address: "Richmond, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-7.5 / 190 \u00b7 247 rating 95 \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/landen-williams-callis-46138250/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-20", name: "SaRod Baker", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 319, status: "ELSEWHERE",
    school: { name: "DeSoto", address: "DeSoto, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 196 \u00b7 247 rating 94 \u00b7 247 lists commitment: Texas Tech",
    links: { s247: "https://247sports.com/Player/sarod-baker-46158129/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-21", name: "Lathan Whisenton", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 320, status: "ELSEWHERE",
    school: { name: "Waco Midway", address: "Waco, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 194 \u00b7 247 rating 90 \u00b7 247 lists commitment: Notre Dame",
    links: { s247: "https://247sports.com/Player/lathan-whisenton-46142921/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-22", name: "Andrew Beard II", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 321, status: "ELSEWHERE",
    school: { name: "Prince Avenue Christian School", address: "Bogart, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 197 \u00b7 247 rating 90 \u00b7 247 lists commitment: Florida",
    links: { s247: "https://247sports.com/Player/andrew-beard-ii-46142377/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-23", name: "Keldrid Ben", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 322, status: "ELSEWHERE",
    school: { name: "Montgomery", address: "Montgomery, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 208 \u00b7 247 rating 90 \u00b7 247 lists commitment: Oklahoma",
    links: { s247: "https://247sports.com/Player/keldrid-ben-46162816/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-24", name: "Jayden Miles", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 323, status: "ELSEWHERE",
    school: { name: "Baton Rouge Catholic", address: "Baton Rouge, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 203 \u00b7 247 rating 90 \u00b7 247 lists commitment: Florida State",
    links: { s247: "https://247sports.com/Player/jayden-miles-46149466/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-25", name: "Tyson Robinson", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 324, status: "ELSEWHERE",
    school: { name: "Brandon", address: "Brandon, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9.5 / 199 \u00b7 247 rating 90 \u00b7 247 lists commitment: Michigan",
    links: { s247: "https://247sports.com/Player/tyson-robinson-46148323/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-26", name: "Brayden Tyson", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 325, status: "ELSEWHERE",
    school: { name: "Brookwood", address: "Snellville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 235 \u00b7 247 rating 90 \u00b7 247 lists commitment: South Carolina",
    links: { s247: "https://247sports.com/Player/brayden-tyson-46141748/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-27", name: "Khamoni Williams", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 326, status: "ELSEWHERE",
    school: { name: "Southwind", address: "Memphis, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 205 \u00b7 247 rating 89 \u00b7 247 lists commitment: Auburn",
    links: { s247: "https://247sports.com/Player/khamoni-williams-46157756/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-28", name: "Amarri Irvin", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 327, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 220 \u00b7 247 rating 89 \u00b7 247 lists commitment: Virginia Tech",
    links: { s247: "https://247sports.com/Player/amarri-irvin-46142805/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-29", name: "Caden Waye", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 328, status: "OFFERED",
    school: { name: "Ola", address: "McDonough, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 185 \u00b7 247 rating 89",
    links: { s247: "https://247sports.com/Player/caden-waye-46150581/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-30", name: "Elijah Kimble", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 329, status: "ELSEWHERE",
    school: { name: "Canisius", address: "Buffalo, NY" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 180 \u00b7 247 rating 89 \u00b7 247 lists commitment: Syracuse",
    links: { s247: "https://247sports.com/Player/elijah-kimble-46144601/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-31", name: "Quinterrius Gipson", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 330, status: "ELSEWHERE",
    school: { name: "Kell", address: "Marietta, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8 / 205 \u00b7 247 rating 89 \u00b7 247 lists commitment: Georgia Tech",
    links: { s247: "https://247sports.com/Player/quinterrius-gipson-46144461/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-32", name: "Javian Jones-Priest", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 331, status: "ELSEWHERE",
    school: { name: "Arlington Martin", address: "Arlington, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 194 \u00b7 247 rating 89 \u00b7 247 lists commitment: Virginia Tech",
    links: { s247: "https://247sports.com/Player/javian-jones-priest-46159699/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-33", name: "Noah Roberts", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 332, status: "ELSEWHERE",
    school: { name: "Basha", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 200 \u00b7 247 rating 88 \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/noah-roberts-46151437/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-34", name: "Jayshon Gibson", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 333, status: "ELSEWHERE",
    school: { name: "Richland", address: "North Richland Hills, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 185 \u00b7 247 rating 88 \u00b7 247 lists commitment: UCLA",
    links: { s247: "https://247sports.com/Player/jayshon-gibson-46150802/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-35", name: "Amir Brown", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 334, status: "ELSEWHERE",
    school: { name: "Rolesville", address: "Rolesville, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 200 \u00b7 247 rating 88 \u00b7 247 lists commitment: Nebraska",
    links: { s247: "https://247sports.com/Player/amir-brown-46149072/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-36", name: "Jaxsen Stokes", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 335, status: "ELSEWHERE",
    school: { name: "Sierra Canyon", address: "Chatsworth, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 190 \u00b7 247 rating 88 \u00b7 247 lists commitment: California",
    links: { s247: "https://247sports.com/Player/jaxsen-stokes-46148611/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-37", name: "Arwin Jackson", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 336, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 170 \u00b7 247 rating 87 \u00b7 247 lists commitment: Appalachian State",
    links: { s247: "https://247sports.com/Player/arwin-jackson-46146895/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-38", name: "Lee Prince Jr.", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 337, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8 / 175 \u00b7 247 rating 87 \u00b7 247 lists commitment: West Virginia",
    links: { s247: "https://247sports.com/Player/lee-prince-jr-46151663/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-39", name: "Terrance Grant Jr.", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 338, status: "ELSEWHERE",
    school: { name: "DeMatha Catholic", address: "Hyattsville, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 200 \u00b7 247 rating 87 \u00b7 247 lists commitment: Maryland",
    links: { s247: "https://247sports.com/Player/terrance-grant-jr-46149805/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-40", name: "Benjamin Harris", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 339, status: "ELSEWHERE",
    school: { name: "Servite", address: "Anaheim, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 170 \u00b7 247 rating 87 \u00b7 247 lists commitment: Oregon State",
    links: { s247: "https://247sports.com/Player/benjamin-harris-46150163/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-41", name: "Jakoby Dixon", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 340, status: "ELSEWHERE",
    school: { name: "Brenham", address: "Brenham, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 205 \u00b7 247 rating 86 \u00b7 247 lists commitment: Oklahoma",
    links: { s247: "https://247sports.com/Player/jakoby-dixon-46144464/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-42", name: "Malachi McFarland", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 341, status: "ELSEWHERE",
    school: { name: "Damien", address: "La Verne, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 175 \u00b7 247 rating 86 \u00b7 247 lists commitment: Boise State",
    links: { s247: "https://247sports.com/Player/malachi-mcfarland-46161889/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-43", name: "Jordan Smith", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 342, status: "ELSEWHERE",
    school: { name: "Waxahachie", address: "Waxahachie, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-6.5 / 150 \u00b7 247 rating 83 \u00b7 247 lists commitment: UTSA",
    links: { s247: "https://247sports.com/Player/jordan-smith-46144806/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-44", name: "CJ Cowley", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 343, status: "OFFERED",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 180",
    links: { s247: "https://247sports.com/Player/cj-cowley-46151473/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-45", name: "Joel Bradford", jersey: "\u2014", positionGroup: "RB", classYear: 2027, grade: null, order: 344, status: "OFFERED",
    school: { name: "Collins Hill", address: "Suwanee, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 180",
    links: { s247: "https://247sports.com/Player/joel-bradford-46149572/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-46", name: "Monshun Sales", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 345, status: "ELSEWHERE",
    school: { name: "Lawrence North", address: "Indianapolis, IN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 195 \u00b7 247 rating 98 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Indiana",
    links: { s247: "https://247sports.com/Player/monshun-sales-46147925/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-47", name: "Easton Royal", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 346, status: "ELSEWHERE",
    school: { name: "Brother Martin", address: "New Orleans, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 214 \u00b7 247 rating 98 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/easton-royal-46154901/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-48", name: "Nick Lennear", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 347, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 165 \u00b7 247 rating 98 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Miami",
    links: { s247: "https://247sports.com/Player/nick-lennear-46147407/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-49", name: "Jamier Brown", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 348, status: "ELSEWHERE",
    school: { name: "Wayne", address: "Huber Heights, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 192 \u00b7 247 rating 98 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Ohio State",
    links: { s247: "https://247sports.com/Player/jamier-brown-46144180/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-50", name: "Quentin Hale", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 349, status: "ELSEWHERE",
    school: { name: "Corona Centennial", address: "Corona, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 192 \u00b7 247 rating 94 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: USC",
    links: { s247: "https://247sports.com/Player/quentin-hale-46152565/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-51", name: "Eric McFarland III", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 350, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8 / 177 \u00b7 247 rating 94 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Texas A&M",
    links: { s247: "https://247sports.com/Player/eric-mcfarland-iii-46148083/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-52", name: "Kesean Bowman", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 351, status: "ELSEWHERE",
    school: { name: "Brentwood Academy", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 176 \u00b7 247 rating 93 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Tennessee",
    links: { s247: "https://247sports.com/Player/kesean-bowman-46147214/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-53", name: "Roye Oliver III", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 352, status: "ELSEWHERE",
    school: { name: "Hamilton", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 165 \u00b7 247 rating 93 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: USC",
    links: { s247: "https://247sports.com/Player/roye-oliver-iii-46154068/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-54", name: "Charles Davis", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 353, status: "ELSEWHERE",
    school: { name: "Westlake", address: "Westlake Village, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 205 \u00b7 247 rating 93 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: California",
    links: { s247: "https://247sports.com/Player/charles-davis-46154972/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-55", name: "Julius Jones", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 354, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 175 \u00b7 247 rating 92 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Notre Dame",
    links: { s247: "https://247sports.com/Player/julius-jones-46148129/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-56", name: "Khalil Taylor", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 355, status: "ELSEWHERE",
    school: { name: "Pine-Richland", address: "Gibsonia, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 190 \u00b7 247 rating 92 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Nebraska",
    links: { s247: "https://247sports.com/Player/khalil-taylor-46144955/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-57", name: "Briceson Thrower Jr.", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 356, status: "ELSEWHERE",
    school: { name: "North Forney", address: "Forney, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 91 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/briceson-thrower-jr-46155048/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-58", name: "Eli Woodard", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 357, status: "ELSEWHERE",
    school: { name: "Chaparral", address: "Temecula, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 190 \u00b7 247 rating 91 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Miami",
    links: { s247: "https://247sports.com/Player/eli-woodard-46154551/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-59", name: "Tre Moore", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 358, status: "ELSEWHERE",
    school: { name: "Pflugerville Weiss", address: "Pflugerville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 200 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Washington",
    links: { s247: "https://247sports.com/Player/tre-moore-46143523/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-60", name: "Quentin Burrell", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 359, status: "ELSEWHERE",
    school: { name: "Mount Carmel", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 200 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Michigan",
    links: { s247: "https://247sports.com/Player/quentin-burrell-46139675/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-61", name: "Trenton Yancey", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 360, status: "ELSEWHERE",
    school: { name: "Duncanville", address: "Duncanville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 190 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Purdue",
    links: { s247: "https://247sports.com/Player/trenton-yancey-46142228/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-62", name: "Blake Wong", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 361, status: "ELSEWHERE",
    school: { name: "Norco", address: "Norco, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: BYU",
    links: { s247: "https://247sports.com/Player/blake-wong-46142252/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-63", name: "Zion White", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 362, status: "ELSEWHERE",
    school: { name: "Mililani", address: "Mililani, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 199 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: California",
    links: { s247: "https://247sports.com/Player/zion-white-46145647/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-64", name: "Julian Caldwell", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 363, status: "ELSEWHERE",
    school: { name: "Argyle", address: "Argyle, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Texas Tech",
    links: { s247: "https://247sports.com/Player/julian-caldwell-46151294/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-65", name: "Lawrence Britt", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 364, status: "ELSEWHERE",
    school: { name: "Lausanne Collegiate School", address: "Memphis, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 178 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Missouri",
    links: { s247: "https://247sports.com/Player/lawrence-britt-46154473/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-66", name: "Dontay Tyson", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 365, status: "ELSEWHERE",
    school: { name: "Peoria", address: "Peoria, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Washington",
    links: { s247: "https://247sports.com/Player/dontay-tyson-46151181/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-67", name: "Ty Johnson", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 366, status: "ELSEWHERE",
    school: { name: "Crean Lutheran", address: "Irvine, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 205 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Arizona",
    links: { s247: "https://247sports.com/Player/ty-johnson-46151796/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-68", name: "Damani Warren", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 367, status: "ELSEWHERE",
    school: { name: "Arbor View", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 210 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Texas A&M",
    links: { s247: "https://247sports.com/Player/damani-warren-46147365/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-69", name: "Braylon Pope", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 368, status: "ELSEWHERE",
    school: { name: "Sumner", address: "Sumner, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 195 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Washington",
    links: { s247: "https://247sports.com/Player/braylon-pope-46143545/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-70", name: "Tycen Johnson", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 369, status: "ELSEWHERE",
    school: { name: "Chaparral", address: "Temecula, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 185 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Arizona State",
    links: { s247: "https://247sports.com/Player/tycen-johnson-46150049/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-71", name: "Antayvious Ellis", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 370, status: "ELSEWHERE",
    school: { name: "Millard South", address: "Omaha, NE" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 175 \u00b7 247 rating 87 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Nebraska",
    links: { s247: "https://247sports.com/Player/antayvious-ellis-46142374/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-72", name: "Braylon Kasper", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 371, status: "OFFERED",
    school: { name: "American Leadership Academy", address: "Queen Creek, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 175 \u00b7 247 rating 87 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/braylon-kasper-46150820/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-73", name: "Jackson Coleman", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 372, status: "ELSEWHERE",
    school: { name: "Valor Christian", address: "Littleton, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 87 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Notre Dame",
    links: { s247: "https://247sports.com/Player/jackson-coleman-46156590/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-74", name: "Delontay Williams", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2027, grade: null, order: 373, status: "ELSEWHERE",
    school: { name: "San Diego", address: "San Diego, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 86 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: UNLV",
    links: { s247: "https://247sports.com/Player/delontay-williams-46142572/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-75", name: "Keyon Standifer", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 374, status: "OFFERED",
    school: { name: "Newton", address: "Covington, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 170 \u00b7 247 rating 85 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/keyon-standifer-46154346/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-76", name: "Derrick Martin", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2027, grade: null, order: 375, status: "ELSEWHERE",
    school: { name: "Lewisville", address: "Lewisville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 170 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Missouri State",
    links: { s247: "https://247sports.com/Player/derrick-martin-46153280/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-01", name: "Jayden Wade", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 376, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 190 \u00b7 247 rating 96 \u00b7 247 lists commitment: Georgia",
    links: { s247: "https://247sports.com/Player/jayden-wade-46131982/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-02", name: "Christopher Vargas", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 377, status: "ELSEWHERE",
    school: { name: "St. John's Prep", address: "Danvers, MA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 195 \u00b7 247 rating 96 \u00b7 247 lists commitment: Ohio State",
    links: { s247: "https://247sports.com/Player/christopher-vargas-46151637/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-03", name: "Donald Tabron II", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 378, status: "OFFERED",
    school: { name: "Cass Technical", address: "Detroit, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 188 \u00b7 247 rating 91",
    links: { s247: "https://247sports.com/Player/donald-tabron-ii-46148791/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-04", name: "Carter Zingelmann", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 379, status: "OFFERED",
    school: { name: "Coppell", address: "Coppell, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 227 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/carter-zingelmann-46154967/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-05", name: "Neimann Lawrence", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 380, status: "ELSEWHERE",
    school: { name: "American Heritage", address: "Plantation, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 202 \u00b7 247 rating 90 \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/neimann-lawrence-46142481/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-06", name: "Lukas Prock", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 381, status: "ELSEWHERE",
    school: { name: "Hun School", address: "Princeton, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 90 \u00b7 247 lists commitment: Indiana",
    links: { s247: "https://247sports.com/Player/lukas-prock-46158421/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-07", name: "Kaden Craft", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 382, status: "OFFERED",
    school: { name: "Lake Norman", address: "Mooresville, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 205 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/kaden-craft-46159205/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-08", name: "Josiah Boyd", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 383, status: "OFFERED",
    school: { name: "Vista del Lago", address: "Moreno Valley, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 165 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/josiah-boyd-46153403/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-09", name: "Titus Huard", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 384, status: "OFFERED",
    school: { name: "Valor Christian", address: "Littleton, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 205 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/titus-huard-46152644/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-10", name: "Hunter Fujikawa", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 385, status: "OFFERED",
    school: { name: "Mililani", address: "Mililani, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 200 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/hunter-fujikawa-46151384/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-11", name: "Graham Simpson", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 386, status: "OFFERED",
    school: { name: "Westview", address: "Martin, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 182 \u00b7 247 rating 89",
    links: { s247: "https://247sports.com/Player/graham-simpson-46150528/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-12", name: "Luke Rubley", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 387, status: "OFFERED",
    school: { name: "Regis Jesuit", address: "Aurora, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 180 \u00b7 247 rating 89",
    links: { s247: "https://247sports.com/Player/luke-rubley-46150861/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-13", name: "Trey Wright", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 388, status: "OFFERED",
    school: { name: "Frisco Lone Star", address: "Frisco, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9.5 / 175 \u00b7 247 rating 88",
    links: { s247: "https://247sports.com/Player/trey-wright-46156668/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-14", name: "Jamar Howard", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 389, status: "OFFERED",
    school: { name: "Clovis West", address: "Fresno, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 205 \u00b7 247 rating 88",
    links: { s247: "https://247sports.com/Player/jamar-howard-46150516/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-15", name: "AJ Tuivaiave", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 390, status: "OFFERED",
    school: { name: "Graham-Kapowsin", address: "Graham, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 240 \u00b7 247 rating 87",
    links: { s247: "https://247sports.com/Player/aj-tuivaiave-46149516/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-16", name: "Koa Malau'ulu", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 391, status: "OFFERED",
    school: { name: "St. John Bosco", address: "Bellflower, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 180 \u00b7 247 rating 86",
    links: { s247: "https://247sports.com/Player/koa-malauulu-46152746/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-17", name: "Ayden Edwards", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 392, status: "OFFERED",
    school: { name: "Tustin", address: "Tustin, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 195 \u00b7 247 rating 86",
    links: { s247: "https://247sports.com/Player/ayden-edwards-46151042/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-18", name: "Grayson Clary", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 393, status: "OFFERED",
    school: { name: "Rabun Gap-Nacoochee", address: "Rabun Gap, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 215 \u00b7 247 rating 85",
    links: { s247: "https://247sports.com/Player/grayson-clary-46144062/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-19", name: "Ace Amina", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 394, status: "OFFERED",
    school: { name: "Bishop Gorman", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 180 \u00b7 247 rating 85",
    links: { s247: "https://247sports.com/Player/ace-amina-46150781/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-20", name: "Dylan D'Epifanio", jersey: "\u2014", positionGroup: "QB", classYear: 2028, grade: null, order: 395, status: "OFFERED",
    school: { name: "Bishop Amat", address: "La Puente, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 180",
    links: { s247: "https://247sports.com/Player/dylan-depifanio-46160659/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-21", name: "Jayshawn Mitchell", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 396, status: "OFFERED",
    school: { name: "San Antonio Brennan", address: "San Antonio, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 180 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/jayshawn-mitchell-46166449/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-22", name: "Micah Rhodes", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 397, status: "OFFERED",
    school: { name: "Klein Oak", address: "Spring, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9.5 / 180 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/micah-rhodes-46147811/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-23", name: "Zion Coger", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 398, status: "OFFERED",
    school: { name: "Jasper", address: "Jasper, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 190 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/zion-coger-46165184/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-24", name: "Elijah Cromwell", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 399, status: "OFFERED",
    school: { name: "Cherry Creek", address: "Englewood, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 180 \u00b7 247 rating 90",
    links: { s247: "https://247sports.com/Player/elijah-cromwell-46153247/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-25", name: "Carter Hanson", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 400, status: "OFFERED",
    school: { name: "Liberty", address: "Bakersfield, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9 / 160 \u00b7 247 rating 89",
    links: { s247: "https://247sports.com/Player/carter-hanson-46164944/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-26", name: "James Curoso", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 401, status: "OFFERED",
    school: { name: "Cardinal Newman", address: "Santa Rosa, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 199 \u00b7 247 rating 89",
    links: { s247: "https://247sports.com/Player/james-curoso-46159533/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-27", name: "Zachary Belyeu", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 402, status: "OFFERED",
    school: { name: "North Cobb", address: "Kennesaw, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 210 \u00b7 247 rating 88",
    links: { s247: "https://247sports.com/Player/zachary-belyeu-46153083/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-28", name: "CJ Davis III", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 403, status: "OFFERED",
    school: { name: "Spain Park", address: "Hoover, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 210 \u00b7 247 rating 87",
    links: { s247: "https://247sports.com/Player/cj-davis-iii-46149913/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-29", name: "Malaki Davis", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 404, status: "OFFERED",
    school: { name: "Corona Centennial", address: "Corona, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 215 \u00b7 247 rating 87",
    links: { s247: "https://247sports.com/Player/malaki-davis-46155391/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-30", name: "Jacez Walton", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 405, status: "OFFERED",
    school: { name: "Central", address: "Carrollton, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 220 \u00b7 247 rating 87",
    links: { s247: "https://247sports.com/Player/jacez-walton-46158224/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-31", name: "Khristian White", jersey: "\u2014", positionGroup: "RB", classYear: 2028, grade: null, order: 406, status: "OFFERED",
    school: { name: "Cy Ranch", address: "Cypress, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 191 \u00b7 247 rating 86",
    links: { s247: "https://247sports.com/Player/khristian-white-46163747/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-32", name: "Brysen Wright", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 407, status: "OFFERED",
    school: { name: "Mandarin", address: "Jacksonville, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 215 \u00b7 247 rating 96 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/brysen-wright-46151659/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-33", name: "Jaylen Addai", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 408, status: "OFFERED",
    school: { name: "Shadow Creek", address: "Pearland, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 165 \u00b7 247 rating 95 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/jaylen-addai-46152961/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-34", name: "Jett Harrison", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 409, status: "ELSEWHERE",
    school: { name: "St. Joseph's Prep", address: "Philadelphia, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 175 \u00b7 247 rating 92 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust) \u00b7 247 lists commitment: Ohio State",
    links: { s247: "https://247sports.com/Player/jett-harrison-46152620/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-35", name: "Braylon Clark", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 410, status: "OFFERED",
    school: { name: "Providence Day School", address: "Charlotte, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 188 \u00b7 247 rating 91 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/braylon-clark-46151079/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-36", name: "Deandre Bidden", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 411, status: "OFFERED",
    school: { name: "Harper Woods", address: "Harper Woods, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 91 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/deandre-bidden-46149889/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-37", name: "Lorenzo McMullen Jr.", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 412, status: "OFFERED",
    school: { name: "Princeton", address: "Cincinnati, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 91 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/lorenzo-mcmullen-jr-46154855/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-38", name: "Tyree Mannings Jr.", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 413, status: "OFFERED",
    school: { name: "Venice", address: "Venice, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 170 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/tyree-mannings-jr-46155615/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-39", name: "Jaelyn Easterling-Flores", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 414, status: "OFFERED",
    school: { name: "Desert Edge", address: "Goodyear, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 180 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/jaelyn-easterling-flores-46151182/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-40", name: "Dennis Tua'one", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 415, status: "OFFERED",
    school: { name: "Timpview", address: "Provo, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 185 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/dennis-tuaone-46145431/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-41", name: "Zyren Menor", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 416, status: "OFFERED",
    school: { name: "Bishop Gorman", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 180 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/zyren-menor-46157478/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-42", name: "Derrell Hines Jr.", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 417, status: "OFFERED",
    school: { name: "Carrollwood Day", address: "Tampa, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/derrell-hines-jr-46158469/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-43", name: "Tromon Isaac Jr.", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 418, status: "OFFERED",
    school: { name: "Chaminade-Madonna", address: "Hollywood, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 170 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/tromon-isaac-jr-46150874/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-44", name: "Hayden Koo", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 419, status: "OFFERED",
    school: { name: "Tustin", address: "Tustin, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/hayden-koo-46160228/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-45", name: "Samir Edwards", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 420, status: "OFFERED",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 205 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/samir-edwards-46160848/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-46", name: "Emmanuel Pullins", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 421, status: "OFFERED",
    school: { name: "Notre Dame", address: "Sherman Oaks, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/emmanuel-pullins-46164429/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-47", name: "Carter St. Junious", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 422, status: "OFFERED",
    school: { name: "Manvel", address: "Manvel, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/carter-st-junious-46160123/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-48", name: "Ryan Richmond-McDavis", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 423, status: "OFFERED",
    school: { name: "Cardinal Ritter College Prep", address: "St. Louis, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 160 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/ryan-richmond-mcdavis-46158604/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-49", name: "Dedrick Kimbrough", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 424, status: "OFFERED",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 180 \u00b7 247 rating 90 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/dedrick-kimbrough-46154808/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-50", name: "Marshaun Thornton", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 425, status: "OFFERED",
    school: { name: "Mount Carmel", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 180 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/marshaun-thornton-46154498/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-51", name: "Dillon Mitchell", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 426, status: "OFFERED",
    school: { name: "C.E. King", address: "Houston, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8 / 155 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/dillon-mitchell-46156965/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-52", name: "CJ Davis", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 427, status: "OFFERED",
    school: { name: "McDonogh School", address: "Owings Mills, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 170 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/cj-davis-46158203/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-53", name: "Tylan Henderson", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 428, status: "OFFERED",
    school: { name: "Pflugerville Weiss", address: "Pflugerville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 210 \u00b7 247 rating 89 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/tylan-henderson-46151699/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-54", name: "Grant Mosley", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 429, status: "OFFERED",
    school: { name: "Santa Margarita Catholic", address: "Rancho Santa Margarita, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 180 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/grant-mosley-46156765/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-55", name: "Colton Fitzgibbon", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 430, status: "OFFERED",
    school: { name: "San Ramon Valley", address: "Danville, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 170 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/colton-fitzgibbon-46162508/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-56", name: "Owen Johnson", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 431, status: "OFFERED",
    school: { name: "La Salle College", address: "Wyndmoor, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 180 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/owen-johnson-46163353/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-57", name: "Pierce Washington", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 432, status: "OFFERED",
    school: { name: "Bartlett", address: "Bartlett, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 210 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/pierce-washington-46164496/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-58", name: "Noah Bozeman", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 433, status: "OFFERED",
    school: { name: "John Muir", address: "Pasadena, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 195 \u00b7 247 rating 88 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/noah-bozeman-46165584/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-59", name: "DJ Tubbs", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 434, status: "OFFERED",
    school: { name: "St. John Bosco", address: "Bellflower, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 175 \u00b7 247 rating 87 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/dj-tubbs-46150780/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-60", name: "Steeler Wesley", jersey: "\u2014", positionGroup: "WR_OUT", classYear: 2028, grade: null, order: 435, status: "OFFERED",
    school: { name: "Skyridge", address: "Lehi, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 210 \u00b7 247 rating 87 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/steeler-wesley-46153151/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-61", name: "Tony Brown III", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 436, status: "OFFERED",
    school: { name: "Miami Columbus", address: "Miami, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8 / 150 \u00b7 247 rating 86 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/tony-brown-iii-46150319/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-62", name: "Antron Branch", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 437, status: "OFFERED",
    school: { name: "McArthur", address: "Hollywood, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 165 \u00b7 247 rating 86 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/antron-branch-46161361/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-63", name: "Barrett Price", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 438, status: "OFFERED",
    school: { name: "Spain Park", address: "Hoover, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 175 \u00b7 247 rating 86 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/barrett-price-46164425/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of28-64", name: "Kruz Marion", jersey: "\u2014", positionGroup: "WR_SLOT", classYear: 2028, grade: null, order: 439, status: "OFFERED",
    school: { name: "Stephenson", address: "Stone Mountain, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 165 \u00b7 Listed: WR (outside/slot is our placement \u2014 drag to adjust)",
    links: { s247: "https://247sports.com/Player/kruz-marion-46164615/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },

  { id: "of27-77", name: "Ahmad Hudson", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 500, status: "ELSEWHERE",
    school: { name: "Ruston", address: "Ruston, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6.5 / 239 \u00b7 247 rating 98 \u00b7 247 lists commitment: LSU",
    links: { s247: "https://247sports.com/Player/ahmad-hudson-46143677/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-78", name: "Jaxon Dollar", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 501, status: "ELSEWHERE",
    school: { name: "East Lincoln", address: "Denver, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 222 \u00b7 247 rating 98 \u00b7 247 lists commitment: Georgia",
    links: { s247: "https://247sports.com/Player/jaxon-dollar-46156822/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-79", name: "Brock Williams", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 502, status: "ELSEWHERE",
    school: { name: "Libertyville", address: "Libertyville, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 215 \u00b7 247 rating 93 \u00b7 247 lists commitment: Texas",
    links: { s247: "https://247sports.com/Player/brock-williams-46153758/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-80", name: "Jack Brown", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 503, status: "ELSEWHERE",
    school: { name: "Francis Howell Central", address: "St. Charles, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 215 \u00b7 247 rating 92 \u00b7 247 lists commitment: Missouri",
    links: { s247: "https://247sports.com/Player/jack-brown-46149605/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-81", name: "Reilly Newman", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 504, status: "ELSEWHERE",
    school: { name: "Lakota West", address: "West Chester, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 285 \u00b7 247 rating 90 \u00b7 247 lists commitment: Iowa",
    links: { s247: "https://247sports.com/Player/reilly-newman-46154860/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-82", name: "Malik Howard", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 505, status: "ELSEWHERE",
    school: { name: "Oak Ridge", address: "Oak Ridge, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 231 \u00b7 247 rating 90 \u00b7 247 lists commitment: Tennessee",
    links: { s247: "https://247sports.com/Player/malik-howard-46149990/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-83", name: "Rahzario Edwards", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 506, status: "ELSEWHERE",
    school: { name: "Grant Union", address: "Sacramento, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 210 \u00b7 247 rating 90 \u00b7 247 lists commitment: California",
    links: { s247: "https://247sports.com/Player/rahzario-edwards-46150364/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-84", name: "Colton Johnson", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 507, status: "ELSEWHERE",
    school: { name: "Upperman", address: "Baxter, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 235 \u00b7 247 rating 88 \u00b7 247 lists commitment: Ole Miss",
    links: { s247: "https://247sports.com/Player/colton-johnson-46162224/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-85", name: "Christian Hanshaw", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 508, status: "ELSEWHERE",
    school: { name: "American Fork", address: "American Fork, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 230 \u00b7 247 rating 88 \u00b7 247 lists commitment: Michigan",
    links: { s247: "https://247sports.com/Player/christian-hanshaw-46159244/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-86", name: "Zac Fares", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 509, status: "ELSEWHERE",
    school: { name: "Arbor View", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 220 \u00b7 247 rating 88 \u00b7 247 lists commitment: UCLA",
    links: { s247: "https://247sports.com/Player/zac-fares-46149288/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },
  { id: "of27-87", name: "Judah Lancaster", jersey: "\u2014", positionGroup: "TE", classYear: 2027, grade: null, order: 510, status: "ELSEWHERE",
    school: { name: "Brentwood Academy", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 231 \u00b7 247 rating 86 \u00b7 247 lists commitment: South Carolina",
    links: { s247: "https://247sports.com/Player/judah-lancaster-46145705/" },
    updatedBy: "247 import", updatedAt: "Aug 13, 2026" },

  { id: "of27-88", name: "Maxwell Hiller", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 600, status: "ELSEWHERE",
    school: { name: "Coatesville", address: "Coatesville, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 300 \u00b7 247 rating 98 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Florida",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-89", name: "Mark Matthews", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 601, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 300 \u00b7 247 rating 98 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-90", name: "Ismael Camara", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 602, status: "ELSEWHERE",
    school: { name: "Gilmer", address: "Gilmer, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 340 \u00b7 247 rating 98 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-91", name: "Oluwasemilore Olubobola", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 603, status: "ELSEWHERE",
    school: { name: "St. Peter's Prep", address: "Jersey City, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 295 \u00b7 247 rating 98 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-92", name: "Terrance Smith", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 604, status: "ELSEWHERE",
    school: { name: "Lansdale Catholic", address: "Lansdale, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7 / 290 \u00b7 247 rating 95 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: LSU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-93", name: "Caden Moss", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 605, status: "ELSEWHERE",
    school: { name: "Jackson Academy", address: "Jackson, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 320 \u00b7 247 rating 94 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-94", name: "Kennedy Brown", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 606, status: "ELSEWHERE",
    school: { name: "Kingwood", address: "Kingwood, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 285 \u00b7 247 rating 94 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-95", name: "Drew Fielder", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 607, status: "ELSEWHERE",
    school: { name: "Servite", address: "Anaheim, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 280 \u00b7 247 rating 93 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-96", name: "Jake Hildebrand", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 608, status: "ELSEWHERE",
    school: { name: "Basha", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 311 \u00b7 247 rating 93 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Arizona State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-97", name: "Brian Swanson", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 609, status: "ELSEWHERE",
    school: { name: "South Oak Cliff", address: "Dallas, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 315 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-98", name: "Nate Carson", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 610, status: "ELSEWHERE",
    school: { name: "Irmo", address: "Columbia, SC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 290 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: South Carolina",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-99", name: "Jimmy Kalis", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 611, status: "ELSEWHERE",
    school: { name: "Central Catholic", address: "Pittsburgh, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7.5 / 290 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-100", name: "Li'Marcus Jones", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 612, status: "ELSEWHERE",
    school: { name: "Brentwood Academy", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 285 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Colorado",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-101", name: "Antonio Keefer", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 613, status: "ELSEWHERE",
    school: { name: "Southwind", address: "Memphis, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 295 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-102", name: "Isaiah Bertola", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 614, status: "ELSEWHERE",
    school: { name: "Farrington", address: "Honolulu, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 305 \u00b7 247 rating 89 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: California",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-103", name: "Gecova Doyal", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 615, status: "ELSEWHERE",
    school: { name: "Puyallup", address: "Puyallup, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 285 \u00b7 247 rating 89 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-104", name: "Lucas Rhoa", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 616, status: "ELSEWHERE",
    school: { name: "Orange Lutheran", address: "Orange, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 305 \u00b7 247 rating 88 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-105", name: "Soren Fifer", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 617, status: "ELSEWHERE",
    school: { name: "Morton", address: "Morton, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7 / 295 \u00b7 247 rating 88 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Illinois",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-106", name: "Tyson Ross", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2027, grade: null, order: 618, status: "ELSEWHERE",
    school: { name: "Andover", address: "Andover, KS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 285 \u00b7 247 rating 87 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-107", name: "Albert Simien", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 619, status: "ELSEWHERE",
    school: { name: "Sam Houston", address: "Lake Charles, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 280 \u00b7 247 rating 94 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-108", name: "Jatori Williams", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 620, status: "ELSEWHERE",
    school: { name: "Central Phenix City", address: "Phenix City, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 320 \u00b7 247 rating 93 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-109", name: "Kyler Kuhn", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 621, status: "ELSEWHERE",
    school: { name: "St. Pius X", address: "Kansas City, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 280 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Missouri",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-110", name: "Jackson Roper", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 622, status: "ELSEWHERE",
    school: { name: "Cherry Creek", address: "Englewood, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 305 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-111", name: "Reed Ramsier", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 623, status: "ELSEWHERE",
    school: { name: "The First Academy", address: "Orlando, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 290 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Auburn",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-112", name: "Antwan Jackson", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 624, status: "ELSEWHERE",
    school: { name: "White Station", address: "Memphis, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 230 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-113", name: "Ian Walker", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 625, status: "ELSEWHERE",
    school: { name: "The Pennington School", address: "Pennington, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 305 \u00b7 247 rating 89 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Kentucky",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-114", name: "Caleb Unger", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 626, status: "OFFERED",
    school: { name: "Madison-Ridgeland Academy", address: "Madison, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 300 \u00b7 247 rating 89 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-115", name: "Ian Aloisio", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 627, status: "ELSEWHERE",
    school: { name: "Timpview", address: "Provo, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 280 \u00b7 247 rating 88 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Utah",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-116", name: "Reis Russell", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 628, status: "ELSEWHERE",
    school: { name: "Valor Christian", address: "Littleton, CO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 290 \u00b7 247 rating 87 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-117", name: "Jayden Dean", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 629, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 277 \u00b7 247 rating 85 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: FIU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-118", name: "Brayden Washington", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2027, grade: null, order: 630, status: "ELSEWHERE",
    school: { name: "Collierville", address: "Collierville, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 310 \u00b7 247 rating 84 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Charlotte",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-119", name: "DJ Jacobs", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 631, status: "ELSEWHERE",
    school: { name: "Blessed Trinity Catholic", address: "Roswell, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 98 \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-120", name: "KJ Green", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 632, status: "ELSEWHERE",
    school: { name: "Stephenson", address: "Stone Mountain, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 230 \u00b7 247 rating 98 \u00b7 247 lists commitment: LSU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-121", name: "Anthony Sweeney", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 633, status: "ELSEWHERE",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 230 \u00b7 247 rating 98 \u00b7 247 lists commitment: Texas Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-122", name: "Abraham Sesay", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 634, status: "ELSEWHERE",
    school: { name: "Downingtown East", address: "Exton, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 215 \u00b7 247 rating 98 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-123", name: "Zyron Forstall", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 635, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 225 \u00b7 247 rating 98 \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-124", name: "Aidan O'Neil", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 636, status: "ELSEWHERE",
    school: { name: "Don Bosco Prep", address: "Ramsey, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 93 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-125", name: "Jabarrius Garror", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 637, status: "ELSEWHERE",
    school: { name: "Vigor", address: "Mobile, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 215 \u00b7 247 rating 92 \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-126", name: "Jackson Vaughn", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 638, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 225 \u00b7 247 rating 92 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-127", name: "Prince Goldsby", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 639, status: "ELSEWHERE",
    school: { name: "Blue Springs South", address: "Blue Springs, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 205 \u00b7 247 rating 92 \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-128", name: "James Pace III", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 640, status: "ELSEWHERE",
    school: { name: "DeMatha Catholic", address: "Hyattsville, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 225 \u00b7 247 rating 91 \u00b7 247 lists commitment: Auburn",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-129", name: "Troy Bowens", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 641, status: "ELSEWHERE",
    school: { name: "Sutter", address: "Sutter, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 250 \u00b7 247 rating 90 \u00b7 247 lists commitment: California",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-130", name: "Joseph Buchanan", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 642, status: "ELSEWHERE",
    school: { name: "McDonogh School", address: "Owings Mills, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 260 \u00b7 247 rating 90 \u00b7 247 lists commitment: Virginia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-131", name: "Manase Brown", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 643, status: "ELSEWHERE",
    school: { name: "Corner Canyon", address: "Draper, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 265 \u00b7 247 rating 89 \u00b7 247 lists commitment: Fresno State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-132", name: "Jaylen Mercer", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 644, status: "ELSEWHERE",
    school: { name: "Princeton", address: "Cincinnati, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 230 \u00b7 247 rating 88 \u00b7 247 lists commitment: Kentucky",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-133", name: "Jayce Brewer", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 645, status: "ELSEWHERE",
    school: { name: "Franklin Central", address: "Indianapolis, IN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 88 \u00b7 247 lists commitment: Michigan",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-134", name: "Meshi Dobson", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 646, status: "ELSEWHERE",
    school: { name: "Cypress Bay", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 235 \u00b7 247 rating 88 \u00b7 247 lists commitment: Florida State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-135", name: "Ty Tautolo", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 647, status: "OFFERED",
    school: { name: "Lake Stevens", address: "Lake Stevens, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 87",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-136", name: "Kasi Currie", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 648, status: "ELSEWHERE",
    school: { name: "Sierra Canyon", address: "Chatsworth, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 315 \u00b7 247 rating 95 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-137", name: "Marcus Fakatou", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 649, status: "ELSEWHERE",
    school: { name: "Sierra Canyon", address: "Chatsworth, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 275 \u00b7 247 rating 94 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-138", name: "David Folorunsho", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 650, status: "ELSEWHERE",
    school: { name: "St. Patrick", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 280 \u00b7 247 rating 94 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-139", name: "Myels Smith", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 651, status: "ELSEWHERE",
    school: { name: "Inglewood", address: "Inglewood, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 295 \u00b7 247 rating 94 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-140", name: "Karlos May", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 652, status: "ELSEWHERE",
    school: { name: "Ramsay", address: "Birmingham, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 305 \u00b7 247 rating 92 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-141", name: "Alifeleti Tuihalamaka", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 653, status: "ELSEWHERE",
    school: { name: "Oaks Christian", address: "Westlake Village, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 260 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-142", name: "Sam LeJeune", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 654, status: "ELSEWHERE",
    school: { name: "Poplarville", address: "Poplarville, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 280 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Florida State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-143", name: "Brayden Parks", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 655, status: "ELSEWHERE",
    school: { name: "Brother Rice", address: "Oak Lawn, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 305 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-144", name: "Jon Ioane", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 656, status: "ELSEWHERE",
    school: { name: "Tustin", address: "Tustin, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 295 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-145", name: "Santana Harvey", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 657, status: "ELSEWHERE",
    school: { name: "Lakeland", address: "Lakeland, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 230 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Clemson",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-146", name: "George Toia", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 658, status: "ELSEWHERE",
    school: { name: "Byron Nelson", address: "Trophy Club, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 325 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-147", name: "Tevita Nonu", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 659, status: "ELSEWHERE",
    school: { name: "O'Dea", address: "Seattle, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 270 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-148", name: "Elija Harmon", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 660, status: "ELSEWHERE",
    school: { name: "Inglewood", address: "Inglewood, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 280 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-149", name: "Jamarkus Pittman", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 661, status: "ELSEWHERE",
    school: { name: "Memphis Academy of Science and Engineering", address: "Memphis, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 320 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-150", name: "Justin Weeks", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 662, status: "ELSEWHERE",
    school: { name: "Douglas County", address: "Douglasville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 89 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Georgia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-151", name: "Jamar Thompson", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 663, status: "ELSEWHERE",
    school: { name: "West Boca Raton", address: "Boca Raton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 305 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Georgia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-152", name: "Montana Toilolo", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 664, status: "ELSEWHERE",
    school: { name: "Mater Dei", address: "Santa Ana, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 260 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-153", name: "Kalib Spivey", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 665, status: "ELSEWHERE",
    school: { name: "Benjamin Russell", address: "Alexander City, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 230 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Georgia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-154", name: "Sione Felila", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 666, status: "ELSEWHERE",
    school: { name: "Oak Hills", address: "Hesperia, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 285 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-155", name: "Owen Reilly", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 667, status: "ELSEWHERE",
    school: { name: "Bel Air", address: "Bel Air, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 290 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Penn State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-156", name: "Yahzeen Zion", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 668, status: "ELSEWHERE",
    school: { name: "Desert Edge", address: "Goodyear, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 270 \u00b7 247 rating 87 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Wisconsin",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-157", name: "Maa'imoa Havili", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 669, status: "ELSEWHERE",
    school: { name: "Granger", address: "Salt Lake City, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 290 \u00b7 247 rating 87 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: BYU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-158", name: "Khyren Haywood", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 670, status: "ELSEWHERE",
    school: { name: "Denton Guyer", address: "Denton, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 260 \u00b7 247 rating 86 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-159", name: "Isaia Vandermade", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 671, status: "ELSEWHERE",
    school: { name: "Santa Margarita Catholic", address: "Rancho Santa Margarita, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 290 \u00b7 247 rating 86 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-160", name: "Krystian Walcott", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 672, status: "ELSEWHERE",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 250 \u00b7 247 rating 85 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Boston College",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-161", name: "Aroson Randle Jr.", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 673, status: "ELSEWHERE",
    school: { name: "Garner", address: "Garner, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 210 \u00b7 247 rating 94 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-162", name: "Kaden Henderson", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 674, status: "ELSEWHERE",
    school: { name: "Tampa Jesuit", address: "Tampa, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 218 \u00b7 247 rating 94 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-163", name: "Roman Igwebuike", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 675, status: "ELSEWHERE",
    school: { name: "Mount Carmel", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 220 \u00b7 247 rating 91 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-164", name: "Quinton Cypher", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 676, status: "ELSEWHERE",
    school: { name: "Millbrook", address: "Raleigh, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-165", name: "Noah Glover", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 677, status: "ELSEWHERE",
    school: { name: "Battlefield", address: "Haymarket, VA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 205 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-166", name: "Mikahi Allen", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 678, status: "ELSEWHERE",
    school: { name: "Don Bosco Prep", address: "Ramsey, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 235 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-167", name: "Kobe Rhymes", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 679, status: "ELSEWHERE",
    school: { name: "North Kansas City", address: "Kansas City, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Missouri",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-168", name: "Antwoine Higgins", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 680, status: "ELSEWHERE",
    school: { name: "Anderson", address: "Cincinnati, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 223 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Kentucky",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-169", name: "Jalaythan Mayfield", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 681, status: "ELSEWHERE",
    school: { name: "Lincolnton", address: "Lincolnton, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 230 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Indiana",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-170", name: "Isaiah Phelps", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 682, status: "ELSEWHERE",
    school: { name: "Oxnard Pacifica", address: "Oxnard, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 200 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: San Diego State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-171", name: "Ellis McGaskin", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 683, status: "ELSEWHERE",
    school: { name: "Williamson", address: "Mobile, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 205 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Florida",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-172", name: "Drew Williams", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 684, status: "ELSEWHERE",
    school: { name: "Sequoyah", address: "Canton, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 200 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Kentucky",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-173", name: "Braylon Williams", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 685, status: "ELSEWHERE",
    school: { name: "Arlington Lamar", address: "Arlington, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 220 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: SMU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-174", name: "Isaiah Leilua", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 686, status: "ELSEWHERE",
    school: { name: "Servite", address: "Anaheim, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 220 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-175", name: "Zykee Scott", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 687, status: "ELSEWHERE",
    school: { name: "La Salle College", address: "Wyndmoor, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 220 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: North Carolina",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-176", name: "Ethan Hauser", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 688, status: "ELSEWHERE",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 200 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Vanderbilt",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-177", name: "Brayden Watson", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 689, status: "ELSEWHERE",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 200 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Michigan",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-178", name: "Jake Godfree", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 690, status: "ELSEWHERE",
    school: { name: "North Gwinnett", address: "Suwanee, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 218 \u00b7 247 rating 87 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: NC State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-179", name: "Liufau Loumoli", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 691, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 210 \u00b7 247 rating 86 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-180", name: "Shelvy Clark", jersey: "\u2014", positionGroup: "ILB", classYear: 2027, grade: null, order: 692, status: "ELSEWHERE",
    school: { name: "Germantown", address: "Germantown, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 225 \u00b7 247 rating 86 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Maryland",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-181", name: "Donte Wright", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 693, status: "ELSEWHERE",
    school: { name: "Long Beach Poly", address: "Long Beach, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 98 \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-182", name: "A'mir Sears", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 694, status: "ELSEWHERE",
    school: { name: "Miami Columbus", address: "Miami, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 178 \u00b7 247 rating 98 \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-183", name: "Danny Lang", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 695, status: "ELSEWHERE",
    school: { name: "Mater Dei", address: "Santa Ana, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 160 \u00b7 247 rating 95 \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-184", name: "Raylaun Henry", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 696, status: "ELSEWHERE",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180 \u00b7 247 rating 95 \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-185", name: "Xavier Hasan", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 697, status: "ELSEWHERE",
    school: { name: "Cardinal Gibbons", address: "Raleigh, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 195 \u00b7 247 rating 94 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-186", name: "Ace Alston", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 698, status: "ELSEWHERE",
    school: { name: "Anderson", address: "Cincinnati, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 93 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-187", name: "Censere Gaylord", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 699, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 165 \u00b7 247 rating 92 \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-188", name: "Jerry Outhouse Jr.", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 700, status: "ELSEWHERE",
    school: { name: "North Crowley", address: "Fort Worth, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 180 \u00b7 247 rating 91 \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-189", name: "Tavares Harrington", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 701, status: "ELSEWHERE",
    school: { name: "Mount Carmel", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 175 \u00b7 247 rating 90 \u00b7 247 lists commitment: Michigan",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-190", name: "Ai'King Hall", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 702, status: "ELSEWHERE",
    school: { name: "Dothan", address: "Dothan, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 190 \u00b7 247 rating 90 \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-191", name: "Brandon Sherrard", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 703, status: "ELSEWHERE",
    school: { name: "Shadow Creek", address: "Pearland, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180 \u00b7 247 rating 90 \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-192", name: "Bryce Williams", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 704, status: "ELSEWHERE",
    school: { name: "Western", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 175 \u00b7 247 rating 90 \u00b7 247 lists commitment: Nebraska",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-193", name: "Chase Johnson", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 705, status: "ELSEWHERE",
    school: { name: "Emanuel County Institute", address: "Twin City, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 150 \u00b7 247 rating 89 \u00b7 247 lists commitment: Virginia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-194", name: "MJ Burnett", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 706, status: "ELSEWHERE",
    school: { name: "Walton", address: "Marietta, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 202 \u00b7 247 rating 89 \u00b7 247 lists commitment: Georgia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-195", name: "Jailen Hill", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 707, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 160 \u00b7 247 rating 88 \u00b7 247 lists commitment: Nebraska",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-196", name: "Jaden Carey", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 708, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 175 \u00b7 247 rating 88 \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-197", name: "Kamauri Whitfield", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 709, status: "ELSEWHERE",
    school: { name: "The First Academy", address: "Orlando, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 185 \u00b7 247 rating 88 \u00b7 247 lists commitment: Florida",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-198", name: "Larry Moon III", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 710, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 185 \u00b7 247 rating 88 \u00b7 247 lists commitment: Georgia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-199", name: "Mikyal Davis", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 711, status: "ELSEWHERE",
    school: { name: "Desert Edge", address: "Goodyear, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 170 \u00b7 247 rating 88 \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-200", name: "Trenton Blaylock", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 712, status: "ELSEWHERE",
    school: { name: "Atascocita", address: "Humble, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 175 \u00b7 247 rating 88 \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-201", name: "Jacob Whitehead", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 713, status: "ELSEWHERE",
    school: { name: "Crean Lutheran", address: "Irvine, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 165 \u00b7 247 rating 88 \u00b7 247 lists commitment: Arizona",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-202", name: "Darius Johnson", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 714, status: "ELSEWHERE",
    school: { name: "Notre Dame", address: "Riverside, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 88 \u00b7 247 lists commitment: Michigan",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-203", name: "Elijajuan Houston", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 715, status: "ELSEWHERE",
    school: { name: "North Crowley", address: "Fort Worth, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 175 \u00b7 247 rating 88 \u00b7 247 lists commitment: Arizona State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-204", name: "Micah Fleming", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 716, status: "ELSEWHERE",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 175 \u00b7 247 rating 87 \u00b7 247 lists commitment: Baylor",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-205", name: "Johnny McNeil", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 717, status: "ELSEWHERE",
    school: { name: "St. Pius X-St. Matthias Academy", address: "Downey, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 160 \u00b7 247 rating 86 \u00b7 247 lists commitment: Oregon State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-206", name: "Prince Staten", jersey: "\u2014", positionGroup: "CB", classYear: 2027, grade: null, order: 718, status: "ELSEWHERE",
    school: { name: "McClymonds", address: "Oakland, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 165 \u00b7 247 rating 85 \u00b7 247 lists commitment: UNLV",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-207", name: "JayQuan Snell", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 719, status: "ELSEWHERE",
    school: { name: "Waxahachie", address: "Waxahachie, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 198 \u00b7 247 rating 94 \u00b7 247 lists commitment: Texas A&M",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-208", name: "Omarii Sanders", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 720, status: "ELSEWHERE",
    school: { name: "Franklin Road Academy", address: "Nashville, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 210 \u00b7 247 rating 94 \u00b7 247 lists commitment: Vanderbilt",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-209", name: "Cooper Witten", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 721, status: "ELSEWHERE",
    school: { name: "Liberty Christian", address: "Argyle, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 220 \u00b7 247 rating 94 \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-210", name: "Karnell James", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 722, status: "ELSEWHERE",
    school: { name: "Manvel", address: "Manvel, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 175 \u00b7 247 rating 93 \u00b7 247 lists commitment: LSU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-211", name: "Gavin Williams", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 723, status: "ELSEWHERE",
    school: { name: "Damien", address: "La Verne, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 185 \u00b7 247 rating 93 \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-212", name: "Tory Pittman III", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 724, status: "ELSEWHERE",
    school: { name: "Millard North", address: "Omaha, NE" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 189 \u00b7 247 rating 93 \u00b7 247 lists commitment: Nebraska",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-213", name: "Chance Gilbert", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 725, status: "ELSEWHERE",
    school: { name: "East Coweta", address: "Sharpsburg, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 170 \u00b7 247 rating 92 \u00b7 247 lists commitment: Auburn",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-214", name: "Zayden Gamble", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 726, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 190 \u00b7 247 rating 92 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-215", name: "Pole Moala", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 727, status: "ELSEWHERE",
    school: { name: "Junipero Serra", address: "Gardena, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 90 \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-216", name: "Myles Baker", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 728, status: "ELSEWHERE",
    school: { name: "Sierra Canyon", address: "Chatsworth, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 185 \u00b7 247 rating 90 \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-217", name: "Jayden Aparicio-Bailey", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 729, status: "ELSEWHERE",
    school: { name: "Prattville", address: "Prattville, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 90 \u00b7 247 lists commitment: Clemson",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-218", name: "Kaleb Elkins", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 730, status: "ELSEWHERE",
    school: { name: "Warren Central", address: "Indianapolis, IN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 185 \u00b7 247 rating 90 \u00b7 247 lists commitment: Purdue",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-219", name: "Adryan Cole", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 731, status: "ELSEWHERE",
    school: { name: "Douglas County", address: "Douglasville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 190 \u00b7 247 rating 90 \u00b7 247 lists commitment: Georgia",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-220", name: "Junior Tu'upo", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 732, status: "ELSEWHERE",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 190 \u00b7 247 rating 89 \u00b7 247 lists commitment: Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-221", name: "Kailib Dillard", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 733, status: "ELSEWHERE",
    school: { name: "Jenks", address: "Jenks, OK" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 175 \u00b7 247 rating 88 \u00b7 247 lists commitment: Florida",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-222", name: "Eli Johnson", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 734, status: "ELSEWHERE",
    school: { name: "Cibolo Steele", address: "Cibolo, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 200 \u00b7 247 rating 88 \u00b7 247 lists commitment: Ohio State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-223", name: "Kennedy Green", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 735, status: "ELSEWHERE",
    school: { name: "Douglas County", address: "Douglasville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 88 \u00b7 247 lists commitment: Mississippi State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-224", name: "Khalil Terry", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 736, status: "ELSEWHERE",
    school: { name: "Tustin", address: "Tustin, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 185 \u00b7 247 rating 88 \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-225", name: "Charles Woodson Jr.", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 737, status: "ELSEWHERE",
    school: { name: "Lake Nona", address: "Orlando, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 173 \u00b7 247 rating 88 \u00b7 247 lists commitment: Michigan",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-226", name: "Isala Aisa Wily-Ava", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 738, status: "ELSEWHERE",
    school: { name: "St. John Bosco", address: "Bellflower, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 88 \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-227", name: "Charles Roberts", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 739, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 180 \u00b7 247 rating 88 \u00b7 247 lists commitment: Maryland",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-228", name: "Jaden Walk-Green", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 740, status: "ELSEWHERE",
    school: { name: "Corona Centennial", address: "Corona, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 188 \u00b7 247 rating 88 \u00b7 247 lists commitment: Washington",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-229", name: "Samari Howard", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 741, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 175 \u00b7 247 rating 87 \u00b7 247 lists commitment: Colorado",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-230", name: "Isaiah Udom", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 742, status: "ELSEWHERE",
    school: { name: "South Oak Cliff", address: "Dallas, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 87 \u00b7 247 lists commitment: SMU",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-231", name: "Alan Blackshere", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 743, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 175 \u00b7 247 rating 86 \u00b7 247 lists commitment: UConn",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-232", name: "Brett Smith", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 744, status: "ELSEWHERE",
    school: { name: "Corona Centennial", address: "Corona, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 84 \u00b7 247 lists commitment: UNLV",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-233", name: "Udarius Jenkins", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 745, status: "OFFERED",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 180",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-234", name: "Jalen Brewster", jersey: "\u2014", positionGroup: "DT", classYear: 2027, grade: null, order: 746, status: "ELSEWHERE",
    school: { name: "Cedar Hill", address: "Cedar Hill, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 302 \u00b7 247 rating 98 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Texas Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-235", name: "Honor Fa'alave-Johnson", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 747, status: "ELSEWHERE",
    school: { name: "Cathedral Catholic", address: "San Diego, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 98 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-236", name: "JuJu Johnson", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 748, status: "ELSEWHERE",
    school: { name: "Long Beach Poly", address: "Long Beach, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 170 \u00b7 247 rating 98 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: UCLA",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-237", name: "Osani Gayles", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 749, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 185 \u00b7 247 rating 95 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Alabama",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-238", name: "Myson Johnson-Cook", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 750, status: "ELSEWHERE",
    school: { name: "East St. Louis", address: "East St. Louis, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 235 \u00b7 247 rating 94 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Auburn",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-239", name: "Bode Sparrow", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 751, status: "ELSEWHERE",
    school: { name: "Davis", address: "Kaysville, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 93 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-240", name: "Aaryn Washington", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 752, status: "ELSEWHERE",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11.5 / 152 \u00b7 247 rating 93 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: USC",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-241", name: "Taven Epps", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 753, status: "ELSEWHERE",
    school: { name: "Tustin", address: "Tustin, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 226 \u00b7 247 rating 92 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-242", name: "Brayton Feister", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 754, status: "OFFERED",
    school: { name: "Massillon Washington", address: "Massillon, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 238 \u00b7 247 rating 91 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-243", name: "Luke Starcevic", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 755, status: "ELSEWHERE",
    school: { name: "Kindred", address: "Kindred, ND" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 250 \u00b7 247 rating 91 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Clemson",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-244", name: "Taelyn Mayo", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 756, status: "ELSEWHERE",
    school: { name: "Lewisville", address: "Lewisville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 185 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-245", name: "Karece Hoyt", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 757, status: "ELSEWHERE",
    school: { name: "Frisco Lone Star", address: "Frisco, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 200 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Baylor",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-246", name: "Jai Jones", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 758, status: "ELSEWHERE",
    school: { name: "Chandler", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 175 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Wisconsin",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-247", name: "Krew Jones", jersey: "\u2014", positionGroup: "EDGE", classYear: 2027, grade: null, order: 759, status: "ELSEWHERE",
    school: { name: "Orem", address: "Orem, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 233 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Oklahoma",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-248", name: "Ty Keys", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 760, status: "ELSEWHERE",
    school: { name: "Poplarville", address: "Poplarville, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Miami",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-249", name: "Za'Kari Johnson", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 761, status: "ELSEWHERE",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 196 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Florida State",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-250", name: "Duvay Williams", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 762, status: "ELSEWHERE",
    school: { name: "Inglewood", address: "Inglewood, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 148 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: California",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-251", name: "Elijah Butler", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 763, status: "ELSEWHERE",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 190 \u00b7 247 rating 89 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Virginia Tech",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-252", name: "Caden Jones", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 764, status: "ELSEWHERE",
    school: { name: "Crean Lutheran", address: "Irvine, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 88 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Arizona",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-253", name: "Victor Scott", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 765, status: "ELSEWHERE",
    school: { name: "Lancaster", address: "Lancaster, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 195 \u00b7 247 rating 87 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: North Texas",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-254", name: "Romel Koon", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 766, status: "ELSEWHERE",
    school: { name: "Brentwood Academy", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 155 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Tulsa",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-255", name: "Mason Moore", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 767, status: "ELSEWHERE",
    school: { name: "Baton Rouge Central", address: "Baton Rouge, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 170 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-256", name: "Darryl Flemister", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 768, status: "ELSEWHERE",
    school: { name: "Martin Luther King", address: "Detroit, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 160 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Illinois",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of27-257", name: "Elijah Carney", jersey: "\u2014", positionGroup: "SAF", classYear: 2027, grade: null, order: 769, status: "ELSEWHERE",
    school: { name: "Lincoln", address: "Tacoma, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 175 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Eastern Washington (signed)",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },

  { id: "of28-65", name: "Tytan McNeal", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 900, status: "OFFERED",
    school: { name: "Eastside Catholic", address: "Sammamish, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 230 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-66", name: "Presley DeLance", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 901, status: "OFFERED",
    school: { name: "Lake Oswego", address: "Lake Oswego, OR" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 230 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-67", name: "Xevien Brinson", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 902, status: "OFFERED",
    school: { name: "Stephenson", address: "Stone Mountain, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 235 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-68", name: "Asa Wall", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 903, status: "ELSEWHERE",
    school: { name: "John Milledge Academy", address: "Milledgeville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 239 \u00b7 247 rating 90 \u00b7 247 lists commitment: Georgia",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-69", name: "Jaylin Smalls", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 904, status: "OFFERED",
    school: { name: "Rancho Cucamonga", address: "Rancho Cucamonga, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 230 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-70", name: "Connor Arant", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 905, status: "OFFERED",
    school: { name: "Bixby", address: "Bixby, OK" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 225 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-71", name: "Jack McNamara", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 906, status: "OFFERED",
    school: { name: "Brother Rice", address: "Oak Lawn, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 235 \u00b7 247 rating 89",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-72", name: "Jordan McKinley", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 907, status: "OFFERED",
    school: { name: "Loyola Academy", address: "Wilmette, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 220 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-73", name: "Mike Taylor", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 908, status: "OFFERED",
    school: { name: "Desert Pines", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 225 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-74", name: "Theo Schott", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 909, status: "OFFERED",
    school: { name: "Zionsville", address: "Zionsville, IN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 210 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-75", name: "Tre Oiler", jersey: "\u2014", positionGroup: "TE", classYear: 2028, grade: null, order: 910, status: "OFFERED",
    school: { name: "Arrowhead", address: "Hartland, WI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 220 \u00b7 247 rating 87",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-76", name: "Mataio Fano", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 911, status: "OFFERED",
    school: { name: "Orem", address: "Orem, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 235 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-77", name: "Lincoln Fa'alafi", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 912, status: "OFFERED",
    school: { name: "JSerra Catholic", address: "San Juan Capistrano, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7.5 / 350 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-78", name: "Antijuan Wilkes", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 913, status: "OFFERED",
    school: { name: "Cass Technical", address: "Detroit, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 250 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-79", name: "Nation Farmer", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 914, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 303 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-80", name: "Joseph Frierdich", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 915, status: "OFFERED",
    school: { name: "Carbondale", address: "Carbondale, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7 / 260 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-81", name: "Austin Attalah", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 916, status: "OFFERED",
    school: { name: "Orange Lutheran", address: "Orange, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-8 / 270 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-82", name: "Aden Owolabi", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 917, status: "OFFERED",
    school: { name: "San Ramon Valley", address: "Danville, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 280 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-83", name: "R'Monie Edwards", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 918, status: "OFFERED",
    school: { name: "Cy Ranch", address: "Cypress, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 310 \u00b7 247 rating 91 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-84", name: "Samiu Taukiuvea", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 919, status: "OFFERED",
    school: { name: "West", address: "Salt Lake City, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 270 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-85", name: "Cannon Zubeck", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 920, status: "OFFERED",
    school: { name: "Shawnee Mission East", address: "Prairie Village, KS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7 / 270 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-86", name: "Wyatt Wagner", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 921, status: "OFFERED",
    school: { name: "Midlothian Heritage", address: "Midlothian, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-8 / 270 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-87", name: "Carter Barrett", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 922, status: "OFFERED",
    school: { name: "Dowling Catholic", address: "West Des Moines, IA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 305 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-88", name: "Ben Coleman", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 923, status: "OFFERED",
    school: { name: "Providence Catholic", address: "New Lenox, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 285 \u00b7 247 rating 90 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-89", name: "King Pitts", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 924, status: "OFFERED",
    school: { name: "Kapa'a", address: "Kapa'a, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 270 \u00b7 247 rating 89 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-90", name: "Reece Wilmes", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 925, status: "OFFERED",
    school: { name: "Lawrence Free State", address: "Lawrence, KS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 285 \u00b7 247 rating 89 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-91", name: "Mac Horton", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 926, status: "OFFERED",
    school: { name: "Lovejoy", address: "Lucas, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 280 \u00b7 247 rating 87 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-92", name: "Teauariki Siaoloa", jersey: "\u2014", positionGroup: "OL_SWING", classYear: 2028, grade: null, order: 927, status: "OFFERED",
    school: { name: "NFL Academy Asia-Pacific", address: "Australia, AUS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 289 \u00b7 Listed: OT \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-93", name: "Maui Tonata", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 928, status: "OFFERED",
    school: { name: "Orem", address: "Orem, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 320 \u00b7 247 rating 94 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-94", name: "Kendrick Harris", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 929, status: "OFFERED",
    school: { name: "Duncanville", address: "Duncanville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 305 \u00b7 247 rating 91 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-95", name: "Major Green", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 930, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 350 \u00b7 247 rating 91 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-96", name: "Grayson Williams", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 931, status: "OFFERED",
    school: { name: "Southeast Raleigh", address: "Raleigh, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 280 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-97", name: "Bryce Smalls", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 932, status: "OFFERED",
    school: { name: "Archbishop Spalding", address: "Severn, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 305 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-98", name: "George Selvie III", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 933, status: "OFFERED",
    school: { name: "Sumner", address: "Riverview, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 265 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-99", name: "Gavin Wilson", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 934, status: "OFFERED",
    school: { name: "Bixby", address: "Bixby, OK" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 266 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-100", name: "Elisha Mueller", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 935, status: "OFFERED",
    school: { name: "St. John Bosco", address: "Bellflower, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 295 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-101", name: "Toa Feinga", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 936, status: "OFFERED",
    school: { name: "Herriman", address: "Herriman, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 280 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-102", name: "Maxx Jones", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 937, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 325 \u00b7 247 rating 90 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-103", name: "Kyler Harden", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 938, status: "OFFERED",
    school: { name: "O'Dea", address: "Seattle, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 260 \u00b7 247 rating 89 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-104", name: "Declan Heying", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 939, status: "OFFERED",
    school: { name: "Des Moines Christian School", address: "Des Moines, IA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 270 \u00b7 247 rating 88 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-105", name: "Noah Seufale", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 940, status: "OFFERED",
    school: { name: "Orem", address: "Orem, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 330 \u00b7 247 rating 87 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-106", name: "Jayden Thompson", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 941, status: "OFFERED",
    school: { name: "Lovejoy", address: "Lucas, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 305 \u00b7 247 rating 87 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-107", name: "PJ Evans", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 942, status: "OFFERED",
    school: { name: "Jackson Academy", address: "Jackson, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 310 \u00b7 247 rating 87 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-108", name: "Michael Iheanacho", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 943, status: "OFFERED",
    school: { name: "Concordia Prep", address: "Towson, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 300 \u00b7 247 rating 86 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-109", name: "Garrett Rosenberger", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 944, status: "OFFERED",
    school: { name: "Chillicothe", address: "Chillicothe, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 280 \u00b7 247 rating 86 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-110", name: "Semaj Robinson", jersey: "\u2014", positionGroup: "OL_INT", classYear: 2028, grade: null, order: 945, status: "OFFERED",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 288 \u00b7 Listed: IOL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-111", name: "Darieon Prescott", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 946, status: "ELSEWHERE",
    school: { name: "Bolingbrook", address: "Bolingbrook, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 255 \u00b7 247 rating 95 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-112", name: "Antonio Thomas Jr.", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 947, status: "OFFERED",
    school: { name: "Carrollwood Day", address: "Tampa, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 240 \u00b7 247 rating 93",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-113", name: "Cassell Cruickshank", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 948, status: "OFFERED",
    school: { name: "E.E. Smith", address: "Fayetteville, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 230 \u00b7 247 rating 92",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-114", name: "Landen Wade", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 949, status: "OFFERED",
    school: { name: "Basha", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 250 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-115", name: "Major Stokes", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 950, status: "OFFERED",
    school: { name: "Orem", address: "Orem, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5.5 / 240 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-116", name: "Jayden Bell", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 951, status: "OFFERED",
    school: { name: "Brother Rice", address: "Bloomfield Hills, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 210 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-117", name: "Braxton Rein", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 952, status: "OFFERED",
    school: { name: "Baylor School", address: "Chattanooga, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 230 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-118", name: "Cam Toomey", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 953, status: "OFFERED",
    school: { name: "Saratoga Springs", address: "Saratoga Springs, NY" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 245 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-119", name: "Jalanie George", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 954, status: "OFFERED",
    school: { name: "Desert Edge", address: "Goodyear, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 245 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-120", name: "George Parkinson IV", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 955, status: "OFFERED",
    school: { name: "Malvern Prep", address: "Malvern, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 235 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-121", name: "Keoni Snipes", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 956, status: "OFFERED",
    school: { name: "Saraland", address: "Saraland, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 245 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-122", name: "Myles Tate", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 957, status: "OFFERED",
    school: { name: "Woodward Academy", address: "College Park, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 225 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-123", name: "Christian Webb-Scott", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 958, status: "OFFERED",
    school: { name: "Westside", address: "Anderson, SC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-6 / 250 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-124", name: "Asa Burch", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 959, status: "OFFERED",
    school: { name: "Harding", address: "Warren, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 225 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-125", name: "Luke Nabors", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 960, status: "OFFERED",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 210 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-126", name: "Elijah Tillman", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 961, status: "OFFERED",
    school: { name: "Grayson", address: "Loganville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-7 / 210 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-127", name: "Malik Muhammad", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 962, status: "OFFERED",
    school: { name: "Worth County", address: "Sylvester, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 215 \u00b7 247 rating 89",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-128", name: "Takeshi Savery", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 963, status: "OFFERED",
    school: { name: "West", address: "Salt Lake City, UT" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 245 \u00b7 247 rating 87",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-129", name: "Marley Underwood", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 964, status: "OFFERED",
    school: { name: "McEachern", address: "Powder Springs, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 235",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-130", name: "Ricky Li'ili'i", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 965, status: "OFFERED",
    school: { name: "St. Louis", address: "Honolulu, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 230",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-131", name: "Asher Ghioto", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 966, status: "OFFERED",
    school: { name: "The Bolles School", address: "Jacksonville, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 96 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-132", name: "Prince Che", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 967, status: "OFFERED",
    school: { name: "Thomas County Central", address: "Thomasville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 305 \u00b7 247 rating 94 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-133", name: "Tyzon Swann", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 968, status: "OFFERED",
    school: { name: "Henry E. Lackey", address: "Indian Head, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 245 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-134", name: "Jamarcus Johnson", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 969, status: "OFFERED",
    school: { name: "Toombs County", address: "Lyons, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 308 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-135", name: "David Dotson", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 970, status: "OFFERED",
    school: { name: "Atascocita", address: "Humble, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 240 \u00b7 247 rating 91 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-136", name: "Geraci Carson", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 971, status: "OFFERED",
    school: { name: "Lanier", address: "Jackson, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4.5 / 300 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-137", name: "Ayden Woodruff", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 972, status: "OFFERED",
    school: { name: "Ravenwood", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 284 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-138", name: "Antavion Allen", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 973, status: "ELSEWHERE",
    school: { name: "Hattiesburg", address: "Hattiesburg, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 289 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Ole Miss",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-139", name: "Tayaun Lawrence", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 974, status: "OFFERED",
    school: { name: "Bishop Gorman", address: "Las Vegas, NV" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 250 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-140", name: "Dawson Jacobs", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 975, status: "OFFERED",
    school: { name: "Blessed Trinity Catholic", address: "Roswell, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 240 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-141", name: "Cory Cunningham", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 976, status: "OFFERED",
    school: { name: "Hough", address: "Cornelius, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 265 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-142", name: "Caleb Tucker", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 977, status: "OFFERED",
    school: { name: "Mount Carmel", address: "Chicago, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 355 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-143", name: "Zylen Little", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 978, status: "OFFERED",
    school: { name: "Carrollwood Day", address: "Tampa, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1.5 / 290 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-144", name: "Trison Satele", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 979, status: "OFFERED",
    school: { name: "Mililani", address: "Mililani, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 270 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-145", name: "Aedyn Havili", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 980, status: "OFFERED",
    school: { name: "Eastside Catholic", address: "Sammamish, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 320 \u00b7 247 rating 90 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-146", name: "Tory Clark", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 981, status: "OFFERED",
    school: { name: "Woodward Academy", address: "College Park, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 275 \u00b7 247 rating 89 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-147", name: "Janero Welch", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 982, status: "OFFERED",
    school: { name: "Duncanville", address: "Duncanville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 300 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-148", name: "Ronald Crawford", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 983, status: "OFFERED",
    school: { name: "De La Salle", address: "New Orleans, LA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 340 \u00b7 247 rating 88 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-149", name: "Micah Price", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 984, status: "OFFERED",
    school: { name: "American Heritage", address: "Plantation, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 270 \u00b7 247 rating 87 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-150", name: "Antonio Wilcher", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 985, status: "OFFERED",
    school: { name: "Miami Southridge", address: "Miami, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.5 / 315 \u00b7 247 rating 86 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-151", name: "Noah Ross", jersey: "\u2014", positionGroup: "DT", classYear: 2028, grade: null, order: 986, status: "OFFERED",
    school: { name: "Richardson", address: "Richardson, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 295 \u00b7 247 rating 86 \u00b7 Listed: DL \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-152", name: "Tahj Gray", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 987, status: "OFFERED",
    school: { name: "St. Joseph Regional", address: "Montvale, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3.5 / 233 \u00b7 247 rating 91 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-153", name: "Jameer Miles", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 988, status: "OFFERED",
    school: { name: "Carmel Catholic", address: "Mundelein, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 192 \u00b7 247 rating 91 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-154", name: "Judah Blair", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 989, status: "OFFERED",
    school: { name: "Lakota West", address: "West Chester, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 200 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-155", name: "Tysir Young", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 990, status: "ELSEWHERE",
    school: { name: "Middletown", address: "Middletown, DE" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Alabama",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-156", name: "Andre Alexander Jr.", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 991, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-157", name: "Ryan Peterson", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 992, status: "OFFERED",
    school: { name: "Hough", address: "Cornelius, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-158", name: "Allen Kennett V", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 993, status: "OFFERED",
    school: { name: "Servite", address: "Anaheim, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 220 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-159", name: "Skylar Alston", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 994, status: "OFFERED",
    school: { name: "Cardinal Gibbons", address: "Raleigh, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 210 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-160", name: "Jay Schell", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 995, status: "OFFERED",
    school: { name: "Rabun Gap-Nacoochee", address: "Rabun Gap, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 214 \u00b7 247 rating 90 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-161", name: "Landon Miller", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 996, status: "OFFERED",
    school: { name: "De La Salle", address: "Concord, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 210 \u00b7 247 rating 89 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-162", name: "Travion Washington", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 997, status: "OFFERED",
    school: { name: "Brandon", address: "Brandon, MS" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 205 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-163", name: "Israel Samuel", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 998, status: "OFFERED",
    school: { name: "Lake Highlands", address: "Dallas, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 195 \u00b7 247 rating 88 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-164", name: "Taualii Purcell", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 999, status: "OFFERED",
    school: { name: "Kamehameha Kapalama", address: "Honolulu, HI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 86 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-165", name: "Kylen Pope", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 1000, status: "OFFERED",
    school: { name: "Cartersville", address: "Cartersville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 225 \u00b7 247 rating 85 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-166", name: "Brandon Wills-Dickson", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 1001, status: "ELSEWHERE",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 230 \u00b7 247 rating 84 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: West Virginia",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-167", name: "Will Wyatt", jersey: "\u2014", positionGroup: "ILB", classYear: 2028, grade: null, order: 1002, status: "OFFERED",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 205 \u00b7 Listed: LB \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-168", name: "Isaiah Taylor", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1003, status: "OFFERED",
    school: { name: "Keller Central", address: "Keller, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 170 \u00b7 247 rating 94",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-169", name: "Nasir Richardson", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1004, status: "OFFERED",
    school: { name: "Malcolm X Shabazz", address: "Newark, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0.5 / 160 \u00b7 247 rating 93",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-170", name: "Jermaine Cobbins", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1005, status: "OFFERED",
    school: { name: "Springfield", address: "Springfield, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 180 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-171", name: "Tyler Boyd", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1006, status: "OFFERED",
    school: { name: "Carrollton", address: "Carrollton, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 189 \u00b7 247 rating 91",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-172", name: "Jai'lil Goley", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1007, status: "OFFERED",
    school: { name: "Gainesville", address: "Gainesville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 175 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-173", name: "Adrian Woodward", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1008, status: "OFFERED",
    school: { name: "St. Peter's Prep", address: "Jersey City, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 165 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-174", name: "LaMarcus Army", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1009, status: "OFFERED",
    school: { name: "Cass Technical", address: "Detroit, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 167 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-175", name: "Jordan Hicks", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1010, status: "OFFERED",
    school: { name: "Mission Viejo", address: "Mission Viejo, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-176", name: "Amiir Woodward", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1011, status: "OFFERED",
    school: { name: "St. Peter's Prep", address: "Jersey City, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 165 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-177", name: "Nate Dollard", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1012, status: "OFFERED",
    school: { name: "Providence Day School", address: "Charlotte, NC" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 170 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-178", name: "Man Robinson", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1013, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 178 \u00b7 247 rating 89",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-179", name: "Kahmaree Crumity", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1014, status: "OFFERED",
    school: { name: "Tallahassee Lincoln", address: "Tallahassee, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-9.5 / 173 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-180", name: "Aaryn Chastine", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1015, status: "OFFERED",
    school: { name: "Stephenson", address: "Stone Mountain, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-181", name: "Kinnard Mahomes", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1016, status: "OFFERED",
    school: { name: "Mount Saint Joseph", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 165 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-182", name: "Mekhi Paschall", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1017, status: "OFFERED",
    school: { name: "Springfield Township", address: "Glenside, PA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-183", name: "Brendon Davis", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1018, status: "OFFERED",
    school: { name: "Buford", address: "Buford, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 173 \u00b7 247 rating 87",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-184", name: "James Brumfield II", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1019, status: "OFFERED",
    school: { name: "James Monroe", address: "Rochester, NY" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 175 \u00b7 247 rating 86",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-185", name: "Eli King", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1020, status: "OFFERED",
    school: { name: "Thompson", address: "Alabaster, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 180 \u00b7 247 rating 86",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-186", name: "Jamal Lagway", jersey: "\u2014", positionGroup: "CB", classYear: 2028, grade: null, order: 1021, status: "OFFERED",
    school: { name: "Willis", address: "Willis, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 160",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-187", name: "Casey Barner", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1022, status: "OFFERED",
    school: { name: "McEachern", address: "Powder Springs, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 190 \u00b7 247 rating 94",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-188", name: "James Foster III", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1023, status: "OFFERED",
    school: { name: "Lancaster", address: "Lancaster, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 210 \u00b7 247 rating 92",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-189", name: "Giovanni Tuggle", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1024, status: "OFFERED",
    school: { name: "Winder-Barrow", address: "Winder, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 175 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-190", name: "CJ Craig-James", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1025, status: "OFFERED",
    school: { name: "Parker", address: "Birmingham, AL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-191", name: "Jalen Flowers", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1026, status: "OFFERED",
    school: { name: "Palos Verdes", address: "Palos Verdes Peninsula, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 185 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-192", name: "Phoenix Evans", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1027, status: "OFFERED",
    school: { name: "IMG Academy", address: "Bradenton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 160 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-193", name: "Derrick Coleman Jr.", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1028, status: "OFFERED",
    school: { name: "Junipero Serra", address: "Gardena, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 175 \u00b7 247 rating 90",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-194", name: "Ace Leutele", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1029, status: "OFFERED",
    school: { name: "Mater Dei", address: "Santa Ana, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 195 \u00b7 247 rating 89",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-195", name: "Drake Coellner", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1030, status: "OFFERED",
    school: { name: "Carmel", address: "Carmel, IN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 190 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-196", name: "Jayden Evans", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1031, status: "OFFERED",
    school: { name: "Harper Woods", address: "Harper Woods, MI" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 170 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-197", name: "Cyion Smith", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1032, status: "OFFERED",
    school: { name: "Blountstown", address: "Blountstown, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 160 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-198", name: "Ryan Drakeford", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1033, status: "OFFERED",
    school: { name: "Quince Orchard", address: "Gaithersburg, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180 \u00b7 247 rating 88",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-199", name: "Kacey Allen", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1034, status: "OFFERED",
    school: { name: "Hamilton", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180 \u00b7 247 rating 87",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-200", name: "Andre Jones", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1035, status: "ELSEWHERE",
    school: { name: "St. Thomas Aquinas", address: "Fort Lauderdale, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 170 \u00b7 247 rating 87 \u00b7 247 lists commitment: Notre Dame",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-201", name: "Dustin Henry", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1036, status: "ELSEWHERE",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 205 \u00b7 247 rating 87 \u00b7 247 lists commitment: Alabama",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-202", name: "Troy Bishop", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1037, status: "OFFERED",
    school: { name: "Mater Dei", address: "Santa Ana, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 190 \u00b7 247 rating 86",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-203", name: "Mykel Ramos", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1038, status: "OFFERED",
    school: { name: "Sierra Canyon", address: "Chatsworth, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 170 \u00b7 247 rating 85",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-204", name: "Ja'mari McGee", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1039, status: "OFFERED",
    school: { name: "Keller Central", address: "Keller, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 175",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-205", name: "Cartier Morrell", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1040, status: "OFFERED",
    school: { name: "Miami Carol City", address: "Opa Locka, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 160",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-206", name: "Carlton Jackson III", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1041, status: "OFFERED",
    school: { name: "West Boca Raton", address: "Boca Raton, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 180",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-207", name: "Kameron McGee", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 1042, status: "OFFERED",
    school: { name: "Brother Rice", address: "Oak Lawn, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 245 \u00b7 247 rating 98 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-208", name: "Keaton Fields", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1043, status: "OFFERED",
    school: { name: "Hamilton", address: "Chandler, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 185 \u00b7 247 rating 92 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-209", name: "Jermaine Smith Jr.", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1044, status: "OFFERED",
    school: { name: "St. Frances Academy", address: "Baltimore, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 215 \u00b7 247 rating 91 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-210", name: "Nick Carroll", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1045, status: "OFFERED",
    school: { name: "Toombs County", address: "Lyons, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 170 \u00b7 247 rating 91 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-211", name: "Kamieon Compton-Nero", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1046, status: "OFFERED",
    school: { name: "Owasso", address: "Owasso, OK" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2.75 / 185 \u00b7 247 rating 91 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-212", name: "Kevin Hartsfield", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1047, status: "OFFERED",
    school: { name: "Newton", address: "Covington, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 208 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-213", name: "Jayce Halasz", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1048, status: "OFFERED",
    school: { name: "Graham-Kapowsin", address: "Graham, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 175 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-214", name: "Dion Edwards", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1049, status: "OFFERED",
    school: { name: "Tyner Academy", address: "Chattanooga, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 160 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-215", name: "Braylen Bedford", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1050, status: "OFFERED",
    school: { name: "Brentwood Academy", address: "Brentwood, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 170 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-216", name: "Jaden Hurndon", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1051, status: "OFFERED",
    school: { name: "Longview", address: "Longview, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 185 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-217", name: "Grant Bowen", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1052, status: "OFFERED",
    school: { name: "Immaculate Conception", address: "Elmhurst, IL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 220 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-218", name: "Zion Anderson", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1053, status: "OFFERED",
    school: { name: "Long Beach Poly", address: "Long Beach, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 160 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-219", name: "Jeremiah Taylor", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1054, status: "OFFERED",
    school: { name: "Keller Central", address: "Keller, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 170 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-220", name: "Ridge Janes", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 1055, status: "OFFERED",
    school: { name: "De Smet Jesuit", address: "St. Louis, MO" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-5 / 225 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-221", name: "Owen Price", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1056, status: "OFFERED",
    school: { name: "Central Catholic", address: "Grand Island, NE" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 210 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-222", name: "Gabriel Player", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1057, status: "OFFERED",
    school: { name: "Eau Gallie", address: "Melbourne, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 190 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-223", name: "Tristan Thomas", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1058, status: "OFFERED",
    school: { name: "Calvert", address: "Prince Frederick, MD" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 190 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-224", name: "Peter Pierre", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1059, status: "OFFERED",
    school: { name: "Chaminade-Madonna", address: "Hollywood, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 220 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-225", name: "Tahmere Brown", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1060, status: "OFFERED",
    school: { name: "The Pennington School", address: "Pennington, NJ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-11 / 188 \u00b7 247 rating 90 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-226", name: "Brayden Bonik", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1061, status: "OFFERED",
    school: { name: "Fort Bend Ridge Point", address: "Missouri City, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 195 \u00b7 247 rating 89 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-227", name: "Braylen Gibbs", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1062, status: "ELSEWHERE",
    school: { name: "Knoxville Catholic", address: "Knoxville, TN" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 175 \u00b7 247 rating 89 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust \u00b7 247 lists commitment: Alabama",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-228", name: "Kaicen Carter", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1063, status: "OFFERED",
    school: { name: "Federal Way", address: "Federal Way, WA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-2 / 220 \u00b7 247 rating 88 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-229", name: "Brayden Arnold", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1064, status: "OFFERED",
    school: { name: "Duncanville", address: "Duncanville, TX" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10 / 195 \u00b7 247 rating 88 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-230", name: "Kameron Battle", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1065, status: "OFFERED",
    school: { name: "Carrollwood Day", address: "Tampa, FL" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-8.5 / 183 \u00b7 247 rating 87 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-231", name: "Derrick Jackson", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1066, status: "OFFERED",
    school: { name: "Bishop Montgomery", address: "Torrance, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-0 / 185 \u00b7 247 rating 87 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-232", name: "Ernie Tofi", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1067, status: "OFFERED",
    school: { name: "Archbishop Riordan", address: "San Francisco, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 165 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-233", name: "Legarrette Blount Jr.", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1068, status: "OFFERED",
    school: { name: "Mountain Pointe", address: "Phoenix, AZ" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-1 / 172 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-234", name: "Major Lee", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1069, status: "OFFERED",
    school: { name: "Clovis West", address: "Fresno, CA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 5-10.5 / 200 \u00b7 247 rating 86 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-235", name: "Brydon Feister", jersey: "\u2014", positionGroup: "SAF", classYear: 2028, grade: null, order: 1070, status: "OFFERED",
    school: { name: "Massillon Washington", address: "Massillon, OH" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-3 / 210 \u00b7 247 rating 85 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
  { id: "of28-236", name: "Faraji Tucker", jersey: "\u2014", positionGroup: "EDGE", classYear: 2028, grade: null, order: 1071, status: "OFFERED",
    school: { name: "Douglas County", address: "Douglasville, GA" }, birthday: "", cell: "", homeAddress: "", parents: [], callLog: [],
    miscNotes: "247 offer board \u00b7 6-4 / 225 \u00b7 Listed: ATH \u2014 board placement is ours, drag to adjust",
    updatedBy: "247 import (staff paste)", updatedAt: "Aug 13, 2026" },
];
initialPlayers.push(...OFFERED_TARGETS);
const SEED_IMPORTS = [...REAL_COMMITS, ...OFFERED_TARGETS];



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
          // one-time cleanup: remove the original fictional demo roster (seed ids p1\u2013p99).
          // Staff-added prospects use 6-character random ids and are never touched.
          const cleaned = parsed.filter((p) => !/^p\d{1,2}$/.test(String(p.id)));
          const removedDemo = cleaned.length !== parsed.length;
          const have = new Set(cleaned.map((p) => p.id));
          const newCommits = SEED_IMPORTS.filter((p) => !have.has(p.id));
          const merged = [...cleaned, ...newCommits];
          skipNextSave.current = true;
          setPlayers(merged);
          if (newCommits.length || removedDemo) {
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
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | COMMITS | OFFERS
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

  const statusMatch = (p) =>
    statusFilter === "ALL" ? true :
    statusFilter === "COMMITS" ? p.status === "COMMITTED" :
    p.status === "OFFERED" || p.status === "ELSEWHERE";

  const visible = useMemo(
    () => players.filter((p) => activeClasses.includes(p.classYear) && statusMatch(p)),
    [players, classFilter, statusFilter]
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
        <Segmented
          options={IS_SMALL
            ? [{ id: "desktop", label: "BOARD" }, { id: "phone", label: "PHONE" }]
            : [{ id: "desktop", label: "PC VIEW" }, { id: "phone", label: "IPHONE VIEW" }]}
          value={device}
          onChange={setDevice}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{user.name}</span>
          <button onClick={() => setUser(null)} style={{ ...btnStyle(false), padding: "6px 12px" }}>Sign out</button>
        </div>
      </div>

      {device === "desktop" ? (
        <DesktopBoard
          cols={cols} side={side} setSide={setSide}
          classFilter={classFilter} setClassFilter={setClassFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
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
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
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
function DesktopBoard({ cols, side, setSide, classFilter, setClassFilter, statusFilter, setStatusFilter, cellPlayers, setOpenId, dragId, setDragId, dragOver, setDragOver, movePlayer, setShowAdd }) {
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
        <div style={{ width: 1, height: 26, background: T.line }} />
        <Segmented
          options={[{ id: "ALL", label: "EVERYONE" }, { id: "COMMITS", label: "COMMITS" }, { id: "OFFERS", label: "OFFERS" }]}
          value={statusFilter} onChange={setStatusFilter}
        />
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

function MobileApp({ players, phoneTab, setPhoneTab, phonePos, setPhonePos, search, setSearch, classFilter, setClassFilter, statusFilter, setStatusFilter, setOpenId, openPlayer, updatePlayer, closeProfile, userName, real }) {
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
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
          <ClassChips classFilter={classFilter} setClassFilter={setClassFilter} small />
          <Segmented
            options={[{ id: "ALL", label: "ALL" }, { id: "COMMITS", label: "COMMITS" }, { id: "OFFERS", label: "OFFERS" }]}
            value={statusFilter} onChange={setStatusFilter}
          />
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

/* ---------- Per-staff evaluations: one 300-char take per staff member ---------- */
function StaffEvals({ player, updatePlayer, userName }) {
  const evals = player.evals || [];
  const mine = evals.find((e) => e.by === userName);
  const others = evals.filter((e) => e.by !== userName);
  const [draft, setDraft] = useState(mine ? mine.text : "");
  useEffect(() => { setDraft(mine ? mine.text : ""); }, [player.id]);

  const commit = (text) => {
    const t = text.slice(0, 300);
    setDraft(t);
    const rest = evals.filter((e) => e.by !== userName);
    updatePlayer(player.id, { evals: t.trim() ? [{ by: userName, text: t, at: nowStamp() }, ...rest] : rest });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ position: "relative" }}>
        <textarea
          value={draft}
          maxLength={300}
          onChange={(e) => commit(e.target.value)}
          placeholder={"Your evaluation, " + userName + " \u2014 300 characters. Make them count."}
          rows={3}
          style={{
            width: "100%", resize: "vertical", background: T.panel2, color: T.text,
            border: `1px solid ${T.line}`, borderRadius: 8, padding: "10px 12px 22px",
            fontSize: 13, lineHeight: 1.5,
          }}
        />
        <div style={{
          position: "absolute", right: 10, bottom: 10, fontSize: 10,
          color: draft.length >= 280 ? "#FFD60A" : T.dim, fontVariantNumeric: "tabular-nums",
        }}>
          {draft.length}/300
        </div>
      </div>
      {others.length > 0 && others.map((e) => (
        <div key={e.by} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "9px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontFamily: font, fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.text }}>{e.by}</span>
            <span style={{ fontSize: 10, color: T.dim }}>{e.at}</span>
          </div>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{e.text}</div>
        </div>
      ))}
      {others.length === 0 && !draft && (
        <div style={{ fontSize: 12, color: T.dim }}>No staff evaluations yet \u2014 be the first on record.</div>
      )}
    </div>
  );
}

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
      <S>Grade & Status</S>
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

      {/* per-staff evaluations */}
      <S>Staff Evaluations</S>
      <StaffEvals player={p} updatePlayer={updatePlayer} userName={userName} />

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
    if (!name.trim()) { setErr("Select your name so board moves, call logs, and evaluations are credited to you."); return; }
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
            {GRADES.filter((g) => g.id !== "UNGRADED").map((g) => (
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
          <select
            style={{ ...inputStyle, cursor: "pointer", appearance: "auto", color: name ? T.text : T.dim }}
            value={name}
            onChange={(e) => { setName(e.target.value); setErr(""); }}
          >
            <option value="" disabled style={{ background: "#1A2029", color: "#8B95A5" }}>Select your name\u2026</option>
            {STAFF_GROUPS.map((grp) => (
              <optgroup key={grp.label} label={grp.label}>
                {grp.members.map((m) => (
                  <option key={m} value={m} style={{ background: "#1A2029", color: "#E8ECF2" }}>{m}</option>
                ))}
              </optgroup>
            ))}
          </select>
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
