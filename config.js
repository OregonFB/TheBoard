/* School config — Kansas State. Everything school-specific lives in this file.
   The app itself (app.js) is school-agnostic.
   Staff: 2026 K-State football staff under HC Collin Klein (source: WIBW 12/26/25). */

/* Seed board: 2027 commits + 2027/2028 offer board (247Sports, pulled 8/14/26) */
const _SEED_PROSPECTS = [
  {
    "id": "ks27-01",
    "name": "Joshua Vilmael",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 100,
    "status": "COMMITTED",
    "school": {
      "name": "Fort Bend Travis",
      "address": "Richmond, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/15/26 · 6-2.5 / 186 · 247 rating 90 · Listed: CB",
    "links": {
      "s247": "https://247sports.com/Player/joshua-vilmael-46159055/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-02",
    "name": "Cooper Ohnmacht",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 101,
    "status": "COMMITTED",
    "school": {
      "name": "Great Bend",
      "address": "Great Bend, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/7/26 · 6-0 / 185 · 247 rating 90 · Listed: S",
    "links": {
      "s247": "https://247sports.com/Player/cooper-ohnmacht-46157307/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-03",
    "name": "Bra'jon Melancon",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 102,
    "status": "COMMITTED",
    "school": {
      "name": "North Iberville",
      "address": "Rosedale, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/13/26 · 6-0 / 170 · 247 rating 89 · Listed: CB",
    "links": {
      "s247": "https://247sports.com/Player/brajon-melancon-46165745/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-04",
    "name": "Dawayne Jones",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 103,
    "status": "COMMITTED",
    "school": {
      "name": "Booker T. Washington",
      "address": "Tulsa, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/28/26 · 6-3 / 265 · 247 rating 89 · Listed: DL",
    "links": {
      "s247": "https://247sports.com/Player/dawayne-jones-46147331/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-05",
    "name": "Ben Hynek",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2027,
    "grade": null,
    "order": 104,
    "status": "COMMITTED",
    "school": {
      "name": "Stanley",
      "address": "Stanley, ND"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/20/26 · 6-6 / 240 · 247 rating 89 · Listed: TE",
    "links": {},
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-06",
    "name": "Colton McComb",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 105,
    "status": "COMMITTED",
    "school": {
      "name": "Edmond Memorial",
      "address": "Edmond, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/4/26 · 6-2 / 200 · 247 rating 89 · Listed: LB",
    "links": {
      "s247": "https://247sports.com/Player/colton-mccomb-46155703/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-07",
    "name": "Cameron Kruse",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 106,
    "status": "COMMITTED",
    "school": {
      "name": "Page",
      "address": "Franklin, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/28/26 · 6-2 / 195 · 247 rating 88 · Listed: QB",
    "links": {
      "s247": "https://247sports.com/Player/cameron-kruse-46162966/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-08",
    "name": "Sedrick Marsh",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 107,
    "status": "COMMITTED",
    "school": {
      "name": "Waxahachie",
      "address": "Waxahachie, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/10/26 · 6-5 / 230 · 247 rating 88 · Listed: Edge",
    "links": {
      "s247": "https://247sports.com/Player/sedrick-marsh-46158719/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-09",
    "name": "Finn Walker",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 108,
    "status": "COMMITTED",
    "school": {
      "name": "Conroe Oak Ridge",
      "address": "Conroe, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/24/26 · 6-6 / 245 · 247 rating 88 · Listed: DL",
    "links": {
      "s247": "https://247sports.com/Player/finn-walker-46159175/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-10",
    "name": "Joseph Graves",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 109,
    "status": "COMMITTED",
    "school": {
      "name": "Booker T. Washington",
      "address": "Tulsa, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/18/26 · 6-2 / 310 · 247 rating 87 · Listed: DL",
    "links": {
      "s247": "https://247sports.com/Player/joseph-graves-46151690/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-11",
    "name": "Brooklyn Maxey",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 110,
    "status": "COMMITTED",
    "school": {
      "name": "Carrollwood Day",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/17/26 · 6-2 / 215 · 247 rating 87 · Listed: ATH",
    "links": {
      "s247": "https://247sports.com/Player/brooklyn-maxey-46164107/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-12",
    "name": "Laron Baker Jr.",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 111,
    "status": "COMMITTED",
    "school": {
      "name": "East St. Louis",
      "address": "East St. Louis, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/23/26 · 5-10 / 172 · 247 rating 87 · Listed: WR",
    "links": {
      "s247": "https://247sports.com/Player/laron-baker-jr-46145802/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-13",
    "name": "Ashton Stark",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 112,
    "status": "COMMITTED",
    "school": {
      "name": "Lutcher",
      "address": "Lutcher, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/17/26 · 5-9.5 / 158 · 247 rating 87 · Listed: WR",
    "links": {
      "s247": "https://247sports.com/Player/ashton-stark-46164266/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-14",
    "name": "Correll Buckhalter Jr.",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 113,
    "status": "COMMITTED",
    "school": {
      "name": "Liberty Christian",
      "address": "Argyle, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/7/26 · 5-10 / 185 · 247 rating 87 · Listed: RB",
    "links": {
      "s247": "https://247sports.com/Player/correll-buckhalter-jr-46155810/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-15",
    "name": "London Goggans",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 114,
    "status": "COMMITTED",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/3/26 · 6-0 / 180 · 247 rating 87 · Listed: S",
    "links": {
      "s247": "https://247sports.com/Player/london-goggans-46157831/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-16",
    "name": "David Rushing",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 115,
    "status": "COMMITTED",
    "school": {
      "name": "Salpointe Catholic",
      "address": "Tucson, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/20/26 · 6-0.5 / 165 · 247 rating 87 · Listed: WR",
    "links": {
      "s247": "https://247sports.com/Player/david-rushing-46159969/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-17",
    "name": "Logan Davis",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 116,
    "status": "COMMITTED",
    "school": {
      "name": "Fort Bend Ridge Point",
      "address": "Missouri City, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 5/31/26 · 6-0 / 180 · 247 rating 87 · Listed: CB",
    "links": {
      "s247": "https://247sports.com/Player/logan-davis-46167116/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-18",
    "name": "Brayden Harris",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 117,
    "status": "COMMITTED",
    "school": {
      "name": "Jackson",
      "address": "Jackson, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 5/31/26 · 6-5.5 / 270 · 247 rating 87 · Listed: OT",
    "links": {
      "s247": "https://247sports.com/Player/brayden-harris-46158709/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-19",
    "name": "Jalen Price",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 118,
    "status": "COMMITTED",
    "school": {
      "name": "Cedar Hill",
      "address": "Cedar Hill, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/24/26 · 6-3 / 250 · 247 rating 86 · Listed: Edge",
    "links": {
      "s247": "https://247sports.com/Player/jalen-price-46162633/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-20",
    "name": "Jeron Allen II",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 119,
    "status": "COMMITTED",
    "school": {
      "name": "Cedar Hill",
      "address": "Cedar Hill, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/15/26 · 6-3 / 240 · 247 rating 86 · Listed: Edge",
    "links": {
      "s247": "https://247sports.com/Player/jeron-allen-ii-46159086/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-21",
    "name": "Bryson Dossett",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 120,
    "status": "COMMITTED",
    "school": {
      "name": "Fort Bend Ridge Point",
      "address": "Missouri City, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 5/22/26 · 5-10 / 170 · 247 rating 86 · Listed: S",
    "links": {
      "s247": "https://247sports.com/Player/bryson-dossett-46150553/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-22",
    "name": "Anitoni Tahi",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 121,
    "status": "COMMITTED",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/29/26 · 6-2 / 312 · 247 rating 86 · Listed: DL",
    "links": {
      "s247": "https://247sports.com/Player/anitoni-tahi-46151438/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-23",
    "name": "Jack Clayborne",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 122,
    "status": "COMMITTED",
    "school": {
      "name": "Northeastern Oklahoma A&M",
      "address": "Miami, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/26/26 · 6-8 / 330 · 247 rating 86 · Listed: OT",
    "links": {
      "s247": "https://247sports.com/Player/jack-clayborne-46161414/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-24",
    "name": "George Murray III",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 123,
    "status": "COMMITTED",
    "school": {
      "name": "Apalachee",
      "address": "Winder, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 6/2/26 · 5-10 / 175 · 247 rating 85 · Listed: CB",
    "links": {
      "s247": "https://247sports.com/Player/george-murray-iii-46166998/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-25",
    "name": "Kelvin Eiwo",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 124,
    "status": "COMMITTED",
    "school": {
      "name": "The Colony",
      "address": "The Colony, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 5/31/26 · 6-3 / 305 · 247 rating 85 · Listed: IOL",
    "links": {
      "s247": "https://247sports.com/Player/kelvin-eiwo-46150508/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-26",
    "name": "Giacamo SanFilippo",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 125,
    "status": "COMMITTED",
    "school": {
      "name": "Bishop Moore Catholic",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 4/19/26 · 6-1 / 224 · 247 rating 85 · Listed: LB",
    "links": {
      "s247": "https://247sports.com/Player/giacamo-sanfilippo-46165251/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "ks27-27",
    "name": "Canaan Smith",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 126,
    "status": "COMMITTED",
    "school": {
      "name": "Prestonwood Christian",
      "address": "Plano, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "Committed 3/16/26 · 6-2 / 295 · 247 rating 84 · Listed: IOL",
    "links": {
      "s247": "https://247sports.com/Player/canaan-smith-46165295/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-001",
    "name": "Jake Nawrot",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 300,
    "status": "ELSEWHERE",
    "school": {
      "name": "John Hersey",
      "address": "Arlington Heights, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 200 · 247 rating 94 · Listed: QB · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/jake-nawrot-46154682/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-002",
    "name": "Will Mencl",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 301,
    "status": "ELSEWHERE",
    "school": {
      "name": "Chandler",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 200 · 247 rating 94 · Listed: QB · 247 lists commitment: Oregon",
    "links": {
      "s247": "https://247sports.com/Player/will-mencl-46156781/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-003",
    "name": "Kavian Bryant",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 302,
    "status": "ELSEWHERE",
    "school": {
      "name": "Palestine Westwood",
      "address": "Palestine, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 190 · 247 rating 93 · Listed: QB · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/kavian-bryant-46145096/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-004",
    "name": "Colton Nussmeier",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 303,
    "status": "ELSEWHERE",
    "school": {
      "name": "Archbishop Rummel",
      "address": "Metairie, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 195 · 247 rating 90 · Listed: QB · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/colton-nussmeier-46146658/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-005",
    "name": "Braylen Warren",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 304,
    "status": "ELSEWHERE",
    "school": {
      "name": "Omaha Westside",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · 247 rating 90 · Listed: QB · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/braylen-warren-46152790/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-006",
    "name": "Blake Roskopf",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 305,
    "status": "ELSEWHERE",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 235 · 247 rating 90 · Listed: QB · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/blake-roskopf-46155022/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-007",
    "name": "Carson White",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 306,
    "status": "ELSEWHERE",
    "school": {
      "name": "Iowa Colony",
      "address": "Iowa Colony, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 207 · 247 rating 89 · Listed: QB · 247 lists commitment: Oklahoma State",
    "links": {
      "s247": "https://247sports.com/Player/carson-white-46143662/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-008",
    "name": "Dane Weber",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 307,
    "status": "ELSEWHERE",
    "school": {
      "name": "Chaparral",
      "address": "Temecula, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0.5 / 220 · 247 rating 88 · Listed: QB · 247 lists commitment: California",
    "links": {
      "s247": "https://247sports.com/Player/dane-weber-46155270/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-009",
    "name": "Kael Snyder",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 308,
    "status": "ELSEWHERE",
    "school": {
      "name": "Perry",
      "address": "Gilbert, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 200 · 247 rating 87 · Listed: QB · 247 lists commitment: Boise State",
    "links": {
      "s247": "https://247sports.com/Player/kael-snyder-46150670/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-010",
    "name": "DJ Hunter",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 309,
    "status": "ELSEWHERE",
    "school": {
      "name": "Buford",
      "address": "Buford, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · 247 rating 87 · Listed: QB · 247 lists commitment: James Madison",
    "links": {
      "s247": "https://247sports.com/Player/dj-hunter-46150725/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-011",
    "name": "Brayden Santibanez",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2027,
    "grade": null,
    "order": 310,
    "status": "ELSEWHERE",
    "school": {
      "name": "Collierville",
      "address": "Collierville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 205 · 247 rating 85 · Listed: QB · 247 lists commitment: Iowa",
    "links": {
      "s247": "https://247sports.com/Player/brayden-santibanez-46165172/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-012",
    "name": "Gary Walker",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 311,
    "status": "ELSEWHERE",
    "school": {
      "name": "Creekside",
      "address": "Fairburn, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 200 · 247 rating 91 · Listed: RB · 247 lists commitment: Clemson",
    "links": {
      "s247": "https://247sports.com/Player/gary-walker-46163000/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-013",
    "name": "CaDarius McMiller",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 312,
    "status": "ELSEWHERE",
    "school": {
      "name": "Tyler High",
      "address": "Tyler, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 196 · 247 rating 90 · Listed: RB · 247 lists commitment: Oregon",
    "links": {
      "s247": "https://247sports.com/Player/cadarius-mcmiller-46144140/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-014",
    "name": "Daylon Gordon",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 313,
    "status": "ELSEWHERE",
    "school": {
      "name": "Wylie",
      "address": "Wylie, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 195 · 247 rating 90 · Listed: RB · 247 lists commitment: Texas State",
    "links": {
      "s247": "https://247sports.com/Player/daylon-gordon-46157348/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-015",
    "name": "Ty Keys",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 314,
    "status": "ELSEWHERE",
    "school": {
      "name": "Poplarville",
      "address": "Poplarville, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · 247 rating 90 · Listed: RB · 247 lists commitment: Miami",
    "links": {
      "s247": "https://247sports.com/Player/ty-keys-46145046/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-016",
    "name": "Kingston Miles",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 315,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Mary's",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 195 · 247 rating 90 · Listed: RB · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/kingston-miles-46157912/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-017",
    "name": "Amarri Irvin",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 316,
    "status": "ELSEWHERE",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 220 · 247 rating 89 · Listed: RB · 247 lists commitment: Virginia Tech",
    "links": {
      "s247": "https://247sports.com/Player/amarri-irvin-46142805/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-018",
    "name": "Javian Jones-Priest",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 317,
    "status": "ELSEWHERE",
    "school": {
      "name": "Arlington Martin",
      "address": "Arlington, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 194 · 247 rating 89 · Listed: RB · 247 lists commitment: Virginia Tech",
    "links": {
      "s247": "https://247sports.com/Player/javian-jones-priest-46159699/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-019",
    "name": "Aymaud Sykes",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 318,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grant",
      "address": "Dry Prong, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 175 · 247 rating 88 · Listed: RB · 247 lists commitment: Tulane",
    "links": {
      "s247": "https://247sports.com/Player/aymaud-sykes-46165391/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-020",
    "name": "Noah Roberts",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 319,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 200 · 247 rating 88 · Listed: RB · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/noah-roberts-46151437/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-021",
    "name": "Jayshon Gibson",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 320,
    "status": "ELSEWHERE",
    "school": {
      "name": "Richland",
      "address": "North Richland Hills, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 185 · 247 rating 88 · Listed: RB · 247 lists commitment: UCLA",
    "links": {
      "s247": "https://247sports.com/Player/jayshon-gibson-46150802/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-022",
    "name": "Tylek Lewis",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 321,
    "status": "ELSEWHERE",
    "school": {
      "name": "Zachary",
      "address": "Zachary, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 210 · 247 rating 88 · Listed: RB · 247 lists commitment: Syracuse",
    "links": {
      "s247": "https://247sports.com/Player/tylek-lewis-46145110/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-023",
    "name": "Triston Willis",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 322,
    "status": "ELSEWHERE",
    "school": {
      "name": "C.E. King",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 195 · 247 rating 88 · Listed: RB · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/triston-willis-46153677/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-024",
    "name": "Arwin Jackson",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 323,
    "status": "ELSEWHERE",
    "school": {
      "name": "Miami Carol City",
      "address": "Opa Locka, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 170 · 247 rating 87 · Listed: RB · 247 lists commitment: Appalachian State",
    "links": {
      "s247": "https://247sports.com/Player/arwin-jackson-46146895/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-025",
    "name": "TJ Lewis",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 324,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bolingbrook",
      "address": "Bolingbrook, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 215 · 247 rating 87 · Listed: RB · 247 lists commitment: Oklahoma State",
    "links": {
      "s247": "https://247sports.com/Player/tj-lewis-46155479/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-026",
    "name": "Taye Reich",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 325,
    "status": "ELSEWHERE",
    "school": {
      "name": "Moorhead",
      "address": "Moorhead, MN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 200 · 247 rating 87 · Listed: RB · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/taye-reich-46150424/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-027",
    "name": "Victor Scott",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 326,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lancaster",
      "address": "Lancaster, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 195 · 247 rating 87 · Listed: RB · 247 lists commitment: North Texas",
    "links": {
      "s247": "https://247sports.com/Player/victor-scott-46145117/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-028",
    "name": "Jeremiah Stonewall",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 327,
    "status": "OFFERED",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 86 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jeremiah-stonewall-46153370/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-029",
    "name": "Mikel Stephen",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 328,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lipscomb Academy",
      "address": "Nashville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 185 · 247 rating 86 · Listed: RB · 247 lists commitment: Duke",
    "links": {
      "s247": "https://247sports.com/Player/mikel-stephen-46151588/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-030",
    "name": "Kylonn Haynie",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 329,
    "status": "OFFERED",
    "school": {
      "name": "Omaha Central",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 200 · 247 rating 86 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kylonn-haynie-46148733/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-031",
    "name": "Mason Ball",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2027,
    "grade": null,
    "order": 330,
    "status": "ELSEWHERE",
    "school": {
      "name": "Jacksonville",
      "address": "Jacksonville, AR"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11.5 / 185 · 247 rating 86 · Listed: RB · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/mason-ball-46155652/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-032",
    "name": "Jamarin Simmons",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 331,
    "status": "ELSEWHERE",
    "school": {
      "name": "Amos P. Godby",
      "address": "Tallahassee, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 165 · 247 rating 98 · Listed: WR · 247 lists commitment: Clemson",
    "links": {
      "s247": "https://247sports.com/Player/jamarin-simmons-46150455/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-033",
    "name": "Eric McFarland III",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 332,
    "status": "ELSEWHERE",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-8 / 177 · 247 rating 94 · Listed: WR · 247 lists commitment: Texas A&M",
    "links": {
      "s247": "https://247sports.com/Player/eric-mcfarland-iii-46148083/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-034",
    "name": "Briceson Thrower Jr.",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 333,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Forney",
      "address": "Forney, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 185 · 247 rating 91 · Listed: WR · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/briceson-thrower-jr-46155048/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-035",
    "name": "Tre Moore",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 334,
    "status": "ELSEWHERE",
    "school": {
      "name": "Pflugerville Weiss",
      "address": "Pflugerville, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 200 · 247 rating 90 · Listed: WR · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/tre-moore-46143523/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-036",
    "name": "Quentin Burrell",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 335,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mount Carmel",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 200 · 247 rating 90 · Listed: WR · 247 lists commitment: Michigan",
    "links": {
      "s247": "https://247sports.com/Player/quentin-burrell-46139675/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-037",
    "name": "Julian Caldwell",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 336,
    "status": "ELSEWHERE",
    "school": {
      "name": "Argyle",
      "address": "Argyle, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 185 · 247 rating 90 · Listed: WR · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/julian-caldwell-46151294/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-038",
    "name": "Jabari Watkins",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 337,
    "status": "ELSEWHERE",
    "school": {
      "name": "Thomas County Central",
      "address": "Thomasville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 185 · 247 rating 90 · Listed: WR · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/jabari-watkins-46154730/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-039",
    "name": "Dontay Tyson",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 338,
    "status": "ELSEWHERE",
    "school": {
      "name": "Peoria",
      "address": "Peoria, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · 247 rating 90 · Listed: WR · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/dontay-tyson-46151181/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-040",
    "name": "Trey Haralson",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 339,
    "status": "ELSEWHERE",
    "school": {
      "name": "Tyler High",
      "address": "Tyler, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 180 · 247 rating 89 · Listed: WR · 247 lists commitment: SMU",
    "links": {
      "s247": "https://247sports.com/Player/trey-haralson-46144141/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-041",
    "name": "Jaiden Kelly-Murray",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 340,
    "status": "ELSEWHERE",
    "school": {
      "name": "Oceanside Collegiate Academy",
      "address": "Mount Pleasant, SC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 170 · 247 rating 89 · Listed: WR · 247 lists commitment: Colorado",
    "links": {
      "s247": "https://247sports.com/Player/jaiden-kelly-murray-46151857/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-042",
    "name": "Jordan Christie",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 341,
    "status": "ELSEWHERE",
    "school": {
      "name": "Southwest DeKalb",
      "address": "Decatur, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 190 · 247 rating 89 · Listed: WR · 247 lists commitment: Liberty",
    "links": {
      "s247": "https://247sports.com/Player/jordan-christie-46151855/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-043",
    "name": "Taurean Rawlins",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 342,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mount Vernon Presbyterian",
      "address": "Atlanta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 89 · Listed: WR · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/taurean-rawlins-46164019/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-044",
    "name": "Jeremiah Douglas",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 343,
    "status": "ELSEWHERE",
    "school": {
      "name": "Crandall",
      "address": "Crandall, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 170 · 247 rating 88 · Listed: WR · 247 lists commitment: Vanderbilt",
    "links": {
      "s247": "https://247sports.com/Player/jeremiah-douglas-46145101/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-045",
    "name": "Jaden Baldwin",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 344,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11.5 / 180 · 247 rating 88 · Listed: WR · 247 lists commitment: Pittsburgh",
    "links": {
      "s247": "https://247sports.com/Player/jaden-baldwin-46145701/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-046",
    "name": "Jaiden Fields",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 345,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hutto",
      "address": "Hutto, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 88 · Listed: WR · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/jaiden-fields-46156704/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-047",
    "name": "Kobe Haynes",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 346,
    "status": "ELSEWHERE",
    "school": {
      "name": "Whitney",
      "address": "Whitney, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 205 · 247 rating 88 · Listed: WR · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/kobe-haynes-46150053/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-048",
    "name": "Kyron Brown",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 347,
    "status": "ELSEWHERE",
    "school": {
      "name": "Amarillo Palo Duro",
      "address": "Amarillo, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 185 · 247 rating 88 · Listed: WR · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/kyron-brown-46165287/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-049",
    "name": "Brock Burrus",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 348,
    "status": "ELSEWHERE",
    "school": {
      "name": "Kell",
      "address": "Marietta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 190 · 247 rating 87 · Listed: WR · 247 lists commitment: West Virginia",
    "links": {
      "s247": "https://247sports.com/Player/brock-burrus-46154520/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-050",
    "name": "Antayvious Ellis",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 349,
    "status": "ELSEWHERE",
    "school": {
      "name": "Millard South",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 87 · Listed: WR · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/antayvious-ellis-46142374/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-051",
    "name": "Brody Knowles",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 350,
    "status": "ELSEWHERE",
    "school": {
      "name": "Southlake Carroll",
      "address": "Southlake, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 190 · 247 rating 87 · Listed: WR · 247 lists commitment: Illinois",
    "links": {
      "s247": "https://247sports.com/Player/brody-knowles-46153338/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-052",
    "name": "Trey Smith",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 351,
    "status": "ELSEWHERE",
    "school": {
      "name": "Williams Field",
      "address": "Gilbert, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 165 · 247 rating 87 · Listed: WR · 247 lists commitment: Arizona",
    "links": {
      "s247": "https://247sports.com/Player/trey-smith-46155030/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-053",
    "name": "Donovan McNabb Jr.",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 352,
    "status": "ELSEWHERE",
    "school": {
      "name": "Brophy College Preparatory",
      "address": "Phoenix, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 160 · 247 rating 87 · Listed: WR · 247 lists commitment: UNLV",
    "links": {
      "s247": "https://247sports.com/Player/donovan-mcnabb-jr-46150805/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-054",
    "name": "Austin Coles",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 353,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Thomas Aquinas",
      "address": "Fort Lauderdale, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 195 · 247 rating 87 · Listed: WR · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/austin-coles-46154221/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-055",
    "name": "Jackson Coleman",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 354,
    "status": "ELSEWHERE",
    "school": {
      "name": "Valor Christian",
      "address": "Littleton, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 185 · 247 rating 87 · Listed: WR · 247 lists commitment: Notre Dame",
    "links": {
      "s247": "https://247sports.com/Player/jackson-coleman-46156590/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-056",
    "name": "Maliek Brown",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 355,
    "status": "ELSEWHERE",
    "school": {
      "name": "Tyler Chapel Hill",
      "address": "Tyler, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 185 · 247 rating 87 · Listed: WR · 247 lists commitment: Kansas",
    "links": {
      "s247": "https://247sports.com/Player/maliek-brown-46158921/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-057",
    "name": "Braylon Deal",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 356,
    "status": "ELSEWHERE",
    "school": {
      "name": "Garland Naaman Forest",
      "address": "Garland, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 185 · 247 rating 87 · Listed: WR · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/braylon-deal-46161629/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-058",
    "name": "Roscoe Hayes",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 357,
    "status": "ELSEWHERE",
    "school": {
      "name": "Westlake",
      "address": "Atlanta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 170 · 247 rating 86 · Listed: WR · 247 lists commitment: West Virginia",
    "links": {
      "s247": "https://247sports.com/Player/roscoe-hayes-46147294/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-059",
    "name": "Zy Tassin",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 358,
    "status": "ELSEWHERE",
    "school": {
      "name": "Crestview",
      "address": "Crestview, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 190 · 247 rating 86 · Listed: WR · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/zy-tassin-46150338/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-060",
    "name": "Jordan Donahoo",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 359,
    "status": "ELSEWHERE",
    "school": {
      "name": "Oviedo",
      "address": "Oviedo, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 185 · 247 rating 86 · Listed: WR · 247 lists commitment: Ohio State",
    "links": {
      "s247": "https://247sports.com/Player/jordan-donahoo-46164180/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-061",
    "name": "Trysten Shaw",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 360,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mansfield Timberview",
      "address": "Arlington, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 160 · 247 rating 86 · Listed: WR · 247 lists commitment: Tulsa",
    "links": {
      "s247": "https://247sports.com/Player/trysten-shaw-46155778/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-062",
    "name": "Jordan Walley",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 361,
    "status": "ELSEWHERE",
    "school": {
      "name": "D'Iberville",
      "address": "D'Iberville, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 160 · 247 rating 86 · Listed: WR · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/jordan-walley-46164108/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-063",
    "name": "Derrick Martin",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 362,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lewisville",
      "address": "Lewisville, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 170 · unrated · Listed: WR · 247 lists commitment: Missouri State",
    "links": {
      "s247": "https://247sports.com/Player/derrick-martin-46153280/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-064",
    "name": "Khalil Ferguson",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 363,
    "status": "OFFERED",
    "school": {
      "name": "Loudoun Sports Academy",
      "address": "Leesburg, VA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 190 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/khalil-ferguson-46166629/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-065",
    "name": "Jacob Lockett",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2027,
    "grade": null,
    "order": 364,
    "status": "ELSEWHERE",
    "school": {
      "name": "Blue Valley",
      "address": "Stilwell, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 170 · unrated · Listed: WR · 247 lists commitment: Old Dominion",
    "links": {
      "s247": "https://247sports.com/Player/jacob-lockett-46147871/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-066",
    "name": "Gavin Brown",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2027,
    "grade": null,
    "order": 365,
    "status": "OFFERED",
    "school": {
      "name": "Queen Creek",
      "address": "Queen Creek, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 150 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/gavin-brown-46151849/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-067",
    "name": "Kaeden Penny",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 366,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bixby",
      "address": "Bixby, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 280 · 247 rating 98 · Listed: OT · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/kaeden-penny-46151261/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-068",
    "name": "Kennedy Brown",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 367,
    "status": "ELSEWHERE",
    "school": {
      "name": "Kingwood",
      "address": "Kingwood, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 285 · 247 rating 94 · Listed: OT · 247 lists commitment: Texas A&M",
    "links": {
      "s247": "https://247sports.com/Player/kennedy-brown-46152521/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-069",
    "name": "Jake Hildebrand",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 368,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5.5 / 311 · 247 rating 93 · Listed: OT · 247 lists commitment: Arizona State",
    "links": {
      "s247": "https://247sports.com/Player/jake-hildebrand-46150822/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-070",
    "name": "Cooper Hackett",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 369,
    "status": "ELSEWHERE",
    "school": {
      "name": "Fort Gibson",
      "address": "Fort Gibson, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6.5 / 250 · 247 rating 92 · Listed: OT · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/cooper-hackett-46156728/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-071",
    "name": "Niko Kampas",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 370,
    "status": "ELSEWHERE",
    "school": {
      "name": "NFL Academy",
      "address": "London, EN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7.5 / 294 · 247 rating 90 · Listed: OT · 247 lists commitment: Tennessee",
    "links": {
      "s247": "https://247sports.com/Player/niko-kampas-46159217/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-072",
    "name": "Jackson Roper",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 371,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cherry Creek",
      "address": "Englewood, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 305 · 247 rating 90 · Listed: OT · 247 lists commitment: UCLA",
    "links": {
      "s247": "https://247sports.com/Player/jackson-roper-46153223/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-073",
    "name": "Timi Aliu",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 372,
    "status": "ELSEWHERE",
    "school": {
      "name": "Locust Grove",
      "address": "Locust Grove, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 295 · 247 rating 90 · Listed: OT · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/timi-aliu-46161065/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-074",
    "name": "Mason Halliman",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 373,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lincoln-Way East",
      "address": "Frankfort, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 275 · 247 rating 89 · Listed: OT · 247 lists commitment: Illinois",
    "links": {
      "s247": "https://247sports.com/Player/mason-halliman-46155221/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-075",
    "name": "Mason Joshua",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 374,
    "status": "ELSEWHERE",
    "school": {
      "name": "Forney",
      "address": "Forney, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 268 · 247 rating 89 · Listed: OT · 247 lists commitment: Arizona",
    "links": {
      "s247": "https://247sports.com/Player/mason-joshua-46161064/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-076",
    "name": "Benjamin Lowther",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 375,
    "status": "ELSEWHERE",
    "school": {
      "name": "Peoria Centennial",
      "address": "Peoria, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 335 · 247 rating 88 · Listed: OT · 247 lists commitment: Stanford",
    "links": {
      "s247": "https://247sports.com/Player/benjamin-lowther-46149593/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-077",
    "name": "Tye Kennedy",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 376,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mountain View",
      "address": "Mesa, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 270 · 247 rating 88 · Listed: OT · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/tye-kennedy-46162261/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-078",
    "name": "Matt Erickson",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 377,
    "status": "ELSEWHERE",
    "school": {
      "name": "Millard North",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-8 / 280 · 247 rating 88 · Listed: OT · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/matt-erickson-46150898/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-079",
    "name": "Reed Gerken",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 378,
    "status": "ELSEWHERE",
    "school": {
      "name": "Perrysburg",
      "address": "Perrysburg, OH"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 305 · 247 rating 88 · Listed: OT · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/reed-gerken-46148203/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-080",
    "name": "Hudson Ingalsbe",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 379,
    "status": "ELSEWHERE",
    "school": {
      "name": "White Plains",
      "address": "Anniston, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 277 · 247 rating 88 · Listed: OT · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/hudson-ingalsbe-46165472/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-081",
    "name": "Josiah Wallace",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 380,
    "status": "ELSEWHERE",
    "school": {
      "name": "Glenbard West",
      "address": "Glen Ellyn, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-8 / 300 · 247 rating 88 · Listed: OT · 247 lists commitment: Northwestern",
    "links": {
      "s247": "https://247sports.com/Player/josiah-wallace-46158394/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-082",
    "name": "Corey Laga",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 381,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lemont",
      "address": "Lemont, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 250 · 247 rating 88 · Listed: OT · 247 lists commitment: Vanderbilt",
    "links": {
      "s247": "https://247sports.com/Player/corey-laga-46162587/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-083",
    "name": "Koen Hinzman",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 382,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hudson Area",
      "address": "Hudson, MI"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 285 · 247 rating 87 · Listed: OT · 247 lists commitment: Iowa State",
    "links": {
      "s247": "https://247sports.com/Player/koen-hinzman-46164004/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-084",
    "name": "RJ Clem",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 383,
    "status": "ELSEWHERE",
    "school": {
      "name": "Logansport",
      "address": "Logansport, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 265 · 247 rating 87 · Listed: OT · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/rj-clem-46159574/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-085",
    "name": "Teagan Parizek",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 384,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hendersonville",
      "address": "Hendersonville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 295 · 247 rating 87 · Listed: OT · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/teagan-parizek-46167345/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-086",
    "name": "Tyson Ross",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 385,
    "status": "ELSEWHERE",
    "school": {
      "name": "Andover",
      "address": "Andover, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 285 · 247 rating 87 · Listed: OT · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/tyson-ross-46161904/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-087",
    "name": "Caleb Siler",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 386,
    "status": "ELSEWHERE",
    "school": {
      "name": "Gunter",
      "address": "Gunter, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-8 / 290 · 247 rating 87 · Listed: OT · 247 lists commitment: Northwestern",
    "links": {
      "s247": "https://247sports.com/Player/caleb-siler-46163939/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-088",
    "name": "Joseph Hamer",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 387,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lakeville South",
      "address": "Lakeville, MN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 295 · 247 rating 86 · Listed: OT · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/joseph-hamer-46158419/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-089",
    "name": "Jaylen Hill",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 388,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lanett",
      "address": "Lanett, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 295 · 247 rating 86 · Listed: OT · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/jaylen-hill-46162004/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-090",
    "name": "Ty Greene",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 389,
    "status": "ELSEWHERE",
    "school": {
      "name": "Houston Stratford",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 290 · 247 rating 86 · Listed: OT · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/ty-greene-46164276/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-091",
    "name": "Gavin Ericson-Staton",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 390,
    "status": "ELSEWHERE",
    "school": {
      "name": "Montini Catholic",
      "address": "Lombard, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 270 · 247 rating 86 · Listed: OT · 247 lists commitment: Illinois",
    "links": {
      "s247": "https://247sports.com/Player/gavin-ericson-staton-46159091/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-092",
    "name": "Sonny Mullen",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 391,
    "status": "ELSEWHERE",
    "school": {
      "name": "Troy",
      "address": "Troy, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 280 · 247 rating 86 · Listed: OT · 247 lists commitment: Oklahoma State",
    "links": {
      "s247": "https://247sports.com/Player/sonny-mullen-46166839/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-093",
    "name": "Brendan Meaney",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 392,
    "status": "ELSEWHERE",
    "school": {
      "name": "Janesville",
      "address": "Janesville, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 260 · 247 rating 85 · Listed: OT · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/brendan-meaney-46162080/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-094",
    "name": "Zyion Wesley",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 393,
    "status": "ELSEWHERE",
    "school": {
      "name": "Edna Karr",
      "address": "New Orleans, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 275 · 247 rating 85 · Listed: OT · 247 lists commitment: Mississippi State",
    "links": {
      "s247": "https://247sports.com/Player/zyion-wesley-46156279/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-095",
    "name": "Jonathan Toney",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 394,
    "status": "ELSEWHERE",
    "school": {
      "name": "West Laurens",
      "address": "Dublin, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 268 · 247 rating 85 · Listed: OT · 247 lists commitment: Memphis",
    "links": {
      "s247": "https://247sports.com/Player/jonathan-toney-46159660/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-096",
    "name": "Henry Frazier",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 395,
    "status": "ELSEWHERE",
    "school": {
      "name": "Rogers",
      "address": "Rogers, AR"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 290 · 247 rating 85 · Listed: OT · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/henry-frazier-46165568/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-097",
    "name": "Nick Vecrumba",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 396,
    "status": "ELSEWHERE",
    "school": {
      "name": "Brownsburg",
      "address": "Brownsburg, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 285 · 247 rating 85 · Listed: OT · 247 lists commitment: Kansas",
    "links": {
      "s247": "https://247sports.com/Player/nick-vecrumba-46155677/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-098",
    "name": "Avery Timms",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 397,
    "status": "ELSEWHERE",
    "school": {
      "name": "Killeen",
      "address": "Killeen, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 290 · 247 rating 82 · Listed: OT · 247 lists commitment: North Texas",
    "links": {
      "s247": "https://247sports.com/Player/avery-timms-46153299/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-099",
    "name": "Brandon Hebert",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2027,
    "grade": null,
    "order": 398,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Shore",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 282 · unrated · Listed: OT · 247 lists commitment: Princeton",
    "links": {
      "s247": "https://247sports.com/Player/brandon-hebert-46164605/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-100",
    "name": "Peyton Miller",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 399,
    "status": "ELSEWHERE",
    "school": {
      "name": "Anna",
      "address": "Anna, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 290 · 247 rating 91 · Listed: IOL · 247 lists commitment: Florida",
    "links": {
      "s247": "https://247sports.com/Player/peyton-miller-46144299/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-101",
    "name": "Kyler Kuhn",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 400,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Pius X",
      "address": "Kansas City, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · 247 rating 90 · Listed: IOL · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/kyler-kuhn-46155294/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-102",
    "name": "Gus Corsair",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 401,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hays",
      "address": "Hays, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 285 · 247 rating 90 · Listed: IOL · 247 lists commitment: Oregon",
    "links": {
      "s247": "https://247sports.com/Player/gus-corsair-46150698/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-103",
    "name": "Will Slagle",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 402,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grinnell",
      "address": "Grinnell, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 280 · 247 rating 89 · Listed: IOL · 247 lists commitment: Iowa State",
    "links": {
      "s247": "https://247sports.com/Player/will-slagle-46151966/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-104",
    "name": "Keyon Hemphill-Woods",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 403,
    "status": "ELSEWHERE",
    "school": {
      "name": "Columbus",
      "address": "Columbus, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 275 · 247 rating 89 · Listed: IOL · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/keyon-hemphill-woods-46154227/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-105",
    "name": "DaJohn Yarborough",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 404,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 340 · 247 rating 89 · Listed: IOL · 247 lists commitment: California",
    "links": {
      "s247": "https://247sports.com/Player/dajohn-yarborough-46155167/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-106",
    "name": "Jaiden Thompson",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 405,
    "status": "ELSEWHERE",
    "school": {
      "name": "Rockmart",
      "address": "Rockmart, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 290 · 247 rating 88 · Listed: IOL · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/jaiden-thompson-46149614/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-107",
    "name": "Lincoln Mageo",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 406,
    "status": "ELSEWHERE",
    "school": {
      "name": "Oceanside",
      "address": "Oceanside, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 280 · 247 rating 88 · Listed: IOL · 247 lists commitment: Michigan",
    "links": {
      "s247": "https://247sports.com/Player/lincoln-mageo-46147045/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-108",
    "name": "Barrett Kitrell",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 407,
    "status": "ELSEWHERE",
    "school": {
      "name": "Ashland-Greenwood",
      "address": "Ashland, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 270 · 247 rating 88 · Listed: IOL · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/barrett-kitrell-46161834/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-109",
    "name": "Dylan Mota",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 408,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Patrick",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 270 · 247 rating 88 · Listed: IOL · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/dylan-mota-46164183/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-110",
    "name": "Shavezz Dixon",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 409,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lee County",
      "address": "Leesburg, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 325 · 247 rating 87 · Listed: IOL · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/shavezz-dixon-46154743/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-111",
    "name": "Bryson Hurt",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 410,
    "status": "ELSEWHERE",
    "school": {
      "name": "Gainesville",
      "address": "Gainesville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 300 · 247 rating 87 · Listed: IOL · 247 lists commitment: NC State",
    "links": {
      "s247": "https://247sports.com/Player/bryson-hurt-46152642/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-112",
    "name": "Aidan Ray",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 411,
    "status": "ELSEWHERE",
    "school": {
      "name": "Plano West",
      "address": "Plano, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5.5 / 300 · 247 rating 87 · Listed: IOL · 247 lists commitment: UCLA",
    "links": {
      "s247": "https://247sports.com/Player/aidan-ray-46167108/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-113",
    "name": "Stephan Hicks Jr.",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 412,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cibolo Steele",
      "address": "Cibolo, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 295 · 247 rating 87 · Listed: IOL · 247 lists commitment: Duke",
    "links": {
      "s247": "https://247sports.com/Player/stephan-hicks-jr-46166032/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-114",
    "name": "Reis Russell",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 413,
    "status": "ELSEWHERE",
    "school": {
      "name": "Valor Christian",
      "address": "Littleton, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 290 · 247 rating 87 · Listed: IOL · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/reis-russell-46145499/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-115",
    "name": "Tristan Dare",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 414,
    "status": "ELSEWHERE",
    "school": {
      "name": "Southlake Carroll",
      "address": "Southlake, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 290 · 247 rating 87 · Listed: IOL · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/tristan-dare-46146325/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-116",
    "name": "Bryce Vigness",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 415,
    "status": "ELSEWHERE",
    "school": {
      "name": "Papillion-La Vista",
      "address": "Papillion, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 285 · 247 rating 87 · Listed: IOL · 247 lists commitment: North Dakota State",
    "links": {
      "s247": "https://247sports.com/Player/bryce-vigness-46159815/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-117",
    "name": "Nico Ramos",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 416,
    "status": "ELSEWHERE",
    "school": {
      "name": "American Heritage",
      "address": "Plantation, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5.5 / 320 · 247 rating 86 · Listed: IOL · 247 lists commitment: Syracuse",
    "links": {
      "s247": "https://247sports.com/Player/nico-ramos-46163809/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-118",
    "name": "Luke Injaychock",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 417,
    "status": "ELSEWHERE",
    "school": {
      "name": "Nazareth Academy",
      "address": "La Grange Park, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 285 · 247 rating 86 · Listed: IOL · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/luke-injaychock-46154262/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-119",
    "name": "Jayden Mack",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 418,
    "status": "OFFERED",
    "school": {
      "name": "Hutto",
      "address": "Hutto, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 340 · 247 rating 86 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jayden-mack-46149670/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-120",
    "name": "Jackson Cook",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 419,
    "status": "ELSEWHERE",
    "school": {
      "name": "Austin Westlake",
      "address": "Austin, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 290 · 247 rating 86 · Listed: IOL · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/jackson-cook-46154645/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-121",
    "name": "Will Endicott",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 420,
    "status": "ELSEWHERE",
    "school": {
      "name": "Prosper",
      "address": "Prosper, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 275 · 247 rating 86 · Listed: IOL · 247 lists commitment: South Carolina",
    "links": {
      "s247": "https://247sports.com/Player/will-endicott-46160366/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-122",
    "name": "Jordan Carraway",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 421,
    "status": "OFFERED",
    "school": {
      "name": "Forney",
      "address": "Forney, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 320 · 247 rating 84 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordan-carraway-46145097/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-123",
    "name": "Abdus Kone",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 422,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Shore",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 315 · 247 rating 84 · Listed: IOL · 247 lists commitment: Maryland",
    "links": {
      "s247": "https://247sports.com/Player/abdus-kone-46159210/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-124",
    "name": "Aiden Williams",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 423,
    "status": "ELSEWHERE",
    "school": {
      "name": "Duncanville",
      "address": "Duncanville, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 290 · 247 rating 83 · Listed: IOL · 247 lists commitment: Texas State",
    "links": {
      "s247": "https://247sports.com/Player/aiden-williams-46145123/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-125",
    "name": "Joshua Shaw Jr.",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 424,
    "status": "ELSEWHERE",
    "school": {
      "name": "Immaculate Conception",
      "address": "Elmhurst, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 300 · unrated · Listed: IOL · 247 lists commitment: Northern Illinois",
    "links": {
      "s247": "https://247sports.com/Player/joshua-shaw-jr-46165358/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-126",
    "name": "Wilder Brasher",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2027,
    "grade": null,
    "order": 425,
    "status": "ELSEWHERE",
    "school": {
      "name": "Rabun Gap-Nacoochee",
      "address": "Rabun Gap, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 280 · unrated · Listed: IOL · 247 lists commitment: UConn",
    "links": {
      "s247": "https://247sports.com/Player/wilder-brasher-46146935/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-127",
    "name": "David Folorunsho",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 426,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · 247 rating 94 · Listed: DL · 247 lists commitment: Notre Dame",
    "links": {
      "s247": "https://247sports.com/Player/david-folorunsho-46158874/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-128",
    "name": "Zane Rowe",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 427,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 265 · 247 rating 92 · Listed: DL · 247 lists commitment: Oregon",
    "links": {
      "s247": "https://247sports.com/Player/zane-rowe-46139730/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-129",
    "name": "Alifeleti Tuihalamaka",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 428,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 260 · 247 rating 91 · Listed: DL · 247 lists commitment: USC",
    "links": {
      "s247": "https://247sports.com/Player/alifeleti-tuihalamaka-46149194/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-130",
    "name": "Sam LeJeune",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 429,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · 247 rating 91 · Listed: DL · 247 lists commitment: Florida State",
    "links": {
      "s247": "https://247sports.com/Player/sam-lejeune-46150692/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-131",
    "name": "Luke Starcevic",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 430,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 250 · 247 rating 91 · Listed: DL · 247 lists commitment: Clemson",
    "links": {
      "s247": "https://247sports.com/Player/luke-starcevic-46149472/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-132",
    "name": "Brayden Parks",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 431,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 305 · 247 rating 91 · Listed: DL · 247 lists commitment: Notre Dame",
    "links": {
      "s247": "https://247sports.com/Player/brayden-parks-46146752/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-133",
    "name": "John Archer",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 432,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 315 · 247 rating 91 · Listed: DL · 247 lists commitment: South Carolina",
    "links": {
      "s247": "https://247sports.com/Player/john-archer-46146916/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-134",
    "name": "Ezekiel Ayangbile",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 433,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 265 · 247 rating 90 · Listed: DL · 247 lists commitment: Miami",
    "links": {
      "s247": "https://247sports.com/Player/ezekiel-ayangbile-46146266/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-135",
    "name": "Santana Harvey",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 434,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 230 · 247 rating 90 · Listed: DL · 247 lists commitment: Clemson",
    "links": {
      "s247": "https://247sports.com/Player/santana-harvey-46155183/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-136",
    "name": "David Hill",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 435,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 300 · 247 rating 90 · Listed: DL · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/david-hill-46154801/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-137",
    "name": "K'Adrian Redmond",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 436,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 305 · 247 rating 90 · Listed: DL · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/kadrian-redmond-46150263/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-138",
    "name": "Eli Diane",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 437,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 275 · 247 rating 90 · Listed: DL · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/eli-diane-46155226/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-139",
    "name": "Nehemiah Ombati",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 438,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 275 · 247 rating 89 · Listed: DL · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/nehemiah-ombati-46159743/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-140",
    "name": "Antwan McKoy",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 439,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 295 · 247 rating 89 · Listed: DL · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/antwan-mckoy-46157504/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-141",
    "name": "Jaderian Jones",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 440,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 300 · 247 rating 89 · Listed: DL · 247 lists commitment: California",
    "links": {
      "s247": "https://247sports.com/Player/jaderian-jones-46149545/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-142",
    "name": "Dami Sowunmi",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 441,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 260 · 247 rating 89 · Listed: DL · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/dami-sowunmi-46158117/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-143",
    "name": "Jason Johnson",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 442,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 280 · 247 rating 89 · Listed: DL · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/jason-johnson-46162588/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-144",
    "name": "De'Voun Kendrick",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 443,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 275 · 247 rating 88 · Listed: DL · 247 lists commitment: Florida",
    "links": {
      "s247": "https://247sports.com/Player/devoun-kendrick-46158317/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-145",
    "name": "Maleek Lee",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 444,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 270 · 247 rating 88 · Listed: DL · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/maleek-lee-46159084/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-146",
    "name": "Keilan Neal",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 445,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 280 · 247 rating 88 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/keilan-neal-46153392/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-147",
    "name": "Marcellus Young Casario",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 446,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 260 · 247 rating 88 · Listed: DL · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/marcellus-young-casario-46159925/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-148",
    "name": "Jesiah Fields",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 447,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 250 · 247 rating 87 · Listed: DL · 247 lists commitment: Louisville",
    "links": {
      "s247": "https://247sports.com/Player/jesiah-fields-46155882/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-149",
    "name": "Khing Thibodeaux",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 448,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 260 · 247 rating 87 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/khing-thibodeaux-46148678/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-150",
    "name": "Stevan Thornton III",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 449,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 200 · 247 rating 87 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/stevan-thornton-iii-46164070/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-151",
    "name": "Markius Woods",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 450,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 305 · 247 rating 87 · Listed: DL · 247 lists commitment: Boston College",
    "links": {
      "s247": "https://247sports.com/Player/markius-woods-46165935/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-152",
    "name": "Darrien Neal",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 451,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1.5 / 285 · 247 rating 86 · Listed: DL · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/darrien-neal-46148173/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-153",
    "name": "Errol Demontagnac",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 452,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 290 · 247 rating 86 · Listed: DL · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/errol-demontagnac-46155802/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-154",
    "name": "Khyren Haywood",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 453,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 260 · 247 rating 86 · Listed: DL · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/khyren-haywood-46142211/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-155",
    "name": "Eli Thornton",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 454,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 315 · 247 rating 86 · Listed: DL · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/eli-thornton-46163675/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-156",
    "name": "Corey Randolph",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 455,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 305 · 247 rating 86 · Listed: DL · 247 lists commitment: Boston College",
    "links": {
      "s247": "https://247sports.com/Player/corey-randolph-46159113/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-157",
    "name": "Gage Geyer",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 456,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 270 · 247 rating 86 · Listed: DL · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/gage-geyer-46162137/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-158",
    "name": "Charles Nance",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 457,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 280 · 247 rating 86 · Listed: DL · 247 lists commitment: Western Michigan",
    "links": {
      "s247": "https://247sports.com/Player/charles-nance-46161500/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-159",
    "name": "Kaleb Exume",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 458,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 310 · 247 rating 85 · Listed: DL · 247 lists commitment: Boston College",
    "links": {
      "s247": "https://247sports.com/Player/kaleb-exume-46149458/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-160",
    "name": "Zarius Matavao",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 459,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 297 · 247 rating 85 · Listed: DL · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/zarius-matavao-46167688/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-161",
    "name": "Brenham Cherne",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 460,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 270 · 247 rating 84 · Listed: DL · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/brenham-cherne-46165509/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-162",
    "name": "Johnnie Fitzgerald III",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 461,
    "status": "ELSEWHERE",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 285 · 247 rating 83 · Listed: DL · 247 lists commitment: North Texas",
    "links": {
      "s247": "https://247sports.com/Player/johnnie-fitzgerald-iii-46152066/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-163",
    "name": "Seth Kidd",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 462,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 280 · 247 rating 83 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/seth-kidd-46169132/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-164",
    "name": "Zion Thornton",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 463,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 290 · unrated · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zion-thornton-46161639/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-165",
    "name": "Taccofah Lewis",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2027,
    "grade": null,
    "order": 464,
    "status": "OFFERED",
    "school": {
      "name": "(HS not listed)",
      "address": "--"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 288 · unrated · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/taccofah-lewis-46132860/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-166",
    "name": "Cameron Hall",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 465,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mansfield Summit",
      "address": "Arlington, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 235 · 247 rating 94 · Listed: Edge · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/cameron-hall-46157610/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-167",
    "name": "Uhila Wolfgramm",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 466,
    "status": "ELSEWHERE",
    "school": {
      "name": "Maple Mountain",
      "address": "Spanish Fork, UT"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 245 · 247 rating 93 · Listed: Edge · 247 lists commitment: BYU",
    "links": {
      "s247": "https://247sports.com/Player/uhila-wolfgramm-46152619/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-168",
    "name": "Prince Goldsby",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 467,
    "status": "ELSEWHERE",
    "school": {
      "name": "Blue Springs South",
      "address": "Blue Springs, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 205 · 247 rating 92 · Listed: Edge · 247 lists commitment: Ohio State",
    "links": {
      "s247": "https://247sports.com/Player/prince-goldsby-46162471/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-169",
    "name": "Marvin Nguetsop",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 468,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Thomas More",
      "address": "Oakdale, CT"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7.5 / 268 · 247 rating 90 · Listed: Edge · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/marvin-nguetsop-46159737/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-170",
    "name": "Ifeanyi Emedobi",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 469,
    "status": "ELSEWHERE",
    "school": {
      "name": "Northrop",
      "address": "Fort Wayne, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1.5 / 210 · 247 rating 89 · Listed: Edge · 247 lists commitment: Michigan",
    "links": {
      "s247": "https://247sports.com/Player/ifeanyi-emedobi-46162249/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-171",
    "name": "Juelz Batiste",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 470,
    "status": "ELSEWHERE",
    "school": {
      "name": "Edna Karr",
      "address": "New Orleans, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 230 · 247 rating 89 · Listed: Edge · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/juelz-batiste-46161309/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-172",
    "name": "Tommy Riordan",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 471,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hinsdale Central",
      "address": "Hinsdale, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 240 · 247 rating 89 · Listed: Edge · 247 lists commitment: Iowa",
    "links": {
      "s247": "https://247sports.com/Player/tommy-riordan-46154685/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-173",
    "name": "T.K. Cunningham",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 472,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 230 · 247 rating 89 · Listed: Edge · 247 lists commitment: Purdue",
    "links": {
      "s247": "https://247sports.com/Player/tk-cunningham-46130530/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-174",
    "name": "Keysan Taylor",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 473,
    "status": "ELSEWHERE",
    "school": {
      "name": "Guilford",
      "address": "Rockford, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 230 · 247 rating 89 · Listed: Edge · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/keysan-taylor-46159687/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-175",
    "name": "Chris Kasky",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 474,
    "status": "ELSEWHERE",
    "school": {
      "name": "Nazareth Academy",
      "address": "La Grange Park, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 225 · 247 rating 89 · Listed: Edge · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/chris-kasky-46147938/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-176",
    "name": "Clarence Johnson Jr.",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 475,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cretin Derham Hall",
      "address": "Saint Paul, MN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 225 · 247 rating 89 · Listed: Edge · 247 lists commitment: Kansas",
    "links": {
      "s247": "https://247sports.com/Player/clarence-johnson-jr-46163112/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-177",
    "name": "Jaylen Mercer",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 476,
    "status": "ELSEWHERE",
    "school": {
      "name": "Princeton",
      "address": "Cincinnati, OH"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 230 · 247 rating 88 · Listed: Edge · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/jaylen-mercer-46145741/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-178",
    "name": "Jaxon Holly",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 477,
    "status": "ELSEWHERE",
    "school": {
      "name": "Roswell",
      "address": "Roswell, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 225 · 247 rating 88 · Listed: Edge · 247 lists commitment: Florida State",
    "links": {
      "s247": "https://247sports.com/Player/jaxon-holly-46149514/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-179",
    "name": "Adriel Rojas",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 478,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Forsyth",
      "address": "Cumming, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 220 · 247 rating 88 · Listed: Edge · 247 lists commitment: Duke",
    "links": {
      "s247": "https://247sports.com/Player/adriel-rojas-46158454/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-180",
    "name": "Samuel Nelson",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 479,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bryant",
      "address": "Bryant, AR"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 225 · 247 rating 88 · Listed: Edge · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/samuel-nelson-46163732/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-181",
    "name": "Troy Mailo",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 480,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mullen",
      "address": "Denver, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 252 · 247 rating 88 · Listed: Edge · 247 lists commitment: Stanford",
    "links": {
      "s247": "https://247sports.com/Player/troy-mailo-46147113/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-182",
    "name": "Darin Graham",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 481,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mount Carmel",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 218 · 247 rating 88 · Listed: Edge · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/darin-graham-46162053/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-183",
    "name": "Brody Pfannenstiel",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 482,
    "status": "ELSEWHERE",
    "school": {
      "name": "Hoisington",
      "address": "Hoisington, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 225 · 247 rating 87 · Listed: Edge · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/brody-pfannenstiel-46159291/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-184",
    "name": "Ty Tautolo",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 483,
    "status": "OFFERED",
    "school": {
      "name": "Lake Stevens",
      "address": "Lake Stevens, WA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 240 · 247 rating 87 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ty-tautolo-46145956/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-185",
    "name": "Bryson Phoenix",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 484,
    "status": "ELSEWHERE",
    "school": {
      "name": "Alexandria",
      "address": "Alexandria, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 225 · 247 rating 87 · Listed: Edge · 247 lists commitment: Texas State",
    "links": {
      "s247": "https://247sports.com/Player/bryson-phoenix-46161501/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-186",
    "name": "Dominic Letlow",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 485,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cardinal Mooney",
      "address": "Youngstown, OH"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 230 · 247 rating 87 · Listed: Edge · 247 lists commitment: Pittsburgh",
    "links": {
      "s247": "https://247sports.com/Player/dominic-letlow-46149240/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-187",
    "name": "Olayiwola Taiwo",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 486,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lovejoy",
      "address": "Hampton, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 225 · 247 rating 87 · Listed: Edge · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/olayiwola-taiwo-46162419/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-188",
    "name": "Brian DeMoss",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 487,
    "status": "OFFERED",
    "school": {
      "name": "Simeon",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 210 · 247 rating 86 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/brian-demoss-46153531/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-189",
    "name": "Owen Roberts",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 488,
    "status": "ELSEWHERE",
    "school": {
      "name": "York",
      "address": "Elmhurst, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 230 · 247 rating 86 · Listed: Edge · 247 lists commitment: Purdue",
    "links": {
      "s247": "https://247sports.com/Player/owen-roberts-46161919/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-190",
    "name": "Caleb Jordan",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 489,
    "status": "ELSEWHERE",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 220 · 247 rating 83 · Listed: Edge · 247 lists commitment: Nevada",
    "links": {
      "s247": "https://247sports.com/Player/caleb-jordan-46159788/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-191",
    "name": "Xzavier Pfister",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2027,
    "grade": null,
    "order": 490,
    "status": "ELSEWHERE",
    "school": {
      "name": "Brookwood",
      "address": "Snellville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 230 · unrated · Listed: Edge · 247 lists commitment: Arkansas State",
    "links": {
      "s247": "https://247sports.com/Player/xzavier-pfister-46164665/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-192",
    "name": "Jhadyn Nelson",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 491,
    "status": "ELSEWHERE",
    "school": {
      "name": "Langham Creek",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 221 · 247 rating 94 · Listed: LB · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/jhadyn-nelson-46164194/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-193",
    "name": "Roman Igwebuike",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 492,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mount Carmel",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 220 · 247 rating 91 · Listed: LB · 247 lists commitment: Notre Dame",
    "links": {
      "s247": "https://247sports.com/Player/roman-igwebuike-46154637/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-194",
    "name": "Kobe Rhymes",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 493,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Kansas City",
      "address": "Kansas City, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 220 · 247 rating 90 · Listed: LB · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/kobe-rhymes-46154822/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-195",
    "name": "Tate Wallace",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 494,
    "status": "ELSEWHERE",
    "school": {
      "name": "Regina",
      "address": "Iowa City, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 230 · 247 rating 90 · Listed: LB · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/tate-wallace-46144698/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-196",
    "name": "Case Alexander",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 495,
    "status": "ELSEWHERE",
    "school": {
      "name": "Washington High",
      "address": "Washington, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 215 · 247 rating 89 · Listed: LB · 247 lists commitment: Penn State",
    "links": {
      "s247": "https://247sports.com/Player/case-alexander-46152524/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-197",
    "name": "David Parson",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 496,
    "status": "ELSEWHERE",
    "school": {
      "name": "Douglas County",
      "address": "Douglasville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 225 · 247 rating 89 · Listed: LB · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/david-parson-46158397/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-198",
    "name": "Gavin Stecker",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 497,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bettendorf",
      "address": "Bettendorf, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 192 · 247 rating 89 · Listed: LB · 247 lists commitment: Iowa",
    "links": {
      "s247": "https://247sports.com/Player/gavin-stecker-46153320/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-199",
    "name": "Keiran Govan",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 498,
    "status": "ELSEWHERE",
    "school": {
      "name": "Republic",
      "address": "Republic, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 89 · Listed: LB · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/keiran-govan-46165447/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-200",
    "name": "Aston Whiteside",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 499,
    "status": "ELSEWHERE",
    "school": {
      "name": "Burleson Centennial",
      "address": "Burleson, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 205 · 247 rating 89 · Listed: LB · 247 lists commitment: Texas A&M",
    "links": {
      "s247": "https://247sports.com/Player/aston-whiteside-46157574/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-201",
    "name": "Ellis McGaskin",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 500,
    "status": "ELSEWHERE",
    "school": {
      "name": "Williamson",
      "address": "Mobile, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · 247 rating 88 · Listed: LB · 247 lists commitment: Florida",
    "links": {
      "s247": "https://247sports.com/Player/ellis-mcgaskin-46144257/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-202",
    "name": "Drew Williams",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 501,
    "status": "ELSEWHERE",
    "school": {
      "name": "Sequoyah",
      "address": "Canton, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 88 · Listed: LB · 247 lists commitment: Kentucky",
    "links": {
      "s247": "https://247sports.com/Player/drew-williams-46159930/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-203",
    "name": "Braylon Williams",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 502,
    "status": "ELSEWHERE",
    "school": {
      "name": "Arlington Lamar",
      "address": "Arlington, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 220 · 247 rating 88 · Listed: LB · 247 lists commitment: SMU",
    "links": {
      "s247": "https://247sports.com/Player/braylon-williams-46144825/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-204",
    "name": "Aaron Williams",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 503,
    "status": "ELSEWHERE",
    "school": {
      "name": "Fort Bend Ridge Point",
      "address": "Missouri City, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 88 · Listed: LB · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/aaron-williams-46157576/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-205",
    "name": "Blake Betton",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 504,
    "status": "ELSEWHERE",
    "school": {
      "name": "Shakopee",
      "address": "Shakopee, MN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 200 · 247 rating 88 · Listed: LB · 247 lists commitment: Penn State",
    "links": {
      "s247": "https://247sports.com/Player/blake-betton-46155301/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-206",
    "name": "Cade Haug",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 505,
    "status": "ELSEWHERE",
    "school": {
      "name": "Katy",
      "address": "Katy, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 220 · 247 rating 88 · Listed: LB · 247 lists commitment: SMU",
    "links": {
      "s247": "https://247sports.com/Player/cade-haug-46145106/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-207",
    "name": "Theo Wilson",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 506,
    "status": "ELSEWHERE",
    "school": {
      "name": "Armwood",
      "address": "Seffner, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 230 · 247 rating 88 · Listed: LB · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/theo-wilson-46152659/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-208",
    "name": "Jake Godfree",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 507,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Gwinnett",
      "address": "Suwanee, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 218 · 247 rating 87 · Listed: LB · 247 lists commitment: NC State",
    "links": {
      "s247": "https://247sports.com/Player/jake-godfree-46147136/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-209",
    "name": "Marshaun Ivy",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 508,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cardinal Ritter College Prep",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 215 · 247 rating 87 · Listed: LB · 247 lists commitment: Arizona State",
    "links": {
      "s247": "https://247sports.com/Player/marshaun-ivy-46149424/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-210",
    "name": "Eli Harris",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 509,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 87 · Listed: LB · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/eli-harris-46152990/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-211",
    "name": "Kason Clayborne",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 510,
    "status": "ELSEWHERE",
    "school": {
      "name": "Sioux City East",
      "address": "Sioux City, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 225 · 247 rating 87 · Listed: LB · 247 lists commitment: Minnesota",
    "links": {
      "s247": "https://247sports.com/Player/kason-clayborne-46161151/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-212",
    "name": "Noah Renes",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 511,
    "status": "ELSEWHERE",
    "school": {
      "name": "Niceville",
      "address": "Niceville, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 225 · 247 rating 86 · Listed: LB · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/noah-renes-46149588/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-213",
    "name": "Rome Ewell",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 512,
    "status": "ELSEWHERE",
    "school": {
      "name": "Springtown",
      "address": "Springtown, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 210 · 247 rating 86 · Listed: LB · 247 lists commitment: Arizona",
    "links": {
      "s247": "https://247sports.com/Player/rome-ewell-46157683/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-214",
    "name": "Bryce Breeden",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 513,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bridge City",
      "address": "Bridge City, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · 247 rating 86 · Listed: LB · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/bryce-breeden-46157612/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-215",
    "name": "Sean Rice",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 514,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Laurence",
      "address": "Evergreen Park, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 210 · 247 rating 86 · Listed: LB · 247 lists commitment: Illinois",
    "links": {
      "s247": "https://247sports.com/Player/sean-rice-46162165/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-216",
    "name": "Broncs Baker",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 515,
    "status": "ELSEWHERE",
    "school": {
      "name": "Stansbury",
      "address": "Tooele, UT"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 215 · 247 rating 85 · Listed: LB · 247 lists commitment: West Virginia",
    "links": {
      "s247": "https://247sports.com/Player/broncs-baker-46155019/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-217",
    "name": "Nathan Jones",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 516,
    "status": "ELSEWHERE",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 230 · 247 rating 85 · Listed: LB · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/nathan-jones-46159165/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-218",
    "name": "Kei'Shjuan Telfair",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 517,
    "status": "ELSEWHERE",
    "school": {
      "name": "Euclid",
      "address": "Euclid, OH"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 160 · 247 rating 92 · Listed: CB · 247 lists commitment: Penn State",
    "links": {
      "s247": "https://247sports.com/Player/keishjuan-telfair-46153238/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-219",
    "name": "Daniel Yebit",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 518,
    "status": "ELSEWHERE",
    "school": {
      "name": "Yukon",
      "address": "Yukon, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 180 · 247 rating 91 · Listed: CB · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/daniel-yebit-46164727/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-220",
    "name": "Kameron Roberson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 519,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cy Springs",
      "address": "Cypress, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 91 · Listed: CB · 247 lists commitment: Houston",
    "links": {
      "s247": "https://247sports.com/Player/kameron-roberson-46158879/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-221",
    "name": "Jerry Outhouse Jr.",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 520,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Crowley",
      "address": "Fort Worth, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0.5 / 180 · 247 rating 91 · Listed: CB · 247 lists commitment: UCLA",
    "links": {
      "s247": "https://247sports.com/Player/jerry-outhouse-jr-46145113/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-222",
    "name": "Brandon Sherrard",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 521,
    "status": "ELSEWHERE",
    "school": {
      "name": "Shadow Creek",
      "address": "Pearland, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 180 · 247 rating 90 · Listed: CB · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/brandon-sherrard-46155809/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-223",
    "name": "Evan Via",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 522,
    "status": "ELSEWHERE",
    "school": {
      "name": "Ladue Horton Watkins",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · 247 rating 90 · Listed: CB · 247 lists commitment: Stanford",
    "links": {
      "s247": "https://247sports.com/Player/evan-via-46159600/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-224",
    "name": "Kamil Loud",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 523,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bishop Gorman",
      "address": "Las Vegas, NV"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0.5 / 170 · 247 rating 90 · Listed: CB · 247 lists commitment: California",
    "links": {
      "s247": "https://247sports.com/Player/kamil-loud-46153753/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-225",
    "name": "Montre Jackson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 524,
    "status": "ELSEWHERE",
    "school": {
      "name": "Garland Lakeview Centennial",
      "address": "Garland, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 90 · Listed: CB · 247 lists commitment: Texas",
    "links": {
      "s247": "https://247sports.com/Player/montre-jackson-46147419/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-226",
    "name": "Taelyn Mayo",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 525,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lewisville",
      "address": "Lewisville, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 185 · 247 rating 90 · Listed: CB · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/taelyn-mayo-46142231/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-227",
    "name": "Blake Jenkins",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 526,
    "status": "ELSEWHERE",
    "school": {
      "name": "Katy Tompkins",
      "address": "Katy, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1.5 / 185 · 247 rating 90 · Listed: CB · 247 lists commitment: Michigan",
    "links": {
      "s247": "https://247sports.com/Player/blake-jenkins-46160118/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-228",
    "name": "Aidyn Wiggins",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 527,
    "status": "ELSEWHERE",
    "school": {
      "name": "Byrnes",
      "address": "Duncan, SC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 183 · 247 rating 89 · Listed: CB · 247 lists commitment: Auburn",
    "links": {
      "s247": "https://247sports.com/Player/aidyn-wiggins-46165273/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-229",
    "name": "Chase Johnson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 528,
    "status": "ELSEWHERE",
    "school": {
      "name": "Emanuel County Institute",
      "address": "Twin City, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 150 · 247 rating 89 · Listed: CB · 247 lists commitment: Virginia Tech",
    "links": {
      "s247": "https://247sports.com/Player/chase-johnson-46151739/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-230",
    "name": "MJ Burnett",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 529,
    "status": "ELSEWHERE",
    "school": {
      "name": "Walton",
      "address": "Marietta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 202 · 247 rating 89 · Listed: CB · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/mj-burnett-46158522/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-231",
    "name": "Bryce Woods",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 530,
    "status": "ELSEWHERE",
    "school": {
      "name": "Woodward Academy",
      "address": "College Park, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 175 · 247 rating 88 · Listed: CB · 247 lists commitment: Virginia Tech",
    "links": {
      "s247": "https://247sports.com/Player/bryce-woods-46154505/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-232",
    "name": "Kamauri Whitfield",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 531,
    "status": "ELSEWHERE",
    "school": {
      "name": "The First Academy",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10.5 / 185 · 247 rating 88 · Listed: CB · 247 lists commitment: Florida",
    "links": {
      "s247": "https://247sports.com/Player/kamauri-whitfield-46154635/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-233",
    "name": "Mikyal Davis",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 532,
    "status": "ELSEWHERE",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 170 · 247 rating 88 · Listed: CB · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/mikyal-davis-46149592/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-234",
    "name": "Trenton Blaylock",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 533,
    "status": "ELSEWHERE",
    "school": {
      "name": "Atascocita",
      "address": "Humble, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 175 · 247 rating 88 · Listed: CB · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/trenton-blaylock-46146999/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-235",
    "name": "Elijajuan Houston",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 534,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Crowley",
      "address": "Fort Worth, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · 247 rating 88 · Listed: CB · 247 lists commitment: Arizona State",
    "links": {
      "s247": "https://247sports.com/Player/elijajuan-houston-46152705/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-236",
    "name": "Jaden Bibbs",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 535,
    "status": "ELSEWHERE",
    "school": {
      "name": "Coppell",
      "address": "Coppell, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 165 · 247 rating 88 · Listed: CB · 247 lists commitment: Utah",
    "links": {
      "s247": "https://247sports.com/Player/jaden-bibbs-46160858/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-237",
    "name": "Brandon Allen Jr.",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 536,
    "status": "ELSEWHERE",
    "school": {
      "name": "Westlake",
      "address": "Atlanta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 175 · 247 rating 88 · Listed: CB · 247 lists commitment: Mississippi State",
    "links": {
      "s247": "https://247sports.com/Player/brandon-allen-jr-46159628/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-238",
    "name": "Dolph McDonald",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 537,
    "status": "OFFERED",
    "school": {
      "name": "Morton",
      "address": "Morton, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 160 · 247 rating 87 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/dolph-mcdonald-46148876/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-239",
    "name": "Carl Jones Jr.",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 538,
    "status": "ELSEWHERE",
    "school": {
      "name": "Tampa Catholic",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 155 · 247 rating 87 · Listed: CB · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/carl-jones-jr-46162126/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-240",
    "name": "Dhillon McGee",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 539,
    "status": "ELSEWHERE",
    "school": {
      "name": "DeSoto",
      "address": "DeSoto, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0.5 / 175 · 247 rating 87 · Listed: CB · 247 lists commitment: Penn State",
    "links": {
      "s247": "https://247sports.com/Player/dhillon-mcgee-46140684/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-241",
    "name": "Noah Gillespie",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 540,
    "status": "ELSEWHERE",
    "school": {
      "name": "Broken Arrow",
      "address": "Broken Arrow, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · 247 rating 87 · Listed: CB · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/noah-gillespie-46155580/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-242",
    "name": "Silas Nuckles",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 541,
    "status": "OFFERED",
    "school": {
      "name": "Buford",
      "address": "Buford, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 87 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/silas-nuckles-46162214/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-243",
    "name": "Nazir Pitchford",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 542,
    "status": "ELSEWHERE",
    "school": {
      "name": "Palmetto",
      "address": "Palmetto, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 175 · 247 rating 86 · Listed: CB · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/nazir-pitchford-46157930/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-244",
    "name": "Otha Thomas IV",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 543,
    "status": "OFFERED",
    "school": {
      "name": "Pine Forest",
      "address": "Pensacola, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 170 · 247 rating 86 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/otha-thomas-iv-46151891/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-245",
    "name": "David Coleman Jr.",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 544,
    "status": "ELSEWHERE",
    "school": {
      "name": "Evans",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 165 · 247 rating 86 · Listed: CB · 247 lists commitment: Bowling Green",
    "links": {
      "s247": "https://247sports.com/Player/david-coleman-jr-46146582/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-246",
    "name": "Logan Debose",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 545,
    "status": "ELSEWHERE",
    "school": {
      "name": "Houston St. Thomas",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · 247 rating 86 · Listed: CB · 247 lists commitment: Houston",
    "links": {
      "s247": "https://247sports.com/Player/logan-debose-46166541/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-247",
    "name": "Alex Patton",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 546,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cibolo Steele",
      "address": "Cibolo, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 165 · 247 rating 86 · Listed: CB · 247 lists commitment: Duke",
    "links": {
      "s247": "https://247sports.com/Player/alex-patton-46137071/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-248",
    "name": "Cordaro Parham",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 547,
    "status": "ELSEWHERE",
    "school": {
      "name": "Jefferson",
      "address": "Jefferson, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 178 · 247 rating 86 · Listed: CB · 247 lists commitment: Michigan State",
    "links": {
      "s247": "https://247sports.com/Player/cordaro-parham-46166948/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-249",
    "name": "Kayden Battle",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 548,
    "status": "ELSEWHERE",
    "school": {
      "name": "McEachern",
      "address": "Powder Springs, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 170 · 247 rating 86 · Listed: CB · 247 lists commitment: Pittsburgh",
    "links": {
      "s247": "https://247sports.com/Player/kayden-battle-46165005/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-250",
    "name": "Johnny McNeil",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 549,
    "status": "ELSEWHERE",
    "school": {
      "name": "St. Pius X-St. Matthias Academy",
      "address": "Downey, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 160 · 247 rating 86 · Listed: CB · 247 lists commitment: Oregon State",
    "links": {
      "s247": "https://247sports.com/Player/johnny-mcneil-46158457/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-251",
    "name": "Jett Watson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 550,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 160 · 247 rating 86 · Listed: CB · 247 lists commitment: Boston College",
    "links": {
      "s247": "https://247sports.com/Player/jett-watson-46149847/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-252",
    "name": "Larry Morgan III",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 551,
    "status": "ELSEWHERE",
    "school": {
      "name": "West Boca Raton",
      "address": "Boca Raton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 165 · 247 rating 86 · Listed: CB · 247 lists commitment: South Florida",
    "links": {
      "s247": "https://247sports.com/Player/larry-morgan-iii-46148056/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-253",
    "name": "Jewellz Tapp",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 552,
    "status": "ELSEWHERE",
    "school": {
      "name": "John Curtis",
      "address": "River Ridge, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11.5 / 165 · 247 rating 86 · Listed: CB · 247 lists commitment: TCU",
    "links": {
      "s247": "https://247sports.com/Player/jewellz-tapp-46167367/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-254",
    "name": "Shahariam Thurston",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 553,
    "status": "ELSEWHERE",
    "school": {
      "name": "Arlington Lamar",
      "address": "Arlington, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 175 · 247 rating 85 · Listed: CB · 247 lists commitment: Iowa State",
    "links": {
      "s247": "https://247sports.com/Player/shahariam-thurston-46157580/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-255",
    "name": "Nasim Eason",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 554,
    "status": "ELSEWHERE",
    "school": {
      "name": "Higley",
      "address": "Gilbert, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 160 · 247 rating 85 · Listed: CB · 247 lists commitment: Arizona State",
    "links": {
      "s247": "https://247sports.com/Player/nasim-eason-46154554/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-256",
    "name": "Rilee Drew",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 555,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 168 · 247 rating 85 · Listed: CB · 247 lists commitment: Wake Forest",
    "links": {
      "s247": "https://247sports.com/Player/rilee-drew-46150244/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-257",
    "name": "Noah Willis",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 556,
    "status": "ELSEWHERE",
    "school": {
      "name": "Blessed Trinity Catholic",
      "address": "Roswell, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 170 · 247 rating 85 · Listed: CB · 247 lists commitment: Cincinnati",
    "links": {
      "s247": "https://247sports.com/Player/noah-willis-46166432/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-258",
    "name": "Raymon McKneely",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 557,
    "status": "OFFERED",
    "school": {
      "name": "Hinds C.C.",
      "address": "Raymond, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 185 · 247 rating 84 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/raymon-mckneely-46163838/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-259",
    "name": "Bryson Ford",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 558,
    "status": "OFFERED",
    "school": {
      "name": "North Gwinnett",
      "address": "Suwanee, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 180 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/bryson-ford-46163824/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-260",
    "name": "Cameron Goodwin",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 559,
    "status": "OFFERED",
    "school": {
      "name": "McArthur",
      "address": "Hollywood, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 175 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cameron-goodwin-46163518/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-261",
    "name": "Tristan Anderson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 560,
    "status": "OFFERED",
    "school": {
      "name": "Mississippi Gulf Coast C.C.",
      "address": "Perkinston, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 195 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/tristan-anderson-46141287/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-262",
    "name": "Jonivan Edwards",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2027,
    "grade": null,
    "order": 561,
    "status": "OFFERED",
    "school": {
      "name": "Pearl River C.C.",
      "address": "Poplarville, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 185 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jonivan-edwards-46169318/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-263",
    "name": "Cooper Witten",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 562,
    "status": "ELSEWHERE",
    "school": {
      "name": "Liberty Christian",
      "address": "Argyle, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1.5 / 220 · 247 rating 94 · Listed: S · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/cooper-witten-46150577/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-264",
    "name": "Semaj Stanford",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 563,
    "status": "ELSEWHERE",
    "school": {
      "name": "Broken Arrow",
      "address": "Broken Arrow, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 180 · 247 rating 94 · Listed: S · 247 lists commitment: Oregon",
    "links": {
      "s247": "https://247sports.com/Player/semaj-stanford-46146499/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-265",
    "name": "Tory Pittman III",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 564,
    "status": "ELSEWHERE",
    "school": {
      "name": "Millard North",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 189 · 247 rating 93 · Listed: S · 247 lists commitment: Nebraska",
    "links": {
      "s247": "https://247sports.com/Player/tory-pittman-iii-46139694/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-266",
    "name": "KJ Caldwell",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 565,
    "status": "ELSEWHERE",
    "school": {
      "name": "Parkview",
      "address": "Lilburn, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 176 · 247 rating 91 · Listed: S · 247 lists commitment: NC State",
    "links": {
      "s247": "https://247sports.com/Player/kj-caldwell-46155996/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-267",
    "name": "Tavares Harrington",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 566,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mount Carmel",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 175 · 247 rating 90 · Listed: S · 247 lists commitment: Michigan",
    "links": {
      "s247": "https://247sports.com/Player/tavares-harrington-46155142/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-268",
    "name": "Jeremiah Proctor",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 567,
    "status": "ELSEWHERE",
    "school": {
      "name": "Gainesville",
      "address": "Gainesville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 210 · 247 rating 90 · Listed: S · 247 lists commitment: Pittsburgh",
    "links": {
      "s247": "https://247sports.com/Player/jeremiah-proctor-46156908/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-269",
    "name": "Darrell Mattison",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 568,
    "status": "ELSEWHERE",
    "school": {
      "name": "Morgan Park",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0.5 / 160 · 247 rating 90 · Listed: S · 247 lists commitment: Ole Miss",
    "links": {
      "s247": "https://247sports.com/Player/darrell-mattison-46158983/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-270",
    "name": "Jaylen Scott",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 569,
    "status": "ELSEWHERE",
    "school": {
      "name": "Williamson",
      "address": "Mobile, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 165 · 247 rating 90 · Listed: S · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/jaylen-scott-46154318/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-271",
    "name": "Jayden Anding",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 570,
    "status": "ELSEWHERE",
    "school": {
      "name": "Ruston",
      "address": "Ruston, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · 247 rating 90 · Listed: S · 247 lists commitment: LSU",
    "links": {
      "s247": "https://247sports.com/Player/jayden-anding-46152579/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-272",
    "name": "Jalen Welch",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 571,
    "status": "ELSEWHERE",
    "school": {
      "name": "Grayson",
      "address": "Loganville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 190 · 247 rating 89 · Listed: S · 247 lists commitment: Syracuse",
    "links": {
      "s247": "https://247sports.com/Player/jalen-welch-46160368/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-273",
    "name": "Kailib Dillard",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 572,
    "status": "ELSEWHERE",
    "school": {
      "name": "Jenks",
      "address": "Jenks, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 88 · Listed: S · 247 lists commitment: Florida",
    "links": {
      "s247": "https://247sports.com/Player/kailib-dillard-46159825/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-274",
    "name": "Kennedy Green",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 573,
    "status": "ELSEWHERE",
    "school": {
      "name": "Douglas County",
      "address": "Douglasville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 195 · 247 rating 88 · Listed: S · 247 lists commitment: Mississippi State",
    "links": {
      "s247": "https://247sports.com/Player/kennedy-green-46153115/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-275",
    "name": "Alex Scott",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 574,
    "status": "ELSEWHERE",
    "school": {
      "name": "Toombs County",
      "address": "Lyons, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10.5 / 180 · 247 rating 88 · Listed: S · 247 lists commitment: NC State",
    "links": {
      "s247": "https://247sports.com/Player/alex-scott-46157719/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-276",
    "name": "Charles Roberts",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 575,
    "status": "ELSEWHERE",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 88 · Listed: S · 247 lists commitment: Maryland",
    "links": {
      "s247": "https://247sports.com/Player/charles-roberts-46143570/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-277",
    "name": "Jaden Walk-Green",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 576,
    "status": "ELSEWHERE",
    "school": {
      "name": "Corona Centennial",
      "address": "Corona, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 188 · 247 rating 88 · Listed: S · 247 lists commitment: Washington",
    "links": {
      "s247": "https://247sports.com/Player/jaden-walk-green-46154955/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-278",
    "name": "Marvin Joseph",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 577,
    "status": "ELSEWHERE",
    "school": {
      "name": "Baton Rouge Central",
      "address": "Baton Rouge, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 205 · 247 rating 87 · Listed: S · 247 lists commitment: Houston",
    "links": {
      "s247": "https://247sports.com/Player/marvin-joseph-46158643/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-279",
    "name": "Jabarri Lofton",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 578,
    "status": "ELSEWHERE",
    "school": {
      "name": "East St. Louis",
      "address": "East St. Louis, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 200 · 247 rating 87 · Listed: S · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/jabarri-lofton-46159927/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-280",
    "name": "James Roberson",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 579,
    "status": "ELSEWHERE",
    "school": {
      "name": "Allen",
      "address": "Allen, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 195 · 247 rating 87 · Listed: S · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/james-roberson-46157609/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-281",
    "name": "Braiden Graves",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 580,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bridgeland",
      "address": "Cypress, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · 247 rating 87 · Listed: S · 247 lists commitment: Kansas",
    "links": {
      "s247": "https://247sports.com/Player/braiden-graves-46157607/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-282",
    "name": "Savoy Guidry",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 581,
    "status": "ELSEWHERE",
    "school": {
      "name": "Holy Cross",
      "address": "New Orleans, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 87 · Listed: S · 247 lists commitment: Stanford",
    "links": {
      "s247": "https://247sports.com/Player/savoy-guidry-46157640/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-283",
    "name": "Julian Elzey",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 582,
    "status": "ELSEWHERE",
    "school": {
      "name": "Brookwood",
      "address": "Snellville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · 247 rating 87 · Listed: S · 247 lists commitment: Georgia Tech",
    "links": {
      "s247": "https://247sports.com/Player/julian-elzey-46154562/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-284",
    "name": "Jameer Cantrell",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 583,
    "status": "ELSEWHERE",
    "school": {
      "name": "Buford",
      "address": "Buford, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 175 · 247 rating 87 · Listed: S · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/jameer-cantrell-46151806/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-285",
    "name": "Tavon Bolden",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 584,
    "status": "ELSEWHERE",
    "school": {
      "name": "Atascocita",
      "address": "Humble, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 190 · 247 rating 86 · Listed: S · 247 lists commitment: Houston",
    "links": {
      "s247": "https://247sports.com/Player/tavon-bolden-46161017/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-286",
    "name": "Hayden Dixon",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 585,
    "status": "OFFERED",
    "school": {
      "name": "Creekside",
      "address": "Fairburn, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9.5 / 175 · 247 rating 85 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/hayden-dixon-46158536/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-287",
    "name": "Will Caston",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 586,
    "status": "ELSEWHERE",
    "school": {
      "name": "Fayetteville",
      "address": "Fayetteville, AR"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · 247 rating 85 · Listed: S · 247 lists commitment: Arkansas",
    "links": {
      "s247": "https://247sports.com/Player/will-caston-46160190/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-288",
    "name": "Luke Stevens",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 587,
    "status": "ELSEWHERE",
    "school": {
      "name": "Fort Worth Christian",
      "address": "North Richland Hills, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 85 · Listed: S · 247 lists commitment: Arizona",
    "links": {
      "s247": "https://247sports.com/Player/luke-stevens-46166897/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-289",
    "name": "Kesler Jenkins",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 588,
    "status": "OFFERED",
    "school": {
      "name": "Pearl River C.C.",
      "address": "Poplarville, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 175 · unrated · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kesler-jenkins-46143429/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-290",
    "name": "Tyler Bush",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 589,
    "status": "ELSEWHERE",
    "school": {
      "name": "North Crowley",
      "address": "Fort Worth, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 177 · unrated · Listed: S · 247 lists commitment: UTRGV",
    "links": {
      "s247": "https://247sports.com/Player/tyler-bush-46163585/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-291",
    "name": "Trevionn Morton",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 590,
    "status": "OFFERED",
    "school": {
      "name": "Hinds C.C.",
      "address": "Raymond, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · unrated · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/trevionn-morton-46148215/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-292",
    "name": "Gabriel Osborne Jr.",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 591,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mustang",
      "address": "Mustang, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 180 · 247 rating 98 · Listed: ATH · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/gabriel-osborne-jr-46159790/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-293",
    "name": "A'mir Sears",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 592,
    "status": "ELSEWHERE",
    "school": {
      "name": "Miami Columbus",
      "address": "Miami, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 178 · 247 rating 98 · Listed: ATH · 247 lists commitment: Miami",
    "links": {
      "s247": "https://247sports.com/Player/amir-sears-46151570/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-294",
    "name": "Myson Johnson-Cook",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 593,
    "status": "ELSEWHERE",
    "school": {
      "name": "East St. Louis",
      "address": "East St. Louis, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 235 · 247 rating 94 · Listed: ATH · 247 lists commitment: Auburn",
    "links": {
      "s247": "https://247sports.com/Player/myson-johnson-cook-46143247/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-295",
    "name": "Bode Sparrow",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 594,
    "status": "ELSEWHERE",
    "school": {
      "name": "Davis",
      "address": "Kaysville, UT"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 195 · 247 rating 93 · Listed: ATH · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/bode-sparrow-46143770/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-296",
    "name": "Israel Hammons",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 595,
    "status": "ELSEWHERE",
    "school": {
      "name": "Choctaw",
      "address": "Choctaw, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 225 · 247 rating 91 · Listed: ATH · 247 lists commitment: Oklahoma State",
    "links": {
      "s247": "https://247sports.com/Player/israel-hammons-46164012/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-297",
    "name": "Chris Harris Jr.",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 596,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lee's Summit West",
      "address": "Lee's Summit, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 90 · Listed: ATH · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/chris-harris-jr-46161018/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-298",
    "name": "Landon Blum",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 597,
    "status": "ELSEWHERE",
    "school": {
      "name": "Woodbine",
      "address": "Woodbine, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 200 · 247 rating 90 · Listed: ATH · 247 lists commitment: Penn State",
    "links": {
      "s247": "https://247sports.com/Player/landon-blum-46149188/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-299",
    "name": "Karece Hoyt",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 598,
    "status": "ELSEWHERE",
    "school": {
      "name": "Frisco Lone Star",
      "address": "Frisco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 90 · Listed: ATH · 247 lists commitment: Baylor",
    "links": {
      "s247": "https://247sports.com/Player/karece-hoyt-46144142/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-300",
    "name": "Jai Jones",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 599,
    "status": "ELSEWHERE",
    "school": {
      "name": "Chandler",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 175 · 247 rating 90 · Listed: ATH · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/jai-jones-46150626/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-301",
    "name": "Krew Jones",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 600,
    "status": "ELSEWHERE",
    "school": {
      "name": "Orem",
      "address": "Orem, UT"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 233 · 247 rating 90 · Listed: ATH · 247 lists commitment: Oklahoma",
    "links": {
      "s247": "https://247sports.com/Player/krew-jones-46143771/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-302",
    "name": "Lawrence Britt",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 601,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lausanne Collegiate School",
      "address": "Memphis, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 178 · 247 rating 90 · Listed: ATH · 247 lists commitment: Missouri",
    "links": {
      "s247": "https://247sports.com/Player/lawrence-britt-46154473/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-303",
    "name": "JJ Brown",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2027,
    "grade": null,
    "order": 602,
    "status": "ELSEWHERE",
    "school": {
      "name": "Parkview",
      "address": "Lilburn, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 300 · 247 rating 90 · Listed: ATH · 247 lists commitment: Clemson",
    "links": {
      "s247": "https://247sports.com/Player/jj-brown-46161034/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-304",
    "name": "Brayden Tyson",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 603,
    "status": "ELSEWHERE",
    "school": {
      "name": "Brookwood",
      "address": "Snellville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 235 · 247 rating 90 · Listed: ATH · 247 lists commitment: South Carolina",
    "links": {
      "s247": "https://247sports.com/Player/brayden-tyson-46141748/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-305",
    "name": "Davion Crumitie",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 604,
    "status": "ELSEWHERE",
    "school": {
      "name": "Rickards",
      "address": "Tallahassee, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 150 · 247 rating 89 · Listed: ATH · 247 lists commitment: Vanderbilt",
    "links": {
      "s247": "https://247sports.com/Player/davion-crumitie-46157280/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-306",
    "name": "Cristian Mbamarah",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 605,
    "status": "ELSEWHERE",
    "school": {
      "name": "Cherokee Trail",
      "address": "Aurora, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 175 · 247 rating 89 · Listed: ATH · 247 lists commitment: Northwestern",
    "links": {
      "s247": "https://247sports.com/Player/cristian-mbamarah-46158483/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-307",
    "name": "Brayden Booth",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 606,
    "status": "ELSEWHERE",
    "school": {
      "name": "South San Antonio",
      "address": "San Antonio, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 220 · 247 rating 89 · Listed: ATH · 247 lists commitment: North Carolina",
    "links": {
      "s247": "https://247sports.com/Player/brayden-booth-46152717/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-308",
    "name": "Ronnie Gomiller",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 607,
    "status": "ELSEWHERE",
    "school": {
      "name": "East St. Louis",
      "address": "East St. Louis, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 187 · 247 rating 89 · Listed: ATH · 247 lists commitment: Cincinnati",
    "links": {
      "s247": "https://247sports.com/Player/ronnie-gomiller-46145803/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-309",
    "name": "Kaston Lewis",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 608,
    "status": "ELSEWHERE",
    "school": {
      "name": "Iowa",
      "address": "Iowa, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 89 · Listed: ATH · 247 lists commitment: Texas Tech",
    "links": {
      "s247": "https://247sports.com/Player/kaston-lewis-46163162/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-310",
    "name": "Brian Dillard",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 609,
    "status": "ELSEWHERE",
    "school": {
      "name": "Evans",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 165 · 247 rating 88 · Listed: ATH · 247 lists commitment: South Florida",
    "links": {
      "s247": "https://247sports.com/Player/brian-dillard-46154732/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-311",
    "name": "Kaneilius Purdy",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 610,
    "status": "ELSEWHERE",
    "school": {
      "name": "Lake Wales",
      "address": "Lake Wales, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 190 · 247 rating 88 · Listed: ATH · 247 lists commitment: UCF",
    "links": {
      "s247": "https://247sports.com/Player/kaneilius-purdy-46146570/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-312",
    "name": "Jaxx DeJean",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2027,
    "grade": null,
    "order": 611,
    "status": "ELSEWHERE",
    "school": {
      "name": "Odebolt-Arthur",
      "address": "Odebolt, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 233 · 247 rating 87 · Listed: ATH · 247 lists commitment: Iowa",
    "links": {
      "s247": "https://247sports.com/Player/jaxx-dejean-46148046/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-313",
    "name": "Stanley Smart",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 612,
    "status": "ELSEWHERE",
    "school": {
      "name": "Benedictine Military School",
      "address": "Savannah, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 200 · 247 rating 87 · Listed: ATH · 247 lists commitment: Virginia Tech",
    "links": {
      "s247": "https://247sports.com/Player/stanley-smart-46151805/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-314",
    "name": "Kevin Jackson",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 613,
    "status": "ELSEWHERE",
    "school": {
      "name": "Shadow Creek",
      "address": "Pearland, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11.5 / 185 · 247 rating 84 · Listed: ATH · 247 lists commitment: Maryland",
    "links": {
      "s247": "https://247sports.com/Player/kevin-jackson-46146944/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of27-315",
    "name": "Brooklyn Bailey",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2027,
    "grade": null,
    "order": 614,
    "status": "ELSEWHERE",
    "school": {
      "name": "Mountain Vista",
      "address": "Littleton, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 162 · 247 rating 84 · Listed: ATH · 247 lists commitment: San Diego State",
    "links": {
      "s247": "https://247sports.com/Player/brooklyn-bailey-46159384/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-001",
    "name": "Jayden Wade",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 700,
    "status": "ELSEWHERE",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 190 · 247 rating 96 · Listed: QB · 247 lists commitment: Georgia",
    "links": {
      "s247": "https://247sports.com/Player/jayden-wade-46131982/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-002",
    "name": "Titus Huard",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 701,
    "status": "OFFERED",
    "school": {
      "name": "Valor Christian",
      "address": "Littleton, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 205 · 247 rating 90 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/titus-huard-46152644/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-003",
    "name": "Nash Henry",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 702,
    "status": "OFFERED",
    "school": {
      "name": "Norman North",
      "address": "Norman, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 210 · 247 rating 90 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/nash-henry-46161094/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-004",
    "name": "Luke Rubley",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 703,
    "status": "OFFERED",
    "school": {
      "name": "Regis Jesuit",
      "address": "Aurora, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 180 · 247 rating 89 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/luke-rubley-46150861/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-005",
    "name": "Matthew Lee",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 704,
    "status": "OFFERED",
    "school": {
      "name": "Loyola Academy",
      "address": "Wilmette, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 200 · 247 rating 88 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/matthew-lee-46159666/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-006",
    "name": "Trey Wright",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 705,
    "status": "OFFERED",
    "school": {
      "name": "Frisco Lone Star",
      "address": "Frisco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9.5 / 175 · 247 rating 88 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/trey-wright-46156668/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-007",
    "name": "Oscar Sloan",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 706,
    "status": "OFFERED",
    "school": {
      "name": "Center Grove",
      "address": "Greenwood, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 190 · 247 rating 87 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/oscar-sloan-46150827/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-008",
    "name": "Carter Morgan",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 707,
    "status": "OFFERED",
    "school": {
      "name": "Denton Guyer",
      "address": "Denton, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 200 · 247 rating 87 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/carter-morgan-46159601/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-009",
    "name": "Tristan Johnson",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 708,
    "status": "OFFERED",
    "school": {
      "name": "Rockhurst",
      "address": "Kansas City, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10.5 / 175 · 247 rating 86 · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/tristan-johnson-46165933/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-010",
    "name": "Chase Grove",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 709,
    "status": "OFFERED",
    "school": {
      "name": "North Central",
      "address": "Indianapolis, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 184 · unrated · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/chase-grove-46155304/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-011",
    "name": "Zealand Danielson",
    "jersey": "—",
    "positionGroup": "QB",
    "classYear": 2028,
    "grade": null,
    "order": 710,
    "status": "OFFERED",
    "school": {
      "name": "Yukon",
      "address": "Yukon, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 205 · unrated · Listed: QB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zealand-danielson-46159020/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-012",
    "name": "Jayshawn Mitchell",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 711,
    "status": "OFFERED",
    "school": {
      "name": "San Antonio Brennan",
      "address": "San Antonio, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 180 · 247 rating 90 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jayshawn-mitchell-46166449/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-013",
    "name": "Elijah Cromwell",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 712,
    "status": "OFFERED",
    "school": {
      "name": "Cherry Creek",
      "address": "Englewood, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 180 · 247 rating 90 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/elijah-cromwell-46153247/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-014",
    "name": "Zachary Belyeu",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 713,
    "status": "OFFERED",
    "school": {
      "name": "North Cobb",
      "address": "Kennesaw, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 210 · 247 rating 88 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zachary-belyeu-46153083/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-015",
    "name": "Jeremiah Tabor",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 714,
    "status": "OFFERED",
    "school": {
      "name": "Melissa",
      "address": "Melissa, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 220 · 247 rating 88 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jeremiah-tabor-46153261/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-016",
    "name": "Jhaheem Brown",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 715,
    "status": "OFFERED",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-8 / 170 · 247 rating 87 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jhaheem-brown-46161349/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-017",
    "name": "Kason Williams",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 716,
    "status": "OFFERED",
    "school": {
      "name": "Alexandria",
      "address": "Alexandria, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 190 · 247 rating 87 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kason-williams-46161517/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-018",
    "name": "Byron Brandon",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 717,
    "status": "OFFERED",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 185 · 247 rating 86 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/byron-brandon-46155695/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-019",
    "name": "Kai Robinson",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 718,
    "status": "OFFERED",
    "school": {
      "name": "Lutheran North",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 175 · 247 rating 85 · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kai-robinson-46165791/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-020",
    "name": "Darrik Ward Jr.",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 719,
    "status": "OFFERED",
    "school": {
      "name": "Crandall",
      "address": "Crandall, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 180 · unrated · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/darrik-ward-jr-46161997/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-021",
    "name": "Chrystian Ervin",
    "jersey": "—",
    "positionGroup": "RB",
    "classYear": 2028,
    "grade": null,
    "order": 720,
    "status": "OFFERED",
    "school": {
      "name": "Saguaro",
      "address": "Scottsdale, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 205 · unrated · Listed: RB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/chrystian-ervin-46167766/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-022",
    "name": "Braylon Clark",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 721,
    "status": "OFFERED",
    "school": {
      "name": "Providence Day School",
      "address": "Charlotte, NC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 188 · 247 rating 91 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/braylon-clark-46151079/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-023",
    "name": "Jaelyn Easterling-Flores",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 722,
    "status": "OFFERED",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 180 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jaelyn-easterling-flores-46151182/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-024",
    "name": "Jaden Hurndon",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 723,
    "status": "OFFERED",
    "school": {
      "name": "Longview",
      "address": "Longview, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jaden-hurndon-46155044/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-025",
    "name": "Derrell Hines Jr.",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 724,
    "status": "OFFERED",
    "school": {
      "name": "Carrollwood Day",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 170 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/derrell-hines-jr-46158469/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-026",
    "name": "Joshua Parker",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 725,
    "status": "OFFERED",
    "school": {
      "name": "Brandon",
      "address": "Brandon, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 185 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/joshua-parker-46163286/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-027",
    "name": "Carter St. Junious",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 726,
    "status": "OFFERED",
    "school": {
      "name": "Manvel",
      "address": "Manvel, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 185 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/carter-st-junious-46160123/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-028",
    "name": "Ryan Richmond-McDavis",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2028,
    "grade": null,
    "order": 727,
    "status": "OFFERED",
    "school": {
      "name": "Cardinal Ritter College Prep",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 160 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ryan-richmond-mcdavis-46158604/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-029",
    "name": "Baron Marshall",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 728,
    "status": "OFFERED",
    "school": {
      "name": "Blue Valley Northwest",
      "address": "Overland Park, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 175 · 247 rating 90 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/baron-marshall-46152068/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-030",
    "name": "David Thomas",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2028,
    "grade": null,
    "order": 729,
    "status": "OFFERED",
    "school": {
      "name": "Knoxville Catholic",
      "address": "Knoxville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 161 · 247 rating 88 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/david-thomas-46154575/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-031",
    "name": "Corderro Bennett",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 730,
    "status": "OFFERED",
    "school": {
      "name": "Morton",
      "address": "Hammond, IN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 190 · 247 rating 88 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/corderro-bennett-46161865/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-032",
    "name": "Gabriel Cabell",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 731,
    "status": "OFFERED",
    "school": {
      "name": "Christ Presbyterian Academy",
      "address": "Nashville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 200 · 247 rating 87 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/gabriel-cabell-46161230/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-033",
    "name": "Cameron Fuse",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 732,
    "status": "OFFERED",
    "school": {
      "name": "Lakeland",
      "address": "Lakeland, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 173 · 247 rating 86 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cameron-fuse-46150881/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-034",
    "name": "Antron Branch",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2028,
    "grade": null,
    "order": 733,
    "status": "OFFERED",
    "school": {
      "name": "McArthur",
      "address": "Hollywood, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 165 · 247 rating 86 · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/antron-branch-46161361/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-035",
    "name": "Jordyn Murray",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 734,
    "status": "OFFERED",
    "school": {
      "name": "Tampa Bay Tech",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 180 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordyn-murray-46165496/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-036",
    "name": "Doyle Morrison",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2028,
    "grade": null,
    "order": 735,
    "status": "OFFERED",
    "school": {
      "name": "Gainesville",
      "address": "Gainesville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 173 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/doyle-morrison-46166919/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-037",
    "name": "Hayden Green",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 736,
    "status": "OFFERED",
    "school": {
      "name": "North Crowley",
      "address": "Fort Worth, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 205 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/hayden-green-46161364/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-038",
    "name": "Camarre Palmer",
    "jersey": "—",
    "positionGroup": "WR_OUT",
    "classYear": 2028,
    "grade": null,
    "order": 737,
    "status": "OFFERED",
    "school": {
      "name": "Langham Creek",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 195 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/camarre-palmer-46165458/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-039",
    "name": "Chase Hancock",
    "jersey": "—",
    "positionGroup": "WR_SLOT",
    "classYear": 2028,
    "grade": null,
    "order": 738,
    "status": "OFFERED",
    "school": {
      "name": "Pulaski Academy",
      "address": "Little Rock, AR"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 160 · unrated · Listed: WR · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/chase-hancock-46158451/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-040",
    "name": "Israel Johnigan",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 739,
    "status": "OFFERED",
    "school": {
      "name": "Center",
      "address": "Kansas City, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 220 · 247 rating 90 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/israel-johnigan-46166488/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-041",
    "name": "Connor Arant",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 740,
    "status": "OFFERED",
    "school": {
      "name": "Bixby",
      "address": "Bixby, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 225 · 247 rating 90 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/connor-arant-46161620/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-042",
    "name": "Jack McNamara",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 741,
    "status": "OFFERED",
    "school": {
      "name": "Brother Rice",
      "address": "Oak Lawn, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 235 · 247 rating 89 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jack-mcnamara-46158061/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-043",
    "name": "Breck Brady",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 742,
    "status": "OFFERED",
    "school": {
      "name": "Mustang",
      "address": "Mustang, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 245 · 247 rating 89 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/breck-brady-46162331/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-044",
    "name": "Jordan McKinley",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 743,
    "status": "OFFERED",
    "school": {
      "name": "Loyola Academy",
      "address": "Wilmette, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 220 · 247 rating 88 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordan-mckinley-46155318/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-045",
    "name": "Max Jones",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 744,
    "status": "OFFERED",
    "school": {
      "name": "Parkway West",
      "address": "Ballwin, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 210 · 247 rating 88 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/max-jones-46165579/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-046",
    "name": "Bennett Conyers",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 745,
    "status": "OFFERED",
    "school": {
      "name": "Montgomery Bell Academy",
      "address": "Nashville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 215 · 247 rating 87 · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/bennett-conyers-46163975/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-047",
    "name": "Kemarion Jordan",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 746,
    "status": "OFFERED",
    "school": {
      "name": "Pine Forest",
      "address": "Pensacola, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 236 · unrated · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kemarion-jordan-46166673/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-048",
    "name": "Koleman Hendrix",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 747,
    "status": "OFFERED",
    "school": {
      "name": "Lubbock-Cooper Liberty",
      "address": "Lubbock, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 225 · unrated · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/koleman-hendrix-46161747/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-049",
    "name": "AJ Criss",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 748,
    "status": "OFFERED",
    "school": {
      "name": "Krum",
      "address": "Krum, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 205 · unrated · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/aj-criss-46168939/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-050",
    "name": "Sloan Blackwell",
    "jersey": "—",
    "positionGroup": "TE",
    "classYear": 2028,
    "grade": null,
    "order": 749,
    "status": "OFFERED",
    "school": {
      "name": "Waco Midway",
      "address": "Waco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 225 · unrated · Listed: TE · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/sloan-blackwell-46166606/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-051",
    "name": "R'Monie Edwards",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 750,
    "status": "OFFERED",
    "school": {
      "name": "Cy Ranch",
      "address": "Cypress, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 310 · 247 rating 91 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/rmonie-edwards-46153244/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-052",
    "name": "Wyatt VanBoening",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 751,
    "status": "OFFERED",
    "school": {
      "name": "Carmel Catholic",
      "address": "Mundelein, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 280 · 247 rating 90 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/wyatt-vanboening-46163620/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-053",
    "name": "Cannon Zubeck",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 752,
    "status": "OFFERED",
    "school": {
      "name": "Shawnee Mission East",
      "address": "Prairie Village, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 270 · 247 rating 90 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cannon-zubeck-46162138/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-054",
    "name": "Carter Barrett",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 753,
    "status": "OFFERED",
    "school": {
      "name": "Dowling Catholic",
      "address": "West Des Moines, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 305 · 247 rating 90 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/carter-barrett-46152199/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-055",
    "name": "Liam Davis",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 754,
    "status": "OFFERED",
    "school": {
      "name": "Hallsville",
      "address": "Hallsville, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5.5 / 305 · 247 rating 90 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/liam-davis-46165581/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-056",
    "name": "King Pitts",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 755,
    "status": "OFFERED",
    "school": {
      "name": "Kapa'a",
      "address": "Kapa'a, HI"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 270 · 247 rating 89 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/king-pitts-46150208/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-057",
    "name": "Reece Wilmes",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 756,
    "status": "OFFERED",
    "school": {
      "name": "Lawrence Free State",
      "address": "Lawrence, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 285 · 247 rating 89 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/reece-wilmes-46159544/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-058",
    "name": "Declan Heying",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 757,
    "status": "OFFERED",
    "school": {
      "name": "Des Moines Christian School",
      "address": "Des Moines, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 270 · 247 rating 88 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/declan-heying-46160784/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-059",
    "name": "Ryan Rodgers",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 758,
    "status": "OFFERED",
    "school": {
      "name": "Calvary Baptist Academy",
      "address": "Shreveport, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 280 · 247 rating 87 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ryan-rodgers-46165895/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-060",
    "name": "Hayden Shannon",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 759,
    "status": "OFFERED",
    "school": {
      "name": "PCM",
      "address": "Monroe, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 275 · 247 rating 87 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/hayden-shannon-46157325/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-061",
    "name": "Darrius Smiley",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 760,
    "status": "OFFERED",
    "school": {
      "name": "St. Mary's",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 290 · 247 rating 86 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/darrius-smiley-46152820/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-062",
    "name": "Gerrit DeWaard",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 761,
    "status": "OFFERED",
    "school": {
      "name": "Malcolm",
      "address": "Malcolm, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-7 / 300 · 247 rating 86 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/gerrit-dewaard-46166186/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-063",
    "name": "Cooper Clark",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 762,
    "status": "OFFERED",
    "school": {
      "name": "Mustang",
      "address": "Mustang, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 260 · 247 rating 86 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cooper-clark-46166947/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-064",
    "name": "Sean Sherman",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 763,
    "status": "OFFERED",
    "school": {
      "name": "Anna",
      "address": "Anna, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 340 · 247 rating 85 · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/sean-sherman-46163910/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-065",
    "name": "Thomas Inkelaar",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 764,
    "status": "OFFERED",
    "school": {
      "name": "Andover Central",
      "address": "Andover, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 330 · unrated · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/thomas-inkelaar-46166279/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-066",
    "name": "Chase Mayes",
    "jersey": "—",
    "positionGroup": "OL_SWING",
    "classYear": 2028,
    "grade": null,
    "order": 765,
    "status": "OFFERED",
    "school": {
      "name": "Cy Lakes",
      "address": "Katy, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 270 · unrated · Listed: OT · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/chase-mayes-46165424/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-067",
    "name": "Gavin Wilson",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 766,
    "status": "OFFERED",
    "school": {
      "name": "Bixby",
      "address": "Bixby, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 266 · 247 rating 90 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/gavin-wilson-46167624/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-068",
    "name": "Ty Hathaway",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 767,
    "status": "OFFERED",
    "school": {
      "name": "Lipscomb Academy",
      "address": "Nashville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 265 · 247 rating 89 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ty-hathaway-46166594/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-069",
    "name": "PJ Evans",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 768,
    "status": "OFFERED",
    "school": {
      "name": "Jackson Academy",
      "address": "Jackson, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3.5 / 310 · 247 rating 87 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/pj-evans-46152518/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-070",
    "name": "Jude Womack",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 769,
    "status": "OFFERED",
    "school": {
      "name": "Legacy Christian Academy",
      "address": "Frisco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 315 · 247 rating 86 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jude-womack-46164725/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-071",
    "name": "Colton Ott",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 770,
    "status": "OFFERED",
    "school": {
      "name": "Fairview",
      "address": "Boulder, CO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 310 · 247 rating 85 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/colton-ott-46159830/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-072",
    "name": "Ashton Coles",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 771,
    "status": "OFFERED",
    "school": {
      "name": "Ensworth",
      "address": "Nashville, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 325 · 247 rating 85 · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ashton-coles-46166595/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-073",
    "name": "Kendrick Morgan",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 772,
    "status": "OFFERED",
    "school": {
      "name": "Frisco Lone Star",
      "address": "Frisco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · unrated · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kendrick-morgan-46154282/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-074",
    "name": "Abram Bengard",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 773,
    "status": "OFFERED",
    "school": {
      "name": "Frisco Lone Star",
      "address": "Frisco, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 280 · unrated · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/abram-bengard-46151168/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-075",
    "name": "Carl Noisette",
    "jersey": "—",
    "positionGroup": "OL_INT",
    "classYear": 2028,
    "grade": null,
    "order": 774,
    "status": "OFFERED",
    "school": {
      "name": "Gainesville",
      "address": "Gainesville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 270 · unrated · Listed: IOL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/carl-noisette-46151909/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-076",
    "name": "Kameron McGee",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 775,
    "status": "OFFERED",
    "school": {
      "name": "Brother Rice",
      "address": "Oak Lawn, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 245 · 247 rating 98 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kameron-mcgee-46154559/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-077",
    "name": "Darieon Prescott",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 776,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bolingbrook",
      "address": "Bolingbrook, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 255 · 247 rating 95 · Listed: Edge · 247 lists commitment: Notre Dame",
    "links": {
      "s247": "https://247sports.com/Player/darieon-prescott-46154828/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-078",
    "name": "Antonio Thomas Jr.",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 777,
    "status": "OFFERED",
    "school": {
      "name": "Carrollwood Day",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 240 · 247 rating 93 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/antonio-thomas-jr-46155485/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-079",
    "name": "Landen Wade",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 778,
    "status": "OFFERED",
    "school": {
      "name": "Basha",
      "address": "Chandler, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 250 · 247 rating 91 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/landen-wade-46150755/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-080",
    "name": "Jevyn Severson",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 779,
    "status": "OFFERED",
    "school": {
      "name": "Madrid",
      "address": "Madrid, IA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 230 · 247 rating 91 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jevyn-severson-46158003/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-081",
    "name": "Jalanie George",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 780,
    "status": "OFFERED",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4.5 / 245 · 247 rating 90 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jalanie-george-46151179/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-082",
    "name": "Keoni Snipes",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 781,
    "status": "OFFERED",
    "school": {
      "name": "Saraland",
      "address": "Saraland, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 245 · 247 rating 90 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/keoni-snipes-46158544/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-083",
    "name": "Tristian Henderson",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 782,
    "status": "OFFERED",
    "school": {
      "name": "Pine Forest",
      "address": "Pensacola, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 225 · 247 rating 90 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/tristian-henderson-46158796/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-084",
    "name": "Steven McClendon",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 783,
    "status": "OFFERED",
    "school": {
      "name": "Douglas County",
      "address": "Douglasville, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 215 · 247 rating 90 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/steven-mcclendon-46162815/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-085",
    "name": "Chance Archangel",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 784,
    "status": "ELSEWHERE",
    "school": {
      "name": "Westgate",
      "address": "New Iberia, LA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 240 · 247 rating 89 · Listed: Edge · 247 lists commitment: Texas A&M",
    "links": {
      "s247": "https://247sports.com/Player/chance-archangel-46157646/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-086",
    "name": "Nasir Walker",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 785,
    "status": "OFFERED",
    "school": {
      "name": "Crean Lutheran",
      "address": "Irvine, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-6 / 230 · 247 rating 89 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/nasir-walker-46161471/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-087",
    "name": "DeMarcus Dale-Brown",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 786,
    "status": "OFFERED",
    "school": {
      "name": "Williamson",
      "address": "Mobile, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 230 · 247 rating 88 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/demarcus-dale-brown-46158391/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-088",
    "name": "Jaylen Johnson",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 787,
    "status": "OFFERED",
    "school": {
      "name": "Bishop Miege",
      "address": "Mission, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 210 · 247 rating 88 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jaylen-johnson-46164765/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-089",
    "name": "Remington Merlau",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 788,
    "status": "OFFERED",
    "school": {
      "name": "Rose Hill",
      "address": "Rose Hill, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 235 · 247 rating 87 · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/remington-merlau-46159564/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-090",
    "name": "LeRoi Kamtio",
    "jersey": "—",
    "positionGroup": "EDGE",
    "classYear": 2028,
    "grade": null,
    "order": 789,
    "status": "OFFERED",
    "school": {
      "name": "Gardner Edgerton",
      "address": "Gardner, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 230 · unrated · Listed: Edge · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/leroi-kamtio-46168067/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-091",
    "name": "Jameer Whyce",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 790,
    "status": "ELSEWHERE",
    "school": {
      "name": "Trotwood-Madison",
      "address": "Dayton, OH"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 270 · 247 rating 91 · Listed: DL · 247 lists commitment: Ohio State",
    "links": {
      "s247": "https://247sports.com/Player/jameer-whyce-46149358/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-092",
    "name": "RJ Wyms",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 791,
    "status": "OFFERED",
    "school": {
      "name": "College Park",
      "address": "The Woodlands, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 255 · 247 rating 91 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/rj-wyms-46161279/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-093",
    "name": "David Dotson",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 792,
    "status": "OFFERED",
    "school": {
      "name": "Atascocita",
      "address": "Humble, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 240 · 247 rating 91 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/david-dotson-46165795/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-094",
    "name": "Myles Tate",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 793,
    "status": "OFFERED",
    "school": {
      "name": "Woodward Academy",
      "address": "College Park, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 225 · 247 rating 90 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/myles-tate-46158244/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-095",
    "name": "Caleb Tucker",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 794,
    "status": "OFFERED",
    "school": {
      "name": "Mount Carmel",
      "address": "Chicago, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 355 · 247 rating 90 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/caleb-tucker-46154032/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-096",
    "name": "Zylen Little",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 795,
    "status": "OFFERED",
    "school": {
      "name": "Carrollwood Day",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1.5 / 290 · 247 rating 90 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zylen-little-46155261/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-097",
    "name": "Zayre Thomas",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 796,
    "status": "OFFERED",
    "school": {
      "name": "Raytown South",
      "address": "Kansas City, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 240 · 247 rating 89 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zayre-thomas-46158415/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-098",
    "name": "Tory Clark",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 797,
    "status": "OFFERED",
    "school": {
      "name": "Woodward Academy",
      "address": "College Park, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 275 · 247 rating 89 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/tory-clark-46160342/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-099",
    "name": "Chase Foster II",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 798,
    "status": "OFFERED",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 260 · 247 rating 89 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/chase-foster-ii-46151610/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-100",
    "name": "Andrae Maddox",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 799,
    "status": "OFFERED",
    "school": {
      "name": "Oxford",
      "address": "Oxford, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 280 · 247 rating 89 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/andrae-maddox-46142017/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-101",
    "name": "Isaac Kalubi Lukuni",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 800,
    "status": "OFFERED",
    "school": {
      "name": "Rabun Gap-Nacoochee",
      "address": "Rabun Gap, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · 247 rating 89 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/isaac-kalubi-lukuni-46165880/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-102",
    "name": "Savon Jamison",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 801,
    "status": "OFFERED",
    "school": {
      "name": "Joliet West",
      "address": "Joliet, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 250 · 247 rating 88 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/savon-jamison-46167374/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-103",
    "name": "Micah Santiago",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 802,
    "status": "OFFERED",
    "school": {
      "name": "Omaha Westside",
      "address": "Omaha, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 295 · 247 rating 88 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/micah-santiago-46159187/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-104",
    "name": "Logan Lokey",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 803,
    "status": "OFFERED",
    "school": {
      "name": "Denton Guyer",
      "address": "Denton, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 250 · 247 rating 88 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/logan-lokey-46150622/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-105",
    "name": "Antonio Flowers",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 804,
    "status": "OFFERED",
    "school": {
      "name": "Chambers",
      "address": "Charlotte, NC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 300 · 247 rating 88 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/antonio-flowers-46166813/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-106",
    "name": "Charles Ibe",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 805,
    "status": "OFFERED",
    "school": {
      "name": "Providence Day School",
      "address": "Charlotte, NC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 290 · 247 rating 87 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/charles-ibe-46148117/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-107",
    "name": "Noah Ross",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 806,
    "status": "OFFERED",
    "school": {
      "name": "Richardson",
      "address": "Richardson, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 295 · 247 rating 86 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/noah-ross-46155470/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-108",
    "name": "Bajani Jones",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 807,
    "status": "OFFERED",
    "school": {
      "name": "Lanier",
      "address": "Buford, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 305 · 247 rating 86 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/bajani-jones-46158610/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-109",
    "name": "Aaron Snell",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 808,
    "status": "OFFERED",
    "school": {
      "name": "Waxahachie",
      "address": "Waxahachie, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 265 · 247 rating 84 · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/aaron-snell-46158725/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-110",
    "name": "Jordyn Grant",
    "jersey": "—",
    "positionGroup": "DT",
    "classYear": 2028,
    "grade": null,
    "order": 809,
    "status": "OFFERED",
    "school": {
      "name": "College Park",
      "address": "The Woodlands, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 300 · unrated · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordyn-grant-46164723/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-111",
    "name": "Max Farmer",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 810,
    "status": "OFFERED",
    "school": {
      "name": "Klein Oak",
      "address": "Spring, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 280 · unrated · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/max-farmer-46165412/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-112",
    "name": "Jayln Smith",
    "jersey": "—",
    "positionGroup": "DE",
    "classYear": 2028,
    "grade": null,
    "order": 811,
    "status": "OFFERED",
    "school": {
      "name": "South Oak Cliff",
      "address": "Dallas, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 280 · unrated · Listed: DL · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jayln-smith-46168884/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-113",
    "name": "Jameer Miles",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 812,
    "status": "OFFERED",
    "school": {
      "name": "Carmel Catholic",
      "address": "Mundelein, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 192 · 247 rating 91 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jameer-miles-46162585/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-114",
    "name": "Blake Nesbitt",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 813,
    "status": "OFFERED",
    "school": {
      "name": "Kirksville",
      "address": "Kirksville, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2.5 / 220 · 247 rating 90 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/blake-nesbitt-46155036/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-115",
    "name": "Deshawn Simmons",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 814,
    "status": "OFFERED",
    "school": {
      "name": "San Antonio Harlan",
      "address": "San Antonio, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 215 · 247 rating 90 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/deshawn-simmons-46159192/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-116",
    "name": "Cale Britt",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 815,
    "status": "ELSEWHERE",
    "school": {
      "name": "Bishop Moore Catholic",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 209 · 247 rating 89 · Listed: LB · 247 lists commitment: Wisconsin",
    "links": {
      "s247": "https://247sports.com/Player/cale-britt-46162068/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-117",
    "name": "Travion Washington",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 816,
    "status": "OFFERED",
    "school": {
      "name": "Brandon",
      "address": "Brandon, MS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · 247 rating 88 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/travion-washington-46154903/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-118",
    "name": "Israel Samuel",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 817,
    "status": "OFFERED",
    "school": {
      "name": "Lake Highlands",
      "address": "Dallas, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 195 · 247 rating 88 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/israel-samuel-46166376/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-119",
    "name": "Reginald Ward",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 818,
    "status": "OFFERED",
    "school": {
      "name": "Williamson",
      "address": "Mobile, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 200 · 247 rating 87 · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/reginald-ward-46164781/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-120",
    "name": "Anthony Busby",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 819,
    "status": "OFFERED",
    "school": {
      "name": "St. Louis University",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 210 · unrated · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/anthony-busby-46161307/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-121",
    "name": "Dallas Gray",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 820,
    "status": "OFFERED",
    "school": {
      "name": "Wichita Northwest",
      "address": "Wichita, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 207 · unrated · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/dallas-gray-46166278/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-122",
    "name": "Tyce Payne",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 821,
    "status": "OFFERED",
    "school": {
      "name": "Vernon",
      "address": "Vernon, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 205 · unrated · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/tyce-payne-46167521/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-123",
    "name": "Jason Catchings",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 822,
    "status": "OFFERED",
    "school": {
      "name": "Richardson",
      "address": "Richardson, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 210 · unrated · Listed: LB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jason-catchings-46168076/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-124",
    "name": "Nekhi Lambeth",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 823,
    "status": "OFFERED",
    "school": {
      "name": "Desert Edge",
      "address": "Goodyear, AZ"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 175 · 247 rating 90 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/nekhi-lambeth-46151180/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-125",
    "name": "Man Robinson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 824,
    "status": "OFFERED",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 178 · 247 rating 89 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/man-robinson-46151818/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-126",
    "name": "Dale Perry",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 825,
    "status": "OFFERED",
    "school": {
      "name": "Langston Hughes",
      "address": "Fairburn, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 170 · 247 rating 89 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/dale-perry-46164404/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-127",
    "name": "Bryce Willingham",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 826,
    "status": "OFFERED",
    "school": {
      "name": "North Atlanta",
      "address": "Atlanta, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 180 · 247 rating 88 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/bryce-willingham-46158521/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-128",
    "name": "Kahmaree Crumity",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 827,
    "status": "OFFERED",
    "school": {
      "name": "Tallahassee Lincoln",
      "address": "Tallahassee, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9.5 / 173 · 247 rating 88 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kahmaree-crumity-46159419/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-129",
    "name": "Quinn Pollock",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 828,
    "status": "OFFERED",
    "school": {
      "name": "McEachern",
      "address": "Powder Springs, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 88 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/quinn-pollock-46165886/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-130",
    "name": "Zamfir Dailey Jr.",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 829,
    "status": "OFFERED",
    "school": {
      "name": "De Smet Jesuit",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 165 · 247 rating 88 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/zamfir-dailey-jr-46167070/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-131",
    "name": "Jordan Hall",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 830,
    "status": "OFFERED",
    "school": {
      "name": "Aledo",
      "address": "Aledo, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9.5 / 165 · 247 rating 87 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordan-hall-46153279/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-132",
    "name": "Sean Sigler",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 831,
    "status": "OFFERED",
    "school": {
      "name": "Thompson",
      "address": "Alabaster, AL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 195 · 247 rating 87 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/sean-sigler-46165537/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-133",
    "name": "Brendon Davis",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 832,
    "status": "OFFERED",
    "school": {
      "name": "Buford",
      "address": "Buford, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 173 · 247 rating 87 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/brendon-davis-46162763/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-134",
    "name": "Khristian Anderson",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 833,
    "status": "OFFERED",
    "school": {
      "name": "American Heritage",
      "address": "Plantation, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 180 · 247 rating 84 · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/khristian-anderson-46160927/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-135",
    "name": "Cordey Sherman",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 834,
    "status": "OFFERED",
    "school": {
      "name": "C.E. King",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 160 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cordey-sherman-46155288/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-136",
    "name": "Marco Munoz",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 835,
    "status": "OFFERED",
    "school": {
      "name": "San Antonio Brandeis",
      "address": "San Antonio, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 170 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/marco-munoz-46168415/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-137",
    "name": "Antonio Dural",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 836,
    "status": "OFFERED",
    "school": {
      "name": "Klein Oak",
      "address": "Spring, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 170 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/antonio-dural-46157351/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-138",
    "name": "Derek Templeton",
    "jersey": "—",
    "positionGroup": "CB",
    "classYear": 2028,
    "grade": null,
    "order": 837,
    "status": "OFFERED",
    "school": {
      "name": "Jones",
      "address": "Jones, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 170 · unrated · Listed: CB · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/derek-templeton-46169390/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-139",
    "name": "Jackson Parker",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 838,
    "status": "OFFERED",
    "school": {
      "name": "Garces Memorial",
      "address": "Bakersfield, CA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 185 · 247 rating 91 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jackson-parker-46165254/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-140",
    "name": "Braylen Bedford",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 839,
    "status": "OFFERED",
    "school": {
      "name": "Brentwood Academy",
      "address": "Brentwood, TN"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10.5 / 170 · 247 rating 90 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/braylen-bedford-46139764/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-141",
    "name": "Kentrell Gaddis II",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 840,
    "status": "OFFERED",
    "school": {
      "name": "Choctaw",
      "address": "Choctaw, OK"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-11 / 165 · 247 rating 90 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kentrell-gaddis-ii-46166373/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-142",
    "name": "Drae Simmons",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 841,
    "status": "OFFERED",
    "school": {
      "name": "Atlanta",
      "address": "Atlanta, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 180 · 247 rating 90 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/drae-simmons-46167112/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-143",
    "name": "Jarvious Owens Jr.",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 842,
    "status": "OFFERED",
    "school": {
      "name": "Langham Creek",
      "address": "Houston, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 175 · 247 rating 89 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jarvious-owens-jr-46164489/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-144",
    "name": "Bryce Hayes-Roberts",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 843,
    "status": "OFFERED",
    "school": {
      "name": "IMG Academy",
      "address": "Bradenton, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 89 · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/bryce-hayes-roberts-46165800/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-145",
    "name": "Desiray Christian",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 844,
    "status": "OFFERED",
    "school": {
      "name": "Emerald",
      "address": "Greenwood, SC"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-0 / 190 · unrated · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/desiray-christian-46165083/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-146",
    "name": "Cooper Cranston",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 845,
    "status": "OFFERED",
    "school": {
      "name": "Holcomb",
      "address": "Holcomb, KS"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 195 · unrated · Listed: S · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cooper-cranston-46167716/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-147",
    "name": "Isaiah Taylor",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 846,
    "status": "OFFERED",
    "school": {
      "name": "Keller Central",
      "address": "Keller, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 170 · 247 rating 94 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/isaiah-taylor-46160186/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-148",
    "name": "Grant Bowen",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 847,
    "status": "OFFERED",
    "school": {
      "name": "Immaculate Conception",
      "address": "Elmhurst, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-4 / 220 · 247 rating 90 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/grant-bowen-46161719/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-149",
    "name": "Ridge Janes",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 848,
    "status": "OFFERED",
    "school": {
      "name": "De Smet Jesuit",
      "address": "St. Louis, MO"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-5 / 225 · 247 rating 90 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/ridge-janes-46150287/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-150",
    "name": "Owen Price",
    "jersey": "—",
    "positionGroup": "ILB",
    "classYear": 2028,
    "grade": null,
    "order": 849,
    "status": "OFFERED",
    "school": {
      "name": "Central Catholic",
      "address": "Grand Island, NE"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 210 · 247 rating 90 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/owen-price-46167717/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-151",
    "name": "Brayden Bonik",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 850,
    "status": "OFFERED",
    "school": {
      "name": "Fort Bend Ridge Point",
      "address": "Missouri City, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 195 · 247 rating 89 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/brayden-bonik-46150522/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-152",
    "name": "Cole Pollock",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 851,
    "status": "OFFERED",
    "school": {
      "name": "McEachern",
      "address": "Powder Springs, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 185 · 247 rating 88 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/cole-pollock-46159227/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-153",
    "name": "Kameron Battle",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 852,
    "status": "OFFERED",
    "school": {
      "name": "Carrollwood Day",
      "address": "Tampa, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-8.5 / 183 · 247 rating 87 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kameron-battle-46158257/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-154",
    "name": "Sharad Haire",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 853,
    "status": "OFFERED",
    "school": {
      "name": "Jones",
      "address": "Orlando, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 165 · 247 rating 85 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/sharad-haire-46159965/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-155",
    "name": "Trey Finney",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 854,
    "status": "OFFERED",
    "school": {
      "name": "Willis",
      "address": "Willis, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-9 / 165 · 247 rating 85 · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/trey-finney-46139954/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-156",
    "name": "Jordan Moore",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 855,
    "status": "OFFERED",
    "school": {
      "name": "Brother Rice",
      "address": "Oak Lawn, IL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-3 / 185 · unrated · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/jordan-moore-46156797/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-157",
    "name": "De'Jay Davenport",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 856,
    "status": "OFFERED",
    "school": {
      "name": "Bay",
      "address": "Panama City, FL"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-1 / 190 · unrated · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/dejay-davenport-46165535/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-158",
    "name": "Langston Hakeem",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 857,
    "status": "OFFERED",
    "school": {
      "name": "Woodward Academy",
      "address": "College Park, GA"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 5-10 / 175 · unrated · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/langston-hakeem-46161647/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  },
  {
    "id": "of28-159",
    "name": "Kipton Neighbors",
    "jersey": "—",
    "positionGroup": "SAF",
    "classYear": 2028,
    "grade": null,
    "order": 858,
    "status": "OFFERED",
    "school": {
      "name": "Gilmer",
      "address": "Gilmer, TX"
    },
    "birthday": "",
    "cell": "",
    "homeAddress": "",
    "parents": [],
    "callLog": [],
    "miscNotes": "247 offer board · 6-2 / 195 · unrated · Listed: ATH · uncommitted",
    "links": {
      "s247": "https://247sports.com/Player/kipton-neighbors-46159196/"
    },
    "updatedBy": "247 import",
    "updatedAt": "Aug 14, 2026"
  }
];

const _STAFF_GROUPS = [
  {
    label: "Coaches",
    members: [
      "Klein HC", "Gleeson OC", "Peterson DC", "Woodson Co-DC", "Weber STC",
      "Ward AHC/WR", "DeRuyter AHC Def", "Ellsworth QB", "Patterson RB",
      "Buford IR", "Lepak TE", "Schmidt OL", "Johnson DB", "Toth LB",
      "Mason OLB", "Wyatt DL", "Dove DT",
    ],
  },
  {
    label: "Assistants & Performance",
    members: [
      "Maguire Asst QB", "Ohara Asst RB", "Liddle Asst OL", "Emmanuel OL Analyst",
      "Kardulis Asst S", "Fowler ST QC", "Linton Def Analyst",
      "Jacobs S&C", "Reid Assoc S&C", "Carter Asst S&C", "Porter Asst S&C",
      "Young Asst S&C",
    ],
  },
  {
    label: "Support Staff",
    members: [
      "Trey Scott GM",
      "Taylor Braet Dir PP/HS Relations",
      "Greg Svarczkopf Dir Recruiting",
      "Maddi Gage Dir Player Engagement",
      "Kelsie Johnson Dir On-Campus Recruiting",
      "Zac Cox Asst Dir Scouting",
      "Preston Ellsworth Asst Dir Recruiting",
      "Hank Jacobs Asst Dir Recruiting",
      "Adrian Manning Asst Dir Scouting",
    ],
  },
];

window.BOARD_CONFIG = {
  school: {
    id: "kansas-state",
    name: "Kansas State Football",
    short: "K-STATE",
    primary: "#512888", // K-State Royal Purple
    accent: "#D1D1D1",  // K-State silver
  },
  staffGroups: _STAFF_GROUPS,
  /* Board admins — the only people who can stack the MAIN board and view
     every staffer's personal board. Names must match staffGroups exactly.
     Everyone else gets the main board view-only plus their own board.
     (Player info, call logs, evals, and photos stay editable by all staff.)
     K-State equivalents of HC / Chief of Staff / GM: */
  boardAdmins: ["Klein HC", "Trey Scott GM", "Greg Svarczkopf Dir Recruiting"],
  seedProspects: _SEED_PROSPECTS,
  staffPassword: "Recruit26", // change before sharing with staff
  // Shared cloud board (multi-user sync): create a free Supabase project,
  // run template/schema.sql in its SQL editor, then paste the keys here.
  // Without keys the app runs in single-device mode.
  // supabase: { url: "https://YOUR-PROJECT.supabase.co", anonKey: "YOUR-ANON-KEY" },
  // Compliance calendar: template ships the 2026-27 FBS calendar. Override
  // any date without a template change via recruitingCalendar: {...} — same
  // shape as DEFAULT_CALENDAR in the app (periods / portalWindows / keyDates).
};

/* == staffAuth (generated by scripts/gen_credentials.py — do not hand-edit) == */
window.BOARD_CONFIG.staffAuth = {
  "Adrian Manning Asst Dir Scouting": {
    "h": "88149d9cdefe3c7f895849fbe82f068f2e7913c5f6a39fc3cd221d0c2281fde7",
    "s": "f5797743286d00c841db3451"
  },
  "Buford IR": {
    "h": "dc290e13d0dad1867f2119645cedc3cd9d8c56b0909338cd9b5b8e04d277eae6",
    "s": "621696bf55b5b0052defff15"
  },
  "Carter Asst S&C": {
    "h": "fcb0c688b51f2383f414abd144bc41b45f5e0e3bdc9404af14ef0baf67124726",
    "s": "89221414100b1b61d7b1063e"
  },
  "DeRuyter AHC Def": {
    "h": "f5ba35f3170d48220f18961fc4a29db01902a27141c4f04dcb5bd7cc5862ac46",
    "s": "5fca9f0eb074721b3111d5a5"
  },
  "Dove DT": {
    "h": "1369b2977d5e6dbb95be17a9a4053f6884c9886a2acf507e3981884210ed4320",
    "s": "52006bfa3037732e166ac065"
  },
  "Ellsworth QB": {
    "h": "1b398024711d3b6f6f0bc93ee334d40c744f301c2e97fcd4aae048dedb47a6af",
    "s": "f0441b5ec15e1306b4696f14"
  },
  "Emmanuel OL Analyst": {
    "h": "bf882497c5a6aef36282e1e2925b693a48a9f7d468f8859ecf4b6b0c51485f20",
    "s": "19d7de57113b879604c3af0e"
  },
  "Fowler ST QC": {
    "h": "26495cdf865637236a37757b327c7add10bba319aed38de6187d365afcdd7afc",
    "s": "0d344b29c2c2ce315cafebd5"
  },
  "Gleeson OC": {
    "h": "f41a98c843165d12667763c974ad0af0bbece9b663edbd4f7594a00b73be053a",
    "s": "00a0bfa9b4c84dfe8daa8b03"
  },
  "Greg Svarczkopf Dir Recruiting": {
    "h": "e007ac0cf2b3121ba2d1e691e475d0ab35177a9de94803ee1351b7d9141c4a9d",
    "s": "8061ad4624eae3897ff843d1"
  },
  "Hank Jacobs Asst Dir Recruiting": {
    "h": "4c93394803fa9df594a175aaca8df62739e96598e394bec567fba010d008289f",
    "s": "351e0672990f98f7620062c8"
  },
  "Jacobs S&C": {
    "h": "d1b2287d31160488ec1b61303766a84be97a1ae4238f2fabd85e2910a409b020",
    "s": "56e775460d455a4d4ec167f3"
  },
  "Johnson DB": {
    "h": "e6918379d048654af9ccf5aec9c0f36e93dad03d503c35c0995af444568e3163",
    "s": "5fbd40052d50ba78971b21bc"
  },
  "Kardulis Asst S": {
    "h": "3397eaee2e96f4af7e6de04e38e28bb7798c2327a191f48a6e862ee860cc7414",
    "s": "30b41f7237ca6a24187d3854"
  },
  "Kelsie Johnson Dir On-Campus Recruiting": {
    "h": "5583a10638ac166fa45f4205282ff144443eda5c829dfbf66616de3179bde7ba",
    "s": "6bff00bbc4ec775a7d706f93"
  },
  "Klein HC": {
    "h": "2afe1bb7ee3321e816fe20748027204e11d579add1b65e0ae360498a17ba8d4e",
    "s": "293882f77ff5f9e234dc8aeb"
  },
  "Lepak TE": {
    "h": "68203e72201358d3be9cb1c835eeb9d49f4ea15b3a45874df6e4fea0742bf6a2",
    "s": "9122b17a7ab0f66d1579fd1d"
  },
  "Liddle Asst OL": {
    "h": "c51e9c05ff17b0895bbef838748063ab6a82f977d54627133f2875e4c5657235",
    "s": "38d83ce5875a049b0de8bafc"
  },
  "Linton Def Analyst": {
    "h": "99955d0cb8cd236173378f8a0da746df91aa06d5804f1c37121ab37f257422c2",
    "s": "4b0d668bb8f7af699a333424"
  },
  "Maddi Gage Dir Player Engagement": {
    "h": "e037982564166a5990295d8b9774238dfefd7950cbc51d831ec60eb76b625eed",
    "s": "2a7f39a1804b7b862c028804"
  },
  "Maguire Asst QB": {
    "h": "127303edd03236740717a443e5c786d48b4b694b3f70f57cd18fc22b83939030",
    "s": "7141893f657c7d42b36ddf1a"
  },
  "Mason OLB": {
    "h": "4bfe8acce889ddaef3fda8ebdb85cb79e9847d6de0e58f2f0b9e6ab319128a2d",
    "s": "bdd510cd11071a8a6c9d764b"
  },
  "Ohara Asst RB": {
    "h": "e4a8151693c41c04624d356932f307fa03f893dc0ab74fc1a7def8a74c739162",
    "s": "248f9cf3aa99b31d445582bc"
  },
  "Patterson RB": {
    "h": "2aea6690a43ee2af65ae462984354eab2dd5c5b3dc796824eda8ac4168885d8f",
    "s": "acc2d5a250aec6ce7ec16af9"
  },
  "Peterson DC": {
    "h": "159b018b6972a8980ce79ac04bc083d4b680285d4100bda02aeeb12df1af5375",
    "s": "f7a58ccc084f107d3aeca463"
  },
  "Porter Asst S&C": {
    "h": "59f42585bbf5898ed005f276645d1a011d439ba7f296435b6d63d2971cbe0c28",
    "s": "26c1f666f317a348a686b1b7"
  },
  "Preston Ellsworth Asst Dir Recruiting": {
    "h": "469d6c09f4876198dae730568a48ec42c3a776ef76ff131c8cc3063d7ecbf4e7",
    "s": "863b65b28b8ea29411ba1f50"
  },
  "Reid Assoc S&C": {
    "h": "7a0a3ab29b32612fd46f416175d38aeb57c9c738d97fd7a41d2a313b2a28cef5",
    "s": "d0afd3df098d96da76f675e9"
  },
  "Schmidt OL": {
    "h": "4c79476ed1bb05db5de73c858d98d01f17fe44bc1f528c9dbf7d51af8e674e16",
    "s": "e8ee4a9f50d8ca876c896958"
  },
  "Taylor Braet Dir PP/HS Relations": {
    "h": "244c59147956fac738cf3232540bd89000fd1e8ae000661dfa10905ca62bc0f5",
    "s": "6eea87a0e74320ed36e8bdbc"
  },
  "Toth LB": {
    "h": "82adfa3e5c71cd97817ffb9b1853eb479191268027cf2d8f0595ce7e93a05841",
    "s": "0850f40048a8e2a8557fbc7d"
  },
  "Trey Scott GM": {
    "h": "c9f4834e4550542191175cd08fbb8b69d59f49dff3db90273edeea9fa05dfb01",
    "s": "f4e4649af5e064d35f8d568c"
  },
  "Ward AHC/WR": {
    "h": "4ccbb67058877fe80729bd9b5f625a2ce99ead471dab5a3f7f890b2f7a7acb87",
    "s": "d3e73f8ec5caa567fd9162a6"
  },
  "Weber STC": {
    "h": "47802c41d7fb59d2565e00688c09ee1d900617803bfadfb797bb3088e4f1dfdc",
    "s": "5b5272b906f384139f132077"
  },
  "Woodson Co-DC": {
    "h": "78c0d17778aa515ad2283a13b3b0da4efa121b7e6b2cebd5e7874214b36de1dc",
    "s": "2e846bf2058c6b5380bd63e7"
  },
  "Wyatt DL": {
    "h": "b8985d4e201a59387b221bfc3f1a50c6c5fa945b527bd36a51159d5cb7927a19",
    "s": "d7d4b956672bb263ba85565c"
  },
  "Young Asst S&C": {
    "h": "a4d9d1ddd122605e876dbac3bd72de727832c7e888ae01f40437f7c87bdc5d3e",
    "s": "474497f9f2c9724a1b7f2c33"
  },
  "Zac Cox Asst Dir Scouting": {
    "h": "4c43c57a844bb95e5b0375cca12cddfdad4d9f64523bc14e00a6d5d06c11935a",
    "s": "84d94c88537fd961a0f218c7"
  }
};
/* == end staffAuth == */

/* generated by build_school.py */
window.BOARD_CONFIG.iconDataUrl = "data:image/png;base64,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";
