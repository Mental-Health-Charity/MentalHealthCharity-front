import { ChatData, Messages } from '@/utils/chatTypes';
import { getCookiesAuth } from '@/utils/cookies';
import { createContext, useContext } from 'react';

interface ChatContextType {
  getChats: (page: number, size: number) => Promise<ChatData>;
  getMessages: (
    page: number,
    size: number,
    chatId: number,
  ) => Promise<Messages>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const useProvideChat = () => {
  const getChats = async (page: number, size: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as ChatData;
  };

  const getMessages = async (page: number, size: number, chatId: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/message/${chatId}?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );

    const data = await res.json();
    return data as Messages;
  };

  const sendMessage = async (chatId: number, content: string) => {
    const headers = await getCookiesAuth();

    const body = {
      content: content,
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/message/${chatId}`,
      {
        method: 'post',
        headers,
        body: JSON.stringify(body),
      },
    );
  };

  return { getChats, getMessages, sendMessage };
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideChat();

  return <ChatContext.Provider value={auth}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
