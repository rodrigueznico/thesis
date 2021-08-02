import { types } from "../actions/modelAction";

const initialState = {
  models: [],
  loadingModels: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_MODELS_START:
      return {
        ...state,
        loadingModels: true,
      };
    case types.FETCH_MODELS_SUCCESS:
      return {
        ...state,
        models: payload,
        loadingModels: false
      };
    case types.FETCH_MODELS_FAIL:
      return {
        ...state,
        loadingModels: false
      };
    case types.ADD_MODEL_START:
      return {
        ...state,
        loadingModels: true,
      }
    case types.ADD_SUCCESS:
      return {
        ...state,
        loadingModels: false
      };
    case types.ADD_FAIL:
      return{
          ...state,
          loadingModels: false
      };
      case types.DELETE_MODEL_START:
        return {
          ...state,
          loadingModels: true
        }
      case types.DELETE_SUCCESS:
      return {
        ...state,
        models: state.models.filter(elem => elem.id !== payload),
        loadingModels: false
      };
    case types.DELETE_FAIL:
      return{
          ...state,
          loadingModels: false
      };
    case types.LOGOUT_MODEL:
      return{
        models: [],
        loadingModels: false
      }
    default:
      return state;
  }
};
