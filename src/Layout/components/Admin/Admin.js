import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import { postLogout } from "~/services/ApiServices";
import { doLogout } from "~/redux/action/userAction";

import PerfectScrollbar from "react-perfect-scrollbar";
import SideBar from "./SideBar";
import Language from "~/Layout/components/Header/Language";

import "./Admin.scss";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      // clear data Redux
      dispatch(doLogout());
      navigate("/login");
    }
  };
  const { t } = useTranslation();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <div className="admin-header-left">
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className="admin-header-right">
            <Language />
            <>
              <NavDropdown
                title={t("admin.adminSetting")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>{t("admin.adminProfile")} </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  {t("admin.adminLogout")}
                </NavDropdown.Item>
              </NavDropdown>
            </>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
