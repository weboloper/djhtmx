import React from "react";
import styles from "../styles.module.scss";
import RegisterForm from "../components/registerForm";
import LoginWithGoogle from "../components/loginWithGoogle";
const Register = () => {
  const title = "Ücretsiz Kayıt Ol";
  return (
    <>
      <div className="border-bottom d-md-none bg-light p-4 text-center">
        <h1 className="m-0 h3">{title}</h1>
      </div>
      <div className="w-100 p-5 text-white d-none d-md-flex justify-content-between flex-column">
        <div>
          <h5 className="small mb-4">Henüz Üye Değil Misiniz?</h5>
          <h1 className="mb-4">{title}</h1>
          <p className="fw-medium">
            Ürünler hakkında samimi yorumları okuyabilir, kendiniz görüşlerinizi
            bildirebilirsiniz
          </p>
        </div>
        <p className="small fw-medium">
          © 2024 <span>All Rights Reserved</span>
        </p>
      </div>
      <div className="w-100 bg-white " style={{ minHeight: 420, padding: 40 }}>
        <div>
          <LoginWithGoogle />
          <div className="text-center text-muted">
            <div className={styles.separator_line}>
              veya e-posta ile devam et
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
