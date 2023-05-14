import { useTranslation } from "react-i18next";
import AddNewUser from "./AddNewUser";

import { useState, useEffect } from "react";

import { getAllUser, getUserWithPaginate } from "~/services/ApiServices";

import "./AddNewUser.scss";
import TableUser from "./TableUser";
import UpdateUser from "./UpdateUser";
import ViewDetailUser from "./ViewDetailUser";
import DeleteUser from "./DeleteUser";
import TableUserPaginate from "./TableUserPaginate";

function ManageUser() {
  const LIMIT_USER = 4;

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [listUser, setListUser] = useState([]);
  const [showListUpdateUser, setShowListUpdateUser] = useState(false);
  const [showViewDetailUser, setShowViewDetailUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickUpdate = (user) => {
    setShowListUpdateUser(true);
    setDataUpdateUser(user);
  };
  const handleClickViewDetail = (user) => {
    setShowViewDetailUser(true);
    setDataUpdateUser(user);
  };

  const handleClickDelete = (user) => {
    setShowDeleteUser(true);
    setDataDeleteUser(user);
  };
  const { t } = useTranslation();

  return (
    <div className="manage-user-container">
      <div className="manage-user-title">{t("manageUser.manageUserTitle")}</div>
      <div className="user-content"></div>
      <div>
        <AddNewUser
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="user-table">
        {/* <TableUser
          listUser={listUser}
          handleClickUpdate={handleClickUpdate}
          handleClickViewDetail={handleClickViewDetail}
          handleClickDelete={handleClickDelete}
        /> */}

        <TableUserPaginate
          listUser={listUser}
          handleClickUpdate={handleClickUpdate}
          handleClickViewDetail={handleClickViewDetail}
          handleClickDelete={handleClickDelete}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
      <UpdateUser
        show={showListUpdateUser}
        setShow={setShowListUpdateUser}
        fetchListUsers={fetchListUsers}
        dataUpdateUser={dataUpdateUser}
        setDataUpdateUser={setDataUpdateUser}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ViewDetailUser
        show={showViewDetailUser}
        setShow={setShowViewDetailUser}
        dataUpdateUser={dataUpdateUser}
        setDataUpdateUser={setDataUpdateUser}
      />
      <DeleteUser
        show={showDeleteUser}
        setShow={setShowDeleteUser}
        dataDeleteUser={dataDeleteUser}
        fetchListUsers={fetchListUsers}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ManageUser;
