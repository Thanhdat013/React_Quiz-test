import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./ListQuiz.scss"

import { getQuizByUser, getAllQuiz } from "~/services/ApiServices"

const ListQuiz = () => {
  const navigate = useNavigate()
  const [arrQuiz, setArrQuiz] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    getQuizData()
  }, [])

  const getQuizData = async () => {
    // const res = await getQuizByUser()
    const res = await getAllQuiz()
    if (res && res.EC === 0) {
      setArrQuiz(res.DT)
    }
  }
  return (
    <Container className="list-quiz-container  ">
      <Row style={{ width: "100%" }}>
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((item, index) => {
            return (
              <Col
                lg="3"
                md="4"
                sm="11"
                key={item.id}
                className="list-quiz_card"
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: " 4px",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    className="card-img-top "
                    src={`data:image/jpeg;base64, ${item.image}`}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {t("quiz.quizTitle1")}
                      {index + 1}
                    </h5>
                    <p className="card-text">{item.description}</p>
                    <Button
                      className="btn btn-primary card_btn "
                      onClick={() =>
                        navigate(`/quiz/${item.id}`, {
                          state: { quizTitle: item.description },
                        })
                      }
                    >
                      {t("quiz.quizButton")}
                    </Button>
                  </div>
                </div>
              </Col>
            )
          })}
      </Row>
      {arrQuiz && arrQuiz.length === 0 && <div>{t("quiz.quizNotice")}</div>}
    </Container>
  )
}

export default ListQuiz
