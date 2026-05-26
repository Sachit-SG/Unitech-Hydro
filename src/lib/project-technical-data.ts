/**
 * Technical particulars for public project pages.
 * Synchronized with `company-context.md` §2 — update both when source documents change.
 */

export type SpecRow = { particular: string; feature: string };

export const upperPhawaSiteContext: string[] = [
  "Project area near Phungling Bazaar (Taplejung district headquarters); access by approximately 20 km of earthen road east from Phungling.",
  "Components largely on Sikaicha and Dumrise VDCs (legacy naming); headworks at Ose Dobhan (~400 m downstream of the confluence with Soyang Khola); powerhouse near Dumrise (~100 m downstream of Siwa Khola and Phawa Khola).",
  "Intake on Phawa Khola at ~1,185 masl; powerhouse at Dumrise at ~915 masl. About 4.5 km water conveyance from intake to powerhouse; headrace alignment follows the left bank of Phawa Khola.",
  "Approximate coordinates: 87°46′05″E–87°48′12″E longitude; 27°19′04″N–27°21′02″N latitude.",
];

export const upperPhawaSalientRows: SpecRow[] = [
  { particular: "Project", feature: "Upper Phawa Khola Hydroelectric Project" },
  { particular: "Capacity", feature: "5.8 MW run-of-river (ROR)" },
  {
    particular: "Location (administrative)",
    feature: "Pathivara Yangbarak RM – Dumrise Shrijangha RM – Sikaicha, Taplejung",
  },
  { particular: "Source river", feature: "Phawa Khola" },
  { particular: "Design discharge", feature: "2.6 m³/s" },
  { particular: "Head", feature: "Gross 270 m; net 260.1 m" },
  { particular: "PPA energy (annual)", feature: "33.05 GWh" },
  {
    particular: "Dry (Marga 16 – Jestha 15)",
    feature: "10.00 GWh (~30.27%)",
  },
  {
    particular: "Wet (Jestha 16 – Marga 15)",
    feature: "23.05 GWh (~69.73%)",
  },
  { particular: "Connection point", feature: "Amarpur substation (132/33 kV)" },
  {
    particular: "Revenue (planning / model)",
    feature: "NPR 19.46 crore/year; 3% escalation for 8 years (per company materials)",
  },
];

export const upperPhawaStructureRows: SpecRow[] = [
  { particular: "Weir", feature: "15 m length, free-flow weir" },
  { particular: "Intake", feature: "2 orifice intakes" },
  {
    particular: "Approach canal",
    feature: "RCC rectangular 40 m (approx. 2.6 × 1.33 m)",
  },
  {
    particular: "Desanding basin and headpond",
    feature: "2 bays (42 m × 4.3 m × 3.42 m)",
  },
  {
    particular: "Headrace pipe",
    feature: "4,357 m; diameter 1.4 m to 1.2 m",
  },
  { particular: "Surge tank", feature: "37.7 m height; 3 m diameter" },
  {
    particular: "Penstock",
    feature: "461 m; 1.1 m diameter; 8–16 mm thickness",
  },
  { particular: "Powerhouse", feature: "Surface" },
  { particular: "Tailrace canal", feature: "60 m" },
  { particular: "Total alignment length", feature: "~5 km" },
  { particular: "E&M", feature: "2 × Pelton units" },
  {
    particular: "Interconnection",
    feature: "Amarpur substation — 8 km, 33 kV single-circuit (33/132 kV)",
  },
];

export const iwaSalientRows: SpecRow[] = [
  { particular: "Capacity", feature: "15.0 MW (feasibility-stage ROR)" },
  {
    particular: "Ownership / execution",
    feature:
      "51% Unitech Hydropower; planned SPV Unitech Iwa Hydro Energy Pvt. Ltd.",
  },
  { particular: "Districts", feature: "Taplejung and Panchthar" },
  { particular: "Gross head", feature: "400.10 m" },
  { particular: "Design discharge", feature: "4.36 m³/s" },
  {
    particular: "Conveyance",
    feature:
      "4,382 m headrace tunnel; 503 m headrace pipe; 210 m adit tunnel; 750 m penstock",
  },
  { particular: "Turbine technology", feature: "Vertical Pelton" },
  { particular: "Transmission", feature: "132 kV, 22 km line" },
  {
    particular: "Energy mix (feasibility)",
    feature: "26.26 GWh dry (31.8%) + 60.67 GWh wet (68.2%)",
  },
  { particular: "First-year revenue (estimate)", feature: "NPR 51.15 crore" },
  {
    particular: "Feasibility-level project cost",
    feature: "NPR 336.7 crore total; ~NPR 22.44 crore/MW",
  },
  { particular: "Construction period (plan)", feature: "3 years" },
  {
    particular: "Indicative returns (feasibility)",
    feature: "IRR 13.22%; benefit–cost ratio 1.56",
  },
  {
    particular: "Status",
    feature:
      "Feasibility study, IEE ToR, PPA / connection agreement process — not COD",
  },
];
