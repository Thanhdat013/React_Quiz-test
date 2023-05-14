import {
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGOUT_SUCCESS,
} from "~/redux/action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    userName: "",
    email: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          userName: action?.payload?.DT?.username,
          email: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthenticated: true,
      };
    case FETCH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          userName: "",
          email: "",
          image: "",
          role: "",
        },
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
