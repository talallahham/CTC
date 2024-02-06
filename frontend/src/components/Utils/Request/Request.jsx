import React, { useEffect, useState } from "react";
import {
  addUserRequest,
  deactivateUserRequest,
  editUserRequest,
  getUserRequest,
  reactivateUserRequest,
  saveSampleRequest,
  validateTestRequest,
} from "../../../global/fetch/fetch";

import MessageModal from "../Modal/MessageModal/MessageModal";
import {
  fetchErrorMessages,
  fetchLoadingMessages,
  successFetchMessages,
} from "../../../global/fetch/messages/messages";

const REQUEST_MAPPING = [
  addUserRequest,
  reactivateUserRequest,
  getUserRequest,
  editUserRequest,
  deactivateUserRequest,
  validateTestRequest,
  saveSampleRequest,
];

const getModal = (info, request, isLoading, fetchStatus, onClick, onClose) => {
  let roleName = "";

  if (request === 0 || request == 3) {
    const { role } = info;
    roleName = role === "P" ? "Patient" : role === "R" ? "Requester" : "Tester";
  }

  if (request === 2 || request === 4) {
    const userId = info;
    const role = userId.charAt(0);

    roleName = role === "P" ? "Patient" : role === "R" ? "Requester" : "Tester";
  }

  if (fetchStatus?.status >= 0 && !isLoading) {
    if (request === 0 || request == 3) {
      return (
        <MessageModal
          onClose={onClose}
          header={successFetchMessages(fetchStatus?.status, roleName).header}
          img={successFetchMessages(fetchStatus?.status, roleName).img}
          desc={successFetchMessages(fetchStatus?.status, roleName).message}
          submitMessage={true}
          onClick={onClose}
          btnText={`OK`}
        />
      );
    }

    if (request === 2) {
      return (
        <MessageModal
          onClose={onClose}
          header={successFetchMessages(fetchStatus?.status, roleName).header}
          img={successFetchMessages(fetchStatus?.status, roleName).img}
          desc={successFetchMessages(fetchStatus?.status, roleName).message}
          submitMessage={true}
          onClick={() => {
            onClick(fetchStatus?.data);
          }}
          btnText={`Procced to next`}
        />
      );
    }

    if (request === 6) {
      return (
        <MessageModal
          onClose={onClose}
          header={successFetchMessages(fetchStatus?.status, roleName).header}
          img={successFetchMessages(fetchStatus?.status, roleName).img}
          desc={successFetchMessages(fetchStatus?.status, roleName).message}
          pdf={true}
          sample={fetchStatus?.data}
          onClick={onClose}
          btnText={`Download`}
        />
      );
    }

    return (
      <MessageModal
        onClose={onClose}
        header={successFetchMessages(fetchStatus?.status, roleName).header}
        img={successFetchMessages(fetchStatus?.status, roleName).img}
        desc={successFetchMessages(fetchStatus?.status, roleName).message}
        submitMessage={true}
        onClick={onClick}
        btnText={`OK`}
      />
    );
  }

  if (isLoading) {
    return (
      <MessageModal
        onClose={onClose}
        header={fetchLoadingMessages(request, roleName).header}
        desc={fetchLoadingMessages(request, roleName).message}
      />
    );
  }

  if (fetchStatus < 0) {
    if (!request && fetchStatus === -2) {
      return (
        <MessageModal
          onClose={onClose}
          header={fetchErrorMessages(fetchStatus, roleName).header}
          desc={fetchErrorMessages(fetchStatus, roleName).message}
          submitMessage={true}
          onClick={onClick}
          btnText={`Re-activate ${roleName}`}
        />
      );
    }

    return (
      <MessageModal
        onClose={onClose}
        header={fetchErrorMessages(fetchStatus, roleName).header}
        img={fetchErrorMessages(fetchStatus, roleName).img}
        desc={fetchErrorMessages(fetchStatus, roleName).message}
      />
    );
  }
};

const Request = (props) => {
  const { request, data } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [modal, setModal] = useState(false);

  let fetchData = <></>;
  switch (request) {
    case 0:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      fetchData = data;
      break;
  }

  useEffect(() => {
    setIsLoading(true);
    setModal(true);
    const start = async () => {
      const response = await REQUEST_MAPPING[request](fetchData);
      setFetchStatus(response);
      setIsLoading(false);
    };

    start();
  }, []);

  const onClose = () => {
    setModal(false);
    props.onClose();
  };

  const reactivateUser = async () => {
    const response = await REQUEST_MAPPING[1](data.username);
    setFetchStatus(response);
  };

  let onClick = null;
  switch (request) {
    case 0:
      onClick = reactivateUser;
      break;

    case 2:
    case 4:
    case 5:
      onClick = props.onClick;
      break;
  }

  return (
    <>
      {modal &&
        getModal(data, request, isLoading, fetchStatus, onClick, onClose)}
    </>
  );
};

export default Request;
