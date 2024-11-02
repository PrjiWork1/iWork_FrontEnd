type ItemsAdvertisements = {
  name: string;
  price: number;
};

export const getAdModel = (items: ItemsAdvertisements[] | null) => {
  if (items) return "Dinâmico";
  if (!items) return "Normal";
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
