import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import homePageImage from "~/assets/home_page.jpg"
import { Col, Container, Row, Stack } from "react-bootstrap"
import { BiUserCircle } from "react-icons/bi"
import { MdOutlineQuiz } from "react-icons/md"
import { AiOutlineQuestionCircle } from "react-icons/ai"

import styles from "./HomePage.scss"

import Button from "~/components/Button/Button"

const cx = classNames.bind(styles)

function HomePage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <Container
      style={{ lg: { paddingTop: "100px" }, md: { paddingTop: "20px" } }}
    >
      <Row>
        <Col xs="12" md="12" lg="6" className="homepage-wrap">
          <img
            src={homePageImage}
            alt="Learn without limits and spread knowledge."
            className="homepage_wrap--image"
          />
          <div className="homepage_wrap--introduce">
            <div className="homepage_wrap--introduce--card">
              <div className="homepage-introduce">
                <div className="homepage--image">
                  <BiUserCircle className="homepage--image-icon" />
                </div>
                <div className="homepage--value">
                  <strong className="homepage--value--course">
                    100+ users{" "}
                  </strong>
                </div>
              </div>
              <div className="homepage-introduce">
                <div className="homepage--image">
                  <MdOutlineQuiz
                    className="homepage--image-icon"
                    color="#FFD95A"
                  />
                </div>
                <div className="homepage--value">
                  <strong className="homepage--value--course">
                    200+ Quizzes{" "}
                  </strong>
                </div>
              </div>
              <div className="homepage-introduce">
                <div className="homepage--image">
                  <AiOutlineQuestionCircle
                    className="homepage--image-icon"
                    color="#2CD3E1"
                  />
                </div>
                <div className="homepage--value">
                  <strong className="homepage--value--course">
                    1000+ questions
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs="12" md="12" lg="6" className={cx("homepage-content")}>
          <Stack direction="column">
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
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
