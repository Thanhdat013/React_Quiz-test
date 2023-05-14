import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import VideoHomePage from "~/assets/header_video.mp4"

import styles from "./HomePage.scss"

import Button from "~/components/Button/Button"

const cx = classNames.bind(styles)

function HomePage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div className="homepage-container">
      <video className="app-container_video" autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
      </video>
      <div className={cx("homepage-content")}>
        <h1 className={cx("title")}>{t("homePage.homePageTitle1")}</h1>
        <p className={cx("desc")}>{t("homePage.homePageTitle2")}</p>
        <div>
          {isAuthenticated === false ? (
            <Button
              large
              primary
              className={cx("homepage-content-btn")}
              onClick={() => navigate("/login")}
            >
              {t("homePage.homePageLogin")}
            </Button>
          ) : (
            <Button
              large
              primary
              className={cx("homepage-content-btn")}
              onClick={() => navigate("/users")}
            >
              {t("homePage.homePageLogout")}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
