import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";

import { CreateNewUser } from "~/services/ApiServices";

function AddNewUser({
  fetchListUsers,
  fetchListUsersWithPaginate,
  currentPage,
  setCurrentPage,
}) {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      // check xem có file không
      setPreviewAvatar(URL.createObjectURL(e.target.files[0])); // tạo ra đường dẫn tạm
      setAvatar(e.target.files[0]);
      e.target.value = null;
      // e.target.value = null; // set cho value bằng null sau khi cọn ảnh, sửa bug onChange khi chọn liên tiếp 2 lần vào 1 ảnh thì giá trị không đổi
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setAvatar("");
    setPreviewAvatar("");
  };
  const handleShow = () => setShow(true);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    // Validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await CreateNewUser(email, password, userName, role, avatar);

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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {t("addUser.addUserTitle")}
      </Button>

      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("addUser.addUserTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t("user.userEmail")}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("user.userPassword")}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("user.userTagName")}</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("user.userRole")}</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={"USER"}>{t("user.userUSER")}</option>
                <option value={"ADMIN"}>{t("user.userADmin")}</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label upload-file" htmlFor="labelUpload">
                <FcPlus />
                {t("user.userUploadImage")}
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
                <img src={previewAvatar} className="image" />
              ) : (
                <span>{t("user.userPreviewImage")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("addUser.addUserClose")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("addUser.addUserSave")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewUser;
