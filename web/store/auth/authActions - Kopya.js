// no dispatch
// import { zod_error } from "@/lib/utils";
// export const set_error = (error) => (dispatch) => {
//   const error_payload = zod_error(error);
//   dispatch({
//     type: "SET_ERROR",
//     payload: error_payload,
//   });
// };

// export const login = (email, password) => async (dispatch) => {
//   const body = { email, password };
//   const response = await fetch(`/api/auth/login`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await response.json();
//   if (response.status === 200) {
//     dispatch({ type: "LOGIN" });
//     dispatch(get_user());
//   } else {
//     dispatch({ type: "SET_ERROR", payload: data });
//     dispatch(logout());
//   }
// };

export const register =
  (username, email, password, re_password) => async (dispatch) => {
    const body = { username, email, password, re_password };
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 201) {
      // dispatch({ type: "LOGIN" });
      dispatch(login(email, password));
    } else {
      dispatch({ type: "SET_ERROR", payload: data });
      // dispatch(logout());
    }
  };

export const get_user = () => async (dispatch) => {
  const response = await fetch(`/api/auth/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    dispatch({ type: "LOAD_USER", payload: data });
  }
  return data;
};

export const update_me = (body) => async (dispatch) => {
  const response = await fetch(`/api/auth/me`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status === 200) {
    dispatch({ type: "UPDATE_USER", payload: data });
    return data;
  } else {
    dispatch({ type: "SET_ERROR", payload: data });
    return data;
  }
};

// export const refresh = () => async (dispatch) => {
//   const response = await fetch(`/api/auth/refresh`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();

//   if (response.status === 200) {
//     dispatch(get_user());
//   } else {
//     dispatch(logout());
//   }
// };

// export const check_auth_status = () => async (dispatch) => {
//   const response = await fetch(`/api/auth/check`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   if (response.status === 200) {
//     dispatch({ type: "LOGIN" });
//     dispatch(refresh());
//   } else {
//     dispatch({ type: "LOADING_FALSE" });
//   }
// };

export const logout = () => async (dispatch) => {
  const response = await fetch(`/api/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  dispatch({ type: "LOGOUT" });
  return true;
};

export const reset_password_request = (email) => async (dispatch) => {
  const body = { email };
  const response = await fetch(`/api/auth/reset-password`, {
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

export const verify_email_request = (email) => async (dispatch) => {
  const body = { email };
  const response = await fetch(`/api/auth/verify-email-request`, {
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

export const verify_email_confirm = (uidb64, token) => async (dispatch) => {
  const body = { uidb64, token };
  const response = await fetch(`/api/auth/verify-email-confirm`, {
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
