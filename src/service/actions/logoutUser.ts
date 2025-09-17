
import { authKey } from '@/constants/authkey';
import { deleteCookies } from './deleteCookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logoutUser = (router: AppRouterInstance) => {
   localStorage.removeItem(authKey);
   deleteCookies([authKey, 'token']);
   router.push('/');
   router.refresh();
};
