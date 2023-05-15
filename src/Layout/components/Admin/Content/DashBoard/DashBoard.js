import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  YAxis,
  LabelList,
} from "recharts"

import { getDataOverView } from "~/services/ApiServices"

import "./DashBoard.scss"
import { Col, Container, Row } from "react-bootstrap"

function DashBoard() {
  const [dataOverView, setDataOverView] = useState([])
  const [dataChart, setDataChar] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    fetchDataOverView()
  }, [])

  const fetchDataOverView = async () => {
    let res = await getDataOverView()
    if (res && res.EC === 0) {
      setDataOverView(res.DT)
      let us = res.DT?.users?.countUsers ?? 0
      let qz = res.DT?.others?.countQuiz ?? 0
      let qs = res.DT?.others?.countQuestions ?? 0
      let aw = res.DT?.others?.countAnswers ?? 0
      const data = [
        { name: t("dashBoard.dashBoardTotalUser"), key: us },
        { name: t("dashBoard.dashBoardTotalQuizzes"), key: qz },
        {
          name: t("dashBoard.dashBoardTotalQuestion"),
          key: qs,
        },
        { name: t("dashBoard.dashBoardTotalAnswer"), key: aw },
      ]
      setDataChar(data)
    }
  }

  return (
    <Container className="dashBoard">
      <h4 className="dashBoard-title">{t("dashBoard.dashBoardTitle")}</h4>
      <Row className="dashBoard-wrap">
        <Col lg="12" md="52" sm="12" className="dashBoard-left">
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col
              lg="5"
              md="5"
              sm="12"
              className="dashBoard-total dashBoard-total-user"
            >
              <span>{t("dashBoard.dashBoardTotalUser")}</span>
              <span className="dashBoard-total-amount">
                {dataOverView &&
                dataOverView.users &&
                dataOverView.users.countUsers ? (
                  <>{dataOverView.users.countUsers}</>
                ) : (
                  0
                )}
              </span>
            </Col>
            <Col
              lg="5"
              md="5"
              sm="12"
              className="dashBoard-total dashBoard-total-quiz"
            >
              <span>{t("dashBoard.dashBoardTotalQuizzes")}</span>
              <span className="dashBoard-total-amount">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countQuiz ? (
                  <>{dataOverView.others.countQuiz}</>
                ) : (
                  0
                )}
              </span>
            </Col>

            <Col
              lg="5"
              md="5"
              sm="12"
              className="dashBoard-total dashBoard-QA-question"
            >
              <span>{t("dashBoard.dashBoardTotalQuestion")}</span>
              <span className="dashBoard-total-amount">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countQuestions ? (
                  <>{dataOverView.others.countQuestions}</>
                ) : (
                  0
                )}
              </span>
            </Col>
            <Col
              lg="5"
              md="5"
              sm="12"
              className="dashBoard-total dashBoard-QA-answer"
            >
              <span> {t("dashBoard.dashBoardTotalAnswer")}</span>
              <span className="dashBoard-total-amount">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countAnswers ? (
                  <>{dataOverView.others.countAnswers}</>
                ) : (
                  0
                )}
              </span>
            </Col>
          </Row>
        </Col>

        <Col lg="12" md="52" sm="12" className="dashBoard-right">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={dataChart}>
              <Bar dataKey="key" fill="#F9D949" barSize={60}>
                <LabelList dataKey="key" content="key" position="top" />
              </Bar>
              <XAxis dataKey="name" />
              <YAxis />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default DashBoard
