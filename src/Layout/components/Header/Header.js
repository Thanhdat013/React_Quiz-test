import classNames from "classnames/bind"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import styles from "./Header.scss"

import { useState } from "react"
import UserSetting from "~/Layout/components/Users/UserSetting/UserSetting"
import { doLogout } from "~/redux/action/userAction"
import { postLogout } from "~/services/ApiServices"
import Language from "./Language"
import { Button } from "react-bootstrap"

const cx = classNames.bind(styles)

const Header = () => {
  const handleClickProfile = () => {
    setShow(true)
  }

  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = () => {
    navigate("/login")
  }
  const handleSignup = () => {
    navigate("/signup")
  }
  // Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const account = useSelector((state) => state.user.account)
  const role = useSelector((state) => state.user.account.role)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token)

    if (res && res.EC === 0) {
      dispatch(doLogout())
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      navigate("/")
    }
  }
  //User setting
  const [show, setShow] = useState(false)
  return (
    <>
      <Navbar bg="light" expand="lg" className={cx("navbar")}>
        <Container>
          <NavLink to="/" className={cx("navbar-brand")}>
            <img
              src="https://anzanvietnam.com/editor//images/tu-duy-logic-2.jpg"
              alt=""
              className={cx("navbar-brand_logo")}
            />
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className={cx("nav-link")}>
                {t("header.headerHome")}
              </NavLink>
              <NavLink to="/users" className={cx("nav-link")}>
                {t("header.headerUsers")}
              </NavLink>
              {role === "ADMIN" && (
                <NavLink to="/admin" className={cx("nav-link")}>
                  {t("header.headerAdmin")}
                </NavLink>
              )}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <NavDropdown
                    title={t("header.headerSetting")}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={() => handleClickProfile()}>
                      {t("header.headerProfile")}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      {t("header.headerLogout")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Button
                    className="header-btn"
                    variant="dark"
                    onClick={() => handleLogin()}
                  >
                    {t("header.headerLogin")}
                  </Button>
                  <Button
                    variant="warning"
                    style={{ minWidth: "90px" }}
                    onClick={() => handleSignup()}
                  >
                    {t("header.headerSignup")}
                  </Button>
                </>
              )}

              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserSetting show={show} setShow={setShow} />
    </>
  )
}

export default Header
