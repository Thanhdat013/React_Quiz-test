import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import "./ListQuiz.scss";

import { getQuizByUser } from "~/services/ApiServices";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div key={item.id} className="card" style={{ width: "18rem" }}>
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
                  className="btn btn-primary "
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
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>{t("quiz.quizNotice")}</div>}
    </div>
  );
};

export default ListQuiz;
