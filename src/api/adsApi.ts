///import { mockAds } from "../mock/mockAds";
        //import type { AdCategory, IAdvertisement } from "../types/ad";
        

//export const adsApi = {
  //getAll: async (): Promise<IAdvertisement[]> => {
    //return mockAds;
 //},

  //getById: async (id: string) => {
    //return mockAds.find((ad) => ad.id === id);
  //},

  //getByCategory: async (category: AdCategory) => {
    //return mockAds.filter((ad) => ad.category === category);
  //},
//};  


import { mockAds } from "../mock/mockAds";
import type { AdCategory, IAdvertisement } from "../types/ad";

const STORAGE_KEY = "college_bazar_ads";

function readStoredAds(): IAdvertisement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as IAdvertisement[]) : [];
  } catch {
    return [];
  }
}

function writeStoredAds(ads: IAdvertisement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
}

function getCombinedAds(): IAdvertisement[] {

  return [...readStoredAds(), ...mockAds];
}

const FAKE_DELAY_MS = 500;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type CreateAdInput = Omit<IAdvertisement, "id" | "createdAt">;

export const adsApi = {
  getAll: async (): Promise<IAdvertisement[]> => {
    await delay(FAKE_DELAY_MS);
    return getCombinedAds();
  },

  getById: async (id: string): Promise<IAdvertisement | undefined> => {
    await delay(FAKE_DELAY_MS);
    return getCombinedAds().find((ad) => ad.id === id);
  },

  getByCategory: async (category: AdCategory): Promise<IAdvertisement[]> => {
    await delay(FAKE_DELAY_MS);
    return getCombinedAds().filter((ad) => ad.category === category);
  },

  create: async (data: CreateAdInput): Promise<IAdvertisement> => {
    await delay(FAKE_DELAY_MS);

    const newAd: IAdvertisement = {
      ...data,
      id: `local-${Date.now()}`,
      createdAt: "Только что",
    };

    const stored = readStoredAds();
    writeStoredAds([newAd, ...stored]);

    return newAd;
  },
  
  getMyAds: async (): Promise<IAdvertisement[]> => {
    await delay(FAKE_DELAY_MS);
    return readStoredAds();
  },

  getByIds: async (ids: string[]): Promise<IAdvertisement[]> => {
    await delay(FAKE_DELAY_MS);
    const all = getCombinedAds();
    return ids
      .map((id) => all.find((ad) => ad.id === id))
      .filter((ad): ad is IAdvertisement => Boolean(ad));
  },
};