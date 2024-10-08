import React, { useState, useRef } from "react";
import { navigate } from "gatsby";
import { isValidEmail } from "@helpers/index";

// @ts-ignore
import * as styles from "./Form.module.scss";
import axios from "axios";
import axiosClient from "../../../../../axiosClient";

const Form = () => {
  const attachmentInput = useRef(null);
  const [data, setData] = useState({
    name: {
      value: "",
      valid: false,
    },
    company: {
      value: "",
      valid: false,
    },
    email: {
      value: "",
      valid: false,
    },
    message: {
      value: "",
      valid: false,
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((data) => ({
      ...data,
      [name]: {
        valid: name === "email" ? isValidEmail(value) : value,
        value: value,
      },
    }));
  };

  const [isValid, setIsValid] = useState(true);
  const [filesList, setFilesList] = useState([]);

  const fileAccept =
    ".png,.jpg,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid =
      data.name.valid && isValidEmail(data.email.value) && data.message.valid;

    setIsValid(valid);

    const formData = new FormData();

    formData.append("name", data.name.value);
    formData.append("company", data.company.value);
    formData.append("email", data.email.value);
    formData.append("message", data.message.value);
    formData.append("file", attachmentInput.current.files[0] || "");

    valid &&
      axiosClient
        .post("/messages", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 200) {
            navigate("/thanks");
          } else {
            navigate("/error");
          }
        })
        .catch(() => {
          navigate("/error");
        });
  };

  const handleInputFileChange = async (e) => {
    const mergedFilesList = [...e.target.files];
    setFilesList(mergedFilesList);
  };

  const handleFileClear = async () => {
    setFilesList([]);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.formTitle}>REQUEST A QUOTE</h3>
        <div className={`${styles.inputWrapper} ${styles.nameWrapper}`}>
          <input
            className={`${styles.input} ${
              !isValid && !data.name.valid ? styles.error : ""
            } ${data.name.valid ? styles.focused : ""}`}
            type="text"
            name="name"
            id="name"
            required
            onChange={handleChange}
          />
          <label className={styles.placeholder} htmlFor="name">
            Full Name
          </label>
        </div>
        <div className={`${styles.inputWrapper} ${styles.companyWrapper}`}>
          <input
            className={`${styles.input} ${
              data.company.valid ? styles.focused : ""
            }`}
            type="text"
            name="company"
            id="company"
            onChange={handleChange}
          ></input>
          <label className={styles.placeholder} htmlFor="company">
            Company
          </label>
        </div>
        <div className={`${styles.inputWrapper} ${styles.emailWrapper}`}>
          <input
            className={`${styles.input} ${
              !isValid && !data.email.valid ? styles.error : ""
            } ${data.email.value.length ? styles.focused : ""}`}
            type="text"
            name="email"
            id="email"
            required
            onChange={handleChange}
          />
          <label className={styles.placeholder} htmlFor="email">
            Email
          </label>
        </div>
        <h3 className={`${styles.formTitle}`}>Message</h3>
        <div className={styles.textareaWrapper}>
          <textarea
            className={`${styles.textarea} ${
              !isValid && !data.message.valid ? styles.error : ""
            } ${data.message.valid ? styles.focused : ""}`}
            name="message"
            id="message"
            required
            onChange={handleChange}
          ></textarea>
          <label className={styles.placeholder} htmlFor="message">
            What is your project about?
          </label>
          <div className={styles.block}></div>
          <div
            className={`${styles.attachmentWrapper} ${
              filesList.length ? styles.attached : ""
            }`}
          >
            <label
              className={styles.attachmentLabel}
              htmlFor="attachment-file"
            ></label>
            <input
              className={styles.attachmentFile}
              type="file"
              name="quote-file"
              id="attachment-file"
              ref={attachmentInput}
              accept={fileAccept}
              onChange={handleInputFileChange}
            ></input>
            <div className={styles.attachmentName}>
              <button
                type="reset"
                className={styles.attachmentButton}
                onClick={handleFileClear}
              ></button>
              {!!filesList.length && <span>{filesList[0].name}</span>}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.button} type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
