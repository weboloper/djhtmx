"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from "@/store/auth/authActions";

export default function ThemeProvider({ children, ...props }) {
  const dispatch = useDispatch();

  // Inside an action or effect:

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    // require("bootstrap-icons/font/bootstrap-icons.min.css");

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status());
    }
  }, [dispatch]);

  return <>{children}</>;
}
