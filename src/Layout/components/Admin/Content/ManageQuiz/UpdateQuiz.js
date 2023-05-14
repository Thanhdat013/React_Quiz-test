import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";

import { putUpdateQuizForAdmin } from "~/services/ApiServices";

import _ from "lodash";

function UpdateQuiz({
  fetchListQuiz,
  show,
  setShow,
  dataUpdateQuiz,
  setDataUpdateQuiz,
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quizType, setQuizType] = useState("");
  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      // check xem nếu không phải là Object rỗng
      setName(dataUpdateQuiz.name);
      setDesc(dataUpdateQuiz.description);
      setQuizType(dataUpdateQuiz.difficulty);
      setImage("");
      if (dataUpdateQuiz.image) {
        setPreviewAvatar(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setQuizType("");
    setImage("");
    setPreviewAvatar("");
    setDataUpdateQuiz({}); // set lại cho data của user thành Object rỗng đễ k lỗi useEffect
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuizForAdmin(
      dataUpdateQuiz?.id,
      desc,
      name,
      quizType?.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("updateQuiz.updateQuizTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">{t("quiz.quizName")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t("updateQuiz.updateQuizName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">{t("quiz.quizType")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t("updateQuiz.updateQuizDesc")}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">{t("quiz.quizType")}</label>
              <Select
                options={options}
                placeholder={t("updateQuiz.updateQuizType")}
                defaultValue={quizType}
                onChange={setQuizType}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label upload-file" htmlFor="labelUpload">
                <FcPlus />
                {t("quiz.quizUploadImage")}
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handelPreviewAvatar(e)}
              />
            </div>
            <div className="col-md-12 image-preview">
              {previewAvatar ? (
                <img src={previewAvatar} className="quiz-image" />
              ) : (
                <span>{t("quiz.quizPreviewImage")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("quiz.quizClose")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            {t("quiz.quizSave")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateQuiz;
