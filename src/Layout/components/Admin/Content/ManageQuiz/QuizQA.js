import { useState, useEffect } from "react";
import Select from "react-select";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import { FcPlus, FcMinus } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  getAllQuiz,
  getQuizWithQA,
  postUpsertQA,
} from "~/services/ApiServices";

const initQuestion = [
  {
    id: uuidv4(),
    description: "",
    imageFile: "",
    imageName: "",
    answers: [
      {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      },
    ],
  },
];
const QuizQA = () => {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState(initQuestion);

  // add and remove questions
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      let removeQuestion = questionClone.filter(
        (question) => question.id !== id
      );

      setQuestions(removeQuestion);
    }
  };

  // add and remove answers
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (type === "ADD" && index > -1) {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE" && index > -1) {
      questionClone[index].answers = questionClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );

      setQuestions(questionClone);
    }
  };

  // change value of question and answers
  const handleChangeQuestionAnswer = (type, e, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (type === "QUESTION") {
      questionClone[index].description = e.target.value;
      setQuestions(questionClone);
    }
    let indexAnswer = questionClone[index].answers.findIndex(
      (answer) => answer.id === answerId
    );
    if (type === "ANSWER") {
      questionClone[index].answers[indexAnswer].description = e.target.value;
      setQuestions(questionClone);
    }
    if (type === "CHECKBOX") {
      questionClone[index].answers[indexAnswer].isCorrect =
        !questionClone[index].answers[indexAnswer].isCorrect;
      setQuestions(questionClone);
    }
  };

  // add + remove image for questions
  const handleAddImage = (e, questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (e.target.files[0] !== undefined) {
      questionClone[index].imageFile = e.target.files[0];
      setQuestions(questionClone);
    }
  };
  const handleRemoveImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);

    questionClone[index].imageFile = "";
    setQuestions(questionClone);
  };

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [isValidQuestion, setIsValidQuestion] = useState(false);
  const [isValidAnswer, setIsValidAnswer] = useState(false);

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res.EC === 0) {
      let quiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(quiz);
    }
  };

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) fetchListQuizWithQA();
  }, [selectedQuiz]);

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const fetchListQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      console.log(res);
      // convert base64 to File object for image
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let question = res.DT.qa[i];
        if (question.imageFile) {
          question.imageFile = await urltoFile(
            `data:image/png;base64,${question.imageFile}`,
            `Question-${question.id}.png`,
            "image/png"
          );
        }
        newQA.push(question);
      }

      setQuestions(newQA);
    }
  };

  const handleSubmitQuestion = async () => {
    // invalidate for add  quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Invalid quiz");
      return;
    }

    // invalidate for add question
    let isValidQ = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ = i;
        break;
      }
    }

    if (isValidQ === false) {
      setIsValidQuestion(true);
      return;
    }

    // invalidate for add  answer
    let isValidA = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidA = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (isValidA === false) break;
    }

    if (isValidA === false) {
      setIsValidAnswer(true);
      return;
    }

    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        // convert file object to base 64
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchListQuizWithQA();
    }

    setQuestions(initQuestion);
    setSelectedQuiz({});
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="question-container">
      <div className="select-quiz">
        <label className="form-label">{t("quizQA.quizQAType")}</label>
        <Select
          options={listQuiz}
          placeholder={t("quizQA.quizQAType")}
          value={selectedQuiz}
          onChange={setSelectedQuiz}
        />
      </div>
      {/* render question */}
      {questions &&
        questions.length > 0 &&
        questions.map((item) => {
          return (
            <div key={item.id} className="add-question-container mb-5">
              <div className="add-question-container-left">
                <form className="row g-3 questions-container-left ">
                  <div className="col-md-12  ">
                    <label className="form-label mb-3">
                      {t("quizQA.quizQAQuestion")}
                    </label>
                    <div className="question-body">
                      <input
                        value={item.description}
                        onChange={(e) =>
                          handleChangeQuestionAnswer("QUESTION", e, item.id)
                        }
                        type="text"
                        className={
                          isValidQuestion === false
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder={t("quizQA.quizQAAddQuestion")}
                        onFocus={() => setIsValidQuestion(false)}
                      />
                      <div className="add-remove-icon">
                        <FcPlus
                          onClick={() => handleAddRemoveQuestion("ADD")}
                        />
                      </div>

                      {questions.length > 1 && (
                        <div className="add-remove-icon">
                          <FcMinus
                            onClick={() =>
                              handleAddRemoveQuestion("REMOVE", item.id)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <label className="form-label mb-1 ">
                    {t("quizQA.quizQAAnswer")}
                  </label>
                  {/* render answer */}
                  {item.answers &&
                    item.answers.map((answer) => {
                      return (
                        <div key={answer.id} className="col-md-12 ">
                          <div className=" answer-container">
                            <input
                              className="answer-container-check"
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(e) =>
                                handleChangeQuestionAnswer(
                                  "CHECKBOX",
                                  e,
                                  item.id,
                                  answer.id
                                )
                              }
                            />
                            <input
                              type="text"
                              className={
                                isValidAnswer === false
                                  ? "form-control col-md-10 answer-container-text"
                                  : "form-control col-md-10 answer-container-text is-invalid"
                              }
                              onFocus={() => setIsValidAnswer(false)}
                              placeholder={t("quizQA.quizQAAddAnswer")}
                              value={answer.description}
                              onChange={(e) =>
                                handleChangeQuestionAnswer(
                                  "ANSWER",
                                  e,
                                  item.id,
                                  answer.id
                                )
                              }
                            />
                            <div className="add-remove-icon">
                              <FcPlus
                                onClick={() =>
                                  handleAddRemoveAnswer("ADD", item.id)
                                }
                              />
                            </div>
                            {item.answers.length > 1 && (
                              <div className="add-remove-icon">
                                <FcMinus
                                  onClick={() =>
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      item.id,
                                      answer.id
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </form>
              </div>
              <div className="add-questions-container-right ">
                <form className="row g-3 questions-container-right ">
                  <div className="col-md-12">
                    <input
                      type="file"
                      hidden
                      id={`${item.id}`}
                      onChange={(e) => handleAddImage(e, item.id)}
                    />
                  </div>
                  <div className="col-md-12 question-image-preview">
                    {item.imageFile ? (
                      <img
                        src={URL.createObjectURL(item.imageFile)}
                        className="question-image"
                      />
                    ) : (
                      <span>{t("quizQA.quizQAPreviewImage")}</span>
                    )}
                  </div>
                  <div className="question-btn-image">
                    <label
                      className="form-label upload-file"
                      htmlFor={`${item.id}`}
                    >
                      <FcPlus />
                      {t("quizQA.quizQAUploadImage")}
                    </label>
                    <label
                      className="form-label upload-file"
                      onClick={() => handleRemoveImage(item.id)}
                    >
                      <FcMinus />
                      {t("quizQA.quizQARemoveImage")}
                    </label>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <Button
          className="btn btn-warning"
          onClick={() => handleSubmitQuestion()}
        >
          {t("quizQA.quizQASave")}
        </Button>
      )}
    </div>
  );
};

export default QuizQA;
