import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import { deleteQuizForAdmin } from "~/services/ApiServices";

function DeleteQuiz({ show, setShow, dataDeleteQuiz, fetchListQuiz }) {
  const handleClose = () => setShow(false);
  const { t } = useTranslation();

  const handleSubmitDeleteUser = async () => {
    let data = await deleteQuizForAdmin(dataDeleteQuiz.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("deleteQuiz.deleteQuizTitle1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("deleteQuiz.deleteQuizConfirm")}{" "}
          {dataDeleteQuiz && dataDeleteQuiz.id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("deleteQuiz.deleteQuizCancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("deleteQuiz.deleteQuizYes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteQuiz;
