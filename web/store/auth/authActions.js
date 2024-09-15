import { zod_error } from "@/lib/utils";
export const set_auth_error = (error) => (dispatch) => {
  const error_payload = zod_error(error);
  dispatch({
    type: "SET_ERROR",
    payload: error_payload,
  });
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOADING_START" });
  try {
    const body = { email, password };
    const loginResponse = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (loginResponse.status === 200) {
      // Set isAuthenticated to true immediately after a successful login
      dispatch({ type: "VERIFY_SUCCESS" });
      dispatch(get_current_user());
    } else {
      // Handle login error
      const message = { detail: "Hatalı kullanıcı bilgileri!" };
      dispatch({ type: "SET_ERROR", payload: message });
      dispatch({ type: "LOGOUT" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    dispatch({ type: "LOGOUT" });
  }
  dispatch({ type: "LOADING_END" });
};

export const logout = () => async (dispatch) => {
  const logoutResponse = await fetch(`/api/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  dispatch({ type: "LOGOUT" });
  return true;
};

export const get_current_user = () => async (dispatch) => {
  const currentUserResponse = await fetch(`/api/auth/current_user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (currentUserResponse.ok) {
    const userData = await currentUserResponse.json();
    dispatch({ type: "SET_USER", payload: userData });
  } else {
    // Handle current_user error
    dispatch({ type: "LOGOUT" });
  }
};

export const check_auth_status = () => async (dispatch) => {
  // Inside an action or effect:
  dispatch({ type: "LOADING_START" });

  // Step 1: Check verify
  const verifyResponse = await fetch("/api/auth/check");
  if (verifyResponse.ok) {
    // Token is valid, mark as authenticated
    dispatch({ type: "VERIFY_SUCCESS" });

    // Fetch the current user
    dispatch(get_current_user());
  } else {
    // Step 2: Call refresh if verify fails
    const refreshResponse = await fetch("/api/auth/refresh");
    if (refreshResponse.ok) {
      dispatch({ type: "REFRESH_SUCCESS" });

      // Step 3: Call current_user after refreshing tokens
      dispatch(get_current_user());
    } else {
      // Handle refresh failure
      dispatch({ type: "LOGOUT" });
    }
  }

  dispatch({ type: "LOADING_END" });
};

export const register =
  (username, email, password, re_password) => async (dispatch) => {
    dispatch({ type: "LOADING_START" });
    try {
      const body = { username, email, password, re_password };
      const registerResponse = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (registerResponse.ok) {
        const data = await registerResponse.json();

        // Optionally, you might want to automatically log in the user after registration
        dispatch({ type: "REGISTER_SUCCESS" });

        dispatch(login(email, password));
      } else {
        const errorData = await registerResponse.json();
        dispatch({ type: "REGISTER_FAIL", payload: errorData });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      dispatch({ type: "REGISTER_FAIL", payload: error.message });
    }
  };

export const email_verification_confirm =
  (uidb64, token) => async (dispatch) => {
    const body = { uidb64, token };
    const response = await fetch(`/api/auth/email-verification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch({ type: "SET_ERROR", payload: null });
      return data;
    } else {
      dispatch({ type: "SET_ERROR", payload: data });
      return data;
    }
  };

export const reset_password_request = (email) => async (dispatch) => {
  const body = { email };
  const response = await fetch(`/api/auth/reset-password-request`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status === 200) {
    dispatch({ type: "SET_ERROR", payload: null });
    return data;
  } else {
    dispatch({ type: "SET_ERROR", payload: data });
    return data;
  }
};

export const reset_password_confirm =
  (password, uidb64, token) => async (dispatch) => {
    const body = { password, uidb64, token };
    const response = await fetch(`/api/auth/reset-password-confirm`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch({ type: "SET_ERROR", payload: null });
      return data;
    } else {
      dispatch({ type: "SET_ERROR", payload: data });
      return data;
    }
  };
