import logo from "./../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { AnimatedPage } from "../../AnimatedPage";
import { useTranslation } from "react-i18next";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, type FormEvent } from "react";
import axios from "../../axios";

export const Login = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = event.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password = event.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    setSubmitting(true);
    const response = await axios.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (!response.data.user) {
      setError(response.data.error);
      console.log(response.data);
    }
    if(!response.data.error) {
      localStorage.setItem("acces_token", response.data.accesToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      console.log(response.data);
      navigate("/");
    }
    setSubmitting(false);
  }

  return (
    <>
      <AnimatedPage>
        <div className="container form-container">
          <img src={logo} alt="CHICAGO BULLS" />
          <p className="login-error">{error}</p>
          <form onSubmit={handleFormSubmit}>
            <div className="input">
              <div className="labels">
                <label htmlFor="email">Email</label>
                <NavLink className="login-input" to="/">
                  {t("GoHome")}
                </NavLink>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abcdemail@gmail.com"
              />
            </div>
            <div className="input">
              <label htmlFor="password">{t("Password")}</label>
              <InputGroup id="passwordmain" size="md">
                <Input
                  id="password"
                  name="password"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder={t("EnterPassword")}
                />
                <InputRightElement marginRight="2px" width="4.5rem">
                  <Button
                    id="passbtn"
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? t("hide") : t("show")}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="login-btn">
              <Button
                type="submit"
                isLoading={submitting}
              >
                {t("Login")}
              </Button>
              <Link to="/register" id="login">
                {t("Haventyet")}
              </Link>
            </div>
          </form>
        </div>
      </AnimatedPage>
    </>
  );
};