import './About.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


type AboutProps = {
  about_img: string;
  title: string;
  seeMore: boolean
};

const About: React.FC<AboutProps> = ({about_img,seeMore}) => {
  const {t} = useTranslation();
  return (
    <section className="about">
        <h2 className="title">{t("AboutUs")}</h2>
        <div className="container">
          <div className="about-wrapper">

          <div className="about-left">
            <img src={about_img} alt="" />
          </div>
          <div className="about-right">
            <div className="paragraphs">

            <p>
            {t("AboutMain1")}
            </p>
            <p>
            {t("AboutMain2")}
            </p>
            <p>
            {t("AboutMain3")}
            </p>
           {seeMore &&  <Link className='link' to="/team">{t("SeeMore")}</Link>}
            </div>
          </div>
          </div>
        </div>
      </section>
  )
}

export default About