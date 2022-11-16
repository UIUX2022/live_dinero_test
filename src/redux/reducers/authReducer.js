const initialState = {
  loader: false,
  user: {},
  token: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "openLoader": {
      return {
        ...state,
        loader: true,
      };
    }
    case "closeLoader": {
      return {
        ...state,
        loader: false,
      };
    }
    case "USERADD": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "TOKENADD": {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
