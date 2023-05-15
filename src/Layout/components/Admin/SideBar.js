import { useTranslation } from "react-i18next"
import { FaChalkboard, FaGithub } from "react-icons/fa"
import { MdDashboard, MdOutlineQuiz } from "react-icons/md"
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar"

import { Link, useNavigate } from "react-router-dom"

import "react-pro-sidebar/dist/css/styles.css"
import "./SideBar.scss"

import sidebarBg2 from "~/assets/bg_sidebar2.jpg"

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <ProSidebar
        image={sidebarBg2}
        collapsed={collapsed}
        // toggled
        breakPoint="sm"
        // onToggle
      >
        <SidebarHeader>
          {collapsed ? (
            <div
              onClick={() => navigate("/")}
              style={{
                padding: "14px",
                cursor: "pointer",
              }}
            >
              <MdOutlineQuiz size={"2.8em"} color={"#FFF9DE"} />
            </div>
          ) : (
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
              <MdOutlineQuiz size={"2.8em"} color={"#FFF9DE"} />
              <span style={{ marginLeft: "8px" }}>
                {t("sideBar.sideBarTitle")}
              </span>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              {t("sideBar.sideBarDashboard")}
              <Link to="/admin" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaChalkboard />}
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
          {collapsed ? (
            <div className="sidebar-btn_collapse">
              <a
                href="https://github.com/Thanhdat013/React_Quiz-test"
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
                ></span>
              </a>
            </div>
          ) : (
            <div className="sidebar-btn-wrapper">
              <a
                href="https://github.com/azouaoui-med/react-pro-sidebar"
                // href="https://github.com/Thanhdat013/React_Quiz-test"
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
          )}
        </SidebarFooter>
      </ProSidebar>
    </>
  )
}

export default SideBar
