import { Ref } from 'vue';

interface Profile {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  ifu?: string;
  rccm?: string;
  website?: string;
  [key: string]: any;
}

interface PasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export function useProfile(): {
  profile: Ref<Profile>;
  passwordData: Ref<PasswordData>;
  complete: () => Promise<void>;
  getUser: () => Promise<void>;
  updateProfile: () => Promise<void>;
  updatePassword: () => Promise<void>;
}
