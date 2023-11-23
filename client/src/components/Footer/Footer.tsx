import "./Footer.css";
import logo from "../../assets/logo.png";
import insta from "../../assets/instagram.png";
import fb from "../../assets/facebook.png";
import youtube from "../../assets/youtube.png";
import twitter from "../../assets/twitter.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="social">
              <Link to='https://www.instagram.com/chicagobulls/'><img src={insta} alt="insta" /></Link>
             <Link to='https://www.facebook.com/chicagobulls/'> <img src={fb} alt="fb" /></Link>
              <Link to='https://www.youtube.com/channel/UCvZi1jVVZ2yq0k5kkjzmuGw'> <img src={youtube} alt="yt" /> </Link>
             <Link to='https://twitter.com/chicagobulls'> <img src={twitter} alt="twitter" /> </Link>
            </div>
          </div>
          <div className="team footer-item">
            <h3 className="title">{t("TEAM")}</h3>
            <ul>
              <li>
                {" "}
                <Link to="/team">{t("TeamRoster")}</Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/team">{t("Stats")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/team">{t("TeamLeaders")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/team">{t("StaffDirectory")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/team">{t("CareerOpportunities")}</Link>
              </li>
            </ul>
          </div>
          <div className="ticket footer-item">
            <h3 className="title">{t("TICKET")}</h3>

            <ul>
              <li>
                <Link to="/shop">{t("CLinkckTix")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("Schedule")}</Link>
              </li>
              <li>
                <Link to="/shop">{t("SeasonTickets")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("SingleTickets")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("GroupTickets")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("FamilyTicketPAcks")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("StudentPass")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("PrintSchedule")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("WindyCity")}</Link>
              </li>
            </ul>
          </div>
          <div className="empty"></div>
          <div className="shop footer-item">
            <h3 className="title">{t("SHOP")}</h3>

            <ul>
              <li>
                {" "}
                <Link to="/shop">{t("JERSEY")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("HATS")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("TSHIRT")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("KIDS")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/shop">{t("MadhouseTeamStore")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-news footer-item">
            <h3 className="title">{t("NEWS")}</h3>

            <ul>
              <li>
                {" "}
                <Link to="/news">Sam Smith</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">{t("ChuckChecksIn")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">{t("PartnerNews")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">{t("InjuryReport")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">{t("GameNotes")}</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">2022‑23 {t("Media Guidee")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-end">
          <p>{t("Copyright")}</p>
          <p>{t("Footer1")}</p>
        </div>
      </div>
    </footer>
  );
};
