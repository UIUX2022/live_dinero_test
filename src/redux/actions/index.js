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
  }
}
export const addtoken = (payload) => {

  return {
    type: "TOKENADD",
    payload,
  }
}
