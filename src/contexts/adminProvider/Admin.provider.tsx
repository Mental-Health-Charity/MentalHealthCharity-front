import { createContext, useContext, SetStateAction, Dispatch } from 'react';
import { EditUser, User } from '../authProvider/Auth.provider';
import { ChatData } from '@/utils/chatTypes';
import { getCookiesAuth } from '@/utils/cookies';
import Roles from '@/utils/roles';

interface AdminContextType {
  getUsers: (limit: { from: number; to: number }) => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  editUser: (id: number, userData: EditUser) => Promise<User>;
  getChats: (page: number, size: number) => Promise<ChatData>;
  createChat: (name: string) => Promise<void>;
  addParticipant: (chatId: number, userId: number) => Promise<void>;
  removeParticipant: (chatId: number, userId: number) => Promise<void>;
  createArticle: (article: Article) => Promise<void>;
  getArticleCategory: (
    page: number,
    size: number,
  ) => Promise<ArticleCategoryList>;
  createArticleCategory: (name: string) => Promise<void>;
}

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  video_url: string;
  article_category_id?: number;
  required_role: 'ANYONE' | Roles.admin | Roles.volunteer;
}

export interface ArticleCategory {
  name: string;
  id: number;
  is_active: boolean;
}

export interface ArticleCategoryList {
  items: Array<ArticleCategory>;
  total: number;
  page: number;
  size: number;
  pages: number;
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

  const editUser = async (id: number, userData: EditUser) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}/edit-as-admin`,
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

  const getArticleCategory = async (page: number, size: number) => {
    const headers = await getCookiesAuth();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/?page=${page}&size=${size}`,
      {
        method: 'get',
        headers,
      },
    );
    const data = await res.json();
    return data as ArticleCategoryList;
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

  const createArticleCategory = async (name: string) => {
    const headers = await getCookiesAuth();

    const body = {
      name: name,
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article-category/`,
      {
        method: 'post',
        headers,
        body: JSON.stringify(body),
      },
    );
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

  const createArticle = async (article: Article) => {
    const headers = await getCookiesAuth();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/`, {
      method: 'post',
      headers,
      body: JSON.stringify(article),
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
    getArticleCategory,
    createArticleCategory,
  };
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const admin = useProvideAdmin();

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
