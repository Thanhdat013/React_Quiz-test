import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import UserInformation from "./UserInformation";
import UserPassword from "./UserPassword";
import UserHistory from "./UserHistory";

import "./UserSetting.scss";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";

function UserSetting({ show, setShow }) {
  const { t } = useTranslation();
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Profile title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="UserInformation"
            id="fill-tab-example"
            className="mb-3 user-profiles"
            fill
          >
            <Tab eventKey="UserInformation" title="  User information">
              <UserInformation show={show} setShow={setShow} />
            </Tab>
            <Tab eventKey="Password" title="Password">
              <UserPassword show={show} setShow={setShow} />
            </Tab>
            <Tab eventKey="History" title="History">
              <UserHistory show={show} setShow={setShow} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserSetting;
