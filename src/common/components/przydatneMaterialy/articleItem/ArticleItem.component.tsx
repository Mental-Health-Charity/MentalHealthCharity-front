import ArticlePlaceholder from '../../../images/static/ArticlePlaceholder.jpg';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ArticleItem.module.scss';

interface ArticleItemProps {
  author: string;
  publishedAt: string;
  title: string;
  content: string;
  src: string;
}

const ArticleItem = ({
  author,
  publishedAt,
  title,
  content,
  src,
}: ArticleItemProps) => {
  return (
    <article className={styles.article}>
      <div className={styles.article__authorWrapper}>
        <span
          className={styles.article__authorWrapper__dot}
          aria-hidden="true"
        ></span>
        <div className={styles.article__authorWrapper__authorContent}>
          <p className={styles.article__authorWrapper__authorContent__author}>
            {author}
          </p>
          <p className={styles.article__authorWrapper__authorContent__date}>
            {publishedAt}
          </p>
        </div>
      </div>
      <h2 className={styles.article__title}>{title}</h2>
      <p className={styles.article__content}>{content}</p>
      <Link className={styles.article__readMore} href={'/slug'}>
        Czytaj wiecej...
      </Link>
      <Image
        className={styles.article__image}
        src={src}
        loading="lazy"
        alt={'zdjęcie artykułu o ' + title}
        width={600}
        height={300}
      />
    </article>
  );
};

export default ArticleItem;
