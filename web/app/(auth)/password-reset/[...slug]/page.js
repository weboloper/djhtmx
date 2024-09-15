import React from "react";
import ResetPasswordConfirmForm from "./resetPasswordConfirmForm";
import Image from "next/image";
const ResetPasswordConfirm = ({ params: { slug } }) => {
  const uidb64 = slug[0];
  const token = slug[1];
  const title = "Şifre Belirleyin";
  return (
    <>
      <div className="border-bottom d-md-none bg-light p-4 text-center">
        <h1 className="m-0 h3">{title}</h1>
      </div>
      <div
        className="w-100 bg-white d-flex align-items-center "
        style={{ minHeight: 420, padding: 40 }}
      >
        <ResetPasswordConfirmForm uidb64={uidb64} token={token} />
      </div>
      <div className="w-100 p-5 text-white d-none d-md-flex justify-content-between flex-column ">
        <div>
          <h5 className="small mb-4">
            <Image src="/next.svg" alt="Logo" height={20} width={80} />
          </h5>
          <h1 className="mb-4">{title}</h1>
          <p className="fw-medium">
            Şifrenizi hatırlatma bağlantısını e-posta adresinize gönderelim
          </p>
        </div>
        <p className="small text-end fw-medium">
          © 2024 <span>All Rights Reserved</span>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordConfirm;
