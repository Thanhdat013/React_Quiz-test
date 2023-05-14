import { useRef } from "react";

import CountDown from "./CountDown";
import "./RightQuizTest.scss";

const RightQuizTest = ({
  dataQuiz,
  handleFinishQuiz,
  setCurrentQuestion,
  statusCount,
}) => {
  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleFinishQuiz();
  };

  const getQuestion = (question) => {
    //check answer
    if (question && question.answer.length > 0) {
      let isAnswerSelected = question.answer.find((a) => a.isChecked === true);
      if (isAnswerSelected) {
        return "quiz-container-question selected";
      }
    }
    return "quiz-container-question";
  };

  const handleClickQuestion = (question, index) => {
    setCurrentQuestion(index);

    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "quiz-container-question clicked") {
          item.className = "quiz-container-question";
        }
      });
    }
    if (question && question.answer.length > 0) {
      let isAnswerSelected = question.answer.find((a) => a.isChecked === true);
      if (isAnswerSelected) {
        return;
      }
    }
    refDiv.current[index].className = "quiz-container-question clicked";
  };

  return (
    <>
      <div className="quiz-timer">
        <CountDown
          statusCount={statusCount}
          onTimeUp={onTimeUp}
          handleFinishQuiz={handleFinishQuiz}
        />
      </div>
      <div className="quiz-container-wrap">
        {dataQuiz.map((item, index) => (
          <div
            key={item.questionId}
            className={getQuestion(item)}
            onClick={() => handleClickQuestion(item, index)}
            ref={(element) => (refDiv.current[index] = element)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default RightQuizTest;
