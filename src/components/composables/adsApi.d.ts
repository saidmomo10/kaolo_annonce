import { Ref } from 'vue';

interface AdImage {
  path: string;
}

interface Subcategory {
  name: string;
}

interface Department {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: string;
}

interface Ad {
  id: number;
  title: string;
  price: number;
  sold: string;
  department: string;
  city: string;
  images: Image[];
  phone: string;
  description: string;
  department?: Department;
  subcategory?: Subcategory;
  user: User;
  state: string;
  delivery_status: string;
  created_at : date;
}

interface Comment {
  id: number;
  comment: string;
  created_at: date;
  user: User;
}

interface MyAdsData {
  sale: Ad[];
  all: Ad[];
}

export function useAds(): {
  showAd: (id: number) => Promise<void>;
  nextPage: Ref<string>;
  statusData: Ref<Ad[]>;
  previousPage: Ref<string>;
  currentPage: Ref<number>;
  totalPages: Ref<number>;
  editData: Ref<Ad>;
  comment: Ref<Comment[]>;
  userData: Ref<User>;
  myAdsData: Ref<MyAdsData>;
  mostVisitedAds: Ref<AdsData>;
  formData: Ref<{ comment: string; ad_id: string; user_id: string | null }>;
  commentData: Ref<Comment[]>;
  annonces: Ref<Ad[]>;
  addComment: (id: number) => Promise<void>;
  getComment: () => Promise<void>;
  UpdateAd: (id: number) => Promise<void>;
  deleteAd: (id: number) => Promise<void>;
  myAds: () => Promise<void>;
  getUser: () => Promise<void>;
  getMostVisitedAds: () => Promise<void>;
  updateStatus: (id: number) => Promise<void>;
  fetchPageAds: (pageNumber: number) => Promise<void>;
  fetchNextAds: (url: string) => Promise<void>;
  fetchPrevAds: (url: string) => Promise<void>;
  status: () => Promise<number | null>;
  fetchAnnonces: () => Promise<number | null>;
};
