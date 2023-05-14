import { useTranslation } from "react-i18next";

import { postChangePassword } from "~/services/ApiServices";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import "./UserSetting.scss";
import { useState } from "react";
import { AiTwotoneEyeInvisible, AiTwotoneEye } from "react-icons/ai";

function UserPassword({ show, setShow }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIconPassword, setIsShowIconPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { t } = useTranslation();
  const handleSubmitChangePassword = async () => {
    let res = await postChangePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      setCurrentPassword(newPassword);
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
    setIsShowIconPassword(!isShowIconPassword);
  };
  return (
    <Form>
      <Form.Group className="mb-3 password-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={!isShowPassword ? "password" : "text"}
          placeholder="Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div className="password-icon">
          {!isShowIconPassword ? (
            <AiTwotoneEyeInvisible onClick={() => handleShowHidePassword()} />
          ) : (
            <AiTwotoneEye onClick={() => handleShowHidePassword()} />
          )}
        </div>
      </Form.Group>
      <Form.Group className="mb-3 password-group">
        <Form.Label>Change Password</Form.Label>
        <Form.Control
          type={!isShowPassword ? "password" : "text"}
          placeholder="Change Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="password-icon">
          {!isShowIconPassword ? (
            <AiTwotoneEyeInvisible onClick={() => handleShowHidePassword()} />
          ) : (
            <AiTwotoneEye onClick={() => handleShowHidePassword()} />
          )}
        </div>
      </Form.Group>
      <Form.Group className="form-footer">
        <Button className="btn btn-secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          className="btn btn-primary"
          onClick={() => handleSubmitChangePassword()}
        >
          Save
        </Button>
      </Form.Group>
    </Form>
  );
}

export default UserPassword;
