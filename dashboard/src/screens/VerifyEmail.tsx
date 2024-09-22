import React, { createRef, useState } from "react";
import axiosClient from "../../axios-client";

const VerifyEmail = ({ route }) => {
  // eslint-disable-next-line react/prop-types
  const { email } = route.params;
  const emailRef = createRef();
  const TokenRef = createRef();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData();

    formData.append("token", TokenRef.current.value);
    formData.append("email", email);
    axiosClient
      .post("/Verify", formData)
      .then(({ data }) => {
        console.log(data);  
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response?.status === 422) {
          setMessage(response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Verify your Email</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

          <input ref={emailRef} type="email" placeholder="Verify Code" />
          <button className="btn btn-block">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
