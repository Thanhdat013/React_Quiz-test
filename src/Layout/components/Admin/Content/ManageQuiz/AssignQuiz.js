import Select from "react-select";
import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";

import {
  getAllQuiz,
  getAllUser,
  postAssignQuizForUser,
} from "~/services/ApiServices";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);

  // useEffect(() => {
  //   fetchListQuizWithQA();
  // }, [selectedQuiz]);

  // const fetchListQuizWithQA = async () => {
  //   let res = await getQuizWithQA(selectedQuiz.value);
  //   console.log(res);
  // };

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res.EC === 0) {
      let quizAll = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(quizAll);
    }
  };

  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      let userAll = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(userAll);
    }
  };

  const handleAssignQuizForUser = async () => {
    let res = await postAssignQuizForUser(
      selectedQuiz.value,
      selectedUser.value
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 ">
          <label className="form-label">{t("assignQuiz.assignQuizType")}</label>
          <Select
            options={listQuiz}
            placeholder="List quiz.."
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">{t("assignQuiz.assignQuizUser")}</label>
          <Select
            options={listUser}
            placeholder="List user..."
            defaultValue={selectedUser}
            onChange={setSelectedUser}
          />
        </div>
      </div>
      <Button
        className="btn btn-warning mt-4"
        onClick={() => handleAssignQuizForUser()}
      >
        {t("assignQuiz.assignQuizAssign")}{" "}
      </Button>
    </>
  );
};

export default AssignQuiz;
