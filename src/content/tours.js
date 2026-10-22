// ===== EDIT ME: TOURS =====
// To ADD a tour: copy one whole block { ... }, paste it below, change the details.
// ORDER does not matter: tours sort themselves by start date, and move to "Past" automatically after the end date.
// status: "open" | "soldout" | "private" | "waitlist"
// note: small extra label, e.g. "With Hatzola USA" (optional)
// details: paragraphs shown on the tour's own page. Leave [] if there is no page yet.
// To HIDE a tour without deleting it, add  hidden: true,
const S = "https://historyforthecurious.com/storage/upcoming-tours/gallery/";
export const tours = [
  { id: "italy-2026", title: "Italy", start: "2026-05-10", end: "2026-05-11", status: "open", details: [] },
  { id: "danube-cruise-2026", title: "Danube Riverboat Cruise", start: "2026-08-05", end: "2026-08-12", status: "open", details: [] },
  { id: "krakow-auschwitz", title: "Krakow & Auschwitz", start: "2026-10-13", end: "2026-10-15", status: "private", details: [] },
  { id: "paris-beyond-oct-2026", title: "Paris & Beyond", start: "2026-10-19", end: "2026-10-22", status: "soldout", details: [] },
  { id: "central-europe", title: "Central Europe", note: "With Hatzola USA", start: "2026-11-08", end: "2026-11-12", status: "open", details: [] },
  { id: "paris-beyond", title: "Paris & Beyond", start: "2027-03-29", end: "2027-04-01", status: "open", details: [] },
  { id: "provence", title: "Provence (Southern France)", start: "2027-05-17", end: "2027-05-20", status: "open",
    summary: "Sentier des Ocres, Avignon, Carpentras, Vauvert, Montpellier, Arles and Marseille, ending with a private boat tour of the Calanques.",
    leaders: "Rabbi Aubrey Hersh & Rabbi Dr Akiva Tatz",
    price: "$2,085 per person (flights not included; single supplement $475)",
    details: [
      "Monday 17th – Thursday 20th May 2027.",
      "Including Sentier des Ocres, medieval Avignon, ancient Carpentras and the village of Vauvert, as well as Montpellier, Arles and the magnificent shul in Marseille. To end, a private boat tour of the Calanques.",
    ],
    gallery: ["7K9UGlCj8h", "KRLmCiGc6F", "LO6twqBHwj", "bxuZevU3gU"].map((k) => S + `upcoming_tour_${k}.webp`) },
  { id: "holland", title: "Holland", start: "2027-07-12", end: "2027-07-15", status: "open", details: [] },
];
