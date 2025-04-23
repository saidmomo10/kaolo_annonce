import { Ref } from 'vue';

interface Ad {
    id: number;
    title: string;
    price: string;
    sold: string;
    state: string;
    user: User;
    isLoading: boolean;
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

interface Filter{
    filteredAds: Ad[];
    
}

export function useAdStore(): {
    ads: Ref<Filter[]>;
    getAds: () => Promise<void>;
    filter: (query: string) => void;
    showAd: (id: number) => Promise<void>;
    statusData: Ref<any[]>;
    loading: Ref<Ad[]>;
}
