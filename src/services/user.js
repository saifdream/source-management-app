import AsyncStorage from '@react-native-community/async-storage';
import {authHeader} from "../_helpers/auth-header";
import {API, BASE_URL, getHttpErrorMessage} from '../constant';

export const userService = {
    login,
    logout,
    safeLogout,
};

function login(credential) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential)
    };

    return fetch(`${API}login/`, requestOptions).then(handleResponse);
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${BASE_URL}/rest-auth/logout/`, requestOptions)
      .then(handleResponse)
      .then(res => {
          //console.log(res)
          AsyncStorage.removeItem('credential');
          return {}
      });
}

async function safeLogout() {
    await AsyncStorage.removeItem('credential');
}

function handleResponse(response) {
    //console.log(response)
    return response.text().then(res => {
        //console.log(res)
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
            //console.log(error)
            return Promise.reject(error);
        }

        if(data.hasOwnProperty("error")) return Promise.reject(data.error);
        if(res.token)
            global.credential = res;
        AsyncStorage.setItem('credential', res);

        return data;
    });
}