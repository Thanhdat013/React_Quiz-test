import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const role = useSelector((state) => state.user.account.role)
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>
  }
  if (role === "ADMIN" && isAuthenticated) {
    return <>{children}</>
  } else {
    return (
      <>
        <div className=" mt-3 alert alert-danger">
          You do not have permission to access this page! &nbsp;
          <strong
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
            }}
          >
            Go back home
          </strong>
        </div>
      </>
    )
  }
}

export default PrivateRoutes
