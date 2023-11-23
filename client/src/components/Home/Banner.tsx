import './Banner.css';
import banner from '../../assets/banner.png';
import { useTranslation } from 'react-i18next';
const Banner = () => {
  const { t } = useTranslation();
  return (
    <section className="banner">
      <img className='banner-img' src={banner} alt="" />
    <div className="container">
      <div className="banner-inner">
        <div className="banner-left">
          <p>
          {t("HomeBanner")}
          </p>
          <button type="button">{t("TicketButton")}</button>
        </div>
        <div className="banner-right"></div>
      </div>
    </div>
  </section>
  )
}

export default Banner