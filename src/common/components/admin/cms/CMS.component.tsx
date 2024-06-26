'use client';
import { useEffect, useState } from 'react';
import styles from './CMS.module.scss';
import Image from 'next/image';
import ImageNotFoundIcon from '../../../images/static/imagenotfoundicon.svg';
import {
  failurePopUp,
  infoPopUp,
  successPopUp,
} from '@/utils/defaultNotifications';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CategoryModal from './CategoryModal/CategoryModal.component';

import {
  Article,
  Status,
  useAdmin,
} from '@/contexts/adminProvider/Admin.provider';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { getArticle } from '../../przydatneMaterialy/ArticlePage/lib/getArticle';
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import { forwardRef } from 'react';
import ArticlePreview from '../../common/ArticlePreview/ArticlePreview.component';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import BackupModal from '../../common/backupModal/BackupModal.component';

interface CMSProps {
  id?: number;
}

const Editor = dynamic(
  () =>
    import(
      '../../../components/common/MDXEditor/InitializedMDXEditor.component'
    ),
  {
    ssr: false,
  },
);

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />,
);

ForwardRefEditor.displayName = 'ForwardRefEditor';

const CMS = ({ id }: CMSProps) => {
  const { createArticle } = useAdmin();
  const [addVideoToArticle, setAddVideoToArticle] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [editedArticle, setEditedArticle] = useState<Article>();
  const [submitted, setSubmitted] = useState(false);

  ForwardRefEditor.displayName = 'ForwardRefEditor';

  const getEditedArticle = async () => {
    if (id) {
      try {
        const data = await getArticle(id);
        setEditedArticle(data);
      } catch (err) {
        failurePopUp('Wystąpił błąd podczas edycji artykułu!');
      }
    }
  };

  useEffect(() => {
    getEditedArticle();
  }, []);

  if (id && !editedArticle) {
    return (
      <div className={styles.cmsWrapper}>
        <p>Loading...</p>
      </div>
    );
  }

  const initialEditedValues: Article = {
    title: editedArticle ? editedArticle.title : '',
    content: editedArticle ? editedArticle.content : '',
    banner_url: editedArticle ? editedArticle.banner_url : '',
    video_url: editedArticle ? editedArticle.video_url : '',
    required_role: editedArticle ? editedArticle.required_role : 'ANYONE',
    article_category_id:
      editedArticle && editedArticle.article_category
        ? editedArticle.article_category.id
        : undefined,
  };

  const initialValues: Article = {
    title: '',
    content: '',
    banner_url: '',
    video_url: '',
    required_role: 'ANYONE',
    article_category_id: undefined,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Tytuł jest wymagany'),
    content: Yup.string().required('Treść jest wymagana'),
    banner_url: Yup.string().required('Źródło baneru jest wymagane'),
    required_role: Yup.string().required('Dostępność jest wymagana'),
    article_category_id: Yup.number().required('Kategoria wymagana.'),
  });

  const onSubmit = (values: Article) => {
    try {
      createArticle(values, id);
    } catch (error) {
      console.error('ERROR while creating new article, error details: ', error);
      failurePopUp(
        'Wystąpił błąd podczas tworzenia nowego artykułu, sprawdź konsolę po więcej informacji.',
      );
    } finally {
      successPopUp('Artykuł został utworzony!');
      setSubmitted(true);
    }
  };

  if (id) {
    infoPopUp(`Edytujesz artykuł o id ${id}`);
  }

  return (
    <div className={styles.cmsWrapper}>
      <Formik
        initialValues={id ? initialEditedValues : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit} className={styles.cmsWrapper__editor}>
            <legend className={styles.cmsWrapper__editor__legend}>
              {id ? 'Edytor artykułów' : 'Kreator artykułów'}
            </legend>
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleTitle"
              >
                Tytuł:
              </label>
              <Field
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__input}
                id="articleTitle"
                type="text"
                placeholder="Mój artykuł"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </p>
            <p className={styles.cmsWrapper__editor__settingsRow}>
              <span className={styles.cmsWrapper__editor__settingsRow__item}>
                <label
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__label
                  }
                  htmlFor="permsToRead"
                >
                  Wybierz kategorię:
                </label>

                <button
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__input
                  }
                  type="button"
                  onClick={() => setModalOpen(true)}
                >
                  Wybierz...
                </button>
                {values.article_category_id && (
                  <p>Wybrano kategorie o id: {values.article_category_id}</p>
                )}
                <ErrorMessage
                  name="article_category_id"
                  component="div"
                  className="error-message"
                />
                {isModalOpen && (
                  <CategoryModal
                    setFieldValue={setFieldValue}
                    setModalOpen={setModalOpen}
                  />
                )}
              </span>
              <span className={styles.cmsWrapper__editor__settingsRow__item}>
                <label
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__label
                  }
                  htmlFor="permsToRead"
                >
                  Dostępne dla:
                </label>
                <Field
                  disabled={id}
                  as="select"
                  id="permsToRead"
                  name="required_role"
                  className={
                    styles.cmsWrapper__editor__settingsRow__item__input
                  }
                >
                  <option value="ANYONE">Każdy</option>
                  <option value="VOLUNTEER">Wolontariusz i admin</option>
                  <option value="ADMIN">tylko admin</option>
                </Field>
                <ErrorMessage
                  name="required_role"
                  component="div"
                  className="error-message"
                />
              </span>
            </p>
            {!addVideoToArticle && (
              <p className={styles.cmsWrapper__editor__row}>
                <button
                  type="button"
                  onClick={() => setAddVideoToArticle(true)}
                  className={styles.cmsWrapper__editor__row__addVideoBtn}
                >
                  + dodaj wideo (opcjonalne)
                </button>
              </p>
            )}
            {addVideoToArticle && (
              <p className={styles.cmsWrapper__editor__row}>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue('video_url', '');
                    setAddVideoToArticle(false);
                  }}
                  className={styles.cmsWrapper__editor__row__addVideoBtn}
                >
                  - usun wideo
                </button>
                <label
                  className={styles.cmsWrapper__editor__row__label}
                  htmlFor="articleBannerUrl"
                >
                  Źródło wideo:
                </label>
                <Field
                  onChange={handleChange}
                  className={styles.cmsWrapper__editor__row__input}
                  value={addVideoToArticle ? values.video_url : ''}
                  id="video_url"
                  type="text"
                  placeholder="https://youtube.com/"
                  name="video_url"
                />

                <ErrorMessage
                  name="video_url"
                  component="div"
                  className="error-message"
                />
              </p>
            )}
            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleBannerUrl"
              >
                Źródło baneru:
              </label>

              <Field
                onChange={handleChange}
                className={styles.cmsWrapper__editor__row__input}
                id="articleTitle"
                type="text"
                placeholder="https://i.imgur.com/yourimage.jpg"
                name="banner_url"
              />
              {errors.banner_url && touched.banner_url ? (
                <Image
                  src={ImageNotFoundIcon}
                  alt="Image Not Found"
                  width={128}
                  height={128}
                  className={styles.cmsWrapper__editor__row__banner}
                />
              ) : (
                values.banner_url && (
                  <Image
                    src={values.banner_url}
                    alt="Podgląd banera artykułu"
                    width={128}
                    className={styles.cmsWrapper__editor__row__banner}
                    // onError={() => handleBannerUrlError(setFieldError)}
                  />
                )
              )}
              <ErrorMessage
                name="banner_url"
                component="div"
                className="error-message"
              />
            </p>

            <p className={styles.cmsWrapper__editor__row}>
              <label
                className={styles.cmsWrapper__editor__row__label}
                htmlFor="articleContent"
              >
                Treść:
              </label>

              <ForwardRefEditor
                className={styles.cmsWrapper__editor__row__editor}
                markdown={values.content}
                onChange={(value) => {
                  setFieldValue('content', value);
                }}
              />

              <ErrorMessage
                name="content"
                component="div"
                className="error-message"
              />
            </p>

            <p className={styles.cmsWrapper__editor__row__publishWrapper}>
              <button
                type="submit"
                value="Opublikuj"
                className={
                  styles.cmsWrapper__editor__row__publishWrapper__publish
                }
              >
                {id ? 'Wyślij edycje' : 'Wyślij artykuł'}
              </button>
              <button
                type="button"
                value="Podgląd artykułu"
                aria-label="Podgląd artykułu"
                className={
                  styles.cmsWrapper__editor__row__publishWrapper__preview
                }
                onClick={() => setShowPreview(!showPreview)}
              >
                Podgląd artykułu
              </button>
            </p>
            {user && showPreview && (
              <ArticlePreview
                handleClose={() => setShowPreview(false)}
                article={{
                  ...values,
                  created_by: user,
                  id: 0,
                  status: Status.DRAFT,
                  creation_date: new Date().toDateString(),
                  article_category: {
                    id: values.article_category?.id || 0,
                    is_active: true,
                    name: 'string',
                  },
                }}
                open={showPreview}
              />
            )}
            {submitted && (
              <BackupModal redirectTo="/przydatne-materialy" values={values} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CMS;
