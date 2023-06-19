import { User } from '@/contexts/authProvider/Auth.provider';
import Roles from './roles';

const userInit: User = {
  email: '',
  full_name: '',
  password: '',
  is_active: false,
  user_role: Roles.user,
};

export default userInit;
