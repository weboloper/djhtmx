"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import { login, set_auth_error } from "@/store/auth/authActions";
// import toast from "react-hot-toast";
import { PasswordContraint } from "@/lib/validators";

const schema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
  password: PasswordContraint,
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      schema.parse(formData); //
      dispatch(login(email, password));
    } catch (err) {
      if (err instanceof z.ZodError) {
        dispatch(set_auth_error(err));
      } else {
        console.error("Uncaught Error:", err);
      }
    }
    // if (error?.detail) toast.error(error.detail);
  };
  return (
    <form onSubmit={handleSubmit}>
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
        {error?.detail && (
          <span className="invalid-feedback d-block mb-2">{error.detail}</span>
        )}
      </div>
      <div className="mb-3">
        <Link className="text-decoration-none" href="/password-reset">
          Şifremi unuttum
        </Link>
      </div>

      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
          disabled={isLoading}
        >
          Giriş yap
        </button>
      </div>

      <div className="mb-3">
        <p>
          Henüz üye değil misiniz?{" "}
          <Link className="text-decoration-none" href="/register">
            Üye ol
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

export default LoginForm;
