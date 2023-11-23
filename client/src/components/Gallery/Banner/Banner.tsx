import "./Banner.css";
import gallery_banner from "../../../assets/gallery-banner.png";
import { useTranslation } from "react-i18next";
const Banner = () => {
  const {t} = useTranslation();
  return (
    <div className="background">
      <img src={gallery_banner} />
      <div className="container container-sm">
        <p className="text">{t("GalleryBanner")}</p>
      </div>
    </div>
  );
};

export default Banner;
