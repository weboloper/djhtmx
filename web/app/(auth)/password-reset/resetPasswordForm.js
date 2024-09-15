"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import {
  reset_password_request,
  set_auth_error,
} from "@/store/auth/authActions";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { email };
      schema.parse(formData); //
      const data = await dispatch(reset_password_request(email));
      if (data?.message)
        toast.success(
          "Şifre hatırlatma bağlantısı eposta adresinize gönderildi."
        );
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch(set_auth_error(error));
      } else {
        console.error("Uncaught Error:", error);
      }
    }
    if (error?.detail) toast.error(error.detail);
  };
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          E-posta
        </label>
        <input
          className="form-control"
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="eposta@eposta.com"
        />

        {error?.email && (
          <span className="invalid-feedback d-block mb-2">{error.email}</span>
        )}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100 py-2">
          Şifremi Sıfırla
        </button>
      </div>

      <div className="mb-3">
        <Link className="text-decoration-none" href="/">
          Anasayfaya dön
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
