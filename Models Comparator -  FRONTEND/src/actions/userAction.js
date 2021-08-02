import jwt_decode from "jwt-decode";
import { message } from "antd";

import * as userApi from "../modelsComparatorAPI/user";
import { MESSAGE } from "../contants/constans"
import { logoutModel } from "./modelAction"

export const types = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  FETCH_USERS_START: "FETCH_USERS_START",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAIL: "FETCH_USERS_FAIL",

  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",

  UPDATE_START: "UPDATE_START",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_FAIL: "UPDATE_FAIL",

  DELETE_START: "DELETE_START",
  DELETE_SUCCESS: "FETCH_REGISTER_SUCCESS",
  DELETE_FAIL: "FETCH_REGISTER_FAIL",

  CHANGE_PASSWORD_START: "CHANGE_PASSWORD_START",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAIL: "CHANGE_PASSWORD_FAIL",

  SELECT_ROW: "SELECT_ROW",
  CLEAN_ROW: "CLEAN_ROW",

  LOGOUT_USER: "LOGOUT_USER"
};

export const loginStart = () => {
  return {
    type: types.LOGIN_START
  }
}

export const loginSuccess = ({ username, token, id, fullname, email, startDate }) => {
  const decode = jwt_decode(token);
  const role = decode.roles[0].role;
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      username,
      token,
      id,
      fullname,
      role,
      email,
      startDate
    }
  };
};

export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL
  };
};

export const login = (userName, password) => {
  return dispatch => {
    dispatch(loginStart())
    userApi
      .getUser(userName, password)
      .then(
        success => {
          dispatch(loginSuccess(success.data));
        }
      )
      .catch( () => {
        message.error(MESSAGE.LOGIN_ERROR, 2);
        dispatch(loginFail())
      });
  };
};

export const fetchUsersStart = () => {
  return {
    type: types.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users
  };
};

export const fetchUsersFail = () => {
  return {
    type: types.FETCH_USERS_FAIL
  };
};

export const getUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchUsersStart())
    const token = getState().users.currentUser.token
    userApi
      .getUsers(token)
      .then(
        success => {
          dispatch(fetchUsersSuccess(success.data));
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.FETCH_USERS_ERROR, 2);
          dispatch(fetchUsersFail())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const registerStart = () => {
  return {
    type: types.REGISTER_START
  };
};

export const registerSuccess = () => {
  return {
    type: types.REGISTER_SUCCESS
  };
};

export const registerFail = () => {
  return {
    type: types.REGISTER_FAIL
  };
};

export const registerUser = user => {
  return (dispatch, getState) => {
    dispatch(registerStart())
    const token = getState().users.currentUser.token
    userApi
      .register(user, token)
      .then(
        () => {
          message.success(MESSAGE.ADD_USER_SUCCESS, 2);
          dispatch(registerSuccess());
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.ADD_USER_FAIL, 2);
          dispatch(registerFail())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const updateStart = () => {
  return {
    type: types.UPDATE_START
  };
};

export const updateSuccess = user => {
  return {
    type: types.UPDATE_SUCCESS,
    payload: user
  };
};

export const updateFail = (user) => {
  return {
    type: types.UPDATE_FAIL,
    payload: user
  };
};

export const updateUser = user => {
  return (dispatch, getState) => {
    dispatch(updateStart())
    const token = getState().users.currentUser.token
    userApi
      .updateUser(user, token)
      .then(
        () => {
          message.success(MESSAGE.UPDATE_USER_SUCCESS, 2);
          dispatch(updateSuccess(user));
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.UPDATE_USER_FAIL, 2);
          dispatch(updateFail(user))
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const selectRow = id => {
  return{
    type: types.SELECT_ROW,
    payload: id
  }
}

export const cleanRow = () => {
  return{
    type: types.CLEAN_ROW,
  }
}

export const deleteStart = () => {
  return {
    type: types.DELETE_START
  };
};

export const deleteSuccess = userId => {
  return {
    type: types.DELETE_SUCCESS,
    payload: userId
  };
};

export const deleteFail = () => {
  return {
    type: types.DELETE_FAIL,
  };
};

export const deleteUser = userId => {
  return (dispatch, getState) => {
    dispatch(deleteStart())
    const token = getState().users.currentUser.token
    userApi
      .deleteUser(userId, token)
      .then(
        () => {
          message.success(MESSAGE.DELETE_USER_SUCCESS, 2);
          dispatch(deleteSuccess(userId));
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.DELETE_USER_FAIL, 2);
          dispatch(deleteFail())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const changePasswordSuccess = () => {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS
  };
};

export const changePasswordFail = () => {
  return {
    type: types.CHANGE_PASSWORD_FAIL
  };
};

export const changePassword = user => {
  return (dispatch, getState) => {
    dispatch(deleteStart())
    const token = getState().users.currentUser.token
    userApi
      .changePasswordUser(user, token)
      .then(
        () => {
          message.success(MESSAGE.CHANGE_PASSWORD_SUCCESSS, 2);
          dispatch(changePasswordSuccess());
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.CHANGE_PASSWORD_FAIL, 2);
          dispatch(changePasswordFail())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const logoutUser = () => {
  return {
    type: types.LOGOUT_USER
  }
}

const verifyStatus = (status) => {
  if (status === 401 || status === 403)
    return false;
  return true;
}
