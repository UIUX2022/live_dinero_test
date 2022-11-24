import axios from "axios";

export const GetApiWithHeader = async ({ route, token }) => {
  try {
    const resp = await axios.get(route, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp;
  } catch (e) {
    return e;
  }
};
export const PostApiWithHeader = async ({ params, route, token }) => {
  // console.log("my param is ", params);
  try {
    const response = await axios.post(route, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    return e;
  }
};
