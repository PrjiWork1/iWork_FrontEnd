import { Advertisement } from "./Advertisement";

export type Category = {
  id: string;
  description: string;
  isActive: boolean;
  normalAdvertisements: Advertisement[];
  dynamicAdvertisements: Advertisement[];
};
