import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { FcPlus } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { postUpdateProfile } from "~/services/ApiServices";
import _ from "lodash";

import "./UserSetting.scss";

function UserInformation({ show, setShow }) {
  const currentAccount = useSelector((state) => state.user.account);

  const handleClose = () => {
    setShow(false);
  };
  const handleUpdateProfile = async () => {
    let res = await postUpdateProfile(userName, avatar);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      // handleClose();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
    console.log(res);
    console.log(currentAccount);
  };

  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    if (currentAccount && !_.isEmpty(currentAccount)) {
      setUserName(currentAccount.userName);
      setEmail(currentAccount.email);
      setRole(currentAccount.role);
      setAvatar("");
      if (currentAccount.image) {
        setPreviewAvatar(`data:image/jpeg;base64, ${currentAccount.image}`);
      }
    }
  }, [currentAccount]);

  const handelPreviewAvatar = (e) => {
    if (e.target.files[0] !== undefined) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
      e.target.value = null;
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="row">
          <Form.Group className="col-md-4">
            <Form.Label className="form-label">
              {t("user.userTagName")}
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-4">
            <Form.Label className="form-label">
              {t("user.userEmail")}
            </Form.Label>
            <Form.Control
              disabled
              type="email"
              className="form-control"
              defaultValue={email}
            />
          </Form.Group>

          <Form.Group className="col-md-4">
            <Form.Label className="form-label">{t("user.userRole")}</Form.Label>
            <Form.Control
              className="form-control"
              defaultValue={role}
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group className="col-md-12 image-preview">
            {previewAvatar ? (
              <img src={previewAvatar} className="image" />
            ) : (
              <span>{t("user.userPreviewImage")}</span>
            )}
          </Form.Group>
          <Form.Group className="col-md-12">
            <Form.Label
              className="form-label upload-file"
              htmlFor="labelUpload"
            >
              <FcPlus />
              {t("user.userUploadImage")}
            </Form.Label>
            <Form.Control
              type="file"
              hidden
              id="labelUpload"
              onChange={(e) => handelPreviewAvatar(e)}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group className="form-footer">
          <Button className="btn btn-secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => handleUpdateProfile()}
          >
            Save
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default UserInformation;
