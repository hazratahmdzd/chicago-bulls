import logo from "./../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { AnimatedPage } from "../../AnimatedPage";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { UserSchema, resolver } from "../../validation";
import { FormEvent, useState } from "react";
import axios from "../../axios";

export const Register = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const methods = useForm<UserSchema>({
    context: {},
    resolver,
    criteriaMode: "all",
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);

    const response = await axios.post("/auth/register", {
      fullName: methods.getValues().username, 
      email: methods.getValues().email,
      password: methods.getValues().password,
    });

    if(response.data.error) {
      setError(response.data.error);
      console.log(response.data);
    } else {
      navigate("/login");
      console.log(response.data);
    }

    setSubmitting(false);
  }


  return (
    <>
      <AnimatedPage>
        <div className="container form-container">
          <img src={logo} alt="CHICAGO BULLS" />
          <p className="register-error">{error}</p>
          <chakra.form id="form" onSubmit={handleFormSubmit}>
            <div className="input">
              <FormControl
                isInvalid={Boolean(methods.formState.errors.username)}
              >
                <div className="labels">
                  <FormLabel>{t("Name")}</FormLabel>
                  <NavLink className="register-input" to="/">
                    {t("GoHome")}
                  </NavLink>
                </div>
                <input
                  type="text"
                  id="username"
                  {...methods.register("username")}
                  placeholder={t("YourName")}
                />
                {methods.formState.errors.username && (
                  <FormErrorMessage id="errorinput">
                    {t(methods.formState.errors.username?.message!)}
                  </FormErrorMessage>
                )}
              </FormControl>
            </div>

            <div className="input">
              <FormControl isInvalid={Boolean(methods.formState.errors.email)}>
                <FormLabel>Email</FormLabel>
                <input
                  type="email"
                  id="email"
                  {...methods.register("email")}
                  placeholder="abcdemail@gmail.com"
                />
                {methods.formState.errors.email && (
                  <FormErrorMessage id="errorinput">
                    {t(methods.formState.errors.email?.message!)}
                  </FormErrorMessage>
                )}
              </FormControl>
            </div>

            <div className="input">
              <FormControl
                isInvalid={Boolean(methods.formState.errors.password)}
              >
                <FormLabel>{t("Password")}</FormLabel>
                <InputGroup size="md">
                  <Input
                  id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder={t("EnterPassword")}
                    {...methods.register("password")}
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
                {methods.formState.errors.password && (
                  <FormErrorMessage id="errorinput">
                    {t(methods.formState.errors.password?.message!)}
                  </FormErrorMessage>
                )}
              </FormControl>
            </div>
            <div className="register-btn">
              <Button isLoading={submitting} type={(methods.formState.errors.email || methods.formState.errors.password || methods.formState.errors.username) ? "button" : "submit"}>
                {t("Register")}
              </Button>
              <Link to="/login" id="login">
                {t("HaveAccount")}
              </Link>
            </div>
          </chakra.form>
        </div>
      </AnimatedPage>
    </>
  );
};