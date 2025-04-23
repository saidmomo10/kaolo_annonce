import { Ref } from 'vue';

interface UserRole {
  
}



export function useUserRoles(): {
    userRole: ref<UserRole>;
    getUserRole: () => Promise<void>;
}
