export interface ProfileBadge {
  id: string;
  label: string;
  image: string;
}

// Emblemas fixos exibidos sempre nessa ordem no card.
// Ajuste o "label" de cada um caso queira um texto diferente na dica (tooltip).
export const PROFILE_BADGES: ProfileBadge[] = [
  { id: "badge-1", label: "Emblema 1", image: "/badges/badge-1.png" },
  { id: "badge-2", label: "Emblema 2", image: "/badges/badge-2.png" },
  { id: "badge-3", label: "Emblema 3", image: "/badges/badge-3.png" },
  { id: "badge-4", label: "Emblema 4", image: "/badges/badge-4.png" },
  { id: "badge-5", label: "Emblema 5", image: "/badges/badge-5.png" },
  { id: "badge-6", label: "Emblema 6", image: "/badges/badge-6.png" },
  { id: "badge-7", label: "Emblema 7", image: "/badges/badge-7.png" },
  { id: "badge-8", label: "Emblema 8", image: "/badges/badge-8.webp" },
];
