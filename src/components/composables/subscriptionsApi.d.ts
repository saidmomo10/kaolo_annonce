import { Ref } from 'vue';

interface Subscription {
  id?: number;
  name?: string;
  status?: string;
  subscription?: Subscription;
}

interface Subscription {
  name: string;
}

export function useSubscription(): {
  subscriptionStatut: Ref<Subscription>;
  subscriptionData: Ref<Subscription>;
  subscriptionName: Ref<Subscription>;
  subscription: () => Promise<void>;
  activateSubscription: () => Promise<void>;
  showSubscription: () => Promise<void>;
}
