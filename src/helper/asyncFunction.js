import axios from "axios";

export const getDataFromAPI = async (url) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL + url, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.REACT_APP_API_Username,
        password: process.env.REACT_APP_API_Password,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond get data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond get data", err);
    return respond;
  }
};

export const patchDataToAPI = async (url, data) => {
  try {
    let respond = await axios.patch(process.env.REACT_APP_API_URL + url, data, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.REACT_APP_API_Username,
        password: process.env.REACT_APP_API_Password,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond patch data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond patch data", err);
    return respond;
  }
};

export const postDataToAPI = async (url, data) => {
  try {
    let respond = await axios.post(process.env.REACT_APP_API_URL + url, data, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.REACT_APP_API_Username,
        password: process.env.REACT_APP_API_Password,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond post data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond post data", err);
    return respond;
  }
};

export const convertDateFormatFull = (jsondate) => {
  if (jsondate !== undefined && jsondate !== null) {
    let date = new Date(jsondate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt.toString().padStart(2, 0) + " " + hh.toString().padStart(2, 0) + ":" + mm.toString().padStart(2, 0) + ":" + ss.toString().padStart(2, 0);
  } else {
    return null
  }
};