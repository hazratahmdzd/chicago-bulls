import './Categories.css'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'

export const Categories = () => {
    const {t} = useTranslation();
    const initialExpirationTime = 1 * 60 * 60 * 1000 + 15 * 60 * 1000 + 3 * 1000;

    const [expirationTime, setExpirationTime] = useState(initialExpirationTime);

    useEffect(() => {
        // Update the expiration time every second
        const intervalId = setInterval(() => {
            setExpirationTime((prevExpirationTime) => {
                if (prevExpirationTime > 0) {
                    return prevExpirationTime - 1000;
                } else {
                    // Reset to the initial expiration time when it reaches 0
                    return initialExpirationTime;
                }
            });
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [initialExpirationTime]);

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(expirationTime / (60 * 60 * 1000));
    const minutes = Math.floor((expirationTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((expirationTime % (60 * 1000)) / 1000);
    return (
        <div>
            <div className="categories-top">
                <div className="container container-categories-red">
                    <div className="categories-left">
                        <a href="#">{t("MEN")}</a>
                        <a href="#">{t("WOMEN")}</a>
                        <a href="#">{t("KIDS")}</a>
                        <a href="#">{t("JERSEY")}</a>
                        <a href="#">{t("TSHIRT")}</a>
                        <a href="#">{t("SWEATSHIRTS")}</a>
                        <a href="#">{t("HATS")}</a>
                    </div>
                    <div className="categories-right">
                        <a href="#">{t("ACCESORIES")}</a>
                        <a href="#">{t("HOMEOFFICE")}</a>
                        <a href="#">{t("COLLECTIBLES")}</a>
                        <a href="#">{t("SALE")}</a>
                        <a href="#">{t("NEWARRIVAL")}</a>
                    </div>
                </div>
            </div>
            <div className="categories-bottom">
                <div className="container container-categories-white">
                <h2>{t("ENDIN")}: <span>{`${hours} HRS ${minutes} MIN ${seconds} SEC`}</span></h2>
                    <h2 className='categories-special'>{t("UPTO")}</h2>
                    <h2>{t("USECODE")}: <span>BACKCOURT</span></h2>
                </div>
            </div>
        </div>
    )
}


