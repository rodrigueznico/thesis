import { message } from "antd";

import * as modelApi from "../modelsComparatorAPI/model";
import { MESSAGE } from "../contants/constans"
import { logoutUser } from "./userAction"

export const types = {
  FETCH_MODELS_START: "FETCH_MODELS_START",
  FETCH_MODELS_SUCCESS: "FETCH_MODELS_SUCCESS",
  FETCH_MODELS_FAIL: "FETCH_MODELS_FAIL",
  
  ADD_MODELS_START_COMPONENT: "ADD_MODELS_START_COMPONENT",
  ADD_MODEL_START: "ADD_MODELS_START",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAIL: "ADD_FAIL",
  
  DELETE_MODEL_START: "DELETE_MODEL_START",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_FAIL: "DELETE_FAIL",

  LOGOUT_MODEL: "LOGOUT_MODEL"
};

export const fetchModelsStart = () => {
  return {
    type: types.FETCH_MODELS_START
  };
};

export const fetchModelsSuccess = models => {
  
  return {
    type: types.FETCH_MODELS_SUCCESS,
    payload: parserData(models)
  };
};

export const fetchModelsError = () => {
  return {
    type: types.FETCH_MODELS_FAIL
  };
};

export const getModels = idUser => {
  return (dispatch, getState) => {
    dispatch(fetchModelsStart())
    const { users } = getState();
    modelApi
      .getModels(idUser, users.currentUser.token)
      .then(
        success => {
          dispatch(fetchModelsSuccess(success.data));
        }
      )
      .catch( (err) => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.FETCH_MODELS_ERROR, 2);
          dispatch(fetchModelsError())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const addModelStart = () => {
  return {
    type: types.ADD_MODEL_START
  };
}

export const addSuccess = () => {
  return {
    type: types.ADD_SUCCESS
  };
};

export const addError = () => {
  return {
    type: types.ADD_FAIL
  };
};

export const addModel = model => {
  return (dispatch, getState) => {
    dispatch(addModelStart())
    const { users } = getState();
    modelApi
      .addModel(model, users.currentUser.token)
      .then(
        success => {
          message.success(MESSAGE.ADD_MODEL_SUCCESS, 2)
          dispatch(addSuccess(success.data));
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.ADD_MODEL_FAIL, 2)
          dispatch(addError())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
        
  };
};

export const deleteModelStart = () => {
  return {
    type: types.DELETE_MODEL_START
  };
}

export const deleteSuccess = id => {
  return {
    type: types.DELETE_SUCCESS,
    payload: id
  };
};

export const deleteError = () => {
  return {
    type: types.DELETE_FAIL
  };
};

export const deleteModel = id => {
  return (dispatch, getState) => {
    dispatch(addModelStart())
    const { users } = getState();
    modelApi
      .deleteModel(id, users.currentUser.token)
      .then(
        () => {
          message.success(MESSAGE.DELETE_MODEL_SUCCESS, 2);
          dispatch(deleteSuccess(id));
        }
      )
      .catch( err => {
        if (verifyStatus(err.response.status)){
          message.error(MESSAGE.DELETE_MODEL_FAIL, 2);
          dispatch(deleteError())
        }
        else{
          message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
          dispatch(logoutUser());
          dispatch(logoutModel());
        }
      });
  };
};

export const logoutModel = () => {
  return {
    type: types.LOGOUT_MODEL
  }
}


const parserData = (models) => {
  let newModels = []
  
  models.forEach(element => {
    const { modelData } = element
    let data = {}
    for (var prop in modelData){
      const index = modelData[prop].indexOf(".")
      index === -1 ?
      data = {...data, [prop]:modelData[prop]}
      :
      data = {...data, [prop]:modelData[prop].substring(0, index+3)}
    }
    const elem = {...element, modelData: data};
    newModels.push(elem)
  });
  return newModels
}

const verifyStatus = (status) => {
  if (status === 401 || status === 403)
    return false;
  return true;
}