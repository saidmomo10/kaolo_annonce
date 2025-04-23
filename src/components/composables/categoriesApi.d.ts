import { Ref } from 'vue';
import type { Department } from './adsApi';

interface Category {
  id: number;
  name: string;
  icone: string;
  ads_count: number;
  ads?: Ads;
}

interface Ads {
  id: number;
  title: string;
  sold: string;
  price: string;
  price_type: string;
  views: string;
  images: Image[];
  department?: Department;
  city?: City;
  subcategory?: Category;
}

interface AdImage {
  path: string;
}

interface Department{
  name: string;
}

interface City{
  name: string;
}

interface CategoryShow {
  ads: Ads[];
  subCategory: Category;
}

export function useCategories(): {
  showCategory: (id: number) => Promise<void>;
  createSubcategory: (id: number) => Promise<void>;
  status: () => Promise<void>;
  cat: () => Promise<void>;
  categoryData: Ref<Ads[]>;
  statusData: Ref<CategoryShow>;
};
