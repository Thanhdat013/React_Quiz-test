import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

import { deleteUser } from "~/services/ApiServices";

function DeleteUser({
  show,
  setShow,
  dataDeleteUser,
  fetchListUsers,
  fetchListUsersWithPaginate,
  currentPage,
  setCurrentPage,
}) {
  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDeleteUser.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("deleteUser.deleteUserConfirm")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("deleteUser.deleteUserEmail")}{" "}
          {dataDeleteUser && dataDeleteUser.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("deleteUser.deleteUserCancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("deleteUser.deleteUserDelete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
