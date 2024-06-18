import { Ref } from 'vue';

export interface Ad {
    id: number;
    title: string;
    subcategory: {
        name: string;
    };
    state: string;
    [key: string]: any; // Add more fields as necessary
}

export interface AdStore {
    ads: Ref<Ad[]>;
    filteredAds: Ref<Ad[]>;
    getAds: () => Promise<void>;
    filter: (query: string) => void;
    showAd: (id: number) => Promise<void>;
    statusData: Ref<any[]>;
}
