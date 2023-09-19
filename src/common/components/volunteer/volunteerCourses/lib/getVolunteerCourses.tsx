import { Status } from '@/contexts/adminProvider/Admin.provider';
import { User } from '@/contexts/authProvider/Auth.provider';
import { getCookiesAuth } from '@/utils/cookies';
import Roles from '@/utils/roles';

export interface Article {
  id: number;
  title: string;
  content: string;
  created_by: User;
  banner_url: string;
  video_url: string;
  creation_date: string;
  article_category_id?: number;
  article_category?: {
    id: number;
  };
  required_role?: 'ANYONE' | Roles.admin | Roles.volunteer;
}

export interface Articles {
  items: Article[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const getVolunteerCourses = async (
  page: number,
  size: number,
  status: string | Status,
) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/?status=${status}&page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );

  const data: Articles = await res.json();
  return data;
};

export const getPublicArticle = async (page: number, size: number) => {
  const headers = await getCookiesAuth();

  const res = await fetch(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/public?status=PUBLISHED&page=${page}&size=${size}`,
    {
      method: 'get',
      headers,
    },
  );

  const data: Articles = await res.json();
  return data;
};
