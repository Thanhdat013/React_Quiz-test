import { useTranslation } from "react-i18next";

const TableUser = ({
  listUser,
  handleClickUpdate,
  handleClickViewDetail,
  handleClickDelete,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">{t("tableUser.tableUserId")}</th>
            <th scope="col">{t("tableUser.tableUserName")}</th>
            <th scope="col">{t("tableUser.tableUserEmail")}</th>
            <th scope="col">{t("tableUser.tableUserRole")}</th>
            <th scope="col">{t("tableUser.tableUserAction")}</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickViewDetail(item)}
                  >
                    {t("tableUser.tableUserView")}
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickUpdate(item)}
                  >
                    {t("tableUser.tableUserUpdate")}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDelete(item)}
                  >
                    {t("tableUser.tableUserDelete")}
                  </button>
                </td>
              </tr>
            ))}

          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan="4">{t("tableUser.tableUserData")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
