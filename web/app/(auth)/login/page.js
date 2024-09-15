import React from "react";
import styles from "../styles.module.scss";
import LoginForm from "../components/loginForm";
import LoginWithGoogle from "../components/loginWithGoogle";
import Image from "next/image";

const Login = () => {
  const title = "Giriş Yapın";
  return (
    <>
      <div className="border-bottom d-md-none bg-light p-4 text-center">
        <h1 className="m-0 h3">{title}</h1>
      </div>
      <div className="w-100 bg-white " style={{ minHeight: 420, padding: 40 }}>
        <div>
          <LoginWithGoogle />
          <div className="text-center text-muted">
            <div className={styles.separator_line}>
              veya e-posta ile devam et
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="w-100 p-5 text-white d-none d-md-flex justify-content-between flex-column ">
        <div>
          <h5 className="small mb-4">
            <Image src="/next.svg" alt="Logo" height={20} width={80} />
          </h5>
          <h1 className="mb-4">{title}</h1>
          <p className="fw-medium">
            Ürünleri yorumlayın, karşılaştırın, günlük rutinlerinizi takip edin
          </p>
        </div>
        <p className="small text-end fw-medium">
          © 2024 <span>All Rights Reserved</span>
        </p>
      </div>
    </>
  );
};

export default Login;
