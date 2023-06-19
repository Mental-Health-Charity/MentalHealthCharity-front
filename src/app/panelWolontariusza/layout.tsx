'use client';

import AccessDenied from '@/common/components/admin/accessDenied/AccessDenied.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';
import Roles from '@/utils/roles';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <ChatProvider>
      {user?.user_role === Roles.volunteer ||
      user?.user_role === Roles.admin ? (
        children
      ) : (
        <AccessDenied minRole={'Wolontariusz'} />
      )}
    </ChatProvider>
  );
}
