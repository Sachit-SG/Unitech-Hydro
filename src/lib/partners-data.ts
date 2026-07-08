export type Partner = {
  id: string;
  name: string;
  logo: string;
};

/** Consortium & partner logos — files live in /public/partner/logos/. */
export const PARTNERS: Partner[] = [
  {
    id: "machhapuchhre-bank",
    name: "Machhapuchhre Bank",
    logo: "/partner/logos/machhapuchhre-bank.png",
  },
  {
    id: "laxmi-sunrise-bank",
    name: "Laxmi Sunrise Bank",
    logo: "/partner/logos/laxmi-sunrise-bank.png",
  },
  {
    id: "machhapuchhre-capital",
    name: "Machhapuchhre Capital",
    logo: "/partner/logos/machhapuchhre-capital.png",
  },
  {
    id: "laxmi-sunrise-capital",
    name: "Laxmi Sunrise Capital",
    logo: "/partner/logos/laxmi-sunrise-capital.png",
  },
  { id: "icfc", name: "ICFC Finance", logo: "/partner/logos/icfc.png" },
  { id: "icra-nepal", name: "ICRA Nepal", logo: "/partner/logos/icra-nepal.png" },
];
