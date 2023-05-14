import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";

import "./Auth.scss";
import Button from "~/components/Button/Button";
import { postLogin } from "~/services/ApiServices";
import { doLogin } from "~/redux/action/userAction";
import Language from "~/Layout/components/Header/Language";

function Login() {
  // Redux
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    setIsLoading(true);
    // submit Api
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  // Navigate
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  const handleNavigateSignup = () => {
    navigate("/signup");
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleLogin();
  };
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-header">
        <span>{t("login.loginTitle")} </span>
        <Button
          outline
          className="sign-btn"
          onClick={() => handleNavigateSignup()}
        >
          Sign up
        </Button>
        <Language />
      </div>
      <div className="login-title col-4  mx-auto">{t("login.loginName")}</div>
      <div className="login-welcome col-4  mx-auto">
        {t("login.loginWelcome")}
      </div>
      <div className="login-form col-4 mx-auto">
        <div className="form-group">
          <label>{t("login.loginEmail")}</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>{t("login.loginPassword")}</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <span className="forgot-password">
          {t("login.loginForgotPassword")}
        </span>
        <div>
          <Button
            primary
            className="login-btn"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="loaderIcon" />}
            {t("login.loginSubmit")}
          </Button>
        </div>
        <div className="text-center ">
          <Button
            outline
            className="back-home-btn"
            onClick={() => handleBackHome()}
          >
            &#60;&#60; {t("login.loginBackHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
