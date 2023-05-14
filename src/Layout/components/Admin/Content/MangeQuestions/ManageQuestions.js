import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import "./ManageQuestions.scss";

import AddNewQuestions from "./AddNewQuestions";

const ManageQuestions = () => {
  const [isShow, setIsShow] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const { t } = useTranslation();

  return (
    <div className="quiz-add-container">
      <div className="quiz-add-heading">{t("question.questionManage")}</div>

      <AddNewQuestions />
    </div>
  );
};

export default ManageQuestions;
