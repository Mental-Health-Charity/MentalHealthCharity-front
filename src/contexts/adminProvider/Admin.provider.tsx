import { createContext, useContext, SetStateAction, Dispatch } from 'react';
import { User } from '../authProvider/Auth.provider';
import { ChatData } from '@/utils/chatTypes';
import { getCookies, getCookiesAuth } from '@/utils/cookies';
import Cookies from 'js-cookie';
import { Article } from '@/common/components/przydatneMaterialy/lib/getArticles';
import Roles from '@/utils/roles';

interface AdminContextType {
  getUsers: (limit: { from: number; to: number }) => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  editUser: (id: number, userData: User) => Promise<User>;
  getChats: (page: number, size: number) => Promise<ChatData>;
  createChat: (name: string) => Promise<void>;
  addParticipant: (chatId: number, userId: number) => Promise<void>;
  removeParticipant: (chatId: number, userId: number) => Promise<void>;
  createArticle: (
    title: string,
    content: string,
    bannerUrl: string,
    requiredRole: Roles,
  ) => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

const useProvideAdmin = () => {
  const getUsers = async (limit: { from: number; to: number }) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/?skip=${limit.from}&limit=${limit.to}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as User[];
  };

  const getUserById = async (id: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as User;
  };

  const editUser = async (id: number, userData: User) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
      {
        method: 'put',
        headers,
        body: JSON.stringify(userData),
      },
    );
    const data = await res.json();
    return data as User;
  };

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

  const createChat = async (name: string) => {
    const headers = await getCookiesAuth();

    const body = {
      name: name,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
  };

  const addParticipant = async (chatId: number, userId: number) => {
    const headers = await getCookiesAuth();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/participant/${userId}}`,
      {
        method: 'post',
        headers,
      },
    );
  };

  const removeParticipant = async (chatId: number, userId: number) => {
    const headers = await getCookiesAuth();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/chat/${chatId}/corrector/${chatId}?participant_id=${userId}`,
      {
        method: 'delete',
        headers,
      },
    );
  };

  const createArticle = async (
    title: string,
    content: string,
    bannerUrl: string,
    requiredRole: Roles,
  ) => {
    const headers = await getCookiesAuth();

    const body = {
      title: title,
      content: content,
      banner_url: bannerUrl,
      required_role: requiredRole,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
  };

  return {
    getUsers,
    getUserById,
    editUser,
    getChats,
    createChat,
    addParticipant,
    removeParticipant,
    createArticle,
  };
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const admin = useProvideAdmin();

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
