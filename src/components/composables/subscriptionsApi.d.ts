import type { DateTime } from 'luxon';
import { Ref } from 'vue';

interface Subscription {
  id?: number;
  name?: string;
  price?: string;
  status?: string;
  subscription?: Subscription;
  end_date?: DateTime;
}

interface Subscription {
  name: string;
}

export function useSubscription(): {
  error: ref<Subscription>;
  isLoading: ref<Subscription>;
  subscriptionData: ref<Subscription[]>;
  subscriptionName: Ref<Subscription>;
  subscriptionStatut: Ref<Subscription>;
  subscription: () => Promise<void>;
  activateSubscription: () => Promise<void>;
  showSubscription: () => Promise<void>;
}
