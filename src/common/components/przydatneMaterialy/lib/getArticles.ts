import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  id: number;
  created_by: User;
  creation_date: string;
}

export interface Articles {
  items: Article[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const getArticles = async (page: number, size: number) => {
  const res = await fetch(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/public/?page=${page}&size=${size}`,
    {
      method: 'get',
    },
  );

  const data: Articles = await res.json();
  return data;
};
