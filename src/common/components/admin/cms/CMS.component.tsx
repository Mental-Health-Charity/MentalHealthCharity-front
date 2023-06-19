import styles from './CMS.module.scss';

const CMS = () => {
  return (
    <div className="cmsWrapper">
      <form className="cmsWrapper__editor">
        <p>
          <label>Tytuł</label>
          <input type="text" placeholder="Mój artykuł" />
        </p>
        <p>
          <label>treść</label>
          <textarea placeholder="Mój artykuł przedstawia..." />
        </p>
        <p>
          <label>źródło do banneru</label>
          <input type="url" placeholder="https://i.imgur.com/7nLm7si.mp4" />
        </p>
      </form>
    </div>
  );
};
