import './TeamBanner.css'
import TeamBg from '../../../assets/team-bg.png'
import { useTranslation } from 'react-i18next'

export const TeamBanner = () => {
    const {t} = useTranslation();
    return (
        <div className="background">
            <img src={TeamBg}/>
            <div className="container container-sm">
                <h1 className="text">{t("TeamBanner")}</h1>
            </div>
        </div>
    )
}
