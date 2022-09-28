export const APP_NAME = "chitraexpress.com.bd";

// export const BASE_URL = "http://180.210.130.74:8001";
// export const API = "http://180.210.130.74:8001/api/";

export const BASE_URL = "http://192.168.0.107:8080";
export const API = "http://192.168.0.107:8080/api/";

export const getHttpErrorMessage = (response, e) => {
  switch (response.status) {
    case 400:
      return "Bad Request.";
    case 401:
      return "Unauthorised access!";
    case 402:
      return "Payment Required!";
    case 403:
      return "Request Forbidden!"; //return "CSRF verification failed. Request aborted.";
    case 404:
      return "Not Found!";
    case 405:
      return "Method Not Allowed!";
    case 408:
      return "Request Timeout!";
    case 415:
      return "Unsupported Media Type!";
    case 444:
      return "No Response!";
    case 500:
      return "Internal Server Error!";
    case 502:
      return "Bad Gateway!";
    case 503:
      return "Service Unavailable!";
    case 504:
      return "Gateway Timeout!";
    default:
      return e.message || "Something went wrong!";
  }
};

export const handleResponse = (response) => {
  console.log(response);
  return response.text().then(res => {
    let data = "";
    try {
      data = res && JSON.parse(res);
    } catch (e) {
      return Promise.reject(getHttpErrorMessage(response, e));
    }
    if (!response.ok) {
      if (response.status === 401) {
        return Promise.reject(getHttpErrorMessage(response, e));
      }

      const error = (data && data.detail) || response.statusText || res;
      console.log(error);
      return Promise.reject(error);
    }

    if(data.hasOwnProperty("error")) return Promise.reject(data.error);

    return data;
  });
};