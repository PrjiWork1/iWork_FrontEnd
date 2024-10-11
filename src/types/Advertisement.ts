export type Advertisement = {
  // AdType: NormalAd | DynamicAd;
  price: number;
  id: string;
  title: string;
  description: string;
  urlBanner: string;
  type: number;
  iWorkPro: boolean;
  userId: string;
  // user: User;
  categoryId: string;
  advertisementRate: number;
  createdAt: string;
  isActive: boolean;
};

// interface User {
//   userId: string;
//   username: string;
// }

// interface NormalAd {}

// interface DynamicAd {}
