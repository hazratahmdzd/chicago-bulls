import "./Header.css";
import logo from "../../assets/logo.png";
import cart from "../../assets/shopping-cart-white.png";
import hamburger from "../../assets/hamburger.png";
import closeMark from "../../assets/close.png";
import matchshirt from "../../assets/product-example.png";
import baby from "../../assets/baby.png";
import backpack from "../../assets/backpack.png";
import ball from "../../assets/ball.png";
import cap from "../../assets/cap.png";
import longshirt from "../../assets/longshirt.png";
import shorts from "../../assets/shorts.png";
import tshirt from "../../assets/tshirt.png";

import { Select, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Auth from "../Auth/Auth";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../Context";
import { Product } from "../../models";
import { Buy } from "./SweetAlert";

export const Header = () => {
  const context = useCart();
  const contextCart = context?.cart || [];
  const { t, i18n } = useTranslation();
  const [close, setClose] = useState(false);
  const [cartClose, setCartClose] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLanguage(value);
  };

  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language]);

  function hamburgerHandler() {
    setClose(!close);

    if (cartClose) {
      setCartClose(false);
      cartBtnHandler();
    }

    const hamburgerScreen = document.querySelector(".hamburger-screen");
    const background = document.querySelector(".menu-back");
    const body = document.querySelector("body");
    body?.classList.toggle("overflow-hidden");
    // hamburgerScreen?.classList.toggle('menu-slide-in');
    console.log(close);

    if (!close) {
      // Slide out animation
      hamburgerScreen?.classList.remove("hamburger-slide-out"); // Remove the slide-out class
      hamburgerScreen?.classList.add("hamburger-slide-in");
    } else {
      // Slide in animation
      hamburgerScreen?.classList.remove("hamburger-slide-in"); // Remove the slide-in class
      hamburgerScreen?.classList.add("hamburger-slide-out");
    }
    hamburgerScreen?.classList.toggle("hamburger-visible");

    background?.classList.toggle("d-block");

    background?.addEventListener("click", () => {
      console.log("background clicked");
      hamburgerScreen?.classList.remove("hamburger-visible");
      background?.classList.remove("d-block");
      body?.classList.remove("overflow-hidden");
      hamburgerScreen?.classList.remove("hamburger-slide-in"); // Remove the slide-in class
      hamburgerScreen?.classList.add("hamburger-slide-out");
      setClose(false);
    });
  }
  function cartBtnHandler() {
    setCartClose(!cartClose);

    if (close) {
      setClose(false);
      hamburgerHandler();
    }

    const cartScreen = document.querySelector(".cart-screen");
    // const background = document.querySelector(".cart-back");
    const background = document.querySelector(".menu-back");
    const body = document.querySelector("body");
    body?.classList.toggle("overflow-hidden");
    // cartScreen?.classList.toggle('menu-slide-in');
    console.log(cartClose);

    if (!cartClose) {
      // Slide out animation
      cartScreen?.classList.remove("hamburger-slide-out"); // Remove the slide-out class
      cartScreen?.classList.add("hamburger-slide-in");
    } else {
      setCartClose(false);
      // Slide in animation
      cartScreen?.classList.remove("hamburger-slide-in"); // Remove the slide-in class
      cartScreen?.classList.add("hamburger-slide-out");
    }
    cartScreen?.classList.toggle("hamburger-visible");

    background?.classList.toggle("d-block");

    background?.addEventListener("click", () => {
      console.log("background clicked");
      cartScreen?.classList.remove("hamburger-visible");
      background?.classList.remove("d-block");
      body?.classList.remove("overflow-hidden");
      cartScreen?.classList.remove("hamburger-slide-in"); // Remove the slide-in class
      cartScreen?.classList.add("hamburger-slide-out");
      setCartClose(false);
    });
  }
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 600);
  };

  useEffect(() => {
    // Initial setup
    window.addEventListener("resize", updateScreenSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);
  interface JwtDecoded {
    email: string;
    userId: string;
    fullName: string;
    exp: number;
    iat: number;
  }
  const [token, setToken] = useState<JwtDecoded | null>(null);

  const accessToken = localStorage.getItem("acces_token");

  useEffect(() => {
    if (accessToken) {
      setToken(jwtDecode(accessToken));
    }
  }, []);
  function handleLogout() {
    localStorage.clear();
    setTimeout(() => {
      document.body.classList.add("loading");
      location.reload();
      document.body.classList.remove("loading");
    }, 220);
  }

  const getImageForProduct = (productId: number) => {
    const images = [
      matchshirt,
      baby,
      backpack,
      ball,
      cap,
      longshirt,
      shorts,
      tshirt,
    ];

    return images[productId % images.length];
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="header-items">
            <div className="header-logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink id="home" className="link" to="/">
                    {t("HOME")}
                  </NavLink>
                </li>
                <li>
                  <NavLink id="team" className="link" to="/team">
                    {t("TEAM")}
                  </NavLink>
                </li>
                <li>
                  <NavLink id="gallery" className="link" to="/gallery">
                    {t("GALLERY")}
                  </NavLink>
                </li>
                <li>
                  <NavLink id="news" className="link" to="/news">
                    {t("NEWS")}
                  </NavLink>
                </li>

                <li>
                  <NavLink id="shop" className="link" to="/shop">
                    {t("SHOP")}
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="header-end">
              <button onClick={hamburgerHandler} className="hamburger-menu">
                <img src={close ? closeMark : hamburger} alt="hamburger" />
              </button>
              <button onClick={cartBtnHandler} className="cartbtn">
                <img className="cart" src={cart} />
                {context?.cartCount! > 0 && (
                  <div className="cartcount">{context?.cartCount}</div>
                )}
              </button>
              {!isSmallScreen && <Auth />}
              <Space wrap>
                <Select
                  defaultValue={language}
                  style={{ width: 68 }}
                  onChange={handleChange}
                  options={[
                    { value: "az", label: "AZ" },
                    { value: "en", label: "EN" },
                  ]}
                />
              </Space>
            </div>
          </div>
        </div>
      </header>
      <div className="menu-back d-none"></div>
      {/* <div className="cart-back d-none"></div> */}
      <div className="hamburger-screen">
        <nav>
          <ul>
            <li>
              {isSmallScreen &&
                (token ? (
                  <div className="profil-about">
                    <h3>{token.fullName}</h3>
                    <p>{token.email}</p>
                  </div>
                ) : (
                  <div className="login-reg-wrapper">
                    <Link to="/register" className="login-register">
                      {t("Register")}
                    </Link>
                    <Link to="/login" className="login-register">
                      {t("Login")}
                    </Link>
                  </div>
                ))}
            </li>

            <li>
              <NavLink id="home" className="link" to="/">
                {t("HOME")}
              </NavLink>
            </li>
            <li>
              <NavLink id="team" className="link" to="/team">
                {t("TEAM")}
              </NavLink>
            </li>
            <li>
              <NavLink id="gallery" className="link" to="/gallery">
                {t("GALLERY")}
              </NavLink>
            </li>
            <li>
              <NavLink id="news" className="link" to="/news">
                {t("NEWS")}
              </NavLink>
            </li>

            <li>
              <NavLink id="shop" className="link" to="/shop">
                {t("SHOP")}
              </NavLink>
            </li>
            <li>
              {token && (
                <button onClick={handleLogout} className="logout">
                  {t("Logout")}
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* cart div */}

      <div className="cart-screen">
        <p className="cart-header">{t("Basket")}</p>
        <nav>
          <ul style={{ textAlign: "center" }}>
            {contextCart.length! > 0 ? (
              contextCart.map((product: Product) => {
                const count = context?.productCount[product.id] || 0;

                return (
                  <li className="main-product">
                    <div className="left-product">
                      <img src={getImageForProduct(product.id)} />
                    </div>
                    <div className="right-product">
                      <h3 className="category">
                        {product.category.toLocaleUpperCase()}
                      </h3>
                      <p className="description">{product.description}</p>
                      <p className="price">{product.price * count} $</p>
                      <div className="btns-product">
                        <button
                          onClick={() => {
                            if (context?.productCount[product.id]! > 1) {
                              context?.decrement(product.id);
                            } else {
                              context?.removeProduct(product.id);
                            }
                          }}
                        >
                          -
                        </button>
                        <p className="count-product"> {count} </p>
                        <button
                          onClick={() => {
                            context?.increment(product.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
                <p className="error-cart">{t("BasketError")}</p>
                <p className="helper-cart">{t("BasketHelper")}</p>
              </div>
            )}
            <li>{contextCart.length! > 0 && <Buy />}</li>
          </ul>
        </nav>
      </div>
    </>
  );
};
