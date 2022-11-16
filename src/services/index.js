import axios from "axios";

export const GetApiWithHeader = async ({ route, token }) => {
  try {
    const resp = await axios.get(route, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resp) {
      console.log("our current result is ", resp.data);
      if (resp.data.state == 401 || resp.data.state == 500) {
        console.log("our current result is ", resp.data);
        return "login";
      } else return resp.data;
    } else return resp;
  } catch (e) {
    return e.toString();
  }
};
export const PostApiWithHeader = async ({ params, route, token }) => {
  // console.log("my param is ", params);
  try {
    const response = await axios.post(route, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      if (response.data.status == 401) {
        return "login";
      }
      return response;
    } else {
      return response;
    }
  } catch (e) {
    // handle error

    return e.toString();
  }
};
