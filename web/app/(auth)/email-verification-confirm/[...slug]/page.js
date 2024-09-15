"use client";
import React, { useEffect } from "react";
import { email_verification_confirm } from "@/store/auth/authActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const EmailVerificationConfirm = ({ params: { slug } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const uidb64 = slug[0];
  const token = slug[1];

  useEffect(() => {
    async function verify_email() {
      // You can await here
      const data = dispatch(email_verification_confirm(uidb64, token));
      if (data?.message) {
        toast.success("E-posta doğrulama başarılı. Yönlendiriliyorsunuz.");
        router.push("/login");
      }
      if (data?.detail) {
        toast.error(data?.detail);
        router.push("/login");
      }
    }
    verify_email();
  }, [dispatch, router, uidb64, token]);

  return <>Yönlendiriliyorsunuz</>;
};

export default EmailVerificationConfirm;
