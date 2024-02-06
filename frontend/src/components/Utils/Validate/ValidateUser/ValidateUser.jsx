import React, { useState } from "react";

import Validate from "../Validate";
import Request from "../../Request/Request";

const ValidateUser = (props) => {
  const [userId, setUserId] = useState(null);
  const [request, setRequest] = useState(false);

  const onSaveID = (id) => {
    const userId = `${id.option}?${id.inputValue}`;

    setUserId(userId);
    setRequest(true);
  };

  const proccedHandler = (user) => {
    props.onNext(user);
  };

  const onCloseRequestHandler = () => {
    setRequest(false);
  };

  return (
    <>
      {request && (
        <Request
          request={2}
          data={userId}
          onClose={onCloseRequestHandler}
          onClick={proccedHandler}
        />
      )}
      <Validate user={true} admin={props.admin} onSave={onSaveID} />
    </>
  );
};

export default ValidateUser;
