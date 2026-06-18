import { mockAds } from "../mock/mockAds";
        import type { AdCategory, IAdvertisement } from "../types/ad";
        

export const adsApi = {
  getAll: async (): Promise<IAdvertisement[]> => {
    return mockAds;
  },

  getById: async (id: string) => {
    return mockAds.find((ad) => ad.id === id);
  },

  getByCategory: async (category: AdCategory) => {
    return mockAds.filter((ad) => ad.category === category);
  },
};  

