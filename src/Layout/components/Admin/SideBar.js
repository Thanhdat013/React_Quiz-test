import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import { FaGem, FaGithub } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.scss";

import sidebarBg from "~/assets/bg_sidebar.jpg";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            onClick={() => navigate("/")}
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            {t("sideBar.sideBarTitle")}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
              // suffix={<span className="badge red">New</span>}
            >
              {t("sideBar.sideBarDashboard")}
              <Link to="/admin" />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaGem />}
              title={t("sideBar.sideBarFeature")}
            >
              <MenuItem onClick={() => navigate("/admin/manage-user")}>
                {t("sideBar.sideBarManageUser")}
              </MenuItem>

              <MenuItem onClick={() => navigate("/admin/manage-quizzes")}>
                {t("sideBar.sideBarManageQuiz")}
              </MenuItem>

              <MenuItem onClick={() => navigate("/admin/manage-questions")}>
                {t("sideBar.sideBarManageQuestion")}
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {t("sideBar.sideBarViewSource")}
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
