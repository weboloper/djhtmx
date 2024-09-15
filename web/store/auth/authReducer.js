// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
//   isLoading: true,
// };

// export default function AuthReducer(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case "LOGIN":
//       return {
//         ...state,
//         isAuthenticated: true,
//         error: null,
//       };
//     case "LOAD_USER":
//       return {
//         ...state,
//         user: payload,
//         error: null,
//         isLoading: false,
//       };
//     case "UPDATE_PROFILE":
//       return {
//         ...state,
//         user: { ...state.user, profile: { ...state.user.profile, ...payload } },
//         error: null,
//         isLoading: false,
//       };
//     case "UPDATE_USER":
//       return {
//         ...state,
//         user: { ...state.user, ...payload },
//         error: null,
//         isLoading: false,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         user: payload,
//         isAuthenticated: false,
//       };
//     case "SET_ERROR":
//       return {
//         ...state,
//         error: payload,
//       };
//     case "LOADING_FALSE":
//       return {
//         ...state,
//         isLoading: false,
//       };

//     default:
//       return state;
//   }
// }

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOADING_END":
      return {
        ...state,
        isLoading: false,
      };
    case "VERIFY_SUCCESS":
      return {
        ...state,
        isAuthenticated: true, // Mark as authenticated after successful verify
      };

    case "REFRESH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true, // Mark as authenticated after successful refresh
      };
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return { ...state, isAuthenticated: true, error: null };

    case "REGISTER_FAIL":
      return { ...state, isAuthenticated: false, error: action.payload };
    default:
      return state;
  }
}
