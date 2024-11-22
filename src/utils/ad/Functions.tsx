import { Advertisement } from "types/Advertisement";

type ItemsAdvertisements = {
  name: string;
  price: number;
};

export const getAdModel = (items: ItemsAdvertisements[] | []) => {
  if (items.length === 0) return "Normal";
  return "Dinâmico";
};

export const getAdModelEnum = (items: ItemsAdvertisements[] | []) => {
  if (items.length === 0) return 0; // Normal
  return 1; // Dinamico
};

export const getAdType = (type: string) => {
  if (type === "Prata") return 0;
  if (type === "Ouro") return 1;
  if (type === "Diamante") return 2;
};

export const getiWorkPro = (iWorkPro: string) => {
  if (iWorkPro === "true") return true;
  if (iWorkPro === "false") return false;
};

export const getPlanType = (plan: number) => {
  if (plan === 0) return "Prata";
  if (plan === 1) return "Ouro";
  if (plan === 2) return "Diamante";
};

export const calcAdType = (rate: number) => {
  if (rate === 0.13) return "Diamante";
  if (rate === 0.12) return "Ouro";
  if (rate === 0.1) return "Prata";
};

export const getPriceRange = (advertisement: Advertisement) => {
  const prices =
    advertisement.itemAdvertisements?.map((item) => item.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const priceRange = prices.length > 0 ? `${minPrice} - R$ ${maxPrice}` : "";
  return priceRange;
};

export const getApiStatus = (status: string) => {
  if (status === "approved") return 0;
  if (status === "failure") return 1;
  if (status === "pending") return 2;
};
