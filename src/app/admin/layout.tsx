'use client';

import AccessDenied from '@/common/components/admin/accessDenied/AccessDenied.component';
import { AdminProvider } from '@/contexts/adminProvider/Admin.provider';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';
import { CookiesProvider } from 'react-cookie';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <CookiesProvider>
      <AdminProvider>
        {user?.user_role === Roles.admin ? (
          children
        ) : (
          <AccessDenied minRole={'Admin'} />
        )}
      </AdminProvider>
    </CookiesProvider>
  );
}
