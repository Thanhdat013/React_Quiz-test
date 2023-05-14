import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
  listUser,
  handleClickUpdate,
  handleClickViewDetail,
  handleClickDelete,
  fetchListUsersWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (e) => {
    fetchListUsersWithPaginate(+e.selected + 1);
    setCurrentPage(+e.selected + 1);
    console.log(`User requested page number ${e.selected}, which is offset `);
  };
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
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel={t("tableUser.tableUserNext")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={t("tableUser.tableUserPrev")}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
