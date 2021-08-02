import { types } from "../actions/userAction";

const initialState = {
  currentUser: {},
  users: [],
  loading: false,
  selectedRow: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return {
        ...state,
        loading: true
      }
    case types.LOGIN_SUCCESS:
    return {
      ...state,
      currentUser: payload,
      loading: false
    };
    case types.LOGIN_FAIL:
    return {
      ...state,
      loading: false
    };

    case types.FETCH_USERS_START:
      return {
        ...state,
        loading: true,
        selectedRow: ""
      }
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case types.FETCH_USERS_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.REGISTER_START:
      return {
        ...state,
        loading: true
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false
      }

    case types.UPDATE_START:
      return {
        ...state,
        loading: true
      }
    case types.UPDATE_SUCCESS:
      return {
        ...state,
        users: state.users.map(elem => {
          if(elem.id === payload.id)
            return {
              ...elem,
              fullname: payload.fullname,
              roles: [{role:payload.role}],
              email: payload.email
            }
          return elem
        }),
        loading: false,
        selectedRow:""
      }
    case types.UPDATE_FAIL:
      return {
        ...state,
        loading: false,
      }

    case types.DELETE_START:
      return {
        ...state,
        loading: true
      }
    case types.DELETE_SUCCESS:
      return {
        ...state,
        users: state.users.filter(elem => elem.id !== payload),
        loading: false
      }
    case types.DELETE_FAIL:
      return {
        ...state,
        loading: false
      }

    case types.CHANGE_PASSWORD_START:
      return {
        ...state,
        loading: true
      }
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      }

    case types.SELECT_ROW:
      return {
        ...state,
        selectedRow: payload
      }
    case types.CLEAN_ROW:
      return {
        ...state,
        selectedRow: ""
      }

    case types.LOGOUT_USER:
      return{
        currentUser: {},
        users: [],
        loading: false
      }
    default:
      return state;
  }
};