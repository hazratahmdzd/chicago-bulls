import "./Auth.css";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface JwtDecoded {
  email: string;
  userId: string;
  fullName: string;
  exp: number;
  iat: number;
}

const Auth: FC = () => {
  const { t } = useTranslation();

  // const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    setTimeout(() => {
      document.body.classList.add("loading");
      location.reload();
      document.body.classList.remove("loading");
    }, 220);
  }

  const [token, setToken] = useState<JwtDecoded | null>(null);

  const accessToken = localStorage.getItem("acces_token");

  useEffect(() => {
    if (accessToken) {
      setToken(jwtDecode(accessToken));
    }
  }, []);

  console.log(token);

  if (token !== null) {
    return (
      <div>
        <Menu>
          <MenuButton
            sx={{
              width: "100%",
              fontSize: "13px",
              padding: "0px 10px",
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              transition: "all 0.3s",
              _hover: {
                color: "#b40f36",
                border: "1px solid #b40f36",
                transition: "all 0.3s",
              },
              _active: {
                color: "#b40f36",
                border: "1px solid #b40f36",
                backgroundColor: "transparent",
              },
            }}
            as={Button}
          >
            {token.fullName.split(" ")[0]}
          </MenuButton>
          <MenuList
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MenuItem>
              <div className="profil">
                <div className="profil-photo">{token.fullName[0]}</div>
                <div className="profil-about">
                  <h3>{token.fullName}</h3>
                  <p>{token.email}</p>
                </div>
              </div>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              style={{
                width: "60%",
                padding: "0",
              }}
            >
              <button className="logout">{t("Logout")}</button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Menu>
          <MenuButton
            sx={{
              width: "100%",
              fontSize: "13px",
              padding: "0px 10px",
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              transition: "all 0.3s",
              _hover: {
                color: "#b40f36",
                border: "1px solid #b40f36",
                transition: "all 0.3s",
              },
              _active: {
                color: "#b40f36",
                border: "1px solid #b40f36",
                backgroundColor: "transparent",
              },
            }}
            as={Button}
          >
            Guest
          </MenuButton>
          <MenuList
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MenuItem
              as={Link}
              to="/register"
              style={{
                width: "60%",
                padding: "0",
              }}
            >
              <button className="login-register">{t("Register")}</button>
            </MenuItem>
            <MenuItem
              as={Link}
              to="login"
              style={{
                width: "60%",
                padding: "0",
              }}
            >
              <button className="login-register">{t("Login")}</button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
};

export default Auth;
