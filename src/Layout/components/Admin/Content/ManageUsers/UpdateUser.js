import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FcPlus } from "react-icons/fc";

import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";
import { putUpdateUser } from "~/services/ApiServices";

import _ from "lodash";

function UpdateUser({
  fetchListUsers,
  show,
  setShow,
  dataUpdateUser,
  setDataUpdateUser,
  fetchListUsersWithPaginate,
  currentPage,
  setCurrentPage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdateUser)) {
      // check xem nếu không phải là Object rỗng
      setEmail(dataUpdateUser.email);
      setUserName(dataUpdateUser.username);
      setRole(dataUpdateUser.role);
      setAvatar("");
      if (dataUpdateUser.image) {
        setPreviewAvatar(`data:image/jpeg;base64,${dataUpdateUser.image}`);
      }
    }
  }, [dataUpdateUser]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setAvatar("");
    setPreviewAvatar("");
    setDataUpdateUser({}); // set lại cho data của user thành Object rỗng đễ k lỗi useEffect
  };

  const handleSubmitCreateUser = async () => {
    let data = await putUpdateUser(dataUpdateUser.id, userName, role, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      await fetchListUsersWithPaginate(currentPage);
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
          <Modal.Title>{t("updateUser.updateUserTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t("user.userEmail")}</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("user.userPassword")}</label>
              <input
                disabled
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
            {t("updateUser.updateUserClose")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("updateUser.updateUserSave")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
