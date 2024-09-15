"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import {
  reset_password_confirm,
  set_auth_error,
} from "@/store/auth/authActions";
import toast from "react-hot-toast";

const schema = z
  .object({
    password: z.string().min(6, "Şifreniz en az 6 karakterden oluşmalıdır"),
    re_password: z.string().min(6),
  })
  .superRefine(({ password, re_password }, ctx) => {
    if (re_password !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["re_password"],
        message: "Şifreler uyuşmuyor",
      });
    }
  });
const ResetPasswordConfirmForm = ({ uidb64, token }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { password, re_password };
      schema.parse(formData); //

      const data = await dispatch(
        reset_password_confirm(password, uidb64, token)
      );
      if (data?.message) toast.success("Şifreniz başarıyla değiştirildi.");
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
          Yeni Şifre
        </label>
        <input
          className="form-control"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="* * * * * *"
        />

        {error?.password && (
          <span className="invalid-feedback d-block mb-2">
            {error.password}
          </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="re_password" className="form-label fw-semibold">
          Yeni Şifre Tekrar
        </label>
        <input
          className="form-control"
          id="re_password"
          type="password"
          onChange={(e) => setRePassword(e.target.value)}
          value={re_password}
          placeholder="* * * * * *"
        />

        {error?.re_password && (
          <span className="invalid-feedback d-block mb-2">
            {error.re_password}
          </span>
        )}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100 py-2">
          Kaydet
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

export default ResetPasswordConfirmForm;
