'use client';
import { useEffect, useState } from 'react';
import ArticleItem from '../common/articleItem/ArticleItem.component';
import styles from './PrzydatneMaterialy.module.scss';
import { getArticles } from './lib/getArticles';
import { Article } from '../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { Articles } from '../volunteer/volunteerCourses/lib/getVolunteerCourses';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Image from 'next/image';
import LoadingIcon from '../../images/static/loading.svg';
import Table from '../common/table/Table.component';
import {
  getPublicArticle,
  getVolunteerCourses,
} from '../volunteer/volunteerCourses/lib/getVolunteerCourses';

const PrzydatneMaterialy = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);

  const getAllArticles = async (page: number) => {
    try {
      // read public articles endpoint is broken at this moment.
      const articles = await getVolunteerCourses(page, 15, 'PUBLISHED');
      setArticles(articles);
      setLoading(true);
    } catch (error) {
      console.error('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadArticles = () => {
    if (!loading && articles && articles?.items) {
      return articles.items
        .sort((a: Article, b: Article) => {
          return (
            new Date(b.creation_date).getTime() -
            new Date(a.creation_date).getTime()
          );
        })
        .map((article: Article, index) => (
          <ArticleItem showAdminOptions={false} article={article} key={index} />
        ));
    } else if (!loading && articles && !articles.items) {
      return (
        <p>
          Endpoint do odczytania postów bez autoryzacji użytkownika jest
          zepsuty. Prosimy o zalogowanie, aby wyświetlić artykuły. Błąd
          występuje tylko w wersji testowej i zostanie naprawiony.
        </p>
      );
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
    }
  };

  useEffect(() => {
    getAllArticles(1);
  }, []);

  return (
    <section className={styles.articlesWrapper}>
      <h1 className={styles.articlesWrapper__heading}>Wszystkie artykuły</h1>
      <div className={styles.articlesWrapper__articles}>
        <Table
          page={articles ? articles.page : 1}
          pages={articles ? articles.pages : 1}
          handleReads={getAllArticles}
        >
          {loadArticles()}
        </Table>
      </div>
    </section>
  );
};

export default PrzydatneMaterialy;
