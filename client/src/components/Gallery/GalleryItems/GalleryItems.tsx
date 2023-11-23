import "./GalleryItems.css";
import Item from "./Item";
import item_img from "../../../assets/gallery-item.png";
import item_img1 from "../../../assets/gallery-item(1).png";
import item_img2 from "../../../assets/gallery-item(2).png";
import item_img3 from "../../../assets/gallery-item(3).png";
import { useTranslation } from "react-i18next";

const GalleryItems = () => {
  const {t} = useTranslation();
  const item_title = t("GalleryHeader1");
  const item_title1 = t("GalleryHeader2");
  const item_title2 = t("GalleryHeader3");
  const item_title3 = t("GalleryHeader4");
  const item_content = t("GalleryMain1");
  const item_content1 = t("GalleryMain2");
  const item_content2 = t("GalleryMain3");
  const item_content3 =t("GalleryMain4");
  return (
    <div className="gallery-items">
      <div className="container">
        <div className="gallery-items-inner">
          <Item
            itemImg={item_img}
            item_title={item_title}
            item_content={item_content}
            row_reverse={false}
          />
          <Item
            itemImg={item_img1}
            item_title={item_title1}
            item_content={item_content1}
            row_reverse={true}
          />
          <Item
            itemImg={item_img2}
            item_title={item_title2}
            item_content={item_content2}
            row_reverse={false}
          />
          <Item
            itemImg={item_img3}
            item_title={item_title3}
            item_content={item_content3}
            row_reverse={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryItems;
