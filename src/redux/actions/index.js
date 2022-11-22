import axios from "axios";

export const startLoader = () => {
  return {
    type: "openLoader",
  };
};
export const endLoader = () => {
  return {
    type: "closeLoader",
  };
};
export const addUser = (payload) => {
  return {
    type: "USERADD",
    payload,
  };
};
export const addtoken = (payload) => {
  return {
    type: "TOKENADD",
    payload,
  };
};

export const getOurService = () => {
  return (dispatch) => {
    dispatch(startLoader());
    axios.get("services-with-sub").then((resp) => {
      if (resp.data.status == 200) {
        dispatch({
          type: "ADDSERVICE",
          payload: resp?.data?.services,
        });
        dispatch(endLoader());
      } else {
        console.log("get error API services-with-sub", resp);
      }
    });
  };
};
