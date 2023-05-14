import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

import { getDataOverView } from "~/services/ApiServices";

import "./DashBoard.scss";

function DashBoard() {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChar] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getDataOverView();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      let us = res.DT?.users?.countUsers ?? 0;
      let qz = res.DT?.others?.countQuiz ?? 0;
      let qs = res.DT?.others?.countQuestions ?? 0;
      let aw = res.DT?.others?.countAnswers ?? 0;
      const data = [
        { name: t("dashBoard.dashBoardTotalUser"), us },
        { name: t("dashBoard.dashBoardTotalQuizzes"), qz },
        {
          name: t("dashBoard.dashBoardTotalQuestion"),
          qs,
        },
        { name: t("dashBoard.dashBoardTotalAnswer"), aw },
      ];
      setDataChar(data);
    }
  };

  return (
    <div className="dashBoard">
      <div className="dashBoard-title">{t("dashBoard.dashBoardTitle")}</div>
      <div className="dashBoard-wrap">
        <div className="dashBoard-left">
          <div className="dashBoard-total dashBoard-total-user">
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
          </div>
          <div className="dashBoard-total dashBoard-total-quiz">
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
          </div>

          <div className="dashBoard-total dashBoard-QA-question">
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
          </div>
          <div className="dashBoard-total dashBoard-QA-answer">
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
          </div>
        </div>

        <div className="dashBoard-right">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={dataChart}>
              <Bar barSize={20} dataKey="us" fill="green" />
              <Bar barSize={20} dataKey="qz" fill="green" />
              <Bar barSize={20} dataKey="qs" fill="green" />
              <Bar barSize={20} dataKey="aw" fill="green" />

              <XAxis dataKey="name" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
