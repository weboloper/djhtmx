"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import { register, set_auth_error } from "@/store/auth/authActions";
// import toast from "react-hot-toast";
import { UsernameContraint, PasswordContraint } from "@/lib/validators";

const schema = z
  .object({
    username: UsernameContraint,
    email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: PasswordContraint,
    re_password: PasswordContraint,
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
const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, email, password, re_password };
      schema.parse(formData); //
      dispatch(register(username, email, password, re_password));
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch(set_auth_error(error));
      } else {
        console.error("Uncaught Error:", error);
      }
    }
    // if (error?.detail) toast.error(error.detail);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label fw-semibold">
          Kullanıcı Adı
        </label>
        <input
          className="form-control"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Kullanıcı Adı"
        />
        {error?.username && (
          <span className="invalid-feedback d-block mb-2">
            {error.username}
          </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" type="email" className="form-label fw-semibold">
          E-posta
        </label>
        <input
          className="form-control"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="eposta@eposta.com"
        />
        {error?.email && (
          <span className="invalid-feedback d-block mb-2">{error.email}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold">
          Şifre
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="* * * * * * *"
        />
        {error?.password && (
          <span className="invalid-feedback d-block mb-2">
            {error.password}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="re_password" className="form-label fw-semibold">
          Şifre Tekrarı
        </label>
        <input
          type="password"
          className="form-control"
          id="re_password"
          onChange={(e) => setRePassword(e.target.value)}
          value={re_password}
          placeholder="* * * * * * *"
        />
        {error?.re_password && (
          <span className="invalid-feedback d-block mb-2">
            {error.re_password}
          </span>
        )}
        {error?.detail && (
          <span className="invalid-feedback d-block mb-2">{error.detail}</span>
        )}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100 py-2">
          Kayıt Ol
        </button>
      </div>
      <div className="mb-3">
        <p>
          Zaten üye misiniz?{" "}
          <Link className="text-decoration-none" href="/login">
            Giriş yap
          </Link>
        </p>
        <p>
          <Link className="text-decoration-none" href="/">
            Anasayfaya dön
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
