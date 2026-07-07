export type Partner = {
  id: string;
  name: string;
  logo: string;
};

/** Consortium & partner logos — swap files in /public/partners/ to use official PNGs later. */
export const PARTNERS: Partner[] = [
  { id: "machhapuchhre-bank", name: "Machhapuchhre Bank", logo: "/partners/machhapuchhre-bank.svg" },
  { id: "laxmi-sunrise-bank", name: "Laxmi Sunrise Bank", logo: "/partners/laxmi-sunrise-bank.svg" },
  { id: "machhapuchhre-capital", name: "Machhapuchhre Capital", logo: "/partners/machhapuchhre-capital.svg" },
  { id: "laxmi-sunrise-capital", name: "Laxmi Sunrise Capital", logo: "/partners/laxmi-sunrise-capital.svg" },
  { id: "icfc", name: "ICFC Finance", logo: "/partners/icfc.svg" },
  { id: "icra-nepal", name: "ICRA Nepal", logo: "/partners/icra-nepal.svg" },
];
