import React from "react";

import styles from "./styles.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div
      className={
        styles.container +
        " d-flex justify-content-center align-items-center mx-auto"
      }
    >
      <div
        className={
          styles.wrapper + " d-flex rounded flex-column flex-md-row border "
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
