'use client';
import { useEffect, useState } from 'react';
import ArticleItem from './articleItem/ArticleItem.component';
import styles from './PrzydatneMaterialy.module.scss';
import { Article, Articles, getArticles } from './lib/getArticles';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import Image from 'next/image';
import LoadingIcon from '../../images/static/loading.svg';

const PrzydatneMaterialy = () => {
  const [articles, setArticles] = useState<Articles>();
  const [loading, setLoading] = useState(true);

  const getAllArticles = async () => {
    try {
      const articles = await getArticles();
      setArticles(articles);
      setLoading(true);
    } catch (error) {
      console.log('Error while loading articles, error details ', error);
      failurePopUp('Błąd wczytywania artykułów.');
    }
    setLoading(false);
  };

  const loadArticles = () => {
    if (!loading && articles) {
      successPopUp('Załadowano artykuły :)');
      return articles.items.map((article: Article, index) => (
        <ArticleItem
          key={index}
          author={article.created_by.full_name}
          publishedAt={article.creation_date}
          title={article.title}
          content={article.content}
          src={article.banner_url}
        />
      ));
    } else if (!loading && articles && articles.items.length === 0) {
      return <p>Nie znaleziono materiałów</p>;
    } else {
      return (
        <Image src={LoadingIcon} alt="Ikona ładowania" width={60} height={60} />
      );
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <section className={styles.articlesWrapper}>
      <h1
        onClick={() => console.log(articles?.items.length)}
        className={styles.articlesWrapper__heading}
      >
        Wszystkie artykuły
      </h1>
      <div className={styles.articlesWrapper__articles}>{loadArticles()}</div>
    </section>
  );
};

export default PrzydatneMaterialy;
