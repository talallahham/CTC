import React, { useState } from "react";
import Validate from "../Validate";
import Request from "../../Request/Request";

const ValidateTest = (props) => {
  const [request, setRequest] = useState(false);
  const [testId, setTestId] = useState(null);

  const onSaveID = (id) => {
    const tId = `${id.inputValue}${id.option}`;

    setRequest(true);
    setTestId(tId);
  };

  const onCloseRequestHandler = () => {
    setRequest(false);
  };

  const proccedHandler = () => {
    props.onNext(testId);
  };

  return (
    <>
      {request && (
        <Request
          request={5}
          data={testId}
          onClose={onCloseRequestHandler}
          onClick={proccedHandler}
        />
      )}
      <Validate test={true} admin={props.admin} onSave={onSaveID} />
    </>
  );
};

export default ValidateTest;
