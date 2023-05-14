import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResult({
  show,
  setShow,
  dataModalResult,
  setIsShowSubmitFinish,
  setIsShowResultAnswer,
}) {
  const handleClose = () => {
    setShow(false);
  };
  const handleShowResultAnswer = () => {
    setShow(false);
    setIsShowResultAnswer(true);
  };
  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("resultQuiz.resultQuizAnswer")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("resultQuiz.resultQuizQuestion")}
            <b>{dataModalResult.countTotal}</b>{" "}
          </div>
          <div>
            {t("resultQuiz.resultQuizAnswerCorrect")}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowResultAnswer}>
            {t("resultQuiz.resultQuizShow")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("resultQuiz.resultQuizCancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
