import { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import { createNewQuiz } from "~/services/ApiServices";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { FcPlus } from "react-icons/fc";

import "./ManageQuiz.scss";

const AddNewQuiz = ({ show, setShow, fetchListQuiz }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quizType, setQuizType] = useState("");
  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handleSubmitCreateQuiz = async () => {
    if (!quizType?.value) {
      toast.error("Invalid difficult");
      return;
    }
    let data = await createNewQuiz(desc, name, quizType?.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      fetchListQuiz(); // render lại giao diện
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setQuizType("");
    setImage("");
    setPreviewAvatar("");
  };

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      // check xem có file không
      setPreviewAvatar(URL.createObjectURL(e.target.files[0])); // tạo ra đường dẫn tạm
      setImage(e.target.files[0]);
      e.target.value = null;
      // e.target.value = null; // set cho value bằng null sau khi cọn ảnh, sửa bug onChange khi chọn liên tiếp 2 lần vào 1 ảnh thì giá trị không đổi
    }
  };

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  return (
    <Modal
      backdrop="static"
      show={show}
      onHide={handleClose}
      size="xl"
      className="quiz-modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("addQuiz.addQuizTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">{t("quiz.quizName")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("addQuiz.addQuizName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">{t("quiz.quizDesc")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("addQuiz.addQuizDesc")}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">{t("quiz.quizType")}</label>
            <Select
              options={options}
              placeholder={t("addQuiz.addQuizType")}
              defaultValue={quizType}
              onChange={setQuizType}
            />
          </div>
          <div className="col-md-12">
            <label
              className="form-label quiz-upload-file"
              htmlFor="labelUpload"
            >
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
          <div className="col-md-12 quiz-image-preview">
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
        <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
          {t("quiz.quizSave")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewQuiz;
