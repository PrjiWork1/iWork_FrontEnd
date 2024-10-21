export type Advertisement = {
  id: string;
  title: string;
  description: string;
  urlBanner: string;
  type: number;
  iWorkPro: boolean;
  userId: string;
  userName: string;
  completeName: string;
  categoryId: string;
  categoryDescription: string;
  advertisementRate: number;
  createdAt: string;
  price: number;
  itemAdvertisements: ItemsAdvertisements[] | null;
  isActive: boolean;
};


interface ItemsAdvertisements {
  name: string;
  price: number;
}

