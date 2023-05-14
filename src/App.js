import Header from "~/Layout/components/Header/Header"
import { Outlet } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar"

import "./App.scss"
const App = () => {
  return (
    <div className="app-container">
      <div className="app-container_content">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-content">
          <div className="sidebar-container"></div>
        </div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default App
