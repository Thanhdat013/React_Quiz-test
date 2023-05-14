import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getDataQuiz, postSubmitQuiz } from "~/services/ApiServices";

import "./DetailQuiz.scss";
import Button from "~/components/Button/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightQuizTest from "./RightQuizTest/RightQuizTest";

const DetailQuiz = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation(); // check được xem người dùng chuyển hường từ đâu sang
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [isShowSubmitFinish, setIsShowSubmitFinish] = useState(false);
  const [isShowResultAnswer, setIsShowResultAnswer] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [statusCount, setStatusCount] = useState(true);
  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let questionDesc,
            image = null;
          value.map((item, index) => {
            if (index === 0) {
              // để lấy ra giá trị của phần miêu tả và hình ảnh của câu hỏi
              questionDesc = item.description;
              image = item.image;
            }

            item.answers.isChecked = false;
            item.answers.isCorrect = false;
            answer.push(item.answers);
          });
          answer = _.orderBy(answer, ["id"], ["asc"]); // sắp xếp thứ tự các câu hỏi dung thư viện lodash
          return { questionId: key, answer, questionDesc, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleFinishQuiz = async () => {
    setStatusCount(false);
    setIsShowSubmitFinish(true);
    if (dataQuiz && dataQuiz.length > 0) {
      let dataFinishSubmit = {
        quizId: +quizId,
        answers: [],
      };
      let answers = [];
      dataQuiz.forEach((item) => {
        let questionId = +item.questionId;
        let answerResult = [];
        item.answer.map((answerCheck) => {
          if (answerCheck.isChecked) {
            answerResult.push(answerCheck.id);
          }
        });
        answers.push({
          questionId: questionId,
          userAnswerId: answerResult,
        });
      });
      dataFinishSubmit.answers = answers;
      // Submit API
      let res = await postSubmitQuiz(dataFinishSubmit);

      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);

        // Update DataQuiz with correct answer
        let dataQuizClone = _.cloneDeep(dataQuiz);

        let quizData = res.DT.quizData;

        for (const questionQuizData of quizData) {
          // lặp qua mọi phần tử của quizData
          for (let i = 0; i < dataQuizClone.length; i++) {
            let questionSelected = +dataQuizClone[i].questionId;
            if (questionSelected === +questionQuizData.questionId) {
              let answerSelected = [];
              for (let j = 0; j < dataQuizClone[i].answer.length; j++) {
                let answerSelectCorrect = questionQuizData.systemAnswers.find(
                  // Tìm xem nếu câu trả lời có id giống với id kết quả
                  (systemAnswer) =>
                    systemAnswer.id === dataQuizClone[i].answer[j].id
                );
                if (answerSelectCorrect) {
                  // nếu có câu trả lời có id giống với id của kết quả đúng thì set lại isCorrect = true
                  dataQuizClone[i].answer[j].isCorrect = true;
                }
                // tạo lại mảng
                answerSelected.push(dataQuizClone[i].answer[j]);
              }
              // gán lại giá trị isCorrect nêu nó bằng true
              dataQuizClone[i].answer = answerSelected;
            }
          }
        }
        setDataQuiz(dataQuizClone);
      }
    }
  };

  const handleCheckAnswer = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answer) {
      let answerChecked = question.answer.map((item) => {
        if (+item.id === +answerId) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      question.answer = answerChecked;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId // tìm đc cái index trong dataQuizClone mà nó đang được check hoặc uncheck
    );
    if (index > -1) {
      dataQuizClone[index] = question; // gán cái dataQuizClone có cái index đang được check hoặc uncheck giá trị item.isChecked
      setDataQuiz(dataQuizClone);
    }
  };

  const handlePrev = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <>
      <Breadcrumb className="quizBreadcrumb">
        <Breadcrumb.Item onClick={() => navigate("/")}>
          {t("header.headerHome")}
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/users")}>
          {t("header.headerUsers")}
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="quizBreadcrumb-active">
          {t("quiz.quizDoing")}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="quiz-container">
        <div className="quiz-left">
          <h2 className="quiz-left-title">
            {t("quiz.quizTitle1")}
            {location?.state?.quizTitle}
          </h2>
          <Question
            handleCheckAnswer={handleCheckAnswer}
            currentQuestion={currentQuestion}
            isShowResultAnswer={isShowResultAnswer}
            dataQuiz={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
          />
          <div className="quiz-left-footer">
            <Button className="btn-footer" outline onClick={() => handlePrev()}>
              {t("quiz.quizPrev")}
            </Button>
            <Button className="btn-footer" outline onClick={() => handleNext()}>
              {t("quiz.quizNext")}
            </Button>
            <Button
              disabled={isShowSubmitFinish}
              className="btn-footer"
              outline
              onClick={() => handleFinishQuiz()}
            >
              {t("quiz.quizFinish")}
            </Button>
          </div>
        </div>
        <div className="quiz-right">
          <RightQuizTest
            dataQuiz={dataQuiz}
            statusCount={statusCount}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
          setIsShowSubmitFinish={setIsShowSubmitFinish}
          isShowSubmitFinish={isShowSubmitFinish}
          setIsShowResultAnswer={setIsShowResultAnswer}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
