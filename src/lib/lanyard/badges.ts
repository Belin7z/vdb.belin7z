export interface ProfileBadge {
  id: string;
  label: string;
  image: string;
}

// Emblemas fixos exibidos sempre nessa ordem no card.
// Ajuste o "label" de cada um caso queira um texto diferente na dica (tooltip).
export const PROFILE_BADGES: ProfileBadge[] = [
  { id: "badge-1", label: "Nitro Ouro", image: "/badges/badge-1.png" },
  { id: "badge-2", label: "Balance do HypeSquad", image: "/badges/badge-2.png" },
  {
    id: "badge-3",
    label: "Impulsionando o servidor desde 13 de fev. de 2026",
    image: "/badges/badge-3.png",
  },
  { id: "badge-4", label: "Originalmente Zulafos#0001", image: "/badges/badge-4.png" },
  { id: "badge-5", label: "Completou uma Missão", image: "/badges/badge-5.png" },
  {
    id: "badge-6",
    label: "Last Meadow Online · Nível 100 atingido",
    image: "/badges/badge-6.png",
  },
  { id: "badge-7", label: "Aprendiz", image: "/badges/badge-7.png" },
  { id: "badge-8", label: "Presentes Luminar", image: "/badges/badge-8.png" },
];
