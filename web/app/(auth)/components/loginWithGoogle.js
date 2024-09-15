"use client";
import React from "react";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
const LoginWithGoogle = () => {
  const router = useRouter();

  const handleLoginWithGoogle = async (e) => {
    // Redirect user to backend for Google OAuth
    // window.location.href = "/api/google/login";
    router.push("/api/google/login");
  };
  return (
    <button
      onClick={handleLoginWithGoogle}
      className="btn btn-light border w-100 py-2"
    >
      <Image
        src="/img/google.png"
        alt="google-icon"
        width={18}
        height={18}
        className={styles.google_logo}
      />
      Google ile devam et
    </button>
  );
};

export default LoginWithGoogle;
