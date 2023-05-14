import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./DetailQuiz.scss";

const Question = ({
  dataQuiz,
  currentQuestion,
  handleCheckAnswer,
  isShowResultAnswer,
}) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const { t } = useTranslation();

  if (_.isEmpty(dataQuiz)) {
    // check xem có phải mảng rỗng không vơi thư viện Lodash
    return <></>;
  }

  const handleCheckBox = (e, answerId, questionId) => {
    handleCheckAnswer(answerId, questionId);
  };

  return (
    <>
      <div className="image">
        {dataQuiz.image ? (
          <>
            <img
              onClick={() => setIsPreviewImage(true)}
              className="question-image"
              src={`data:image/jpeg;base64,${dataQuiz.image} `}
            />
            {isPreviewImage === true && (
              <Lightbox
                image={`data:image/jpeg;base64,${dataQuiz.image} `}
                onClose={() => setIsPreviewImage(false)}
              ></Lightbox>
            )}
          </>
        ) : (
          <>
            <img
              className="question-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            />
            {isPreviewImage === true && (
              <Lightbox
                image={`data:image/jpeg;base64,${dataQuiz.image} `}
                onClose={() => setIsPreviewImage(false)}
              ></Lightbox>
            )}
          </>
        )}
      </div>
      {/* render ra question */}
      <div className="question">
        {t("question.question")} {currentQuestion + 1} : {dataQuiz.questionDesc}
      </div>
      {/* render answers in detail quiz */}
      <div className="answer">
        {dataQuiz.answer &&
          dataQuiz.answer.map((item) => {
            return (
              <div key={item.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={(e) =>
                      handleCheckBox(e, item.id, dataQuiz.questionId)
                    }
                  />
                  <label className="form-check-label">{item.description}</label>

                  {isShowResultAnswer &&
                    item.isChecked &&
                    item.isCorrect === false && (
                      <AiOutlineClose className="form-check-incorrect" />
                    )}
                  {isShowResultAnswer && item.isCorrect && (
                    <AiOutlineCheck className="form-check-correct" />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
