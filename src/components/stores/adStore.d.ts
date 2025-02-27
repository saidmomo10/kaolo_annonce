import { Ref } from 'vue';

interface Ad {
    id: number;
    title: string;
    price: string;
    sold: string;
    state: string;
    user: User;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
    created_at: string;
}

interface Subcategory {
    name: string;
}

export function useAdStore(): {
    ads: Ref<Ad[]>;
    filteredAds: Ref<Ad[]>;
    getAds: () => Promise<void>;
    filter: (query: string) => void;
    showAd: (id: number) => Promise<void>;
    statusData: Ref<any[]>;
}
