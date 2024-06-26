'use client';

import ApplyVolunteerForm from '@/common/components/volunteer/applyVolunteerForm/ApplyVolunteerForm.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { ChatProvider } from '@/contexts/chatProvider/Chat.provider';
import { infoPopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import { useRouter } from 'next/navigation';

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { push } = useRouter();

  const verifyUser = () => {
    if (
      (user && user.user_role === Roles.volunteer) ||
      user?.user_role === Roles.admin
    ) {
      return children;
    } else if (user && user.user_role === Roles.user) {
      return <ApplyVolunteerForm />;
    } else {
      push('login');
      infoPopUp('Zaloguj się, aby wyświetlić tą podstronę');
    }
  };

  return <ChatProvider>{verifyUser()}</ChatProvider>;
}
