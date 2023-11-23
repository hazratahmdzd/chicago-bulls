import shopBg from '../../../assets/shop-bg.png'
import './ShopBanner.css'
import { Link } from 'react-scroll'
import { useTranslation } from 'react-i18next'



export const ShopBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="background">
      <img src={shopBg} />

      <div className="container-shopbg">
        <div className="main-shop">
          <h1 className='text-shop'>{t("ShopBanner")}</h1>
          <Link 
          to='shopping'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          >
            <button className='btn-shop'>{t("ShopButton")}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}


