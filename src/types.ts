export type Region = "hominum" | "orc";

export interface Demon {
  name: string;
  level: number;
  realmRarity: Record<Region, string>;
  element: string;
  notes: string;
}