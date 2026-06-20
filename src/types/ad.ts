export type AdCategory = "textbooks" | "clothes" | "electronics" | "other";

export interface IAdvertisement {
  id: string;
  title: string;
  description: string;
  category: AdCategory;
  contacts: string;
  createdAt: string;
  price?: number;
  image?: string;
  sellerName?: string;
  sellerJoinedAt?: string;
}