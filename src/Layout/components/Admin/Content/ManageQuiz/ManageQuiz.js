import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import { getAllQuiz } from "~/services/ApiServices";

import "./ManageQuiz.scss";

import AddNewQuiz from "./AddNewQuiz";
import TableQuizzes from "./TableQuizzes";
import DeleteQuiz from "./DeleteQuiz";
import UpdateQuiz from "./UpdateQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

const ManageQuiz = () => {
  const { t } = useTranslation();

  const [isShow, setIsShow] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  // set state delete quiz
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

  // set state update quiz
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleShowAddNewQuiz = () => {
    setIsShow(true);
  };
  const handleClickDeleteQuiz = (quiz) => {
    setShowDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  const handleClickUpdateQuiz = (quiz) => {
    setShowUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };

  return (
    <div className="quiz-add-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="quiz-add-heading">
            {t("manageQuiz.manageQuiz")}
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <TableQuizzes
                listQuiz={listQuiz}
                handleClickDeleteQuiz={handleClickDeleteQuiz}
                handleClickUpdateQuiz={handleClickUpdateQuiz}
              />
            </div>
            <div className="quiz-add-body">
              <Button
                className="btn btn-primary"
                onClick={() => handleShowAddNewQuiz()}
              >
                {t("manageQuiz.manageQuizAdd")}{" "}
              </Button>
            </div>
            <AddNewQuiz
              show={isShow}
              setShow={setIsShow}
              fetchListQuiz={fetchListQuiz}
            />
            <DeleteQuiz
              show={showDeleteQuiz}
              setShow={setShowDeleteQuiz}
              fetchListQuiz={fetchListQuiz}
              dataDeleteQuiz={dataDeleteQuiz}
            />
            <UpdateQuiz
              show={showUpdateQuiz}
              setShow={setShowUpdateQuiz}
              fetchListQuiz={fetchListQuiz}
              dataUpdateQuiz={dataUpdateQuiz}
              setDataUpdateQuiz={setDataUpdateQuiz}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="quiz-add-heading">
            {t("manageQuiz.manageQuizUpdate")}
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="quiz-add-heading">
            {t("manageQuiz.manageQuizAssign")}
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
