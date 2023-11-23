import React from 'react';
import './Card.css';
import play from "../../assets/play-circle.png";
import ticket from "../../assets/ticket.png";
// Define the prop types for the Card component
import { useTranslation } from 'react-i18next';
type CardProps = {
  img: string;  // Assuming img is a URL to an image
  img2: string; // Assuming img2 is a URL to another image
  date: string;
};

const Card: React.FC<CardProps> = ({ img, img2, date }) => {
  const {t} = useTranslation();
  return (
    <div className="card">
      <div className="team-logos">
        <img src={img} alt="team" />
        <img src={img2} alt="team" />
      </div>
      <div className="informations">
        <span className="date">
          <b>{date}</b>
        </span>
        <span className="tv">
          <b>TV:</b> NBC Sports Chicago
        </span>
        <span className="radio">
          <b>RADIO:</b> 670 {t("TheScore")}
        </span>
      </div>
      <div className="line"></div>
      <div className="links">
        <div className="link watch-online">
          <img src={play} alt="play" />
          <b>{t("WatchOnline")}</b>
        </div>
        <div className="link buy-ticket">
          <img src={ticket} alt="play" />
          <b>{t("TicketButton")}</b>
        </div>
      </div>
    </div>
  );
}

export default Card;
