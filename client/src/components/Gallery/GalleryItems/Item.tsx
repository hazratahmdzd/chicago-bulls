import React from "react";
import "./Item.css";
import gallery_icon from "../../../assets/gallery-icon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
type ItemImg = {
  itemImg: string;
  item_title: string;
  item_content: string;
  row_reverse: boolean;
};
const Item: React.FC<ItemImg> = ({ itemImg, item_title, item_content,row_reverse }) => {
  const {t} = useTranslation();
  return (
    <div className="item">
      <div className={row_reverse ? "item-inner item-inner-reverse" : "item-inner" }>
        <div className="item-left">
          <img src={itemImg} alt="item-img" />
        </div>
        <div className="item-right">
          <div className="right-inner">
            <div className="title">
              <img src={gallery_icon} alt="gallery-icon" />
              <h2>{item_title}</h2>
            </div>
            <p className="content">{item_content}</p>
          <Link className="link" to='/news'>{t("SeeMore")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
