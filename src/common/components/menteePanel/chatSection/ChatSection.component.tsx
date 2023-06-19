'use client';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import ChatWindow from '../../common/chatWindow/ChatWindow.component';
import styles from './ChatSection.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { failurePopUp } from '@/utils/defaultNotifications';

const ChatSection = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push('login');
      failurePopUp('Zaloguj się, aby wyświetlić tą podstronę!');
    }
  }, []);

  return (
    <section className={styles.chatSection}>
      <ChatWindow />
    </section>
  );
};

export default ChatSection;
