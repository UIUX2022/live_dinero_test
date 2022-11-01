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
      console.log("current user is ", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }
    case "TOKENADD": {
      console.log("current token is ", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
