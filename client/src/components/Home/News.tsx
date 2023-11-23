import './News.css';
import newsImg from '../../assets/news.png';
import newsImg1 from '../../assets/news(1).png';
import newsImg2 from '../../assets/news(2).png';
import { useTranslation } from 'react-i18next';

const News = () => {
  const {t} = useTranslation();
  return (
    <section className="news">
        <h2 className="title">{t("TopNews")}</h2>
        <div className="container">
          <div className="news-wrapper">
            <div className="news-card">
              <div className="news-img">
                <img src={newsImg} alt="" />
              </div>
              <div className="news-title">
                <b>{t("NewsHeader1")}</b>
              </div>
              <div className="news-content">
                <p>{t("NewsMain1")}</p>
              </div>
              <div className="news-end">
                <span className="date">
                {t("NewsDate")}
                </span>
                <span className="views">
                20{t("NewsView")}
                </span>
              </div>
            </div>
            <div className="news-card news-2">
              <div className="news-img">
                <img src={newsImg1} alt="" />
              </div>
              <div className="news-title">
                <b>{t("NewsHeader1")}</b>
              </div>
              <div className="news-content">
                <p>{t("NewsMain1")}</p>
              </div>
              <div className="news-end">
                <span className="date">
                {t("NewsDate")}
                </span>
                <span className="views">
                20{t("NewsView")}
                </span>
              </div>
            </div>
            <div className="news-card news-3">
              <div className="news-img">
                <img src={newsImg2} alt="" />
              </div>
              <div className="news-title">
                <b>{t("NewsHeader1")}</b>
              </div>
              <div className="news-content">
                <p>{t("NewsMain1")}</p>
              </div>
              <div className="news-end">
                <span className="date">
                {t("NewsDate")}
                </span>
                <span className="views">
                20{t("NewsView")}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
  )
}

export default News